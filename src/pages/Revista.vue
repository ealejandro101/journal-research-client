<template>
  <div class="containerPage">
    <div id="headerResearch" class="headerS">
      <header-research :inputOptions="optionsHeader"></header-research>
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
            <li @click="currentSection = 1" class="nav-item">
              <p :class="{active: currentSection == 1}" class="nav-link mb-0 cursor-pointer">Revista</p>
            </li>
            <li v-for="(item, index) in convocatorias" :key="index" @click="currentSection = index + 2" class="nav-item">
              <p :class="{active: currentSection == index + 2}" class="liNavConvocatorias nav-link text-dark mb-0 cursor-pointer">{{ item.titulo }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div v-if="isLoading" class="col-12 d-flex justify-content-center">
          <div style="max-width: 7em">
            <img :src="loadingGif" alt="Cargando ...">
          </div>
        </div>
        <div v-if="currentSection === 1" class="col">
          <DetailedJournalCard 
            v-if="idJournal !== ''" 
            :id="idJournal" @refreshCategory="refreshJournals"
            @loaded="loaded">
          </DetailedJournalCard>
          <div v-if="doesNotExist"> No se encontraron revistas con el ISSN/EISSN dado</div>
        </div>
        <template v-for="(item, index) in convocatorias">
          <div :key="index" v-if="currentSection == index + 2" class="col">
            <DetailedAnnouncements :idConvocatoria="item.id"></DetailedAnnouncements>
          </div>
        </template>
        
      </div>
      <div class="row">
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
  </div>
</template>
<script>
import axios from "axios";
import DetailedJournalCard from "@/components/DetailedJournalCard";
import DetailedAnnouncements from "@/components/DetailedAnnouncements";
import HeaderResearch from "@/components/HeaderResearch";
import BarraBusqueda from "@/components/BarraBusqueda";
import LogoResearch from "@/components/LogoResearch";
import imgJournalDefoult from "@/assets/journalImgDefault.jpeg";
import summaryJournalCard from "@/components/summaryJournalCard ";
import { Carousel, Slide } from 'vue-carousel';
import loadingGifImport from '@/assets/gifs/loading.gif'
import jsonHeaderOptions from "@/utilities/headerOptions.json"
import ProviderService from "@/providerServices/providerServices.js";

export default {
  props: {},
  data() {
    return {
      revistas: [],
      idJournal: "",
      loadingGif: undefined,
      isLoading: false,
      doesNotExist: false,
      optionsHeader: undefined,
      currentSection: 1,
      convocatorias: [],
      providerService: new ProviderService(process.env.ROOT_API),
      idConvocatoria: undefined
    };
  },
  created(){
    this.loadingGif = loadingGifImport
    this.isLoading = true
    this.optionsHeader = JSON.parse(JSON.stringify(jsonHeaderOptions.otherPageHeader))
  },
  mounted() {
    let _self = this
    this.changeParams(function(err, data){
      _self.providerService
        .getModel("Convocatoria", {
          where: {
            revistaId: _self.idJournal,
            fechaFinal: {
              gte: Date.now()
            }
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
  watch: {
    "$route.params.search": function() {
      this.isLoading = true
      this.changeParams()
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    changeParams: function(callback) {
      let parametro = this.$route.params.search;
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
    }
  },
  components: {
    DetailedJournalCard,
    HeaderResearch,
    BarraBusqueda,
    LogoResearch,
    summaryJournalCard,
    Carousel,
    Slide,
    DetailedAnnouncements
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
</style>