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
            relationModelFilter: it is the name of the relation of the journal model with other model
            attributeModelFilter: it is the name of the attribute of the model that contains the id of it model
        */
        return Object.freeze({
            'periodicity': { reference: 'Periodicidads', title: 'Periodicidad', attributeOfText: 'periodicidad', attributeOfValue: 'id', relationModelFilter: 'infoAdicional', attributeModelFilter: 'periodicidadId' },
            'licence': { reference: 'Licencia', title: 'Licencia', attributeOfText: 'licencia', attributeOfValue: 'id', relationModelFilter: null, attributeModelFilter: 'licenciaId' },
            'autoarchivePolicy': { reference: 'Politicaautoarchivos', title: 'Política de auto archivo', attributeOfText: 'politicaAutoarchivo', attributeOfValue: 'id', relationModelFilter: 'infoAdicional', attributeModelFilter: 'politicaAutoarchivoId' },
            'citationStyle': { reference: 'Estilocitacions', title: 'Estilo citación', attributeOfText: 'estiloCitacion', attributeOfValue: 'id', relationModelFilter: 'infoAdicional', attributeModelFilter: 'estiloCitacionId' },
            'indexations': { reference: 'Indexaciones', title: 'Indexación', attributeOfText: 'indexaciones', attributeOfValue: 'id', relationModelFilter: 'indexaciones', attributeModelFilter: 'indexacionesId' },
            'languages': { reference: 'Idiomas', title: 'Idioma', attributeOfText: 'idioma', attributeOfValue: 'id', relationModelFilter: 'idiomas', attributeModelFilter: 'id' },
            /*'discipline': { reference: 'Disciplinas', title: 'Disciplina', attributeOfText: 'disciplina', attributeOfValue: 'id', relationModelFilter: 'infoAdicional', attributeModelFilter: ['disciplinaId', 'disciplinaId1', 'disciplinaId2', 'disciplinaId3'] },*/
            'category': { reference: 'Categoria', title: 'Categoría', attributeOfText: 'nombre', attributeOfValue: 'id', relationModelFilter: 'categorias', attributeModelFilter: 'id' },
            /*'country': { reference: 'Pais', title: 'País', attributeOfText: 'name', attributeOfValue: 'id', relationModelFilter: 'pais', attributeModelFilter: 'id' },*/
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
        return axios.get(this.rootAPI + 'Revista/filtrar?filtro=' + JSON.stringify(filter))
    }
}