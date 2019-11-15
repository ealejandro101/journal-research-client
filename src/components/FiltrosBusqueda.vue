<template>
  <div>
    <h6>
      <strong>Filtros de búsqueda</strong>
    </h6>
    <div>
      <div>
        <hr class="m-0" />
        <div class="d-flex align-items-center py-2">
          <input
            type="checkbox"
            id="input-convocatoria"
            class="w-25 align-self-center"
            v-model="activeConvocatory"
            @change="selectOption(activeConvocatory)"
          />
          <label for="input-convocatoria" class="w-75 text-left pr-2 my-0">CFP Activa</label>
        </div>
        <hr class="m-0" />
      </div>
      <div v-for="(filter, indexFilter) in filtersWithOptions" :key="indexFilter">
        <div @click="showFilter(filter)" class="cursor-pointer py-2">
          <p v-text="filter.name" class="m-0"></p>
        </div>
        <div :class="filter.style">
          <ul class="ulOptions">
            <li v-for="(option, indexOption) in filter.options" :key="indexOption" class="d-flex">
              <template v-if="indexOption < 10">
                <input
                  type="checkbox"
                  :id="`input-${indexFilter}-${indexOption}`"
                  :value="option.value"
                  v-model="filter.response"
                  class="w-25 align-self-center"
                  @change="selectOption(filter.response)"
                />
                <label
                  :for="`input-${indexFilter}-${indexOption}`"
                  v-text="option.text"
                  class="w-75 text-left pr-2"
                ></label>
              </template>
            </li>
            <li v-if="filter.options.length >= 10">
              <b-button
                v-b-modal.modalOpenFilter
                @click="showLargeFilter(indexFilter)"
                variant="none"
              >Ver mas...</b-button>
            </li>
          </ul>
        </div>
        <hr class="m-0" />
      </div>
    </div>
    <b-modal id="modalOpenFilter" title="Filtro">
      <div class="container-fluid">
        <ul class="ulOptions row">
          <li
            v-for="(option, indexOption) in filtersWithOptions[indexOpenFilter].options"
            :key="indexOption"
            class="col-12 col-md-6 col-xl-4 d-flex align-items-center"
          >
            <div class="d-flex w-100">
              <input
                type="checkbox"
                :id="`input-modal-${indexOption}`"
                :value="option.value"
                v-model="filtersWithOptions[indexOpenFilter].response"
                class="w-25 align-self-center"
                @change="selectOption(filtersWithOptions[indexOpenFilter].response)"
              />
              <label
                :for="`input-modal-${indexOption}`"
                v-text="option.text"
                class="w-75 text-left"
              ></label>
            </div>
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ProviderService from "@/providerServices/providerServices.js";
import ingenieriaLogo from "@/assets/ingenieria-200x167.png";
import cienciasAgricolas from "@/assets/ciencias-agricolas-y-ambientales-200x167.png";
import cienciasBiologicas from "@/assets/ciencias-biologicas-200x167.png";
import cienciasSalud from "@/assets/ciencias-de-la-salud-200x167.png";
import cienciasSociales from "@/assets/ciencias-sociales-200x167.png";
import humanidades from "@/assets/humanidades-200x167.png";
import cienciasExactas from "@/assets/ciencias-exactas-y-de-la-Tierra-200x167.png";
import linguisticaLiteraturaArtes from "@/assets/linguistica200x167.png";
export default {
  name: "filtros-busqueda",
  data() {
    return {
      providerService: null,
      activeConvocatory: false,
      indexOpenFilter: 0,
      filtersWithOptions: [
        {
          name: "APC",
          style: "filterHidden",
          response: [],
          options: [
            {
              text: "Si",
              value: 1
            },
            {
              text: "No",
              value: 0
            }
          ],
          key: null,
          attributeModelFilter: "apc",
          isLarge: false,
          model: "radicional"
        }
      ],
      enumFilters: undefined
    };
  },
  mounted() {
    let currentFilter = this.$store.getters.currentFilter;
    this.providerService = new ProviderService(process.env.ROOT_API);
    this.enumFilters = this.$store.getters.getEnumModelFilters;
    //Aqui se obtienen los filtros actuales (curretFilter) para los filtros que no se comportan igual que los filtros de seleccion multiple (tambien APC aqui :v)
    let currentApcFilter = currentFilter.find(function(element) {
      return element.model == "radicional" && element.attribute == "apc";
    });
    if (currentApcFilter != undefined) {
      //0 porque es el primero en este punto
      this.filtersWithOptions[0].response = currentApcFilter.response;
    }
    let currentConvocatoryFilter = currentFilter.find(function(element) {
      return element.model == "convocatoria";
    });
    if (currentConvocatoryFilter != undefined) {
      if (currentConvocatoryFilter.customQuery.length > 0) {
        this.activeConvocatory = true;
      }
    }
    //Aqui se obtienen todos los datos necesarios para pintar los filtros de seleccion multiple
    for (const key in this.enumFilters) {
      this.providerService
        .getModelCount(this.enumFilters[key].reference)
        .then(response => {
          let _self = this;
          let current = currentFilter.find(function(element) {
            return (
              element.model == _self.enumFilters[key].model &&
              element.attribute == _self.enumFilters[key].attributeModelFilter
            );
          });
          if (current === undefined) {
            current = {};
            current.response = [];
          }
          let newFilter = {
            key: key,
            name: this.enumFilters[key].title,
            style: "filterHidden",
            options: [],
            response: current.response,
            model: this.enumFilters[key].model,
            reference: this.enumFilters[key].reference,
            attributeModelFilter: this.enumFilters[key].attributeModelFilter,
            attributeOfText: this.enumFilters[key].attributeOfText,
            attributeOfValue: this.enumFilters[key].attributeOfValue
          };
          newFilter.isLarge = response.data.count > 10;
          if (newFilter.isLarge) {
            newFilter.openLargeFilter = false;
          }
          let filter = {
            order: `${this.enumFilters[key].attributeOfText} ASC`,
            where: {}
          };
          if (key == "country") {
            filter.where = {
              hayrevista: 1
            };
          }
          if (key == "discipline") {
            this.providerService.getModel('Disciplinas/used').then(response => {
              for (const iterator of response.data.disciplinas) {
                  newFilter.options.push({
                    text: iterator[this.enumFilters[key].attributeOfText],
                    value: iterator[this.enumFilters[key].attributeOfValue]
                  });
                }
                this.filtersWithOptions.unshift(newFilter);
            })
          }else{
            this.providerService
              .getModelWithPagination(
                this.enumFilters[key].reference,
                undefined,
                10,
                filter
              )
              .then(response => {
                for (const iterator of response.data) {
                  newFilter.options.push({
                    text: iterator[this.enumFilters[key].attributeOfText],
                    value: iterator[this.enumFilters[key].attributeOfValue]
                  });
                }
                this.filtersWithOptions.unshift(newFilter);
              });
          }
          
        });
    }
  },
  methods: {
    showFilter(filter) {
      filter.style =
        filter.style === "filterVisible" ? "filterHidden" : "filterVisible";
    },
    selectOption(option) {
      let filter = [];
      for (const iterator of this.filtersWithOptions) {
        filter.push({
          model: iterator.model,
          response: iterator.response,
          attribute: iterator.attributeModelFilter
        });
      }
      if (this.activeConvocatory) {
        filter.push(this.$store.getters.activeConvocatoryFilter);
      }
      let filterComplete = {
        filters: filter,
        extra: {
          page: 1,
          order: "revista.titulo ASC",
          limit: this.$store.getters.getLimitJournals
        }
      };
      this.$store.commit("setCurrentFilter", filter);
      this.$store.commit("setLastFilterUsed", filter);
      this.$emit("applyFilters", filterComplete);
    },
    showLargeFilter(index) {
      let options = [];
      this.indexOpenFilter = index;
      let filter = {
        order: `${this.filtersWithOptions[index].attributeOfText} ASC`,
        where: {}
      };
      if (this.filtersWithOptions[index].reference == "Pais") {
        filter.where.hayrevista = 1;
      }
      this.filtersWithOptions[index].openLargeFilter = true;
      if (this.filtersWithOptions[index].reference == "Disciplinas") {
        this.providerService.getModel('Disciplinas/used').then(response => {
          for (const iterator of response.data.disciplinas) {
            options.push({
              text: iterator[this.filtersWithOptions[index].attributeOfText],
              value: iterator[this.filtersWithOptions[index].attributeOfValue]
            });
          }
          this.filtersWithOptions[index].options = options;
        })
      }else{
        this.providerService
          .getModel(this.filtersWithOptions[index].reference, filter)
          .then(response => {
            for (const iterator of response.data) {
              options.push({
                text: iterator[this.filtersWithOptions[index].attributeOfText],
                value: iterator[this.filtersWithOptions[index].attributeOfValue]
              });
            }
            this.filtersWithOptions[index].options = options;
        });
      }
    }
  },
  watch: {}
};
</script>

<style scoped>
.tituloFiltro {
  background-color: #fff;
  border-color: #fff;
  color: #000;
}
.iconos {
  width: 40px;
  height: 30px;
}

.check {
  margin: 0px;
  padding: 0px;
  width: 100%;
}
.filterHidden {
  display: none;
}
.filterVisible {
  display: inline;
}
.ulOptions {
  list-style: none;
  padding: 0px;
}
.divLargeFilter {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>