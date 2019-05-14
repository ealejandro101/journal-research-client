<template>
  <div>
    <div class="container-fluid">
      <div v-for="(convocatoria, index) in convocatorias" :key="index" class="row">
        <div class="col-12">
          <div v-if="convocatoria === undefined || convocatoria.length === 0">
            <p class="my-5">Actualmente esta revista no cuenta con convocatoria</p>
          </div>
          <div v-else>
            <div class="container-fluid">
              <div class="row mb-1">
                <div class="col-12 text-left mt-4 font-weight-bold">
                  <p v-text="convocatoria.titulo"></p>
                </div>
                <div class="col-12">
                  <table class="p-3 mb-2">
                    <td>
                      <p class="text-secondary text-left">Convocatoria activa entre: {{ convocatoria | datesFilter }}</p>
                    </td>
                  </table>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col mb-2 order-1 order-md-0">
                  <p v-text="convocatoria.descripcion" class="text-justify text-body"></p>
                </div>
                <div v-if="convocatoria.imagen !== null && convocatoria.imagen !== undefined && convocatoria.imagen.length !== 0"
                      class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 d-flex justify-content-center mb-4 order-0 order-md-1">
                    <div class="imgConvocatoria">
                      <img :src="host+'../'+convocatoria.imagen.replace('convocatoriaId', convocatoria.id)" alt="img">
                    </div>
                </div>
              </div>
              <div class="row">
                <div class="col d-flex justify-content-center mb-4">
                  <iframe 
                    v-if="convocatoria.video !== null && convocatoria.video !== undefined && convocatoria.video.length !== 0"
                    width="560" 
                    height="315" 
                    :src="convocatoria.video" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
                </div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-4">
                  <div class="col-12 d-flex justify-content-center mb-2">
                    <a v-if="convocatoria.documentoPdf !== null && convocatoria.documentoPdf !== undefined && convocatoria.video.length !== 0"
                        class="text-white" :href="host+'../'+convocatoria.documentoPdf.replace('convocatoriaId', convocatoria.id)" target="_blank" download>
                      <button class="btn btn-info mr-3" title="Descargar pdf">Descargar documento PDF</button>
                    </a>
                    <a v-if="convocatoria.ojs !== null && convocatoria.ojs !== undefined && convocatoria.ojs.length !== 0"
                        class="text-white" :href="convocatoria.ojs" target="_blank">
                      <button class="btn btn-warning" title="link">OJS</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProviderService from "@/providerServices/providerServices.js";

export default {
  props: ["idJournal"],
  data() {
    return {
      convocatorias: [],
      host: process.env.ROOT_API
    };
  },
  created() {
    let providerService = new ProviderService(process.env.ROOT_API);
    providerService
      .getModel("Convocatoria", {
        where: {
          revistaId: this.idJournal,
          fechaFinal: {
            gte: Date.now()
          }
        }
      })
      .then(response => {
        this.convocatorias = response.data;
        console.log(this.convocatorias);
        
      });
  },
  methods: {},
  filters: {
    datesFilter(value) {
      let fechaInicial = new Date(value.fechaInicio);
      let fechaFinal = new Date(value.fechaFinal);
      return (
        fechaInicial.getDay() +
        "/" +
        fechaInicial.getMonth() +
        "/" +
        fechaInicial.getFullYear() +
        " - " +
        fechaFinal.getDay() +
        "/" +
        fechaFinal.getMonth() +
        "/" +
        fechaFinal.getFullYear()
      );
    }
  }
};
</script>

<style scoped>
.imgConvocatoria{
  max-width: 15em;
}
</style>