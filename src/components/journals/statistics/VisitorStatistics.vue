<template>
  <div v-if="statisticsIsLoading && journalId">
    <zingchart class="border mb-3" :data="statisticsConfig" :height="250" :width="250"/>
  </div>
</template>

<script>
export default {
  name: 'VisitorStatistics',
  props: ['journalId'],
  data(){
    return {
      statisticsIsLoading: false,
      statisticsConfig: {
        type: 'bar',
        series: [{
          values: []
        }],
        title: {
          text: 'Estadísticas Dardo',
          fontSize: 15,
          color: '#000'
        },
        scaleX: {
          // set scale label
          label: { text: 'Mes' },
          // convert text on scale indices
          labels: []
        },
        scaleY: {
          // scale label with unicode character
          label: { text: '# de visitas' }
        },
      }
    }
  },
  created(){
    this.refreshStatistics()
  },
  watch: {
    journalId(){
      this.refreshStatistics()
    }
  },
  methods: {
    refreshStatistics(){
      this.statisticsConfig.series[0].values = []
      this.statisticsConfig.scaleX.labels = []
      this.statisticsIsLoading = false
      this.$store.getters.providerService.getModel(`/Revista/${this.journalId}`, {
        fields: ['id'],
        include: [
          {
            relation: 'estadisticas',
            scope: {
              fields: ['id', 'periodo', 'nroVisitas'],
              order: 'periodo ASC'
            }
          }
        ]
      }).then(res => {
        //Estadisticas
        for (const iterator of res.data.estadisticas) {
          this.statisticsConfig.series[0].values.push(iterator.nroVisitas)
          this.statisticsConfig.scaleX.labels.push(iterator.periodo)
        }
        this.statisticsIsLoading = true
      })
    }
  }
}
</script>

<style>

</style>