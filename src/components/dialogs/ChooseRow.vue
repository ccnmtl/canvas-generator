<template>
  <div class="dialog-inner">

    <el-tabs type="border-card">
      <el-tab-pane :label="dialogData.cid.toUpperCase() + ' ROWS'" v-if="Object.keys(pageRowTypes).length > 1">
        <div class="row">
          <el-col v-for="row in pageRowTypes" :key="row.id" :span="6" class="row-item">
            <el-popover
              placement="top"
              title="Row Preview"
              width="600"
              trigger="click">
              <img :src="imageServer + 'preview-images/rows/' + row.type + '.png'" alt="">
              <div v-if="isPageType(row)" class="row-content"
                    :class="{ selected: row.id === selectedRow }"
                    @click="selectedRow = row.id" slot="reference">
                <div class="row-icon">
                  <i :class="'el-icon-' + row.icon"></i>
                </div>
                <div class="row-title">{{ row.name }}</div>
              </div>
            </el-popover>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="OTHER ROWS" v-if="Object.keys(pageRowTypes).length > 1">
        <div class="row">
          <el-col v-for="row in otherRowTypes" :key="row.id" :span="6" class="row-item">
            <el-popover
              placement="top"
              title="Row Preview"
              width="600"
              trigger="click">
              <img :src="imageServer + 'preview-images/rows/' + row.type + '.png'" alt="">
              <div class="row-content"
                  :class="{ selected: row.id === selectedRow }"
                  @click="selectedRow = row.id"  slot="reference">
                <div class="row-icon">
                  <i :class="'el-icon-' + row.icon"></i>
                </div>
                <div class="row-title">{{ row.name }}</div>
              </div>
            </el-popover>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="All ROWS">
        <div class="row">
          <el-col v-for="row in RowTypes" :key="row.id" :span="6" class="row-item">
            <el-popover
              placement="top"
              title="Row Preview"
              width="600"
              trigger="click">
              <img :src="imageServer + 'preview-images/rows/' + row.type + '.png'" alt="">
              <div class="row-content"
                :class="{ selected: row.id === selectedRow }"
                @click="selectedRow = row.id"  slot="reference">
                <div class="row-icon">
                  <i :class="'el-icon-' + row.icon"></i>
                </div>
                <div class="row-title">{{ row.name }}</div>
              </div>
            </el-popover>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>




    <footer>
      <el-button type="primary" @click="saveChoice">Confirm</el-button>
    </footer>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  props: [
    'dialogData'
  ],
  name: 'ChooseRow',
  data() {
    return {
      selectedRow: 0
    }
  },
  computed: {
    ...mapGetters({
      fullRowTypes: 'getRowTypes',
      Config: 'getConfig',
      imageServer: 'getImageServer'

    }),
    RowTypes(){
      if (this.Config.rows.visible == '*'){
        return _.pickBy(this.fullRowTypes, (row, key) => {
          return !_.includes(this.Config.rows.hidden, row.type)
        })
      }
      else {
        return _.pickBy(this.fullRowTypes, (row, key) => {
          return _.includes(this.Config.rows.visible, row.type)
        })
      }
    },
    pageRowTypes(){
      return _.pickBy(this.RowTypes, (row, key) => {
        return this.isPageType(row)
      })
    },
    otherRowTypes(){
      return _.pickBy(this.RowTypes, (row, key) => {
        return !this.isPageType(row)
      })
    }
  },
  methods: {
    saveChoice() {
      let actualRowType 

      for (const [name, row] of Object.entries(this.RowTypes)){
        if (row.id == this.selectedRow) actualRowType = row
      }

      if(actualRowType.type === 'blank-row') {
        let newRow = this.$store.dispatch('addRow', {
          cid: this.dialogData.cid,
        })

        newRow.then( (res)=> {
          console.log(res)
          this.$store.dispatch("setDialogData", {
          title: 'Choose Column Type',
          type: 'choose-col',
          cid: this.dialogData.cid,
          rid: res.rid,
          })
        })
        // this.$store.dispatch("setDialogVisibility", false)
      }

      else {
        //const res = new CC(actualRowType.type, this.dialogData.cid)
        this.$store.dispatch('createRowsFromArray', {
          cid: this.dialogData.cid,
          rows: actualRowType.array
        })
        this.$store.dispatch("setDialogVisibility", false)
      }
    },
    isPageType(row){
      return _.includes(row.pages, this.dialogData.cid) || row.pages == "*"
    }
  },

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
