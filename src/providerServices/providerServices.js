import axios from "axios";
let codes = require('./responseCodes.js')

export default class ProviderService {

    constructor(rootAPI) {
        this.rootAPI = rootAPI
        this.accessToken = undefined
        this.editorId = undefined
        this.tokenTimeToLive = localStorage.getItem('tokenTimeToLive')
        this.tokenCreated = localStorage.getItem('tokenCreated')
        this.accessToken = localStorage.getItem('token')
        this.editorId = localStorage.getItem('editorId')
        //si no esta logueado
        if (this.accessToken === undefined || this.accessToken == null || this.editorId == null || this.editorId == null) {
            this.logoutLocalStorage()
            return
        }
        //verificar el estado del token
        let currentDate = new Date()
        let tokenDate = new Date(this.tokenCreated)
        tokenDate.setSeconds(tokenDate.getSeconds() + this.tokenTimeToLive);
        if (currentDate.getTime() >= tokenDate) {
            this.logoutLocalStorage()
            location.reload();
        }
        //Verificar el estado de login en el servidor
        this.getModel(`Editors/${this.editorId}/accessTokens`).then(response => {
            axios.interceptors.request.use(config => {
                config.headers.Authorization =  this.accessToken;
                return config;
            });
        }).catch(error => {
            //Token no valido
            this.logoutLocalStorage()
            //location.reload();
        })
        
    }

    setAccessToken(token){
        this.accessToken = token
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
            if (this.editorId === undefined) {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
                return
            }
            axios.post(this.rootAPI + 'SuscripcionEditorRevista', { id: "", editorId: this.editorId, revistaId: journalId }, { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(response => {
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
            if (this.editorId === undefined) {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
                return
            }
            axios.post(this.rootAPI + 'SuscripcionEditorCategoria', { id: "", editorId: this.editorId.editorId, categoriaId: categoryId },  { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(response => {
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
            if (this.editorId.editorId === undefined) {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
                return
            }
            axios.delete(this.rootAPI + `/Editors/${this.editorId.editorId}/revistasSuscritas/rel/${journalId}`, { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(response => {
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
            axios.get(this.rootAPI + '../custom/Editor/getFullObject',  { withCredentials: true }).then(response => {
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
                console.log(response);
                
                localStorage.setItem('token', response.data.id);
                localStorage.setItem('editorId', response.data.userId)
                localStorage.setItem('tokenTimeToLive', response.data.ttl)
                localStorage.setItem('tokenCreated',  response.data.created)
                resolve(response.data)
            }).catch(error => {
                if (codes.CODES[error.response.data.error.code] !== undefined && codes.CODES[error.response.data.error.code] !== null) {
                    reject({
                        msg: codes.CODES[error.response.data.error.code].MSG,
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

    logoutLocalStorage(){
        localStorage.removeItem('token');
        localStorage.removeItem('editorId');
        localStorage.removeItem('tokenTimeToLive')
        localStorage.removeItem('tokenCreated')
    }

    logout() {
        return new Promise((resolve, reject) => {
            axios.get(this.rootAPI + '../custom/Editor/logout', { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(response => {
                this.logoutLocalStorage()
                resolve(response.data)
            }).catch(error => {
                this.logoutLocalStorage()
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
            })
        })
    }

    isAdmin() {
        return new Promise((resolve, reject) => {
            axios.get(this.rootAPI + '../custom/Roles/isAdmin', { headers: { "Authorization": this.accessToken }, withCredentials: true }).then(response => {
                resolve(response.data)
            }).catch(error => {
                this.logoutLocalStorage()
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
            })
        })
    }
}