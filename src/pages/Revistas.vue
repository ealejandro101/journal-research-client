<template>
  <div>
      <div class="headerS">
        <header-research></header-research>
      </div>
        <b-row>
          <b-col id="divFiltros" sm="12" md="12" lg="2">
              <filtros-busqueda></filtros-busqueda>
          </b-col>            
          <b-col id="divRevistas" class="body-card-revistas" :sm="smDivRevistas" :md="mdDivRevistas" :lg="lgDivRevistas">      
            <div class="row d-flex justify-content-center">
              <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <barra-busqueda style="width:100%; margin-top:20px; margin-left:20px;"  :isFilter="false"></barra-busqueda>
              </div> 
            </div>                             
            <b-row @click="openJournal()">   
              <summaryJournalCard  class="summaryCard"
                titulo='INGENÍERIA Y CIENCIA'
                descripcion='La revista Ingeniería y Ciencia está dirigida a la comunidad académica, científica e industrial en las áreas de la ciencia y la ingeniería. Su objetivo es presentar y difundir trabajos de investigación básica y aplicada que contribuyan al desarrollo de la ciencia y la industria en el corto, mediano y/o largo plazo, en el ámbito local e internacional. Los temas de publicación incluyen: matemáticas, física, química, biología, geología'
                urlImg="http://jasolutions.com.co/wp-content/uploads/2017/05/ingenieriaciencia.jpg">
              </summaryJournalCard>
            </b-row>
            <b-row @click="openJournal()">   
              <summaryJournalCard  class="summaryCard"
                titulo='INGENÍERIA Y CIENCIA'
                descripcion='La revista Ingeniería y Ciencia está dirigida a la comunidad académica, científica e industrial en las áreas de la ciencia y la ingeniería. Su objetivo es presentar y difundir trabajos de investigación básica y aplicada que contribuyan al desarrollo de la ciencia y la industria en el corto, mediano y/o largo plazo, en el ámbito local e internacional. Los temas de publicación incluyen: matemáticas, física, química, biología, geología'
                urlImg="http://jasolutions.com.co/wp-content/uploads/2017/05/ingenieriaciencia.jpg">
              </summaryJournalCard>
            </b-row> 
          </b-col> 
          <b-col id="divDetailedJournal" sm="12" md="12" lg="10">
              <detailedJournalCard  id="6"></detailedJournalCard>
          </b-col> 
        </b-row>       
      </div>    
</template>
<script>
import axios from "axios";
import summaryJournalCard from "@/components/summaryJournalCard ";
import detailedJournalCard from "@/components/ detailedJournalCard";
import HeaderResearch from '@/components/HeaderResearch';
import BarraBusqueda from '@/components/BarraBusqueda';
import LogoResearch from '@/components/LogoResearch';
import FiltrosBusqueda from '@/components/FiltrosBusqueda';

export default {
  data() {
    return {
      revistas: [], smDivRevistas: '12', mdDivRevistas: '12', lgDivRevistas: '10'    
    };
  }/*,
  mounted() {
    axios.get("http://localhost:3000/api/Revista").then(response => {
      //this.revistas = response.data;
    });
  }*/,
  methods: {
    openJournal: function(){
      this.$el.querySelector("#divFiltros").style.display = "none";
      this.lgDivRevistas = "2";
      this.$el.querySelector("#divDetailedJournal").style.display = "inline";
    }
  },
  components: {
    summaryJournalCard,
    detailedJournalCard,
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
  background-color: #818DA6;
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
</style>