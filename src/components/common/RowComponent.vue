<template>
  <div class="row content-box"
       :class="[{ empty: !columns }, { 'dragging-mode': $store.getters.isDndMode }]" draggable>

    <div data-hidden class="empty-text" v-if="!columns">
      Start adding columns to this row!

      <div class="empty-button">
        <button @click="addColumn" class="btn btn-primary btn-block">Add Column</button>
        <button @click="buildHomeWelcomeRow({cid: row.cid})" class="btn btn-primary btn-block">Add Custom Row</button>
      </div>

      <div>You can also <a @click="deleteRow">delete</a> this row.</div>
    </div>

    <div data-hidden class="actions" v-else>
      <button v-if="columns.length < 3 && totalWidth < 12" @click="addColumn" class="btn btn-primary float">
        <i class="el-icon-plus"></i>
        <span>Add Column</span>
      </button>

      <button @click="deleteRow" class="btn btn-danger float delete">
        <i class="el-icon-delete"></i>
        <span>Delete Row</span>
      </button>
    </div>
    <div class="row">
      <draggable :disabled="!isDndMode || getDragType !== 'columns'" v-model="sortedColumns" group="columns" @start="drag=true" @end="drag=false">
        <column-component v-for="column in sortedColumns"
                            :key="column.colid"
                            :col="column"
                            :rid="rid"
                            :cid="row.cid"
                            :colspan="colspan"
                            :space="12 - totalWidth" />
      </draggable>

    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import { mapGetters } from "vuex"
import draggable from 'vuedraggable'
import ColumnComponent from "./ColumnComponent.vue"
import RowTypeMixin from "../../util/row-types"

export default {
  components: {
    ColumnComponent,
    draggable
  },
  mixins: [RowTypeMixin],
  props: [ "rid", "row" ],
  data() {
    return {}
  },
  computed: {
    ...mapGetters([ 'getDraggedRow', 'isDndMode', 'getDragType' ]),
    columns: function() {
      return this.$store.getters.getColumnsByRowID[this.rid]
    },
    sortedColumns: {
      get() {
        return _.sortBy(this.columns, ['sort'])
      },
      set(val) {
        this.$store.dispatch('setColumnsOrder', val)
      }
    },
    totalWidth() {
      if(!this.columns) return 0

      let total = 0
      this.columns.forEach(column => {
        if(column.width) total += column.width
      })

      return total
    },
    colsWithoutWidth() {
      let total = 0

      this.columns.forEach(column => {
        if(!column.width) total++
      })

      return total
    },
    colspan() {
      return (12 - this.totalWidth) / (this.colsWithoutWidth > 0 ? this.colsWithoutWidth : 1)
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
    },
    startDragging() {
      this.$store.dispatch('setDraggingRow', true)
      this.$store.dispatch('setDraggedRow', this.row)
    }
  }
}
</script>

<style scoped lang="scss">
.row {
  margin-bottom: 10px;

  &.dragging-mode {
    transition: all 0.43s;
    opacity: .7;

    &:hover {
      opacity: 1;
    }
  }

  &:hover {
    .float {
      opacity: 1;
    }
  }

  .drag-handler {
    transition: all 0.43s;
    position: absolute;
    z-index: 999;
    background: #DDD;
    font-size: 26px;
    width: 37px;
    text-align: center;
    border-radius: 50%;
    cursor: move;
    margin-left: -50px;
    top: calc(50% - 37px);
  }

  &.empty {
    padding: 16px 0;
    min-height: 20vh;
    display: relative;
    align-items: center;
    justify-content: center;
    background:#d0e0e8;

    .empty-text {
      width: 300px;
      text-align: center;
      margin: 0 auto;
    }

    .empty-button {
      margin: 7px 0;
    }
  }

  .float {
    transition: all 0.43s;
    opacity: 0;
    float: right;
    position: relative;
    margin: -7px -30px -38px;
    z-index: 10;

    &.delete {
      margin: 43px -30px -88px;
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
