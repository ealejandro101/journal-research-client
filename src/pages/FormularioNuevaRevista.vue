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
              <!--<p>Para postular una revista debes de <router-link to="/Registro">registrarte</router-link> en nuestra plataforma.</p>-->
              <div class="containerIframe">
                <iframe src="https://docs.google.com/forms/d/1OSJu-gvgYjs-_n6HqnGErUKPu8L1Uyglj-s1GI89js0/viewform?embedded=true" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0"></iframe>
              </div>
            </div>
          </div>
          <div v-else class="row">
            <div class="col-12">
              <b-card>
                <b-tabs v-model="tabIndex" small card>
                  <b-tab title="Revista">
                    <div class="container-fluid">
                      <div class="row justify-content-center">
                        <div class="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7">
                          <journal-form @save="save" :revista="models.revista" :radicional="models.radicional"></journal-form>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Contacto">
                    <div class="container-fluid">
                      <div class="row justify-content-center">
                        <div class="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7">
                          <contact-form @save="save" :rcontactos="models.rcontactos" :radicional="models.radicional"></contact-form>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Categorias de la revista">
                    <div class="d-flex justify-content-center">
                      <div class="w-75 p-3 align-items-center">
                        <category-form @save="save" 
                          :revista="models.revista"
                          :rindexaciones="models.rindexaciones"
                          :ridiomas="models.ridiomas"
                          :revistascategorias="models.revistascategorias"
                          ></category-form>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Ubicación">
                    <div class="d-flex justify-content-center">
                      <div class="w-75 p-3 align-items-center">
                        <location-form @save="save" :rubicacion="models.rubicacion"></location-form>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Adicionales">
                    <div class="d-flex justify-content-center">
                      <div class="w-75 p-3 align-items-center">
                        <additional-form @save="save" :radicional="models.radicional"></additional-form>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Palabras clave">
                    <div class="d-flex justify-content-center">
                      <div class="w-75 p-3 align-items-center">
                        <words-form @save="save" :rpalabraclave="models.rpalabraclave" :radicional="models.radicional"></words-form>
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
            <div class="col-12">
              <button @click="tabIndex = (tabIndex - 1) % 6" class="btn btn-info">Anterior</button>
              <button @click="tabIndex = (tabIndex + 1) % 6" class="btn btn-info">Siguiente</button>
              <button @click="save" class="btn btn-success">Enviar postulación</button>
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
import JournalForm from "@/components/formularioNuevaRevista/JournalForm.vue";
import ContactForm from "@/components/formularioNuevaRevista/ContactForm.vue";
import AdditionalForm  from "@/components/formularioNuevaRevista/AdditionalForm.vue";
import CategoryForm from "@/components/formularioNuevaRevista/CategoryForm.vue";
import LocationForm from "@/components/formularioNuevaRevista/LocationForm.vue";
import WordsForm from "@/components/formularioNuevaRevista/WordsForm.vue";
import ErrorNotification from "@/components/ErrorNotification.vue";

export default {
  name: "nueva-revista",
  components: {
    HeaderResearch,
    FooterResearch,
    JournalForm,
    ContactForm,
    AdditionalForm,
    CategoryForm,
    LocationForm,
    WordsForm,
    ErrorNotification
  },
  data() {
    return {
      tabIndex: 0,
      models: {
        revista: this.$store.getters.models.revista,
        radicional: this.$store.getters.models.radicional,
        rcontactos: this.$store.getters.models.rcontactos,
        ridiomas: this.$store.getters.models.ridiomas,
        rindexaciones: this.$store.getters.models.rindexaciones,
        rubicacion: this.$store.getters.models.rubicacion,
        revistascategorias: this.$store.getters.models.revistascategorias,
        rpalabraclave: this.$store.getters.models.rpalabraclave
      },
      optionsForm: {
        countries: [],
        fields: [],
        states: [],
        cities: [],
        periodicities: [],
        typeReviewPeer: [],
        optionCategories: [],
        languages: [],
        licenses: [],
        politics: [],
        citationStyles: [],
        indexations: [],
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
    save(){
      this.optionsForm.errors = []
      if (this.optionsForm.saveIsUsed) {
        this.optionsForm.saveIsUsed = false
        return
      }
      this.optionsForm.saveIsUsed = true
      let xcat = this.models.revistascategorias.categories.length
      let xind = this.models.rindexaciones.indexaciones.length
      let xidi = this.models.ridiomas.idiomas.length
      if (xcat == 0 || xind == 0 || xidi == 0) {
        alert('Ha ocurrido un error al itentar postular su revista.')
        this.optionsForm.errors.push('Debe de llenar los siguientes campos: categorías, indexaciones e idiomas')
        this.optionsForm.saveIsUsed = false
        return
      }
      for (const iterator of this.models.rindexaciones.indexaciones) {
        if (!this.models.rindexaciones[`parameter-${iterator}`]) {
          alert('Ha ocurrido un error al itentar postular su revista.')
          this.optionsForm.errors.push('Debe de llenar los enlaces de las indexaciones.')
          this.optionsForm.saveIsUsed = false
          return
        }
      }
      let editorId = this.$store.getters.editorId
      let route = `Editors/${editorId}/postFullJournal`
      this.$store.getters.providerService.postModel(route, { models: this.models }).then(response => {
        alert('Se ha postulado su revista con éxito.')
        this.optionsForm.saveIsUsed = false
      }).catch(error => {
        alert('Ha ocurrido un error al itentar postular su revista.')
        this.optionsForm.errors.push(error.response.data.error.message)
        this.optionsForm.saveIsUsed = false
      })
    },
    /*getOldPostulation(){
      let editorId = localStorage.getItem('editorId')
      if (editorId === null || editorId === undefined) {
        return
      }
      this.$store.getters.providerService.getModel(`Editors/${editorId}/propietarioRevista`, {
        where: {
          //estaActiva: 0
        }
      }).then(res =>{
        this.optionsForm.oldPostulations = res.data
      }).catch(err => {
        alert(err)
      })
    },*/
    
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