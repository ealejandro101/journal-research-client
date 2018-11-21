<template>
  <div>
    <div class="row">
   
      <div class="col noPadding">  
        <autocomplete
          :source="EndpointPrediccion"
          results-property="revistas"
          :results-display="formattedDisplay"
          placeholder="Título - Descripción"
          @keyup.enter.native="routeRevistas"
          name="parametro"
          @enter="buscarPalabra"
          @nothingSelected="buscarPalabra"
          >
        </autocomplete>
       
      </div>
     
     
    </div>
    
  </div>
</template>
<script>
import axios from "axios";
import Autocomplete from "vuejs-auto-complete";
export default {
  name: "barra-busqueda",
  props: ["isFilter"],

  data() {
    return {
      revistas: {},
      categorias: [],
      parametro: ""
    };
  },
  mounted() {
    this.Lrevistas;
  },
  methods: {
    routeRevistas: function() {
      this.$router.push({
        path: "/ListaRevistas/search=" + this.parametro.toString()
      });
    },
    buscarPalabra(input) {
      this.$router.push({
        path: "/ListaRevistas/search=" + input
      });
    },
    EndpointPrediccion(input) {
      return process.env.ROOT_API + "Revista/busqueda?q=" + input;
    },
    formattedDisplay(result) {
      return result.titulo;
    },
    Lrevistas: function() {
      axios.get(process.env.ROOT_API + "Revista/").then(response => {
        this.revistas = response.data;
      });
    }
  },
  components: {
    Autocomplete
  }
};
</script>

<style scoped>
p {
  margin: 0px;
}
.filter {
  padding-top: 2px;
}
.filter p a {
  color: #272727;
}
.searchButton {
  margin: 0px !important;
}
.searchButton a {
  color: #fff;
}
.searchButton a:hover {
  color: rgb(201, 201, 201);
  text-decoration: none;
}
</style>