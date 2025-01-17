<template>
  <div class="outer-row content-box"
       :class="[{ empty: !columns }, { 'dragging-mode': $store.getters.isDndMode }]" draggable>

    <div data-hidden class="empty-text" v-if="!columns">
      Start adding columns to this row!

      <div class="empty-button">
        <button @click="chooseCol" class="btn btn-primary btn-block">Add Column</button>
      </div>

      <div>You can also <a @click="deleteRow">delete</a> this row.</div>
    </div>


    <div data-hidden class="actions" v-else>
      <button v-if="columns.length < 3 && totalWidth < 12" @click="chooseCol" class="btn btn-primary float">
        <i class="el-icon-plus"></i>
        <span>Add Column</span>
      </button>

      <button @click="deleteRow" class="btn btn-danger float delete">
        <i class="el-icon-delete"></i>
        <span>Delete Row</span>
      </button>
    </div>

    <div data-hidden data-always class="actions">
      <router-link
          to="/activity"
          @click.native="setSelectedWeek"
          v-if="row.data && row.data.weekID" >
          <button  class="btn  btn-success float">
            <i class="el-icon-edit"></i>
            <span>Edit Activity</span>
          </button>
      </router-link>
    </div>

    <div class="row" style="display: flex; margin: 0 -15px">
      <draggable style="width: 100%; display: flex" :disabled="!isDndMode || getDragType !== 'columns'" v-model="sortedColumns" group="columns" @start="drag=true" @end="drag=false">
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
        rid: this.rid,
        row: this.row
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    addColumn() {
      this.$store.dispatch('addColumn', {
        rid: this.row.rid,
        cid: this.row.cid
      })
    },
    chooseCol(){
      this.$store.dispatch("setDialogData", {
        title: 'Choose Column Type',
        type: 'choose-col',
        cid: this.row.cid,
        rid: this.rid,
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    setSelectedWeek(){
      this.$store.dispatch('setStateField', {
        field: 'selectedWeekID',
        value: this.row.data.weekID
      })
    }
  }
}
</script>

<style scoped lang="scss">
.outer-row {
  margin-bottom: 10px;
  padding: 0 15px;

  &.dragging-mode {
    transition: all 0.43s;
  }

  &:hover {
    .float {
      opacity: 1;
    }
  }

  .grid-row {
    box-sizing: border-box;
    display: block;
    -webkit-flex-direction: column;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: 0;
    margin-left: 0;
    width: auto;

    .h {
      display: none;
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
