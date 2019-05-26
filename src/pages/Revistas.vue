<template>
  <div class="containerPage d-flex flex-column">
    <div id="headerResearch" class="headerS flex-grow-0" ref="headerHTML">
      <header-research :inputOptions="optionsHeader"></header-research>
    </div>
    <div class="container-fluid flex-grow-1 d-flex justify-content-center p-0">
      <div class="row w-100 mt-0 mb-0">
        <div id="divFiltros" class="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">
          <div ref="filterRef" style="overflow-y: auto" class="position-sticky" v-bind:style="{top: styleTopFilter, height: heightFilter}">
            <filtros-busqueda @applyFilters="applyFilters"></filtros-busqueda>
          </div>
        </div> 
        <div id="divRevistas" class="backgroundImg2 body-card-revistas col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10">
          <div class="alphabet container" style="display:none">
            <div class="row">
              <div class="col-12 pt-3">
                <nav>
                  <ul class="pagination justify-content-center" style="flex-wrap: wrap">
                    <li class="page-item disabled">
                      <a class="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    <li class="page-item" v-for="char in 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'" :key="char"><p class="page-link" href="#">{{char}}</p></li>
                    <li class="page-item">
                      <a class="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="divContentRevistas container">     
            <div class="row" v-for="item in revistas" :key="item.id" >
             <div class="col">
                <summaryJournalCard  class="summaryCard" @openJournal="openJournal(item)"
                :id="item.id.toString()"
                :titulo='item.titulo'
                :descripcion='item.descripcion'
                :urlImg="item.imagen"
                :hasAnnouncement="item.convocatoria.length > 0"
                :announcementFinalDate="item.convocatoria[0] !== undefined?item.convocatoria[0].fechaFinal:''"
                >
              </summaryJournalCard>
              
             </div>
            </div>
            <div class="row" v-if="revistas.length === 0 && isQueryCompleted">
              <div class="col">
                <p class="mt-4">No hay revistas que cumplan el filtro dado.</p>
              </div>
            </div>
            <div class="row" v-if="revistas.length === 0 && !isQueryCompleted">
              <div class="col d-flex justify-content-center">
                <div style="width: 10em">
                  <img :src="loadingSRC" alt="Cargando...">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid flex-grow-0">
      <div class="row">
        <div class="col-12 p-0">
          <FooterResearch></FooterResearch>
        </div>
      </div>
    </div>
  </div>    
</template>
<script>
import axios from "axios";
import summaryJournalCard from "@/components/summaryJournalCard ";
import DetailedJournalCard from "@/components/DetailedJournalCard";
import HeaderResearch from "@/components/HeaderResearch";
import BarraBusqueda from "@/components/BarraBusqueda";
import LogoResearch from "@/components/LogoResearch";
import FiltrosBusqueda from "@/components/FiltrosBusqueda";
import imgJournalDefoult from "@/assets/journalImgDefault.jpeg";
import FooterResearch from '@/components/FooterResearch';
import ProviderService from '@/providerServices/providerServices';
import jsonHeaderOptions from "@/utilities/headerOptions.json"
import loadingGif from "@/assets/gifs/loading.gif"

