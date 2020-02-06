<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 py-4 d-flex justify-content-around align-items-center">
        <span class="font-weight-bolder">Editor</span>
        <button @click="closeSession" class="btn btn-warning">
          <i class="fas fa-sign-out-alt"></i> Cerrar sesión
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div v-if="editor !== undefined" role="tablist">
          <b-card v-if="editor.propietarioRevista.length !== 0" no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-edit-journal variant="light">
                <p class="text-left font-weight-bold m-0">Edición de revistas</p>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-edit-journal" visible accordion="my-accordion" role="tabpanel">
              <journal-edition-editor v-if="editor !== undefined" :editor="editor" />
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-perfil-edition variant="light">
                <p class="text-left font-weight-bold m-0">Perfil</p>
              </b-button>
            </b-card-header>
            <b-collapse id="accordion-perfil-edition" visible accordion="my-accordion" role="tabpanel">
              <perfil-edition :editor="editor" />
            </b-collapse>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JournalEditionEditor from "@/components/editor/JournalEditionEditor.vue";
import PerfilEdition from "@/components/editor/PerfilEdition.vue";
import mixins from "@/utilities/mixins.js"

export default {
  name: "admin",
  components: {
    PerfilEdition,
    JournalEditionEditor
  },
  mixins: [mixins],
  data(){
    return {
      editor: undefined
    }
  },
  created(){
    this.$store.getters.providerService.postModel('../custom/Admin/Stadistic/getGeneralStadistics').then(res => {
      console.log(res);
      
    })

    this.$store.getters.providerService
      .getEditorFullObject()
      .then(response => {
        this.editor = response.editor;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    
  }
};
</script>

<style>
</style>