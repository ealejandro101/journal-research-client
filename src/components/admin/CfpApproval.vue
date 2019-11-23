<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-7">
        <form v-on:submit.prevent="addCfp">
          <div class="form-group d-flex flex-column">
            <span class="font-weight-bolder text-left">Convocatorias:</span>
            <select required class="mw-100" v-model="cfp">
              <option
                v-for="(item, index) in cfps"
                :key="index"
                :value="item"
              >{{ item.titulo }}</option>
            </select>
          </div>
          <div>
            <span class="font-weight-bolder text-left">Información de la convocatoria</span>
          </div>
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
            <input 
              type="file" 
              id="imagen" 
              ref="imagen"
              @change="changeInputFile('imagen')"
              placeholder="Ingrese la imagen" 
              class="form-control" />
          </div>
          <div class="form-group d-flex flex-column">
            <label for="video" class="text-left d-block">Vídeo</label>
            <input id="video" v-model="cfp.video" placeholder="Ingrese el video" type="text" class="form-control" />
          </div>
          <div class="form-group d-flex flex-column">
            <label for="documentoPdf" class="text-left d-block">Documento PDF</label>
            <input
              type="file"
              ref="documentoPdf"
              @change="changeInputFile('documentoPdf')"
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
          <input type="submit" class="btn btn-success" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import models from "@/utilities/models.js";
import mixins from "@/utilities/mixins.js"

export default {
  name: "cfp-approval",
  mixins: [mixins],
  data() {
    return {
      cfp: JSON.parse(JSON.stringify(models.cfp)),
      cfps: []
    };
  },
  created() {
    if (!this.editor.id) {
      return
    }
    this.$store.getters.providerService
      .getModel(`Convocatoria`, {
        where: {
          estado: 0
        } 
      }).then(response => {
        this.cfps = response.data
        console.log(response);
        
      })
  },
  methods: {
    cfpApproval(){
      
    }
  }
};
</script>

<style>
</style>