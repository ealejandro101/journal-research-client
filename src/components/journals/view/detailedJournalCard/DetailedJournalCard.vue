<template>
  <div class="container-fluid pt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2">
        <JournalActionsCard 
          :title="revista.titulo" 
          :image="revista.imagen" 
          :isSubscribed="isSubscribed" 
          @unsubscribe="$emit('unsubscribe')" 
          @subscribe="$emit('subscribe')" 
        />
      </div>
      <div class="col-12 col-sm-7 col-md-8 col-lg-9 col-xl-9 d-flex flex-column">
        <div class="d-flex justify-content-around">
          <div v-if="revista.categorias && revista.categorias.length > 0">
            <div v-for="(categoria, index) in revista.categorias " :key="'category-'+index" class="float-left ml-1 mr-1">                
              <b-badge @click="applyFilter('category='+categoria.id)" href="#" variant="light">
                <b-img rounded="circle" class="iconos" :src="iconosCategorias[categoria.nombre]" />
                {{categoria.nombre}}
              </b-badge>
            </div>
          </div>
          <div v-if="revista.indexaciones && revista.indexaciones.length > 0">
            <div v-for="(indexacion, i) in revista.indexaciones" :key="'indexacion'+i" class="float-left ml-1 mr-1">
              <b-badge variant="primary" @click="addInteraction('clicksIndexaciones')" @click.middle="addInteraction('clicksIndexaciones')">
                <a v-if="indexacion.parametro != ''" :href="indexacion.parametro" class="text-light" target="_blank" v-text="indexacion.indexacion.indexaciones"></a>
                <a v-else class="text-light" v-text="indexacion.indexacion.indexaciones"></a>
              </b-badge>
            </div>
            <div v-if="revista.licencia !== undefined" class="float-left ml-1 mr-1">
              <!--Propiedades de img-->
              <div>
                <div style="max-width: 7em; margin-left: 1em;" class="float-left">
                  <img :src="revista.licencia.imagen" :alt="revista['licenciaImg']">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="card-text text-justify clasDescription pt-3" v-html="revista.descripcion" />
          <div v-if="revista.plabrasclaves && revista.plabrasclaves.length > 0">
            <span class="text-left font-weight-bold float-left">Palabras Clave:</span> <br>
            <div v-for="(word, index) in revista.plabrasclaves" :key="'word-'+index" class="float-left ml-1 mr-1" @click="applyFilter('word='+word.id)">         
              <b-badge  href="#" variant="primary">
                {{ word.palabraClave }} 
              </b-badge>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row border-top my-3 pt-3 justify-content-center">
      <div class="col-12 col-sm-8 col-lg-9">
        <JournalInfo 
          v-if="revista.id" 
          :journalId="revista.id" 
          @addInteractionKey="addInteractionKey"
          @applyFilter="applyFilter"
        />
      </div>
      <div class="col-12 col-sm-4 col-md-4 col-lg-3 d-flex flex-column align-self-center">
        <div v-if="revista.id" class="d-flex">
          <VisitorStatistics :journalId="revista.id" />
        </div>
        <div class="d-flex">
          <div class="indexScopus mb-2" ref="indexScopus"></div>
        </div>
      </div>
    </div>
    <div v-if="revista.infoAdicional && revista.infoAdicional.videopresentacion" class="row d-flex justify-content-center pb-4">
      <div class="col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7">
        <iframe 
          style="width: 100%; height: 60vh;" 
          :src="revista.infoAdicional.videopresentacion" 
          frameborder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Articles from "@/components/journals/view/Articles.vue"
import JournalActionsCard from "@/components/journals/view/detailedJournalCard/JournalActionsCard.vue"
import JournalInfo from "@/components/journals/view/detailedJournalCard/JournalInfo.vue"
import VisitorStatistics from "@/components/journals/statistics/VisitorStatistics.vue"


import imgJournalDefoult from "@/assets/journalImgDefault.jpeg";
import ingenieriaLogo from "@/assets/ingenieria-200x167.png";
import cienciasAgricolas from "@/assets/ciencias-agricolas-y-ambientales-200x167.png";
import cienciasBiologicas from "@/assets/ciencias-biologicas-200x167.png";
import cienciasSalud from "@/assets/ciencias-de-la-salud-200x167.png";
import cienciasSociales from "@/assets/ciencias-sociales-200x167.png";
import humanidades from "@/assets/humanidades-200x167.png";
import cienciasExactas from "@/assets/ciencias-exactas-y-de-la-Tierra-200x167.png";
import linguisticaLiteraturaArtes from "@/assets/linguistica200x167.png";


export default {
  props: ['id', 'isSubscribed', 'revista'],
  components: {
    Articles, JournalActionsCard, JournalInfo, VisitorStatistics
  },
  data() {
    return {
      iconosCategorias: {
        "Ciencias Agrícolas y Ambientales": cienciasAgricolas,
        "Ciencias Biológicas": cienciasBiologicas,
        "Ciencias Exactas": cienciasExactas,
        "Ciencias Sociales": cienciasSociales,
        "Ingeniería": ingenieriaLogo,
        "Ciencias de la salud": cienciasSalud,
        "Humanidades": humanidades,
        "Lingüística, literatura y artes": linguisticaLiteraturaArtes
      },
      indexScopus: null
    };
  },
  mounted () {
    this.initDetailedJournal()
  },
  watch: {
    id: function() {
      this.initDetailedJournal()
    }
  },
  methods: {
    applyFilter(filter){
      this.$router.push({path: '/ListaRevistas/'+filter})
    },
    initDetailedJournal () {
      if (document.getElementById("indexScopus")) {
        document.getElementById("indexScopus").innerHTML = ""
      }
      
      //Emite un evento con el fin de pasarle una categoria al padre para que busque revistas que podrian gustar
        if (this.revista.categorias[0].id) {
          this.$emit('refreshCategory', this.revista.categorias[0].id)
        }
      //SJR
      for (const iterator of this.revista.indexaciones) {
        if(iterator.indexacion.indexaciones == "SJR"){
          this.indexScopus = iterator.parametro
          this.$refs.indexScopus.innerHTML = this.indexScopus
        }
      }
      
      this.$emit('loaded')
    },
    isVoid(param){
      return param === null || param === undefined?true:false
    },
    addInteraction(interaction){
      //Generador de datos para las estadisticas
      this.$store.getters.providerService.addJournalInteraction(this.id, interaction)
    },
    addInteractionKey(key){
      let attributes = {
        doi: 'clicksDoi', 
        correo: 'clicksCorreo', 
        url: 'clicksSitioweb', 
        guiaAutores: 'clicksGuiaAutores', 
        facebook: 'clicksRedes', 
        instagram: 'clicksRedes', 
        twitter: 'clicksRedes'
      }
      this.addInteraction(attributes[key])
    }
  }
};
</script>

<style scoped>
.iconos {
  width: 30px;
  height: 30px;
}
.divSummaryImg {
  position: relative;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 1em;
}
.divSummaryImg img {
  height: 100%;
  width: auto;
  max-height: 15em;
}
.divClose {
  width: 100%;
  height: 2em;
  position: relative;
}
.divClose i {
  position: absolute;
  left: 0;
  font-size: 2em;
  cursor: pointer;
}
.displayNone{
  display: none !important;
}
.indexScopus{
  max-width: 15em;
}
</style>