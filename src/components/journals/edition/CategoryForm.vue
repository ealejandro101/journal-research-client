<template>
  <!--<form @submit.prevent="save">-->
    <div class="d-flow-root">
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
              :disabled="isDisabled(mode, 'revistascategorias.categories')"
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
      <label
        for="disciplinaId"
        class="text-left d-block"
      >Escoja la primera disciplina de su revista*</label>
      <div v-if="!radicional.disciplinaId" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
      <select
        v-model="radicional.disciplinaId"
        class="float-left"
        id="disciplinaId"
        :disabled="isDisabled(mode, 'radicional.disciplinaId')"
        required="required"
        style="margin: 0 100vw 0.6em 0em;"
      >
        <option
          v-for="field in optionsForm.fields"
          :key="field.id"
          :value="field.id"
          v-text="field.disciplina"
        ></option>
      </select>
    </div>
    <div class="form-group d-flow-root">
      <label
        for="disciplinaId1"
        class="text-left d-block"
      >Escoja la segunda disciplina de su revista</label>
      <select
        class="float-left"
        v-model="radicional.disciplinaId1"
        id="disciplinaId1"
        :disabled="isDisabled(mode, 'radicional.disciplinaId1')"
        style="margin: 0 100vw 0.6em 0em;"
      >
        <option :value="null">----------------</option>
        <option
          v-for="field in optionsForm.fields"
          :key="field.id"
          :value="field.id"
          v-text="field.disciplina"
        ></option>
      </select>
    </div>
    <div class="form-group d-flow-root">
      <label
        for="disciplinaId2"
        class="text-left d-block"
      >Escoja la tercera disciplina de su revista</label>
      <select
        class="float-left"
        v-model="radicional.disciplinaId2"
        id="disciplinaId2"
        :disabled="isDisabled(mode, 'radicional.disciplinaId2')"
        style="margin: 0 100vw 0.6em 0em;"
      >
        <option :value="null">----------------</option>
        <option
          v-for="field in optionsForm.fields"
          :key="field.id"
          :value="field.id"
          v-text="field.disciplina"
        ></option>
      </select>
    </div>
      <div class="form-group d-flow-root">
        <label
          for="disciplinaId3"
          class="text-left d-block"
        >Escoja la cuarta disciplina de su revista</label>
        <select
          class="float-left"
          v-model="radicional.disciplinaId3"
          id="disciplinaId3"
          :disabled="isDisabled(mode, 'radicional.disciplinaId3')"
          style="margin: 0 100vw 0.6em 0em;"
        >
          <option :value="null">----------------</option>
          <option
            v-for="field in optionsForm.fields"
            :key="field.id"
            :value="field.id"
            v-text="field.disciplina"
          ></option>
        </select>
      </div>

      <div class="form-group d-flow-root">
        <label for="palabraClaveId" class="text-left d-block">Ingresa palabras clave de su revista</label>
        <autocomplete
          v-if="!isDisabled(mode, 'rpalabraclave.palabrasclave')"
          ref="autocomplete"
          :source="EndpointPrediccion"
          results-property="words"
          :results-display="formattedDisplay"
          placeholder="Ingresa palabras clave de su revista"
          name="parametro"
          @nothingSelected="newWord"
          @selected="wordSelected"
          >
        </autocomplete>
        <div class="d-flex align-self-center mt-4">
          <label for="palabraClaveId" class="my-0 mr-2">Palabras clave:</label>
          <input
            id="palabraClaveId"
            v-model="rpalabraclave.palabrasclave"
            placeholder="Ingresa palabras clave de su revista separas por punto y coma (;)"
            type="text"
            class="form-control max-width-35em"
            :disabled="general.editWords"
          />
          <button :disabled="isDisabled(mode, 'rpalabraclave.palabrasclave')" class="btn btn-info mx-1" @click="general.editWords = !general.editWords">Edit</button>
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
              :disabled="isDisabled(mode, 'rindexaciones.indexaciones')"
              v-model="rindexaciones.indexaciones"
              type="checkbox"
              class="form-check-input"
              :value="indexing.id"
            />
            <label :for="`indexaciones-${index}`" class="m-0" v-text="indexing.indexaciones"></label>
            <div v-if="indexing.id !== 1 && indexing.id !== 3 && indexing.id !== 8">
              <input
                :id="`parameter-${indexing.id}`"
                :disabled="isDisabled(mode, 'rindexaciones.indexaciones')"
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
              :disabled="isDisabled(mode, 'ridiomas.idiomas')"
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
              :disabled="isDisabled(mode, 'revista.licenciaId')"
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
import ErrorNotification from "@/components/generals/ErrorNotification.vue"
import models from "@/utilities/models.js"
import Autocomplete from "vuejs-auto-complete";
import mixins from "@/utilities/mixins.js"

export default {
  name: "category-form",
  components: {
    ErrorNotification, Autocomplete
  },
  props: {
    revista: {
      default(){
        return models.revista
      } 
    },
    radicional: {
      default(){
        return models.radicional
      } 
    },
    rpalabraclave: {
      default(){
        return models.rpalabraclave
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
    },
    mode: {
      default: 'editor'/* editor, new journal, admin */
    }
  },
  mixins: [mixins],
  data() {
    return {
      optionsForm: {
        indexations: [],
        optionCategories: [],
        languages: [],
        licenses: [],
        fields: [],
      },
      general: {
        editorId: localStorage.getItem("editorId"),
        errors: [],
        editWords: true
      }
    };
  },
  created() {
    this.$store.getters.providerService
      .getModel("Disciplinas")
      .then(res => {
        this.optionsForm.fields = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
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
    },
    EndpointPrediccion (input) {
      return process.env.ROOT_API + "Palabraclaves/busqueda?word=" + input;
    },
    formattedDisplay(result) {
      return result.palabra_clave;
    },
    newWord (input) {
      this.addWord(input)
    },
    wordSelected (selected) {
      this.addWord(selected.display)
    },
    addWord(word){
      if (!this.rpalabraclave.palabrasclave) {
        this.rpalabraclave.palabrasclave = word
      }else{
        this.rpalabraclave.palabrasclave += ';'+word
      }
      this.$refs.autocomplete.clear()
    }
  }
};
</script>

<style>
</style>