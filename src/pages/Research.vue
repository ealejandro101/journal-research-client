<template>
  <div class="research noPadding" v-scroll="handleScroll">
    <div class="section mainSection grid seccionEstadisticas">
      <div class="align-top mainBackground">
        <div class="container-fluid noPadding">
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 headerInicial">
              <header-inicial :isInicial="true" class="d-flex justify-content-end"></header-inicial>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-7 col-sm-5 col-md-4 col-lg-3">
              <logo-research></logo-research>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-5 col-md-4 col-lg-3">
              <p v-text="this.phrase" class="phrase"></p>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-8 col-md-6 col-lg-4">
              <barra-busqueda :isFilter="true"></barra-busqueda>
            </div>
          </div>
        </div>
      </div>
      <div class="align-bottom">
        <div class="container-fluid noPadding">
          <div class="row justify-content-center">
            <div class="col-9 col-md-6 col-lg-5 col-xl-4 researchProcess">
              <h5>Proceso ResearcH</h5>
              <div class="img imgProceosResearch">
                <img src="@/assets/proceso.png" alt="">
              </div>
            </div>
            <div class="col-7 col-md-5 col-xl-4 d-flex align-items-center">
              <div class="justify-content-center">
                <h5 class="col-md-0 col-lg-0 col-xl-0">Estadísticas ResearcH</h5>
                <p class="cifra"><span>Más de 100</span><br> revistas en más de 5 países</p> <br>
                <div class="img">
                  <img src="@/assets/mapa.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 contentMoreSection">
            <h5>Categorías</h5>
            <categorias></categorias>
          </div>
        </div>
      </div>
    </div>
    <div class="header">
      <header-research></header-research>
    </div>
  </div>
</template>

<script>
import HeaderInicial from '@/components/HeaderInicial';
import HeaderResearch from '@/components/HeaderResearch';
import BarraBusqueda from '@/components/BarraBusqueda';
import LogoResearch from '@/components/LogoResearch';
import FiltrosBusqueda from '@/components/FiltrosBusqueda';
import Categorias from '@/components/Categorias';

export default {
  name: "research",
  components: {
		HeaderInicial, HeaderResearch, BarraBusqueda, LogoResearch, FiltrosBusqueda, Categorias
	},
  data() {
    return {
      phrase: '¿Busca dónde publicar?'
    };
  },
  methods: {
    handleScroll: function (evt, el) {
      if (window.scrollY > 150) {
        this.$el.querySelector(".header").style.display = "inline";
      }else{
        this.$el.querySelector(".header").style.display = "none";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.section{
  min-height: 100vh;
  width: 100%;
}
.grid{
  display: grid;
}
.headerInicial{
  padding: 1em;
}
.header{
  position: fixed;
  width: 100%;
  display: none;
  top: 0;
  left: 0;
  z-index: 1;
}
.seccionEstadisticas{
  background: rgba(209,209,209,1);
  background: -moz-linear-gradient(left, rgba(209,209,209,1) 0%, rgba(209,209,209,1) 3%, rgba(219,219,219,1) 24%, rgba(226,226,226,1) 36%, rgba(254,254,254,1) 100%);
  background: -webkit-gradient(left top, right top, color-stop(0%, rgba(209,209,209,1)), color-stop(3%, rgba(209,209,209,1)), color-stop(24%, rgba(219,219,219,1)), color-stop(36%, rgba(226,226,226,1)), color-stop(100%, rgba(254,254,254,1)));
  background: -webkit-linear-gradient(left, rgba(209,209,209,1) 0%, rgba(209,209,209,1) 3%, rgba(219,219,219,1) 24%, rgba(226,226,226,1) 36%, rgba(254,254,254,1) 100%);
  background: -o-linear-gradient(left, rgba(209,209,209,1) 0%, rgba(209,209,209,1) 3%, rgba(219,219,219,1) 24%, rgba(226,226,226,1) 36%, rgba(254,254,254,1) 100%);
  background: -ms-linear-gradient(left, rgba(209,209,209,1) 0%, rgba(209,209,209,1) 3%, rgba(219,219,219,1) 24%, rgba(226,226,226,1) 36%, rgba(254,254,254,1) 100%);
  background: linear-gradient(to right, rgba(209,209,209,1) 0%, rgba(209,209,209,1) 3%, rgba(219,219,219,1) 24%, rgba(226,226,226,1) 36%, rgba(254,254,254,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d1d1d1', endColorstr='#fefefe', GradientType=1 );
}
.mainBackground{
  background-image: url('/static/fondoIndex.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 50vh;
}
.phrase{
  margin-top: 2px;
    margin-bottom: 1px;
}
.cifra span{
  font-size: xx-large;
}
.cifra{
  text-align: center
}
.imgProceosResearch{
  width: 85%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
/*.imgProceosResearch img{
  max-height: inherit;
  width: auto;
}*/
.researchProcess{
  padding-top: 1em;
}
.contentMoreSection{
  padding-top: 6em;
}
</style>
