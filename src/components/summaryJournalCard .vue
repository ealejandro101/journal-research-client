<template>
<div @click="changeClass()">
    <b-container>
        <b-row>
            <b-card class="cardSummaryJournal">                      
                <b-row :class="classRowResponsive">
                    <b-col sm="12" md="4" lg="3" :class="classColSummaryImg">
                        <div class="divSummaryImg">
                            <b-img-lazy class ="imagenCard"  center  :src="urlImg" /> 
                        </div>
                    </b-col>
                    <b-col sm="12" md="8" lg="9" :class="classColDescription">                                             
                        <p  class="card-text text-left"><strong v-text="titulo"></strong></p>
                        <p class="card-text text-justify clasDescription col-0">
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
          valor:this.descripcion.substring(0,250)+"....", 
          classColSummaryImg: 'colSummaryImg',
          classColDescription: '',
          classRowResponsive: ''
          }
      }
  ,
  methods: {
   changeClass: function(){
       this.classColSummaryImg = "colSummaryResponsive";
       this.classColDescription = "colSummaryResponsive";
       this.classRowResponsive = "rowResponsive"
   }
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
.colSummaryImg{
    min-height: 10em;
}
.cardSummaryJournal{
    width: 100%;
}
.colSummaryResponsive{
    width: 100%;
}
.rowResponsive{
    display: block;
}
</style>