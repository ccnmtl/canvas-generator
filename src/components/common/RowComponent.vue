<template>
  <div class="row content-box" :class="{ empty: !columns }">
    <div data-hidden class="empty-text" v-if="!columns">
      Start adding columns to this row!

      <div class="empty-button">
        <button @click="chooseCol" class="btn btn-primary btn-block">Add Column</button>
        <button @click="buildHomeWelcomeRow({cid: row.cid})" class="btn btn-primary btn-block">Add Custom Row</button>
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
    <div class="grid-row">
      <column-component v-for="column in sortedColumns"
                          :key="column.colid"
                          :col="column"
                          :rid="rid"
                          :cid="row.cid"
                          :colspan="colspan"
                          :space="12 - totalWidth" />

    </div>
    </div>

</template>

<script>

import _ from 'lodash'
import ColumnComponent from "./ColumnComponent.vue"
import RowTypeMixin from "../../util/row-types"

export default {
  components: {
    ColumnComponent
  },
  mixins: [RowTypeMixin],
  props: [ "rid", "row" ],
  data() {
    return {}
  },
  computed: {
    columns: function() {
      return this.$store.getters.getColumnsByRowID[this.rid]
    },
    sortedColumns: function() {
      return _.sortBy(this.columns, ['sort'])
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
        cid: this.cid,
        rid: this.rid,
        space: this.space
      })
      this.$store.dispatch("setDialogVisibility", true)
    },    
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
