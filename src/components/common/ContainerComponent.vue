<template>
  <div class="canvas-code" ref="canvascode" :class="{ blocked: previewing }" @dragend="dragEnd">
    <div class="canvas-container" v-if="!loading">
      <div class="preview-page" id="previewpage">
        <button @click="startDnd" v-if="!$store.getters.isDndMode" class="btn btn-info">Start Drag and Drop</button>
        <button @click="stopDnd" v-else class="btn btn-secondary">Stop Drag and Drop</button>

        <button @click="previewPage" v-if="!previewing" class="btn btn-primary">Preview this Page</button>
        <button @click="stopPreview" v-else class="btn btn-secondary">Stop Preview</button>
      </div>

      <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
        <row-component v-for="row in sortedRows"
                      :key="row.rid"
                      :rid="row.rid"
                      :row="row" />
      </draggable>

      <button data-hidden class="new-row" @click="chooseRow">Add new Row</button>
      <button data-hidden class="new-row" @click="getHTMLCode">get HTML</button>
    </div>

    <div class="loading" v-else>
      <i class="el-icon-loading" />
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import _ from "lodash"
import { mapGetters } from "vuex"

import RowComponent from "./RowComponent.vue"
// import RowTypes from '../../util/row-types.json'
import RowTypesMixin from '../../util/row-types.js'
import draggable from 'vuedraggable'

export default {
  components: {
    RowComponent,
    draggable
  },
  mixins: [RowTypesMixin],
  props: [ "cid", "defaultRows" ],
  data() {
    return {
      previewing: false,
      loading: false,
      rowsDone: [],
      columnsDone: [],
      slotsDone: [],
      options: {
        dropzoneSelector: 'ul',
        draggableSelector: 'li',
        handlerSelector: null,
        reactivityEnabled: true,
        multipleDropzonesItemsDraggingEnabled: false,
        showDropzoneAreas: true,
        onDrop: function(event) {},
        onDragstart: function(event) {},
        onDragenter: function(event) {},
        onDragover: function(event) {},
        onDragend: function(event) {}
      }
    }
  },
  computed: {
    ...mapGetters([ 'getDraggedRow' ]),
    rows: function() {
      return this.$store.getters.getRowsByCID[this.cid]
    },
    sortedRows: function() {
      return _.sortBy(this.rows, ['sort'])
    },
    dndMode: function() {
      return this.$store.getters.isDndMode
    }
  },
  watch: {
    dndMode: {
      handler(val) {
        let html = this.$refs.canvascode
        if(val) {
          html.querySelectorAll('[data-hidden]').forEach(element => {
            element.style.display = 'none'
          })

          html.querySelectorAll('[data-dnd]').forEach(element => {
            element.style.display = null
          })
        }
        else if(html) {
          html.querySelectorAll('[data-hidden]').forEach(element => {
            element.style.display = null
          })

          html.querySelectorAll('[data-dnd]').forEach(element => {
            element.style.display = 'none'
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    addRow() {
      this.$store.dispatch("addRow", { cid: this.cid })
    },
    chooseRow(){
      this.$store.dispatch("setDialogData", {
        title: 'Choose Row Type',
        type: 'choose-row',
        cid: this.cid,
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    getHTMLCode() {
      console.log(this.$refs.canvascode)
      let html = document.createElement("div")
      html.innerHTML = this.$refs.canvascode.outerHTML.replace(/data-v[^ ]*?>/g, ">").replace(/(<!--.*?-->|data-v[^>]*? )/g, "")

      html.querySelectorAll('[data-hidden], #previewpage').forEach(element => {
        element.remove()
      })
      setTimeout(() => {
        var aux = document.createElement("input");
        aux.setAttribute("value", html.outerHTML);
        aux.id = 'code-input-copy'
        document.body.appendChild(aux);
        aux.select();
        console.log('creating aux element..')
        document.execCommand('copy')
        console.log('copying text..')
          aux.style.display = "none";

      }, 40)
      this.$snotify.success('Code has been copied', { showProgressBar: false });
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
    },
    startDnd() {
      this.$store.dispatch('changeDndMode', true)
    },
    stopDnd() {
      this.$store.dispatch('changeDndMode', false)
    },
    dragEnd() {
      this.$store.dispatch('setDraggingRow', false)
    },
    dropped(zone) {
      let sort = this.getDraggedRow.sort
      const row = _.find(this.rows, { rid: this.getDraggedRow.rid })
      let affectedRows
      if(zone !== sort && zone !== sort + 1) {
        if(zone > sort) {
          console.log(zone)
          Vue.set(row, 'sort', (zone - 1))

          /*affectedRows = _.filter(this.sortedRows, (row) => row.sort > sort && row.sort < zone)
          affectedRows.forEach(row => {
            this.$store.dispatch('changeRowSort', { rid: row.rid, sort: (row.sort - 1)})
          })*/
        }
      }
    }
  },
  beforeMount() {
    const self = this

    // If no rows exist in the current container, build using default
    if (!this.rows) {
      self.$store.dispatch('createRowsFromArray', {
        cid: self.cid,
        rows: this.defaultRows
      })

      self.$store.dispatch('createRowsFromArray', {
        cid: self.cid,
        rows: [[[{
          type: 'name-value-slot',
          getter: {
            value: 'info.profs[0].name'
          },
          width: 8,
          data: {
            name: 'Getter (info.profs[0].name)'
          }
        }]]]
      })
    }

    // if (!this.rows) {
    //   this.defaultRows.forEach(row => {
    //     let rowArray

    //     // if row is built using a shorthand string then find the actual row content
    //     if (typeof row === 'string') rowArray = _.cloneDeep(this.rowTypes[row]).array
    //     // otherwise build directly from the row
    //     else rowArray = row

    //     self.$store.dispatch('createRowsFromArray', {
    //       cid: self.cid,
    //       rows: rowArray
    //     })

    //   })
    // }

    // self.$store.dispatch('createRowsFromArray', {
    //   cid: self.cid,
    //   rows: ['homeInstructors']
    // })

    // if (!this.rows) {
    //   this.defaultRows.forEach(row => {
    //     const actualRowType = _.find(RowTypes, { 'type': row })
    //     self.$store.dispatch('createRowsFromArray', {
    //       cid: self.cid,
    //       rows: actualRowType.array
    //     })

    //   })
    // }
  },
  mounted() {
    let html = this.$refs.canvascode

    html.querySelectorAll('[data-dnd]').forEach(element => {
      element.style.display = 'none'
    })
  }
}
</script>

<style lang="scss">
.canvas-code {
  padding: 25px 0;
  font-size: 14px;

  &.blocked {
    .row {
      pointer-events: none;
    }
  }

  .drop-zone{
    transition: all 0.43s;
    height: 0;

    &.dragging {
      background: #EEE;
      height: 34px;
      display: block;

      &:hover {
        background-color: #38D;
      }
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
