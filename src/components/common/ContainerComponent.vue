<template>
  <div class="canvas-code">
    <row-component v-for="row in rows"
                   :key="row.rid"
                   :rid="row.rid"
                   :row="row" />

    <button class="new-row" @click="addRow">Add new Row</button>
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
    return {}
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
    }
  }
}
</script>

<style scoped lang="scss">
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

    &:hover {
      opacity: 1;
    }
  }
}
</style>
