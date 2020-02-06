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
          :disabled="isDisabled(mode, 'rcontactos.editor')"
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
          :disabled="isDisabled(mode, 'radicional.url')"
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
          :disabled="isDisabled(mode, 'radicional.correo')"
          v-model="radicional.correo"
          placeholder="Ingrese el email de la revista"
          required="required"
          type="mail"
          class="form-control"
        />
      </div>

      <div class="form-group d-flex flex-column text-center">
        <label for="editorOrcid" class="text-left d-block">OrcID</label>
        <div class="d-flex">
          <span class="d-flex align-items-center">https://orcid.org/0000-</span>
          <input
            id="editorOrcid"
            :disabled="isDisabled(mode, 'rcontactos.editorOrcid')"
            v-model="rcontactos.editorOrcid"
            placeholder="ingrese el OrcID del editor"
            type="text"
            class="form-control max-width-35em"
          />
        </div>
        
      </div>

      <div class="form-group d-flex flex-column text-center">
        <label for="editorGooglescholar" class="text-left d-block">Google Scholar</label>
        <input
          id="editorGooglescholar"
          :disabled="isDisabled(mode, 'rcontactos.editorGooglescholar')"
          v-model="rcontactos.editorGooglescholar"
          placeholder="ingrese la url del Google Scholar del editor"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column text-center">
        <label for="googlescholar" class="text-left d-block">Google Sccholar Metrics de la revista</label>
        <input
          id="googlescholar"
          :disabled="isDisabled(mode, 'radicional.googlescholar')"
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
          :disabled="isDisabled(mode, 'rcontactos.institucion')"
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
          :disabled="isDisabled(mode, 'rcontactos.facultad')"
          v-model="rcontactos.facultad"
          placeholder="Ingrese el nombre de la facultad a la cual pertenece la revista"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
      <div class="form-group d-flow-root">
        <label for="facebook" class="text-left d-block">Facebook</label>
        <input
          id="facebook"
          :disabled="isDisabled(mode, 'radicional.facebook')"
          v-model="radicional.facebook"
          placeholder="Ingrese la URL del facebook de la revista"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
      <div class="form-group d-flow-root">
        <label for="twitter" class="text-left d-block">Twitter</label>
        <input
          id="twitter"
          :disabled="isDisabled(mode, 'radicional.twitter')"
          v-model="radicional.twitter"
          placeholder="ngrese la URL del twitter de la revista"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
      <div class="form-group d-flow-root">
        <label for="instagram" class="text-left d-block">Instagram</label>
        <input
          id="instagram"
          :disabled="isDisabled(mode, 'radicional.instagram')"
          v-model="radicional.instagram"
          placeholder="Ingrese instagram"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
      <div class="form-group d-flow-root">
        <label for="videopresentacion" class="text-left d-block">Video de la revista</label>
        <input
          id="videopresentacion"
          :disabled="isDisabled(mode, 'radicional.videopresentacion')"
          v-model="radicional.videopresentacion"
          placeholder="Ingresa en enlace (Youtube, Vimeo) del video promocional de su revista (en caso de tenerlo)"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
    </div>
  <!--</form-->
</template>

<script>
import ErrorNotification from "@/components/generals/ErrorNotification.vue";
import models from "@/utilities/models.js"
import mixins from "@/utilities/mixins.js"

export default {
  name: "contact-form",
  components: {
    ErrorNotification
  },
  mixins: [mixins],
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
    },
    mode: {
      default: 'editor'/* editor, new journal, admin */
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