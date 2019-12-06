<template>
  <div class="containerLoading">
    <div class="divLoading">
      <img :src="resources.gifs.loading" alt="Cargando" />
    </div>
  </div>
</template>

<script>
import loadingSrc from "@/assets/gifs/loading.gif";

export default {
  name: "loading-dardo",
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
  height: fit-content;
}
</style>