<template>
  <div class="container-fluid">
    <div class="row my-5">
      <div class="col-12">
        <form v-on:submit.prevent="getArticles()" class="d-flex justify-content-center align-items-center">
          <div class="px-2 form-group d-flex align-items-center mb-0">
            <label class="mb-0 mr-1" for="startDate">Desde:</label>
            <input v-model="startDate" id="startDate" class="form-control" type="date" required>
          </div>
          <div class="px-2 form-group d-flex align-items-center mb-0">
            <label class="mb-0 mr-1" for="endDate">Hasta:</label>
            <input v-model="endDate" id="endDate" class="form-control" type="date" required>
          </div>
          <div class="px-2">
            <input class="btn btn-info" type="submit" value="Buscar">
          </div>
        </form>
      </div>
    </div>
    <div v-if="isLoading" class="row">
      <div class="col-12 d-flex justify-content-center">
        <loading-dardo :isMineature="true"></loading-dardo>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-xl-6 d-flex flex-column p-1 mb-2 text-left" v-for="(item, index) in articles" :key="index">
        <span v-html="item" />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingDardo from "@/components/generals/LoadingDardo.vue"

export default {
  name: 'Articles',
  props: {
    journalId: {
      type: String,
      default: undefined
    }
  },
  components: {
    LoadingDardo
  },
  data(){
    return {
      articles: [],
      startDate: '',
      endDate: '',
      isLoading: false
    }
  },
  created(){
    let auxDate = new Date(Date.now())
    this.endDate = this.getDateFormat(auxDate)
    auxDate.setFullYear(auxDate.getFullYear() - 2)
    this.startDate = this.getDateFormat(auxDate)
    this.getArticles()
  },
  methods: {
    getArticles(){
      this.isLoading = true
      let dateRange = { dateRange: { startDate: this.startDate, endDate: this.endDate } }
      this.articles = []
      this.$store.getters.providerService.postModel(`Revista/${this.journalId}/getArticles`, dateRange).then(response => {
        this.articles = response.data.state
        this.isLoading = false
      })
    },
    getDateFormat(date){
      let zDate = date.getDate() < 10
      let zMounth = (date.getMonth() + 1) < 10 
      return `${date.getFullYear()}-${zMounth?'0':''}${date.getMonth() + 1}-${zDate?'0':''}${date.getDate()}`
    }
  }
}
</script>

<style>

</style>