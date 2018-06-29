<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-6">
                
                <h2>Post list</h2>
                <div class="card mb-3" v-for="post in posts" :key="post.id">
                    <div class="card-body">
                        <h3>{{post.title}}</h3>
                        <p v-text="post.content"></p>
                    </div>
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
      posts: []
    };
  },
  mounted() {
    axios.get("http://localhost:3000/api/Posts").then(response => {
      this.posts = response.data;
    });
  }
};
</script>

<style scoped>
</style>