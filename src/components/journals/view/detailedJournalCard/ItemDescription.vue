<template>
  <div class="itemDescriptionComponent d-flex justify-content-start align-items-center">
    <span v-if="type == 'value-link'" class="text-left">
      <strong class="rl-2">
        <i :class="icon" class="pr-1"></i>
        <span class="text-left">{{label}}</span>
      </strong>
      <a 
        @click="addInteractionKey" 
        @click.middle="addInteractionKey" 
        target="_blanck" 
        :href="url"
        v-text="value"
      />
      <i 
        v-if="filter" 
        @click="applyFilter(filter)"
        class="fas fa-sort-amount-down text-info cursor-pointer"
      ></i>
    </span>

    <span v-else-if="type == 'label-link'" class="text-left">
      <strong class="rl-2">
        <i :class="icon" class="pr-1"></i>
      </strong>
      <a 
        @click="addInteractionKey" 
        @click.middle="addInteractionKey" 
        class="pl-2"
        target="_blanck" 
        :href="url"
        v-text="label"
      />
      <i 
        v-if="filter" 
        @click="applyFilter(filter)"
        class="fas fa-sort-amount-down text-info cursor-pointer"
      ></i>
    </span>


    <a 
      v-else-if="type == 'item-link'"
      class="text-left"
      @click="addInteractionKey" 
      @click.middle="addInteractionKey" 
      target="_blanck" 
      :href="url"
    >
      <strong class="rl-2">
        <i :class="icon" class="pr-1"></i>
        <span class="text-left">{{label}}</span>
      </strong>
      <span v-text="value" />
    </a>
    
    <span v-else class="text-left">
      <strong class="rl-2">
        <i :class="icon" class="pr-1"></i>
        <span class="text-left">{{label}}</span>
      </strong>
      <span class="text-left" v-text="value" />
      <i 
        v-if="filter" 
        @click="applyFilter(filter)"
        class="fas fa-sort-amount-down text-info cursor-pointer"
      ></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ItemDescription',
  props: [
    'icon', 'label', 'value', 'type', 'url', 'attributeStatistical',
    'filter'
  ],
  data(){
    return {
      
    }
  },
  methods: {
    addInteractionKey(){
      //Generador de datos para las estadisticas
      if(this.attributeStatistical){
        this.$emit('addInteractionKey', this.attributeStatistical)
      }
    },
    applyFilter(filter){
      if(filter){
        this.$emit('applyFilter', filter)
      }
    }
  }
};
</script>

<style scoped>
</style>