const moment = require('moment');
const XLSX = require('xlsx');

const typeMapping = {
    "Voz": "voice",
    "CHAMADA": "voice",
    "SMS": "message",
    "TORP.": "message",
    "MENSAGEM": "message"
};

const statusMapping = {
    "Completada": "completed",
    "Nao Compl.": "not-completed",
    "Entregue": "delivered"
};

export function fileProcess(fileContent) {

    var data = new Uint8Array(fileContent);
    var workbook = XLSX.read(data, { type: 'array' });

    //Check if it's VIVO's spreadsheet
    if (workbook.SheetNames[0].trim() === "Relatório de chamadas") {
        console.log("VIVO");
        return processVivo(workbook);
    
    //Check if it's TIM's spreadsheet
    } else if (workbook.SheetNames[0].trim() === "Dados de Pesquisa") {
        console.log("TIM");
        return processTim(workbook);

    //Check if it's CLARO's spreadsheet
    } else if (workbook.SheetNames[0].trim() === "Sheet0") {
        console.log("CLARO");
    
    } else {
        alert("Não foi possível reconhecer o formato do extrato de chamadas informado. Tente novamente utilizando outra planilha.");
    } 
}

function processTim(workbook) {
    const messageTab = workbook.Sheets["Extrato SMS"];
    const callTab = workbook.Sheets["Extrato Voz"];
    const erbTab = workbook.Sheets["Dados de Antena"];
    var jsonRecords;
    var jsonERBs;
    
    if(callTab) {
        jsonRecords = clearTimJSON(XLSX.utils.sheet_to_json(callTab));
   
    } else if (messageTab) {
        jsonRecords = clearTimJSON(XLSX.utils.sheet_to_json(messageTab));
    }    

    jsonERBs = clearTimJSON(XLSX.utils.sheet_to_json(erbTab));

    const resultObj = jsonRecords.map(function(e) {
        var finalType;
        var finalStatus;
        var finalTimestamp;
        var finalDuration;
        var finalTelOut;
        var finalImeiOut;
        var finalTelIn;
        var finalImeiIn;
        var finalLocation1;
        var finalLocation2;

        if (e["TIPO"]) {
            finalType = typeMapping[e["TIPO"].trim()] || "undefined";
        }        

        // TIM's extraction don't have STATUS definition
        finalStatus = "undefined";

        if (e["HORA LOCAL"]) {
            finalTimestamp = moment.utc(e["HORA LOCAL"].trim(), "DD/MM/YYYY HH:mm:ss").toISOString();
        } 
        
        if (e["DURAÇÃO"]) {
            finalDuration = e["DURAÇÃO"].trim();
        }

        if (e["Nº ORIGEM"]) {
            finalTelOut = formatTelNumber(e["Nº ORIGEM"].trim());
        }

        if(e["IMEI ORIGEM"]) {
            finalImeiOut = e["IMEI ORIGEM"].trim();
        }

        if (e["Nº DESTINO"]) {
            finalTelIn = formatTelNumber(e["Nº DESTINO"].trim());
        }

        if(e["IMEI DESTINO"]) {
            finalImeiIn = e["IMEI DESTINO"].trim();
        }

        if (e["PRIMEIRA CGI/ERB"] && jsonERBs) {
            const originalLocation1 = e["PRIMEIRA CGI/ERB"].trim();
            if(originalLocation1) {
                const location1Obj = jsonERBs.find(jsonERB => {
                    return jsonERB["CGI/ERB"].trim() === originalLocation1;
                });
                if(location1Obj) {            
                    finalLocation1 = {
                        lat: parseFloat(String(location1Obj["LATITUDE"]).replace(/,/g, '.')),
                        lng: parseFloat(String(location1Obj["LONGITUDE"]).replace(/,/g, '.')),
                        azimuth: parseInt(String(location1Obj["AZIMUTE"]).slice(0, -1))
                    };
                }
            }
        }        

        if(e["ÚLTIMA CGI/ERB"] && jsonERBs) {
            const originalLocation2 = e["ÚLTIMA CGI/ERB"].trim();
            if(originalLocation2) {
                const location2Obj = jsonERBs.find(jsonERB => {
                    return jsonERB["CGI/ERB"].trim() === originalLocation2;
                });
                if(location2Obj) {            
                    finalLocation2 = {
                        lat: parseFloat(String(location2Obj["LATITUDE"]).replace(/,/g, '.')),
                        lng: parseFloat(String(location2Obj["LONGITUDE"]).replace(/,/g, '.')),
                        azimuth: parseInt(String(location2Obj["AZIMUTE"]).slice(0, -1))
                    };
                }
            }
        }
       
        var locationArrayOut;
        var locationArrayIn;
        if(e["IMEI ORIGEM"]) {
            locationArrayOut = [finalLocation1, finalLocation2].filter(Boolean);
        } else if (e["IMEI DESTINO"]) {
            locationArrayIn = [finalLocation1, finalLocation2].filter(Boolean);
        }
        
        return {
            type: finalType,
            status: finalStatus,
            timestamp: finalTimestamp,
            duration: finalDuration,
            telOut: finalTelOut,
            imeiOut: finalImeiOut,
            locationOut: locationArrayOut,
            telIn: finalTelIn,
            imeiIn: finalImeiIn,
            locationIn: locationArrayIn
        }
    });

    return {company: 'tim', list: resultObj};
}

