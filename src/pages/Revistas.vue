<template>
  <div class="containerPage d-flex flex-column">
    <div id="headerResearch" class="headerS flex-grow-0" ref="headerHTML">
      <header-research></header-research>
    </div>
    <div class="container-fluid flex-grow-1 d-flex justify-content-center p-0">
      <div class="row w-100 mt-0 mb-0">
        <div id="divFiltros" class="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">
          <div ref="filterRef" style="overflow-y: auto" class="position-sticky" v-bind:style="{top: styleTopFilter, height: heightFilter}">
            <filtros-busqueda @applyFilters="applyNewFilter"></filtros-busqueda>
          </div>
        </div> 
        <div id="divRevistas" class="backgroundImg2 body-card-revistas col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10">
          <div class="alphabet container">
            <div class="row">
              <div class="col-12 pt-3">
                <nav>
                  <ul class="pagination justify-content-center" style="flex-wrap: wrap">
                    <li class="page-item cursor-pointer" v-for="char in 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'" :key="char">
                      <p class="page-link" @click="getJournalsByChar(char)">{{char}}</p>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="numeration container">
            <div class="row">
              <div class="col-12 pt-3">
                <nav>
                  <ul class="pagination justify-content-center" style="flex-wrap: wrap">
                    <li class="page-item" :class="{disabled: currentPage == 1}">
                      <p class="page-link cursor-pointer" @click="getJournalsByPagination(currentPage - 1)"><i class="fas fa-caret-left"></i></p>
                    </li>
                    <li class="page-item">
                      <p class="page-link">{{currentPage}}</p>
                    </li>
                    <li class="page-item" :class="{disabled: revistas.length == 0 || revistas.length < currentPageSize}">
                      <p class="page-link cursor-pointer" @click="getJournalsByPagination(currentPage + 1)"><i class="fas fa-caret-right"></i></p>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="divContentRevistas container">     
            <div class="row" v-for="item in revistas" :key="item.id" >
             <div class="col">
                <summaryJournalCard  
                class="summaryCard" 
                @openJournal="openJournal(item)"
                :id="item.id.toString()"
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
          <div class="numeration container">
            <div class="row">
              <div class="col-12 pt-3">
                <nav>
                  <ul class="pagination justify-content-center" style="flex-wrap: wrap">
                    <li class="page-item" :class="{disabled: currentPage == 1}">
                      <p class="page-link cursor-pointer" @click="getJournalsByPagination(currentPage - 1)"><i class="fas fa-caret-left"></i></p>
                    </li>
                    <li class="page-item">
                      <p class="page-link">{{currentPage}}</p>
                    </li>
                    <li class="page-item" :class="{disabled: revistas.length == 0 || revistas.length < currentPageSize}">
                      <p class="page-link cursor-pointer" @click="getJournalsByPagination(currentPage + 1)"><i class="fas fa-caret-right"></i></p>
                    </li>
                  </ul>
                </nav>
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
import jsonHeaderOptions from "@/utilities/headerOptions.js"
import loadingGif from "@/assets/gifs/loading.gif"

