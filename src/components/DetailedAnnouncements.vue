<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="convocatoria === undefined">
            <p class="my-5">Actualmente esta revista no cuenta con convocatoria</p>
          </div>
          <div v-else>
            <div class="container-fluid">
              <div class="row mb-1">
                <div class="col-12 text-left mt-4 font-weight-bold">
                  <p v-text="convocatoria.titulo"></p>
                </div>
                <div class="col-12">
                  <p class="text-secondary text-left">Fecha de inicio: {{ convocatoria.fechaInicio | datesFilter }}</p>
                  <p class="text-secondary text-left">Fecha de cierre: {{ convocatoria.fechaFinal | datesFilter }}</p>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col mb-2 order-1 order-md-0">
                  <p v-text="convocatoria.descripcion" class="text-justify text-body"></p>
                  <p
                    class="text-left"
                  >Para obtener más información, no dude en ponerse en contacto con:</p>
                  <ul>
                    <template v-if="convocatoria.contacto !== undefined && convocatoria.contacto.editor && convocatoria.contacto.editor !== 0">
                      <li class="d-flex mb-2 justify-content-start">
                        <i class="fas fa-user-edit mr-2"></i>
                        {{convocatoria.contacto.editor}}
                      </li>
                    </template>
                    <template v-if="convocatoria.radicional !== undefined && convocatoria.radicional.correo !== null && convocatoria.radicional.correo !== undefined && convocatoria.radicional.correo !== 0">
                      <li class="d-flex mb-2 justify-content-start">
                        <i class="fas fa-at mr-2"></i>
                        {{convocatoria.radicional.correo}}
                      </li>
                    </template>
                  </ul>
                  <p
                    class="text-left"
                  >Para consultar la guía para autores y detalles de esta convocatoria visite:</p>
                  <ul>
                    <template v-if="convocatoria.documentoPdf !== null && convocatoria.documentoPdf !== undefined && convocatoria.documentoPdf.length !== 0">
                      <li class="d-flex justify-content-start mb-2 align-items-center">
                        <span class="mr-1">Documento PDF:</span>
                        <a class="text-white float-left" :href="convocatoria.documentoPdf" target="_blank" download>
                          <button class="btn btn-info mr-3" title="Descargar pdf"><i class="fas fa-download"></i></button>
                        </a>
                      </li>
                    </template>
                    <template v-if="convocatoria.radicional !== undefined && convocatoria.radicional.guiaAutores !== null && convocatoria.radicional.guiaAutores !== undefined && convocatoria.radicional.guiaAutores !== 0">
                      <li class="d-flex mb-2 justify-content-start">
                        <a class="float-left" :href="convocatoria.radicional.guiaAutores" target="_blank">
                          <i class="fab fa-autoprefixer"></i>
                          Guía autores
                        </a>
                      </li>
                    </template>
                    <template v-if="convocatoria.radicional !== undefined && convocatoria.radicional.url !== null && convocatoria.radicional.url !== undefined && convocatoria.radicional.url !== 0">
                      <li class="d-flex mb-2 justify-content-start">
                        <a class="float-left" :href="convocatoria.radicional.url" target="_blank">
                          <i class="fas fa-globe mr-2"></i>
                          Sitio web
                        </a>
                      </li>
                    </template>
                    <template v-if="convocatoria.link !== null && convocatoria.link !== undefined && convocatoria.link.length !== 0">
                      <li class="d-flex justify-content-start">
                        <a class="float-left" :href="convocatoria.link" target="_blank">Ver más</a>
                      </li>
                    </template>
                  </ul>
                </div>
                <div class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 d-flex justify-content-center mb-4 order-0 order-md-1">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col">
                        <div class="imgConvocatoria">
                          <img :src="convocatoria.imagen" alt="img">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div>
                          <a :href="convocatoria.imagen" target="_blank" download>Ampliar</a>
                        </div>
                      </div>
                    </div>
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
                    allowfullscreen
                  ></iframe>
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
  props: ["idConvocatoria"],
  data() {
    return {
      convocatoria: {},
      host: process.env.ROOT_API
    };
  },
  created() {
    let providerService = new ProviderService(process.env.ROOT_API);
    let _self = this
    providerService
      .getModel("Convocatoria", {
        where: {
          id: _self.idConvocatoria,
          fechaFinal: {
            gte: Date.now()
          }
        },
        include: ['radicional', 'revista', 'contacto']
      })
      .then(response => {
        _self.convocatoria = response.data[0];
        if (_self.convocatoria.imagen !== null && _self.convocatoria.imagen !== undefined && _self.convocatoria.imagen.length !== 0) {
          _self.convocatoria.imagen = this.host+'../'+_self.convocatoria.imagen.replace('convocatoriaId', _self.convocatoria.id)
        }else{
          _self.convocatoria.imagen = _self.convocatoria.revista.imagen
        }
        if (_self.convocatoria.documentoPdf !== null && _self.convocatoria.documentoPdf !== undefined && _self.convocatoria.documentoPdf.length !== 0) {
          _self.convocatoria.documentoPdf = this.host+'../'+_self.convocatoria.documentoPdf.replace('convocatoriaId', _self.convocatoria.id)
        }
        _self.$emit('loaded')
      });
  },
  watch: {
  },
  methods: {},
  filters: {
    datesFilter(value) {
      if (value === undefined) {
        return ''
      }
      return value.split('T')[0]
    }
  }
};
</script>

<style scoped>
.imgConvocatoria {
  max-width: 15em;
}
</style>