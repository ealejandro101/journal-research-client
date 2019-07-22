<template>
  <div class="research noPadding" v-scroll="handleScroll">
    <div class="section mainSection grid seccionEstadisticas">
      <div class="header">
        <header-research :inputOptions="optionsHeader"></header-research>
      </div>
      <div class="align-top mainBackground">
        <div class="position-absolute right-0 noPadding">
          <div class="row d-flex justify-content-center">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 headerInicial">
              <header-inicial
                :isInicial="true"
                :inputOptions="optionsHeader"
                class="d-flex justify-content-end"
              ></header-inicial>
            </div>
          </div>
        </div>
        <div class="container-fluid h-100">
          <div class="row h-100">
            <div class="col-12 align-self-center container-fluid noPadding">
              <div class="row">
                <div class="container-fluid">
                  <div class="row d-flex justify-content-center mb-2">
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
            </div>
          </div>
        </div>
      </div>
      <div class="align-bottom" style="    background-color: #e1e8f9">
        <div class="container-fluid noPadding">
          <div class="row justify-content-center">
            <div class="col-9 col-md-6 col-lg-5 col-xl-4 researchProcess">
              <h5>Para qué sirve ResearcH</h5>
              <div class="img imgProceosResearch">
                <img src="@/assets/proceso.png" alt>
              </div>
            </div>
            <div class="col-7 col-md-5 col-xl-4 d-flex align-items-center">
              <div class="justify-content-center">
                <h5 class="col-md-0 col-lg-0 col-xl-0">Estadísticas ResearcH</h5>
                <p class="cifra">
                  <span>Más de {{totalJournals}}</span>
                  <br>
                  revistas en más de {{totalCountries}} países
                </p>
                <br>
                <div class="img">
                  <img src="@/assets/mapa.png" alt>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="categorySection" class="section">
      <div class="container">
        <div class="row contentMoreSection">
          <div class="col-12 mb-5">
            <h5>Call for Papers</h5>
            <announcements @announcements:click="openJournal"></announcements>
          </div>
          <div class="col-12 mb-5">
            <h5>Categorías</h5>
            <categorias :categories="this.categories" @category:click="routeRevistasWithCategory"></categorias>
          </div>
        </div>
      </div>
    </div>
    <div>
      <footer-research></footer-research>
    </div>
  </div>
</template>

<script>
import HeaderInicial from "@/components/HeaderInicial";
import HeaderResearch from "@/components/HeaderResearch";
import BarraBusqueda from "@/components/BarraBusqueda";
import LogoResearch from "@/components/LogoResearch";
import FiltrosBusqueda from "@/components/FiltrosBusqueda";
import Categorias from "@/components/Categorias";
import FooterResearch from "@/components/FooterResearch";
import Announcements from "@/components/Announcements";
import axios from "axios";
import ingenieriaLogo from "@/assets/ingenieria-200x167.png";
import cienciasAgricolas from "@/assets/ciencias-agricolas-y-ambientales-200x167.png";
import cienciasBiologicas from "@/assets/ciencias-biologicas-200x167.png";
import cienciasSalud from "@/assets/ciencias-de-la-salud-200x167.png";
import cienciasSociales from "@/assets/ciencias-sociales-200x167.png";
import humanidades from "@/assets/humanidades-200x167.png";
import cienciasExactas from "@/assets/ciencias-exactas-y-de-la-Tierra-200x167.png";
import linguisticaLiteraturaArtes from "@/assets/linguistica200x167.png";
import jsonHeaderOptions from "@/utilities/headerOptions.json";

