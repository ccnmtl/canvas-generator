<template>
  <div class="canvas-code" ref="canvascode" :class="{ blocked: previewing }">
    <div class="canvas-container" v-if="!loading">
      <div class="preview-page" id="previewpage">
        <button @click="previewPage" v-if="!previewing" class="btn btn-primary">Preview this Page</button>
        <button @click="stopPreview" v-else class="btn btn-secondary">Stop Preview</button>
      </div>

      <row-component v-for="row in rows"
                    :key="row.rid"
                    :rid="row.rid"
                    :row="row" />

      <button data-hidden class="new-row" @click="addRow">Add new Row</button>
      <button data-hidden class="new-row" @click="getHTMLCode">get HTML</button>
    </div>

    <div class="loading" v-else>
      <i class="el-icon-loading" />
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import { uuid } from "vue-uuid"
import { mapGetters } from "vuex"

import RowComponent from "./RowComponent.vue"
import DefaultData from '../../util/default-data.json'
import SlotTypes from '../../util/slot-types.json'

export default {
  components: {
    RowComponent
  },
  props: [ "cid" ],
  data() {
    return {
      previewing: false,
      loading: false,
      rowsDone: [],
      columnsDone: [],
      slotsDone: []
    }
  },
  computed: {
    ...mapGetters,
    rows: function() {
      return this.$store.getters.getRowsByCID[this.cid]
    }
  },
  methods: {
    addRow() {
      this.$store.dispatch("addRow", { cid: this.cid })
    },
    getHTMLCode() {
      console.log(this.$refs.canvascode)
      let html = document.createElement("div")
      html.innerHTML = this.$refs.canvascode.outerHTML.replace(/data-v[^ ]*?>/g, ">").replace(/(<\!--.*?-->|data-v[^>]*? )/g, "")

      html.querySelectorAll('[data-hidden], #previewpage').forEach(element => {
        element.remove()
      })
      console.log(html)
    },
    previewPage() {
      let html = this.$refs.canvascode

      html.querySelectorAll('[data-hidden]').forEach(element => {
        element.style.display = 'none'
      })
      this.previewing = true
    },
    stopPreview() {
      let html = this.$refs.canvascode

      html.querySelectorAll('[data-hidden]').forEach(element => {
        element.style.display = null
      })
      this.previewing = false
    }
  },
  created() {
    const self = this
    let page = _.find(DefaultData.pages, { cid: self.cid })

    function dispatchSlots() {
      let totalSlots = 0
      page.rows.forEach((row) => {
        row.columns.forEach((column) => {
          totalSlots += column.slots.length

          column.slots.forEach((slot) => {
            let data = _.find(self.columnsDone, { colid: column.colid })

            self.$store.dispatch("addSlot", {
              cid: self.cid,
              rid: data.rid,
              colid: data.colid,
              type: _.find(SlotTypes, { type: slot }).id,
              data: _.find(SlotTypes, { type: slot }).defaultData
            })
            .then(res => {
              self.slotsDone.push(res)
              if(self.slotsDone.length === totalSlots) {
                self.loading = false
                self.$store.dispatch('setPageData', self.cid)
              }
            })
          })
        })
      })
    }

    function dispatchColumns() {
      let totalColumns = 0
      page.rows.forEach((row) => {
        totalColumns += row.columns.length

        row.columns.forEach((column) => {
          column.colid = uuid.v1()
          self.$store.dispatch("addColumn", { cid: self.cid, rid: row.rid , colid: column.colid })
          .then(res => {
            self.columnsDone.push(res)
            if(self.columnsDone.length === totalColumns) dispatchSlots()
          })
        })
      })
    }

    if(!this.$store.getters.getPagesSet.includes(self.cid)) {
      self.loading = true

      page.rows.forEach((row, rowIndex, rowArr) => {
        row.rid = uuid.v1()

        self.$store.dispatch("addRow", { cid: self.cid, rid: row.rid })
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

<style lang="scss">
.canvas-code {
  padding: 25px 0;

  &.blocked {
    .row {
      pointer-events: none;
    }
  }

  .new-row {
    width: 100%;
    border: dashed 1px #AAA;
    color: #555;
    padding: 7px 0;
    border-radius: 7px;
    opacity: 0.5;
    transition: all 0.43s;
    font-size: 16px;
    margin-bottom: 12px;

    &:hover {
      opacity: 1;
    }
  }

  .preview-page {
    margin-bottom: 12px;
    text-align: right;
  }

.loading {
  text-align: center;
  font-size: 34px;
}

}
</style>
