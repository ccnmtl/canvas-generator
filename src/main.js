// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'
// Vue.use(ElementUI, { locale })
import VueResource from 'vue-resource'
import store from './store/store'
import Snotify from 'vue-snotify';
import 'vue-snotify/styles/material.css';

Vue.use(VueResource);
Vue.use(Snotify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
