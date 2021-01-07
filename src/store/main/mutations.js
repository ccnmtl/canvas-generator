import Vue from 'vue';
import _ from 'lodash'

export default {
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
    if(state.weeks) state.weeks.push(week)
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
  sliceWeek: (state, num) => {
    state.weeks = state.weeks.slice(0, num)
  },
  updateWeeks: (state, payload) => {
    state.weeks = payload
  },
  refreshStore: (state) => {
    state = state
  },
  setSettingsVisibility: (state, visibility) => {
    state.settingsVisible = visibility
  },
  addSavedState: (state, newState) => {
    state.savedStates.push(newState)
  },
  setSavedState: (state, payload) => {
    Vue.set(state.savedStates, payload.index, payload.current)
  },
  setCurrentCourse: (state, uuid) => {
    state.currentCourse = uuid
  },
  setInfoField: (state, payload) => {
    Vue.set(state.info, payload.field, payload.value)
  },
  setStateField: (state, payload) => {
    Vue.set(state, payload.field, payload.value)
  },
  setStateFieldWithBase: (state, payload) => {
    Vue.set(state[payload.base], payload.field, payload.value)
  },
  updateRowTypes: (state, payload) => {
    state.rowTypes = payload
  },
}
