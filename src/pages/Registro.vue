<template>
  <div class="container-fluid min-vh-100">
    <div class="row min-vh-100">
      <div class="col-12 align-self-start p-0">
        <header-research></header-research>
      </div>
      <div class="col-12 p-0 d-flex justify-content-center content-page">
        <div class="p-5 my-5">
          <form @submit.prevent="register">
            <div class="d-flex-colum">
              <h4 class="texto">Registro</h4>
              <div class="form-group">
                <label for="nombre" class="float-left">Nombre completo:</label>
                <input type="text" class="form-control" v-model="name" id="nombre" placeholder="Ingrese su nombre">
              </div>
              <div class="form-group">
                <label for="profesion" class="float-left">Profesión:</label>
                <input type="text" class="form-control" v-model="profesion" id="profesion" placeholder="Ingrese su profesion">
              </div>
              <div class="form-group">
                  <label for="nivelAcademico">Nivel academico</label>
                  <select v-model="nivelAcademico" class="form-control" id="nivelAcademico">
                    <option v-for="(academicLevel, index) in form.options.academicLevel" :key="index" :value="academicLevel" v-text="academicLevel"></option>
                  </select>
                </div>
              <div class="form-group">
                <label for="universidad" class="float-left">Universidad:</label>
                <input type="text" class="form-control" v-model="universidad" id="universidad" placeholder="Ingrese su universidad">
              </div>
              <div class="form-group">
                <label for="orcid" class="float-left">ORCID:</label>
                <input type="text" class="form-control" v-model="orcid" id="orcid" placeholder="Ingrese su orcid">
              </div>
              <div class="form-group">
                <label for="googlescholar" class="float-left">Google Scholar:</label>
                <input type="text" class="form-control" v-model="googlescholar" id="googlescholar" placeholder="Ingrese su googlescholar">
              </div>
              <div class="form-group">
                <label for="correo" class="float-left">Correo:</label>
                <input type="email" class="form-control" v-model="email" id="correo" aria-describedby="emailHelp" placeholder="Ingrese su email">
              </div>
              <div class="form-group">
                <label for="password" class="float-left">Contraseña:</label>
                <input type="password" class="form-control" v-model="password" id="password" placeholder="Ingrese su contraseña">
              </div>
              <div class="form-group">
                <label for="repassword" class="float-left">Repetir la contraseña:</label>
                <input type="password" class="form-control" v-model="repassword" id="repassword" placeholder="Ingrese su contraseña">
              </div>
              <!--<div class="form-group">
                <label for="foto" class="float-left">Foto:</label>
                <input type="file" class="form-control" ref="picture" id="foto">
              </div>-->
              <button class="btn btn-success">Registrar</button>
              <div v-if="errors.length > 0">
                <error-notification :errors="errors"></error-notification>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="isLoading" class="col-12">
        <loading-dardo />
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
import LoadingDardo from "@/components/generals/LoadingDardo"
import jsonHeaderOptions from "@/utilities/headerOptions.js";
import ErrorNotification from "@/components/ErrorNotification"
import validator from "@/utilities/validators.js"
import models from "@/utilities/inputOptions.js"
import { EventBus } from '@/event-bus.js';

export default {
  name: "register-page",
  components: {
    HeaderResearch,
    FooterResearch,
    ErrorNotification,
    LoadingDardo
  },
  data() {
    return {
      name: '',
      profesion: '',
      email: '',
      password: '',
      repassword: '',
      nivelAcademico: '',
      orcid: '',
      universidad: '',
      googlescholar: '',
      errors: [],
      form: {
        options: {
          academicLevel: models.editor.academicLevel
        }
      },
     isLoading: false 
    };
  },
  created() {
    this.$store.commit('setCurrentPage', 'register-page')
  },
  methods: {
    register(){
      let _self = this
      this.errors = this.getFormErrors()
      if (this.errors.length > 0) {
        return
      }
      this.isLoading = true
      this.$store.getters.providerService.postModel('Editors', {
        name: this.name,
        profesion: this.profesion,
        email: this.email,
        password: this.password,
        nivelAcademico: this.nivelAcademico,
        orcid: this.orcid,
        universidad: this.universidad,
        googlescholar: this.googlescholar
      }).then(res => {
        this.isLoading = false
        alert('Se ha registrado correctamente')
        _self.$router.push({
          path: '/Login'
        })
      }).catch(err => {
        this.isLoading = false
        alert(err.response.data.error.message)
      })
    },
    getFormErrors(){
      let errors = []
      if (!validator.isText(this.name)) {
        errors.push('Para el nombre solo se permiten caracteres alfabéticos')
      }
      if (!validator.isText(this.profesion)) {
        errors.push('Para la profesion solo se permiten caracteres alfabéticos')
      }
      if (!validator.isEmail(this.email)) {
        errors.push('Debe de ingresar un correo valido')
      }
      if (this.password != this.repassword) {
        errors.push('Las contraseñas no coinciden')
      }
      return errors
    }
  }
};
</script>

<style scoped>
.content-page{
  height: fit-content;
}
</style>