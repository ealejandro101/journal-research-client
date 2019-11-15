<template>
  <div class="container-fluid min-vh-100">
    <div class="row min-vh-100">
      <div class="col-12 align-self-start p-0">
        <header-research></header-research>
      </div>
      <div class="col-12 p-0 d-flex justify-content-center login-container">
        <div class="border border-secondary rounded p-5 my-5">
          <form @submit.prevent="login">
            <div class="d-flex-colum">
              <h4 class="texto">Iniciar sesión</h4>
              <div class="form-group">
                <label for="correo" class="float-left">Correo:</label>
                <input v-model="email" type="email" class="form-control" id="correo" aria-describedby="emailHelp" placeholder="Ingrese su email">
              </div>
              <div class="form-group">
                <label for="password" class="float-left">Contraseña:</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Ingrese su contraseña">
              </div>
              <button class="btn btn-success">Ingresar</button>
            </div>
            <div class="mt-3 position-relative" v-if="errors.length > 0"><!-- Errrors -->
              <div class="alert alert-danger" role="alert">
                <div>
                  <i class="fas fa-window-close position-absolute right-0 top-0 cursor-pointer" @click="errors = []"></i>
                </div>
                <template v-for="(error, indexError) in errors">
                  <p :key="indexError" v-text="error"></p>
                </template>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-12 align-self-end p-0">
        <footer-research></footer-research>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderResearch from "@/components/HeaderResearch";
import FooterResearch from "@/components/FooterResearch";
import jsonHeaderOptions from "@/utilities/headerOptions.js";
import { EventBus } from '@/event-bus.js';

export default {
  name: "login-page",
  components: {
    HeaderResearch,
    FooterResearch
  },
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      isActiveButton: true
    };
  },
  created() {
    this.$store.commit('setCurrentPage', 'login-page')
    this.isActiveButton = true
  },
  methods: {
    login(){
      if (!this.isActiveButton) {
        return
      }
      this.isActiveButton = false
      this.errors = []
      this.$store.getters.providerService.login(this.email, this.password).then((data) => {
        location.reload();
      }).catch((error) => {
        this.password = ''
        this.errors = [error.msg]
        this.isActiveButton = true
      })
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
}
.login-container{
  height: fit-content;
}
</style>