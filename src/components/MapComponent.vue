<template>
	<GMapMap class="h-100 w-100 z-0" ref="myMapRef" :center="center" :zoom="zoom" map-type-id="terrain" :options="mapOptions">
		<div v-if="!isHeatmapVisible">
			<GMapMarker :key="index" v-for="(erb, index) in erbList" :position="erb" @click="toggleInfo(index);selectErb(erb)">
				<GMapInfoWindow :opened="visibleInfoIndex === index" :closeclick="true" @closeclick="toggleInfo(null);selectErb(null)">
					<div class="px-3 pb-3">
						<h4 class="mb-2 text-dark mb-2">Estação Radio Base (ERB)</h4>
						<p class="mb-0"><span style="font-weight:bold">Coordenadas (latitude/longitude):</span> {{ erb.lat.toFixed(7) }}, {{ erb.lng.toFixed(7) }}</p>
						<p><span style="font-weight:bold">Registros Visíveis de Ligações/Mensagens:</span> {{ erb.count }}</p>
					</div>
				</GMapInfoWindow>
			</GMapMarker>
		</div>		
		<GMapPolygon v-if="!isHeatmapVisible" :paths="targetAzimuthList" :options="targetOptions"/>
		<GMapPolygon v-if="!isHeatmapVisible" :paths="interlocutorAzimuthList" :options="interlocutorOptions"/>
		<GMapPolygon v-if="!isHeatmapVisible" :paths="focusAzimuthList" :options="focusedOptions"/>
		<GMapHeatmap v-if="isHeatmapVisible" :data="heatmapList" :options="heatmapOptions"></GMapHeatmap>
	</GMapMap>
</template>

<script>
import darkMapStyleJSON from '@/json/dark-map-style.json';

const AZIMUTH_ANGLE = 90;
const AZIMUTH_RADIUS = 1200;

export default {
    name: 'MapComponent',
	emits: ['erbSelected'],
    props: {
		originalCallList: null,
		filteredCallList: null,
		focusedAzimuth: null,
    },	
	watch: {
		erbList(newValue, oldValue) {
			if(newValue != null && newValue.length > 0) {
				if(oldValue == null || Math.abs(newValue.length - oldValue.length) > 1) {
					this.animateMap(newValue);
				}
			}

			const countOld = oldValue?.length || 0;
			const countNew = newValue?.length || 0;

			if (countNew > 0 && countNew !== countOld) {
				this.toggleInfo(null);
				this.selectErb(null);
			}			
		}
	},
    data () {
        return {
			visibleCallList: this.filteredCallList,
			myMapRef: null,
			center: { lat: 0, lng: 0 },
			zoom: 2,
			isHeatmapVisible: false,
			visibleInfoIndex: null,
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
			focusedOptions: {
				strokeColor: "#000000",
				strokeOpacity: 0.8,
				strokeWeight: 0.25,
				fillColor: "#000000",
				fillOpacity: 0.25
			},
			heatmapOptions: {				
				dissipating: true,
				radius: 30
			}
			/*publicPath: process.env.BASE_URL,*/
		}
    },
	mounted () {
		this.$refs.myMapRef.$mapPromise.then((map) => {
			this.myMapRef = map;
		});
		
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
							var radius = location.radius || AZIMUTH_RADIUS;

							var path = [center];
							for (var i = startAngle; i <= endAngle; i += 5) {
								var point = window.google.maps.geometry.spherical.computeOffset(center, radius, i);
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
		},
		toggleInfo(index) {
			this.visibleInfoIndex = index;			
		},
		selectErb(erb) {
			this.$emit('erbSelected', erb);
		},
		animateMap(positions) {
			if(positions && positions.length > 0) {
				if(positions.length == 1) {
					this.myMapRef.panTo(positions[0]);
				
				} else {
					var bounds = new window.google.maps.LatLngBounds();
					positions.forEach(position => {
						var latLng = new window.google.maps.LatLng(position.lat, position.lng);
						bounds.extend(latLng);
					});
					if(this.myMapRef) {
						this.myMapRef.fitBounds(bounds);
					}					
				}
			}
		}
    },
	computed: {
		erbList() {
			if(this.filteredCallList) {
				var erbCountObj = {};

				this.filteredCallList.forEach(filteredCall => {
					const originalCall = this.originalCallList[filteredCall.index];
					var callErbCountObj = {};

					if(originalCall.target.isVisible && originalCall.target.locations) {
						originalCall.target.locations.forEach(location => {
							var key = location.lat + ',' + location.lng;
							if(!callErbCountObj[key]) {
								erbCountObj[key] = (erbCountObj[key] || 0) + 1;
								callErbCountObj[key] = 1;
							}				
						});
					}
					if(originalCall.interlocutor.isVisible && originalCall.interlocutor.locations) {
						originalCall.interlocutor.locations.forEach(location => {
							var key = location.lat + ',' + location.lng;
							if(!callErbCountObj[key]) {
								erbCountObj[key] = (erbCountObj[key] || 0) + 1;
								callErbCountObj[key] = 1;
							}
						});
					}

					
					
				});	

				return Object.entries(erbCountObj).map(([key, count]) => (
					{ 
						'lat': parseFloat(key.split(',')[0]), 
						'lng': parseFloat(key.split(',')[1]), 
						'count': count 
					}
				))//.sort((a, b) => b.count - a.count);
			}
			return null;	
		},
		heatmapList() {			
			var heatmapList = [];
			this.erbList.forEach(erbLocation => {
				var obj = {};
				obj.location = new window.google.maps.LatLng(erbLocation.lat, erbLocation.lng);
				obj.weight = erbLocation.count;
				heatmapList.push(obj);
			});		
			console.log(heatmapList);	
			return heatmapList; 
		},
		targetAzimuthList() {
			return this.getAzimuthPaths("target");
		},
		interlocutorAzimuthList() {
			return this.getAzimuthPaths("interlocutor");
		},
		focusAzimuthList() {
			if(this.focusedAzimuth && this.focusedAzimuth.length > 0) {
				const erbsSet = new Set();
				const erbsList = [];
				const azimuthBoundsList = [];
				const azimuthPointsList = [];

				this.focusedAzimuth.forEach(location => {
					var latLngKey = `${location.lat},${location.lng}`;
					if (!erbsSet.has(latLngKey)) {
						erbsSet.add(latLngKey); 
						erbsList.push({lat: location.lat, lng: location.lng});
					}

					var center = { lat: location.lat, lng: location.lng };
					var startAngle = location.azimuth - AZIMUTH_ANGLE / 2;
					var endAngle = location.azimuth + AZIMUTH_ANGLE / 2;
					var radius = location.radius || AZIMUTH_RADIUS;

					var path = [center];
					for (var i = startAngle; i <= endAngle; i += 5) {
						var point = window.google.maps.geometry.spherical.computeOffset(center, radius, i);
						path.push(point);
						azimuthBoundsList.push({ lat: point.lat(), lng: point.lng() });						
					}
					azimuthPointsList.push(path);
				});

				if(erbsList.length == 1) {
					this.animateMap(erbsList);
				} else {
					this.animateMap(azimuthBoundsList);
				}

				return azimuthPointsList;
			}
			
			return [];
		}
	}
};
</script>

<style>    
</style>