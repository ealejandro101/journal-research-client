<template>
  <div class="container-fluid min-vh-100">
    <div class="row min-vh-100">
      <div class="col-12 align-self-start p-0">
        <header-research></header-research>
      </div>
      <div class="col-12 p-0 d-flex justify-content-center">
        <div class="container-fluid">
          <div class="row">
            <div class="col m-4 p-5 bg-light rounded">
              <form @submit.prevent="" class="d-flex">
                <div class="userImage mt-5 mx-4">
                  <img :src="userImg" alt="User image" />
                </div>
                <div>
                  <p class="texto font-weight-bold">Perfil</p>
                  <div class="d-flex flex-wrap">
                    <div class="form-group">
                      <label for="nombre" class="float-left">Nombre completo:</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="editor.name"
                        id="nombre"
                        placeholder="Ingrese su nombre"
                      />
                    </div>
                    <div class="form-group">
                      <label for="edad" class="float-left">Edad:</label>
                      <input
                        type="number"
                        class="form-control"
                        v-model="editor.edad"
                        id="edad"
                        placeholder="Ingrese su edad"
                        min="0"
                        max="120"
                      />
                    </div>
                    <div class="form-group">
                      <label for="profesion" class="float-left">Profesión:</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="editor.profesion"
                        id="profesion"
                        placeholder="Ingrese su profesion"
                      />
                    </div>
                    <div class="form-group">
                      <label for="correo" class="float-left">Correo:</label>
                      <input
                        type="email"
                        class="form-control"
                        v-model="editor.email"
                        id="correo"
                        aria-describedby="emailHelp"
                        placeholder="Ingrese su email"
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="nivelAcademico">Nivel academico</label>
                      <select v-model="editor.nivelAcademico" class="form-control" id="nivelAcademico">
                        <option v-for="(academicLevel, index) in form.options.academicLevel" :key="index" :value="academicLevel" v-text="academicLevel"></option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="universidad" class="float-left">Universidad:</label>
                      <input type="text" class="form-control" v-model="editor.universidad" id="universidad" placeholder="Ingrese su universidad">
                    </div>
                    <div class="form-group">
                      <label for="orcid" class="float-left">ORCID:</label>
                      <input type="text" class="form-control" v-model="editor.orcid" id="orcid" placeholder="Ingrese su orcid">
                    </div>
                    <div class="form-group">
                      <label for="googlescholar" class="float-left">Googlescholar:</label>
                      <input type="text" class="form-control" v-model="editor.googlescholar" id="googlescholar" placeholder="Ingrese su googlescholar">
                    </div>
                  </div>
                </div>
              </form>
              <div>
                <button @click="updateEditor" class="btn btn-success mt-5">Actualizar información</button>
                <button @click="closeSession" class="btn btn-warning mt-5"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button>
                <div v-if="errors.length > 0">
                  <error-notification :errors="errors"></error-notification>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col m-4 p-5 bg-light rounded">
              <div>
                <p class="font-weight-bold">Categorías de interés:</p>
                <div class="d-flex flex-wrap justify-content-center">
                  <div v-for="interest in categorias" :key="interest.id" class="form-check mx-2">
                    <input class="form-check-input" v-model="categoriasSelected" type="checkbox" :id="interest.id" :value="interest.id">
                    <label class="form-check-label" :for="interest.id" v-text="interest.nombre"></label>
                  </div>
                </div>
                <button @click="updateEditorCategories" class="btn btn-success mt-5">Actualizar categorías de interés</button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col m-4 p-5 bg-light rounded">
              <p class="font-weight-bold">Revistas seguidas:</p>
              <carousel :perPageCustom="[[576, 2],[768,4],[992,6]]" style="width: 100%">
                <slide v-for="item in editor.revistasSuscritas" :key="item.id">
                  <div @click="openJournal(item)">
                    <summaryJournalCard class="summaryCard"
                      :id="item.id.toString()"
                      :titulo='item.titulo'
                      :descripcion='item.descripcion'
                      :urlImg="item.imagen"
                      :isMiniature="true">
                    </summaryJournalCard>
                  </div>
                </slide>
              </carousel>
            </div>
          </div>
          <div class="row">
            <div class="col m-4 p-5 bg-light rounded">
              <p class="font-weight-bold">Tus revistas:</p>
              <carousel :perPageCustom="[[576, 2],[768,4],[992,6]]" style="width: 100%">
                <slide v-for="item in editor.propietarioRevista" :key="item.id">
                  <div @click="openJournal(item)">
                    <summaryJournalCard class="summaryCard"
                      :id="item.id.toString()"
                      :titulo='item.titulo'
                      :descripcion='item.descripcion'
                      :urlImg="item.imagen"
                      :isMiniature="true">
                    </summaryJournalCard>
                  </div>
                </slide>
              </carousel>
              <div>
                <button @click="newJournal" class="btn btn-info mt-3"><i class="fas fa-book-open"></i> Postula tu revista</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 align-self-end p-0">
        <footer-research></footer-research>
      </div>
    </div>
  </div>