export default {
  name: 'revistas',
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
      styleTopFilter: "3em",
      heightFilter: undefined,
      isQueryCompleted: false,
      loadingSRC: undefined,
      isUsedFilterComponent: false,
      currentPage: 1,
      currentPageSize: 15
    };
  },
  created (){
    this.$store.commit('setCurrentPage', 'revistas')
    this.currentPageSize =  this.$store.getters.limitJournals
    
  },
  mounted() {
    window.scrollTo(0, 0);
    this.changeParams(); //la lista de revistas se obtiene gracias al evento que ocurre en "FiltrosBusqueda.vue"
    this.styleTopFilter = this.$refs.headerHTML.offsetHeight + 16 + 'px'
    this.heightFilter  = window.innerHeight - (this.$refs.headerHTML.offsetHeight + 16) + 'px !important'
    this.loadingSRC = loadingGif
  },
  watch: {
    "$route.params.search": function() {
      this.changeParams();
    },
    "$store.state.searchWithActiveConvocatory": function(){
      this.changeParams();
    }
  },
  methods: {
    changeParams: function() {
      let parametro = this.$route.params.search;
      let prefix, postfix;
      let query = { 
        order: 'titulo ASC',
        include: []
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
          case "pais":
            this.getJournalsCountry(postfix, query);
            break;
          default:
            this.getJournals(query);
            break;
        }
      }
    },
    getJournalsSearch: function(parametro, query) {
      let filter = []
      let isActiveConvocatory = this.$store.getters.searchWithActiveConvocatory
      this.currentPage = 1
      if (isActiveConvocatory) {
        filter.push(this.$store.getters.activeConvocatoryFilter)
      }
      if (parametro == "") {
        this.applyFilters({
          filters: filter,
          extra: {
            page: 1,
            order: 'revista.titulo ASC',
            limit: this.$store.getters.getLimitJournals
          }
        });
        return;
      }
      this.$store.commit('setStr', parametro)
      Array.prototype.push.apply(filter, this.$store.getters.searchFilter);
      this.applyFilters({
        filters: filter,
        extra: {
          page: 1,
          limit: this.$store.getters.getLimitJournals,
          order: `CASE WHEN INSTR(revista.titulo, '${parametro}') > 0 THEN INSTR(revista.titulo, '${parametro}') WHEN INSTR(revista.titulo, '${parametro}') = 0 THEN 100 END ASC`
        }
      });
    },
    getJournalsCategory (categoryId, query) {
      let enumFilters = this.$store.getters.getEnumModelFilters
      this.currentPage = 1
      this.applyFilters({
        filters: [{
          model: enumFilters.category.model,
          response: [categoryId],
          attribute: enumFilters.category.attributeModelFilter
        }],
        extra: {
          page: 1,
          order: 'revista.titulo ASC',
          limit: this.$store.getters.getLimitJournals
        }
      });
    },
    getJournalsWord (wordId, query) {
      this.currentPage = 1
      this.applyFilters({
        filters: [{
          model: 'palabrasclave',
          response: [wordId],
          attribute: 'palabra_clave_id'
        }],
        extra: {
          page: 1,
          order: 'revista.titulo ASC',
          limit: this.$store.getters.getLimitJournals
        }
      });
    },
    getJournalsCountry (countryId, query) {
      this.currentPage = 1
      this.applyFilters({
        filters: [{
          model: "estado", 
          response: [countryId], 
          attribute: "country_id"
        }],
        extra: {
          page: 1,
          order: 'revista.titulo ASC',
          limit: this.$store.getters.getLimitJournals
          }
      });
    },
    getJournalsCity (cityId, query) {
      this.currentPage = 1
      this.applyFilters({
        filters: [{
          model: 'rubicacion',
          response: [cityId],
          attribute: 'ciudad_id'
        }],
        extra: {
          page: 1,
          order: 'revista.titulo ASC',
          limit: this.$store.getters.getLimitJournals
          }
      });
    },
    getJournalsInstitution (institution, query) {
      this.currentPage = 1
      this.applyFilters({
        filters: [{
          model: 'rcontacto',
          response: [`'${institution}'`],
          attribute: 'institucion'
        }],
        extra: {
          page: 1,
          order: 'revista.titulo ASC',
          limit: this.$store.getters.getLimitJournals
        }  
      });
    },
    getJournalsByChar(character){
      let filter = this.$store.getters.lastFilterUsed
      let indexOldFilterByChar = filter.findIndex(function(value){
        return value.customQuery && value.customQuery[0] && value.customQuery[0].label == 'character'
      })
      filter.splice(indexOldFilterByChar, 1)
      filter.push({
          model: 'revista',
          response: [],
          customQuery: [
              {
                  value: `'${character}%'`,
                  operator: 'LIKE',
                  attribute: 'titulo',
                  label: 'character'
              }
          ],
        })
      this.currentPage = 1
      this.applyFilters({
        filters: filter,
        extra: {
          page: 1,
          order: 'revista.titulo ASC',
          limit: this.$store.getters.getLimitJournals
        }
      });
    },
    getJournalsByPagination(page){
      this.currentPage = page > 0?page:1
      this.applyFilters({
        filters: this.$store.getters.lastFilterUsed,
        extra: {
          page: this.currentPage,
          order: 'revista.titulo ASC',
          limit: this.$store.getters.getLimitJournals
        }
      });
      window.scrollTo(0, 0);
    },
    getJournals (query) {
      this.currentPage = 1
      this.applyFilters({
        filters: this.$store.getters.currentFilter,
        extra: {
          page: 1,
          order: 'revista.titulo ASC',
          limit: this.$store.getters.getLimitJournals
        }
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
    applyFiltersOLD (filter){
      let providerService = this.$store.getters.providerService
      this.revistas=[];
      this.isQueryCompleted = false
      filter.order = 'titulo ASC'
      providerService.getJournalsFiltered(filter).then(response => {
        this.revistas = response.data.revistas
        this.isQueryCompleted = true
        this.configureImg()
      })
    },
    applyNewFilter(filter){
      this.currentPage = 1
      this.applyFilters(filter)
    },
    applyFilters (filter){
      let providerService = this.$store.getters.providerService
      this.revistas=[];
      this.$store.commit('setLastFilterUsed', filter.filters)
      this.isQueryCompleted = false
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