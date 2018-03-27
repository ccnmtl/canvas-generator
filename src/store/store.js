import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'

import defaults from './components/defaults'
import theme from './components/theme'

Vue.use(Vuex);

var moment = require('moment');

export default new Vuex.Store({
  state: {

    //DEFAULTS AND THEME ALSO INJECTED HERE THROUGH MODULES

    //GENERAL COURSE INFO
    info: _.cloneDeep(defaults.state.infoDefault),

    // Where the weeks are stored
    weeks: [],

    // UTILS
    loading: false,
    settingsFormVisible: false,
    prevPage: "/home",
    nextPage: "/weekly",
    imageServer: "https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/",
  },
  getters: {
    getStore: state => state,
    getInfo: state => state.info,
    loading: state => state.loading,
    getWeeks: state => state.weeks,

  },
  mutations: {
    updateInfo: (state, payload) => {
      state.info = payload
    },
    updateStore: (state, payload) => {
      state = payload
    },
    updateLoading: (state, payload) => {
      state.loading = payload
    },
    addWeek: (state, payload) => {
      state.weeks.push(payload)
    },
    sliceWeek: (state, num) => {
      state.weeks = state.weeks.slice(0,num)
    },
    updateWeeks: (state, payload) => {
      state.weeks = payload
    },
    updateWeek: (state, index, field, value) => {
      state.weeks[index][field] = value
    }
  },
  modules: {
    defaults,
    theme
  },
  // plugins: [createPersistedState()]
})
