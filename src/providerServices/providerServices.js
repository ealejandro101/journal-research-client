import axios from "axios";

export default class ProviderService {

    constructor(rootAPI){
        this.rootAPI = rootAPI
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