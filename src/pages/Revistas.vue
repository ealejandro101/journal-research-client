<template>
  <div>
    <div id="headerResearch" class="headerS">
      <header-research></header-research>
    </div>
    <div class="container-fluid">
      <b-row>
        <b-col id="divFiltros" sm="12" md="12" lg="3">
            <filtros-busqueda></filtros-busqueda>
        </b-col>            
        <b-col id="divRevistas" class="body-card-revistas" :sm="smDivRevistas" :md="mdDivRevistas" :lg="lgDivRevistas">      
          <div class="divContentRevistas">
            <div class="row d-flex justify-content-center">
              <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <barra-busqueda style="width:100%; margin-top:20px; margin-left:20px;"  :isFilter="false"></barra-busqueda>
              </div> 
            </div>  
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
        <b-col id="divDetailedJournal" sm="12" md="12" lg="8">
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
import HeaderResearch from '@/components/HeaderResearch';
import BarraBusqueda from '@/components/BarraBusqueda';
import LogoResearch from '@/components/LogoResearch';
import FiltrosBusqueda from '@/components/FiltrosBusqueda';
import imgJournalDefoult from '@/assets/journalImgDefault.jpeg';

export default {
  data() {
    return {
      revistas: [], 
      smDivRevistas: '12', 
      mdDivRevistas: '12', 
      lgDivRevistas: '9',
      summaryColSummaryImg: 'colSummaryImg',
      summaryColDescription: '',
      summaryRowResponsive: '',
      state: true,
      idActualJournal: "'1'"
    };
  },
  mounted() {
    axios.get(process.env.ROOT_API+"Revista").then(response => {
      this.revistas = response.data;
      this.revistas.forEach(element => {
        if(element.imagen == null){
          element.imagen = imgJournalDefoult;
        }
      });
    });
  },
  methods: {
    openJournal: function(journalId){
      if(this.state){
        let divFiltros = this.$el.querySelector("#divFiltros");
        divFiltros = this.$el.querySelector("#divFiltros");
        divFiltros.style.flex = "none";
        divFiltros.style.width = "0px";
        divFiltros.style.paddingLeft = "0px";
        divFiltros.style.paddingRigth = "0px";
        this.idActualJournal = journalId.toString();
        this.lgDivRevistas = "4";
        this.$el.querySelector("#divDetailedJournal").style.display = "inline";
        this.summaryColSummaryImg = "colSummaryResponsive";
        this.summaryColDescription = "colSummaryResponsive";
        this.summaryRowResponsive = "rowResponsive";
        this.state = false;
        let interval = setInterval(function(){
          divFiltros.style.display = "none";
          clearInterval(interval);
        }, 900);
      }else{
        this.idActualJournal = journalId.toString();
      }
    },
    detailedClouse: function(){
      let divFiltros = this.$el.querySelector("#divFiltros");
      divFiltros.style.display = "inline";
      this.state = true;
      this.$el.querySelector("#divDetailedJournal").style.display = "0 0 auto";
      divFiltros.style.width = "100%";
      divFiltros.style.paddingLeft = "15px";
      divFiltros.style.paddingRigth = "15px";
      this.$el.querySelector("#divDetailedJournal").style.display = "none";
      this.lgDivRevistas = "9";
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
.headerS{
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
}
.body-card-revistas{
  background-color: #d8d1bb;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  
}
#divDetailedJournal{
  display: none;
}
.summaryCard{
  margin: 1em 10%;
  width: 80%;
}
#divFiltros{
  padding: 1em 0px;
  transition-property: width;
  transition-timing-function: linear;
  transition-duration: 0.6s;
  transition-delay: 0s;
}
#divRevistas{
  transition-property: all;
  transition-timing-function: linear;
  transition-duration: 0.3s;
  transition-delay: 0s;
  padding: 0px;
}
.divContentRevistas, #divDetailedJournal{
  overflow-y: auto;
  height: 100vh;
}
.divContentRevistas{
  padding-right: 15px;
}
</style>