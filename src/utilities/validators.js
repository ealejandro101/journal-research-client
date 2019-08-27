module.exports = {
    isText(value){
        let reg = /^[A-Za-zÁÉÍÓÚñáéíóúÑ ]{1,}$/
        return reg.test(value)
    },
    isNumber(value){
        let reg = /^[0-9]{1,3}$/
        return reg.test(value)
    },
    isEmail(value){
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return reg.test(value)
    }
}