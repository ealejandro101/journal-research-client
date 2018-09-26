<template>
  <div>
    <div class="row">
      <div class="col noPadding">
        <b-form-input v-model="parametro" size="sm" class="mr-sm-2" type="text" placeholder="¿Busca dónde publicar?"/>
      </div>
      <router-link :to="'/ListaRevistas/'+parametro">
        <b-button size="sm" class="my-2 my-sm-0 searchButton" type="submit">
          Search
        </b-button>
      </router-link>
    </div>
    <div v-if="isFilter" class="row d-flex justify-content-end filter">
      <i class="fas fa-filter"></i>
      <p>
        <router-link to="/ListaRevistas">Filtros avanzados</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "barra-busqueda",
  props: ["isFilter"],
  data() {
    return {
      categorias: [], parametro: ''
    };
  }
};
</script>

<style scoped>
p{
  margin: 0px;
}
.filter{
  padding-top: 2px;
}
.filter p a{
  color: gray;
}
.searchButton{
  margin: 0px !important;
}
.searchButton a{
  color: #fff;
}
.searchButton a:hover{
  color: rgb(201, 201, 201);
  text-decoration: none;
}
</style>