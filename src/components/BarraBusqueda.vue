<template>
  <div>
    <div class="row">
   
      <div class="col p-0">  
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
       <div class="mt-1">
          <input v-model="searchWithActiveConvocatory" type="checkbox" name="searchCheck" id="searchCheck">
          <label for="searchCheck">CFP Activas</label>
        </div>
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
  components: {
    Autocomplete
  },
  data() {
    return {
      revistas: {},
      categorias: [],
      parametro: " ",
      searchWithActiveConvocatory: false,
    };
  },
  mounted(){
    this.searchWithActiveConvocatory = this.$store.getters.searchWithActiveConvocatory
  },
  watch: {
    searchWithActiveConvocatory(){
      this.$store.commit('setSearchWithActiveConvocatory', this.searchWithActiveConvocatory)
    }
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