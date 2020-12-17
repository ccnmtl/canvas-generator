<template>
  <div class="row" :class="{ empty: !slots }">

    <div class="options" v-if="slots">
      <button class="add"></button>
      <button class="delete"></button>
    </div>

    <div class="empty-text" v-if="!slots">
      Start adding slots to this row!

      <div class="empty-button">
        <button @click="showSlotOptions" class="btn btn-primary btn-block">Add Slot</button>
      </div>

      <div>You can also <a @click="deleteRow">delete</a> this row.</div>
    </div>

    <slot-component v-for="slot in slots"
                    :key="slot.sid"
                    :sid="slot.sid"
                    :slotData="slot" />

  </div>
</template>

<script>
import { mapGetters } from "vuex"

import SlotComponent from "./SlotComponent.vue"
import SlotTypes from "../../util/slot-types.json"

export default {
  components: {
    SlotComponent
  },
  props: [ "rid", "row" ],
  data() {
    return {}
  },
  computed: {
    slots: function() {
      return this.$store.getters.getSlotsByRowID[this.rid]
    }
  },
  methods: {
    deleteRow() {
      this.$store.dispatch("deleteRow", this.rid)
    },
    showSlotOptions() {
      this.$store.dispatch("setDialogData", {
        title: 'Choose Slot Type',
        type: 'choose-slot',
        cid: this.row.cid,
        rid: this.rid
      })
      this.$store.dispatch("setDialogVisibility", true)
    }
  }
}
</script>

<style scoped lang="scss">
.row {
  margin-bottom: 10px;

  &.empty {
    padding: 16px 0;
    min-height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;

    .empty-button {
      margin: 7px 0;
    }
  }

  .options {
    transition: all 0.43s;
    width: 6vw;
    margin: 0 -3vw;
    float: right;
    z-index: 100;
    text-align: center;
    position: relative;
    margin-top: 32px;
    opacity: 0;
    margin-bottom: -100%;

    button {
      width: 5vw;
      max-width: 52px;
      height: 5vw;
      max-height: 52px;
      margin: 4px 0;
    }

    &:hover {
      margin-top: 16px;
      opacity: 1;
    }
  }
}
</style>
