<template>
    <div class="list-group-item list-group-item-action p-3" :style="call.isSelected ? 'background-color: var(--bs-list-group-action-active-bg)' : ''" :autofocus="call.isSelected" >
        <div class="d-flex justify-content-between align-items-center">
            <div class="h4 m-0">
                <i v-if="formatedCall.description == 'outgoing call undefined'" class="bi bi-telephone-outbound text-muted" title="Chamada Efetuada"></i>
                <i v-if="formatedCall.description == 'incoming call undefined'" class="bi bi-telephone-inbound text-muted" title="Chamada Recebida"></i>
                <i v-if="formatedCall.description == 'outgoing call completed'" class="bi bi-telephone-outbound text-success" title="Chamada Efetuada (completada)"></i>
                <i v-if="formatedCall.description == 'incoming call completed'" class="bi bi-telephone-inbound text-danger" title="Chamada Recebida (completada)"></i>
                <i v-if="formatedCall.description == 'outgoing call not-completed'" class="bi bi-telephone-x text-success" title="Chamada Efetuada (Não completada)"></i>
                <i v-if="formatedCall.description == 'incoming call not-completed'" class="bi bi-telephone-x text-danger" title="Chamada Recebida (Não completada)"></i>
                <i v-if="formatedCall.description == 'outgoing message undefined'" class="bi bi-envelope-arrow-up text-muted" title="Mensagem Enviada"></i>
                <i v-if="formatedCall.description == 'incoming message undefined'" class="bi bi-envelope-arrow-down text-muted" title="Mensagem Recebida"></i>
                <i v-if="formatedCall.description == 'outgoing message delivered'" class="bi bi-envelope-arrow-up text-success" title="Mensagem Enviada"></i>
                <i v-if="formatedCall.description == 'incoming message delivered'" class="bi bi-envelope-arrow-down text-danger" title="Mensagem Recebida"></i>
            </div>
            
            <div class="d-flex flex-row align-items-center" style="min-width: 185px;">
                <div class="me-2">
                    <input v-if="hasTargetLocation" type="checkbox" class="btn-check" :id="checkId1" v-model="call.target.isVisible">
                    <input v-if="!hasTargetLocation" type="checkbox" class="btn-check" :id="checkId1" disabled>
                    <label :class="'btn rounded-circle ' + (hasTargetLocation ? 'btn-outline-primary' : 'btn-outline-secondary')" :for="checkId1" @mouseover="setAzimuthFocus(call.target.locations)" @mouseout="setAzimuthFocus(null)">
                        <i :class="'bi ' + (hasTargetLocation ? 'bi-broadcast-pin' : 'bi-x-lg')"></i>
                    </label>
                </div>                
                <div>
                    <div class="textTel1 mb-2 h6" title="Telefone Alvo">
                        <span>{{formatPhoneNumber(formatedCall.target.tel) }}</span>
                    </div>
                    <div class="textIMEI1 small text-muted" title="IMEI Alvo">
                        <i class="bi bi-cpu me-1"></i>
                        <span>{{ formatedCall.target.imei ? formatedCall.target.imei : 'Desconhecido' }}</span>
                    </div>
                </div>
            </div>

            <div class="d-flex flex-row align-items-center" style="min-width: 180px;">
                <div class="me-2">
                    <input v-if="hasInterlocutorLocation" type="checkbox" class="btn-check" :id="checkId2" v-model="call.interlocutor.isVisible">
                    <input v-if="!hasInterlocutorLocation" type="checkbox" class="btn-check" :id="checkId2" disabled>
                    <label :class="'btn rounded-circle ' + (hasInterlocutorLocation ? 'btn-outline-warning' : 'btn-outline-secondary')" :for="checkId2" @mouseover="setAzimuthFocus(call.interlocutor.locations)" @mouseout="setAzimuthFocus(null)">
                        <i :class="'bi ' + (hasInterlocutorLocation ? 'bi-broadcast-pin' : 'bi-x-lg')"></i>
                    </label>
                </div>                
                <div>
                    <div class="textTel2 mb-2 h6" title="Telefone Interlocutor">
                        <span>{{formatPhoneNumber(formatedCall.interlocutor.tel) }}</span>
                    </div>
                    <div class="textIMEI2 small text-muted" title="IMEI Interlocutor">
                        <i class="bi bi-cpu me-1"></i>
                        <span>{{ formatedCall.interlocutor.imei ? formatedCall.interlocutor.imei : 'Desconhecido' }}</span>
                    </div>
                </div>
            </div>  
            
            <div class="d-flex flex-column text-muted">
                <div><small>{{ formatDate(formatedCall.timestamp, "HH:mm") }}</small></div>
                <div><small>{{ formatedCall.duration }}s</small></div>                    
            </div>                    
        </div>              
    </div>
</template>

<script>

import { formatDate, formatPhoneNumber } from '@/utils/utils.js';

export default {
    name: 'CallComponent',
    props: {
        formatedCall: null,
        rawCall: null
    },
    emits: ['positionRefreshed', 'azimuthFocused'],
    data () {
        return {
            checkId1: 'check1_' + this.formatedCall.index,
            checkId2: 'check2_' + this.formatedCall.index,
            call: this.rawCall
        }
    }, 
    computed: {
        hasTargetLocation() {
            var locationList = this.formatedCall.target.locations;
            return locationList && locationList.length > 0;
        },
        hasInterlocutorLocation() {
            var locationList = this.formatedCall.interlocutor.locations;
            return locationList && locationList.length > 0;
        }
    },
    methods: {
        formatPhoneNumber,
        formatDate,
        setAzimuthFocus(locations) {
            this.$emit('azimuthFocused',  locations);
        }
        /* emitPositionRefreshed(data, locationAttr) {
            //only emits if the visibility is changed to visible
            if(data[locationAttr+"Visible"]) {
                this.$emit('positionRefreshed',  data[locationAttr]);
            }            
        } */
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