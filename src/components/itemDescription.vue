<template>
  <div v-if="click">
    <p class="text-left">
      <strong>
        <i :class="icono"></i>
        {{label}}
      </strong>
      <a target="_blanck" :href="url">{{texto}}</a>
    </p>
  </div>
  <div v-else>
    <p class="text-left">
      <strong>
        <i :class="icono"></i>
        {{label}}
      </strong>
      {{texto}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    icono: String,
    label: String,
    texto: String,
    click: Boolean,
    url: String
  }
};
</script>

<style scoped>
</style>