<template>
  <div class="dialog-inner">
    <div class="row">
      <el-col v-for="row in rowTypes" :key="row.id" :span="6" class="row-item">
        <div class="row-content"
             :class="{ selected: row.id === selectedRow }"
             @click="selectedRow = row.id">
          <div class="row-icon">
            <i :class="'el-icon-' + row.icon"></i>
          </div>
          <div class="row-title">{{ row.name }}</div>
        </div>
      </el-col>
    </div>

    <footer>
      <el-button type="primary" @click="saveChoice">Confirm</el-button>
    </footer>
  </div>
</template>

<script>

import RowTypes from '../../util/row-types.json'
import { CC } from '../../util/custom-domponents.js'
import _ from 'lodash'

export default {
  props: [
    'dialogData'
  ],
  name: 'ChooseRow',
  data() {
    return {
      rowTypes: RowTypes,
      selectedRow: 0
    }
  },
  methods: {
    saveChoice() {
      const actualRowType = _.find(RowTypes, { 'id': this.selectedRow })

      if(actualRowType.type === 'blank_row') {
        this.$store.dispatch('addRow', {
          cid: this.dialogData.cid,
        })
        this.$store.dispatch("setDialogVisibility", false)
      }

      else {
        const res = new CC(actualRowType.type, this.dialogData.cid)
        this.$store.dispatch(res.method, {
          cid: this.dialogData.cid,
          rows: actualRowType.array
        })
        this.$store.dispatch("setDialogVisibility", false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.row-item {
  text-align: center;
  padding: 0 12px;
  margin-bottom: 18px;

  .row-content {
    transition: all 0.43s;
    padding: 12px 0;
    border: 1px solid #CCC;
    cursor: pointer;

    .row-icon {
      font-size: 32px;
    }

    .row-title {
      font-size: 14px;
    }

    &:hover {
      background-color: #EEE;
    }

    &.selected {
      background: #FFF;
      border-color: #20a0ff;
      color: #20a0ff;
      cursor: default;
    }

    &.disabled {
      background-color: #CCC;
      cursor: not-allowed;
      border-color: #999;
      opacity: .52;
    }
  }
}

footer {
  margin: 30px 0 -10px;
  text-align: right;
}

</style>
