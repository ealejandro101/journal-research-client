<template>
<div>
    <b-container class="containerSummaryCard">
        <b-row>
            <b-card class="cardSummaryJournal">                      
                <b-row :class="classRowResponsive">
                    <b-col sm="12" md="4" lg="3" class="d-flex justify-content-center" :class="classColSummaryImg">
                        <div class="divSummaryImg divImg">
                            <b-img class ="imagenCard"  center  :src="urlImg" /> 
                        </div>
                    </b-col>
                    <b-col sm="12" md="8" lg="9" :class="classColDescription">                                             
                        <p  class="card-text text-left"><strong v-text="titulo"></strong></p>


                            {{codigos}}
                        <div v-if="codigos.eISSN !=null && codigos.DOI !=null  || codigos.eISSN !='' && codigos.DOI !=''">
                             eISSN
                             {{codigos[eISSN]}} |
                              DOI
                             {{codigos[DOI]}}
                        </div>

                        <div v-if="codigos.ISSN !=null && codigos.DOI !=null  || codigos.ISSN !='' && codigos.DOI !=''">
                             ISSN
                             {{codigos[ISSN]}}
                        </div>
                        
                        <p class="card-text text-justify cardDescription">
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
import axios from "axios";

export default {
  props: {
    id: String,
    titulo: String,
    descripcion: String,
    urlImg: String,
    classColSummaryImg: String,
    classColDescription: String,
    classRowResponsive: String
  },
  data() {
    return {
      valor: this.descripcion.substring(0, 250) + "....",
      codigos: { eISSN: "", DOI: "", ISSN: "" },
      Nombrecodigos: [
        { nombre: "eISSN" },
        { nombre: "DOI" },
        { nombre: "ISSN" }
      ]
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo: function() {
      axios.get(process.env.ROOT_API + "Revista/" + this.id).then(response => {
        this.codigos.ISSN = response.data.issn;
        this.codigos.DOI = response.data.doi;
      });
    }
  }
};
</script>

<style scoped>
.containerSummaryCard {
  cursor: pointer;
}
.divSummaryImg {
  position: relative;
  width: calc(100% - 30px);
  display: flex;
  align-items: center;
}
.divSummaryImg img {
  object-fit: contain;
}
.colSummaryImg {
  min-height: 10em;
}
.cardSummaryJournal {
  width: 100%;
}
.colSummaryResponsive {
  width: 100%;
  max-width: 100%;
  justify-content: center;
  display: flex;
}
.colSummaryResponsive .cardDescription {
  display: none;
}
.colSummaryResponsive .divSummaryImg {
  position: relative;
}
.rowResponsive {
  display: block;
}
.divSummaryImg,
.divSummaryImg img {
  max-height: 35vh;
}
</style>