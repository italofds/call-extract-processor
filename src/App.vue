<template>
	<div class="d-flex flex-column vh-100">
		<header class="navbar navbar-expand navbar-dark bg-dark shadow flex-shrink-0 z-2">
			<div class="container-fluid">
				<div>
					<button v-if="targetList.length == 1" class="navbar-toggle btn btn-dark d-inline-block me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

					<div class="navbar-brand d-inline-block my-1">
						<svg class="bi text-secondary h2 mb-0 align-middle me-3"><use href="#logo"></use></svg>
						<a class="text-light align-middle d-sm-inline d-none" href="https://github.com/italofds" target="_blank">italofds</a>
						<span class="text-secondary align-middle d-sm-inline d-none"> / </span>
						<a class="text-light align-middle" href="https://github.com/italofds/call-extract-processor" target="_blank">call-extract-processor</a>
						<span class="badge rounded-pill text-bg-secondary align-middle ms-3" style="font-size:10pt;"><small>BETA</small></span>
					</div>
				</div>

				<div class="dropdown">
					<button class="btn btn-dark dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static" aria-label="Alterar Tema">
						<svg class="bi my-1 theme-icon-active"><use href="#circle-half"></use></svg>
						<span class="d-none ms-2" id="bd-theme-text">Alterar Tema</span>
					</button>
					<ul id="dropdown-theme" class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme-text">
						<li>
							<button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
								<svg class="bi me-2 opacity-50"><use href="#sun-fill"></use></svg>
								Claro
								<svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
							</button>
						</li>
						<li>
							<button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
								<svg class="bi me-2 opacity-50"><use href="#moon-stars-fill"></use></svg>
								Escuro
								<svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
							</button>
						</li>
						<li>
							<button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
								<svg class="bi me-2 opacity-50"><use href="#circle-half"></use></svg>
								Auto
								<svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
							</button>
						</li>
					</ul>

					<svg xmlns="http://www.w3.org/2000/svg" class="d-none">
						<symbol id="check2" viewBox="0 0 16 16">
							<path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
						</symbol>
						<symbol id="circle-half" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
						</symbol>
						<symbol id="moon-stars-fill" viewBox="0 0 16 16">
							<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
							<path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
						</symbol>
						<symbol id="sun-fill" viewBox="0 0 16 16">
							<path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
						</symbol>
						<symbol id="logo" viewBox="0 0 16 16">
							<path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
						</symbol>
					</svg>
				</div>
			</div>
		</header>

		<main id="start" class="flex-grow-1 overflow-auto position-relative">
			<div class="cover d-flex align-items-center"  v-if="targetList.length != 1">

				<div class="container text-center text-light" v-if="targetList.length == 0">
					<h1 class="mb-3">Processador de Extrato de Chamadas</h1>
					<div class="lead col-lg-6 mx-auto mb-5">
						<p>Ferramenta de processamento de chamadas projetado para as empresas Vivo, Claro e Tim, que tem como objetivo apresentar um resultado mais amigável ao usuário a partir do arquivo Excel do extrato das chamadas. Esta ferramenta exibe as localizações aproximadas de cada ligação, permitindo uma análise mais clara e detalhada das comunicações realizadas pelo alvo.</p>
					</div>					
					<form @submit.prevent="handleFormSubmit" class="col-lg-6 mx-auto " >
						<div class="input-group">
							<input v-on:change="previewFile" id="inputFile" name="file" type="file" class="form-control form-control-lg" aria-label="Upload" accept=".xlsx,.xls" required="required">
							<button id="btnSend" class="btn btn-primary btn-lg" type="submit">Processar</button>
						</div>				
					</form>
				</div>

				<div class="modal position-static d-block" v-if="targetList.length > 1">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title">Selecionar Alvo</h5>
							</div>
							<div class="modal-body">
								<div class="alert alert-warning" role="alert">
									<i class="bi bi-exclamation-triangle-fill me-2"></i>
									<strong>Atenção!</strong> Não foi possível identificar o alvo correto ao processar o Extrato de Chamadas.
								</div>
								<p>A identificação do alvo é fundamental para organizar a lista de chamadas de acordo com o foco específico.</p>
								<p><strong>Selecione qual dos telefones ou IMEI's é o alvo correto:</strong></p>
								
								<label v-for="target in targetList" :key="target" class="border bg-body-tertiary p-2 mb-1 rounded w-100">
									<input class="me-3" type="radio" :value="target" v-model="selectedTarget">
									<strong>{{ target.type == 'tel' ? 'Telefone' : 'IMEI' }}:</strong> {{ target.type == 'tel' ? formatPhoneNumber(target.value) : target.value}}
								</label>
							</div>
							<div class="modal-footer">
								<button @click="targetSelect" type="button" class="btn btn-primary" :disabled="!selectedTarget">Abrir</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="d-flex flex-row h-100">
				<div id="navbarToggleExternalContent" class="menu collapse show overflow-auto shadow z-1" v-if="targetList.length == 1">


					<div class="d-flex flex-column h-100">

						<h4 class="p-3 border-bottom bg-body-secondary mb-0">
							Extrato de Chamadas
						</h4>

						<div class="px-3 py-2">
							<div class="d-flex my-3">
								<img src="../assets/img/vivo.png" class="border bg-light rounded" style="width:110px;" />
								<div class="ms-3 align-self-center">
									<h5>
										{{ formatPhoneNumber(this.targetList[0].value) }} 
										<small v-if="this.targetList[0].type=='tel'" class="text-body-secondary fw-light">(Tel. Alvo)</small>
										<small v-if="this.targetList[0].type=='imei'" class="text-body-secondary fw-light">(IMEI Alvo)</small>
									</h5>

									<ul class="list-unstyled mb-0">
										<li><strong>{{ this.callList.length }}</strong> registros de chamada</li>
										<li>De <strong>{{ formatDate(this.finalCallList[0].date, "DD/MM/YYYY") }}</strong> a <strong>{{ formatDate(this.finalCallList[this.finalCallList.length-1].date, "DD/MM/YYYY") }}</strong></li>
									</ul>
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs mx-3">
							<li class="nav-item">
								<a class="nav-link active" aria-current="page" href="#">Lista</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Gráficos</a>
							</li>
						</ul>
						
						<div class="px-3 py-2 border-bottom shadow-sm z-2">
							<label class="form-label">Controles</label>
							
							<div class="row row-cols-lg-auto g-3 mb-3">
								<div class="col-12 d-grid d-lg-block">
									<div class="btn-group" role="group">
										<button type="button" class="btn btn-outline-secondary position-relative" disabled>
											Limpar Filtros
										</button>
										<button type="button" class="btn btn-outline-secondary position-relative" data-bs-toggle="modal" data-bs-target="#filterModal">
											Filtrar
										</button>
									</div>										
								</div>

								<div class="col-12 d-grid d-lg-block dropdown">
									<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
										Mais Opções
									</button>
									<ul class="dropdown-menu z-3">
										<li><button type="button" class="dropdown-item" @click="toggleLocation1Visibility">{{map.isLocation1Visible ? 'Ocultar' : 'Exibir'}} Todos Alvos</button></li>
										<li><button type="button" class="dropdown-item" @click="toggleLocation2Visibility">{{map.isLocation2Visible ? 'Ocultar' : 'Exibir'}} Todos Interlocutor</button></li>
										<li><button type="button" class="dropdown-item" @click="toggleHeatmap">Mapa de Calor</button></li>
									</ul>
								</div>
							</div>
						</div>							

						<div id="call-list" class="flex-fill overflow-auto p-3 bg-body-tertiary z-1">
							<section :id="'group' + index1" v-for="(callBlock, index1) in finalCallList" :key="index1">
								<div class="mb-3 d-flex justify-content-center position-sticky z-3" style="top:0;">
									<small class="badge rounded-pill text-bg-secondary opacity-75">
										{{formatDate(callBlock.date, "dddd, DD [de] MMMM [de] YYYY") }}
									</small>
								</div>

								<div class="list-group mb-3">
									<call-component v-for="(call, index2) in callBlock.calls" 
										:id="'call_'+index1+'_'+index2"
										:_id="'call_'+index1+'_'+index2"
										:key="index2"
										:call-data="call"
										@position-refreshed="refreshMapPosition"></call-component>
								</div>
							</section>							
						</div>
					</div>
				</div>				
				<GMapMap class="h-100 w-100 z-0" ref="myMapRef" :center="map.center" :zoom="map.zoom" map-type-id="terrain" :options="map.options">
					<GMapMarker :key="erb" v-for="(erb, index) in erbList1" :position="erb.position" :icon="`${publicPath}blue-pin.png`" @click="openMarker1(index)">
						<GMapInfoWindow :opened="map.openedMarkerIndex1 === index" :closeclick="true" @closeclick="openMarker1(null)">
							<div class="px-3 pb-3">
								<h4 class="mb-2 text-dark mb-2">Estação Radio Base (ERB)</h4>
								<p class="mb-0"><span style="font-weight:bold">Coordenadas (latitude/longitude):</span> {{ erb.position.lat.toFixed(5) }}, {{ erb.position.lng.toFixed(5) }}</p>
								<p><span style="font-weight:bold">Quantiade de Conexões (Alvo):</span> {{ erb.count }}</p>
							</div>						
						</GMapInfoWindow>
					</GMapMarker>			
					<GMapMarker :key="index" v-for="(erb, index) in erbList2" :position="erb.position" :icon="`${publicPath}yellow-pin.png`" @click="openMarker2(index)">
						<GMapInfoWindow :opened="map.openedMarkerIndex2 === index" :closeclick="true" @closeclick="openMarker2(null)">
							<div class="px-3 pb-3">
								<h4 class="mb-2 text-dark mb-2">Estação Radio Base (ERB)</h4>
								<p class="mb-0"><span style="font-weight:bold">Coordenadas (latitude/longitude):</span> {{ erb.position.lat.toFixed(5) }}, {{ erb.position.lng.toFixed(5) }}</p>
								<p><span style="font-weight:bold">Quantiade de Conexões (Interlocutor):</span> {{ erb.count }}</p>
							</div>
						</GMapInfoWindow>
					</GMapMarker>
					<GMapPolygon :paths="azimuthList1" :options="map.azimuthOptions1"/>
					<GMapPolygon :paths="azimuthList2" :options="map.azimuthOptions2"/>
					<GMapPolygon :paths="azimuthCenterList" :options="map.centerLineOptions"/>
					<GMapHeatmap :data="heatData" :options="map.heatmapOptions"></GMapHeatmap>
				</GMapMap>
			</div>	
		</main>

		<footer class="flex-shrink-0 bg-body-tertiary border-top">
			<p class="text-muted small text-center m-0">Desenvolvido por <a target="_blank" href="https://github.com/italofds">Ítalo Santos</a> | © 2024 | Licença GPL-3.0 | Hospedado pelo GitHub Pages | Contribua: <a target="_blank" href="https://github.com/italofds/call-extract-processor">github.com/italofds/call-extract-processor</a></p>	
		</footer>
	</div>
	
	<filter-component></filter-component>
