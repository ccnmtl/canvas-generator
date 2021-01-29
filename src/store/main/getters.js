export default {
  getStore: state => state,
  getInfo: state => state.info,
  getConfig: state => state.config,
  loading: state => state.loading,
  getWeeks: state => state.weeks,
  getStudents: state => state.weeks,
  isDialogVisible: state => state.dialogVisible,
  isSettingsVisible: state => state.settingsVisible,
  getPagesSet: state => state.pagesSet,
  getDialogData: state => state.dialogData,
  getSavedStates: state => state.savedStates,
  getCurrentCourse: state => state.currentCourse,
  getCurrentVersion: state => state.currentVersion,
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
  getSlotsByRowID: state => {
    const res = {}

    state.slots.forEach((slot) => {
      if (slot.rid in res) res[slot.rid].push(slot)
      else res[slot.rid] = [slot]
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
  },
  getFromGetter: (state) => (getter) => {
    getter = getter.replaceAll('].', '.').replaceAll(']', '').replaceAll('[', '.')
    let items = getter.split('.')
    let res = state
    items.forEach(item => {
      res = res[item]
    })
    return res
  },
  getRowTypes: state => state.rowTypes,
  getColTypes: state => state.colTypes,
  getSlotTypes: state => state.slotTypes,
  isDndMode: state => state.dndMode,
  isDraggingRow: state => state.draggingRow,
  getDraggedRow: state => state.draggedRow,
  getDragType: state => state.dragType,
}
