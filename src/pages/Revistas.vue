<template>
  <div class="containerPage">
    <div id="headerResearch" class="headerS">
      <header-research></header-research>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div id="divFiltros" class="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">
            <filtros-busqueda></filtros-busqueda>
        </div> 
        <div id="divRevistas" class="body-card-revistas dinamicHeigth col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10 SSS">      
          <div class="divContentRevistas dinamicHeigth container">     
            <b-row v-for="item in revistas" :key="item.id" >   
             <b-col   >
                <summaryJournalCard  class="summaryCard" @openJournal="openJournal(item)"
                :id="item.id.toString()"
                :titulo='item.titulo'
                :descripcion='item.descripcion'
                :urlImg="item.imagen"
                >
              </summaryJournalCard>
             </b-col>
            </b-row>
          </div>
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
            this.getJournalsCategory(postfix);
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
    getJournalsCategory: function(categoryId) {
      this.revistas=[];
      let query = { order: 'titulo ASC' }
      axios.get(process.env.ROOT_API + `Categoria/${categoryId}/revistas?filter=${JSON.stringify(query)}`)
        .then(response => {
          this.revistas = response.data
          for (const iterator of this.revistas) {
            if (iterator.imagen == null) {
              iterator.imagen = imgJournalDefoult;
            } 
          }
        }).catch(error=>{
          console.log(error);              
        })
          
    },
    getJournals: function() {
      let query;
      query = { order: 'titulo ASC' }
      axios.get(process.env.ROOT_API + "Revista?filter=" + JSON.stringify(query)).then(response => {
        this.revistas = response.data;
        this.revistas.forEach(element => {
          if (element.imagen == null) {
            element.imagen = imgJournalDefoult;
          }
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
</style>