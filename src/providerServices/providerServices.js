import axios from "axios";

export default class ProviderService {

    constructor(rootAPI){
        this.rootAPI = rootAPI
    }

    getEnumModelFilters (){
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
            /*'discipline': { model: 'disciplina', reference: 'Disciplinas', title: 'Disciplina', attributeOfText: 'disciplina', attributeOfValue: 'id', : 'infoAdicional', attributeModelFilter: ['disciplinaId', 'disciplinaId1', 'disciplinaId2', 'disciplinaId3'] },*/
            'category': { model: 'revistascategorias', reference: 'Categoria', title: 'Categoría', attributeOfText: 'nombre', attributeOfValue: 'id', attributeModelFilter: 'categoria_id' },
            'country': { model: 'estado', reference: 'Pais', title: 'País', attributeOfText: 'name', attributeOfValue: 'id', attributeModelFilter: 'country_id' },
          })
    }

    getModel (model, query){
        let filter = query === null || query === undefined ? "" : `/?filter=${JSON.stringify(query)}`
        return axios.get(this.rootAPI + model + filter)
    }

    getModelCount (model, query){
        let filter = query === null || query === undefined ? "" : `?filter=${JSON.stringify(query)}`
        return axios.get(this.rootAPI + model + '/count' + filter)
    }

    getModelWithPagination (model, page, limit, query){//Si se va a utilizar page and limit, se necesita establecer la query
        if (page !== null && page !== undefined) {
            query.skip = page
        }
        if (limit !== null && limit !== undefined) {
            query.limit = limit
        }
        let filter = query === null || query === undefined ? "" : `/?filter=${JSON.stringify(query)}`
        return axios.get(this.rootAPI + model + filter)
    }

    getJournalsFiltered (filter){
        return axios.post(this.rootAPI + 'Revista/filtrar', { filtro: filter} )
    }

    getJournalsFilteredOLD (filter){
        return axios.get(this.rootAPI + 'Revista/filtrar?filtro=' + JSON.stringify(filter))
    }
}