<template>
  <div class="dialog-inner">
    <div class="row">
      <el-col v-for="slot in slotTypes" :key="slot.id" :span="6" class="slot">
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

    <footer>
      <el-button type="primary" @click="saveChoice">Confirm</el-button>
    </footer>
  </div>
</template>

<script>

import SlotTypes from '../../util/slot-types.json'

export default {
  props: [
    'dialogData'
  ],
  name: 'ChooseSlot',
  data() {
    return {
      slotTypes: SlotTypes,
      selectedSlot: 1
    }
  },
  methods: {
    saveChoice() {
      const actualSlotType = _.find(SlotTypes, { 'id': this.selectedSlot })

      this.$store.dispatch('addSlot', {
        type: this.selectedSlot,
        rid: this.dialogData.rid,
        cid: this.dialogData.cid,
        colid: this.dialogData.colid,
        data: actualSlotType.defaultData
      })
      this.$store.dispatch("setDialogVisibility", false)
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
  }
}

footer {
  margin: 30px 0 -10px;
  text-align: right;
}

</style>
