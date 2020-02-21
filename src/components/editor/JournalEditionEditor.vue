<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div v-if="journalId" class="col-12 d-flex justify-content-center">
        <VisitorStatistics 
          :journalId="journalId" 
        />
      </div>
      <div class="col-12">
        <b-card>
          <b-tabs small card>
            <b-tab title="Edición de revistas">
              <journal-edition 
                v-if="editor !== undefined" 
                @changeJournal="changeJournal"
                :mode="'editor'" 
                :editor="editor" 
              />
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
import VisitorStatistics from "@/components/journals/statistics/VisitorStatistics.vue"


export default {
  name: "journal-edition-editor",
  components: {
    JournalEdition, CfpAdd, VisitorStatistics
  },
  props: {
    editor: {
      default: undefined
    }
  },
  data() {
    return {
      tabIndex: 0,
      optionsForm: {},
      journalId: 0
    };
  },
  created() {
  },
  methods: {
    changeJournal(journalId) {
      this.journalId = journalId
    }
  }
};
</script>

<style>
</style>