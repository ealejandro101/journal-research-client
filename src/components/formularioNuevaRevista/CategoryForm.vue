<template>
  <!--<form @submit.prevent="save">-->
    <div class="d-flex flex-column">
      <div v-if="general.errors.length > 0">
        <error-notification :errors="general.errors"></error-notification>
      </div>
      <div class="form-group d-flow-root">
        <label
          for="categoriaId"
          class="text-left d-block"
        >Seleccione la(s) catergoria(s) a las cuales pertenece su revista*</label>
        <div v-if="revistascategorias.categories.length == 0" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <div class="pl-4">
          <div
            class="d-flex inputOption"
            v-for="(category, index) in optionsForm.optionCategories"
            :key="category.id"
          >
            <input
              name="categoriaId"
              :id="`categorias-${index}`"
              v-model="revistascategorias.categories"
              type="checkbox"
              class="form-check-input"
              :value="category.id"
            />
            <label :for="`categorias-${index}`" v-text="category.nombre"></label>
          </div>
        </div>
      </div>
      <div class="form-group d-flow-root">
        <label for="indexacionesId" class="text-left d-block">Indexaciones *</label>
        <div v-if="rindexaciones.indexaciones.length == 0" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <div class="pl-4">
          <div
            class="d-flex align-items-center inputOption"
            v-for="(indexing, index) in optionsForm.indexations"
            :key="indexing.id"
          >
            <input
              name="indexacionesId"
              :id="`indexaciones-${index}`"
              v-model="rindexaciones.indexaciones"
              type="checkbox"
              class="form-check-input"
              :value="indexing.id"
            />
            <label :for="`indexaciones-${index}`" class="m-0" v-text="indexing.indexaciones"></label>
            <input
              :id="`parameter-${indexing.id}`"
              v-model="rindexaciones[`parameter-${indexing.id}`]"
              class="form-control ml-3"
              type="text"
              placeholder="link/url"
            />
            <span 
              v-if="isActive(rindexaciones.indexaciones, indexing.id) != undefined && !rindexaciones[`parameter-${indexing.id}`]" 
              class="isNecessary text-left small text-danger">
              Es necesario llenar este campo
            </span>
          </div>
        </div>
      </div>
      <div class="form-group d-flow-root">
        <label
          for="idiomaId"
          class="text-left d-block"
        >Seleccione el (los) idioma (s) en los cuales publica la revista*</label>
        <div v-if="ridiomas.idiomas.length == 0" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <div class="pl-4">
          <div
            class="d-flex inputOption"
            v-for="(optionLanguage, index) in optionsForm.languages"
            :key="optionLanguage.id"
          >
            <input
              name="idiomaId"
              :id="`idioma-${index}`"
              v-model="ridiomas.idiomas"
              type="checkbox"
              class="form-check-input"
              :value="optionLanguage.id"
            />
            <label :for="`idioma-${index}`" v-text="optionLanguage.idioma"></label>
          </div>
        </div>
      </div>
      <div class="form-group d-flow-root">
        <label for="licenciaId" class="text-left d-block">Licencia Creative Commons *</label>
        <div v-if="!revista.licenciaId" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <div class="pl-4">
          <div v-for="(license, index) in optionsForm.licenses" :key="license.id" class="d-flex inputOption" >
            <input
              name="licenciaId"
              :id="`lincence-${index}`"
              type="radio"
              v-model="revista.licenciaId"
              class="form-check-input"
              :value="license.id"
            />
            <label :for="`lincence-${index}`" v-text="license.licencia"></label>
          </div>
        </div>
      </div>
    </div>
  <!--</form>-->
</template>

<script>
import ErrorNotification from "@/components/ErrorNotification.vue"
import models from "@/utilities/models.js"

export default {
  name: "category-form",
  components: {
    ErrorNotification
  },
  props: {
    revista: {
      default(){
        return models.revista
      } 
    },
    ridiomas: {
      default(){
        return models.ridiomas
      } 
    },
    rindexaciones: {
      default(){
        return models.rindexaciones
      } 
    },
    revistascategorias: {
      default(){
        return models.revistascategorias
      } 
    }
  },
  data() {
    return {
      optionsForm: {
        indexations: [],
        optionCategories: [],
        languages: [],
        licenses: [],

      },
      general: {
        editorId: localStorage.getItem("editorId"),
        errors: []
      }
    };
  },
  created() {
    this.$store.getters.providerService
      .getModel("Indexaciones")
      .then(res => {
        this.optionsForm.indexations = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    this.$store.getters.providerService
      .getModel("Categoria")
      .then(res => {
        this.optionsForm.optionCategories = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    this.$store.getters.providerService
      .getModel("Idiomas")
      .then(res => {
        this.optionsForm.languages = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });

    this.$store.getters.providerService
      .getModel("Licencia")
      .then(res => {
        this.optionsForm.licenses = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  computed: {
  },
  watch: {
  },
  methods: {
    save() {
      this.$emit('save')
    },
    isActive(array, item){
      let res = array.find(function(element) {
        return element == item;
      });
      return res
    }
  }
};
</script>

<style>
</style>