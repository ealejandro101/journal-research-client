<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-7">
        <div class="form-group d-flex flex-column">
          <span class="font-weight-bolder text-left">Convocatorias:</span>
          <select required class="mw-100" v-model="cfp" @change="changeCfp">
            <option
              v-for="(item, index) in cfps"
              :key="index"
              :value="item"
            >{{ item.titulo }}</option>
          </select>
        </div>
        <div>
          <form v-on:submit.prevent="cfpApproval">
            <input class="btn-success" type="submit" value="Aprobar">
          </form>
        </div>
        <div v-if="cfp.revista" class="form-group d-flex flex-column">
          <label for="revista" class="text-left d-block">Revista</label>
          <input
            id="revista"
            v-model="cfp.revista.titulo"
            required="required"
            type="text"
            class="form-control"
            disabled
          />
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
            disabled
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
            disabled
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
            disabled
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
            disabled
          />
        </div>
        <div v-if="cfp.imagen" class="form-group d-flex flex-column">
          <label for="imagen" class="text-left d-block">Imagen</label>
          <a :href="imageRoute">{{imageRoute}}</a> 
        </div>
        <div class="form-group d-flex flex-column">
          <label for="video" class="text-left d-block">Vídeo</label>
          <input id="video" v-model="cfp.video" placeholder="Ingrese el video" type="text" class="form-control" disabled />
        </div>
        <div v-if="cfp.documentoPdf" class="form-group d-flex flex-column">
          <label for="documentoPdf" class="text-left d-block">Documento PDF</label>
          <a :href="docRoute">{{docRoute}}</a>
        </div>
        <div class="form-group d-flex flex-column">
          <label for="ojs" class="text-left d-block">OJS</label>
          <!---->
          <input id="ojs" v-model="cfp.link" placeholder="Ingrese el OJS" type="text" class="form-control" disabled/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <loading-dardo v-if="isLoading"></loading-dardo>
      </div>
    </div>
  </div>
</template>

<script>
import models from "@/utilities/models.js";
import mixins from "@/utilities/mixins.js";
import LoadingDardo from "@/components/generals/LoadingDardo.vue"

export default {
  name: "cfp-approval",
  mixins: [mixins],
  components: {
    LoadingDardo
  },
  props: {
  },
  data() {
    return {
      cfp: JSON.parse(JSON.stringify(models.cfp)),
      cfps: [],
      hostApi: '',
      isLoading: false
    };
  },
  created() {
    this.hostApi = this.$store.getters.providerService.getHostApi()
    
    this.$store.getters.providerService
      .getModel(`Convocatoria`, {
        where: {
          estado: 0
        },
        include: ['revista']
      }).then(response => {
        this.cfps = response.data
      })
  },
  computed: {
    imageRoute(){
      return this.getRouteResource(this.hostApi, this.cfp.imagen)
    },
    docRoute(){
      return this.getRouteResource(this.hostApi, this.cfp.documentoPdf)
    }
  },
  methods: {
    cfpApproval(){
      this.isLoading = true
      this.$store.getters.providerService.patchModel(`Convocatoria/${this.cfp.id}`, {
        "estado": 1
      }).then(response => {
        alert('Aprobación exitosa.')
        this.cfp = JSON.parse(JSON.stringify(models.cfp))
        this.$store.getters.providerService
          .getModel(`Convocatoria`, {
            where: {
              estado: 0
            },
            include: ['revista']
          }).then(response => {
            this.cfps = response.data
            this.isLoading = false
          }).catch(()=>{
            this.isLoading = false
          })
      }).catch(() => {
        this.isLoading = false
      })
    },
    changeCfp(){
      this.cfp.fechaFinal = this.formatDate(this.cfp.fechaFinal)
      this.cfp.fechaInicio = this.formatDate(this.cfp.fechaInicio)
    },
    getRouteResource(rootApi, routeAux){
      let host = rootApi.replace('/api', '')
      let route = routeAux.replace('convocatoriaId', this.cfp.id)
      return host + route
    }
  }
};
</script>

<style>
</style>