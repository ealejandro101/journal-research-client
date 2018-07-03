import Vue from 'vue'
import Router from 'vue-router'
import Research from '@/components/Research'
import Categorias from '@/components/Categorias'
import Revistas from '@/components/Revistas'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Research',
        component: Research
    }, {
        path: '/ListaCategorias',
        name: 'Categorias',
        component: Categorias
    }, {
        path: '/ListaRevistas',
        name: 'Revistas',
        component: Revistas
    }]
})