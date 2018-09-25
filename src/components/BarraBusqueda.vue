<template>
  <div>
    <div class="row">
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
    </div>
    <div class="row">
      <p>Filtros avanzados</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "barra-busqueda",
  data() {
    return {
      categorias: []
    };
  }/*,
  mounted() {
    axios.get("http://localhost:3000/api/Categoria").then(response => {
      this.categorias = response.data;
    });
  }*/
};
</script>

<style scoped>
</style>