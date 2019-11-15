<template>
  <!--<form @submit.prevent="save">-->
    <div class="d-flex flex-column">
      <div v-if="general.errors.length > 0">
        <error-notification :errors="general.errors"></error-notification>
      </div>
      <div class="form-group d-flow-root">
        <label for="pais" class="text-left d-block">País *</label>
        <div v-if="!rubicacion.paisId" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <select
          @change="cambiarEstados"
          class="float-left"
          v-model="rubicacion.paisId"
          id="pais"
          :disabled="isDisabled(mode, 'rubicacion.paisId')"
          required="required"
          style="margin: 0 100vw 0.6em 0em;"
        >
          <option
            v-for="contry in optionsForm.countries"
            :key="contry.id"
            :value="contry.id"
            v-text="contry.name"
          ></option>
        </select>
      </div>
      <div class="form-group d-flow-root">
        <label for="estado" class="text-left d-block">Estado *</label>
        <div v-if="!rubicacion.estadoId" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <select
          @change="cambiarciudades"
          class="float-left"
          v-model="rubicacion.estadoId"
          :disabled="isDisabled(mode, 'rubicacion.estadoId')"
          id="estado"
          required="required"
          style="width: 17.7em; margin: 0 100vw 0.6em 0em;"
        >
          <option
            v-for="states in optionsForm.states"
            :key="states.id"
            :value="states.id"
            v-text="states.name"
          ></option>
        </select>
      </div>
      <div class="form-group d-flow-root">
        <label for="ciudadId" class="text-left d-block">Ciudad*</label>
        <div v-if="!rubicacion.ciudadId" class="isNecessary text-left small" style="color: red;">
          Es necesario llenar este campo
        </div>
        <select
          class="float-left"
          v-model="rubicacion.ciudadId"
          id="ciudadId"
          :disabled="isDisabled(mode, 'rubicacion.ciudadId')"
          required="required"
          style="width: 17.7em; margin: 0 100vw 0.6em 0em;"
        >
          <option
            v-for="cities in optionsForm.cities"
            :key="cities.id"
            :value="cities.id"
            v-text="cities.name"
          ></option>
        </select>
      </div>
      <div class="form-group d-flow-root">
        <label for="telefono" class="text-left d-block">Teléfono</label>
        <input
          id="telefono"
          :disabled="isDisabled(mode, 'rubicacion.telefono')"
          v-model="rubicacion.telefono"
          placeholder="Ingrese el telefono"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
      <div class="form-group d-flow-root">
        <label for="direccion" class="text-left d-block">Dirección</label>
        <input
          id="direccion"
          :disabled="isDisabled(mode, 'rubicacion.direccion')"
          v-model="rubicacion.direccion"
          placeholder="Ingrese la direccion"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
      <div class="form-group d-flow-root">
        <label for="zipcode" class="text-left d-block">Zipcode</label>
        <input
          id="zipcode"
          :disabled="isDisabled(mode, 'rubicacion.zipcode')"
          v-model="rubicacion.zipcode"
          placeholder="Ingrese el zipcode"
          type="text"
          class="form-control max-width-35em"
        />
      </div>
    </div>
  <!--/form-->
</template>

<script>
import ErrorNotification from "@/components/ErrorNotification.vue";
import models from "@/utilities/models.js"
import mixins from "@/utilities/mixins.js"

export default {
  name: "location-form",
  components: {
    ErrorNotification
  },
  mixins: [mixins],
  props: {
    rubicacion: {
      default(){
        return models.rubicacion
      } 
    },
    mode: {
      default: 'editor'/* editor, new journal, admin */
    }
  },
  data() {
    return {
      optionsForm: {
        countries: [],
        states: [],
        cities: [],
      },
      general: {
        editorId: localStorage.getItem("editorId"),
        errors: []
      }
    };
  },
  created() {
    this.$store.getters.providerService
      .getModel("Pais")
      .then(res => {
        this.optionsForm.countries = res.data;
        if (this.rubicacion.paisId) {
          /* 
            Si hay datos iniciales referentes al pais, se deben hacer
            los llamados a la api necesarios para obtener los paises, 
            estados y estados correspondientes.
          */
         this.$store.getters.providerService
          .getModel(`Pais/${this.rubicacion.paisId}/estados`)
          .then(res => {
            this.optionsForm.states = res.data;
            if (this.rubicacion.estadoId) {
              this.$store.getters.providerService
                .getModel(`Estados/${this.rubicacion.estadoId}/ciudades`)
                .then(res => {
                  this.optionsForm.cities = res.data;
                })
                .catch(function(err) {
                  console.log(err);
                });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  watch: {},
  methods: {
    save() {
      this.$emit('save')
    },
    cambiarEstados() {
      if (this.rubicacion.paisId == undefined || this.rubicacion.paisId == null) {
        return
      }
      this.$store.getters.providerService
        .getModel(`Pais/${this.rubicacion.paisId}/estados`)
        .then(res => {
          this.optionsForm.states = res.data;
          this.optionsForm.cities = [];
          this.rubicacion.estadoId = null;
          this.rubicacion.ciudadId = null;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    cambiarciudades() {
      if (this.rubicacion.estadoId == undefined || this.rubicacion.estadoId == null) {
        return
      }
      this.$store.getters.providerService
        .getModel(`Estados/${this.rubicacion.estadoId}/ciudades`)
        .then(res => {
          this.optionsForm.cities = res.data;
          this.rubicacion.ciudadId = null;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>