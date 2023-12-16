<template>
  <div class="dialog-inner">
    This action <strong>cannot</strong> be undone, proceed with caution.

    <footer>
      <el-button @click="$emit('cancelDialog')">Cancel</el-button>
      <el-button type="danger" @click="deleteColumn">Delete Column</el-button>
    </footer>
  </div>
</template>

<script>
export default {
  props: [
    'dialogData'
  ],
  name: 'DeleteColumn',
  data() {
    return {
      selectedSlot: 1
    }
  },
  methods: {
    deleteColumn() {
      this.$store.dispatch('deleteColumn', this.dialogData.colid)
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
