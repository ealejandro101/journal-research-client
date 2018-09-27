<template>
    <div>
        <b-card  class="d-flex">
            <b-row>
                <b-col sm="12" md="4" lg="4" >
                  <div  class="divSummaryImg">
                      <b-img class ="imagenCard" fluid center  :src="revista.imagen" /> 
                    </div>
                </b-col>
                <b-col sm="12" md="8" lg="8" >
                  <p  class="card-text text-left"><strong v-text="revista.titulo"></strong></p>
                  <p class="card-text text-justify clasDescription"  v-text="revista.descripcion" ></p>
                  <hr>
                  <b-row>
                        <b-col v-for="(prop, indexo) in propiedadesName1" :key="prop.nombre"  sm="6" md="6" lg="6" >
                            <itemDescription                                
                            :icono="propiedades[prop.nombre]"
                            :label="prop.nombre"
                            :texto="revista[prop.nombre]">
                          </itemDescription>   
                      </b-col>

                      <b-col  v-for="(propa,indexa) in propiedadesName2" :key="indexa"  sm="6" md="6" lg="6" >
                          <itemDescription                                
                                      :icono="propiedades[propa.nombre]"
                                      :label="propa.nombre"
                                      :texto="revista[propa.nombre]">
                          </itemDescription>
                      </b-col>
                  </b-row>
                <hr>
                  <b-row  align-self="start" >
                      <b-col align-self="start" >                     
                      <h4  class="text-left">Categorías</h4> 
                      <br>
                      <b-badge href="#" variant="success"><b-img rounded="circle" class="iconos"  :src="iconosCategorias[categorias.nombre]"/> {{categorias.nombre}}</b-badge>
                      
                      </b-col>

                    <b-col align-self="start">
                      <h4  class="text-left">Palabras Claves</h4> 
                      <br>
                      <b-badge href="#" variant="success"><b-img rounded="circle" class="iconos"  :src="iconosCategorias[categorias.nombre]"/> {{categorias.nombre}}</b-badge>
                    </b-col>

                  </b-row>    
               </b-col>               
           </b-row>            
        </b-card>           
    </div>
</template>

<script>
import axios from "axios";

import itemDescription from "@/components/itemDescription";
import ingenieriaLogo from "@/assets/ingenieria_icono.png";
import cienciasAgricolas from "@/assets/agricola_icono.png";
import cienciasBiologicas from "@/assets/biologia_icono.png";
import cienciasSalud from "@/assets/salud_icono.png";
import cienciasSociales from "@/assets/sociales_icono.png";
import humanidades from "@/assets/humanidades_icono.png";
import cienciasExactas from "@/assets/ciencias-exactas-y-de-la-Tierra-200x167.png";
import linguisticaLiteraturaArtes from "@/assets/linguistica-letras-y-arte-200x167.png";
export default {
  props: {
    id: String
  },
  data() {
    return {
      revista: {},
      categorias: {},
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
        sku: "",
        issn: "fas fa-barcode",
        eissn: "far fa-file-alt",
        doi: "fab fa-codepen",
        telefono: "fas fa-phone",
        direccion: "fas fa-map-marked-alt",
        ciudad: "fas fa-city"
      },
      propiedadesName1: [
        { nombre: "institucion" },
        { nombre: "issn" },
        { nombre: "eissn" }
      ],
      propiedadesName2: [
        { nombre: "doi" },
        { nombre: "telefono" },
        { nombre: "direccion" },
        { nombre: "ciudad" }
      ]
    };
  }/*,
  mounted() {
    axios.get(process.env.ROOT_API+"Revista/" + this.id).then(response => {
      this.revista = response.data;
    });
    axios.get(process.env.ROOT_API+"Categoria/"+ 7).then(response => {
      this.categorias = response.data;
    });
  }*/,
  methods: {},
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
.divSummaryImg{
    position: absolute;
    width: calc(100% - 30px);
    top: 0;
    bottom: 0;
}
.divSummaryImg img{
  height: 100%;
  width: auto;
}
</style>