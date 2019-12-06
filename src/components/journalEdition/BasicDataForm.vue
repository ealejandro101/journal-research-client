<template>
  <!--<form @submit.prevent="save">-->
    <div class="d-flex flex-column">
      <div v-if="general.errors.length > 0">
        <error-notification :errors="general.errors"></error-notification>
      </div>
      <div class="form-group d-flex flex-column text-center">
        <label for="titulo" class="text-left d-block">Titulo*</label>
        <div v-if="!revista.titulo" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="titulo"
          :disabled="isDisabled(mode, 'revista.titulo')"
          v-model="revista.titulo"
          placeholder="Ingrese el titulo"
          required="required"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column">
        <label for="subtitulo" class="text-left d-block">Subtitulo</label>
        <input
          id="subtitulo"
          :disabled="isDisabled(mode, 'revista.subtitulo')"
          v-model="revista.subtitulo"
          placeholder="Ingrese el subtitulo"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column">
        <label for="tituloCorto" class="text-left d-block">Titulo corto</label>
        <input
          id="tituloCorto"
          :disabled="isDisabled(mode, 'revista.tituloCorto')"
          v-model="revista.tituloCorto"
          placeholder="Ingrese el Titulo corto"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column">
        <label for="issn" class="text-left d-block">ISSN</label>
        <div v-if="!revista.issn && !revista.eissn" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="issn"
          :disabled="isDisabled(mode, 'revista.issn')"
          v-model="revista.issn"
          placeholder="Ingrese el ISSN de su revista (Versión impresa)"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column">
        <div v-if="!revista.issn && !revista.eissn" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="eissn"
          :disabled="isDisabled(mode, 'revista.eissn')"
          v-model="revista.eissn"
          placeholder="Ingrese el ISSN electrónico de su revista"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column">
        <label for="doi" class="text-left d-block">DOI</label>
        <input
          id="doi"
          :disabled="isDisabled(mode, 'revista.doi')"
          v-model="revista.doi"
          placeholder="Ingrese el DOI de su revista - 10.xxxx"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column">
        <label for="descripcion" class="text-left d-block">Descripción de la revista</label>
        <div v-if="!revista.descripcion" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <vue-editor :disabled="isDisabled(mode, 'revista.descripcion')" v-model="revista.descripcion"></vue-editor>
      </div>

      <div class="form-group d-flex flex-column">
        <label for="fechaCreacion" class="text-left d-block">Año de creación de la revista*</label>
        <div v-if="!revista.fechaCreacion" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="fechaCreacion"
          :disabled="isDisabled(mode, 'revista.fechaCreacion')"
          v-model="revista.fechaCreacion"
          placeholder="Ingrese año creación"
          required="required"
          type="number"
          class="form-control max-width-35em"
          min="0"
        />
      </div>

      <div class="form-group d-flex flex-column">
        <label for="periodicidadId" class="text-left d-block">Ingrese la periodicidad de su revista*</label>
        <div v-if="!radicional.periodicidadId" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <div class="pl-4">
          <div
            class="d-flex inputOption"
            v-for="(p, index) in optionsForm.periodicities"
            :key="index"
          >
            <input
              name="periodicidadId"
              :disabled="isDisabled(mode, 'radicional.periodicidadId')"
              :id="`perioricidad-${index}`"
              v-model="radicional.periodicidadId"
              type="radio"
              required
              class="form-check-input"
              :value="p.id"
            />
            <label :for="`perioricidad-${index}`" v-text="p.periodicidad"></label>
          </div>
        </div>
      </div>

      <div class="form-group d-flex flex-column">
        <label
          for="periodicidadOtro"
          class="text-left d-block"
        >Ingrese la periodicidad de su revista en caso de ser diferente</label>
        <input
          id="periodicidadOtro"
          :disabled="isDisabled(mode, 'radicional.periodicidadOtro')"
          v-model="radicional.periodicidadOtro"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flex flex-column">
        <label
          for="periodicidadOtro"
          class="text-left d-block"
        >Tiempo promedio de revisión por pares (Semanas)</label>
        <input
          id="tiempoPromedioPublicacion"
          :disabled="isDisabled(mode, 'radicional.tiempoPromedioPublicacion')"
          v-model="radicional.tiempoPromedioPublicacion"
          type="number"
          class="form-control max-width-35em"
          placeholder="Ingrese el tiempo en semanas"
          min="0"
        />
      </div>

      <div class="form-group d-flex flex-column">
        <label for="imagen" class="text-left d-block">Imagen de la revista</label>
        <input
          id="imagen"
          :disabled="isDisabled(mode, 'revista.imagen')"
          v-model="revista.imagen"
          placeholder="Ingrese la url de la última caratula o logo de la revista"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
    </div>
  <!--/form-->
</template>

<script>
import mixins from "@/utilities/mixins.js"
import ErrorNotification from "@/components/ErrorNotification.vue";
import models from "@/utilities/models.js"
import { VueEditor } from "vue2-editor";

export default {
  name: "basic-data-form",
  components: {
    ErrorNotification, VueEditor
  },
  mixins: [mixins],
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
      },
      textArea: {
        editorConfig: {
            toolbar: [ 'bold', 'italic', 'link', 'numberedList', 'bulletedList' ]
        }
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
  watch: {
    /*postulationId(value) {
      if (value == 0) {
        this.revista = this.$store.getters.models.revista;
        this.radicional = this.$store.getters.models.radicional;
        return;
      }
      this.getCurrentData(value);
    }*/
  },
  methods: {
    save() {
      this.$emit('save')
    }
    /*,
    async getCurrentData(journalId) {
      let route = `Editors/${this.general.editorId}/propietarioRevista`;
      this.general.errors = [];
      await this.$store.getters.providerService
        .getModel(route, {
          where: {
            id: journalId
          },
          include: [
            {
              relation: "infoAdicional"
            }
          ]
        })
        .then(response => {
          if (response.data.length == 0) {
            this.general.errors.push("Error interno, intente mas tarde.");
            return;
          }
          let journal = response.data[0];
          journal.fechaCreacion = new Date(journal.fechaCreacion).getFullYear();
          this.revista = journal;
          this.radicional = journal.infoAdicional;
        })
        .catch(error => {
          this.general.errors.push("Error interno, intente mas tarde.");
        });
    }*/
  }
};
</script>

<style>
</style>