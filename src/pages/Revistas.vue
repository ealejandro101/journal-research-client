<template>
  <div class="containerPage">
    <div id="headerResearch" class="headerS">
      <header-research></header-research>
    </div>
    <div class="container-fluid">
      <b-row>

        <div id="divFiltros" class="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">
            <filtros-busqueda></filtros-busqueda>
        </div> 
             
         <div id="divRevistas" class="body-card-revistas dinamicHeigth col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10 SSS">      
          <div class="divContentRevistas dinamicHeigth">     
            <b-row v-for="item in revistas" @click="openJournal(item)" :key="item.id" >   
             <b-col   >
                <summaryJournalCard  class="summaryCard"
                :id="item.id.toString()"
                :titulo='item.titulo'
                :descripcion='item.descripcion'
                :urlImg="item.imagen">
              </summaryJournalCard>
             </b-col>
            </b-row>
          </div>
        </div>
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
      this.revistas=[];
      axios.get(process.env.ROOT_API + "RevistasCategorias?filter=" + query)
        .then(response => {          
          let revista =response.data;  
          revista.forEach(element => {
            if (element.imagen == null) {
              element.imagen = imgJournalDefoult;
            }
            axios.get(process.env.ROOT_API+"Revista/"+element.revistaId).then(response =>{                  
                  this.revistas.push(response.data);
            }).catch(error=>{
              console.log(error);              
            })
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
    openJournal: function(journal) {
      this.$router.push({    
            path: "/issn=" + journal.issn
      });
    }
  },
  components: {
    summaryJournalCard,
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