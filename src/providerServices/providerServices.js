import axios from "axios";

export default class ProviderService {

    constructor(rootAPI){
        this.rootAPI = rootAPI
    }

    getEnumModel (){
        return Object.freeze({
            'periodicity': { reference: 'Periodicidads', title: 'Periodicidad', attributeOfText: 'periodicidad', attributeOfValue: 'id' },
            'category': { reference: 'Categoria', title: 'Categoría', attributeOfText: 'nombre', attributeOfValue: 'id' },
            'languages': { reference: 'Idiomas', title: 'Idioma', attributeOfText: 'idioma', attributeOfValue: 'id' },
            'licence': { reference: 'Licencia', title: 'Licencia', attributeOfText: 'licencia', attributeOfValue: 'id' },
            'autoarchivePolicy': { reference: 'Politicaautoarchivos', title: 'Política de auto archivo', attributeOfText: 'politicaAutoarchivo', attributeOfValue: 'id' },
            'citationStyle': { reference: 'Estilocitacions', title: 'Estilo citación', attributeOfText: 'estiloCitacion', attributeOfValue: 'id' },
            'indexations': { reference: 'Indexaciones', title: 'Indexacion', attributeOfText: 'indexaciones', attributeOfValue: 'id' },
          })
    }

    getModel (model, query){
        let filter = query === null || query === undefined ? "" : `/?filter=${JSON.stringify(query)}`
        return axios.get(this.rootAPI + model + filter)
    }
}