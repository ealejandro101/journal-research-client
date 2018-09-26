<template>

<div>
    <b-container>
        <b-row>
            <b-card>                      
                <b-row >
                    <b-col sm="12" md="4" lg="4" >
                        <div class="divSummaryImg">
                            <b-img-lazy class ="imagenCard"  center  :src="urlImg" /> 
                        </div>
                    </b-col>
                    <b-col sm="12" md="8" lg="8" >                                             
                        <p  class="card-text text-left"><strong v-text="titulo"></strong></p>
                        <p class="card-text text-justify clasDescription" >
                            {{valor}} 
                            <a href="#" class="card-link">
                                <b-badge pill variant="primary">
                                    Ver mas
                                </b-badge>
                            </a>
                        </p>                 
                    </b-col>                              
                </b-row>                                 
            </b-card>           
        </b-row>
    </b-container>
 </div>
</template>

<script>
export default {
  props: {
    titulo: String,
    descripcion:String,
    urlImg: String
  },
  data(){
      return{
          valor:this.descripcion.substring(0,250)+"...."
          }
      }
  ,
  methods: {
   
  }
};
</script>

<style scoped>
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