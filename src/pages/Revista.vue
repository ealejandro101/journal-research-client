<template>
  <div class="containerPage">
    <div id="headerResearch" class="headerS">
      <header-research></header-research>
    </div>
    <div class="container-fluid">
      <div class="row">
          <div class="col">
              <DetailedJournalCard v-if="idJournal !== ''" :id="idJournal" @refreshCategory="refreshJournals"></DetailedJournalCard>
              <div v-else> No se encontraron revistas con el ISSN/EISSN dado</div>
          </div>
      </div>
      <div class="row">
            <div v-for="item in revistas" @click="openJournal(item)" :key="item.id" class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                <summaryJournalCard  class="summaryCard"
                    :id="item.id.toString()"
                    :titulo='item.titulo'
                    :descripcion='item.descripcion'
                    :urlImg="item.imagen"
                    :isMiniature="true">
                </summaryJournalCard>
            </div>
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

export default {
  props: {},
  data() {
    return {
      revistas: [],
      idJournal: ""
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
    refreshJournals (idCategory) {
        this.getJournalsParam(
            '{"where": {"categoriaId": ' + idCategory + "}}"
        );
    }
  },
  components: {
    DetailedJournalCard,
    HeaderResearch,
    BarraBusqueda,
    LogoResearch,
    summaryJournalCard
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