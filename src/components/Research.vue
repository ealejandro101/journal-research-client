<template>
  <div class="research">
    <div class="research-descripcion">
      <h1>{{ msg }}</h1>
			<p>ResearcH es una <strong>red </strong>sin ánimo de lucro que publica información de las revistas científicas con el fin de sugerir a los investigadores sobre dónde publicar sus manuscritos.</p>
      <p>Los editores pueden suscribir un acuerdo con Journals &amp; Authors para que su revista pueda ser publicada en ResearcH. Este acuerdo buscará también difundir en el sitio web (<a href="http://journalsandauthors.com/www.jasolutions.com.co">www.jasolutions.com.co</a>) y en nuestras cuentas oficiales de redes sociales información de la revista relacionada con convocatorias de recepción de artículos (Call for Papers), guía para autores, alcances, política editorial e información sobre integrantes del comité editorial.</p>
      <p>Journals &amp; Authors adquiere únicamente los derechos de difusión y no hará uso comercial o lucrativo de los contenidos publicados en cada una de las revistas suscritas.</p>
		</div>
    <Categorias/>
    <div>
      <h2>Essential Links</h2>
      <ul>
        <li><router-link to="/ListaRevistas">Lista de Revistas</router-link></li>
      </ul>
    </div>
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
