<template>
  <div class="container-fluid min-vh-100">
    <div class="row min-vh-100">
      <div class="col-12 align-self-start p-0">
        <header-research></header-research>
      </div>
      <div class="col-12 p-0 d-flex justify-content-center">
        <div class="container-fluid">
          <div class="row">
            <div v-if="general.isAdmin" class="col-12">
              <admin />
            </div>
            <div v-else class="col-12">
              <editor />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 align-self-end p-0">
        <footer-research></footer-research>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderResearch from "@/components/HeaderResearch";
import FooterResearch from "@/components/FooterResearch";
import Editor from "@/components/Editor";
import Admin from "@/components/Admin";

export default {
  name: "perfil-page",
  components: {
    HeaderResearch,
    FooterResearch,
    Editor,
    Admin
  },
  data() {
    return {
      general: {
        isAdmin: false
      }
    };
  },
  created() {
    this.$store.commit("setCurrentPage", "perfil-page");
    this.$store.getters.providerService
      .isAdmin()
      .then(response => {
        this.general.isAdmin = response.isInRole == null ? false : true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {}
};
</script>

<style scoped>
</style>