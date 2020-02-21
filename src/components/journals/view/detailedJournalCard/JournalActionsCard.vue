<template>
  <div class="d-flex flex-column">
    <h6 class="card-text text-left">
      <strong v-text="title"></strong>
      <!--<i class="fas fa-eye"></i> {{nroVisitas}}-->
    </h6>
    <div class="mb-3 d-flex justify-content-left">
      <suscription-button 
        :isSubscribed="isSubscribed" 
        :text="'Suscribirse a la revista'" 
        @unsubscribe="$emit('unsubscribe')" 
        @subscribe="$emit('subscribe')"
      />
    </div>
    <div class="float-left mr-4">
      <div class="divSummaryImg">
        <b-img class="imagenCard" fluid center :src="image" />
      </div>
      <div v-if="image !== undefined && title !== undefined">
        <AddThis 
          publicId="ra-5cf56caaa6e91bcc"
          class="mt-2"
        />
        <div 
          class="addthis_inline_share_toolbox_r5ri d-flex justify-content-center" 
          :data-title="title + ' en Dardo'"
          :data-media="image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SuscriptionButton from '@/components/journals/view/SuscriptionButton.vue'
import AddThis from '@/components/journals/view/AddThis.vue'

export default {
  name: 'JournalActionsCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    isSubscribed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SuscriptionButton,
    AddThis
  }
}
</script>

<style>

</style>