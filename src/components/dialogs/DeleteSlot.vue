<template>
  <div class="dialog-inner">
    This action <strong>can not</strong> be undone, proceed with caution.

    <footer>
      <el-button @click="$emit('cancelDialog')">Cancel</el-button>
      <el-button type="danger" @click="deleteSlot">Delete Slot</el-button>
    </footer>
  </div>
</template>

<script>

import SlotTypes from '../../util/slot-types.json'

export default {
  props: [
    'dialogData'
  ],
  name: 'DeleteSlot',
  data() {
    return {
      slotTypes: SlotTypes,
      selectedSlot: 1
    }
  },
  methods: {
    deleteSlot() {
      const actualSlotType = _.find(SlotTypes, { 'id': this.selectedSlot })

      this.$store.dispatch('deleteSlot', this.dialogData.sid)
      this.$store.dispatch("setDialogVisibility", false)
    }
  }
}
</script>

<style lang="scss" scoped>

.slot {
  text-align: center;
  padding: 0 12px;

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
