<template>
  <div>
    <b-card class="d-flex">
      <div class="divClose"><i class="fas fa-times" @click="emitirCloseCard"></i></div>
      <b-row>      
        <b-col sm="12" md="12" lg="12">
          <p class="card-text text-left"><strong v-text="revista.titulo"></strong></p>
           <div style="float:left" class="divSummaryImg">
            <b-img   class="imagenCard" fluid center :src="revista.imagen" />
          </div>
          <p class="card-text text-justify clasDescription" v-text="revista.descripcion"></p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <hr>
          <b-row>
            <b-col v-for="prop in propiedadesName1" :key="prop.key" sm="6" md="6" lg="6" v-if="revista[prop.key] != undefined">
              <itemDescription :icono="propiedades[prop.key]" :label="prop.nombre" :texto="revista[prop.key]">
              </itemDescription>
            </b-col>
            <b-col v-for="propa in propiedadesName2" :key="propa.key" sm="6" md="6" lg="6" v-if="revista[propa.key] != undefined">    
              <div v-if="propa.key == 'doi' && revista[propa.key] != null ">
                <a target="_blanck" :href="urlDOI+revista[propa.key]">                  
                  <itemDescription  :icono="propiedades[propa.key]" :label="propa.nombre" :texto="revista[propa.key]"> </itemDescription>
                </a>   
              </div>
              <div v-else-if="propa.key == 'correo' && revista[propa.key] != null ">
                <a target="_top" :href="'mailto:'+revista[propa.key]">                  
                  <itemDescription  :icono="propiedades[propa.key]" :label="propa.nombre" :texto="revista[propa.key]"> </itemDescription>
                </a>   
              </div>
              <div v-else>
                <itemDescription  :icono="propiedades[propa.key]" :label="propa.nombre" :texto="revista[propa.key]">
              </itemDescription>
              </div>            
              
            </b-col>
            <b-col v-for="propa in propiedadesName3" :key="propa.key" sm="6" md="6" lg="6" v-if="revista[propa.key] != undefined">               
              
              
                <div v-if="propa.key != 'url'">
                  <a :href="revista[propa.key]" target="_blanck">                  
                    <itemDescription  :icono="propiedades[propa.key]" :label="propa.nombre" > </itemDescription>
                  </a>
                </div>
                <div v-else>
                  <a :href="revista.url" target="_blanck"> 
                    <itemDescription  icono="fas fa-globe" label="sitio web" > </itemDescription>
                  </a> 
                </div>              
              
             
                                          
            </b-col>
              
          </b-row>
          <hr>
          <b-row align-self="start">
            <b-col align-self="start">
              <h4 class="text-left">Categoría</h4>
              <br>
              <b-badge href="#" variant="success">
                <b-img rounded="circle" class="iconos" :src="iconosCategorias[categorias.nombre]" />
                {{categorias.nombre}}
              </b-badge>
            </b-col>
 

            <b-col align-self="start">
              
              <h4 v-if="palabrasClavesRevista.length > 0" class="text-left">Palabras Claves</h4>
                <div v-for="word in palabrasClavesRevista" :key="word.id" class="float-left ml-1 mr-1">                
                    <b-badge  href="#" variant="primary">
                          {{palabrasClaves[word.palabraClaveId-1].palabraClave}} 
                    </b-badge>
                </div>  
            
             
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import imgJournalDefoult from "@/assets/journalImgDefault.jpeg";
import itemDescription from "@/components/itemDescription";
import ingenieriaLogo from "@/assets/ingenieria_icono.png";
import cienciasAgricolas from "@/assets/agricola_icono.png";
import cienciasBiologicas from "@/assets/biologia_icono.png";
import cienciasSalud from "@/assets/salud_icono.png";
import cienciasSociales from "@/assets/sociales_icono.png";
import humanidades from "@/assets/humanidades_icono.png";
import cienciasExactas from "@/assets/ciencias-exactas-y-de-la-Tierra-200x167.png";
import linguisticaLiteraturaArtes from "@/assets/linguistica200x167.png";
export default {
  props: {
    id: String
  },
  data() {
    return {
      revista: {},
      categorias: {},
      palabrasClavesRevista: {},
      palabrasClaves: {},
      rContactos: {},
      rAdicional: {},
      rUbicacion: {},
      idCity: "",
      urlDOI: "https://doi.org/",
      iconosCategorias: {
        "Ciencias Agrícolas y Ambientales": cienciasAgricolas,
        "Ciencias Biológicas": cienciasBiologicas,
        "Ciencias Exactas": cienciasExactas,
        "Ciencias Sociales": cienciasSociales,
        Ingeniería: ingenieriaLogo,
        "Ciencias de la salud": cienciasSalud,
        Humanidades: humanidades,
        "Lingüística, literatura y artes": linguisticaLiteraturaArtes
      },
      propiedades: {
        institucion: "fas fa-university",
        sku: "",
        issn: "fas fa-barcode",
        eissn: "far fa-file-alt",
        doi: "fab fa-codepen",
        telefono: "fas fa-phone",
        direccion: "fas fa-map-marked-alt",
        ciudad: "fas fa-city",
        facebook: "fab fa-facebook-square",
        instagram: "fab fa-instagram",
        twitter: "fab fa-twitter-square",
        correo: "fas fa-at"
      },
      propiedadesName1: [
        { nombre: "Institucion", key:"institucion" },
        { nombre: "ISSN", key:"issn" },
        { nombre: "EISSN", key:"eissn" }
      ],
      propiedadesName2: [
        { nombre: "DOI", key:"doi" },
        { nombre: "Teléfono", key:"telefono" },
        { nombre: "Dirección", key:"direccion" },
        { nombre: "Ciudad", key:"ciudad" },
        { nombre: "Correo", key:"correo" }
      ],
      propiedadesName3: [
        { nombre: "Facebook", key:"facebook" },
        { nombre: "Instagram", key:"instagram" },
        { nombre: "Twitter", key:"twitter" },
        { nombre: "url", key:"url" }
      ]
    };
  },
  watch: {
    id: function() {
      axios.get(process.env.ROOT_API + "Revista/" + this.id).then(response => {
        this.revista = response.data;
        if (this.revista.imagen == null) {
          this.revista.imagen = imgJournalDefoult;
        }
        axios
          .get(process.env.ROOT_API + "Categoria/" + this.revista.categoriaId)
          .then(response => {
            this.categorias = response.data;
          });
        axios
          .get(process.env.ROOT_API + "Rcontactos/" + this.id)
          .then(response => {
            this.rContactos = response.data;
            this.revista = Object.assign(this.revista, response.data);
          });

        axios
          .get(process.env.ROOT_API + "Rubicacions/" + this.id)
          .then(response => {
            this.rUbicacion = response.data;
            this.revista = Object.assign(this.revista, response.data);
            this.idCity = response.data.ciudadId;
          });

        axios
          .get(process.env.ROOT_API + "Ciudads/" + this.idCity)
          .then(response => {
            this.revista.ciudad = response.data.ciudad;
          });

        axios
          .get(process.env.ROOT_API + "Radicionals/" + this.id)
          .then(response => {
            this.rAdicional = response.data;
            this.revista = Object.assign(this.revista, response.data);
          });

        axios.get(process.env.ROOT_API + "Palabraclaves/").then(response => {
          this.palabrasClaves = response.data;
        });
        axios
          .get(
            process.env.ROOT_API +
              "Palabrasclaves/" +
              "?filter=%7B%22where%22%3A%20%7B%22revistaId%22%3A%20" +
              this.id +
              "%7D%7D"
          )
          .then(response => {
            this.palabrasClavesRevista = response.data;
          });
      });
    }
  },
  methods: {
    emitirCloseCard() {
      this.$emit("detailedCard:close");
    }
  },
  components: {
    itemDescription
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
  right: 1em;
  font-size: 2em;
  cursor: pointer;
}
</style>