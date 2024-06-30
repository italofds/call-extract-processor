<template>
    <div class="list-group-item list-group-item-action p-3">
        <div class="d-flex justify-content-between align-items-center">
            <div class="h4 m-0">
                <i v-if="callData.type == 'voice' && callData.status == 'completed' && callData.direction =='origin'" class="bi bi-telephone-outbound text-success" title="Chamada Efetuada"></i>
                <i v-if="callData.type == 'voice' && callData.status == 'completed' && callData.direction =='destination'" class="bi bi-telephone-inbound text-danger" title="Chamada Recebida"></i>
                <i v-if="callData.type == 'voice' && callData.status == 'not-completed' && callData.direction =='origin'" class="bi bi-telephone-x text-success" title="Chamada Efetuada (Não completada)"></i>
                <i v-if="callData.type == 'voice' && callData.status == 'not-completed' && callData.direction =='destination'" class="bi bi-telephone-x text-danger" title="Chamada Recebida (Não completada)"></i>
                <i v-if="callData.type == 'message' && callData.direction =='origin'" class="bi bi-envelope-arrow-up text-success" title="Mensagem Enviada"></i>
                <i v-if="callData.type == 'message' && callData.direction =='destination'" class="bi bi-envelope-arrow-down text-danger" title="Mensagem Recebida"></i>
            </div>
            
            <div class="d-flex flex-row align-items-center" style="min-width: 185px;">
                <div class="me-2">
                    <input v-if="callData.location1" type="checkbox" class="btn-check" :id="checkId1" v-model="call.location1Visible" @change="emitPositionRefreshed(callData, 'location1')">
                    <input v-if="!callData.location1" type="checkbox" class="btn-check" :id="checkId1" disabled>
                    <label :class="'btn rounded-circle ' + (callData.location1 ? 'btn-outline-primary' : 'btn-outline-secondary')" :for="checkId1">
                        <i :class="'bi ' + (callData.location1 ? 'bi-broadcast-pin' : 'bi-x-lg')"></i>
                    </label>
                </div>                
                <div>
                    <div class="textTel1 mb-2 h6" title="Telefone Alvo">
                        <span>{{formatPhoneNumber(callData.tel1) }}</span>
                    </div>
                    <div class="textIMEI1 small text-muted" title="IMEI Alvo">
                        <i class="bi bi-cpu me-1"></i>
                        <span>{{ callData.imei1 ? callData.imei1 : 'Desconhecido' }}</span>
                    </div>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center" style="min-width: 180px;">
                <div class="me-2">
                    <input v-if="callData.location2" type="checkbox" class="btn-check" :id="checkId2" v-model="call.location2Visible" @change="emitPositionRefreshed(callData, 'location2')">
                    <input v-if="!callData.location2" type="checkbox" class="btn-check" :id="checkId2" disabled>
                    <label :class="'btn rounded-circle ' + (callData.location2 ? 'btn-outline-warning' : 'btn-outline-secondary')" :for="checkId2">
                        <i :class="'bi ' + (callData.location2 ? 'bi-broadcast-pin' : 'bi-x-lg')"></i>
                    </label>
                </div>                
                <div>
                    <div class="textTel2 mb-2 h6" title="Telefone Interlocutor">
                        <span>{{formatPhoneNumber(callData.tel2) }}</span>
                    </div>
                    <div class="textIMEI2 small text-muted" title="IMEI Interlocutor">
                        <i class="bi bi-cpu me-1"></i>
                        <span>{{ callData.imei2 ? callData.imei2 : 'Desconhecido' }}</span>
                    </div>
                </div>
            </div>  
            
            <div class="d-flex flex-column text-muted">
                <div><small>{{ formatDate(callData.timestamp, "HH:mm") }}</small></div>
                <div><small>{{ callData.duration }}s</small></div>                    
            </div>                    
        </div>              
    </div>
</template>

<script>

import { formatDate, formatPhoneNumber } from '@/utils/utils.js';

export default {
    name: 'CallComponent',
    props: {
        _id: null,
        callData: null
    },
    emits: ['positionRefreshed'],
    data () {
        return {
            checkId1: null,
            checkId2: null,
            call: this.callData
        }
    }, 
    mounted () {
        this.checkId1 = this._id + "_check1";
        this.checkId2 = this._id + "_check2";
    },
    methods: {
        formatPhoneNumber,
        formatDate,
        emitPositionRefreshed(data, locationAttr) {
            //only emits if the visibility is changed to visible
            if(data[locationAttr+"Visible"]) {
                this.$emit('positionRefreshed',  data[locationAttr]);
            }            
        }
    }
};
</script>

<style>
    .erbCheck {
		border-radius: .5rem;
		border: var(--bs-border-width) solid var(--bs-border-color); 
	}   

    input[type=checkbox].check2:checked{
        background-color: var(--bs-warning);
        border-color: var(--bs-warning);
    }

    input[type=checkbox].check2:focus{
        box-shadow: 0 0 0 .25rem rgba(var(--bs-warning-rgb), .25);
        border-color: var(--bs-warning);
    }
    
</style>