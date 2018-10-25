<template>
    <div> 
      <header-research></header-research>
    <div class="container">
      <br>
      <h1>Registra tu revista</h1>

        <!-- results-property="titulo" -->
      <!-- 

<autocomplete
        url="http://journals-research.com:3000/api/Revista"
        anchor="titulo"
        label=" "
        placeholder="buscar por titulo"
        >
      </autocomplete>

       -->
      

        <autocomplete
          id="searchAutoComplete"
          source='http://journals-research.com:3000/api/Revista?filter={"where":{"titulo":{"like":"%'
          results-property=" "
          results-display="titulo">
        </autocomplete>


       
         <autocomplete
        :source="[{id:1,name:'abc'},{id:2,name:'def'}]">
      </autocomplete>
  
   



      <div class="div-text">
          <p class="text-justify">ResearcH es una red de revistas científicas de acceso abierto (Open Access) que tiene como objetivo la difusión de las publicaciones seriadas y brindar a los investigadores información precisa sobre dónde pueden enviar sus manuscritos. A través de la publicación de llamados a publicar (Call for papers) en el sitio web y en las redes sociales, ResearcH quiere establecer comunicaciones eficaces entre editores e investigadores que permitan la publicación ágil y mejorar la calidad de las revistas científicas. Ver más información</p>
      </div>     
      <br>   
        <iframe src="https://docs.google.com/forms/d/1OSJu-gvgYjs-_n6HqnGErUKPu8L1Uyglj-s1GI89js0/viewform?embedded=true" width="100%" height="2560" frameborder="0" marginheight="0" marginwidth="0">Cargando...</iframe>
    </div>

  

   </div> 
</template>

<script>
import HeaderResearch from "@/components/HeaderResearch";
import Autocomplete from "vuejs-auto-complete";
//import Autocomplete from "vue2-autocomplete-js";

//test

export default {
  data() {
    return {};
  },
  components: {
    HeaderResearch,
    Autocomplete
  },
  methods: {
    formattedDisplay(result) {
      return result.titulo;
    }
  }
};
</script>

<style scoped>
.div-text {
  border-radius: 10px;
  padding: 5px;
}
</style>