import Vue from 'vue';
import Vuex from 'vuex';
import { uuid } from "vue-uuid"
import createPersistedState from 'vuex-persistedstate'
import VuexPersistence from 'vuex-persist'
import _ from 'lodash'

import defaults from './components/defaults'
import theme from './components/theme'
import cases from './components/cases'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

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
    rows: [],
    slots: [],
    dialogVisible: false,
    dialogData: {
      title: 'Choose Slot Type',
      type: 'choose-slot'
    }
  },
  getters: {
    getStore: state => state,
    getInfo: state => state.info,
    loading: state => state.loading,
    getWeeks: state => state.weeks,
    getStudents: state => state.weeks,
    isDialogVisible: state => state.dialogVisible,
    getDialogData: state => state.dialogData,
    getRowsByCID: state => {
      const res = {}

      state.rows.forEach((row) => {
        if (row.cid in res) res[row.cid].push(row)
        else res[row.cid] = [row]
      })

      return res
    },
    getSlotsByRowID: state => {
      const res = {}

      state.slots.forEach((slot) => {
        if (slot.rid in res) res[slot.rid].push(slot)
        else res[slot.rid] = [slot]
      })

      return res
    }
  },
  actions: {
    addRow: ({ commit }, row) => {
      row.rid = uuid.v1()
      commit('addRow', row)
    },
    deleteRow: ({ commit }, rid) => {
      commit('deleteRow', rid)
    },
    setDialogVisibility: ({ commit }, visibility) => {
      commit('setDialogVisibility', visibility)
    },
    setDialogData: ({ commit }, data) => {
      commit('setDialogData', data)
    },
    addSlot: ({ commit }, slot) => {
      slot.sid = uuid.v1()
      commit('addSlot', slot)
    },
    deleteSlot: ({ commit }, sid) => {
      commit('deleteSlot', sid)
    },
    updateSlotData: ({ commit }, slot) => {
      commit('updateSlotData', slot)
    },
    updateSpecificInfo: ({ commit }, payload) => {
      commit('updateSpecificInfo', payload)
    },
  },
  mutations: {
    addRow: (state, row) => {
      state.rows.push(row)
    },
    deleteRow: (state, rid) => {
      state.rows = state.rows.filter((row) => {
        return row.rid !== rid
      })
    },
    addSlot: (state, slot) => {
      state.slots.push(slot)
    },
    deleteSlot: (state, sid) => {
      state.slots = state.slots.filter((slot) => {
        return slot.sid !== sid
      })
    },
    setDialogVisibility: (state, visibility) => {
      state.dialogVisible = visibility
    },
    setDialogData: (state, data) => {
      state.dialogData = data
    },
    updateSlotData: (state, slot) => {
      const actualSlot = _.find(state.slots, { 'sid': slot.sid })
      Vue.set(actualSlot, 'data', slot.data)
    },
    updateInfo: (state, payload) => {
      state.info = payload
    },
    updateSpecificInfo: (state, payload) => {
      Vue.set(state.info, payload.key, payload.value)
    },
    updateProp: (state, { prop, value }) => {
      state.info[prop] = value
    },
    updateUser: (state, { user, prop, value }) => {
      user[prop] = value
    },
    updateWeek: (state, { index, prop, value }) => {
      state.weeks[index][prop] = value
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
      state.weeks = state.weeks.slice(0, num)
    },
    updateWeeks: (state, payload) => {
      state.weeks = payload
    },
    refreshStore: (state) => {
      state = state
    },
    // updateWeek: (state, index, field, value) => {
    //   state.weeks[index][field] = value
    // },
  },
  modules: {
    defaults,
    theme,
    cases
  },
  plugins: [createPersistedState()]
})
