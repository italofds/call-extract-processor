<template>
	<div class="d-flex flex-column vh-100">
		<header class="navbar navbar-expand navbar-dark bg-dark shadow flex-shrink-0 z-2">
			<div class="container-fluid">
				<div>
					<button v-if="target" class="navbar-toggle btn btn-dark d-inline-block me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
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
			<div class="cover d-flex align-items-center"  v-if="!target">

				<div class="container text-center text-light" v-if="!possibleTargetList">
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

				<div class="modal position-static d-block" v-if="possibleTargetList">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header bg-body-tertiary">
								<h5 class="modal-title">Selecionar Alvo</h5>
							</div>
							<div class="modal-body">
								<div class="alert alert-warning" role="alert">
									<i class="bi bi-exclamation-triangle-fill me-2"></i>
									<strong>Atenção!</strong> Não foi possível identificar o alvo correto ao processar o Extrato de Chamadas.
								</div>
								<p>A identificação do alvo é fundamental para organizar a lista de chamadas de acordo com o foco específico.</p>
								<p><strong>Selecione qual dos telefones ou IMEI's é o alvo correto:</strong></p>
								
								<label v-for="target in possibleTargetList" :key="target" class="border bg-body-tertiary p-2 mb-1 rounded w-100">
									<input class="me-3" type="radio" :value="target" v-model="form.selectedTarget">
									<strong>{{ target.type == 'tel' ? 'Telefone' : 'IMEI' }}:</strong> {{ target.type == 'tel' ? formatPhoneNumber(target.value) : target.value}}
								</label>
							</div>
							<div class="modal-footer bg-body-tertiary">
								<button @click="targetSelect" type="button" class="btn btn-primary" :disabled="!form.selectedTarget">Abrir</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="d-flex flex-row h-100">
				<div id="navbarToggleExternalContent" class="menu collapse show overflow-auto shadow z-1" v-if="target">
					<div class="d-flex flex-column h-100">
						<h4 class="p-3 border-bottom bg-body-secondary mb-0">
							Extrato de Chamadas
						</h4>
						<div class="px-3 py-2">
							<div class="d-flex my-3">
								<img src="../assets/img/vivo.png" class="border bg-light rounded" style="width:110px;" />
								<div class="ms-3 align-self-center">
									<h5>
										{{ formatPhoneNumber(target.value) }} 
										<small v-if="target.type=='tel'" class="text-body-secondary fw-light">(Tel. Alvo)</small>
										<small v-if="target.type=='imei'" class="text-body-secondary fw-light">(IMEI Alvo)</small>
									</h5>

									<ul class="list-unstyled mb-0">
										<li><strong>{{ this.rawCallList.length }}</strong> registros de chamada</li>
										<li>De <strong>{{ formatDate(this.targetCallList[0].timestamp, "DD/MM/YYYY") }}</strong> a <strong>{{ formatDate(this.targetCallList[this.targetCallList.length-1].timestamp, "DD/MM/YYYY") }}</strong></li>
									</ul>
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs mx-3">
							<li class="nav-item">
								<button class="nav-link active" data-bs-toggle="tab" data-bs-target="#list-tab-pane" type="button" role="tab" aria-controls="list-tab-pane" aria-selected="true">Lista</button>
							</li>
							<li class="nav-item">
								<button class="nav-link" data-bs-toggle="tab" data-bs-target="#chart-tab-pane" type="button" role="tab" aria-controls="chart-tab-pane" aria-selected="false">Gráficos</button>
							</li>
						</ul>

						<div class="tab-content flex-fill">
							<div class="tab-pane fade show active d-flex flex-column h-100" id="list-tab-pane" role="tabpanel" aria-labelledby="list-tab" tabindex="0">
								<div class="px-3 py-2 border-bottom shadow-sm z-2">
									<label class="form-label">Exibindo {{ filteredCallList.length }} de {{ targetCallList.length }} registros</label>
									
									<div class="row row-cols-lg-auto g-3 mb-3">
										<div class="col-12 d-grid d-lg-block">
											<div class="btn-group" role="group">
												<button type="button" class="btn btn-outline-secondary position-relative" :disabled="!isFilterDefined" @click="this.$refs.filter.clear()">
													Limpar Filtros
												</button>
												<button type="button" class="btn btn-outline-secondary position-relative" data-bs-toggle="modal" data-bs-target="#filterModal">
													Filtrar
													<span v-if="isFilterDefined" class="position-absolute top-0 start-100 translate-middle p-2 bg-primary border border-light rounded-circle">
														<span class="visually-hidden">Alert</span>
													</span>
												</button>
											</div>										
										</div>

										<div class="col-12 d-grid d-lg-block dropdown">
											<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
												Mais Opções
											</button>
											<ul class="dropdown-menu z-3">
												<li><button type="button" class="dropdown-item" @click="toggleLocationVisibility('target')">{{isTargetLocationVisible ? 'Ocultar' : 'Exibir'}} Todos Alvos</button></li>
												<li><button type="button" class="dropdown-item" @click="toggleLocationVisibility('interlocutor')">{{isInterlocutorLocationVisible ? 'Ocultar' : 'Exibir'}} Todos Interlocutor</button></li>
												<li><button type="button" class="dropdown-item" @click="this.$refs.map.toggleHeatmap()">{{this.$refs.map.isHeatmapVisible ? 'Ocultar' : 'Exibir'}} Mapa de Calor</button></li>
											</ul>
										</div>
									</div>
								</div>							

								<div id="call-list" class="flex-fill overflow-auto p-3 bg-body-tertiary z-1" style="height: 0;">
									<section :id="'group' + index1" v-for="(callGroup, index1) in dateCallList" :key="index1">
										<div class="mb-3 d-flex justify-content-center position-sticky z-3" style="top:0;">
											<small class="badge rounded-pill text-bg-secondary opacity-75">
												{{formatDate(callGroup.date, "dddd, DD [de] MMMM [de] YYYY") }}
											</small>
										</div>

										<div class="list-group mb-3">
											<call-component v-for="(call) in callGroup.calls" 
												:id="`call${call.index}`"
												:key="call.index"
												:formated-call="call"
												:raw-call="targetCallList[call.index]"
												@azimuth-focused="setAzimuthFocus">
											</call-component>
										</div>
									</section>
									
									<div v-if="!filteredCallList || filteredCallList.length == 0" class="w-100 h-100 d-flex align-items-center justify-content-center">
										<div class="d-flex flex-column align-items-center">
											<i class="bi bi-exclamation-triangle-fill h1 text-secondary"></i>
											<small class="text-muted">Não foram encontrados registros para os filtros informados.</small>
										</div>								
									</div>
								</div>
							</div>

							<div class="tab-pane fade" id="chart-tab-pane" role="tabpanel" aria-labelledby="chart-tab" tabindex="1">
								<!-- <chart-component :data="graphData.telCounts" :title="'Quantidade de Registros'" :type="'line'"></chart-component> -->
							</div>
						</div>
					</div>
				</div>				
				<map-component ref="map" :original-call-list="targetCallList" :filtered-call-list="filteredCallList" :focused-azimuth="focusedAzimuth" @erb-selected="selectCalls"/>
			</div>	
		</main>

		<footer class="flex-shrink-0 bg-body-tertiary border-top">
			<p class="text-muted small text-center m-0">Desenvolvido por <a target="_blank" href="https://github.com/italofds">Ítalo Santos</a> | © 2024 | Licença GPL-3.0 | Hospedado pelo GitHub Pages | Contribua: <a target="_blank" href="https://github.com/italofds/call-extract-processor">github.com/italofds/call-extract-processor</a></p>	
		</footer>
	</div>
	
	<filter-component ref="filter" :original-call-list="targetCallList" @update="updateFilteredCallList" v-if="targetCallList"/>
