<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-6 col-sm-4 col-md-3 col-xl-2">
                <div class="categoryCard">
                    <span>124</span>
                    <div class="divImg"><img src="@/assets/ingenieria_icono.png" alt=""></div>
                    <p>Ingeniería</p>
                </div>
            </div>
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
/*.categoryCard{

}*/
</style>
