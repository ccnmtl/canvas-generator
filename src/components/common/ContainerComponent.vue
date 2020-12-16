<template>
  <div class="container">
    <banner-slot></banner-slot>

    <row-component v-for="row in rows"
                   :key="row.rid"
                   :rid="row.rid" />

    <button class="new-row" @click="addRow">Add new Row</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import RowComponent from "./RowComponent.vue"
import BannerSlot from "../slots/BannerSlot.vue"

export default {
  components: {
    RowComponent,
    BannerSlot
  },
  props: ["cid"],
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
.container {
  padding: 25px 0;

  .new-row {
    width: 100%;
    border: dashed 1px #ccc;
    color: #555;
    padding: 7px 0;
    border-radius: 7px;
    opacity: 0.5;
    transition: all 0.43s;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