export default {
  name: "research",
  components: {
    HeaderInicial,
    HeaderResearch,
    BarraBusqueda,
    LogoResearch,
    FiltrosBusqueda,
    Categorias,
    FooterResearch,
    Announcements
  },
  data() {
    return {
      phrase: "",
      categories: [
        {
          img: cienciasAgricolas,
          id: 1,
          nombre: "Ciencias Agrícolas y Ambientales",
          count: " "
        },
        {
          img: cienciasBiologicas,
          id: 2,
          nombre: "Ciencias Biológicas",
          count: " "
        },
        {
          img: cienciasSalud,
          id: 3,
          nombre: "Ciencias de la salud",
          count: " "
        },
        {
          img: cienciasExactas,
          id: 4,
          nombre: "Ciencias Exactas",
          count: " "
        },
        {
          img: cienciasSociales,
          id: 5,
          nombre: "Ciencias Sociales",
          count: " "
        },
        {
          img: ingenieriaLogo,
          id: 6,
          nombre: "Ingeniería",
          count: " "
        },
        {
          img: humanidades,
          id: 7,
          nombre: "Humanidades",
          count: " "
        },
        {
          img: linguisticaLiteraturaArtes,
          id: 8,
          nombre: "Lingüística, literatura y artes",
          count: " "
        }
      ],
      totalJournals: 0,
      totalCountries: 0,
      optionsHeader: undefined,
      modelConv: "radio1"
    };
  },
  created() {
    this.optionsHeader = JSON.parse(
      JSON.stringify(jsonHeaderOptions.landingPageHeader)
    );
    window.scrollTo(0, 0);
    this.$store.commit('resetCurrentFilter')
  },
  mounted() {
    this.categories.forEach(element => {
      axios
        .get(process.env.ROOT_API + `Categoria/${element.id}/revistas/count`)
        .then(response => {
          element.count = response.data.count;
        })
        .catch(error => {
          console.log(error);
        });
    });
    axios
      .get(process.env.ROOT_API + "Revista/count")
      .then(response => {
        this.totalJournals = response.data.count;
      })
      .catch(error => {
        console.log(error);
      });

    //Metodo para contar la cantidad de paises
    let queryPaises = { hayrevista: 1 };
    axios
      .get(
        process.env.ROOT_API +
          "Pais/count/?where=" +
          JSON.stringify(queryPaises)
      )
      .then(response => {
        console.log(
          process.env.ROOT_API +
            "Pais/count/?where=" +
            JSON.stringify(queryPaises)
        );

        this.totalCountries = response.data.count;
      });
  },
  watch: {
  },
  methods: {
    handleScroll: function(evt, el) {
      if (window.scrollY > 150) {
        this.$el.querySelector(".header").style.display = "inline";
      } else {
        this.$el.querySelector(".header").style.display = "none";
      }
    },
    routeRevistasWithCategory: function(category) {
      this.$router.push({
        path: "/ListaRevistas/category=" + category.toString()
      });
    },
    vectorUnico: function(a) {
      return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
      });
    },
    openJournal(announcement) {
      let journal = announcement.revista
      if (
        journal.eissn !== undefined &&
        journal.eissn !== "" &&
        journal.eissn !== null
      ) {
        this.$router.push({
          path: "/Revista/eissn=" + journal.eissn + '&convocatoria=' + announcement.id
        });
      } else {
        this.$router.push({
          path: "/Revista/issn=" + journal.issn + '&convocatoria=' + announcement.id
        });
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
.section {
  min-height: 100vh;
  width: 100%;
}
.grid {
  display: grid;
}
.headerInicial {
  padding: 1em;
}
.header {
  position: fixed;
  width: 100%;
  display: none;
  top: 0;
  left: 0;
  z-index: 1;
}
.seccionEstadisticas {
  background: rgba(209, 209, 209, 1);
  background: -moz-linear-gradient(
    left,
    rgba(209, 209, 209, 1) 0%,
    rgba(209, 209, 209, 1) 3%,
    rgba(219, 219, 219, 1) 24%,
    rgba(226, 226, 226, 1) 36%,
    rgba(254, 254, 254, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(209, 209, 209, 1)),
    color-stop(3%, rgba(209, 209, 209, 1)),
    color-stop(24%, rgba(219, 219, 219, 1)),
    color-stop(36%, rgba(226, 226, 226, 1)),
    color-stop(100%, rgba(254, 254, 254, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(209, 209, 209, 1) 0%,
    rgba(209, 209, 209, 1) 3%,
    rgba(219, 219, 219, 1) 24%,
    rgba(226, 226, 226, 1) 36%,
    rgba(254, 254, 254, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(209, 209, 209, 1) 0%,
    rgba(209, 209, 209, 1) 3%,
    rgba(219, 219, 219, 1) 24%,
    rgba(226, 226, 226, 1) 36%,
    rgba(254, 254, 254, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(209, 209, 209, 1) 0%,
    rgba(209, 209, 209, 1) 3%,
    rgba(219, 219, 219, 1) 24%,
    rgba(226, 226, 226, 1) 36%,
    rgba(254, 254, 254, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(209, 209, 209, 1) 0%,
    rgba(209, 209, 209, 1) 3%,
    rgba(219, 219, 219, 1) 24%,
    rgba(226, 226, 226, 1) 36%,
    rgba(254, 254, 254, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d1d1d1', endColorstr='#fefefe', GradientType=1 );
}
.mainBackground {
  background-image: url("/static/fondoIndex.png");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 50vh;
  display: inline-grid;
}

.phrase {
  margin-top: 2px;
  margin-bottom: 1px;
}
.cifra span {
  font-size: xx-large;
}
.cifra {
  text-align: center;
}
.imgProceosResearch {
  width: 85%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
/*.imgProceosResearch img{
  max-height: inherit;
  width: auto;
}*/
.researchProcess {
  padding-top: 1em;
}
.contentMoreSection {
  padding-top: 6em;
}
</style>
