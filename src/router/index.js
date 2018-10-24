import Vue from "vue";
import Router from "vue-router";
import Research from "@/pages/Research";
import Revistas from "@/pages/Revistas";
import InfoResearcH from "@/pages/InfoResearcH";
import FormularioNuevaRevista from "@/pages/FormularioNuevaRevista";
import Login from "@/pages/Login";
import Registro from "@/pages/Registro";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Research",
      component: Research
    },
    {
      path: "/ListaRevistas",
      name: "Revistas",
      component: Revistas
    },
    {
      path: "/ListaRevistas/:search",
      name: "RevistasParam",
      component: Revistas
    },
    {
      path: "/InfoResearcH",
      name: "InfoResearcH",
      component: InfoResearcH
    },
    {
      path: "/FormularioNuevaRevista",
      name: "FormularioNuevaRevista",
      component: FormularioNuevaRevista
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/Registro",
      name: "Registro",
      component: Registro
    }
  ]
});
