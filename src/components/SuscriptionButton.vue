<template>
    <button @click="subscribe" class="btn" :class="{ 'btn-success': isUserLogged && !isSubscribed,'btn-secondary': !isUserLogged || isUserLogged && isSubscribed, 'cursor-not-allowed': !isUserLogged }">
        <i class="fas fa-plus-square"></i>
        <span v-text="buttonText"></span>
    </button>
</template>

<script>
import { EventBus } from '@/event-bus.js';

export default {
    name: 'suscription-button',
    props: {
        text: {
            type: String,
            default: 'Suscribirse'
        },
        isSubscribed: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            isUserLogged: false,
            buttonText: ''

        }
    },
    created(){
        let _self = this
        EventBus.$on('userLogged', function(){//Se activa en el constructor de @/providerservices/providerservices.js
            _self.userIsLogged()
        })
        _self.userIsLogged()
    },
    watch: {
        isSubscribed () {
            this.userIsLogged()
        }
    },
    methods: {
        userIsLogged(){
            this.buttonText = this.text
            if (this.$store.getters.editorId !== undefined) {
                this.isUserLogged = true
                if (this.isSubscribed) {
                    this.buttonText = 'Remover suscripción'
                }
            }
        },
        subscribe(){
            if (!this.isUserLogged) {
                alert("Debes contar con una cuenta para utilizar esta opción.")
                this.$router.push({
                    path: '/Registro'
                })
                return
            }
            if (this.isSubscribed) {
                this.$emit('unsubscribe')
            }else{
                this.$emit('subscribe')
            }
        }
    }
}
</script>

<style scoped>

</style>