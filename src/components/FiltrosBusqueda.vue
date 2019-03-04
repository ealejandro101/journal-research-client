<template>
    <div>
        <h6><strong>Filtros de búsqueda</strong></h6>
        <div>
            <hr class="m-0">
            <div v-for="(filter, indexFilter) in filtersWithOptions" :key="indexFilter">
                <div @click="showFilter(filter)" class="cursor-pointer pt-3 pb-3">
                    <p v-text="filter.name" class="m-0"></p>
                </div>
                <div :class="filter.style">
                    <ul class="ulOptions">
                        <li v-for="(option, indexOption) in filter.options" :key="indexOption" class="d-flex">
                            <input type="checkbox" :id="`input-${indexFilter}-${indexOption}`" class="w-25 align-self-center" /> 
                            <label :for="`input-${indexFilter}-${indexOption}`" v-text="option.text" class="w-75 text-left pr-2"></label>
                        </li>
                    </ul>
                </div>
                <hr class="m-0">
            </div>
        </div>
    </div>
</template>

<script>
import ProviderService from "@/providerServices/providerServices.js"
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
                filtersWithOptions: [
                    {
                        name: 'APC',
                        style: 'filterHidden',
                        options: [
                            {
                                text: 'Si',
                                value: 1
                            },
                            {
                                text: 'No',
                                value: 0
                            }
                        ]
                    }
                ],
            };
        },
        methods: {
            showFilter(filter){
                filter.style = filter.style === 'filterVisible' ? 'filterHidden' : 'filterVisible';
            }
        },
        mounted (){
            let providerService = new ProviderService(process.env.ROOT_API)
            let filters = providerService.getEnumModel()
            for (const key in filters) {
                providerService.getModel(filters[key].reference).then(response => {
                    let newFilter = {
                        name: filters[key].title,
                        style: 'filterHidden',
                        options: []
                    }
                    for (const iterator of response.data) {
                        newFilter.options.push({
                            text: iterator[filters[key].attributeOfText],
                            value: iterator[filters[key].attributeOfValue]
                        })
                    }
                    this.filtersWithOptions.push(newFilter)
                })
            }
        }
    }
</script>

<style scoped>
.tituloFiltro{
    background-color: #fff;
    border-color: #fff;
    color: #000;
}
.iconos {
  width: 40px;
  height: 30px;
}

.check{
    margin: 0px;
    padding: 0px;
    width: 100%;
}
.filterHidden{
    display: none;
}
.filterVisible{
    display: inline;
}
.ulOptions{
    list-style: none;
    padding: 0px;
}
</style>