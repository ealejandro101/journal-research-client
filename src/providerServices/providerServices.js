import axios from "axios";

export default class ProviderService {

    constructor(rootAPI){
        this.rootAPI = rootAPI
    }

    getEnumModelFilters (){
        return Object.freeze({
            'periodicity': { reference: 'Periodicidads', title: 'Periodicidad', attributeOfText: 'periodicidad', attributeOfValue: 'id', relationModelFilter: 'infoAdicional', attributeModelFilter: 'periodicidadId' },
            'category': { reference: 'Categoria', title: 'Categoría', attributeOfText: 'nombre', attributeOfValue: 'id', relationModelFilter: 'categorias', attributeModelFilter: 'id' },
            'languages': { reference: 'Idiomas', title: 'Idioma', attributeOfText: 'idioma', attributeOfValue: 'id', relationModelFilter: 'idiomas', attributeModelFilter: 'id' },
            'licence': { reference: 'Licencia', title: 'Licencia', attributeOfText: 'licencia', attributeOfValue: 'id', relationModelFilter: null, attributeModelFilter: 'licenciaId' },
            'autoarchivePolicy': { reference: 'Politicaautoarchivos', title: 'Política de auto archivo', attributeOfText: 'politicaAutoarchivo', attributeOfValue: 'id', relationModelFilter: 'infoAdicional', attributeModelFilter: 'id' },
            'citationStyle': { reference: 'Estilocitacions', title: 'Estilo citación', attributeOfText: 'estiloCitacion', attributeOfValue: 'id', relationModelFilter: 'infoAdicional', attributeModelFilter: 'estiloCitacionId' },
            'indexations': { reference: 'Indexaciones', title: 'Indexacion', attributeOfText: 'indexaciones', attributeOfValue: 'id', relationModelFilter: 'indexaciones', attributeModelFilter: 'id' },
          })
    }

    getModel (model, query){
        let filter = query === null || query === undefined ? "" : `/?filter=${JSON.stringify(query)}`
        return axios.get(this.rootAPI + model + filter)
    }
}