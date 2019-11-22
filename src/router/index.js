import Vue from "vue";
import Router from "vue-router";
import Research from "@/pages/Research";
import Revistas from "@/pages/Revistas";
import InfoResearcH from "@/pages/InfoResearcH";
import NewJournal from "@/pages/NewJournal";
import Login from "@/pages/Login";
import Registro from "@/pages/Registro";
import Revista from "@/pages/Revista"
import Perfil from "@/pages/Perfil"

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Research",
      component: Research,
      meta: {
        allowedForGuest: true,
        allowedForUser: true
      }
    },
    {
      path: "/Revista/:search",
      name: "Research",
      component: Revista,
      meta: {
        allowedForGuest: true,
        allowedForUser: true
      }
    },
    {
      path: "/ListaRevistas",
      name: "Revistas",
      component: Revistas,
      meta: {
        allowedForGuest: true,
        allowedForUser: true
      }
    },
    {
      path: "/ListaRevistas/:search",
      name: "RevistasParam",
      component: Revistas,
      meta: {
        allowedForGuest: true,
        allowedForUser: true
      }
    },
    {
      path: "/InfoResearcH",
      name: "InfoResearcH",
      component: InfoResearcH,
      meta: {
        allowedForGuest: true,
        allowedForUser: true
      }
    },
    {
      path: "/NewJournal",
      name: "NewJournal",
      component: NewJournal,
      meta: {
        allowedForGuest: true,
        allowedForUser: true
      }
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
      meta: {
        allowedForGuest: true,
        allowedForUser: false
      }
    },
    {
      path: "/Registro",
      name: "Registro",
      component: Registro,
      meta: {
        allowedForGuest: true,
        allowedForUser: false
      }
    },
    {
      path: "/Perfil",
      name: "Perfil",
      component: Perfil,
      meta: {
        allowedForGuest: false,
        allowedForUser: true
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => { 
  if ((!to.matched.some(record => record.meta.allowedForUser) && (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null))
      || (!to.matched.some(record => record.meta.allowedForGuest) && !(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null))) { 
      next({ 
         path: '/'
      });
  } else {
      next();
  }
});

export default router