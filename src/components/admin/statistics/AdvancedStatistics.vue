<template>
  <div class="d-flex flex-column">
    <div class="mt-4 mb-3">
      <span class="font-size-x-large font-weight-bold">Estadísticas de las revistas</span>
    </div>
    <form class="container-fluid" action>
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <label class="text-left" for="exampleFormControlSelect1">Revista:</label>
            <select class="mw-100" v-model="currentJournalId" @change="refreshStatistics">
              <option
                v-for="(journal, index) in journals"
                :key="index"
                :value="journal.id"
              >{{ journal.titulo }}</option>
            </select>
          </div>
        </div>
        <!--<div class="col-12 col-md-6 d-flex flex-column">
          <div>Periodo de la consulta:</div>
          <div class="d-flex">
            <div class="input-group mb-3 mx-1">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Inicio</span>
              </div>
              <select class="form-control" id="exampleFormControlSelect1">
                <option v-for="(period, index) in periods" :key="index" v-text="period.periodo" />
              </select>
            </div>
            <div class="input-group mb-3 mx-1">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Final</span>
              </div>
              <select class="form-control" id="exampleFormControlSelect1">
                <option v-for="(period, index) in periods" :key="index" v-text="period.periodo" />
              </select>
            </div>
          </div>
        </div>-->
        <div class="col-12 journalStatistics">
          <b-tabs content-class="mt-3">
            <b-tab title="Revista" active>
              <b-table v-if="journalStatistics.length > 0" hover :items="journalStatistics"></b-table>
              <span v-else>No hay registro de las visitas a la revista.</span>
            </b-tab>
            <b-tab title="Convocatorias">
              <b-table v-if="announcementsStatistics.length > 0" hover :items="announcementsStatistics"></b-table>
              <span v-else>No hay registro de las visitas a las convocatorias de la revistas.</span>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AdvancedStatistics",
  data() {
    return {
      journals: [],
      currentJournalId: null,
      periods: [],
      journalStatistics: [],
      announcementsStatistics: []
    };
  },
  created() {
    this.$store.getters.providerService.postModel(`../custom/Admin/Statistics/getJournals`).then(response => {
      if (response.data.state) {
        this.journals = response.data.data;
        this.currentJournalId = null;
      }
    });
  },
  methods: {
    refreshStatistics(){
      /*if (this.currentJournalId) {
        this.$store.getters.providerService.postModel(`../custom/Admin/Statistics/getPeriods`, {
          journalId: this.currentJournalId
        }).then(response => {
          this.periods = response.data.data
          
        });
      }*/
      this.$store.getters.providerService.getModel(`../custom/Admin/Statistics/Journal/getStatisticsInfo/${this.currentJournalId}`).then(res => {
        this.journalStatistics = res.data.journalStadistics.map(item => {
          return {
            periodo: item.periodo,
            nroVisitas: item.nroVisitas,
            clicksIndexaciones: item.clicksIndexaciones,
            clicksDoi: item.clicksDoi,
            clicksCorreo: item.clicksCorreo,
            clicksSitioweb: item.clicksSitioweb,
            clicksGuiaAutores: item.clicksGuiaAutores,
            clicksRedes: item.clicksRedes
          }
        })
        this.announcementsStatistics = res.data.announcements.map(item => {
          if (item.estadisticas == undefined) {
            return {
              titulo: item.titulo,
              estado: item.estado == 1?'Activa':'Terminada',
              nroVisitas: 0,
              clicksConvocatoria: 0,
              descargasPdf: 0,
              clicksCorreo: 0,
              clicksSitioweb: 0,
              clicksGuiaAutores: 0
            }
          }
          return {
            titulo: item.titulo,
            estado: item.estado == 1?'Activa':'Terminada',
            nroVisitas: item.estadisticas.nroVisitas,
            clicksConvocatoria: item.estadisticas.clicksConvocatoria,
            descargasPdf: item.estadisticas.descargasPdf,
            clicksCorreo: item.estadisticas.clicksCorreo,
            clicksSitioweb: item.estadisticas.clicksSitioweb,
            clicksGuiaAutores: item.estadisticas.clicksGuiaAutores
          }
        })
      })
    }
  }
};
</script>

<style>
.journalStatistics{
  min-height: 10em;
}
</style>