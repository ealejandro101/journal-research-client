<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 align-self-center">
        <span>Revista:</span>
        <select class="mw-100" v-model="currentJournalIndex">
          <option
            v-for="(journal, index) in journals"
            :key="index"
            :value="journal.id"
          >{{ journal.titulo }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form>
          <div class="form-group d-flex flex-column">
            <label for="titulo" class="text-left d-block">Titulo</label>
            <div v-if="!cfp.titulo" class="text-left small" style="color: red;">Es necesario llenar este campo</div>
            <input
              id="titulo"
              v-model="cfp.titulo"
              placeholder="Ingrese el titulo"
              required="required"
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-group d-flex flex-column">
            <label for="descripcion" class="text-left d-block">Descripcion</label>
            <div v-if="!cfp.descripcion" class="text-left small" style="color: red;">Es necesario llenar este campo</div>
            <input
              id="descripcion"
              v-model="cfp.descripcion"
              placeholder="Ingrese el nombre de la descripcion"
              required="required"
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-group d-flex flex-column">
            <label for="fechaInicio" class="text-left d-block">Fecha de inicio</label>
            <div v-if="!cfp.fechaInicio" class="text-left small" style="color: red;">Es necesario llenar este campo</div>
            <input
              id="fechaInicio"
              v-model="cfp.fechaInicio"
              placeholder="Ingrese la fecha de inicio"
              required="required"
              type="date"
              class="form-control"
            />
          </div>
          <div class="form-group d-flex flex-column">
            <label for="fechaFinal" class="text-left d-block">Fecha de cierre</label>
            <div v-if="!cfp.fechaFinal" class="text-left small" style="color: red;">Es necesario llenar este campo</div>
            <input
              id="fechaFinal"
              v-model="cfp.fechaFinal"
              placeholder="Ingrese la fecha de cierre"
              min="2019-11-21"
              required="required"
              type="date"
              class="form-control"
            />
          </div>
          <div class="form-group d-flex flex-column">
            <label for="imagen" class="text-left d-block">Imagen</label>
            <input type="file" id="imagen" placeholder="Ingrese la imagen" class="form-control" />
          </div>
          <div class="form-group d-flex flex-column">
            <label for="video" class="text-left d-block">Vídeo</label>
            <input id="video" v-model="cfp.video" placeholder="Ingrese el video" type="text" class="form-control" />
          </div>
          <div class="form-group d-flex flex-column">
            <label for="documentoPdf" class="text-left d-block">Documento PDF</label>
            <input
              type="file"
              :ref="cfp.documentoPdf"
              id="documentoPdf"
              placeholder="Ingrese el documento PDF"
              class="form-control"
            />
          </div>
          <div class="form-group d-flex flex-column">
            <label for="ojs" class="text-left d-block">OJS</label>
            <!---->
            <input id="ojs" v-model="cfp.link" placeholder="Ingrese el OJS" type="text" class="form-control" />
          </div>
          <!---->
          <input type="submit" class="btn btn-secondary" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import models from "@/utilities/models.js";

export default {
  name: "cfp-add",
  props: {
    editor: {
      default: undefined
    }
  },
  data() {
    return {
      cfp: models.cfp,
      currentJournalIndex: null,
      journals: []
    };
  },
  created() {
    if (!this.editor.id) {
      return
    }
    this.$store.getters.providerService
      .getModel(`Editors/${this.editor.id}/propietarioRevista`, {
        include: ['infoAdicional','contacto', 'idiomas', 'indexaciones', 'categorias', {
          relation: 'ubicacion', 
          scope: { 
            include: { 
              relation: 'ciudad',
              scope: { 
                include: { 
                  relation: 'estado',
                  scope: { 
                    include: { 
                      relation: 'pais'
                    } 
                  }
                } 
              }
            } 
          }
        }]
      }).then(response => {
        this.journals = response.data
        this.currentJournalIndex = null
      })
  },
  methods: {
    addCfp(){
      
    }
  }
};
</script>

<style>
</style>