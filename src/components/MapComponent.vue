<template>
	<GMapMap class="h-100 w-100 z-0" ref="myMapRef" :center="center" :zoom="zoom" map-type-id="terrain" :options="mapOptions">
		<!-- <GMapMarker :key="erb" v-for="(erb, index) in erbList1" :position="erb.position" :icon="`${publicPath}blue-pin.png`" @click="openMarker1(index)">
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
		<GMapPolygon :paths="azimuthCenterList" :options="map.centerLineOptions"/> -->
		
		<div v-if="!isHeatmapVisible">
			<GMapMarker :key="index" v-for="(erb, index) in erbList" :position="erb" />
		</div>		
		<GMapPolygon v-if="!isHeatmapVisible" :paths="targetAzimuthList" :options="targetOptions"/>
		<GMapPolygon v-if="!isHeatmapVisible" :paths="interlocutorAzimuthList" :options="interlocutorOptions"/>
		<GMapHeatmap v-if="isHeatmapVisible" :data="heatmapList" :options="heatmapOptions"></GMapHeatmap>
	</GMapMap>
</template>

<script>

import darkMapStyleJSON from '../../assets/dark-map-style.json'
import '../../assets/js/color-modes.js'

const AZIMUTH_ANGLE = 90;
const AZIMUTH_RADIUS = 1200;

export default {
    name: 'MapComponent',
    props: {
		originalCallList: null,
		filteredCallList: null
    },
    data () {
        return {			
			myMapRef: null,
			center: { lat: 0, lng: 0 },
			zoom: 2,
			isHeatmapVisible: false,
			mapOptions: {
				minZoom: 2,
				zoomControl: true,
				streetViewControl: false,
				fullscreenControl: false,
				mapTypeControlOptions: {
					position: 7
				},
			},
			targetOptions: {
				strokeColor: "#78909C",
				strokeOpacity: 0.8,
				strokeWeight: 0.25,
				fillColor: "#0d6efd",
				fillOpacity: 0.35
			},
			interlocutorOptions: {
				strokeColor: "#78909C",
				strokeOpacity: 0.8,
				strokeWeight: 0.25,
				fillColor: "#ffc107",
				fillOpacity: 0.35
			},
			heatmapOptions: {				
				dissipating: true,
				radius: 30
			}
			/*publicPath: process.env.BASE_URL,
			isHeatmap: false,
			heatmapOptions: {
				maxIntensity: 10,
				dissipating: true,
				radius: 30
			},
			openedMarkerIndex1: null,
			openedMarkerIndex2: null,
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
			},*/
		}
    },
	mounted () {
		/* this.$refs.myMapRef.$mapPromise.then((map) => {
			this.myMapRef = map;
		}); */
		
		if(document.documentElement.getAttribute("data-bs-theme") === "dark"){
			this.mapOptions.styles = darkMapStyleJSON;
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
					this.mapOptions.styles = darkMapStyleJSON;
				} else {
					this.mapOptions.styles = [];
				}
			}
		}
		const observer = new MutationObserver(mutationCallback);
		observer.observe(document.documentElement, { attributes: true });
	},	
	setup() {
		const mapStyle = darkMapStyleJSON;

		return {
			mapStyle
		}
	},
    methods: {
		getAzimuthPaths(locationAttr) {
			if(this.filteredCallList) {
				const resultList = [];			
				this.filteredCallList.forEach(filteredCall => {
					const originalCall = this.originalCallList[filteredCall.index];
					if(originalCall[locationAttr].isVisible && originalCall[locationAttr].locations) {
						originalCall[locationAttr].locations.forEach(location => {
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
				return resultList;
			}
			return [];			
		},
		toggleHeatmap() {
			this.isHeatmapVisible = !this.isHeatmapVisible;
		}
		/*getErbPositions(locationAttr) {
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
		},*/
		/*getHeatmapData() {
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
		},*/
		/*openMarker1(id) {
			this.map.openedMarkerIndex1 = id,
			this.map.openedMarkerIndex2 = null
		},*/
		/*openMarker2(id) {
			this.map.openedMarkerIndex1 = null,
			this.map.openedMarkerIndex2 = id
		},*/
		/*toggleHeatmap() {
			this.map.isHeatmap = !this.map.isHeatmap;
		},*/
		/*refreshMapPosition(positions) { 
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
		}*/
    },
	computed: {
		erbList() {
			if(this.filteredCallList) {
				var locationlist = [];
				this.filteredCallList.forEach(filteredCall => {
					const originalCall = this.originalCallList[filteredCall.index];
					if(originalCall.target.isVisible && originalCall.target.locations) {
						originalCall.target.locations.forEach(location => {
							locationlist.push(location);
						});
					}
					if(originalCall.interlocutor.isVisible && originalCall.interlocutor.locations) {
						originalCall.interlocutor.locations.forEach(location => {
							locationlist.push(location);
						});
					}
				});	
				return locationlist;
			}
			return null;		
		},
		heatmapList() {			
			var heatmapList = [];
			this.erbList.forEach(erbLocation => {
				var obj = {};
				obj.location = new window.google.maps.LatLng(erbLocation.lat, erbLocation.lng);
				obj.weight = 1;
				heatmapList.push(obj);
			});			
			return heatmapList; 
		},
		targetAzimuthList() {
			return this.getAzimuthPaths("target");
		},
		interlocutorAzimuthList() {
			return this.getAzimuthPaths("interlocutor");
		}

		/* azimuthList1: function() {
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
		} */
	}
};
</script>

<style>    
</style>