</template>

<script>
import { fileProcess } from '@/utils/processor';
import { formatDate, formatPhoneNumber } from '@/utils/utils.js';
import darkMapStyleJSON from '../assets/dark-map-style.json'
import '../assets/js/color-modes.js'
import CallComponent from './components/CallComponent.vue';
import FilterComponent from './components/FilterComponent.vue';

const AZIMUTH_ANGLE = 90;
const AZIMUTH_RADIUS = 1200;

export default {
	components: {
		CallComponent,
		FilterComponent
	},
	name: 'App',
	data() {
		return {
			publicPath: process.env.BASE_URL,
			selectedFile: "",
			selectedTarget: undefined,
			targetList: [],
			callList: [],
			callListByTarget: [],
			callListByDate: [],
			finalCallList: [],
			currentSection: null,
			myMapRef: null,
			map: {
				isHeatmap: false,
				heatmapOptions: {
					maxIntensity: 10,
					dissipating: true,
					radius: 30
				},
				openedMarkerIndex1: null,
				openedMarkerIndex2: null,
				center: { lat: 0, lng: 0 },
				zoom: 2,
				options: {
					minZoom: 2,
					zoomControl: true,
					streetViewControl: false,
					fullscreenControl: false,
					mapTypeControlOptions: {
						position: 7
					},
				},
				azimuthOptions1: {
					strokeColor: "#78909C",
					strokeOpacity: 0.8,
					strokeWeight: 0.25,
					fillColor: "#0d6efd",
					fillOpacity: 0.35
				},
				azimuthOptions2: {
					strokeColor: "#78909C",
					strokeOpacity: 0.8,
					strokeWeight: 0.25,
					fillColor: "#ffc107",
					fillOpacity: 0.35
				},
				centerLineOptions: {
					strokeColor: "#00ff00",
					strokeOpacity: 0.5,
					strokeWeight: 1,
				},
				isLocation1Visible: true,
				isLocation2Visible: true

			},
			graphData: {
				telCounts: [],
				imeiCounts: []
			}
		};
	},
	methods: {
		formatDate,
		formatPhoneNumber,
		targetSelect() {
			var selectedTargetValue = this.selectedTarget.value;
			this.targetList = this.targetList.filter(function (el) {
				return el.value == selectedTargetValue;
			});
		},
		previewFile(event) {
			this.selectedFile = event.target.files[0];
		},
		handleFormSubmit() {
			var file = this.selectedFile;

			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					this.callList = fileProcess(e.target.result);
					this.generateGraphData();	
					this.findTarget();
					this.generateFinalCallList();					
				}; 
				reader.readAsArrayBuffer(file);
			}
		},
		generateGraphData() {
			let telCountsObj = {};
			let imeiCountsObj = {};
			
			this.callList.forEach(call => {
				[call.telIn, call.telOut].forEach(tel => {
					if (tel) {
						telCountsObj[tel] = (telCountsObj[tel] || 0) + 1;
					}
				});
				
				[call.imeiIn, call.imeiOut].forEach(imei => {
					if (imei) {
						imeiCountsObj[imei] = (imeiCountsObj[imei] || 0) + 1;
					}
				});
			});
			
			this.graphData.telCounts = Object.entries(telCountsObj).map(([tel, count]) => ({'value': tel, 'type':'tel', count })).sort((a, b) => b.count - a.count);
			this.graphData.imeiCounts = Object.entries(imeiCountsObj).map(([imei, count]) => ({'value': imei, 'type':'imei', count })).sort((a, b) => b.count - a.count);
		},
		findTarget() {
			var maxCount = this.callList.length;
			var counts = this.graphData.telCounts.concat(this.graphData.imeiCounts);
			var possibleTargets = counts.filter(function (el) {
				return el.count == maxCount
			});
			this.targetList = possibleTargets;
		},
		generateFinalCallList() {
			if(this.targetList && this.targetList.length >= 1) {				
				const groupedCallsByTarget = [];
				const target = this.targetList[0].value;

				this.callList.forEach((call) => {
					let newCallObj = {};
					newCallObj.type = call.type;
					newCallObj.status = call.status;
					newCallObj.timestamp = call.timestamp;
					newCallObj.duration = call.duration;

					if(call.telOut == target || call.imeiOut == target) {
						newCallObj.direction = "origin";
						newCallObj.tel1 = call.telOut;
						newCallObj.imei1 = call.imeiOut
						newCallObj.location1 = call.locationOut;
						newCallObj.tel2 = call.telIn;
						newCallObj.imei2 = call.imeiIn
						newCallObj.location2 = call.locationIn;						

					} else if (call.telIn == target || call.imeiIn == target) {
						newCallObj.direction = "destination";
						newCallObj.tel1 = call.telIn;
						newCallObj.imei1 = call.imeiIn
						newCallObj.location1 = call.locationIn;
						newCallObj.tel2 = call.telOut;
						newCallObj.imei2 = call.imeiOut
						newCallObj.location2 = call.locationOut;
					}
					newCallObj.location1Visible = newCallObj.location1 ? true : false;
					newCallObj.location2Visible = newCallObj.location2 ? true : false;

					groupedCallsByTarget.push(newCallObj);
				});				

				const groupedCallByDate = {};
				
				groupedCallsByTarget.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
				groupedCallsByTarget.forEach(call => {
					let date = new Date(call.timestamp).toISOString().split('T')[0];
					if (!groupedCallByDate[date]) {
						groupedCallByDate[date] = [];
					}
					groupedCallByDate[date].push(call);
				});

				this.finalCallList = Object.keys(groupedCallByDate).map(date => {
					return {
						date: date,
						calls: groupedCallByDate[date]
					};
				});
			}	
		},
		getAzimuthPaths(locationAttr) {
			const resultList = [];
			
			this.finalCallList.forEach(group => {
				group.calls.forEach(call => {
					if(call[locationAttr] && call[locationAttr + "Visible"]) {
						call[locationAttr].forEach(location => {
							var center = { lat: location.lat, lng: location.lng };
							var startAngle = location.azimuth - AZIMUTH_ANGLE / 2;
							var endAngle = location.azimuth + AZIMUTH_ANGLE / 2;

							var path = [center];
							for (var i = startAngle; i <= endAngle; i += 5) {
								var point = window.google.maps.geometry.spherical.computeOffset(center, AZIMUTH_RADIUS, i);
								path.push(point);								
							}
							resultList.push(path);
						});
					}
				});
			});	
				
			return resultList;
		},
		changeVisibility(locationAttr, visibility) {			
			this.finalCallList.forEach(group => {
				group.calls.forEach(call => {
					if(locationAttr) {
						call[locationAttr + "Visible"] = visibility;
					} else {
						call["location1Visible"] = visibility;
						call["location2Visible"] = visibility;
					}
					
				});
			});	
		},
		toggleLocation1Visibility() {
			this.map.isLocation1Visible = !this.map.isLocation1Visible;			
			this.changeVisibility('location1', this.map.isLocation1Visible);
		},
		toggleLocation2Visibility() {
			this.map.isLocation2Visible = !this.map.isLocation2Visible;			
			this.changeVisibility('location2', this.map.isLocation2Visible);
		},
		getErbPositions(locationAttr) {
			var groupedObject = {};

			this.finalCallList.forEach(group => {
				group.calls.forEach(call => {
					if(call[locationAttr] && call[locationAttr + "Visible"]) {
						call[locationAttr].forEach(location => {
							var key = location.lat + ',' + location.lng;
							if (groupedObject[key]) {
								groupedObject[key].count++;
							} else {
								groupedObject[key] = {
									position: {lat: location.lat, lng: location.lng},
									count: 1
								};
							}
						});
					}
				});
			});	

			return Object.values(groupedObject);
		},
		getHeatmapData() {
			var resultList = [];
			resultList = resultList.concat(this.getErbPositions("location1"));
			resultList = resultList.concat(this.getErbPositions("location2"));

			var finalList = [];
			resultList.forEach(erbLocation => {
				var obj = {};
				obj.location = new window.google.maps.LatLng(erbLocation.position.lat, erbLocation.position.lng);
				obj.weight = erbLocation.count;
				finalList.push(obj);
			});			
			
			if(finalList && finalList.length > 0) {
				finalList = finalList.sort((a, b) => b.weight - a.weight);
				this.map.heatmapOptions.maxIntensity = finalList[0].weight/2;
			}
			
			return finalList;
		},
		openMarker1(id) {
			this.map.openedMarkerIndex1 = id,
			this.map.openedMarkerIndex2 = null
		},
		openMarker2(id) {
			this.map.openedMarkerIndex1 = null,
			this.map.openedMarkerIndex2 = id
		},
		toggleHeatmap() {
			this.map.isHeatmap = !this.map.isHeatmap;
		},
		refreshMapPosition(positions) { 
			if(positions && positions.length == 1) {
				this.myMapRef.setCenter(positions[0]);
			
			} else {
				var bounds = new window.google.maps.LatLngBounds();
				positions.forEach(position => {
					var latLng = new window.google.maps.LatLng(position.lat, position.lng);
					bounds.extend(latLng);
				});
				this.myMapRef.fitBounds(bounds);	
			}					
		}
	},
	computed: {
		erbList1: function() {
			if(!this.map.isHeatmap) {
				return this.getErbPositions("location1");
			}
			return [];
		},
		erbList2: function() {
			if(!this.map.isHeatmap) {
				return this.getErbPositions("location2");
			}
			return [];
		},
		azimuthList1: function() {
			if(!this.map.isHeatmap) {
				return this.getAzimuthPaths("location1");
			}
			return {};
		},
		azimuthList2: function() {
			if(!this.map.isHeatmap) {
				return this.getAzimuthPaths("location2");
			}
			return [];
		},
		azimuthCenterList: function() {
			if(!this.map.isHeatmap) {
				const resultList = [];

				const computePath = (locations) => {
					locations.forEach(location => {
						const center = { lat: location.lat, lng: location.lng };
						const end = window.google.maps.geometry.spherical.computeOffset(center, AZIMUTH_RADIUS, location.azimuth);
						resultList.push([center, end]);
					});
				};
				
				this.finalCallList.forEach(group => {
					group.calls.forEach(call => {
						if (call.location1Visible) computePath(call.location1 || []);
						if (call.location2Visible) computePath(call.location2 || []);
					});
				});

				return resultList;
			}
			return [];			
		},
		heatData: function() {
			if(this.map.isHeatmap) {
				return this.getHeatmapData();
			}

			return [];			
		}
	},
	setup() {
		const mapStyle = darkMapStyleJSON;

		return {
			mapStyle
		}
	},
	mounted() {
		this.$refs.myMapRef.$mapPromise.then((map) => {
			this.myMapRef = map;
		});
		
		if(document.documentElement.getAttribute("data-bs-theme") === "dark"){
			this.map.options.styles = darkMapStyleJSON;
		}

		const mutationCallback = (mutationsList) => {
			for (const mutation of mutationsList) {
				if (
				mutation.type !== "attributes" ||
				mutation.attributeName !== "data-bs-theme"
				) {
				return
				}

				if(mutation.target.getAttribute("data-bs-theme") === "dark") {
					this.map.options.styles = darkMapStyleJSON;
				} else {
					this.map.options.styles = [];
				}
			}
		}
		const observer = new MutationObserver(mutationCallback);
		observer.observe(document.documentElement, { attributes: true });
	}
}
</script>

<style>
	.form-label {
		font-weight: bold;
	}
	.form-label:after {
		content: ":";
	}

	.bi {
		width: 1em;
		height: 1em;
		vertical-align: -.125em;
		fill: currentcolor;
	}

	.dropdown-menu .active .bi {
		display: block !important;
	}

	.navbar-brand:hover {
		text-decoration: underrow;
	}

	.navbar-brand a {
		text-decoration: none;
	}

	.navbar-brand a:hover {
		text-decoration: underline;
	}

	.navbar-icon {
		height: 20px;
	}

	.cover {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color:rgba(0, 0, 0, 0.75);
		z-index: 1;
		backdrop-filter: blur(10px);
	}

	.menu {
		min-width: 100%;
	}

	@media (min-width: 576px) {
		.menu {
			min-width: 576px;
		}
	}

	.menu.collapsing {
		-webkit-transition: none !important;
		transition: none !important;
		display: none !important;
	}
</style>