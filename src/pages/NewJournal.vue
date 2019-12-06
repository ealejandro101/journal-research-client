<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <header-research></header-research>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 backgroundImg3">
        <div class="container mb-5">
          <div class="row">
            <div class="col">
              <span class="font-weight-bold">Registra tu revista</span>
              <div class="div-text">
                <p
                  class="text-justify"
                >Dardo es una red de revistas científicas de acceso abierto (Open Access) que tiene como objetivo la difusión de las publicaciones seriadas y brindar a los investigadores información precisa sobre dónde pueden enviar sus manuscritos. A través de la publicación de llamados a publicar (Call for papers) en el sitio web y en las redes sociales, Dardo quiere establecer comunicaciones eficaces entre editores e investigadores que permitan la publicación ágil y mejorar la calidad de las revistas científicas. Ver más información</p>
              </div>
              <br />
            </div>
          </div>
          <div v-if="!optionsForm.isLogged" class="row">
            <div class="col">
              <p>Para postular una revista debes de <router-link to="/Registro">registrarte</router-link> e <router-link to="/Login">iniciar sesión</router-link> en nuestra plataforma.</p>
            </div>
          </div>
          <div v-else class="row">
            <div class="col-12">
              <journal-general-form 
                @save="save"
                :mode="'new-journal'"
                :revista="models.revista" 
                :radicional="models.radicional" 
                :rcontactos="models.rcontactos"  
                :ridiomas="models.ridiomas"  
                :rindexaciones="models.rindexaciones"  
                :rubicacion="models.rubicacion"  
                :revistascategorias="models.revistascategorias"  
                :rpalabraclave="models.rpalabraclave"  
              />
            </div>
            <div class="col-12">
              <div v-if="optionsForm.errors.length > 0" class="mt-2">
                <error-notification :errors="optionsForm.errors"></error-notification>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 px-0">
        <footer-research></footer-research>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js';
import jsonHeaderOptions from "@/utilities/headerOptions.js";
import HeaderResearch from "@/components/HeaderResearch";
import FooterResearch from "@/components/FooterResearch";
import JournalGeneralForm from "@/components/journalEdition/JournalGeneralForm"
import ErrorNotification from "@/components/ErrorNotification.vue";

export default {
  name: "nueva-revista",
  components: {
    HeaderResearch,
    FooterResearch,
    JournalGeneralForm,
    ErrorNotification
  },
  data() {
    return {
      tabIndex: 0,
      models: {
        revista: JSON.parse(JSON.stringify(this.$store.getters.models.revista)),
        radicional: JSON.parse(JSON.stringify(this.$store.getters.models.radicional)),
        rcontactos: JSON.parse(JSON.stringify(this.$store.getters.models.rcontactos)),
        ridiomas: JSON.parse(JSON.stringify(this.$store.getters.models.ridiomas)),
        rindexaciones: JSON.parse(JSON.stringify(this.$store.getters.models.rindexaciones)),
        rubicacion: JSON.parse(JSON.stringify(this.$store.getters.models.rubicacion)),
        revistascategorias: JSON.parse(JSON.stringify(this.$store.getters.models.revistascategorias)),
        rpalabraclave: JSON.parse(JSON.stringify(this.$store.getters.models.rpalabraclave))
      },
      optionsForm: {
        isLogged: false,
        oldPostulations: [],
        errors: [],
        saveIsUsed: false
      }
    };
  },
  created() {
    this.$store.commit("setCurrentPage", "nueva-revista");
    this.models.revistascategorias.categories = []
    this.models.rindexaciones.indexaciones = []
    this.models.ridiomas.idiomas = []
    this.models.rpalabraclave.palabrasclave = ""
    //Configuraciones si se esta logueado o no
    this.optionsForm.isLogged = this.$store.getters.editorId !== undefined && this.$store.getters.editorId !== null
  },
  methods: {
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
      let route = `Editors/${editorId}/postFullJournal`
      this.$store.getters.providerService.postModel(route, { models: this.models }).then(response => {
        alert('Se ha postulado su revista con éxito.')
        this.models.revista = JSON.parse(JSON.stringify(this.$store.getters.models.revista))
        this.models.rcontactos = JSON.parse(JSON.stringify(this.$store.getters.models.rcontactos))
        this.models.radicional = JSON.parse(JSON.stringify(this.$store.getters.models.radicional))
        this.models.ridiomas = JSON.parse(JSON.stringify(this.$store.getters.models.ridiomas))
        this.models.rindexaciones = JSON.parse(JSON.stringify(this.$store.getters.models.rindexaciones))
        this.models.rubicacion = JSON.parse(JSON.stringify(this.$store.getters.models.rubicacion))
        this.models.revistascategorias = JSON.parse(JSON.stringify(this.$store.getters.models.revistascategorias))
        this.models.rpalabraclave = JSON.parse(JSON.stringify(this.$store.getters.models.rpalabraclave))
        this.optionsForm.saveIsUsed = false
      }).catch(error => {
        alert('Ha ocurrido un error al itentar postular su revista.')
        this.optionsForm.errors.push(error.response.data.error.message)
        this.optionsForm.saveIsUsed = false
      })
    }
  }
};
</script>

<style scoped>
.max-width-30 {
  max-width: 30em;
}
.div-text {
  border-radius: 10px;
  padding: 5px;
}

#searchAutoComplete {
  background: black;
  color: blue;
}

.containerIframe {
  height: 50vh;
}
</style>