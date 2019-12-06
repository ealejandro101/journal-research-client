<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <b-card>
          <b-tabs small card>
            <b-tab title="Mis revistas">
              <journal-edition v-if="editor !== undefined" :mode="'editor'" :editor="editor" />
            </b-tab>
            <b-tab title="Agregar CFP">
              <cfp-add v-if="editor !== undefined" :editor="editor" />
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import JournalEdition from "@/components/admin/JournalEdition.vue";
import CfpAdd from "@/components/editor/CfpAdd.vue";


export default {
  name: "journal-edition-editor",
  components: {
    JournalEdition, CfpAdd
  },
  props: {
    editor: {
      default: undefined
    }
  },
  data() {
    return {
      tabIndex: 0,
      optionsForm: {}
    };
  },
  created() {
  },
  methods: {
    save() {}
  }
};
</script>

<style>
</style>