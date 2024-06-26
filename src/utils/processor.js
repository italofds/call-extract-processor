const moment = require('moment');
const XLSX = require('xlsx');

const typeMapping = {
    "Voz": "voice",
    "SMS": "message",
    "TORP.": "message"
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

    //Check if it's CLARO's spreadsheet
    } else if (workbook.SheetNames[0].trim() === "Sheet0") {
        console.log("CLARO");
    
    } else {
        alert("Não foi possível reconhecer o formato do extrato de chamadas informado. Tente novamente utilizando outra planilha.");
    } 
}

function processVivo(workbook) {
    const aba1 = workbook.Sheets[workbook.SheetNames[0]];
    const aba2 = workbook.Sheets[workbook.SheetNames[2]];
    const jsonCalls = XLSX.utils.sheet_to_json(aba1, { range: 5 });
    const jsonERBs = XLSX.utils.sheet_to_json(aba2, { range: 5 });

    const resultObj = jsonCalls.map(function(e) {
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

    return resultObj;
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
  