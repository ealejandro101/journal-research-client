<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-6">
                
                <h2>Revistas</h2>
                <div class="card mb-3" v-for="revista in revistas" :key="revista.id">
                    <div class="card-body">
                        <h3>{{revista.titulo}}</h3>
                        <p v-text="revista.issn"></p>
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
      revistas: []
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/Revista").then(response => {
      this.revistas = response.data;
    });
  }
};
</script>

<style scoped>
</style>