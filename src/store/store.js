import Vue from 'vue';
import Vuex from 'vuex';
import { uuid } from "vue-uuid"
import createPersistedState from 'vuex-persistedstate'
import VuexPersistence from 'vuex-persist'
import _ from 'lodash'

import defaults from './components/defaults'
import theme from './components/theme'
import cases from './components/cases'
import SlotTypes from '../util/slot-types.json'

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
    columns: [],
    dialogVisible: false,
    dialogData: {
      title: 'Choose Slot Type',
      type: 'choose-slot'
    },
    editingFields: [],
    pagesSet: []
  },
  getters: {
    getStore: state => state,
    getInfo: state => state.info,
    loading: state => state.loading,
    getWeeks: state => state.weeks,
    getStudents: state => state.weeks,
    isDialogVisible: state => state.dialogVisible,
    getPagesSet: state => state.pagesSet,
    getDialogData: state => state.dialogData,
    getRowsByCID: state => {
      const res = {}

      state.rows.forEach((row) => {
        if (row.cid in res) res[row.cid].push(row)
        else res[row.cid] = [row]
      })

      return res
    },
    getSlotsByColID: state => {
      const res = {}

      state.slots.forEach((slot) => {
        if (slot.colid in res) res[slot.colid].push(slot)
        else res[slot.colid] = [slot]
      })

      return res
    },
    getColumnsByRowID: state => {
      const res = {}

      state.columns.forEach((column) => {
        if (column.rid in res) res[column.rid].push(column)
        else res[column.rid] = [column]
      })

      return res
    }
  },
  actions: {
    addRow: ({ commit }, row) => {
      if(!row.rid) row.rid = uuid.v1()
      commit('addRow', row)
      return row
    },
    deleteRow: ({ commit }, rid) => {
      commit('deleteRow', rid)
    },
    addColumn: ({ commit }, column) => {
      if(!column.colid) column.colid = uuid.v1()
      commit('addColumn', column)
      return column
    },
    deleteColumn: ({ commit }, colid) => {
      commit('deleteColumn', colid)
    },
    setDialogVisibility: ({ commit }, visibility) => {
      commit('setDialogVisibility', visibility)
    },
    setDialogData: ({ commit }, data) => {
      commit('setDialogData', data)
    },
    addSlot: ({ commit }, slot) => {
      if(!slot.sid) slot.sid = uuid.v1()
      commit('addSlot', slot)
      return slot
    },
    deleteSlot: ({ commit }, sid) => {
      commit('deleteSlot', sid)
    },
    updateSlotData: ({ commit }, slot) => {
      commit('updateSlotData', slot)
    },
    addProf: ({ commit, getters }) => {
      let prof = _.cloneDeep(getters.dProf)
      prof.id = uuid.v1()
      commit('addProf', prof)
    },
    deleteProf: ({ commit }, prof) => {
      commit('deleteProf', prof)
    },
    addTA: ({ commit, getters }) => {
      let ta = _.cloneDeep(getters.dTA)
      ta.id = uuid.v1()
      commit('addTA', ta)
    },
    deleteTA: ({ commit }, ta) => {
      commit('deleteTA', ta)
    },
    addStudent: ({ commit, getters }) => {
      let student = _.cloneDeep(getters.dStudent)
      student.id = _.uniqueId()
      commit('addStudent', student)
    },
    deleteStudent: ({ commit }, student) => {
      commit('deleteStudent', student)
    },
    addWeek: ({ commit, getters }, data = {}) => {
      let dWeek = _.cloneDeep(getters.dWeek)
      let week = {...dWeek, ...data}
      week.id = uuid.v1()
      commit('addWeek', week)
    },
    deleteWeek: ({ commit }, week) => {
      commit('deleteWeek', week)
    },
    updateWeek: ({ commit }, data) => {
      commit('updateWeek', data)
    },
    updateSpecificInfo: ({ commit }, payload) => {
      commit('updateSpecificInfo', payload)
    },
    setPageData: ({ commit }, page) => {
      commit('setPageData', page)
    },
    setSlotStyles: ({ commit }, payload) => {
      commit('setSlotStyles', payload)
    },
    setSlotClasses: ({ commit }, payload) => {
      commit('setSlotClasses', payload)
    },
    createRowsFromArray({ dispatch, state }, payload) {
      payload.rows.forEach(row => {
        dispatch('addRow', {
          cid: payload.cid
        }).then(res => {
          dispatch('createColumnsFromArray', {
            columns: row,
            rid: res.rid
          })
        })
      })
    },
    createColumnsFromArray({ dispatch, state }, payload) {
      const row = _.find(state.rows, { rid: payload.rid })

      payload.columns.forEach(column => {
        dispatch('addColumn', {
          rid: row.rid,
          cid: row.cid
        }).then(res => {
          dispatch('createSlotsFromArray', {
            slots: column,
            colid: res.colid
          })
        })
      })
    },
    createSlotsFromArray({ state, dispatch }, payload) {
      const column = _.find(state.columns, { colid: payload.colid })
      let actualSlotType

      payload.slots.forEach(slot => {
        actualSlotType = _.find(SlotTypes, { 'type': slot })

        dispatch('addSlot', {
          type: actualSlotType.id,
          rid: column.rid,
          cid: column.cid,
          colid: column.colid,
          data: actualSlotType.defaultData
        })
      })
    }
  },
  mutations: {
    addRow: (state, row) => {
      state.rows.push(row)
    },
    deleteRow: (state, rid) => {
      state.rows = state.rows.filter((row) => {
        return row.rid !== rid
      })
      state.columns = state.columns.filter((column) => {
        return column.rid !== rid
      })
      state.slots = state.slots.filter((slot) => {
        return slot.rid !== rid
      })
    },
    addColumn: (state, column) => {
      state.columns.push(column)
    },
    deleteColumn: (state, colid) => {
      state.columns = state.columns.filter((column) => {
        return column.colid !== colid
      })

      state.slots = state.slots.filter((slot) => {
        return slot.colid !== colid
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
    addProf: (state, prof) => {
      state.info.profs.push(prof)
    },
    deleteProf: (state, prof) => {
      state.info.profs = state.info.profs.filter((user) => {
        return user.id !== prof.id
      })
    },
    addStudent: (state, student) => {
      state.info.students.push(student)
    },
    deleteStudent: (state, student) => {
      state.info.students = state.info.students.filter((user) => {
        return user.id !== student.id
      })
    },
    addTA: (state, ta) => {
      state.info.tas.push(ta)
    },
    deleteTA: (state, ta) => {
      state.info.tas = state.info.tas.filter((user) => {
        return user.id !== ta.id
      })
    },
    addWeek: (state, week) => {
      state.info.weeks.push(week)
    },
    deleteWeek: (state, week) => {
      state.info.weeks = state.info.weeks.filter((user) => {
        return user.id !== week.id
      })
    },
    setDialogVisibility: (state, visibility) => {
      state.dialogVisible = visibility
    },
    setDialogData: (state, data) => {
      state.dialogData = data
    },
    setPageData: (state, page) => {
      state.pagesSet.push(page)
    },
    setSlotStyles: (state, payload) => {
      const actualSlot = _.findIndex(state.slots, {
        'sid': payload.slot.sid,
        'rid': payload.slot.rid,
        'cid': payload.slot.cid,
        'colid': payload.slot.colid,
      })
      Vue.set(state.slots[actualSlot], 'styles', payload.styles)
    },
    setSlotClasses: (state, payload) => {
      const actualSlot = _.findIndex(state.slots, {
        'sid': payload.slot.sid,
        'rid': payload.slot.rid,
        'cid': payload.slot.cid,
        'colid': payload.slot.colid,
      })
      Vue.set(state.slots[actualSlot], 'classes', payload.classes)
    },
    updateSlotData: (state, slot) => {
      const actualSlot = _.findIndex(state.slots, {
        'sid': slot.item.sid,
        'rid': slot.item.rid,
        'cid': slot.item.cid,
        'colid': slot.item.colid,
      })
      Vue.set(state.slots[actualSlot], 'data', slot.data)
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
  plugins: [] // [createPersistedState()]
})
