<template>
  <div>
    <div class="row">
      <div class="col noPadding">
        <b-form-input @keyup.enter.native="routeRevistas" v-model="parametro" size="sm" class="mr-sm-2" type="text" placeholder="Título - Descripción"/>
      </div>
      <router-link :to="'/ListaRevistas/search='+parametro">
        <b-button size="sm" class="my-2 my-sm-0 searchButton" type="submit">
          Buscar
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
  },
  methods:{
    routeRevistas: function () {
      this.$router.push({path: '/ListaRevistas/search='+this.parametro.toString()})
    }
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
  color: #272727;
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