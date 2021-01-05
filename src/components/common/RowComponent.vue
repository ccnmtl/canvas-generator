<template>
  <div class="row" :class="{ empty: !columns }">
    <div data-hidden class="empty-text" v-if="!columns">
      Start adding columns to this row!

      <div class="empty-button">
        <button @click="addColumn" class="btn btn-primary btn-block">Add Column</button>
      </div>

      <div>You can also <a @click="deleteRow">delete</a> this row.</div>
    </div>

    <div data-hidden class="actions" v-else>
      <button v-if="columns.length < 3 && totalWidth < 24" @click="addColumn" class="btn btn-primary float">
        <i class="el-icon-plus"></i>
        <span>Add Column</span>
      </button>

      <button @click="deleteRow" class="btn btn-danger float delete">
        <i class="el-icon-delete"></i>
        <span>Delete Row</span>
      </button>
    </div>

    <column-component v-for="column in columns"
                      :key="column.colid"
                      :col="column"
                      :rid="rid"
                      :cid="row.cid"
                      :colspan="24 / columns.length"
                      :space="24 - totalWidth" />

  </div>
</template>

<script>
import ColumnComponent from "./ColumnComponent.vue"
import SlotTypes from "../../util/slot-types.json"

export default {
  components: {
    ColumnComponent
  },
  props: [ "rid", "row" ],
  data() {
    return {}
  },
  computed: {
    columns: function() {
      return this.$store.getters.getColumnsByRowID[this.rid]
    }, 
    slots() {
      return this.$store.getters.getSlotsByRowID[this.rid]
    },
    totalWidth() {
      if(!this.slots) return 0

      let res = 0
      this.slots.forEach(slot => {
        let type = _.find(SlotTypes, { id: slot.type })
        res += type.colspan 
      });
      return res
    }
  },
  methods: {
    deleteRow() {
      this.$store.dispatch("setDialogData", {
        title: 'Are you sure you want to delete this row?',
        type: 'delete-row',
        rid: this.rid
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    addColumn() {
      this.$store.dispatch('addColumn', {
        rid: this.row.rid,
        cid: this.row.cid
      })
    }
  }
}
</script>

<style scoped lang="scss">
.row {
  margin-bottom: 10px;

  &:hover {
    .float {
      opacity: 1;
    }
  }

  &.empty {
    padding: 16px 0;
    min-height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background:#d0e0e8;

    .empty-button {
      margin: 7px 0;
    }
  }

  .float {
    transition: all 0.43s;
    opacity: 0;
    float: right;
    position: relative;
    margin: -7px -7px -38px;

    &.delete {
      margin: 43px -7px -88px;
    }

    span {
      overflow: hidden;
      width: 0;
      display: inline-block;
      vertical-align: bottom;
      transition: all 0.43s;
    }

    &:hover {
      margin-right: -85px;

      span {
        width: 78px;
      }
    }

  }
}
</style>
