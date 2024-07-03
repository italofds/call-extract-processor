<template>
	<div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header bg-body-tertiary">
					<h1 class="modal-title fs-5" id="filterModalLabel">Filtrar Registros</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="row g-3">
						<div class="col-md-6">
							<label for="inputInitialDate" class="form-label">Data Inicial</label>
							<input type="date" class="form-control" id="inputInitialDate" v-model="form.initDate">
						</div>
						<div class="col-md-6">
							<label for="inputFinalDate" class="form-label">Data Final</label>
							<input type="date" class="form-control" id="inputFinalDate" v-model="form.finalDate">
						</div>
                        <div class="col-md-6">
							<label for="inputInitialTime" class="form-label">Hora Inicial</label>
							<input type="time" class="form-control" id="inputInitialTime" v-model="form.initTime">
						</div>
						<div class="col-md-6">
							<label for="inputFinalTime" class="form-label">Hora Final</label>
							<input type="time" class="form-control" id="inputFinalTime" v-model="form.finalTime">
						</div>
						<div class="col-md-6">
							<label for="inputDuration" class="form-label">Duração Mínima</label>
							<input type="number" min="0" step="1" class="form-control" id="inputDuration" v-model="form.duration">
						</div>
                        <div class="col-md-6">
							<label for="selectType" class="form-label">Tipo de Chamada</label>
							<select class="form-select" id="selectType" v-model="form.type">
								<option value="">Todos</option>
                                <option value="outgoing call completed">Chamada Efetuada</option>                                
                                <option value="outgoing call not-completed">Chamada Efetuada (Não Completada)</option>
                                <option value="outgoing message delivered">Mensagem Enviada</option>
                                <option value="incoming call completed">Chamada Recebida</option>
                                <option value="incoming call not-completed">Chamada Recebida (Não Completada)</option>
                                <option value="incoming message delivered">Mensagem Recebida</option>
							</select>
						</div>
						<div class="col-md-6">
							<label for="selectTel" class="form-label">Interlocutor (Tel.)</label>
							<select class="form-select" id="selectTel" v-model="form.tel">
								<option value="">Todos</option>
								<option v-for="item in telCounts" :value="item" :key="item">{{ `${formatPhoneNumber(item.value)} [${item.count}]` }}</option>
							</select>
						</div>
                        <div class="col-md-6">
							<label for="selectIMEI" class="form-label">Interlocutor (IMEI)</label>
							<select class="form-select" id="selectIMEI" v-model="form.imei">
								<option value="">Todos</option>
								<option v-for="item in imeiCounts" :value="item" :key="item">{{ `${item.value} [${item.count}]` }}</option>
							</select>
						</div>
					</div>				
				</div>
				<div class="d-flex modal-footer bg-body-tertiary">
					<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="clear">Limpar Filtros</button>
					<button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="save">Salvar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { formatPhoneNumber, formatDate, returnDate } from '@/utils/utils.js';

export default {
    name: 'FilterComponent',
    props: {
		originalCallList: null
    },
    data () {
        return {
			telCounts: null,
			imeiCounts: null,
			form: {
				initDate: "",
				finalDate: "",
				initTime: "",
				finalTime: "",
				duration: "",
				type: "",
				tel: "",
				imei: ""
			}
		}
    },
	mounted () {
		this.loadFields();
	},
    methods: {
		formatPhoneNumber,
		formatDate,
		returnDate,
		loadFields() {
			let telCountsObj = {};
			let imeiCountsObj = {};
			
			this.originalCallList.forEach(call => {
				if(call.interlocutor.tel) {
					telCountsObj[call.interlocutor.tel] = (telCountsObj[call.interlocutor.tel] || 0) + 1;
				}				
				if(call.interlocutor.imei) {
					imeiCountsObj[call.interlocutor.imei] = (imeiCountsObj[call.interlocutor.imei] || 0) + 1;
				}
			});

			this.telCounts = Object.entries(telCountsObj).map(([tel, count]) => ({'value': tel, count })).sort((a, b) => b.count - a.count);
			this.imeiCounts = Object.entries(imeiCountsObj).map(([imei, count]) => ({'value': imei, count })).sort((a, b) => b.count - a.count);
		},
		clear() {
			this.form.initDate = "";
			this.form.finalDate = "";
			this.form.initTime = "";
			this.form.finalTime = "";
			this.form.duration = "";
			this.form.type = "";
			this.form.tel = "";
			this.form.imei = "";
			this.save();
		},
		save() {
			const filtered = this.originalCallList.filter(call => 
				(!this.form.duration || call.duration >= this.form.duration)  &&
				(!this.form.initDate || new Date(call.timestamp) >= returnDate(this.form.initDate, "YYYY-MM-DD").setHours(0,0,0)) &&
				(!this.form.finalDate || new Date(call.timestamp) <= returnDate(this.form.finalDate, "YYYY-MM-DD").setHours(23,59,59)) &&
				(!this.form.initTime || new Date().setHours(formatDate(call.timestamp, "HH"), formatDate(call.timestamp, "mm"),0) >= returnDate(this.form.initTime, "HH:mm")) &&
				(!this.form.finalTime || new Date().setHours(formatDate(call.timestamp, "HH"), formatDate(call.timestamp, "mm"),0) <= returnDate(this.form.finalTime, "HH:mm")) &&
				(!this.form.type || call.description == this.form.type) &&
				(!this.form.tel || call.interlocutor.tel == this.form.tel.value) &&
				(!this.form.imei || call.interlocutor.imei == this.form.imei.value)
			);
			this.$emit('update', filtered);
		}
    }
};
</script>

<style>    
</style>