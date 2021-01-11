<template>
  <div :class="[{ empty: !slots}, 'col-xs-'+colWidth, 'el-col']" >
    <div data-hidden class="empty-text" v-if="!slots">
      Start adding slots to this column!

      <div class="empty-button">
        <button @click="showSlotOptions" class="btn btn-primary btn-block">Add Slot</button>
        <button @click="addCustomCol()" class="btn btn-primary btn-block">Add Custom Col</button>
      </div>

      <div>You can also <a @click="deleteColumn">delete</a> this column.</div>
    </div>

    <slot-component v-for="slot in slots"
                    :key="slot.sid"
                    :sid="slot.sid"
                    :colspan="colspan"
                    :slotData="slot" />

    <div data-hidden class="actions" v-if="slots">
      <button @click="deleteColumn" class="btn btn-danger">Delete Column</button>
      <button @click="showSlotOptions" class="btn btn-primary">Add Slot</button>
    </div>

  </div>
</template>

<script>

import _ from 'lodash'
import SlotComponent from "./SlotComponent.vue"
import ColumnTypes from "../../util/col-types"
import SlotTypesComponent from '../../util/slot-types.js'

const SlotTypes = SlotTypesComponent.computed.SlotTypes()

export default {
  components: {
    SlotComponent
  },
  mixins: [ColumnTypes],
  props: [ "col", "cid", "rid", "colspan", "space" ],
  data() {
    return {}
  },
  computed: {
    slots: function() {
      const slots = this.$store.getters.getSlotsByColID[this.col.colid]
      if(slots)
        slots.forEach(slot => {
          let SlotType = _.find(SlotTypes, { 'id': slot.type })
          slot.colspan = SlotType.colspan
        })
      return slots
    },
    colWidth: function () {
      if(this.slots && this.slots.length === 0) return this.colspan

      const bigger = _.orderBy(this.slots, ['colspan'],['desc'])[0]

      if(!bigger) return this.colspan
      return Math.max(bigger.colspan, this.colspan)
    }
  },
  methods: {
    deleteColumn() {
      this.$store.dispatch("setDialogData", {
        title: 'Are you sure you want to delete this column?',
        type: 'delete-column',
        colid: this.col.colid
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    showSlotOptions() {
      this.$store.dispatch("setDialogData", {
        title: 'Choose Slot Type',
        type: 'choose-slot',
        cid: this.cid,
        rid: this.rid,
        colid: this.col.colid,
        space: this.space
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    addCustomCol(){
      console.log(this.homeSidebarCol())
      this.createColumnsFromArray({columns: [this.homeSidebarCol()], rid: this.rid})
    }
  }
}
</script>

<style scoped lang="scss">
.el-col {
  padding: 0 10px;

  &:hover {
    .actions {
      height: 50px;
      margin-bottom: 20px;
    }
  }

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

  .actions {
    transition: all 0.43s;
    text-align: right;
    opacity: .34;
    transition: all 0.43s;
    margin-bottom: 0px;
    overflow: hidden;
    height: 0;

    &:hover {
      opacity: 1;
    }

    .btn {
      margin: 12px 3px 0;
    }
  }
}
</style>
