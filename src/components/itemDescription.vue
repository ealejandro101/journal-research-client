<template>
    <div>
              <p class="text-left">
                    <strong><i :class="icono"></i> {{label}} </strong> {{texto}}
                </p>   


    </div>
</template>

<script>
export default {

  props: {
    icono: String,
    label: String,
    texto: String
  }
};
</script>

<style scoped>
</style>