<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div v-for="item in categories" @click="onClickCategory(item.id)" :key="item.id" class="col-6 col-sm-4 col-md-3">
                <div class="categoryCard">
                    <div class="divImg categoryImg block-center cursor-pointer"><img :src="item.img" alt=""></div>
                    <p class="categoryTitle">{{item.nombre}} ({{item.count}})</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      /*Formato de categoria= {img, nombre, count} */
    };
  },
  props: ["categories"],
  mounted(){
    
  },
  methods: {
      onClickCategory: function(category){
          this.$emit('category:click', category);
      }
  }
};
</script>

<style scoped>
.categoryImg{
    max-width: 10em;
}
</style>
