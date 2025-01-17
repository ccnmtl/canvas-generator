<template>
  <div ref="container" class="canvas-code"
       :class="[{ blocked: previewing }, { dragging: isDndMode }]"
       @dragend="dragEnd">
    <el-alert
      title="CANVAS PREVIEW AREA" effect="dark"
      type="info" class="preview-text" show-icon center
      description="Build your final canvas page layout below">
    </el-alert>


    <div class="canvas-container" v-if="!loading">
      <div class="preview-page" id="previewpage">
        <div class="dragging-type"  v-if="!previewing">
          Dragging

          <el-select :value="getDragType"
            @input="updateDragType($event)"
            placeholder="Select type">

            <el-option label="Rows" value="rows" />
            <el-option label="Columns" value="columns" />
            <!-- <el-option label="Slots" value="slots" /> -->
          </el-select>
        </div>
        <!-- <el-button type="danger" @click="undoDelete" v-if="getLastAffectedRow" class="btn btn-primary">
          Undo Delete Row
        </el-button> -->
        <el-button type="primary" @click="enterEditMode" v-if="previewing" class="btn btn-primary">Enter Advanced Editor</el-button>
        <el-button type="primary" @click="exitEditMode" v-else class="btn btn-secondary">Exit Advanced Editor</el-button>
        <el-button type="success" @click="getHTMLCode()">Copy the Code</el-button>
      </div>

      <div :id="cid" ref="canvascode">
        <draggable :disabled="!isDndMode || getDragType !== 'rows'" v-model="sortedRows" group="rows" @start="drag=true" @end="drag=false">
          <row-component v-for="row in sortedRows"
                        :key="row.rid"
                        :rid="row.rid"
                        :row="row" />
        </draggable>
      </div>

      <button data-hidden v-if="!previewing" class="new-row" @click="chooseRow">Add new Row</button>
      <button data-hidden v-if="!previewing" class="new-row" @click="chooseCol">Add new Column</button>
      <button data-hidden v-if="!previewing" class="new-row" @click="chooseSlot">Add new Slot</button>
      <!-- <button data-hidden class="new-row" @click="getHTMLCode">get HTML</button> -->
    </div>

    <div class="loading" v-else>
      <i class="el-icon-loading" />
    </div>
  </div>
</template>

<script>

import _ from "lodash"
import { mapGetters, mapActions } from "vuex"

import RowComponent from "./RowComponent.vue"
// import RowTypes from '../../util/row-types.json'
// import RowTypesMixin from '../../util/row-types.js'
import draggable from 'vuedraggable'

export default {
  components: {
    RowComponent,
    draggable
  },
  props: [ "cid", "defaultRows" ],
  data() {
    return {
      previewing: true,
      loading: false,
      rowsDone: [],
      columnsDone: [],
      slotsDone: [],
    }
  },
  computed: {
    ...mapGetters([ 'getDraggedRow', 'isDndMode', 'getDragType', 'getLastAffectedRow', 'getStashedWeek' ]),
    rows: function() {
      return this.$store.getters.getRowsByCID[this.cid]
    },
    sortedRows: {
      get() {
        return _.sortBy(this.rows, ['sort'])
      },
      set(val) {
        this.$store.dispatch('setRowsOrder', val)
      }
    },
    dndMode: function() {
      return this.isDndMode
    }
  },
  methods: {
    ...mapActions([ 'restoreDeletedRow', 'restoreStashedWeek', 'clearStashedWeek', 'clearLastAffectedRow' ]),
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
    chooseCol(){
      this.$store.dispatch("setDialogData", {
        title: 'Choose Column Type',
        type: 'choose-col',
        action: 'new',
        cid: this.cid,
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    chooseSlot(){
      this.$store.dispatch("setDialogData", {
        title: 'Choose Slot Type',
        type: 'choose-slot',
        action: 'new',
        cid: this.cid,
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    returnCode(){
      let html = document.createElement("div")
      html.innerHTML = this.$refs.canvascode.outerHTML.replace(/data-v[^ ]*?>/g, ">").replace(/(<!--.*?-->|data-v[^>]*? )/g, "")
      html.querySelectorAll('[data-hidden], #previewpage').forEach(element => {
        element.remove()
      })
      return html.innerHTML
    },
    getHTMLCode() {
      let html = this.returnCode()
      setTimeout(() => {
        var aux = document.createElement("input");
        aux.setAttribute("value", html);
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
    exitEditMode() {
      let html = this.$refs.container

      html.querySelectorAll('[data-hidden]').forEach(element => {
        element.style.display = 'none'
      })

      html.querySelectorAll('[data-always]').forEach(element => {
        element.style.display = null
      })

      this.previewing = true
      this.$store.dispatch('changeDndMode', false)
    },
    enterEditMode() {
      let html = this.$refs.container

      html.querySelectorAll('[data-hidden]').forEach(element => {
        element.style.display = null
      })
      this.previewing = false
      this.$store.dispatch('changeDndMode', true)
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
    updateDragType(type) {
      this.$store.dispatch('setDragType', type)
    },
    undoDelete() {
      if (this.getStashedWeek) this.restoreStashedWeek()
      this.restoreDeletedRow()

      if (this.getStashedWeek) this.clearStashedWeek()
      this.clearLastAffectedRow()
    },
  },
  beforeMount() {
    const self = this

    // If no rows exist in the current container, build using default
    if (!this.rows) {
      self.$store.dispatch('createRowsFromArray', {
        cid: self.cid,
        rows: this.defaultRows
      })
    }
  },
  mounted() {
    setTimeout(() => this.exitEditMode(), 100);
  }
}
</script>

<style lang="scss">
.canvas-code {
  font-size: 14px;

  .dragging-type {
    float: left;
  }

  .preview-text {
    text-align: center;
    font-weight: bold;
    position: absolute;
    margin-top: -7px;
    width: 350px;
    transform: translate(88%, 0%);
  }

  @media screen and (max-width: 1350px) {
    .preview-text {
      display:none;
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
    width: 33%;
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
