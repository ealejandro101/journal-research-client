<template>
    <div>
        <h6>Filtros de busqueda</h6>
        <div v-for="item in filtros" :key="item.titulo">
            
            <div>
                <b-btn v-b-toggle.collapse1 variant="primary" class="tituloFiltro">{{item.titulo}}<i class="fas fa-caret-down"></i></b-btn>
            </div>
            <b-collapse visible  id="collapse1" class="mt-2">
                    <b-contanier >
                        <b-row   v-for="opcion in item.opciones" :key="opcion.id"> 
                           <b-col  sm="2" md="2" lg="2">
                                <b-img rounded="circle" class="iconos"  :src="opcion.logo"/> 
                            </b-col>   
                             <b-col sm="10" md="10" lg="10" > 
                                <b-form-checkbox  class="float-rigth check"   size="sm" type="checkbox" :name="opcion.id" :id="opcion.id" :value="opcion.id">
                                                                    {{opcion.nombre}}                                                                                                
                                </b-form-checkbox>                                    
                            </b-col>  
                        </b-row>
                    </b-contanier>  
            </b-collapse>   
        </div>
    </div>
</template>

<script>

import ingenieriaLogo from "@/assets/ingenieria-200x167.png";
import cienciasAgricolas from "@/assets/ciencias-agricolas-y-ambientales-200x167.png";
import cienciasBiologicas from "@/assets/ciencias-biologicas-200x167.png";
import cienciasSalud from "@/assets/ciencias-de-la-salud-200x167.png";
import cienciasSociales from "@/assets/ciencias-sociales-200x167.png";
import humanidades from "@/assets/humanidades-200x167.png";
import cienciasExactas from "@/assets/ciencias-exactas-y-de-la-Tierra-200x167.png";
import linguisticaLiteraturaArtes from "@/assets/linguistica-letras-y-arte-200x167.png";
    export default {
        name: "filtros-busqueda",
        data() {
            return {
                filtros: [{
                    titulo: "Categoria", 
                    opciones: [{
                        nombre: "Ingeniería", 
                        id: "ingenieria",
                        logo:ingenieriaLogo
                        },
                        {
                            nombre: "Humanidades",
                            id: "humanidades",
                            logo:humanidades
                        },
                          {
                            nombre: "Ciencias Agrícolas y Ambientales",
                            id: "Ciencias Agrícolas y Ambientales",
                            logo:cienciasAgricolas
                        },
                         {
                            nombre: "Ciencias Biológicas",
                            id: "Ciencias Biológicas",
                            logo:cienciasBiologicas
                        },
                        {
                            nombre: "Ciencias Exactas",
                            id: "Ciencias Exactas",
                            logo:cienciasExactas
                        },
                         {
                            nombre: "Ciencias Sociales",
                            id: "Ciencias Sociales",
                            logo:cienciasSociales
                        },
                         {
                            nombre: "Ciencias de la salud",
                            id: "Ciencias de la salud",
                            logo:cienciasSalud
                        },
                         {
                            nombre: "Lingüística, literatura y artes",
                            id: "Lingüística, literatura y artes",
                            logo:linguisticaLiteraturaArtes
                        },
                        ]
                }]
            };
        },
    }
</script>

<style scoped>
.tituloFiltro{
    background-color: #fff;
    border-color: #fff;
    color: #000;
}
.iconos {
  width: 40px;
  height: 30px;
}

</style>