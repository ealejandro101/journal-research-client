<template>
  <div :class="{containerLoading: !isMineature}">
    <div class="divLoading" :class="{divMineature: isMineature}">
      <img class="w-100 h-auto" :src="resources.gifs.loading" alt="Cargando" />
    </div>
  </div>
</template>

<script>
import loadingSrc from "@/assets/gifs/loading.gif";

export default {
  name: "loading-dardo",
  props: {
    isMineature: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resources: {
        gifs: {
          loading: loadingSrc
        }
      }
    };
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
.containerLoading {
  z-index: 100;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: #0000008f;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.divLoading{
  max-width: 40em;
  height: auto;
}
.divMineature{
  max-width: 20em;
  height: auto;
}
</style>