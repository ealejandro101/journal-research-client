<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 py-4 d-flex justify-content-around align-items-center">
        <span class="font-weight-bolder">Panel Administrativo</span>
        <button @click="closeSession" class="btn btn-warning"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-edit-journal variant="light">
                <p class="text-left font-weight-bold m-0">Edición de revistas</p>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-edit-journal" visible accordion="my-accordion" role="tabpanel">
              <div class="container-fluid my-4">
                <div class="row">
                  <div class="col-12 col-sm-6 col-md-4">
                    <b-form-group label="Filtro">
                      <b-form-radio-group
                        id="btn-radios-1"
                        v-model="filter"
                        :options="filters"
                        name="radios-btn-default"
                      ></b-form-radio-group>
                    </b-form-group>
                  </div>
                  <div class="col-12 col-sm-6 col-md-4 align-self-center">
                    <span>Revista:</span>
                    <select class="mw-100" v-model="currentJournalIndex">
                      <option v-for="(journal, index) in journals" :key="index" :value="index">
                        {{ journal.titulo }}
                      </option>
                    </select>
                  </div>
                  <div class="col-12 col-sm-6 col-md-4 align-self-center">
                    <b-button @click="approve" variant="outline-primary">Aprobar</b-button>
                    <b-button @click="hide" variant="outline-danger">Ocultar revista</b-button>
                    <b-button variant="danger">Eliminar</b-button>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <p class="mt-2 pl-3 text-left font-weight-bold">Edición de contenido:</p>
                    <template v-if="optionsForm.formReady">
                      <journal-general-form 
                        @save="save"
                        :mode="'admin'"
                        :revista="currentJournal" 
                        :radicional="currentJournal.infoAdicional" 
                        :rcontactos="currentJournal.contacto"  
                        :ridiomas="currentJournal.idiomas"  
                        :rindexaciones="currentJournal.indexaciones"  
                        :rubicacion="currentJournal.ubicacion"  
                        :revistascategorias="currentJournal.categorias"  
                        :rpalabraclave="currentJournal.plabrasclaves"  
                      />
                    </template>
                  </div>
                </div>
              </div>
            </b-collapse>
          </b-card>
        </div>
      </div>
      <div class="col-12">
        <div v-if="optionsForm.errors.length > 0" class="mt-2">
          <error-notification :errors="optionsForm.errors"></error-notification>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JournalGeneralForm from "@/components/formularioNuevaRevista/JournalGeneralForm"
import mixins from "@/utilities/mixins.js"
import ErrorNotification from "@/components/ErrorNotification.vue";

