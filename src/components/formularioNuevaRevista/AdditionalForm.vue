<template>
  <!--<form @submit.prevent="save">-->
    <div class="d-flex flex-column">
      <div v-if="general.errors.length > 0">
        <error-notification :errors="general.errors"></error-notification>
      </div>
      <div class="form-group d-flow-root">
        <label for="politicaAutoarchivoId" class="text-left d-block">Política de Autoarchivo*</label>
        <div v-if="!radicional.politicaAutoarchivoId" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <div class="pl-4">
          <div class="d-flex inputOption" v-for="(policy, index) in optionsForm.politics" :key="policy.id">
            <input
              name="politicaAutoarchivoId"
              :id="`politica-${index}`"
              type="radio"
              v-model="radicional.politicaAutoarchivoId"
              class="form-check-input"
              :value="policy.id"
            />
            <label :for="`politica-${index}`" v-text="policy.politicaAutoarchivo"></label>
          </div>
        </div>
      </div>

      <div class="form-group d-flow-root">
        <label for="oai" class="text-left d-block">OAI-PMH*</label>
        <div v-if="!radicional.oai" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="oai"
          v-model="radicional.oai"
          placeholder="Ingrese la ulr del OAI de la revista"
          required="required"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flow-root">
        <label for="estiloCitacionId" class="text-left d-block">Estilo de citación*</label>
        <div v-if="!radicional.estiloCitacionId" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <div class="pl-4">
          <div
            class="d-flex inputOption"
            v-for="(citationStyle, index) in optionsForm.citationStyles"
            :key="citationStyle.id"
          >
            <input
              name="estiloCitacionId"
              :id="`estCita-${index}`"
              v-model="radicional.estiloCitacionId"
              type="radio"
              class="form-check-input"
              :value="citationStyle.id"
            />
            <label :for="`estCita-${index}`" v-text="citationStyle.estiloCitacion"></label>
          </div>
        </div>
      </div>
      <div class="form-group d-flow-root">
        <label for="codigoEtica" class="text-left d-block">Código de ética*</label>
        <div v-if="!radicional.codigoEtica" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="codigoEtica"
          v-model="radicional.codigoEtica"
          placeholder="Ingrese url donde se encuentra el código de la revista"
          required="required"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flow-root">
        <label for="guiaAutores" class="text-left d-block">Guía para autores*</label>
        <div v-if="!radicional.guiaAutores" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="guiaAutores"
          v-model="radicional.guiaAutores"
          placeholder="Ingrese la url de la guía para autores"
          required="required"
          type="text"
          class="form-control max-width-35em"
        />
      </div>

      <div class="form-group d-flow-root">
        <label for="tipoRevisionParesId" class="text-left d-block">Tipo de revisión por pares *</label>
        <div v-if="!radicional.tipoRevisionParesId" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <div class="pl-4">
          <div class="d-flex inputOption" v-for="(type, index) in optionsForm.typeReviewPeer" :key="type.id">
            <input
              name="tipoRevisionParesId"
              :id="`revision-${index}`"
              v-model="radicional.tipoRevisionParesId"
              type="radio"
              class="form-check-input"
              :value="type.id"
            />
            <label :for="`revision-${index}`" v-text="type.tipoRevisionPares"></label>
          </div>
        </div>
      </div>

      <div class="form-group d-flow-root">
        <label for="equipoEditorial" class="text-left d-block">Equipo editorial*</label>
        <div v-if="!radicional.equipoEditorial" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <input
          id="equipoEditorial"
          v-model="radicional.equipoEditorial"
          placeholder="Ingrese la url donde se encuentra el equipo editorial de la revista"
          required="required"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
      <div class="form-group d-flow-root">
        <label for="apc" class="text-left d-block">APC</label>
        <div v-if="!radicional.apc" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <select
          class="float-left"
          id="apc"
          v-model="radicional.apc"
          required="required"
          style="margin: 0 100vw 0.6em 0em;"
        >
          <option value="1">Si</option>
          <option value="0">No</option>
        </select>
      </div>
      <div class="form-group d-flow-root">
        <label for="preprint" class="text-left d-block">Su revista acepta PrePrint?</label>
        <div v-if="!radicional.preprint" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <select
          class="float-left"
          id="preprint"
          v-model="radicional.preprint"
          required="required"
          style="margin: 0 100vw 0.6em 0em;"
        >
          <option value="1">Si</option>
          <option value="0">No</option>
        </select>
      </div>
      <div class="form-group d-flow-root">
        <label for="facebook" class="text-left d-block">Facebook</label>
        <input
          id="facebook"
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
          v-model="radicional.videopresentacion"
          placeholder="Ingresa en enlace (Youtube, Vimeo) del video promocional de su revista (en caso de tenerlo)"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
    </div>
  <!--</form>-->
</template>

<script>
import ErrorNotification from "@/components/ErrorNotification.vue";
import models from "@/utilities/models.js"

export default {
  name: "additional-form",
  components: {
    ErrorNotification
  },
  props: {
    radicional: {
      default(){
        return models.radicional
      } 
    }
  },
  data() {
    return {
      optionsForm: {
        politics: [],
        citationStyles: [],
        typeReviewPeer: []
      },
      general: {
        editorId: localStorage.getItem("editorId"),
        errors: []
      }
    };
  },
  created() {
    this.$store.getters.providerService
      .getModel("Politicaautoarchivos")
      .then(res => {
        this.optionsForm.politics = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    this.$store.getters.providerService
      .getModel("Estilocitacions")
      .then(res => {
        this.optionsForm.citationStyles = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    this.$store.getters.providerService
      .getModel("Tiporevisionpares")
      .then(res => {
        this.optionsForm.typeReviewPeer = res.data;
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