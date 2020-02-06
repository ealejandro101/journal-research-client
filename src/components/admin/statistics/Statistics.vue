<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <GeneralStatistics />
      </div>
      <div class="col-12">
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <AdvancedStatistics />
      </div>
    </div>
  </div>
</template>

<script>
import GeneralStatistics from "@/components/admin/statistics/GeneralStatistics"
import AdvancedStatistics from "@/components/admin/statistics/AdvancedStatistics"

export default {
  name: 'Statistics',
  components: {
    GeneralStatistics,
    AdvancedStatistics
  },
  data(){
    return {

    }
  },
  created(){
  }
}
</script>

<style>
</style>