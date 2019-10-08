<template>
  <div>
    <b-card class="d-flex" style="background-color: transparent;">
      <b-row>      
        <b-col sm="12" md="12" lg="12">
          <p class="card-text text-left"><strong v-text="revista.titulo"></strong></p>
          <div class="mb-3 d-flex justify-content-left">
            <suscription-button :isSubscribed="isSubscribed" :text="'Suscribirse a la revista'" @unsubscribe="$emit('unsubscribe')" @subscribe="$emit('subscribe')"></suscription-button>
          </div>
          <div class="float-left mr-4">
            <div class="divSummaryImg">
              <b-img   class="imagenCard" fluid center :src="revista.imagen" />
            </div>
            <div v-if="revista.imagen !== undefined && revista.titulo !== undefined">
              <AddThis 
                publicId="ra-5cf56caaa6e91bcc"
              />
              <div 
                class="addthis_inline_share_toolbox_r5ri d-flex" 
                :data-title="revista.titulo + ' en Dardo'"
                :data-media="imageToShare">
              </div>
            </div>
          </div>
          <div class="container-fluid">
              <div class="row mb-5">
                <b-col v-if="categorias.length > 0" align-self="start">
                    <div v-for="categoria in categorias " :key="categoria.nombre" class="float-left ml-1 mr-1">                
                          <b-badge @click="pushViewJournalCategory(categoria.id)" href="#" variant="light">
                          <b-img rounded="circle" class="iconos" :src="iconosCategorias[categoria.nombre]" />
                          {{categoria.nombre}}
                          
                        </b-badge>
                    </div>
                </b-col>
                <b-col v-if="rindexaciones.length > 0" align-self="start">
                    <div v-for="(indexacion, i) in rindexaciones" :key="i" class="float-left ml-1 mr-1">
                      <b-badge variant="primary">
                        <a v-if="indexacion.url != ''" :href="indexacion.url" class="text-light" target="_blank" v-text="indexacion.name"></a>
                        <a v-else class="text-light" v-text="indexacion.name"></a>
                      </b-badge>
                    </div>
                    <div v-if="revista['licenciaImg'] !== undefined">
                      <!--Propiedades de img-->
                      <div>
                        <div style="max-width: 5em; margin-left: 1em;" class="float-left">
                          <img :src="revista['licenciaImg']" :alt="revista['licenciaImg']">
                        </div>
                      </div>
                    </div>
                </b-col>
              </div>
            </div>
          <p class="card-text text-justify clasDescription" v-text="revista.descripcion"></p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <hr>
          <b-row>
            <template v-for="prop in propiedadesName1">
              <b-col sm="6" md="6" lg="6" v-if="!isVoid(revista[prop.key])" :key="prop.key">
                <div>
                  <itemDescription :icono="propiedades[prop.key]" :label="prop.nombre" :texto="revista[prop.key].toString()"></itemDescription>
                </div>
              </b-col>
            </template>
            <b-col v-for="prop in propiedadesName4" :key="prop.key" sm="6" md="6" lg="6">
              <!--Propiedades de si/no  0/1-->
              <div v-if="revista[prop.key] == 1">
                <itemDescription :icono="propiedades[prop.key]" :label="prop.nombre" :texto="'Si'"></itemDescription>
              </div>
              <div v-else>
                <itemDescription :icono="propiedades[prop.key]" :label="prop.nombre" :texto="'No'"></itemDescription>
              </div>
            </b-col>
            <template v-for="prop in propiedadesName6">
              <b-col  :key="prop.key" sm="6" md="6" lg="6" v-if="!isVoid(revista[prop.key])">
                <div>
                  <div class="text-left">
                    <strong class="float-left">
                      <i :class="propiedades[prop.key]"></i>
                      {{prop.nombre}} &nbsp
                    </strong>
                    <p class="float-left">
                      {{ revista[prop.key].toString() }} &nbsp
                      <span>
                        <router-link v-if="prop.key === 'ciudad'" :to="`/ListaRevistas/${prop.key}=${idCity}`"><i class="fas fa-sort-amount-down"></i></router-link>
                        <router-link v-else-if="prop.key === 'pais'" :to="`/ListaRevistas/${prop.key}=${idCountry}`"><i class="fas fa-sort-amount-down"></i></router-link>
                        <router-link v-else :to="`/ListaRevistas/${prop.key}=${encodeURIComponent(revista[prop.key].toString())}`"><i class="fas fa-sort-amount-down"></i></router-link>
                      </span>
                    </p>
                  </div>
                </div>
              </b-col>
            </template>
            <template v-for="propa in propiedadesName2">
              <b-col :key="propa.key" sm="6" md="6" lg="6" v-if="!isVoid(revista[propa.key])">    
                <div v-if="propa.key == 'doi' && revista[propa.key] != null ">                
                    <itemDescription :click=true :url="urlDOI+revista[propa.key]" :icono="propiedades[propa.key]" :label="propa.nombre" :texto="revista[propa.key].toString()"> </itemDescription>
                </div>
                <div v-else-if="propa.key == 'correo' && revista[propa.key] != null ">
                    <itemDescription :click=true :url="'mailto:'+revista[propa.key]" :icono="propiedades[propa.key]" :label="propa.nombre" :texto="revista[propa.key].toString()"> </itemDescription>
                </div>
                <div v-else>
                  <itemDescription  :icono="propiedades[propa.key]" :label="propa.nombre" :texto="revista[propa.key].toString()">
                </itemDescription>
                </div>
              </b-col>
            </template>
            <template v-for="propa in propiedadesName3">
              <b-col  :key="propa.key" sm="6" md="6" lg="6" v-if="!isVoid(revista[propa.key])">    
                <div v-if="propa.key != 'url'">
                  <a :href="revista[propa.key]" target="_blanck">                  
                    <itemDescription   :icono="propiedades[propa.key]" :label="propa.nombre" > </itemDescription>
                  </a>
                </div>
                <div v-if="propa.key == 'url'">
                    <itemDescription  :click=true  :url='revista.url' icono="fas fa-globe" texto="sitio web"  > </itemDescription>
                </div>                    
              </b-col>
            </template>
          </b-row>
        </b-col>
        <div v-show="indexScopus !== ''" :class="show" class="col-8 col-sm-4 col-md-4 col-lg-3 d-flex align-self-center">
          <div id="indexScopus"></div>
        </div>
      </b-row>
      <hr>
      <b-row v-if="video" class="d-flex justify-content-center">
        <div class="col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7">
          <iframe style="width: 100%; height: 60vh;" :src="urlVideo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </b-row>
      <b-row align-self="start">
        <b-col v-if="palabrasClavesRevista.length > 0" align-self="start">
          <p class="text-left font-weight-bold">Palabras Claves</p>
            <div v-for="word in palabrasClavesRevista" :key="word.id" class="float-left ml-1 mr-1" @click="pushViewJournalWord(word.palabraClaveId)">         
                <b-badge  href="#" variant="primary">
                      {{palabrasClaves[word.palabraClaveId-1].palabraClave}} 
                </b-badge>
            </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import imgJournalDefoult from "@/assets/journalImgDefault.jpeg";