function processVivo(workbook) {
    const callTab = workbook.Sheets[workbook.SheetNames[0]];
    const erbTab = workbook.Sheets[workbook.SheetNames[2]];
    const jsonRecords = XLSX.utils.sheet_to_json(callTab, { range: 5 });
    const jsonERBs = XLSX.utils.sheet_to_json(erbTab, { range: 5 });

    const resultObj = jsonRecords.map(function(e) {
        const originalType = e["Tra"].trim();
        const finalType = typeMapping[originalType] || "undefined";

        const originalStatus= e["Status"].trim();
        const finalStatus = statusMapping[originalStatus] || "undefined";

        const dateTimeString = `${e["Data"].trim() } ${e["Hora"].trim() }`;
        const finalTimestamp = moment.utc(dateTimeString, "DD/MM/YYYY HH:mm:ss").toISOString();

        const originalLocationOut = e["Local Origem"].trim();
        var finalLocationOut = undefined;        
        if(originalLocationOut) {
            const locationOutObj = jsonERBs.find(jsonERB => {
                return jsonERB["CGI"].trim() === originalLocationOut;
            });
            if(locationOutObj) {            
                finalLocationOut = [{
                    lat: breakCoordinateDMS(locationOutObj["Latitude"]),
                    lng: breakCoordinateDMS(locationOutObj["Longitude"]),
                    azimuth: parseInt(locationOutObj["Azi"])
                }];
            }
        }        

        const originalLocationIn = e["Local Destino"].trim();
        var finalLocationIn = undefined;
        if(originalLocationIn) {
            const locationInObj = jsonERBs.find(jsonERB => {
                return jsonERB["CGI"].trim() === originalLocationIn;
            });
            if(locationInObj) {            
                finalLocationIn = [{
                    lat: breakCoordinateDMS(locationInObj["Latitude"]),
                    lng: breakCoordinateDMS(locationInObj["Longitude"]),
                    azimuth: parseInt(locationInObj["Azi"])
                }];
            }
        }
        
        return {
            type: finalType,
            status: finalStatus,
            timestamp: finalTimestamp,
            duration: e["Durac"],
            telOut: e["Chamador"],
            imeiOut: e["IMEI Chamador"],
            locationOut: finalLocationOut,
            telIn: e["Chamado"],
            imeiIn: e["IMEI Chamado"],
            locationIn: finalLocationIn            
        }
    });

    return {company: 'vivo', list: resultObj};
}

function breakCoordinateDMS(coordinate) {
    if(coordinate) {
        var coordinateParts = coordinate.split("-");
        var coordinateDegrees = coordinateParts[1]?coordinateParts[1].replace(/,/g, '.'):0;
        var coordinateMinutes = coordinateParts[2]?coordinateParts[2].replace(/,/g, '.'):0;
        var coordinateSeconds = coordinateParts[3]?coordinateParts[3].replace(/,/g, '.'):0;
        var coordinateDirection = coordinate.charAt(0);
        return convertDMSToDD(coordinateDegrees, coordinateMinutes, coordinateSeconds, coordinateDirection);
    }
    
    return "";
}

function convertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = parseFloat(degrees) + parseFloat(minutes)/60 + parseFloat(seconds)/(60*60);
    if (direction == "-") {
        dd = dd * -1;
    }
    return dd;
}

function formatTelNumber(value) {
    if(value.slice(0,2) == "55" && (value.length == 13 || value.length == 12)) {
        return value.slice(2);

    } else {
        return value;
    }
}

function clearTimJSON(json) {
    json = json.slice(0, json.length - 1); //remove footer / last item
    return json.map(obj => 
        Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, value === "." ? "" : value]) // Replace empty values "." for whitespace
        )
    );
}
  