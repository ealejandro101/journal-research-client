import Vue from 'vue'
import Router from 'vue-router'
import Research from '@/pages/Research'
import Revistas from '@/pages/Revistas'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Research',
        component: Research
    },
    {
        path: '/ListaRevistas',
        name: 'Revistas',
        component: Revistas
    }]
})