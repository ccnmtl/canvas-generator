<template>
  <div class="canvas-code" ref="canvascode">
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
</template>

<script>
import { mapGetters } from "vuex"

import RowComponent from "./RowComponent.vue"

export default {
  components: {
    RowComponent
  },
  props: [ "cid" ],
  data() {
    return {
      previewing: false,
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
  }
}
</script>

<style lang="scss">
.canvas-code {
  padding: 25px 0;

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

}
</style>
