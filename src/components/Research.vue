<template>
  <div class="research">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><router-link to="/ListaCategorias">Lista de Categorias</router-link></li>
      <li><router-link to="/ListaRevistas">Lista de Revistas</router-link></li>
      <br>
      <li> </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "research",
  data() {
    return {
      msg: "Welcome to Research Journal"
    };
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
</style>
