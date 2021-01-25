<template>
  <div class="dialog-inner">

    <el-tabs type="border-card">
      <el-tab-pane :label="dialogData.cid.toUpperCase() + ' SLOTS'">
        <div class="slot">
          <el-col v-for="slot in pageSlotTypes" :key="slot.id" :span="6" class="slot">
            <div v-if="isPageType(slot)" class="slot-content"
                  :class="{ selected: slot.id === selectedSlot }"
                  @click="selectedSlot = slot.id">
              <div class="slot-icon">
                <i :class="'el-icon-' + slot.icon"></i>
              </div>
              <div class="slot-title">{{ slot.name }}</div>
            </div>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="OTHER SLOTS">
        <div class="slot">
          <el-col v-for="slot in otherSlotTypes" :key="slot.id" :span="6" class="slot-item">
            <div  class="slot-content"
                  :class="{ selected: slot.id === selectedSlot }"
                  @click="selectedSlot = slot.id">
              <div class="slot-icon">
                <i :class="'el-icon-' + slot.icon"></i>
              </div>
              <div class="slot-title">{{ slot.name }}</div>
            </div>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="All SLOTS">
        <div class="slot">
          <el-col v-for="slot in SlotTypes" :key="slot.id" :span="6" class="slot-item">
            <div class="slot-content"
                  :class="{ selected: slot.id === selectedSlot }"
                  @click="selectedSlot = slot.id">
              <div class="slot-icon">
                <i :class="'el-icon-' + slot.icon"></i>
              </div>
              <div class="slot-title">{{ slot.name }}</div>
            </div>
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

import slotTypes from '../../util/slot-types.js'

export default {
  props: [
    'dialogData'
  ],
  name: 'ChooseSlot',
  mixins: [slotTypes],  
  data() {
    return {
      selectedSlot: 1
    }
  },
  computed:{
    ...mapGetters({
      fullSlotTypes: 'getSlotTypes',
      Config: 'getConfig'      
    }),
    SlotTypes(){
      if (this.Config.slots.visible == '*'){
        return _.pickBy(this.fullSlotTypes, (slot, key) => {
          return !_.includes(this.Config.slots.hidden, slot.type)
        })
      }
      else {
        return _.pickBy(this.fullSlotTypes, (slot, key) => {
          return _.includes(this.Config.slots.visible, slot.type)
        })
      }      
    },
    pageSlotTypes(){
      return _.pickBy(this.SlotTypes, (slot, key) => {
        return this.isPageType(slot)
      })
    },
    otherSlotTypes(){
      return _.pickBy(this.SlotTypes, (slot, key) => {
        return !this.isPageType(slot)
      })
    }    

  },
  methods: {
    saveChoice() {
      const actualSlotType = this.findSlot('id', this.selectedSlot)

      this.$store.dispatch('addSlot', {
        getter: actualSlotType.getter,
        type: this.selectedSlot,
        rid: this.dialogData.rid,
        cid: this.dialogData.cid,
        colid: this.dialogData.colid,
        data: actualSlotType.defaultData
      })
      this.$store.dispatch("setDialogVisibility", false)
    },
    isPageType(slot){
      return _.includes(slot.pages, this.dialogData.cid) || slot.pages == "*"
    }    
  }
}
</script>

<style lang="scss" scoped>

.slot {
  text-align: center;
  padding: 0 12px;
  margin-bottom: 16px;

  .slot-content {
    transition: all 0.43s;
    padding: 12px 0;
    border: 1px solid #CCC;
    cursor: pointer;

    .slot-icon {
      font-size: 32px;
    }

    .slot-title {
      font-size: 16px;
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
