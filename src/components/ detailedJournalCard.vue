<template>
    <div>

       <b-container  >
       

        <b-row>
               
                    <b-card >                      
                        <b-row >
                            <b-col sm="12" md="4" lg="4" >
                                <b-img-lazy class ="imagenCard"  center  :src="urlImg" />   
                            </b-col>

                            <b-col sm="12" md="8" lg="8" >                                             
                               
                                <p  class="card-text text-left"><strong v-text="titulo"></strong></p>
                                <p class="card-text text-justify clasDescription" >{{descripcion}}</p> 
                                 
                                                    
                               <div v-for="(item, index) in propiedades"  :key="index">                               
                                        <itemDescription
                                        :key="index"
                                        :icono="item.icono"
                                        :label="item.label"
                                        :texto="item.texto">
                                        </itemDescription>                                  
                                    </div>
                                <div v-for="(item, index) in categorias" :key="index">
                                     <h5>                                         
                                        <b-badge href="#" variant="success"><b-img rounded="circle" class="iconos" :src="item.img"/> {{item.nombre}}</b-badge>
                                        </h5>
                                         
                                </div>            
                            </b-col>                              
                        </b-row>  
                        <b-row>
            </b-row>

                   </b-card>           
        </b-row>
    </b-container>



    </div>
</template>

<script>
import itemDescription from "@/components/itemDescription";
import ingenieriaLogo from "@/assets/ingenieria_icono.png";
import cienciasAgricolas from "@/assets/agricola_icono.png";
import cienciasBiologicas from "@/assets/biologia_icono.png";
import cienciasSalud from "@/assets/salud_icono.png";
import cienciasSociales from "@/assets/sociales_icono.png";
import humanidades from "@/assets/humanidades_icono.png";
//import cienciasExactas from "@/assets/ciencias-exactas-y-de-la-Tierra-200x167.png";
//import linguisticaLiteraturaArtes from "@/assets/";
export default {
  /* props: {
        titulo: String,
        descripcion:String,
        urlImg: String
    },*/
  data() {
    return {
      cienciasExactas:"fas fa-atom",
      linguisticaLiteraturaArtes:"fas fa-paint-brush",
      titulo: "INGENÍERIA Y CIENCIA",
    
      descripcion:
        " La revista Ingeniería y Ciencia está dirigida a la comunidad académica, científica e industrial en las áreas de la ciencia y la ingeniería. Su objetivo es presentar y difundir trabajos de investigación básica y aplicada que contribuyan al desarrollo de la ciencia y la industria en el corto, mediano y/o largo plazo, en el ámbito local e internacional. Los temas de publicación incluyen: matemáticas, física, química, biología, geología, y su articulación con la práctica de la ingeniería. Los comités, editorial y científico, dan la bienvenida, entre otros, a artículos en los cuales la formalización o trasfondo teórico es presentado, el cual desemboque en una aplicación de ingeniería. De igual manera, se aprecian las publicaciones en las cuales se usa la práctica de ingeniería como medio para exponer conjeturas inherentes a las ciencias básicas.",
      urlImg:
        "http://jasolutions.com.co/wp-content/uploads/2017/05/ingenieriaciencia.jpg",
      propiedades: [
        {
          label: "institucion:",
          icono: "fas fa-university",
          texto: "Escuela de Ingeniería, Universidad EAFIT"
        },
        {
          label: "sku:",
          icono: "",
          texto: "17949165"
        },
        {
          label: "ISSN:",
          icono: "fas fa-barcode",
          texto: "1794-9165"
        },
        {
          label: "eISSN:",
          icono: "far fa-file-alt",
          texto: "2256-4314"
        },

        {
          label: "DOI:",
          icono: "fab fa-codepen",
          texto: "10.17230/ingciencia"
        },
        {
          label: "Teléfono:",
          icono: "fas fa-phone",
          texto: "(57-4) 261 9500, ext. 9672"
        },
        {
          label: "Dirección:",
          icono: "fas fa-map-marked-alt",
          texto: "Carrera 49 7Sur-50"
        },
        {
          label: "Ciudad:",
          icono: "fas fa-city",
          texto: "Medellín – Antioquia"
        }
      ],
      etiquetas: [
        { nombre: "Biología", img:"http://jasolutions.com.co/wp-content/uploads/2017/04/ingenieria-200x167.png" },
        { nombre: "Ciencia" , img:""},
        { nombre: "Desarrollo", img:"" },
        { nombre: "Física" , img:""},
        { nombre: "Geología" , img:""},
        { nombre: "Industria" ,img:"" },
        { nombre: "Ingeniería",img:""},
        { nombre: "Matemáticas",img:"" },
        { nombre: "Química",img:"" }
      ],
      categorias: [
        { nombre: "Ingeniería", img:ingenieriaLogo },
        { nombre: "Ciencias exactas y de la tierra", img:cienciasAgricolas }
      ]
    };
  },
  methods: {},
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