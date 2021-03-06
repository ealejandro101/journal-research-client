// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index.js'
import 'es6-promise/auto'
import BootstrapVue from "bootstrap-vue"
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCarousel from 'vue-carousel';
import { VueEditor } from "vue2-editor";
import zingchartVue from 'zingchart-vue';

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('zingchart', zingchartVue);

Vue.use(VueEditor);
Vue.use(BootstrapVue)
Vue.use(VueCarousel);
Vue.config.productionTip = false

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

// variables globales
Vue.mixin({
  data() {
    return {
      urlBaseApi:"http://localhost:3000/api/",
      get urlBase() {
        return "http://localhost:3000/api/";
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
