<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 py-4 d-flex justify-content-around align-items-center">
        <span class="font-weight-bolder">Panel Administrativo</span>
        <button @click="closeSession" class="btn btn-warning"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-edit-journal variant="light">
                <p class="text-left font-weight-bold m-0">Edición de revistas</p>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-edit-journal" accordion="my-accordion" role="tabpanel">
              <journal-edition />
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-cfp-approval variant="light">
                <p class="text-left font-weight-bold m-0">Aprobacion de CFP</p>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-cfp-approval" accordion="my-accordion" role="tabpanel">
              <cfp-approval></cfp-approval>
            </b-collapse>
          </b-card>
          <!--<b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-edit-journal variant="light">
                <p class="text-left font-weight-bold m-0">Estadisticas</p>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-edit-journal" accordion="my-accordion" role="tabpanel">
              
            </b-collapse>
          </b-card>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JournalEdition from "@/components/admin/JournalEdition.vue";
import CfpApproval from "@/components/admin/CfpApproval.vue";
import mixins from "@/utilities/mixins.js"

export default {
  name: "admin",
  components: {
    CfpApproval,
    JournalEdition
  },
  mixins: [mixins],
  data(){
    return {
    }
  },
  created(){
  },
  methods: {
    
  }
};
</script>

<style>
</style>