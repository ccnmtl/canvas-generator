<template>
  <div class="home-page">
    <container-component cid="home" v-if="!loading" />
    <div class="loading" v-else>
      <i class="el-icon-loading" />
    </div>
  </div>

</template>

<script>
import _ from "lodash"
import { uuid } from "vue-uuid"
import ContainerComponent from './common/ContainerComponent.vue'
import DefaultData from '../util/default-data.json'
import SlotTypes from '../util/slot-types.json'

export default {
  name: "NewHome",
  data() {
    return {
      loading: false,
      rowsDone: [],
      columnsDone: [],
      slotsDone: []
    }
  },
  components: {
    ContainerComponent
  },
  created() {
    const self = this

    if(!this.$store.getters.getPagesSet.includes('home')) {
      self.loading = true
      let page = _.find(DefaultData.pages, { cid: 'home' })

      function dispatchSlots() {
        let totalSlots = 0
        page.rows.forEach((row, rowIndex, rowArr) => {
          row.columns.forEach((column, columnIndex, columnArr) => {
            totalSlots += column.slots.length

            column.slots.forEach((slot, slotIndex, slotArr) => {
              let data = _.find(self.columnsDone, { colid: column.colid })

              self.$store.dispatch("addSlot", {
                cid: 'home',
                rid: data.rid,
                colid: data.colid,
                type: _.find(SlotTypes, { type: slot }).id,
                data: _.find(SlotTypes, { type: slot }).defaultData
              })
              .then(res => {
                self.slotsDone.push(res)
                if(self.slotsDone.length === totalSlots) {
                  self.loading = false
                  self.$store.dispatch('setPageData', 'home')
                }
              })
            })
          })
        })
      }

      function dispatchColumns() {
        let totalColumns = 0
        page.rows.forEach((row, rowIndex, rowArr) => {
          totalColumns += row.columns.length

          row.columns.forEach((column, columnIndex, columnArr) => {
            column.colid = uuid.v1()
            self.$store.dispatch("addColumn", { cid: 'home', rid: row.rid , colid: column.colid })
            .then(res => {
              self.columnsDone.push(res)
              if(self.columnsDone.length === totalColumns) dispatchSlots()
            })
          })
        })
      }

      page.rows.forEach((row, rowIndex, rowArr) => {
        row.rid = uuid.v1()

        self.$store.dispatch("addRow", { cid: 'home', rid: row.rid })
        .then(res => {
          self.rowsDone.push(res)
          if(self.rowsDone.length === rowArr.length) {
            dispatchColumns()
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

.loading {
  text-align: center;
  font-size: 34px;
}

</style>
