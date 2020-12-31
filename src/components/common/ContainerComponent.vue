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

import Vue from 'vue'
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
  beforeMount() { 
    let page = _.find(DefaultData.pages, { cid: this.cid })

    this.$store.dispatch('createRowsFromArray', {
      cid: 'home',
      rows: Vue.jsonToArray(page.rows)
    })
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
