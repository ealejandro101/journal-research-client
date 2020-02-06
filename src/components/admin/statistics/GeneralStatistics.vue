<template>
  <div class="container-fluid">
    <div v-if="error.isError" class="row">
      <div class="col-12">
        <ErrorNotification :errors="error.errors" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="mt-5 mb-3">
          <span class="font-size-x-large font-weight-bold">Estadísticas de generales</span>
        </div>
      </div>
      <div class="col-12 col-sm-6 d-flex justify-content-center pt-5 pb-5 px-5">
        <div class="d-flex flex-column p-5 generalStatisticCard">
          <span class="font-size-xx-large font-weight-bolder" v-text="generalStatistics.journalViews" />
          <span>Visitas a las revistas.</span>
        </div>
      </div>
      <div class="col-12 col-sm-6 d-flex justify-content-center pt-5 pb-5 px-5">
        <div class="d-flex flex-column p-5 generalStatisticCard">
          <span class="font-size-xx-large font-weight-bolder" v-text="generalStatistics.announcementsViews" />
          <span>Visitas a las convocatorias.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorNotification from "@/components/generals/ErrorNotification"

export default {
  name: 'GeneralStatistics',
  components: {
    ErrorNotification
  },
  data(){
    return {
      generalStatistics: {
        journalViews: '',
        announcementsViews: ''
      },
      error: {
        isError: false,
        errors: []
      }
    }
  },
  created(){
    this.$store.getters.providerService.postModel('../custom/Admin/Statistics/getGeneralStatistics').then(res => {
      if (res.data.state) {
        this.generalStatistics = res.data.data
      }else{
        this.error.error.push(res.data.error)
        this.error.isError = true
      }
    })
  }
}
</script>

<style>
.generalStatisticCard{
  min-width: 20em;
  background-color: #ecd9ce;
  border-radius: .4em;
  -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
}
</style>