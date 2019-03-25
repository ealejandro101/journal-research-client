<template>
  <div>
    <div class="row">
   
      <div class="col noPadding">  
        <autocomplete
          :source="EndpointPrediccion"
          results-property="revistas"
          :results-display="formattedDisplay"
          placeholder="Título - Descripción"
          name="parametro"
          @nothingSelected="buscarPalabra"
          @selected="wordSelected"
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
      parametro: " "
    };
  },
  methods: {
    buscarPalabra(input) {
      if(input == undefined || input.toString() == 'undefined'){
        this.$router.push({    
            path: "/ListaRevistas/search="
        });
      }else{
        this.$router.push({    
            path: "/ListaRevistas/search=" + encodeURIComponent(input)
        });
      }
    },
    wordSelected (selected) {
      if (selected.selectedObject.eissn !== null && selected.selectedObject.eissn !== undefined) {
        this.$router.push({    
            path: "/Revista/eissn=" + selected.selectedObject.eissn
        });
      }else{
        this.$router.push({    
            path: "/Revista/issn=" + selected.selectedObject.issn
        });
      }
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