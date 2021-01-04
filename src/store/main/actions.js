import { uuid } from "vue-uuid"
import SavedFields from '../../util/saved-fields.json'
import _ from 'lodash'

export default {
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
    setSettingsVisibility: ({ commit }, visibility) => {
      commit('setSettingsVisibility', visibility)
    },
    addSavedState: ({ commit, state }) => {
      const newState = {
        uuid: uuid.v1()
      }

      SavedFields.forEach(field => {
        newState[field] = JSON.stringify(state[field])
      })

      commit('addSavedState', newState)
      return newState.uuid
    },
    setSavedState: ({ commit, state }, uuid) => {
      const index = _.findIndex(state.savedStates, { uuid: uuid})
      const current = state.savedStates[index]

      SavedFields.forEach(field => {
        current[field] = JSON.stringify(state[field])
      })
      commit('setSavedState', { current: current, index: index })
    },
    setCurrentCourse: ({ commit }, uuid) => {
      commit('setCurrentCourse', uuid)
    },
    setInfoField({ commit }, payload) {
      commit('setInfoField', payload)
    },
    chooseSavedState({ commit, state }, uuid) {
      const index = _.findIndex(state.savedStates, { uuid: uuid})
      const current = state.savedStates[index]

      SavedFields.forEach(field => {
        commit('setStateField', {
          value: JSON.parse(current[field]),
          field: field
        })
      })
    }
}
