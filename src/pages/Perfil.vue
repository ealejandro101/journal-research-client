<template>
  <div class="container-fluid min-vh-100">
    <div class="row min-vh-100">
      <div class="col-12 align-self-start p-0">
        <header-research></header-research>
      </div>
      <div class="page col-12 p-0 d-flex justify-content-center">
        <div class="container-fluid">
          <div class="row">
            <div v-if="general.isAdmin === undefined">

            </div>
            <div v-else-if="general.isAdmin" class="col-12">
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
import HeaderResearch from "@/components/generals/HeaderResearch";
import FooterResearch from "@/components/generals/FooterResearch";
import Editor from "@/components/editor/Editor";
import Admin from "@/components/admin/Admin";

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
        isAdmin: undefined
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
.page{
  min-height: 65vh;
}
</style>