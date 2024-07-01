<template>
	<div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="filterModalLabel">Filtrar Registros</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="row g-3">
						<div class="col-md-6">
							<label for="inputInitialDate" class="form-label">Data Inicial</label>
							<input type="date" class="form-control" id="inputInitialDate">
						</div>
						<div class="col-md-6">
							<label for="inputFinalDate" class="form-label">Data Final</label>
							<input type="date" class="form-control" id="inputFinalDate">
						</div>
                        <div class="col-md-6">
							<label for="inputInitialTime" class="form-label">Hora Inicial</label>
							<input type="time" class="form-control" id="inputInitialTime">
						</div>
						<div class="col-md-6">
							<label for="inputFinalTime" class="form-label">Hora Final</label>
							<input type="time" class="form-control" id="inputFinalTime">
						</div>
						<div class="col-md-6">
							<label for="inputDuration" class="form-label">Duração Mínima</label>
							<input type="number" min="1" step="1" class="form-control" id="inputDuration">
						</div>
                        <div class="col-md-6">
							<label for="selectType" class="form-label">Tipo de Chamada</label>
							<select class="form-select" id="selectType">
								<option value="">Todos</option>
                                <option value="">Chamada Efetuada</option>                                
                                <option value="">Chamada Efetuada (Não Completada)</option>
                                <option value="">Mensagem Enviada</option>
                                <option value="">Chamada Recebida</option>
                                <option value="">Chamada Recebida (Não Completada)</option>
                                <option value="">Mensagem Recebida</option>
							</select>
						</div>
						<div class="col-md-6">
							<label for="selectTel" class="form-label">Interlocutor (Tel.)</label>
							<select class="form-select" id="selectTel">
								<option value="">Todos</option>
							</select>
						</div>
                        <div class="col-md-6">
							<label for="selectIMEI" class="form-label">Interlocutor (IMEI)</label>
							<select class="form-select" id="selectIMEI">
								<option value="">Todos</option>
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Limpar Filtros</button>
					<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: 'FilterComponent',
    props: {
    },
    data () {
        return {
        }
    }, 
    mounted () {
    },
    methods: {
    }
};
</script>

<style>    
</style>