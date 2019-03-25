<template>
  <div class="containerPage">
    <div id="headerResearch" class="headerS">
      <header-research :inputOptions="optionsHeader"></header-research>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div v-if="isLoading" class="col-12 d-flex justify-content-center">
          <div style="max-width: 7em">
            <img :src="loadingGif" alt="Cargando ...">
          </div>
        </div>
        <div class="col">
          <DetailedJournalCard 
            v-if="idJournal !== ''" 
            :id="idJournal" @refreshCategory="refreshJournals"
            @loaded="loaded">
          </DetailedJournalCard>
          <div v-if="doesNotExist"> No se encontraron revistas con el ISSN/EISSN dado</div>
        </div>
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
import HeaderResearch from "@/components/HeaderResearch";
import BarraBusqueda from "@/components/BarraBusqueda";
import LogoResearch from "@/components/LogoResearch";
import imgJournalDefoult from "@/assets/journalImgDefault.jpeg";
import summaryJournalCard from "@/components/summaryJournalCard ";
import { Carousel, Slide } from 'vue-carousel';
import loadingGifImport from '@/assets/gifs/loading.gif'
import jsonHeaderOptions from "@/utilities/headerOptions.json"

export default {
  props: {},
  data() {
    return {
      revistas: [],
      idJournal: "",
      loadingGif: undefined,
      isLoading: false,
      doesNotExist: false,
      optionsHeader: undefined
    };
  },
  created(){
    this.loadingGif = loadingGifImport
    this.isLoading = true
    this.optionsHeader = JSON.parse(JSON.stringify(jsonHeaderOptions.otherPageHeader))
  },
  mounted() {
    this.changeParams();
  },
  watch: {
    "$route.params.search": function() {
      this.isLoading = true
      this.changeParams()
    }
  },
  methods: {
    changeParams: function() {
      let parametro = this.$route.params.search;
      let prefix, postfix;
      if (parametro === undefined) {
        //Poner que no se encuentra revista
      } else {
        prefix = parametro.split("=")[0];
        postfix = parametro.split("=")[1];
        switch (prefix) {
          case "issn":
            this.getPageJournalISSN(postfix);
            break;

          case "eissn":
            this.getPageJournalEISSN(postfix);
            break;
          default:
            //Redireccionarlo a lista revistas
            break;
        }
      }
    },
    getPageJournalISSN:function(issn){
        let query=process.env.ROOT_API+'Revista/?filter={"where": {"issn":"'+issn.toString()+'"}}';
        axios.get(query).then(response =>{
            if(response.data.lenth == 0){
              this.doesNotExist = true
              return
            }
            this.idJournal = response.data[0].id.toString()
        }).catch(error =>{
            console.log(error);          
        })
    },
    getPageJournalEISSN:function(eissn){
      let query=process.env.ROOT_API+'Revista/?filter={"where": {"eissn":"'+eissn.toString()+'"}}';
       axios.get(query).then(response =>{
            if(response.data.lenth == 0){
              this.doesNotExist = true
              return
            }
            this.idJournal = response.data[0].id.toString()
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
        this.getJournalsParam(
            '{"where": {"categoriaId": ' + idCategory + "}}"
        );
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
    Slide
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
</style>