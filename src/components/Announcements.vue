<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div v-if="announcements.length != 0" class="col-12">
        <carousel :perPageCustom="[[576, 2],[768,4],[992,6]]" style="width: 100%">
          <slide v-for="item in announcements" :key="item.id">
            <div class="cardAnnouncement cursor-pointer" @click="onClickAnnouncements(item.revista)">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-11 d-flex justify-content-center">
                    <div class="position-absolute right--30px">
                      <b-button class="no-bnt" v-b-popover.hover="'Fecha de cierre='+item.fechaFinal" title="">
                        <i class="fas fa-bullhorn" :class="{'text-success': item.stateAux == 3, 'text-danger': item.stateAux == 1, 'text-info': item.stateAux == 2}"></i>
                      </b-button>
                    </div>
                    <div class="divImg">
                      <img :src="item.revista.imagen || item.imagen || imgAux" alt="Img">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <hr>
                    <p>{{ item.titulo | maxCharacters }}</p>
                  </div>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
      <div v-else class="col-12">
        <p>No hay convocatorias disponibles</p>
      </div>
      <div v-if="announcements.length != 0" class="col-12">
        <a href="">Ver más</a>
      </div>
    </div>
  </div>
</template>

<script>
import ProviderService from "../providerServices/providerServices.js";
import imgAux from "@/assets/journalImgDefault.jpeg";
export default {
  name: "announcements",
  data() {
    return {
      announcements: [],
      imgAux: imgAux
    };
  },
  props: [],
  created() {
    let _self = this;
    let providerServices = new ProviderService(process.env.ROOT_API);
    providerServices
      .getModel("Convocatoria", {
        where: {
          fechaFinal: {
            gt: Date.now()
          }
        },
        limit: 10,
        order: 'fechaFinal ASC',
        include: {
          relation: "revista",
          scope: {
            fields: ["imagen", "eissn", "issn"]
          }
        }
      })
      .then(response => {
        let oneWeekAfter = new Date(Date.now())
        oneWeekAfter.setDate(oneWeekAfter.getDate() + 15);
        _self.announcements = response.data.map(function(item){
          if(new Date(item.fechaFinal) < oneWeekAfter ){
            item.stateAux = 1//'Próxima a cerrar'
          }else if (new Date(item.fechaInicio) > new Date(Date.now())) {
            item.stateAux = 2//'Próxima a abrir'
          }else{
            item.stateAux = 3//'Activa'
          }
          if (item.imagen && item.imagen.length > 0) {
            item.imagen = process.env.ROOT_API+'../'+item.imagen.replace('convocatoriaId', item.id)
          }
          let auxFinalDate = new Date(item.fechaFinal)
          item.fechaFinal = `${auxFinalDate.getFullYear()}-${auxFinalDate.getMonth() + 1}-${auxFinalDate.getDate()}`
          return item
        })
      });
  },
  methods: {
    onClickAnnouncements(revista) {
      this.$emit("announcements:click", revista);
    }
  },
  filters: {
    maxCharacters(value){
      if (value.length <= 40) {
        return value
      }
      return value.substring(0, 40) + '...'
    }
  }
};
</script>

<style scoped>
.divImg {
  max-width: 10em;
  overflow: hidden;
}
.divImg img {
  max-height: 10em;
  width: auto;
}
.cardAnnouncement {
  padding: 1em;
  margin: 0px 1em;
  border: solid;
  border-radius: 0.5em;
  border-width: thin;
  border-color: gray;
  height: 100%;
}
.bottom-0{
  bottom: 0;
}
.right-0{
  right: 0;
}
.right--30px{
  right: -30px;
}

</style>
