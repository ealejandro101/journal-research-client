<template>
  <div class="research container-fluid noPadding">
    <header-inicial :opciones="opciones"></header-inicial>
    <br><br><br><br>
    <header-research :opciones="opciones"></header-research>
  </div>
</template>

<script>
import HeaderInicial from '@/components/HeaderInicial.vue';
import HeaderResearch from '@/components/HeaderResearch.vue';

export default {
  name: "research",
  components: {
		HeaderInicial, HeaderResearch
	},
  data() {
    return {
      opciones: [
          {to: '/InfoResearcH', text: 'Que es ResearcH', active: true, isVuePag: false, link: 'http://journals-research.com/about_us.html'},
          {to: '/FormularioNuevaRevista', text: 'Postula revistas', active: true, isVuePag: false, link: 'http://journals-research.com/acuerdo_research.html'},
          {to: '/Login', text: 'Ingresar', active: true, isVuePag: true, link: ''},
          {to: '/Registro', text: 'Registro', active: true, isVuePag: true, link: ''}
      ]
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
