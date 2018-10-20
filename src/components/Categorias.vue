<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            Categorias
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categorias: []
    };
  },
  mounted() {
    /*axiosaxios.get("http://localhost:3000/api/Categoria").then(response => {
      this.categorias = response.data;
    });*/
  }
};
</script>

<style scoped>
</style>
