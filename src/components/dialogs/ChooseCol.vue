<template>
  <div class="dialog-inner">

    <el-tabs type="border-card">
      <el-tab-pane :label="pageTitle.toUpperCase() + ' COLUMNS'" v-if="Object.keys(pageColTypes).length > 1">
        <div class="col">
          <el-col v-for="col in pageColTypes" :key="col.id" :span="6" class="col-item">
            <el-popover
              placement="top"
              title="Column Preview"
              width="400"
              trigger="click">
              <img :src="imageServer + 'preview-images/cols/' + col.type + '.png'" alt="">
              <div v-if="isPageType(col)" class="col-content"
                    :class="{ selected: col.id === selectedCol }"
                    @click="selectedCol = col.id" slot="reference">
                <div class="col-icon">
                  <i :class="'el-icon-' + col.icon"></i>
                </div>
                <div class="col-title">{{ col.name }}</div>
              </div>
            </el-popover>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="OTHER COLUMNS " v-if="Object.keys(pageColTypes).length > 1">
        <div class="col">
          <el-col v-for="col in otherColTypes" :key="col.id" :span="6" class="col-item">
            <el-popover
              placement="top"
              title="Column Preview"
              width="400"
              trigger="click">
              <img :src="imageServer + 'preview-images/cols/' + col.type + '.png'" alt="">
              <div v-if="isPageType(col)" class="col-content"
                    :class="{ selected: col.id === selectedCol }"
                    @click="selectedCol = col.id" slot="reference">
                <div class="col-icon">
                  <i :class="'el-icon-' + col.icon"></i>
                </div>
                <div class="col-title">{{ col.name }}</div>
              </div>
            </el-popover>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="All COLUMNS">
        <div class="col">
          <el-col v-for="col in ColTypes" :key="col.id" :span="6" class="col-item">
            <el-popover
              placement="top"
              title="Column Preview"
              width="400"
              trigger="click">
              <img :src="imageServer + 'preview-images/cols/' + col.type + '.png'" alt="">
              <div v-if="isPageType(col)" class="col-content"
                    :class="{ selected: col.id === selectedCol }"
                    @click="selectedCol = col.id" slot="reference">
                <div class="col-icon">
                  <i :class="'el-icon-' + col.icon"></i>
                </div>
                <div class="col-title">{{ col.name }}</div>
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
  name: 'ChooseCol',
  data() {
    return {
      selectedCol: 0
    }
  },
  computed: {
    ...mapGetters({
      fullColTypes: 'getColTypes',
      Config: 'getConfig',
      imageServer: 'getImageServer'
    }),
    ColTypes(){
      if (this.Config.cols.visible == '*'){
        return _.pickBy(this.fullColTypes, (col, key) => {
          return !_.includes(this.Config.cols.hidden, col.type)
        })
      }
      else {
        return _.pickBy(this.fullColTypes, (col, key) => {
          return _.includes(this.Config.cols.visible, col.type)
        })
      }
    },
    pageColTypes(){
      return _.pickBy(this.ColTypes, (col, key) => {
        return this.isPageType(col)
      })
    },
    otherColTypes(){
      return _.pickBy(this.ColTypes, (col, key) => {
        return !this.isPageType(col)
      })
    },
    pageTitle(){
      let pageTitle = this.dialogData.cid
      if (this.dialogData.cid.includes('activity-')) pageTitle = 'activity'
      return pageTitle
    }
  },
  methods: {
    saveChoice() {
      let actualColType 
      let cid = this.dialogData.cid
      let rid = this.dialogData.rid

      for (const [name, col] of Object.entries(this.ColTypes)){
        if (col.id == this.selectedCol) actualColType = col
      }

      if(this.dialogData.action == 'new'){
        console.log('new')
        this.$store.dispatch('addRow', { cid }).then( newRow => {
            this.$store.dispatch('addColumn', {
              cid,
              rid: newRow.rid
            }).then( newCol => {
              if(actualColType.type === 'blank-col'){
                console.log('blank')
                this.$store.dispatch("setDialogData", {
                title: 'Choose Slot',
                type: 'choose-slot',
                colid: newCol.colid,
                space: 12,
                cid,
                rid,
                })
              }
              else {
                this.$store.dispatch('createSlotsFromArray', {
                  rid: newRow.rid,
                  colid: newCol.colid,          
                  slots: actualColType.array,
                })
                this.$store.dispatch("setDialogVisibility", false)
              }
            })
          })
      }
      else if(actualColType.type === 'blank-col') {
        this.$store.dispatch('addColumn', { cid, rid }).then( newCol => {
            this.$store.dispatch("setDialogData", {
            title: 'Choose Slot',
            type: 'choose-slot',
            colid: newCol.colid,
            space: 12,
            cid,
            rid,
            })
          })
      }
      else if(this.dialogData.action == 'append'){
        this.$store.dispatch('createSlotsFromArray', {
          rid,
          colid: this.dialogData.colid,          
          slots: actualColType.array,
        })
        this.$store.dispatch("setDialogVisibility", false)
      }
      else {
        //const res = new CC(actualColType.type, this.dialogData.cid)
        this.$store.dispatch('createColumnsFromArray', {
          rid,
          colid: this.dialogData.colid,          
          columns: [actualColType.array],
        })
        this.$store.dispatch("setDialogVisibility", false)
      }
    },
    isPageType(col){
      return _.includes(col.pages, this.pageTitle) || col.pages == "*"
    }
  },

}
</script>

<style lang="scss" scoped>

.col-item {
  text-align: center;
  padding: 0 12px;
  margin-bottom: 18px;

  .col-content {
    transition: all 0.43s;
    padding: 12px 0;
    border: 1px solid #CCC;
    cursor: pointer;

    .col-icon {
      font-size: 32px;
    }

    .col-title {
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