export default {
  props: {},
  components: {
    summaryJournalCard,
    HeaderResearch,
    BarraBusqueda,
    LogoResearch,
    FiltrosBusqueda,
    FooterResearch
  },
  data() {
    return {
      revistas: [],
      idActualJournal: "'1'",
      optionsHeader:  undefined,
      styleTopFilter: "3em",
      heightFilter: undefined,
      isQueryCompleted: false,
      loadingSRC: undefined
    };
  },
  created (){
    this.optionsHeader = JSON.parse(JSON.stringify(jsonHeaderOptions.otherPageHeader))
  },
  mounted() {
    this.changeParams();
    this.styleTopFilter = this.$refs.headerHTML.offsetHeight + 16 + 'px'
    this.heightFilter  = window.innerHeight - (this.$refs.headerHTML.offsetHeight + 16) + 'px !important'
    this.loadingSRC = loadingGif
  },
  watch: {
    "$route.params.search": function() {
      this.changeParams();
    }
  },
  methods: {
    changeParams: function() {
      let parametro = this.$route.params.search;
      let prefix, postfix;
      let query = { 
        order: 'titulo ASC', 
        include: [ 
          {
            relation: "convocatoria",
            scope: {
              where: {
                fechaFinal: {
                  gte: Date.now()
                }
              },
              order: 'fechaFinal ASC',
            }
          } 
        ] 
      }
      if (parametro === undefined) {
        this.getJournals(query);
      } else {
        prefix = parametro.split("=")[0];
        postfix = parametro.split("=")[1];
        switch (prefix) {
          case "search":
            this.getJournalsSearch(postfix, query);
            break;
          case "category":
            this.getJournalsCategory(postfix, query);
            break;
          case "word":
            this.getJournalsWord(postfix, query);
            break;
          case "institucion":
            this.getJournalsInstitution(postfix, query);
            break;
          case "ciudad":
            this.getJournalsCity(postfix, query);
            break;
          default:
            this.getJournals(query);
            break;
        }
      }
    },
    getJournalsSearch: function(parametro, query) {
      if (parametro == "") {
        this.getJournals(query);
        return;
      }
      query.where = {
        or: [
          { descripcion: { regexp: "/" + parametro + "/i" } },
          { titulo: { regexp: "/" + parametro + "/i" } },
          { tituloCorto: { regexp: "/" + parametro + "/i" } },
          { subtitulo: { regexp: "/" + parametro + "/i" } }
        ]
      }
      this.revistas = []
      this.isQueryCompleted = false
      axios
        .get(process.env.ROOT_API + "Revista/?filter=" + JSON.stringify(query))
        .then(response => {
          this.revistas = response.data;
          this.isQueryCompleted = true
          this.configureImg()
        });
    },
    getJournalsCategory (categoryId, query) {
      this.revistas=[];
      this.isQueryCompleted = false
      axios.get(process.env.ROOT_API + `Categoria/${categoryId}/revistas?filter=${JSON.stringify(query)}`)
        .then(response => {
          this.revistas = response.data
          this.isQueryCompleted = true
          this.configureImg()
        }).catch(error=>{
          console.log(error);              
        })
    },
    getJournalsWord (wordId, query) {
      this.revistas=[];
      this.isQueryCompleted = false
      axios.get(process.env.ROOT_API + `/Palabraclaves/${wordId}/revistas?filter=${JSON.stringify(query)}`)
        .then(response => {
          this.revistas = response.data
          this.isQueryCompleted = true
          this.configureImg()
        }).catch(error=>{
          console.log(error);              
        })
    },
    getJournalsCity (cityId, query) {
      this.revistas=[];
      this.isQueryCompleted = false
      query.include.push({
        "relation": "ubicacion",
        "scope": {
            "where": {
              "ciudadId": cityId
            }
        }
      })
      axios
        .get(process.env.ROOT_API + "Revista/filtrar?filtro=" + JSON.stringify(query))
        .then(response => {
          this.revistas = response.data.revistas;
          this.isQueryCompleted = true
          this.configureImg()
        });
    },
    getJournalsInstitution (institution, query) {
      this.revistas=[];
      this.isQueryCompleted = false
      query.include.push({
        "relation": "contacto",
        "scope": {
            "where": {
              "institucion": institution
            }
        }
      })
      axios
        .get(process.env.ROOT_API + "Revista/filtrar?filtro=" + JSON.stringify(query))
        .then(response => {
          this.revistas = response.data.revistas;
          this.isQueryCompleted = true
          this.configureImg()
        });
    },
    getJournals (query) {
      this.revistas = []
      this.isQueryCompleted = false
      axios.get(process.env.ROOT_API + "Revista?filter=" + JSON.stringify(query)).then(response => {
        this.revistas = response.data;
        this.isQueryCompleted = true
        this.configureImg()
      });
    },
    openJournal (journal) {
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
    applyFilters (filter){
      let providerService = new ProviderService(process.env.ROOT_API)
      this.revistas=[];
      this.isQueryCompleted = false
      filter.order = 'titulo ASC'
      providerService.getJournalsFiltered(filter).then(response => {
        this.revistas = response.data.revistas
        this.isQueryCompleted = true
        this.configureImg()
      })
    },
    configureImg(){
      for (const iterator of this.revistas) {
        if (iterator.imagen == null) {
          iterator.imagen = imgJournalDefoult;
        } 
      }
    },
    vwTOpx(value) {
      var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
      var result = (x*value)/100;
      return(result);
    },
    vhTOpx(value) {
      var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

      var result = (y*value)/100;
      return(result);
    }
  }  
};
</script>

<style scoped>
.containerPage{
  max-width: 100vw;
  min-height: 100vh;
}
.headerS {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
}
.body-card-revistas {
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
}
#divRevistas {
  padding: 0px;
}
@media (max-width: 576px) {
  #divDetailedJournal {
    position: fixed !important;
  }
  #divFiltros {
    display: inline;
  }
}
.mainRowJournals{
  min-height: fit-content;
}
</style>