</template>

<script>
import { fileProcess } from '@/utils/processor';
import { formatDate, formatPhoneNumber } from '@/utils/utils.js';
import CallComponent from './components/CallComponent.vue';
import FilterComponent from './components/FilterComponent.vue';
import MapComponent from './components/MapComponent.vue';
/* import ChartComponent from './components/ChartComponent.vue'; */

export default {
	components: {
		CallComponent,
		FilterComponent,
		MapComponent,
		/* ChartComponent */
	},
	name: 'App',
	data() {
		return {		
			target: null,
			possibleTargetList: null,
			rawCallList: null,
			targetCallList: null,
			filteredCallList: null,
			isTargetLocationVisible: true,
			isInterlocutorLocationVisible: true,
			focusedAzimuth: null,
			form: {
				selectedFile: null,
				selectedTarget: null,
			},
			map: {
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
			},
			graphData: {
				telCounts: null,
				imeiCounts: null
			}
		};
	},
	methods: {
		formatDate,
		formatPhoneNumber,
		targetSelect() {
			this.possibleTargetList = null;
			this.target = this.form.selectedTarget;
			this.createTargetCallList();			
		},
		previewFile(event) {
			this.form.selectedFile = event.target.files[0];
		},
		handleFormSubmit() {
			var file = this.form.selectedFile;

			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					this.rawCallList = fileProcess(e.target.result);
					this.createGraphData();	
					this.findTargets();
				}; 
				reader.readAsArrayBuffer(file);
			}
		},
		createGraphData() {
			let telCountsObj = {};
			let imeiCountsObj = {};
			
			this.rawCallList.forEach(call => {
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
		findTargets() {
			var maxCount = this.rawCallList.length;
			var counts = this.graphData.telCounts.concat(this.graphData.imeiCounts);
			var possibleTargets = counts.filter(function (el) {
				return el.count == maxCount
			});

			if(possibleTargets && possibleTargets.length > 0) {
				if(possibleTargets.length == 1) {
					this.target = possibleTargets[0];
					this.createTargetCallList();
				} else {
					this.possibleTargetList = possibleTargets;
				}

			} else {
				alert("Ocorreu um erro ao buscar os alvos.");
			}	
		},
		createTargetCallList() {
			const groupedCallList = [];

			this.rawCallList.forEach((call, index) => {
				let newCallObj = {};
				newCallObj.index = index;
				newCallObj.isSelected = false;
				newCallObj.type = call.type;
				newCallObj.status = call.status;
				newCallObj.timestamp = call.timestamp;
				newCallObj.duration = call.duration;

				if(call.telOut == this.target.value || call.imeiOut == this.target.value) {
					newCallObj.description = `outgoing ${call.type=='voice'?'call':call.type} ${call.status}`;
					newCallObj.target = {
						isVisible: true,
						tel: call.telOut,
						imei: call.imeiOut,
						locations: call.locationOut
					}
					newCallObj.interlocutor = {
						isVisible: true,
						tel: call.telIn,
						imei: call.imeiIn,
						locations: call.locationIn
					}						

				} else if (call.telIn == this.target.value || call.imeiIn == this.target.value) {
					newCallObj.description = `incoming ${call.type=='voice'?'call':call.type} ${call.status}`;
					newCallObj.target = {
						isVisible: true,
						tel: call.telIn,
						imei: call.imeiIn,
						locations: call.locationIn
					}
					newCallObj.interlocutor = {
						isVisible: true,
						tel: call.telOut,
						imei: call.imeiOut,
						locations: call.locationOut
					}	
				}

				groupedCallList.push(newCallObj);
			});

			this.targetCallList = groupedCallList.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
			this.filteredCallList = [...this.targetCallList];
		},
		toggleLocationVisibility(obj) {
			let visibility;
			if(obj === "target") {
				this.isTargetLocationVisible = !this.isTargetLocationVisible;
				visibility = this.isTargetLocationVisible;

			} else if (obj === "interlocutor") {
				this.isInterlocutorLocationVisible = !this.isInterlocutorLocationVisible;
				visibility = this.isInterlocutorLocationVisible;
			}

			this.filteredCallList.forEach(call => {
				this.targetCallList[call.index][obj].isVisible = visibility
			});	
		},
		updateFilteredCallList(filtered) {
			this.filteredCallList = filtered;
		},
		selectCalls(erb) {
			this.filteredCallList.forEach(filteredCall => {
				var targetErbList = [];
				if(filteredCall.target.locations && filteredCall.target.locations.length > 0) {
					targetErbList = filteredCall.target.locations;
				}
				var interlocutorErbList = [];
				if(filteredCall.interlocutor.locations && filteredCall.interlocutor.locations.length > 0) {
					interlocutorErbList = filteredCall.interlocutor.locations;
				}				
				var callErbList = targetErbList.concat(interlocutorErbList);
				callErbList.every(location => {					
					if(erb && location.lat == erb.lat && location.lng == erb.lng) {
						this.targetCallList[filteredCall.index].isSelected = true;
						const element = document.getElementById("call"+filteredCall.index);
						element.scrollIntoView({ behavior: "smooth" });
						return false;
					} else {
						this.targetCallList[filteredCall.index].isSelected = false;
					}
					return true;
				});	
			});
		},
		setAzimuthFocus(locations) {
			this.focusedAzimuth = locations;
		}
	},
	computed: {
		dateCallList() {
			if(this.filteredCallList) {
				const groupedCall = {};

				this.filteredCallList.forEach(call => {
					let date = formatDate(call.timestamp, "YYYY-MM-DD");
					if (!groupedCall[date]) {
						groupedCall[date] = [];
					}
					groupedCall[date].push(call);
				});

				return Object.keys(groupedCall).map(date => {
					return {
						date: date,
						calls: groupedCall[date]
					};
				});
			}
			
			return null			
		},
		isFilterDefined() {
			if(this.filteredCallList && this.targetCallList && this.filteredCallList.length < this.targetCallList.length) {
				return true;
			}
			return false;
		}
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