import axios from "axios";
import { EventBus } from '@/event-bus.js';
import store from '@/store'

let codes = require('./responseCodes.js')

export default class ProviderService {

    constructor(rootAPI) {
        this.rootAPI = rootAPI
        this.accessToken = undefined
        let _self = this
        axios.get(this.rootAPI + '../custom/Editor/isLogged',  { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(function(res){
            _self.setAccessToken(res.data.accessToken)
            store.commit('setEditorId', res.data.identifier)
        })
    }

    setAccessToken(token){
        this.accessToken = token
        EventBus.$emit('userLogged')
    }

    getAccessToken(){
        return this.accessToken
    }

    deleteModel(model){
        return axios.delete(this.rootAPI + model,  { headers: { "Authorization": this.accessToken }, withCredentials: true })
    }

    postModel(model, data){
        return axios.post(this.rootAPI + model, data,  { headers: { "Authorization": this.accessToken }, withCredentials: true })
    }

    patchModel(model, data){
        return axios.patch(this.rootAPI + model, data, { headers: { "Authorization": this.accessToken }, withCredentials: true })
    }

    getModel(model, query) {
        let filter = query === null || query === undefined ? "" : `/?filter=${JSON.stringify(query)}`
        return axios.get(this.rootAPI + model + filter, { headers: { "Authorization": this.accessToken }, withCredentials: true })
    }

    getModelCount(model, query) {
        let filter = query === null || query === undefined ? "" : `?filter=${JSON.stringify(query)}`
        return axios.get(this.rootAPI + model + '/count' + filter,  { headers: { "Authorization": this.accessToken }, withCredentials: true })
    }

    getModelWithPagination(model, page, limit, query) {//Si se va a utilizar page and limit, se necesita establecer la query
        if (page !== null && page !== undefined) {
            query.skip = page
        }
        if (limit !== null && limit !== undefined) {
            query.limit = limit
        }
        let filter = query === null || query === undefined ? "" : `/?filter=${JSON.stringify(query)}`
        return axios.get(this.rootAPI + model + filter,  { headers: { "Authorization": this.accessToken }, withCredentials: true })
    }

    getJournalsFiltered(filter) {
        return axios.post(this.rootAPI + 'Revista/filtrar', { filtro: filter },  { headers: { "Authorization": this.accessToken }, withCredentials: true })
    }

    getJournalsFilteredOLD(filter) {
        return axios.get(this.rootAPI + 'Revista/filtrar?fitro=' + JSON.stringify(filter),  { headers: { "Authorization": this.accessToken }, withCredentials: true })
    }

    subscribeEditorJournal(journalId){
        return new Promise((resolve, reject) => {
            if (store.getters.editorId === undefined) {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
                return
            }
            axios.post(this.rootAPI + 'SuscripcionEditorRevista', { id: "", editorId: store.getters.editorId, revistaId: journalId }, { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(response => {
                resolve(response)
            }).catch(error => {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
            })
        })
    }

    subscribeEditorCategory(categoryId){
        return new Promise((resolve, reject) => {
            if (store.getters.editorId === undefined) {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
                return
            }
            axios.post(this.rootAPI + 'SuscripcionEditorCategoria', { id: "", editorId: store.getters.editorId, categoriaId: categoryId },  { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(response => {
                resolve(response)
            }).catch(error => {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
            })
        })
    }

    unsubscribeEditorJournal(journalId){
        return new Promise((resolve, reject) => {
            if (store.getters.editorId === undefined) {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
                return
            }
            axios.delete(this.rootAPI + `/Editors/${store.getters.editorId}/revistasSuscritas/rel/${journalId}`, { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(response => {
                resolve(response)
            }).catch(error => {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
            })
        })
    }

    getEditorFullObject(){
        return new Promise((resolve, reject) => {
            axios.get(this.rootAPI + '../custom/Editor/getFullObject',  { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
            })
        })
    }

    

    login(email, password) {
        return new Promise((resolve, reject) => {
            axios.post(this.rootAPI + '../custom/Editor/login', { email, password },  { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(response => {
                resolve(response.data)
            }).catch(error => {
                if (error.response.data.error.code == codes.CODES.LOGIN_FAILED.CODE) {
                    reject({
                        msg: codes.CODES.LOGIN_FAILED.MSG,
                        error
                    })
                }
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
            })
        })
    }
}