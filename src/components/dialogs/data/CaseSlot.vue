<template>
  <div class="dialog-inner">

    <div class="dialog-content">

    </div>

    <footer>
      <el-button type="primary" @click="saveChoice">Confirm</el-button>
    </footer>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import slotTypes from '../../../util/slot-types.js'

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
    }
  }
}
</script>

<style lang="scss" scoped>

.dialog-content {
  text-align: center;
  padding: 0 12px;
  margin-bottom: 18px;
}

footer {
  margin: 30px 0 -10px;
  text-align: right;
}

</style>
