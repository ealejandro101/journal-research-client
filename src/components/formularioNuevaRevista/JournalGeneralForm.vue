<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <b-card>
          <b-tabs v-model="tabIndex" small card>
            <b-tab title="Revista">
              <div class="container-fluid">
                <div class="row justify-content-center">
                  <div class="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7">
                    <basic-data-form
                      @save="save"
                      :mode="mode"
                      :revista="revista"
                      :radicional="radicional"
                    ></basic-data-form>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab title="Contacto">
              <div class="container-fluid">
                <div class="row justify-content-center">
                  <div class="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7">
                    <contact-form
                      @save="save"
                      :mode="mode"
                      :rcontactos="rcontactos"
                      :radicional="radicional"
                    ></contact-form>
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab title="Información de la revista">
              <div class="d-flex justify-content-center">
                <div class="w-75 p-3 align-items-center">
                  <category-form
                    @save="save"
                    :mode="mode"
                    :revista="revista"
                    :radicional="radicional"
                    :rindexaciones="optionsForm.rindexaciones"
                    :ridiomas="optionsForm.ridiomas"
                    :revistascategorias="optionsForm.revistascategorias"
                    :rpalabraclave="optionsForm.rpalabrasclaves"
                  ></category-form>
                </div>
              </div>
            </b-tab>
            <b-tab title="Ubicación">
              <div class="d-flex justify-content-center">
                <div class="w-75 p-3 align-items-center">
                  <location-form @save="save" :mode="mode" :rubicacion="rubicacion"></location-form>
                </div>
              </div>
            </b-tab>
            <b-tab title="Política editorial">
              <div class="d-flex justify-content-center">
                <div class="w-75 p-3 align-items-center">
                  <additional-form @save="save" :mode="mode" :radicional="radicional"></additional-form>
                </div>
              </div>
            </b-tab>
          </b-tabs>
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <button @click="tabIndex = (tabIndex - 1) % 6" class="btn btn-info">Anterior</button>
                <button @click="tabIndex = (tabIndex + 1) % 6" class="btn btn-info">Siguiente</button>
                <button @click="save" class="btn btn-success">Enviar</button>
              </div>
            </div>
          </div>
        </b-card>
      </div>
      <div class="col-12">
        <div v-if="optionsForm.errors.length > 0" class="mt-2">
          <error-notification :errors="optionsForm.errors"></error-notification>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicDataForm from "@/components/formularioNuevaRevista/BasicDataForm.vue";
import ContactForm from "@/components/formularioNuevaRevista/ContactForm.vue";
import AdditionalForm  from "@/components/formularioNuevaRevista/AdditionalForm.vue";
import CategoryForm from "@/components/formularioNuevaRevista/CategoryForm.vue";
import LocationForm from "@/components/formularioNuevaRevista/LocationForm.vue";
import models from '@/utilities/models.js'

export default {
    name: 'journal-general-form',
    components: {
        BasicDataForm,
        ContactForm,
        AdditionalForm,
        CategoryForm,
        LocationForm
    },
    props: {
      /* Data */
        revista: {
            default: () => JSON.parse(JSON.stringify(models.revista)),
        },
        radicional: {
            default: () => JSON.parse(JSON.stringify(models.radicional)),
        },
        rcontactos: {
            default: () => JSON.parse(JSON.stringify(models.rcontactos)),
        },
        ridiomas: {
            default: () => JSON.parse(JSON.stringify(models.ridiomas)),
        },
        rindexaciones: {
            default: () => JSON.parse(JSON.stringify(models.rindexaciones)),
        },
        rubicacion: {
            default: () => JSON.parse(JSON.stringify(models.rubicacion)),
        },
        revistascategorias: {
            default: () => JSON.parse(JSON.stringify(models.revistascategorias)),
        },
        rpalabraclave: {
            default: () => JSON.parse(JSON.stringify(models.rpalabraclave))
        },
        /* Config */
        mode: {
          default: 'editor'/* editor, new journal, admin */
        }
    },
    data(){
        return {
            tabIndex: 0,
            optionsForm: {
              errors: [],
              rindexaciones: {
                "indexaciones": [],
                "parameter-1": null,
                "parameter-2": null,
                "parameter-3": null,
                "parameter-4": null,
                "parameter-5": null,
                "parameter-6": null,
                "parameter-7": null,
              },
              revistascategorias: {
                "categories": []
              },
              ridiomas: {
                "idiomas": []
              },
              rpalabrasclaves: {
                "palabrasclave": "",
              }
            }
        }
    },
    created(){
      if (this.revista.fechaCreacion != null) {
        let auxCreationDate = new Date(this.revista.fechaCreacion)
        this.revista.fechaCreacion = auxCreationDate.getFullYear()
      }
      if (Array.isArray(this.revistascategorias)) {
        for (const iterator of this.revistascategorias) {
          this.optionsForm.revistascategorias.categories.push(iterator.id)
        }
      }
      if (Array.isArray(this.ridiomas)) {
        for (const iterator of this.ridiomas) {
          this.optionsForm.ridiomas.idiomas.push(iterator.id)
        }
      }
      if (Array.isArray(this.rindexaciones)) {
        for (const iterator of this.rindexaciones) {
          this.optionsForm.rindexaciones.indexaciones.push(iterator.indexacionesId)
          this.optionsForm.rindexaciones[`parameter-${iterator.indexacionesId}`] = iterator.parametro
        }
      }
      if (Array.isArray(this.rpalabraclave)) {
        for (const iterator of this.rpalabraclave) {
          if (this.optionsForm.rpalabrasclaves.palabrasclave == '') {
            this.optionsForm.rpalabrasclaves.palabrasclave = iterator.palabraClave
          }else{
            this.optionsForm.rpalabrasclaves.palabrasclave += `;${iterator.palabraClave}`
          }
        }
      }
    },
    methods: {
      save(){
        let models = {
          revista: this.revista,
          radicional: this.radicional,
          rcontactos: this.rcontactos,
          ridiomas: this.optionsForm.ridiomas,
          rindexaciones: this.optionsForm.rindexaciones,
          rubicacion: this.rubicacion,
          revistascategorias: this.optionsForm.revistascategorias,
          rpalabraclave: this.optionsForm.rpalabrasclaves,
        }
        this.$emit('save', models)//retornar los modelos para poder hacer uso de lo modificado en created()
      }
    }
}
</script>

<style>
</style>