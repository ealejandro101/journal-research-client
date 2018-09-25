<template>
    <div>

       <b-container  >
       

        <b-row>
               
                <b-card >                      
                        <b-row >
                            <b-col sm="12" md="4" lg="4" >
                                <b-img-lazy class ="imagenCard" fluid center  :src="revista.imagen" /> 
                            </b-col>
                            <b-col sm="12" md="8" lg="8" >
                                <p  class="card-text text-left"><strong v-text="revista.titulo"></strong></p>
                                <p class="card-text text-justify clasDescription"  v-text="revista.descripcion" ></p>
                            </b-col> 
                        </b-row>

                        <b-row >
                          <b-col v-for="(prop,indexa) in propiedadesName" :key="indexa"  sm="6" md="6" lg="6" >
                              <itemDescription v-if="index %2 == 0 && index !=0"                                
                                        :icono="propiedades[prop.nombre]"
                                        :label="prop.nombre"
                                        :texto="revista[prop.nombre]">
                             </itemDescription>
                          </b-col>
                        <b-col v-for="(prop,indexo) in propiedadesName" :key="indexo"  sm="6" md="6" lg="6" >
                              <itemDescription v-if="index %2 != 0"                               
                                        :icono="propiedades[prop.nombre]"
                                        :label="prop.nombre"
                                        :texto="revista[prop.nombre]">
                             </itemDescription>
                          </b-col>
                        </b-row>                     

                        <b-badge href="#" variant="success"><b-img rounded="circle" class="iconos"  :src="iconosCategorias[categorias.nombre]"/> {{categorias.nombre}}</b-badge>
                                      

                   </b-card>           
        </b-row>
    </b-container>
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
    id:String
  },
  data() {     
    return {
      revista:{},
      categorias:{},
      iconosCategorias:{
        "Ciencias Agrícolas y Ambientales":cienciasAgricolas,
        "Ciencias Biológicas":cienciasBiologicas,
        "Ciencias Exactas":cienciasExactas,
        "Ciencias Sociales":cienciasSociales,
        "Ingeniería":ingenieriaLogo,
        "Ciencias de la salud":cienciasSalud,     
        "Humanidades":humanidades,
        "Lingüística, literatura y artes":linguisticaLiteraturaArtes
    }, 
      propiedades: {
        "institucion":"fas fa-university",
        "sku": "",
        "issn": "fas fa-barcode",
        "eissn": "far fa-file-alt",
        "doi": "fab fa-codepen",
       "telefono": "fas fa-phone",
        "direccion": "fas fa-map-marked-alt",
        "ciudad": "fas fa-city"
      },
      propiedadesName:[
        {nombre:"institucion"},
        {nombre:"issn"},
        {nombre:"eissn"},
        {nombre:"doi"},
        {nombre:"telefono"},
        {nombre:"direccion"},
        {nombre:"ciudad"}        
      ]      
    };
  },
   mounted() {
    axios.get("http://localhost:3000/api/Revista/"+this.id).then(response => {
      this.revista = response.data;
    }); 
    axios.get("http://localhost:3000/api/Categoria/"+7).then(response => {
      this.categorias = response.data;
    });  
  },
  methods: {
     


  },
  components: {
    itemDescription
  }
};

</script>

<style scoped>

.iconos{
    width: 30px;
    height: 30px;

}
</style>