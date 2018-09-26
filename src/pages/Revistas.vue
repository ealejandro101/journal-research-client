
<template>


<div class="container my-5">       
{{ $route.params.param }}
<summaryJournalCard
                titulo='INGENÍERIA Y CIENCIA'
                descripcion='La revista Ingeniería y Ciencia está dirigida a la comunidad académica, científica e industrial en las áreas de la ciencia y la ingeniería. Su objetivo es presentar y difundir trabajos de investigación básica y aplicada que contribuyan al desarrollo de la ciencia y la industria en el corto, mediano y/o largo plazo, en el ámbito local e internacional. Los temas de publicación incluyen: matemáticas, física, química, biología, geología'
                urlImg="http://jasolutions.com.co/wp-content/uploads/2017/05/ingenieriaciencia.jpg"
        >
        </summaryJournalCard>

<detailedJournalCard
        id="6"
></detailedJournalCard>


    </div>    



</template>

<script>
import axios from "axios";
import summaryJournalCard from "@/components/summaryJournalCard ";
import detailedJournalCard from "@/components/ detailedJournalCard";

export default {
  data() {
    return {
      revistas: []
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/Revista").then(response => {
      //this.revistas = response.data;
    });
  },
  components: {
    summaryJournalCard,
    detailedJournalCard
  }
};
</script>

<style scoped>
</style>