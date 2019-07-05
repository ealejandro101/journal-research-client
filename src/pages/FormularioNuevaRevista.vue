<template>
  <div> 
    <header-research :inputOptions="optionsHeader"></header-research>
    <div class="backgroundImg3">
      <div class="container mb-5">
        <div class="row">
          <div class="col">
            <h1 >Registra tu revista</h1>
            <div class="div-text">
                <p class="text-justify">ResearcH es una red de revistas científicas de acceso abierto (Open Access) que tiene como objetivo la difusión de las publicaciones seriadas y brindar a los investigadores información precisa sobre dónde pueden enviar sus manuscritos. A través de la publicación de llamados a publicar (Call for papers) en el sitio web y en las redes sociales, ResearcH quiere establecer comunicaciones eficaces entre editores e investigadores que permitan la publicación ágil y mejorar la calidad de las revistas científicas. Ver más información</p>
            </div>     
            <br>   
            <div class="containerIframe">
              <iframe src="https://docs.google.com/forms/d/1OSJu-gvgYjs-_n6HqnGErUKPu8L1Uyglj-s1GI89js0/viewform?embedded=true" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0"></iframe>
            </div>
          </div>
        </div>
      </div>
      <div>
        <footer-research></footer-research>
      </div>
    </div>

   </div> 
</template>

<script>
import HeaderResearch from "@/components/HeaderResearch";
import jsonHeaderOptions from "@/utilities/headerOptions.json";
import FooterResearch from "@/components/FooterResearch";

export default {
  data() {
    return {
      optionsHeader: undefined
    };
  },
  components: {
    HeaderResearch, FooterResearch
  },
  created (){
    this.optionsHeader = JSON.parse(JSON.stringify(jsonHeaderOptions.otherPageHeader))
    window.scrollTo(0, 0);
  },
  methods: {}
};
</script>

<style scoped>
.div-text {
  border-radius: 10px;
  padding: 5px;
}

#searchAutoComplete {
  background: black;
  color: blue;
}
.containerIframe{
  height: 50vh;
}
</style>