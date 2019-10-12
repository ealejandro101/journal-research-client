<template>
  <div class="d-flex flex-column">
    <div v-if="general.errors.length > 0">
      <error-notification :errors="general.errors"></error-notification>
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
      <input
        id="palabraClaveId"
        v-model="rpalabraclave.palabrasclave"
        placeholder="Ingresa palabras clave de su revista separas por punto y coma (;)"
        type="text"
        class="form-control max-width-35em"
      />
    </div>
  </div>
</template>

<script>
import ErrorNotification from "@/components/ErrorNotification.vue";
import models from "@/utilities/models.js"

export default {
  name: "words-form",
  components: {
    ErrorNotification
  },
  props: {
    radicional: {
      default(){
        return models.radicional
      } 
    },
    rpalabraclave: {
      default(){
        return models.rpalabraclave
      } 
    }
  },
  data() {
    return {
      optionsForm: {
        fields: []
      },
      general: {
        editorId: localStorage.getItem("editorId"),
        errors: []
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
  },
  watch: {},
  methods: {
  }
};
</script>

<style>
</style>