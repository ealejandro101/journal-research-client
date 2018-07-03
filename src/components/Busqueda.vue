<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-6">
                
                <h2>Categorias</h2>
                <div class="card mb-3" v-for="categoria in categorias" :key="categoria.id">
                    <div class="card-body">
                        <h3>{{categoria.title}}</h3>
                        <p v-text="categoria.nombre"></p>
                    </div>
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
    axios.get("http://localhost:3000/api/Categoria").then(response => {
      this.categorias = response.data;
    });
  }
};
</script>

<style scoped>
</style>