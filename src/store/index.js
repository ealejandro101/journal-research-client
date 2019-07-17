import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        currentFilter: [],
        searchWithActiveConvocatory: false,
        str: ''

    },
    mutations:{
        setCurrentFilter(state, newFilter){
            state.currentFilter = newFilter
        },
        setSearchWithActiveConvocatory(state, value){
            state.searchWithActiveConvocatory = value
        },
        setStr(state, value){
            state.str = value
        },
    },
    getters: {
        currentFilter(state){
            return state.currentFilter
        },
        searchWithActiveConvocatory(state){
            return state.searchWithActiveConvocatory
        },
        activeConvocatoryFilter(state){
            let date = new Date()
            return {
                model: 'convocatoria',
                response: [],
                customQuery: [
                    {
                        value: `'${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}'`,
                        operator: '>=',
                        attribute: 'fecha_final',
                        isOr: false
                    },
                    {
                        value: `'${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}'`,
                        operator: '<=',
                        attribute: 'fecha_inicio'
                    },
                ],
                
            }
        },
        searchFilter(state){
            let filter = [
                {
                    model: 'revista',
                    response: [],
                    customQuery: [
                        {
                            value: `'%${state.str}%'`,
                            operator: 'LIKE',
                            attribute: 'descripcion',
                            isOr: true
                        },
                        {
                            value: `'%${state.str}%'`,
                            operator: 'LIKE',
                            attribute: 'titulo',
                            isOr: true
                        },
                        {
                            value: `'%${state.str}%'`,
                            operator: 'LIKE',
                            attribute: 'titulo_corto',
                            isOr: true
                        },
                        {
                            value: `'%${state.str}%'`,
                            operator: 'LIKE',
                            attribute: 'subtitulo',
                            isOr: true
                        },
                    ],
                    
                }
            ]
            return filter
        }
    }
})

export default store