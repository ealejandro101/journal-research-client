<template>
    <div>
        <h6><strong>Filtros de búsqueda</strong></h6>
        <div>
            <div>
                <hr>
                <div class="d-flex align-items-center">
                    <input 
                    type="checkbox" 
                    id="input-convocatoria" 
                    class="w-25 align-self-center" 
                    /> 
                    <label for="input-convocatoria" class="w-75 text-left pr-2 my-0">CFP Activa</label>
                </div>
                <hr>
            </div>
            <div v-for="(filter, indexFilter) in filtersWithOptions" :key="indexFilter">
                <div @click="showFilter(filter)" class="cursor-pointer pt-3 pb-3">
                    <p v-text="filter.name" class="m-0"></p>
                </div>
                <div :class="filter.style">
                    <ul class="ulOptions">
                        <li v-for="(option, indexOption) in filter.options" :key="indexOption" class="d-flex">
                            <input 
                                type="checkbox" 
                                :id="`input-${indexFilter}-${indexOption}`" 
                                :value="option.value"
                                v-model="filter.response" 
                                class="w-25 align-self-center" 
                                @change="selectOption(filter.response)"
                            /> 
                            <label :for="`input-${indexFilter}-${indexOption}`" v-text="option.text" class="w-75 text-left pr-2"></label>
                        </li>
                        <li v-if="filter.isLarge">
                            <p class="text-left pl-3">Ver mas...</p>
                        </li>
                    </ul>
                </div>
                <hr class="m-0">
            </div>
        </div>
        <div v-if="showLargeFilter" class="container-popup">
            <div class="content-popup">
                <ul class="ulOptions">
                    <li v-for="(option, indexOption) in filter.options" :key="indexOption" class="d-flex">
                        <input 
                            type="checkbox" 
                            :id="`input-${indexFilter}-${indexOption}`" 
                            :value="option.value"
                            v-model="filter.response" 
                            class="w-25 align-self-center" 
                            @change="selectOption(filter.response)"
                        /> 
                        <label :for="`input-${indexFilter}-${indexOption}`" v-text="option.text" class="w-75 text-left pr-2"></label>
                    </li>
                </ul>
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
                        response: [],
                        options: [
                            {
                                text: 'Si',
                                value: 1
                            },
                            {
                                text: 'No',
                                value: 0
                            }
                        ],
                        key: null,
                        relationModelFilter: 'infoAdicional', 
                        attributeModelFilter: 'apc',
                        isLarge: false
                    }
                ],
                enumFilters: undefined,
                showLargeFilter: false
            };
        },
        mounted (){
            let providerService = new ProviderService(process.env.ROOT_API)
            this.enumFilters = providerService.getEnumModelFilters()
            for (const key in this.enumFilters) {
                providerService.getModelCount(this.enumFilters[key].reference).then(response => {
                    let newFilter = {
                        key: key,
                        name: this.enumFilters[key].title,
                        style: 'filterHidden',
                        options: [],
                        response: []
                    }
                    newFilter.isLarge = response.data.count > 10
                    let filter = {
                        order: `${this.enumFilters[key].attributeOfText} ASC`
                    }
                    providerService.getModelWithPagination(this.enumFilters[key].reference, undefined, 10, filter).then(response => {
                        for (const iterator of response.data) {
                            newFilter.options.push({
                                text: iterator[this.enumFilters[key].attributeOfText],
                                value: iterator[this.enumFilters[key].attributeOfValue]
                            })
                        }
                        this.filtersWithOptions.unshift(newFilter)
                    })
                })
            }
        },
        methods: {
            showFilter(filter){
                filter.style = filter.style === 'filterVisible' ? 'filterHidden' : 'filterVisible';
            },
            selectOption (option){
                console.log(this.filtersWithOptions);
                
                let filter = {}
                for (const iterator of this.filtersWithOptions) {
                    if(iterator.response.length > 0){// Si se utilizo el filtro
                        let arrayConditions = []
                        let attributeFilter = undefined
                        let modelFilter = undefined
                        if(iterator.key === null){
                            attributeFilter = iterator.attributeModelFilter
                            modelFilter = iterator.relationModelFilter
                        }else{
                            attributeFilter = this.enumFilters[iterator.key].attributeModelFilter
                            modelFilter = this.enumFilters[iterator.key].relationModelFilter
                        }
                        for (const iteratorCondition of iterator.response) {
                            let condition = {}
                            if (Array.isArray(attributeFilter)) {
                                for (const atrFilt of attributeFilter) {
                                    condition = {}
                                    condition[atrFilt] = iteratorCondition
                                    arrayConditions.push(condition)
                                }
                            }else{
                                condition[attributeFilter] = iteratorCondition
                                arrayConditions.push(condition)
                            }
                        }
                        if(modelFilter === null){//Si el modelo es la misma revista no se debe incluir nada
                            if (filter.where === undefined || filter.where.or === undefined) {
                                filter.where = {}
                                filter.where.or = arrayConditions
                            } else {
                                filter.where.or.push(arrayConditions)
                            }
                        }else{//En este caso si
                            if (filter.include === undefined) {
                                filter.include = []
                            }
                            let thereRelation = false
                            for (const iteratorIncludes of filter.include) {
                                if (iteratorIncludes.relation === modelFilter) {
                                    thereRelation = true
                                    iteratorIncludes.scope.where.and.push({
                                        or: arrayConditions
                                    })
                                    break
                                }
                            }
                            if(!thereRelation){
                                filter.include.push({
                                    "relation": modelFilter,
                                    "scope": {
                                        "where": {
                                            "and": [
                                                {
                                                    "or": arrayConditions
                                                }
                                            ]
                                        }
                                    }
                                })
                            }
                        }
                    }
                }
                this.$emit('applyFilters', filter)
            }
        },
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