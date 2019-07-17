import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        currentFilter: [],
        searchWithActiveConvocatory: false,
        str: '',
        limitJournals: 15,
        lastFilterUsed: []

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
        setLastFilterUsed(state, value){
            state.lastFilterUsed = value
        }
    },
    getters: {
        currentFilter (state){
            return state.currentFilter
        },
        searchWithActiveConvocatory (state){
            return state.searchWithActiveConvocatory
        },
        activeConvocatoryFilter (state){
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
        searchFilter (state){
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
        },
        getEnumModelFilters (state){
            /* This enumeration has all the necessary properties to use the filters with the API, the following are the properties:
                Reference: this attribute is for use the value in the endpoint of each model. it is used in the method "getModel", in the "model" parameter
                Title: it is the name that is visible in the filter
                AttributeOfText: it is the name of the attribute that contains the text of each option
                AttributeOfValue: it is the name of the attribute that contains the id of the text of each option
                : it is the name of the relation of the journal model with other model
                attributeModelFilter: it is the name of the attribute of the model that contains the id of it model
            */
            return Object.freeze({
                'periodicity': { model: 'radicional', reference: 'Periodicidads', title: 'Periodicidad', attributeOfText: 'periodicidad', attributeOfValue: 'id', attributeModelFilter: 'periodicidad_id' },
                'licence': { model: 'revista', reference: 'Licencia', title: 'Licencia', attributeOfText: 'licencia', attributeOfValue: 'id', attributeModelFilter: 'licencia_id' },
                'autoarchivePolicy': { model: 'radicional', reference: 'Politicaautoarchivos', title: 'Política de auto archivo', attributeOfText: 'politicaAutoarchivo', attributeOfValue: 'id', attributeModelFilter: 'politica_autoarchivo_id' },
                'citationStyle': { model: 'radicional', reference: 'Estilocitacions', title: 'Estilo citación', attributeOfText: 'estiloCitacion', attributeOfValue: 'id', attributeModelFilter: 'estilo_citacion_id' },
                'indexations': { model: 'rindexaciones', reference: 'Indexaciones', title: 'Indexación', attributeOfText: 'indexaciones', attributeOfValue: 'id', attributeModelFilter: 'indexaciones_id' },
                'languages': { model: 'ridiomas', reference: 'Idiomas', title: 'Idioma', attributeOfText: 'idioma', attributeOfValue: 'id', attributeModelFilter: 'idioma_id' },
                'discipline': { model: 'radicional', reference: 'Disciplinas', title: 'Disciplina', attributeOfText: 'disciplina', attributeOfValue: 'id', attributeModelFilter: ['disciplina_id', 'disciplina_id1', 'disciplina_id2', 'disciplina_id3'] },
                'category': { model: 'revistascategorias', reference: 'Categoria', title: 'Categoría', attributeOfText: 'nombre', attributeOfValue: 'id', attributeModelFilter: 'categoria_id' },
                'country': { model: 'estado', reference: 'Pais', title: 'País', attributeOfText: 'name', attributeOfValue: 'id', attributeModelFilter: 'country_id' },
              })
        },
        getLimitJournals (state){
            return state.limitJournals
        },
        lastFilterUsed(state){
            return state.lastFilterUsed
        }
    }
})

export default store