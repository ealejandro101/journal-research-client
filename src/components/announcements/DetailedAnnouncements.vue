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
              <div class="row">
                <div class="col-12 text-left mt-4">
                  <div class="journalActionsCardComponent">
                    <JournalActionsCard 
                      :title="revista.titulo" 
                      :image="revista.imagen" 
                      :isSubscribed="isSubscribed" 
                      @unsubscribe="$emit('unsubscribe')" 
                      @subscribe="$emit('subscribe')" 
                    />
                  </div>
                  <span class="font-weight-bold" v-text="convocatoria.titulo" /><br>
                  <span v-if="convocatoria.estadisticas">
                    <i class="fas fa-eye"></i> 
                    <span v-text="convocatoria.estadisticas.nroVisitas" />
                  </span>
                  <div class="mb-3 d-flex justify-content-left">
                    <suscription-button :isSubscribed="isSubscribed" :text="'Suscribirse a la revista'" @unsubscribe="$emit('unsubscribe')" @subscribe="$emit('subscribe')"></suscription-button>
                  </div>
                  <p class="text-secondary text-left">Fecha de inicio: {{ convocatoria.fechaInicio | datesFilter }}</p>
                  <p class="text-secondary text-left">Fecha de cierre: {{ convocatoria.fechaFinal | datesFilter }}</p>
                  <p v-text="convocatoria.descripcion" class="text-justify text-body"></p>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col mb-2 order-1 order-md-0">
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
                        <a 
                          @click="addInteraction('clicksCorreo')" 
                          @click.middle="addInteraction('clicksCorreo')" 
                          target="_blanck" 
                          :href="'mailto:'+convocatoria.radicional.correo"
                        >
                          {{convocatoria.radicional.correo}}
                        </a>
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
                        <a 
                          @click="addInteraction('descargasPdf')" 
                          @click.middle="addInteraction('descargasPdf')" 
                          class="text-white float-left" 
                          :href="convocatoria.documentoPdf" 
                          target="_blank" 
                          download>
                          <button class="btn btn-info mr-3" title="Descargar pdf"><i class="fas fa-download"></i></button>
                        </a>
                        <span v-if="convocatoria.estadisticas">
                          <i class="fas fa-long-arrow-alt-down"></i>
                          <span v-text="convocatoria.estadisticas.descargasPdf" />
                        </span>
                      </li>
                    </template>
                    <template v-if="convocatoria.radicional !== undefined && convocatoria.radicional.guiaAutores !== null && convocatoria.radicional.guiaAutores !== undefined && convocatoria.radicional.guiaAutores !== 0">
                      <li class="d-flex mb-2 justify-content-start">
                        <a 
                          @click="addInteraction('clicksGuiaAutores')" 
                          @click.middle="addInteraction('clicksGuiaAutores')" 
                          class="float-left" 
                          :href="convocatoria.radicional.guiaAutores" 
                          target="_blank"
                        >
                          <i class="fab fa-autoprefixer"></i>
                          Guía autores
                        </a>
                      </li>
                    </template>
                    <template v-if="convocatoria.radicional !== undefined && convocatoria.radicional.url !== null && convocatoria.radicional.url !== undefined && convocatoria.radicional.url !== 0">
                      <li class="d-flex mb-2 justify-content-start">
                        <a 
                          @click="addInteraction('clicksSitioweb')" 
                          @click.middle="addInteraction('clicksSitioweb')" 
                          class="float-left" 
                          :href="convocatoria.radicional.url" 
                          target="_blank"
                        >
                          <i class="fas fa-globe mr-2"></i>
                          Sitio web
                        </a>
                      </li>
                    </template>
                    <template v-if="convocatoria.link !== null && convocatoria.link !== undefined && convocatoria.link.length !== 0">
                      <li class="d-flex justify-content-start">
                        <a
                          @click="addInteraction('clicksConvocatoria')" 
                          @click.middle="addInteraction('clicksConvocatoria')" 
                          class="float-left" 
                          :href="convocatoria.link" 
                          target="_blank"
                        >
                          Ver más
                        </a>
                      </li>
                    </template>
                  </ul>
                  <div v-if="convocatoria.titulo !== undefined && convocatoria.imagen !== undefined">
                    <AddThis publicId="ra-5cf56caaa6e91bcc"/>
                    <div 
                      class="addthis_inline_share_toolbox_r5ri d-flex"
                      :data-title="convocatoria.titulo + ' en Dardo'"
                      :data-media="convocatoria.imagen.replace('http', 'https')">
                    </div>
                  </div>
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
import AddThis from '@/components/journals/view/AddThis.vue'
import SuscriptionButton from '@/components/journals/view/SuscriptionButton.vue'
import JournalActionsCard from "@/components/journals/view/detailedJournalCard/JournalActionsCard.vue"

export default {
  props: ["idConvocatoria", "isSubscribed", 'revista'],
  components: {
    AddThis, SuscriptionButton, JournalActionsCard
  },
  data() {
    return {
      convocatoria: {},
      host: process.env.ROOT_API
    };
  },
  created() {
    let _self = this
    this.$store.getters.providerService
      .getModel("Convocatoria", {
        where: {
          id: _self.idConvocatoria,
          fechaFinal: {
            gte: Date.now()
          }
        },
        include: ['radicional', 'revista', 'contacto', 'estadisticas']
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
        _self.addInteraction('nroVisitas')
        _self.$emit('loaded')
      });
  },
  mounted(){
  },
  watch: {
  },
  methods: {
    addInteraction(interaction){
      //Generador de datos para las estadisticas
      this.$store.getters.providerService.addAnnouncementInteraction(this.convocatoria.id, interaction)
    }
  },
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
.imgConvocatoria, .journalActionsCardComponent{
  max-width: 15em;
}
.journalActionsCardComponent{
  float: left;
}
@media (max-width: 768px){
  .journalActionsCardComponent{
    float: none;
    margin: auto;
  }
}
</style>