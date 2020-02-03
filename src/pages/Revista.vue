<template>
  <div class="containerPage">
    <div id="headerResearch" class="headerS">
      <header-research></header-research>
    </div>
    <div class="container-fluid mt-3 backgroundImg3">
      <div class="row">
        <div class="col">
          <div class="divClose mb-3">
            <div class="d-flex align-items-center cursor-pointer" @click="back">
              <i class="fas fa-long-arrow-alt-left position-relative float-left mr-2"></i>
              <p class="float-left mb-0"> Volver a la lista</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ul class="nav nav-tabs">
            <li @click="changeCurrentSection(1)" class="nav-item">
              <p :class="{active: currentSection == 1 && initialAnnouncement === undefined}" class="nav-link mb-0 cursor-pointer">Revista</p>
            </li>
            <li v-if="hasCrossref" @click="changeCurrentSection(2)" class="nav-item">
              <p :class="{active: currentSection == 2 && initialAnnouncement === undefined}" class="nav-link mb-0 cursor-pointer">Cited by</p>
            </li>
            <li v-for="(item, index) in convocatorias" :key="index" @click="changeCurrentSection(index + 3)" class="nav-item">
              <p :class="{active: currentSection == index + 3 || initialAnnouncement == item.id}" class="liNavConvocatorias nav-link text-dark mb-0 cursor-pointer">
                {{ 'Call for Papers ' + (index + 1) }}
              </p>
            </li>
            
          </ul>
        </div>
      </div>
      <div class="row pageContent">
        <div v-if="isLoading" class="col-12 d-flex justify-content-center">
          <div style="max-width: 7em">
            <img :src="loadingGif" alt="Cargando ...">
          </div>
        </div>
        <div v-show="currentSection === 1 && initialAnnouncement === undefined" class="col">
          <DetailedJournalCard 
            v-if="idJournal !== ''" 
            :id="idJournal" @refreshCategory="refreshJournals"
            :isSubscribed="isSubscribed"
            @loaded="loaded"
            @unsubscribe="unsubscribe"
            @subscribe="subscribe">
          </DetailedJournalCard>
          <div v-if="doesNotExist"> No se encontraron revistas con el ISSN/EISSN dado</div>
        </div>
        <div v-show="currentSection === 2 && initialAnnouncement === undefined" class="col">
          <Articles v-if="idJournal && hasCrossref" :journalId="idJournal" />
        </div>
        <template v-for="(item, index) in convocatorias">
          <div :key="index" v-if="currentSection == index + 3 || initialAnnouncement == item.id" class="col">
            <DetailedAnnouncements 
              @loaded="loaded" 
              @subscribe="subscribe"
              :isSubscribed="isSubscribed"
              @unsubscribe="unsubscribe"
              :idConvocatoria="item.id">
            </DetailedAnnouncements>
          </div>
        </template>
        
      </div>
      <div class="row">
        <div class="col">
          <carousel :perPageCustom="[[576, 2],[768,4],[992,6]]" style="width: 100%">
            <slide v-for="item in revistas" :key="item.id">
              <div @click="openJournal(item)">
                <summaryJournalCard class="summaryCard"
                  :id="item.id.toString()"
                  :titulo='item.titulo'
                  :descripcion='item.descripcion'
                  :urlImg="item.imagen"
                  :isMiniature="true">
                </summaryJournalCard>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
      <div class="row">
        <div class="col p-0">
          <footer-research></footer-research>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imgJournalDefoult from "@/assets/journalImgDefault.jpeg";
import loadingGifImport from '@/assets/gifs/loading.gif'

import axios from "axios";
import ProviderService from "@/providerServices/providerServices.js";
import jsonHeaderOptions from "@/utilities/headerOptions.js"

import DetailedJournalCard from "@/components/DetailedJournalCard";
import DetailedAnnouncements from "@/components/DetailedAnnouncements";
import Articles from "@/components/journalView/Articles.vue"
import HeaderResearch from "@/components/HeaderResearch";
import BarraBusqueda from "@/components/BarraBusqueda";
import LogoResearch from "@/components/LogoResearch";
import summaryJournalCard from "@/components/summaryJournalCard ";
import { Carousel, Slide } from 'vue-carousel';
import FooterResearch from "@/components/FooterResearch";




