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

    //Slot Actions
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

    //User Actions
    addProf: ({ commit, getters }) => {
      let prof = _.cloneDeep(getters.getDProf)
      prof.id = uuid.v1()
      commit('addProf', prof)
    },
    deleteProf: ({ commit }, prof) => {
      commit('deleteProf', prof)
    },
    addTA: ({ commit, getters }) => {
      let ta = _.cloneDeep(getters.getDTA)
      ta.id = uuid.v1()
      commit('addTA', ta)
    },
    deleteTA: ({ commit }, ta) => {
      commit('deleteTA', ta)
    },
    addStudent: ({ commit, getters }) => {
      let student = _.cloneDeep(getters.getDStudent)
      student.id = _.uniqueId()
      commit('addStudent', student)
    },
    deleteStudent: ({ commit }, student) => {
      commit('deleteStudent', student)
    },
    updateUser: ({ commit }, user) => {
      commit('updateUser', user)
    },

    //Week Actions
    addWeek: ({ commit, getters }, data = {}) => {
      let dWeek = _.cloneDeep(getters.getDWeek)
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
    sliceWeek: ({ commit }, week) => {
      commit('sliceWeek', week)
    },
    updateWeeks: ({ commit }, week) => {
      commit('updateWeeks', week)
    },

    //Week Element Actions
    addVideo: ({ commit, getters }, index, data = {}) => {
      let dVideo= _.cloneDeep(getters.getDVideo)
      let video = {...dVideo, ...data}
      video.id = uuid.v1()
      commit('addVideo', { video, index })
    },

    addCase: ({ commit, state }, {index, caseStudy}) => {
    
      let week = state.weeks[index]
      if(!week.cases) week.cases = []
      week.cases.push(caseStudy)
      let arr = state.weeks[index].cases

      let isUnique = true
      arr.forEach(function(testCase) {
        if (testCase.id == caseStudy.id) isUnique = false
      })
      
      if (isUnique)       
      commit('addCase', { index, caseStudy })
    },

    addAssignment:({ commit, getters }, index, data = {}) => {
      let dAssignment = _.cloneDeep(getters.getDAssignment)
      let assignment = {...dAssignment, ...data}
      assignment.id = uuid.v1()
      commit('addAssignment', { assignment, index })
    },

    addDiscussion: ({ commit, getters }, index, data = {}) => {
      let dDiscussion = _.cloneDeep(getters.getDDiscussion)
      let discussion = {...dDiscussion, ...data}
      discussion.id = uuid.v1()
      commit('addDiscussion', {discussion, index})
    },

    //Page Actions
    setPageData: ({ commit }, page) => {
      commit('setPageData', page)
    },

    //Info Actions
    updateProp: ({ commit }, prop) => {
      commit('updateProp', prop)
    },
    updateSpecificInfo: ({ commit }, payload) => {
      commit('updateSpecificInfo', payload)
    },
    updateInfo: ({ commit }, payload) => {
      commit('updateInfo', payload)
    },
    updateStore: ({ commit }, payload) => {
      commit('updateStore', payload)
    },
  },

  mutations: {
    
    // Slot Mutations
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
    updateSlotData: (state, slot) => {
      const actualSlot = _.find(state.slots, {
        'sid': slot.item.sid,
        'rid': slot.item.rid,
        'cid': slot.item.cid,
        'colid': slot.item.colid,
      })
      Vue.set(actualSlot, 'data', slot.data)
    },    

    // User Mutations
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
    updateUser: (state, { user, prop, value }) => {
      Vue.set(user, prop, value)
    },

    //Week Mutations
    addWeek: (state, week) => {
      state.weeks.push(week)
    },
    deleteWeek: (state, week) => {
      state.weeks = state.info.weeks.filter((item) => {
        return item.id !== week.id
      })
    },    
    updateWeek: (state, { index, prop, value }) => {
      Vue.set(state.weeks[index], prop, value)
    },
    sliceWeek: (state, num) => {
      state.weeks = state.weeks.slice(0, num)
    },
    updateWeeks: (state, payload) => {
      state.weeks = payload
    },

    //Week Element Mutations
    addVideo: (state, {video, index}) => {
      state.weeks[index].videos.push(video)
    },

    addCase: (state, index, caseStudy) => {
      state.weeks[index].cases.push(caseStudy) 
    },

    removeCase: (state, {index, caseStudy}) => {
      state.weeks[index].cases = state.weeks[index].filter((item) => {
        return item.id !== caseStudy.id
      }) 
    },
    
    addAssignment: (state, { assignment, index }) => {
      state.weeks[index].assignments.push(assignment)
    },

    addDiscussion: (state, {discussion, index}) => {
      state.weeks[index].discussions.push(discussion)
    },
    
    //Page Mutations
    setDialogVisibility: (state, visibility) => {
      state.dialogVisible = visibility
    },
    setDialogData: (state, data) => {
      state.dialogData = data
    },
    setPageData: (state, page) => {
      state.pagesSet.push(page)
    },

    //Info Mutations
    updateInfo: (state, payload) => {
      state.info = payload
    },
    updateSpecificInfo: (state, payload) => {
      Vue.set(state.info, payload.key, payload.value)
    },
    updateProp: (state, { prop, value }) => {
      Vue.set(state.info, prop, value)
    },        
    updateStore: (state, payload) => {
      state = payload
    },    
  },
  modules: {
    defaults,
    theme,
    cases
  },
  plugins: [] // [createPersistedState()]
})
