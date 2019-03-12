<template>
  <div class="containerPage d-flex flex-column">
    <div id="headerResearch" class="headerS flex-grow-0">
      <header-research :inputOptions="headerOptions"></header-research>
    </div>
    <div class="container-fluid flex-grow-1 d-flex justify-content-center p-0">
      <div class="row w-100 mt-0 mb-0">
        <div id="divFiltros" class="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">
            <filtros-busqueda></filtros-busqueda>
        </div> 
        <div id="divRevistas" class="body-card-revistas col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10">
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
import FooterResearch from '@/components/FooterResearch'

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
      headerOptions:  [
        {to: '/', text: 'Inicio', active: true, isVuePag: true, link: ''},
        {to: '/InfoResearcH', text: 'Que es ResearcH', active: true, isVuePag: false, link: 'http://journals-research.com/about_us.html'},
        {to: '/FormularioNuevaRevista', text: 'Postula revistas', active: true, isVuePag: false, link: 'http://journals-research.com/acuerdo_research.html'},
        {to: '/Login', text: 'Ingresa', active: false, isVuePag: true, link: ''},
        {to: '/Registro', text: 'Registrate', active: false, isVuePag: true, link: ''},
        {to: '', text: 'Journals & Authors', active: true, isVuePag: false, link: 'https://jasolutions.com.co/'}
      ]
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
          case "word":
            this.getJournalsWord(postfix);
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
    getJournalsCategory (categoryId) {
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
    getJournalsWord (wordId) {
      this.revistas=[];
      let query = { order: 'titulo ASC' }
      axios.get(process.env.ROOT_API + `/Palabraclaves/${wordId}/revistas?filter=${JSON.stringify(query)}`)
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
.mainRowJournals{
  min-height: fit-content;
}
</style>