</template>

<script>
import models from "@/utilities/models.js"
import HeaderResearch from "@/components/HeaderResearch";
import FooterResearch from "@/components/FooterResearch";
import SuscriptionButton from "@/components/SuscriptionButton.vue";
import summaryJournalCard from "@/components/summaryJournalCard ";
import userSRC from "@/assets/temporal/user.png";
import { EventBus } from "@/event-bus.js";

export default {
  name: "editor-page",
  components: {
    HeaderResearch,
    FooterResearch,
    SuscriptionButton,
    summaryJournalCard
  },
  data() {
    return {
      editor: {
        categoriasSuscritas: [],
        propietarioRevista: [],
        descripcion: '',
        edad: '',
        email: '',
        imagen: '',
        name: '',
        profesion: '',
        revistasSuscritas: [],
        id: undefined
      },
      userImg: userSRC,
      categorias: [],
      errors: [],
      categoriasSelected: [],
      form: {
        options: {
          academicLevel: models.editor.academicLevel
        }
      }
    };
  },
  created() {
    let _self = this;
    if (this.$store.getters.editorId === undefined) {
      this.$router.push({
        path: '/Login'
      })
    }
    this.$store.commit("setCurrentPage", "editor-page");
    EventBus.$on("userLogged", function() {
      //Se activa en el constructor de @/providerservices/providerservices.js
      _self.userIsLogged();
    });
    _self.userIsLogged();
  },
  methods: {
    userIsLogged() {
      this.$store.getters.providerService
        .getEditorFullObject()
        .then(response => {
          this.editor = response.editor;
          for (const iterator of this.editor.categoriasSuscritas) {
            this.categoriasSelected.push(iterator.id)
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.$store.getters.providerService
        .getModel('Categoria', {})
        .then(response => {
          this.categorias = response.data
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateEditor(){
      this.errors = []
      if (this.editor.id === undefined) {
        this.errors = ['Error interno, reinicie la pagina']
      }
      this.$store.getters.providerService.patchModel(`Editors/${this.editor.id}`, {
        name: this.editor.name,
        profesion: this.editor.profesion,
        edad: this.editor.edad,
        nivelAcademico: this.editor.nivelAcademico,
        orcid: this.editor.orcid,
        universidad: this.editor.universidad,
        googlescholar: this.editor.googlescholar
      }).then((response) => {
        alert('Se ha actualizado el perfil correctamente')
      }).catch((error) => {
        alert(error.response.data.error.message)
      })
    },
    updateEditorCategories(){
      let subscribedCategories = []
      for (const iterator of this.categoriasSelected) {
        subscribedCategories.push({
          id: '',
          editorId: this.editor.id,
          categoriaId: iterator
        })
      }
      this.$store.getters.providerService.deleteModel(`Editors/${this.editor.id}/categoriasSuscritas`).then((response) => {
        this.$store.getters.providerService.postModel(`SuscripcionEditorCategoria`, subscribedCategories).then((response) => {
          alert('Se han actualizado las categorías correctamente')
        }).catch((error) => {
          alert(error.response.data.error.message)
        })
      }).catch((error) => {
        alert(error.response.data.error.message)
      })
    },
    openJournal: function(journal) {
      if(journal.eissn !== undefined && journal.eissn !== '' && journal.eissn !== null){
        this.$router.push({    
          path: "/Revista/eissn=" + journal.eissn
        });
      }else{
        this.$router.push({    
          path: "/Revista/issn=" + journal.issn
        });
      }
    },
    newJournal(){
      this.$router.push({
        path: '/FormularioNuevaRevista'
      })
    },
    closeSession(){
      this.$store.getters.providerService.logout().then(res => {
        this.$store.commit("logout")
        this.$router.push({
          path: '/'
        })
      }).catch(err => {
        alert('No se ha cerrado la sesión correctamente')
      })

    }
  }
};
</script>

<style scoped>
.userImage {
  min-width: 4em;
  max-width: 7em;
  height: auto;
}
.userImage img{
  width: 100%;
  height: auto;
}
.form-group{
  margin: 1em 1em
}
</style>