export default {
  name: 'revista',
  props: {},
  components: {
    DetailedJournalCard,
    HeaderResearch,
    BarraBusqueda,
    LogoResearch,
    summaryJournalCard,
    Carousel,
    Slide,
    DetailedAnnouncements,
    FooterResearch,
    Articles
  },
  data() {
    return {
      revistas: [],
      idJournal: "",
      loadingGif: undefined,
      isLoading: false,
      doesNotExist: false,
      currentSection: 1,
      convocatorias: [],
      idConvocatoria: undefined,
      initialAnnouncement: undefined,
      isSubscribed: false,
      hasCrossref: false
    };
  },
  created(){
    this.$store.commit('setCurrentPage', 'revista')
    this.loadingGif = loadingGifImport
    this.isLoading = true
    window.scrollTo(0, 0);
  },
  mounted() {
    this.restartPage()
    window.scrollTo(0, 0);
  },
  watch: {
    "$route.params.search": function() {
      this.isLoading = true
      this.restartPage()
      window.scrollTo(0, 0);
    }
  },
  methods: {
    subscribe(){
      this.$store.getters.providerService.subscribeEditorJournal(this.idJournal).then((data) => {
        this.isSubscribed = true
        alert("Se ha suscrito con éxito en la revista.")
      }).catch((err) => {
        console.log(err);
        alert("Ha ocurrido un error, intente mas tarde.")
      })
    },
    unsubscribe(){
      this.$store.getters.providerService.unsubscribeEditorJournal(this.idJournal).then((data) => {
        this.isSubscribed = false
        alert("Ha removido su suscripción con éxito.")
      }).catch((err) => {
        console.log(err);
        alert("Ha ocurrido un error, intente mas tarde.")
      })
    },
    back(){
      this.$router.push({
        path: '/ListaRevistas'
      })
    },
    restartPage(){
      let _self = this
      this.changeParams(function(err, data){
        //Generador de datos para las estadisticas
        _self.$store.getters.providerService.addJournalInteraction(_self.idJournal, 'nroVisitas')

        if (_self.$store.getters.editorId !== undefined && _self.$store.getters.editorId !== null) {
          //Si el usuario esta conectado
          _self.$store.getters.providerService.getModel(`Editors/${_self.$store.getters.editorId}/revistasSuscritas/${_self.idJournal}`).then(response => {
            _self.isSubscribed = true
          }).catch(err => {
            _self.isSubscribed = false
          })
        }
        _self.$store.getters.providerService.getModel(`Revista/${_self.idJournal}/hasCrossref`).then(response => {
          _self.hasCrossref = response.data.state
        })
        _self.$store.getters.providerService
          .getModel("Convocatoria", {
            where: {
              revistaId: _self.idJournal,
              fechaFinal: {
                gte: Date.now()
              },
              estado: 1
            },
            order: 'fechaFinal DESC',
            fields: {
              id: true, 
              titulo: true
            }
          })
          .then(response => {
            _self.convocatorias = response.data;
        });
      });
    },
    changeParams: function(callback) {
      this.revistas = []
      this.idJournal = ""
      this.currentSection = 1
      this.convocatorias = []
      let search = this.$route.params.search.split('&')
      let convocatoria = search[1]
      if (convocatoria) {//si hay convocatoria inicialemente
        this.initialAnnouncement = convocatoria.split('=')[1]
      }else{
        this.changeCurrentSection(1)
      }
      let parametro = search[0]
      let prefix, postfix;
      if (parametro === undefined) {
        //Poner que no se encuentra revista
      } else {
        prefix = parametro.split("=")[0];
        postfix = parametro.split("=")[1];
        switch (prefix) {
          case "issn":
            this.getPageJournalISSN(postfix, callback);
            break;

          case "eissn":
            this.getPageJournalEISSN(postfix, callback);
            break;
          default:
            //Redireccionarlo a lista revistas
            break;
        }
      }
    },
    getPageJournalISSN:function(issn, callback){
        let query=process.env.ROOT_API+'Revista/?filter={"where": {"issn":"'+issn.toString()+'"}}';
        axios.get(query).then(response =>{
            if(response.data.lenth == 0){
              this.doesNotExist = true
              return
            }
            this.idJournal = response.data[0].id.toString()
            callback(null, null)
        }).catch(error =>{
            console.log(error);          
        })
    },
    getPageJournalEISSN:function(eissn, callback){
      let query=process.env.ROOT_API+'Revista/?filter={"where": {"eissn":"'+eissn.toString()+'"}}';
       axios.get(query).then(response =>{
            if(response.data.lenth == 0){
              this.doesNotExist = true
              return
            }
            this.idJournal = response.data[0].id.toString()
            callback(null, null)
       }).catch(error =>{
          console.log(error);          
       })
    },
    getJournalsParam: function(query) {
      this.revistas=[];
      axios.get(process.env.ROOT_API + "RevistasCategorias?filter=" + query)
        .then(response => {          
          let revista =response.data;  
          revista.forEach(element => {
            axios.get(process.env.ROOT_API+"Revista/"+element.revistaId).then(response =>{
                  if (response.data.imagen == null) {
                    response.data.imagen = imgJournalDefoult;
                  }
                  this.revistas.push(response.data);
            }).catch(error=>{
              console.log(error);              
            })
          });
          
        });
    },
    openJournal: function(journal) {
      if(journal.eissn !== undefined && journal.eissn !== '' && journal.eissn !== null){
        this.$router.push({    
          path: "/Revista/eissn=" + journal.eissn
        });
      }else{
        this.$router.push({    
          path: "/Revista/issn=" + journal.issn
        });
      }
    },
    refreshJournals (idCategory) {
      let filter = {
        where: {
          categoriaId: idCategory
        },
        limit: 6
      }
      this.getJournalsParam(JSON.stringify(filter));
    },
    loaded() {
      this.isLoading = false
    },
    changeCurrentSection(index){
      this.currentSection =  index
      this.initialAnnouncement = undefined
    }
  }
};
</script>

<style scoped>
.headerS {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
}
.body-card-revistas {
  background-color: #d8d1bb;
  height: 100%;
  width: 100%;
}
#divDetailedJournal {
  display: none;
}
.summaryCard {
  margin: 1em 10%;
  width: 80%;
  display: inline-block;
  text-decoration: none;
}
#divFiltros {
  padding: 1em 0px;
  transition-property: width;
  transition-timing-function: linear;
  transition-duration: 0.6s;
  transition-delay: 0s;
}
#divRevistas {
  transition-property: all;
  transition-timing-function: linear;
  transition-duration: 0.3s;
  transition-delay: 0s;
  padding: 0px;
}
.dinamicHeigth {
  overflow-y: auto;
  height: calc(100vh - 5em);
}
.divContentRevistas {
  padding-right: 15px;
  overflow: auto;
}
@media (max-width: 576px) {
  #divDetailedJournal {
    position: fixed !important;
  }
  #divFiltros {
    display: inline;
  }
}
.liNavConvocatorias{
  max-width: 25ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav-tabs .nav-link{
  border-color: #cacaca;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-link:hover{
  background-color: #efefef;
}
.pageContent{
  min-height: 5em;
}

</style>