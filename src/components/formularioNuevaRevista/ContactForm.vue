<template>
  <!--<form @submit.prevent="save">-->
    <div class="d-flex flex-column">
      <div v-if="general.errors.length > 0">
        <error-notification :errors="general.errors"></error-notification>
      </div>
      <div class="form-group d-flex flex-column text-center">
        <label for="editor" class="text-left d-block">Editor *</label>
        <div v-if="!rcontactos.editor" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="editor"
          v-model="rcontactos.editor"
          placeholder="Ingrese el nombre del editor de la revista"
          required="required"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
      <div class="form-group d-flex flex-column text-center">
        <label for="url" class="text-left d-block">URL de la revista *</label>
        <div v-if="!radicional.url" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="url"
          v-model="radicional.url"
          placeholder="Ingrese url"
          required="required"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
      <div class="form-group d-flex flex-column text-center">
        <label for="correo" class="text-left d-block">Correo electrónico*</label>
        <div v-if="!radicional.correo" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="correo"
          v-model="radicional.correo"
          placeholder="Ingrese el email de la revista"
          required="required"
          type="mail"
          class="form-control"
        />
      </div>

      <div class="form-group d-flex flex-column text-center">
        <label for="editorOrcid" class="text-left d-block">OrcID</label>
        <input
          id="editorOrcid"
          v-model="rcontactos.editorOrcid"
          placeholder="ingrese el OrcID del editor"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column text-center">
        <label for="editorGooglescholar" class="text-left d-block">Google Scholar</label>
        <input
          id="editorGooglescholar"
          v-model="rcontactos.editorGooglescholar"
          placeholder="ingrese la url del Google Scholar del editor"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column text-center">
        <label for="googlescholar" class="text-left d-block">Google Scholar Revista</label>
        <input
          id="googlescholar"
          v-model="radicional.googlescholar"
          placeholder="Ingrese el Google Scholar"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column text-center">
        <label for="institucion" class="text-left d-block">Institución*</label>
        <div v-if="!rcontactos.institucion" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="institucion"
          v-model="rcontactos.institucion"
          placeholder="Ingrese el nombre de la Institución a la cual pertenece la revista"
          required="required"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
      <div class="form-group d-flex flex-column text-center">
        <label for="facultad" class="text-left d-block">Facultad</label>
        <input
          id="facultad"
          v-model="rcontactos.facultad"
          placeholder="Ingrese el nombre de la facultad a la cual pertenece la revista"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
    </div>
  <!--</form-->
</template>

<script>
import ErrorNotification from "@/components/ErrorNotification.vue";
import models from "@/utilities/models.js"

export default {
  name: "contact-form",
  components: {
    ErrorNotification
  },
  props: {
    rcontactos: {
      default(){
        return models.rcontactos
      } 
    },
    radicional: {
      default(){
        return models.radicional
      } 
    }
  },
  data() {
    return {
      optionsForm: {
        periodicities: []
      },
      general: {
        editorId: localStorage.getItem("editorId"),
        errors: []
      }
    };
  },
  created() {
    this.$store.getters.providerService
      .getModel("Periodicidads")
      .then(res => {
        this.optionsForm.periodicities = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  watch: {},
  methods: {
    save() {
      this.$emit('save')
    }
  }
};
</script>

<style>
</style>