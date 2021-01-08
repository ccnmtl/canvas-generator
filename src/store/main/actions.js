import { uuid } from "vue-uuid"
import SavedFields from '../../util/saved-fields.json'
import state from './state';
import SlotTypesComponent from '../../util/slot-types.js'
import _ from 'lodash'

const SlotTypes = SlotTypesComponent.computed.SlotTypes()

function findObj(objKey, objValue, list){
  for (const [name, row] of Object.entries(list)){
    if (row[objKey] == objValue) return row
  }
}

var moment = require('moment');

export default {

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
    updateSlotDataWithSetter: ({ commit }, payload) => {
      let res = payload.setter.split('.')
      payload.base = res[0]
      payload.field = res[1]
      payload.value = payload.data
      commit('setStateFieldWithBase', payload)
    },
    setSlotStyles: ({ commit }, payload) => {
        commit('setSlotStyles', payload)
      },
      setSlotClasses: ({ commit }, payload) => {
        commit('setSlotClasses', payload)
      },
      createRowsFromArray({ state, dispatch }, payload) {
        const RowTypes = state.rowTypes
        console.log(RowTypes)
        payload.rows.forEach(row => {
          let actualRow

          if (typeof row == 'string') actualRow = findObj('type', row, RowTypes).array[0]
          else actualRow = row

          dispatch('addRow', {
            cid: payload.cid
          }).then(res => {
            dispatch('createColumnsFromArray', {
              columns: actualRow,
              rid: res.rid
            })
          })
        })
      },
      createColumnsFromArray({ dispatch, state }, payload) {
        const row = _.find(state.rows, { rid: payload.rid })
        const ColTypes = state.colTypes

        let columns = payload.columns

        if (typeof columns[0] == 'string') {
          let colObj = findObj('type', columns[0], ColTypes).array
          let res = []
          colObj.forEach((col) => res.push([col]))
          columns = res
        }
        console.log(columns)

        columns.forEach(column => {  
          let actualCol

          if (typeof column == 'string') actualCol = findObj('type', column, ColTypes).array
          else actualCol = column

          console.log(actualCol)

          dispatch('addColumn', {
            rid: row.rid,
            cid: row.cid
          }).then(res => {
            dispatch('createSlotsFromArray', {
              slots: actualCol,
              colid: res.colid
            })
          })
        })
      },
      createSlotsFromArray({ state, dispatch }, payload) {
        const column = _.find(state.columns, { colid: payload.colid })
        let actualSlotType

        payload.slots.forEach(slot => {
          if(typeof slot == 'string') {
            actualSlotType = _.find(SlotTypes, { 'type': slot })

            dispatch('addSlot', {
              type: actualSlotType.id,
              rid: column.rid,
              cid: column.cid,
              colid: column.colid,
              data: slot.data ? slot.data : actualSlotType.defaultData
            })
          }
          else {
            actualSlotType = _.find(SlotTypes, { 'type': slot.type })

            dispatch('addSlot', {
              ...slot,
              type: actualSlotType.id,
              rid: column.rid,
              cid: column.cid,
              colid: column.colid,
              data: slot.data ? slot.data : actualSlotType.defaultData,
              classes: slot.classes ? slot.classes : [],
              styles: slot.styles ? slot.styles : [],
              getter: slot.getter
            })
          }
        })
      },
    updateRowTypes: ({ commit }, payload) => {
      commit('updateRowTypes', payload)
    },
    updateColTypes: ({ commit }, payload) => {
      commit('updateColTypes', payload)
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
    clearStudents: ({ commit, getters }) => {
      commit('clearStudents')
      let student = _.cloneDeep(getters.getDStudent)
      student.id = _.uniqueId()
      commit('addStudent', student)

    },
    
    //Week Actions
    addWeek: ({ commit, getters }, data = {}) => {

      let dWeek = _.cloneDeep(getters.getDWeek)

      if (typeof(data) == "number"){
        let index = data
        if (index > 15 && state.info.classType.dateType == "Week") index = 15

        dWeek.imgSrc = state.imageServer + state.info.classType.dateType.toLowerCase() + index + ".png"
        dWeek.date = moment()
        dWeek.title = "Lecture " + index
        dWeek.secondTitle = "Lecture " + index + " II"

        commit('addWeek', dWeek)
      }
      else{
        let week = {...dWeek, ...data}
        week.id = uuid.v1()
        commit('addWeek', week)
      }

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

      if(week.cases.length == 0){
        commit('addCase', { index, caseStudy })
      }
      else{
        let arr = week.cases
        let isUnique = true
        arr.forEach(function(testCase) {
          if (testCase.id == caseStudy.id) isUnique = false
        })
  
        if (isUnique) commit('addCase', { index, caseStudy })        
      }
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

    removeCase: ({ commit }, {index, caseStudy}) => {
      commit('removeCase', {index, caseStudy})
    },

    //Page Actions
    setPageData: ({ commit }, page) => {
      commit('setPageData', page)
    },

    //Info Actions
    updateProp: ({ commit }, { prop, value }) => {
      commit('updateProp', { prop, value })
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
    },
    
}