import itemDescription from "@/components/itemDescription";
import ingenieriaLogo from "@/assets/ingenieria-200x167.png";
import cienciasAgricolas from "@/assets/ciencias-agricolas-y-ambientales-200x167.png";
import cienciasBiologicas from "@/assets/ciencias-biologicas-200x167.png";
import cienciasSalud from "@/assets/ciencias-de-la-salud-200x167.png";
import cienciasSociales from "@/assets/ciencias-sociales-200x167.png";
import humanidades from "@/assets/humanidades-200x167.png";
import cienciasExactas from "@/assets/ciencias-exactas-y-de-la-Tierra-200x167.png";
import linguisticaLiteraturaArtes from "@/assets/linguistica200x167.png";
import AddThis from '@/components/AddThis.vue'
import SuscriptionButton from '@/components/SuscriptionButton.vue'

export default {
  props: {
    id: String,
    isSubscribed: Boolean
  },
  components: {
    itemDescription, AddThis, SuscriptionButton
  },
  data() {
    return {
      revista: {},
      categorias: [],
      rindexaciones: [],
      palabrasClavesRevista: {},
      palabrasClaves: {},
      rContactos: {},
      rAdicional: {},
      rUbicacion: {},
      indexScopus: '',
      idCity: "",
      idCountry: "",
      urlVideo:"",
      video:false,
      show: "",
      imageToShare: '',
      urlDOI: "https://doi.org/",
      iconosCategorias: {
        "Ciencias Agrícolas y Ambientales": cienciasAgricolas,
        "Ciencias Biológicas": cienciasBiologicas,
        "Ciencias Exactas": cienciasExactas,
        "Ciencias Sociales": cienciasSociales,
        "Ingeniería": ingenieriaLogo,
        "Ciencias de la salud": cienciasSalud,
        "Humanidades": humanidades,
        "Lingüística, literatura y artes": linguisticaLiteraturaArtes
      },
      propiedades: {
        institucion: "fas fa-university",
        facultad: "fas fa-warehouse",
        sku: "",
        issn: "fas fa-barcode",
        eissn: "far fa-file",
        doi: "fab fa-codepen",
        telefono: "fas fa-phone",
        direccion: "fas fa-map-marked-alt",
        ciudad: "fas fa-city",
        facebook: "fab fa-facebook-square",
        instagram: "fab fa-instagram",
        twitter: "fab fa-twitter-square",
        correo: "fas fa-at",
        tituloCorto: "fas fa-font",
        guiaAutores: "fab fa-autoprefixer",
        periodicidad: "fas fa-calendar-check",
        preprint: "fas fa-pencil-ruler",
        apc: "fab fa-pied-piper",
        fechaIngreso: "fas fa-calendar-alt",
        pais: "fas fa-globe-asia",
        politicaAutoarchivo: "fas fa-archive",
        tipoRevisionPares: "fas fa-check-square",
        estiloCitacion: "fas fa-feather-alt"
      },
      propiedadesName1: [
        { nombre: "Titulo Corto", key: "tituloCorto" },
        { nombre: "Facultad", key:"facultad" },
        { nombre: "ISSN", key:"issn" },
        { nombre: "EISSN", key:"eissn" },
        { nombre: "Periodicidad", key: "periodicidad" },
        { nombre: "Incluida desde", key: "fechaIngreso" },
        { nombre: "Tipo de revisión por pares", key: "tipoRevisionPares" },
        { nombre: "Estilo de citación", key: "estiloCitacion" }
      ],
      propiedadesName2: [
        { nombre: "DOI", key:"doi" },
        { nombre: "Teléfono", key:"telefono" },
        { nombre: "Dirección", key:"direccion" },
        { nombre: "", key:"correo" },
        { nombre: "Política de auto archivo", key:"politicaAutoarchivo" }
      ],
      propiedadesName3: [
        { nombre: "Facebook", key:"facebook" },
        { nombre: "Instagram", key:"instagram" },
        { nombre: "Twitter", key:"twitter" },
        { nombre: "url", key:"url" },
        { nombre: "Guía de autores", key:"guiaAutores" },
      ],
      propiedadesName4: [//Propiedades de si/no  0/1
        { nombre: "APC", key:"apc" },
        { nombre: "Preprint", key:"preprint" }
      ],
      propiedadesName5: [//Propiedades con imagen
        { nombre: "Licencia", key: "licenciaImg" }
      ],
      propiedadesName6: [//Propiedades con filtro de busqueda de texto
        { nombre: "Institución", key:"institucion" },
        { nombre: "País", key:"pais" },
        { nombre: "Ciudad", key:"ciudad" }
      ]
    };
  },
  mounted () {
    this.initDetailedJournal()
  },
  watch: {
    id: function() {
      this.initDetailedJournal()
    }
  },
  methods: {
    pushViewJournalCategory (categoryId) {
      this.$router.push({path: '/ListaRevistas/category='+categoryId})
    },
    pushViewJournalWord (wordId) {
      this.$router.push({path: '/ListaRevistas/word='+wordId})
    },
    initDetailedJournal () {
      this.categorias = []
      this.rindexaciones = []
      this.revista = {}
      this.palabrasClavesRevista = {}
      this.palabrasClaves = {}
      this.rContactos = {}
      this.rAdicional = {}
      this.rUbicacion = {}
      this.idCity = ""
      this.idCountry = ""
      this.indexScopus = ""
      this.urlVideo=""
      this.video=false;
      this.show = "displayNone"
      document.getElementById("indexScopus").innerHTML = ""
      
      axios.get(process.env.ROOT_API + "Revista/" + this.id).then(response => {
        this.revista = response.data;
        let auxDate = response.data.fechaIngreso.split("-");
        if (auxDate.length == 3) {
          this.revista.fechaIngreso = auxDate[0]+"/"+auxDate[1]+"/"+auxDate[2].substring(0,2)
        }
        this.$emit("loaded")
        if (this.revista.imagen == null) {
          this.revista.imagen = imgJournalDefoult;
        }else{
          this.imageToShare = this.revista.imagen.replace('http', 'https')
        }
        axios
          .get(process.env.ROOT_API + "Rubicacions/" + this.id)
          .then(response => {
            this.rUbicacion = response.data;
            this.revista = Object.assign(this.revista, response.data);
            this.idCity = response.data.ciudadId;
            axios
              .get(process.env.ROOT_API + "Ciudads/" + this.idCity)
              .then(response => {
                let stateLocationId = response.data.state_id
                this.revista.ciudad = response.data.name;
                axios
                  .get(process.env.ROOT_API + "Estados/" + stateLocationId)
                  .then(response => {
                    let contryLocationId = response.data.country_id
                    this.idCountry = contryLocationId;
                    axios
                      .get(process.env.ROOT_API + "Pais/" + contryLocationId)
                      .then(response => {
                        this.revista.pais = response.data.name;
                        axios
                          .get(process.env.ROOT_API + "Licencia/" + this.revista.licenciaId)
                          .then(response => {
                            this.revista.licenciaImg = response.data.imagen
                            axios
                              .get(process.env.ROOT_API + "Rcontactos/" + this.id)
                              .then(response => {
                                this.rContactos = response.data;
                                this.revista = Object.assign(this.revista, response.data);
                                axios.get(process.env.ROOT_API + "Palabraclaves/").then(response => {
                                  this.palabrasClaves = response.data;
                                  axios.get(
                                      process.env.ROOT_API +
                                        "Palabrasclaves/" +
                                        "?filter=%7B%22where%22%3A%20%7B%22revistaId%22%3A%20" +
                                        this.id +
                                        "%7D%7D"
                                    ).then(response => {
                                      this.palabrasClavesRevista = response.data;
                                      axios
                                        .get(process.env.ROOT_API + "Radicionals/" + this.id)
                                        .then(response => {
                                          this.rAdicional = response.data;
                                          this.urlVideo=this.rAdicional.videopresentacion;
                                          if (this.urlVideo !== null) {
                                            this.urlVideo = this.urlVideo.split("&")[0].replace("watch?v=","embed/");
                                            this.video=true;
                                          }
                                          this.revista = Object.assign(this.revista, response.data);
                                          if(this.revista.periodicidadOtro){
                                            this.revista.periodicidad = this.revista.periodicidadOtro
                                          }else{
                                            axios
                                              .get(process.env.ROOT_API + "Periodicidads/" + this.revista.periodicidadId)
                                              .then(response => {
                                                this.revista.periodicidad = response.data.periodicidad
                                              })
                                          }
                                          axios
                                            .get(process.env.ROOT_API + 'RevistasCategorias?filter={"where": {"revistaId":'+this.revista.id+'}}')
                                            .then(response => {
                                              for (let index = 0; index <  response.data.length; index++) {
                                                let categoriaIdR=response.data[index].categoriaId;
                                                if (index == 0) {
                                                  this.$emit('refreshCategory', categoriaIdR)
                                                } 
                                                axios.get(process.env.ROOT_API+'Categoria/'+categoriaIdR).then(response=>{
                                                    let nombreCategoria = response.data;
                                                    this.categorias.push(nombreCategoria);
                                                }).catch(error =>{
                                                  console.log(error);
                                                })
                                              }
                                            });
                                          axios
                                            .get(process.env.ROOT_API + 'Rindexaciones?filter={"where": {"revistaId":'+this.revista.id+'}}')
                                            .then(respRIndex => {
                                              for (let index = 0; index <  respRIndex.data.length; index++) {
                                                axios.get(process.env.ROOT_API+'Indexaciones/'+respRIndex.data[index].indexacionesId).then(response=>{
                                                    let indexacion = response.data;
                                                    if(indexacion.indexaciones == "Scopus"){
                                                      this.indexScopus = respRIndex.data[index].parametro
                                                      this.show = ""
                                                      document.getElementById("indexScopus").innerHTML = this.indexScopus
                                                    }else{
                                                      this.rindexaciones.push({
                                                        name: indexacion.indexaciones,
                                                        url: respRIndex.data[index].parametro
                                                      });
                                                    }
                                                    
                                                }).catch(error =>{
                                                  console.log(error);
                                                })
                                              }
                                              
                                            });
                                          axios
                                            .get(process.env.ROOT_API + 'Politicaautoarchivos?filter={"where": {"id":'+this.revista.politicaAutoarchivoId+'}}')
                                            .then(respPoliticaAutoarchivo => {
                                              this.revista.politicaAutoarchivo = respPoliticaAutoarchivo.data[0].politicaAutoarchivo
                                            })
                                          axios
                                            .get(process.env.ROOT_API + `Tiporevisionpares/${this.rAdicional.tipoRevisionParesId}`)
                                            .then(respTipoRevision => {
                                              this.revista.tipoRevisionPares = respTipoRevision.data.tipoRevisionPares
                                            })
                                          axios
                                            .get(process.env.ROOT_API + `Estilocitacions/${this.rAdicional.estiloCitacionId}`)
                                            .then(respTipoRevision => {
                                              this.revista.estiloCitacion = respTipoRevision.data.estiloCitacion
                                            })
                                        });
                                    });
                                });
                              });
                          })
                      });
                  });
              });
          });
      });
    },
    isVoid(param){
      return param === null || param === undefined?true:false
    }
  }
};
</script>

<style scoped>
.iconos {
  width: 30px;
  height: 30px;
}
.divSummaryImg {
  position: relative;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 1em;
}
.divSummaryImg img {
  height: 100%;
  width: auto;
  max-height: 15em;
}
.divClose {
  width: 100%;
  height: 2em;
  position: relative;
}
.divClose i {
  position: absolute;
  left: 0;
  font-size: 2em;
  cursor: pointer;
}
.displayNone{
  display: none !important;
}
</style>