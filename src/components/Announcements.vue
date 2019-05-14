<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col">
        <carousel :perPageCustom="[[576, 2],[768,4],[992,6]]" style="width: 100%">
          <slide v-for="item in announcements" :key="item.id">
            <div class="cardAnnouncement cursor-pointer" @click="onClickAnnouncements(item.revista)">
              <div class="container">
                <div class="row">
                  <div class="col d-flex justify-content-center">
                    <div class="divImg">
                      <img :src="item.revista.imagen || item.imagen || imgAux" alt="Img">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <hr>
                    <p v-text="item.titulo"></p>
                  </div>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import ProviderService from "../providerServices/providerServices.js";
import imgAux from "@/assets/journalImgDefault.jpeg";
export default {
  name: "announcements",
  data() {
    return {
      announcements: [],
      imgAux: imgAux
    };
  },
  props: [],
  created() {
    let _self = this;
    let providerServices = new ProviderService(process.env.ROOT_API);
    providerServices
      .getModel("Convocatoria", {
        where: {
          fechaFinal: {
            gte: Date.now()
          }
        },
        include: {
          relation: "revista",
          scope: {
            fields: ["imagen", "eissn", "issn"]
          }
        }
      })
      .then(response => {
        _self.announcements = response.data;
      });
  },
  methods: {
    onClickAnnouncements(revista) {
      this.$emit("announcements:click", revista);
    }
  },
  filters: {
    
  }
};
</script>

<style scoped>
.divImg {
  max-width: 10em;
}
.divImg img {
  max-height: 10em;
  width: auto;
}
.cardAnnouncement {
  padding: 1em;
  margin: 0px 1em;
  border: solid;
  border-radius: 0.5em;
  border-width: thin;
  border-color: gray;
  height: 100%;
}
</style>