export default {
  name: "admin",
  components: {
    JournalGeneralForm, ErrorNotification
  },
  mixins: [mixins],
  data(){
    return {
      journals: [],
      currentJournalIndex: -1,
      currentJournal: {},
      filter: '',
      filters: [
        { text: 'Todas', value: 'all' },
        { text: 'Aprobadas', value: 'approved' },
        { text: 'Solicitudes', value: 'requests' },
      ],
      optionsForm: {
        isLogged: false,
        oldPostulations: [],
        errors: [],
        saveIsUsed: false,
        formReady: false
      }
    }
  },
  created(){
    this.filter = 'requests'
  },
  watch: {
    async currentJournalIndex(old, value){
      this.optionsForm.formReady = false
      if (this.currentJournalIndex == -1) {
        return
      }
      if (this.journals[this.currentJournalIndex] === undefined || this.currentJournalIndex == null) {
        this.currentJournalIndex = 0
        if (this.journals[this.currentJournalIndex] === undefined || this.currentJournalIndex == null) {
          return alert('Error, intente mas tarde por favor.')
        }
      }
      let journal = {}
      journal = this.journals[this.currentJournalIndex]
      
      if (!journal.infoAdicional) {
        journal.infoAdicional = JSON.parse(JSON.stringify(this.$store.getters.models.radicional))
      }
      if (!journal.contacto) {
        journal.contacto = JSON.parse(JSON.stringify(this.$store.getters.models.rcontactos))
      }
      if (!journal.idiomas) {
        journal.idiomas = JSON.parse(JSON.stringify(this.$store.getters.models.ridiomas))
      }
      if (!journal.indexaciones) {
        journal.indexaciones = JSON.parse(JSON.stringify(this.$store.getters.models.rindexaciones))
      }
      if (!journal.ubicacion) {
        journal.ubicacion = JSON.parse(JSON.stringify(this.$store.getters.models.rubicacion))
      }
      if (!journal.categorias) {
        journal.categorias = JSON.parse(JSON.stringify(this.$store.getters.models.revistascategorias))
      }
      if (!journal.plabrasclaves) {
        journal.plabrasclaves = JSON.parse(JSON.stringify(this.$store.getters.models.rpalabraclave))
      }
      journal.ubicacion.paisId = journal.ubicacion.ciudad.estado.country_id
      journal.ubicacion.estadoId = journal.ubicacion.ciudad.state_id
      await this.$store.getters.providerService
        .getModel(`Revista/${journal.id}/plabrasclaves`).then(response => {
          journal.plabrasclaves = response.data
        })
      this.currentJournal = journal
      this.optionsForm.formReady = true
    },
    filter(){
      let where = {}
      switch (this.filter) {
        case "all":
          where = {}
          break;
      case "approved":
        where = {
          estaActiva: 1
        }
        break;
      case "requests":
        where = {
          estaActiva: 0
        }
        break;
      }
      this.$store.getters.providerService
      .getModel('Revista', {
        where: where,
        include: ['infoAdicional','contacto', 'idiomas', 'indexaciones', 'categorias', {
          relation: 'ubicacion', 
          scope: { 
            include: { 
              relation: 'ciudad',
              scope: { 
                include: { 
                  relation: 'estado',
                  scope: { 
                    include: { 
                      relation: 'pais'
                    } 
                  }
                } 
              }
            } 
          }
        }]
      }).then(response => {
        this.journals = response.data
        this.currentJournalIndex = null
      })
    }
  },
  methods: {
    approve(){
      this.refreshStateJournal(1)
    },
    hide(){
      this.refreshStateJournal(0)
    },
    refreshStateJournal(state){
      this.$store.getters.providerService.patchModel(`Revista/${this.currentJournal.id}`, {
        "estaActiva": state
      }).then(response => {
        location.reload()
      })
    },
    save(models){
      this.optionsForm.errors = []
      if (this.optionsForm.saveIsUsed) {
        this.optionsForm.saveIsUsed = false
        return
      }
      this.optionsForm.saveIsUsed = true
      let xcat = models.revistascategorias.categories.length
      let xind = models.rindexaciones.indexaciones.length
      let xidi = models.ridiomas.idiomas.length
      if (xcat == 0 || xind == 0 || xidi == 0) {
        alert('Ha ocurrido un error al itentar postular su revista.')
        this.optionsForm.errors.push('Debe de llenar los siguientes campos: categorías, indexaciones e idiomas')
        this.optionsForm.saveIsUsed = false
        return
      }
      if (!models.revista.issn && !models.revista.eissn) {
        alert('Ha ocurrido un error al itentar postular su revista.')
        this.optionsForm.errors.push('Debe de llenar al menos uno de los siguientes campos: ISSN, EISSN')
        this.optionsForm.saveIsUsed = false
        return
      }
      for (const iterator of models.rindexaciones.indexaciones) {
        if (!models.rindexaciones[`parameter-${iterator}`] && iterator !== 1 && iterator !== 3 && iterator !== 8) {
          alert('Ha ocurrido un error al itentar postular su revista.')
          this.optionsForm.errors.push('Debe de llenar los enlaces de las indexaciones.')
          this.optionsForm.saveIsUsed = false
          return
        }
      }
      if (models.rcontactos.editorOrcid != null) {
        models.rcontactos.editorOrcid = 'https://orcid.org/0000-'+models.rcontactos.editorOrcid
      }
      let editorId = this.$store.getters.editorId
      let route = `Revista/${models.revista.id}/updateFullJournal`
      this.$store.getters.providerService.postModel(route, { models: models }).then(response => {
        alert('Se ha actualizado su revista con éxito.')
        this.optionsForm.saveIsUsed = false
      }).catch(error => {
        console.log(error);
        alert('Ha ocurrido un error al itentar actualizar su revista.')
        this.optionsForm.errors.push(error.response.data.error.message)
        this.optionsForm.saveIsUsed = false
      })
    },
  }
};
</script>

<style>
</style>