<template>
  <div class="container-fluid">
    <div class="row">
      <template v-for="(item, key) in items">
        <div v-if="item.value || item.url" :key="key" class="col-12 col-md-6 py-1 d-flex align-items-center">
          <ItemDescription 
            :icon="item.icon" 
            :label="item.label" 
            :value="item.value" 
            :type="item.type" 
            :url="item.url" 
            :attributeStatistical="item.attributeStatistical" 
            :filter="item.filter" 
            @addInteractionKey="addInteractionKey"
            @applyFilter="applyFilter"
          />
        </div>
      </template>
      <template v-if="isVisible && moreItems != null">
        <template v-for="(item, key) in moreItems">
          <div v-if="item.value || item.url" :key="key" class="col-12 col-md-6 py-1 d-flex align-items-center">
            <ItemDescription 
              :icon="item.icon" 
              :label="item.label" 
              :value="item.value" 
              :type="item.type" 
              :url="item.url" 
              :attributeStatistical="item.attributeStatistical" 
              :filter="item.filter" 
              @addInteractionKey="addInteractionKey"
              @applyFilter="applyFilter"
            />
          </div>
        </template>
      </template>
      <div class="col-12 pr-5">
        <button 
          @click="changeView"
          class="btn btn-info float-right"
        >
          {{ isVisible?'Ocultar información':'Ver más...' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ItemDescription from "@/components/journals/view/detailedJournalCard/ItemDescription";
import { log } from 'util';

export default {
  name: 'JournalInfo',
  props: {
    journalId: {
      type: Number,
      default: 0
    }
  },
  components: {
    ItemDescription
  },
  data(){
    return {
      isVisible: false,
      items: {
        tituloCorto: {
          icon: 'fas fa-font',
          label: 'Titulo Corto',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        issn: {
          icon: 'fas fa-barcode',
          label: 'ISSN',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        eissn: {
          icon: 'far fa-file',
          label: 'EISSN',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        doi: {
          icon: 'fab fa-codepen',
          label: 'DOI',
          value: '',
          type: 'value-link',
          url: '',
          attributeStatistical: 'doi',
          filter: ''
        },
        institucion: {
          icon: 'fas fa-university',
          label: 'Institución',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        facultad: {
          icon: 'fas fa-warehouse',
          label: 'Facultad',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        url: {
          icon: 'fas fa-globe',
          label: '',
          value: '',
          type: 'value-link',
          url: '',
          attributeStatistical: 'url',
          filter: ''
        }
      },
      moreItems: null,
      auxMoreItems: {
        periodicidad: {
          icon: 'fas fa-calendar-check',
          label: 'Periodicidad',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        fechaIngreso: {
          icon: 'fas fa-calendar-alt',
          label: 'Incluida desde',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        tipoRevisionPares: {
          icon: 'fas fa-check-square',
          label: 'Tipo de revisión por pares',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        estiloCitacion: {
          icon: 'fas fa-feather-alt',
          label: 'Estilo de citación',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        apc: {
          icon: 'fab fa-pied-piper',
          label: 'APC',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        preprint: {
          icon: 'fas fa-pencil-ruler',
          label: 'Preprint',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        pais: {
          icon: 'fas fa-globe-asia',
          label: 'País',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        ciudad: {
          icon: 'fas fa-city',
          label: 'Ciudad',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        direccion: {
          icon: 'fas fa-map-marked-alt',
          label: 'Dirección',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        telefono: {
          icon: 'fas fa-phone',
          label: 'Teléfono',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        correo: {
          icon: 'fas fa-at',
          label: '',
          value: '',
          type: 'value-link',
          url: '',
          attributeStatistical: 'correo',
          filter: ''
        },
        politicaAutoarchivo: {
          icon: 'fas fa-archive',
          label: 'Política de auto archivo',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        },
        facebook: {
          icon: 'fab fa-facebook-square',
          label: 'Facebook',
          value: '',
          type: 'item-link',
          url: '',
          attributeStatistical: 'facebook',
          filter: ''
        },
        instagram: {
          icon: 'fab fa-instagram',
          label: 'Instagram',
          value: '',
          type: 'item-link',
          url: '',
          attributeStatistical: 'instagram',
          filter: ''
        },
        twitter: {
          icon: 'fab fa-twitter-square',
          label: 'Twitter',
          value: '',
          type: 'item-link',
          url: '',
          attributeStatistical: 'twitter',
          filter: ''
        },
        guiaAutores: {
          icon: 'fab fa-autoprefixer',
          label: 'Guía de autores',
          value: '',
          type: 'item-link',
          url: '',
          attributeStatistical: 'guiaAutores',
          filter: ''
        },
        tiempoPromedioPublicacion: {
          icon: 'fas fa-clock',
          label: 'Tiempo promedio de publicación (evaluación)',
          value: '',
          type: '',
          url: '',
          attributeStatistical: '',
          filter: ''
        }
      }
    }
  },
  created(){
    this.$store.getters.providerService.getModel(`Revista/${this.journalId}`, {
      fields: ['id', 'doi', 'eissn', 'issn', 'tituloCorto'],
      include: [{
        relation: 'contacto',
        scope: {
          fields: ['id', 'institucion', 'facultad']
        }
      }, {
        relation: 'infoAdicional',
        scope: {
          fields: ['id', 'url']
        }
      }]
    }).then(res => {
      this.items.tituloCorto.value = res.data.tituloCorto
      this.items.issn.value = res.data.issn
      this.items.eissn.value = res.data.eissn
      this.items.doi.value = res.data.doi?'https://doi.org/'+res.data.doi:null
      this.items.doi.url = res.data.doi?'https://doi.org/'+res.data.doi:null
      this.items.institucion.value = res.data.contacto.institucion
      this.items.institucion.filter = 'institucion'+encodeURIComponent(res.data.contacto.institucion)
      this.items.facultad.value = res.data.contacto.facultad
      this.items.url.value = res.data.infoAdicional.url?'sitio web':null
      this.items.url.url = res.data.infoAdicional.url
    }).catch(err => {

    })
  },
  methods: {
    changeView(){
      this.isVisible = !this.isVisible
      if (this.moreItems == null) {
        this.$store.getters.providerService.getModel(`Revista/${this.journalId}`, {
          fields: ['id', 'fechaIngreso'],
          include: [
            {
              relation: 'contacto',
              scope: {
                fields: ['id', 'editor', 'editorGooglescholar', 'editorOrcid']
              }
            }, 
            {
              relation: 'infoAdicional',
              scope: {
                include: [
                  {
                    relation: 'periodicidad'
                  },
                  {
                    relation: 'tiporevisionporpares'
                  },
                  {
                    relation: 'politicaautoarchivo'
                  },
                  {
                    relation: 'estilocitacion'
                  }
                ]
              }
            },
            {
              relation: 'idiomas'
            },
            {
              relation: 'ubicacion',
              scope: {
                include: [
                  {
                    relation: 'ciudad',
                    scope: {
                      include: [
                        {
                          relation: 'estado',
                          scope: {
                            include: [
                              {
                                relation: 'pais'
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }).then(res => {
          this.moreItems =  this.auxMoreItems
          //Periodicidad
          if(res.data.infoAdicional.periodicidadOtro){
            this.moreItems.periodicidad.value = res.data.infoAdicional.periodicidadOtro
          }else if (res.data.infoAdicional.periodicidadId) {
            this.moreItems.periodicidad.value = res.data.infoAdicional.periodicidad.periodicidad
          }
          //Fecha de creacion
          let auxDate = res.data.fechaIngreso.split("-");
          if (auxDate.length == 3) {
            this.moreItems.fechaIngreso.value = auxDate[0]+"/"+auxDate[1]+"/"+auxDate[2].substring(0,2)
          }
          //Tipo de revision por pares
          if (res.data.infoAdicional.tipoRevisionParesId) {
            this.moreItems.tipoRevisionPares.value = res.data.infoAdicional.tiporevisionporpares.tipoRevisionPares
          }
          if (res.data.infoAdicional.politicaAutoarchivoId) {
            this.moreItems.politicaAutoarchivo.value = res.data.infoAdicional.politicaautoarchivo.politicaAutoarchivo
          }
          if (res.data.infoAdicional.estiloCitacionId) {
            this.moreItems.estiloCitacion.value = res.data.infoAdicional.estilocitacion.estiloCitacion
          }
          this.moreItems.apc.value = res.data.infoAdicional.apc == 0?'No':'Si'
          this.moreItems.preprint.value = res.data.infoAdicional.preprint == 0?'No':'Si'
          this.moreItems.pais.value = res.data.ubicacion.ciudad.estado.pais.name
          this.moreItems.pais.filter = 'pais='+res.data.ubicacion.ciudad.estado.pais.id
          this.moreItems.ciudad.value = res.data.ubicacion.ciudad.name
          this.moreItems.ciudad.filter = 'ciudad='+res.data.ubicacion.ciudad.id
          this.moreItems.direccion.value = res.data.ubicacion.direccion
          this.moreItems.telefono.value = res.data.ubicacion.telefono
          this.moreItems.correo.value = res.data.infoAdicional.correo
          this.moreItems.correo.url = `mailto:res.data.infoAdicional.correo`
          this.moreItems.facebook.url = res.data.infoAdicional.facebook
          this.moreItems.instagram.url = res.data.infoAdicional.instagram
          this.moreItems.twitter.url = res.data.infoAdicional.twitter
          this.moreItems.guiaAutores.url = res.data.infoAdicional.guiaAutores
          this.moreItems.tiempoPromedioPublicacion.value = res.data.infoAdicional.tiempoPromedioPublicacion?res.data.infoAdicional.tiempoPromedioPublicacion + ' semanas':null
        })
      }
    },
    addInteractionKey(interactionKey){
      //Generador de datos para las estadisticas
      if(interactionKey){
        this.$emit('addInteractionKey', interactionKey)
      }
    },
    applyFilter(filter){
      if(filter){
        this.$emit('applyFilter', filter)
      }
    }
  }
}
</script>

<style>

</style>