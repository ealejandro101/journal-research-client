<template>
  <div class="research noPadding" v-scroll="handleScroll">
    <div class="section grid">
      <div class="align-top headerInicial">
          <header-inicial :opciones="opciones" :isInicial="true" class="d-flex justify-content-end col-0"></header-inicial>
      </div>
      <div class="align-middle">
        <div class="container-fluid noPadding">
          <div class="row d-flex justify-content-center">
            <div class="col-6 col-sm-5 col-md-4 col-lg-3">
              <logo-research></logo-research>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-8 col-md-6 col-lg-4">
              <barra-busqueda :isFilter="true"></barra-busqueda>
            </div>
          </div>
        </div>
      </div>
      <div class="align-end"></div>
    </div>
    <div class="header">
      <header-research :opciones="opciones"></header-research>
    </div>
    
    <div class="section seccionEstadisticas d-flex">
      <div class="row">
        <div class="col-12 col-md-6">
          <h5>Proceso ResearcH</h5>
          <br>
          <div class="img imgProceosResearch">
            <img src="@/assets/proceso.png" alt="">
          </div>
        </div>
        <div class="col-12 col-md-6 d-flex align-items-center">
          <div class="justify-content-center">
            <h5 class="col-md-0 col-lg-0 col-xl-0">Estadísticas ResearcH</h5>
            <p class="cifra"><span>146</span><br> revistas en 5 países</p> <br>
            <div class="img">
              <img src="@/assets/mapa.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderInicial from '@/components/HeaderInicial';
import HeaderResearch from '@/components/HeaderResearch';
import BarraBusqueda from '@/components/BarraBusqueda';
import LogoResearch from '@/components/LogoResearch'

export default {
  name: "research",
  components: {
		HeaderInicial, HeaderResearch, BarraBusqueda, LogoResearch
	},
  data() {
    return {
      opciones: [
          {to: '/InfoResearcH', text: 'Que es ResearcH', active: true, isVuePag: false, link: 'http://journals-research.com/about_us.html'},
          {to: '/FormularioNuevaRevista', text: 'Postula revistas', active: true, isVuePag: false, link: 'http://journals-research.com/acuerdo_research.html'},
          {to: '/Login', text: 'Ingresa', active: true, isVuePag: true, link: ''},
          {to: '/Registro', text: 'Registrate', active: true, isVuePag: true, link: ''}
      ]
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
  padding-top: 6em;
  background: rgba(209,209,209,1);
  background: -moz-linear-gradient(left, rgba(209,209,209,1) 0%, rgba(209,209,209,1) 3%, rgba(219,219,219,1) 24%, rgba(226,226,226,1) 36%, rgba(254,254,254,1) 100%);
  background: -webkit-gradient(left top, right top, color-stop(0%, rgba(209,209,209,1)), color-stop(3%, rgba(209,209,209,1)), color-stop(24%, rgba(219,219,219,1)), color-stop(36%, rgba(226,226,226,1)), color-stop(100%, rgba(254,254,254,1)));
  background: -webkit-linear-gradient(left, rgba(209,209,209,1) 0%, rgba(209,209,209,1) 3%, rgba(219,219,219,1) 24%, rgba(226,226,226,1) 36%, rgba(254,254,254,1) 100%);
  background: -o-linear-gradient(left, rgba(209,209,209,1) 0%, rgba(209,209,209,1) 3%, rgba(219,219,219,1) 24%, rgba(226,226,226,1) 36%, rgba(254,254,254,1) 100%);
  background: -ms-linear-gradient(left, rgba(209,209,209,1) 0%, rgba(209,209,209,1) 3%, rgba(219,219,219,1) 24%, rgba(226,226,226,1) 36%, rgba(254,254,254,1) 100%);
  background: linear-gradient(to right, rgba(209,209,209,1) 0%, rgba(209,209,209,1) 3%, rgba(219,219,219,1) 24%, rgba(226,226,226,1) 36%, rgba(254,254,254,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d1d1d1', endColorstr='#fefefe', GradientType=1 );
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
</style>
