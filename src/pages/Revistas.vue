<template>
  <div class="containerPage">
    <div id="headerResearch" class="headerS">
      <header-research></header-research>
    </div>
    <div class="container-fluid">
      <b-row>
        <b-col id="divFiltros" sm="3" md="3" lg="2" xl="2">
            <filtros-busqueda></filtros-busqueda>
        </b-col>            
        <b-col id="divRevistas" class="body-card-revistas dinamicHeigth" :sm="smDivRevistas" :md="mdDivRevistas" :lg="lgDivRevistas" :xl="xlDivRevistas">      
          <div class="divContentRevistas dinamicHeigth">
            <!--<b-row @click="openJournal()">   
              <summaryJournalCard  class="summaryCard"
                :classColSummaryImg="summaryColSummaryImg"
                :classColDescription="summaryColDescription"
                :classRowResponsive="summaryRowResponsive"
                titulo='item.titulo'
                descripcion='item.descripcion'
                urlImg="item.imagen">
              </summaryJournalCard>
            </b-row>-->             
            <b-row v-for="item in revistas" @click="openJournal(item.id)" :key="item.id">   
              <summaryJournalCard  class="summaryCard"
                :id="item.id.toString()"
                :classColSummaryImg="summaryColSummaryImg"
                :classColDescription="summaryColDescription"
                :classRowResponsive="summaryRowResponsive"
                :titulo='item.titulo'
                :descripcion='item.descripcion'
                :urlImg="item.imagen">
              </summaryJournalCard>
            </b-row>
          </div>
        </b-col> 
        <b-col id="divDetailedJournal" class="dinamicHeigth" sm="9" md="9" lg="10" xl="10">
            <detailedJournalCard 
              @detailedCard:close="detailedClouse"
              :id="idActualJournal"
              ></detailedJournalCard>
        </b-col> 
      </b-row> 
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

export default {
  props: {},
  data() {
    return {
      revistas: [],
      smDivRevistas: "9",
      mdDivRevistas: "9",
      lgDivRevistas: "10",
      xlDivRevistas: "10",
      summaryColSummaryImg: "colSummaryImg",
      summaryColDescription: "",
      summaryRowResponsive: "",
      state: true,
      idActualJournal: "'1'"
    };
  },
  mounted() {
    this.changeParams();
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
      if (parametro === undefined) {
        this.getJournals();
      } else {
        prefix = parametro.split("=")[0];
        postfix = parametro.split("=")[1];
        switch (prefix) {
          case "search":
            this.getJournalsSearch(postfix);
            break;
          case "category":
            this.getJournalsParam(
              '{"where": {"categoriaId": ' + postfix + "}}"
            );
            break;
          default:
            this.getJournals();
            break;
        }
      }
    },
    getJournalsSearch: function(parametro) {
      if (parametro == "") {
        this.getJournals();
        return;
      }
      let query;
      query = {
        where: {
          or: [
            { descripcion: { regexp: "/" + parametro + "/i" } },
            { titulo: { regexp: "/" + parametro + "/i" } },
            { tituloCorto: { regexp: "/" + parametro + "/i" } },
            { subtitulo: { regexp: "/" + parametro + "/i" } }
          ]
        }
      };
      axios
        .get(process.env.ROOT_API + "Revista/?filter=" + JSON.stringify(query))
        .then(response => {
          this.revistas = response.data;
          this.revistas.forEach(element => {
            if (element.imagen == null) {
              element.imagen = imgJournalDefoult;
            }
          });
        });
    },
    getJournalsParam: function(query) {
      axios
        .get(process.env.ROOT_API + "RevistasCategorias?filter=" + query)
        .then(response => {
          
          //console.log(r);
          

          this.revistas = response.data;
          this.revistas.forEach(element => {
            if (element.imagen == null) {
              element.imagen = imgJournalDefoult;
            }
          });
        });
    },
    getJournals: function() {
      axios.get(process.env.ROOT_API + "Revista").then(response => {
        this.revistas = response.data;

        
        
        
        this.revistas.forEach(element => {
          if (element.imagen == null) {
            element.imagen = imgJournalDefoult;
          }
        });
      });
    },
    openJournal: function(journalId) {
      if (this.state) {
        let divFiltros = this.$el.querySelector("#divFiltros");
        divFiltros = this.$el.querySelector("#divFiltros");
        divFiltros.style.flex = "none";
        divFiltros.style.width = "0px";
        divFiltros.style.paddingLeft = "0px";
        divFiltros.style.paddingRigth = "0px";
        this.idActualJournal = journalId.toString();
        this.xlDivRevistas = "2";
        this.lgDivRevistas = "2";
        this.mdDivRevistas = "3";
        this.smDivRevistas = "3";
        this.$el.querySelector("#divDetailedJournal").style.display = "inline";
        this.summaryColSummaryImg = "colSummaryResponsive";
        this.summaryColDescription = "colSummaryResponsive";
        this.summaryRowResponsive = "rowResponsive";
        this.state = false;
        let interval = setInterval(function() {
          divFiltros.style.display = "none";
          clearInterval(interval);
        }, 900);
      } else {
        this.idActualJournal = journalId.toString();
      }
    },
    detailedClouse: function() {
      let divFiltros = this.$el.querySelector("#divFiltros");
      divFiltros.style.display = "inline";
      this.state = true;
      this.$el.querySelector("#divDetailedJournal").style.display = "0 0 auto";
      divFiltros.style.width = "100%";
      divFiltros.style.paddingLeft = "15px";
      divFiltros.style.paddingRigth = "15px";
      this.$el.querySelector("#divDetailedJournal").style.display = "none";
      this.xlDivRevistas = "10";
      this.lgDivRevistas = "10";
      this.mdDivRevistas = "9";
      this.smDivRevistas = "9";
      this.summaryColSummaryImg = "colSummaryImg";
      this.summaryColDescription = "";
      this.summaryRowResponsive = "";
    }
  },
  components: {
    summaryJournalCard,
    DetailedJournalCard,
    HeaderResearch,
    BarraBusqueda,
    LogoResearch,
    FiltrosBusqueda
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