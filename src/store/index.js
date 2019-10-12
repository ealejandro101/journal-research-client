import Vue from 'vue'
import Vuex from 'vuex'
import ProviderService from '@/providerServices/providerServices';
import headerOptions from '@/utilities/headerOptions.js'
import models from '@/utilities/models.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        currentFilter: [],
        searchWithActiveConvocatory: false,
        str: '',
        limitJournals: 15,
        lastFilterUsed: [],
        providerService: new ProviderService(process.env.ROOT_API),
        currentPage: undefined,
        editorId: localStorage.getItem('editorId')

    },
    mutations:{
        setCurrentPage(state, currentPage){
            state.currentPage = currentPage
        },
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
        },
        resetCurrentFilter(state){
            state.currentFilter = []
        },
        setAccessToken(state, value){
            state.providerService.setAccessToken(value)
        },
        setEditorId(state, value){
            state.editorId = value
        },
        logout(state){
            state.providerService.setAccessToken(undefined)
            state.editorId = undefined
        }
    },
    getters: {
        editorId(state){
            return state.editorId
        },
        models(){
            return models
        },
        providerService (state){
            return state.providerService
        },
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
                        value: `'${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`,
                        operator: '>=',
                        attribute: 'fecha_final',
                        isOr: false
                    },
                    {
                        value: `'${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`,
                        operator: '<=',
                        attribute: 'fecha_inicio'
                    },
                ],
                
            }
        },
        searchFilter (state){
            let customQuery = [
                {
                    value: `'%${state.str}%'`,
                    operator: 'LIKE',
                    attribute: 'descripcion',
                    model: 'revista',
                    isOr: true
                },
                {
                    value: `'%${state.str}%'`,
                    operator: 'LIKE',
                    attribute: 'titulo',
                    model: 'revista',
                    isOr: true
                },
                {
                    value: `'%${state.str}%'`,
                    operator: 'LIKE',
                    attribute: 'titulo_corto',
                    model: 'revista',
                    isOr: true
                },
                {
                    value: `'%${state.str}%'`,
                    operator: 'LIKE',
                    attribute: 'subtitulo',
                    model: 'revista',
                    isOr: true
                }
            ]
            for (const iterator of state.str.split(" ")) {
                customQuery.push({
                    value: `'%${iterator}%'`,
                    operator: 'LIKE',
                    attribute: 'palabra_clave',
                    model: 'palabraclave',
                    isOr: true
                })
            }
            let filter = [
                {
                    model: 'palabrasclave',
                    response: [],
                    customQuery: customQuery
                    
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
                'autoarchivePolicy': { model: 'radicional', reference: 'Politicaautoarchivos', title: 'Política de autoarchivo', attributeOfText: 'politicaAutoarchivo', attributeOfValue: 'id', attributeModelFilter: 'politica_autoarchivo_id' },
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
        },
        limitJournals(state){
            return state.limitJournals
        },
        header(state){
            let header
            if (state.currentPage == "research") {
                header = [
                    headerOptions.infoResearch,
                    headerOptions.newJournal,
                    headerOptions.journals
                ]
            }else{
                header = [
                    headerOptions.lobby,
                    headerOptions.infoResearch,
                    headerOptions.newJournal,
                    headerOptions.journals
                ]
            }
            if (state.editorId !== undefined && state.editorId !== null) {
                header.push(headerOptions.editor)
            }else{
                header.push(headerOptions.login)
                header.push(headerOptions.register)
            }
            return header
        },
        headerLogged(state){
            let header
            if (state.currentPage == "research") {
                header = [
                    headerOptions.infoResearch,
                    headerOptions.newJournal,
                    headerOptions.journals
                ]
            }else{
                header = [
                    headerOptions.lobby,
                    headerOptions.infoResearch,
                    headerOptions.newJournal,
                    headerOptions.journals
                ]
            }
            header.push(headerOptions.editor)
            return header
        },
        headerUnlogged(state){
            let header
            if (state.currentPage == "research") {
                header = [
                    headerOptions.infoResearch,
                    headerOptions.newJournal,
                    headerOptions.journals
                ]
            }else{
                header = [
                    headerOptions.lobby,
                    headerOptions.infoResearch,
                    headerOptions.newJournal,
                    headerOptions.journals
                ]
            }
            header.push(headerOptions.login)
            header.push(headerOptions.register)
            return header
        }
    }
})

export default store