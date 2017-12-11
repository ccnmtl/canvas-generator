// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Core App Imports
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

// Outside frameworks/components
import VueResource from 'vue-resource'
import Snotify from 'vue-snotify'
import Vuetify from 'vuetify'

// Outside styles for components
// import 'vuetify/dist/vuetify.min.css'
import 'vue-snotify/styles/material.css'

Vue.use(VueResource);
Vue.use(Snotify);
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
