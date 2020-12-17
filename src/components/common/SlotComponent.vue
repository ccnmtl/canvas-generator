<template>
  <el-col :span="colspan">
    <component :is="type" :slotData="slotData.data" :sid="sid" />
  </el-col>
</template>

<script>

import SlotTypes from '../../util/slot-types.json'

// Slot Types
import BannerSlot from '../slots/BannerSlot.vue'

export default {
  components: {
    BannerSlot
  },
  props: [ "sid", "slotData" ],
  data() {
    return {

    }
  },
  computed: {
    type() {
      return _.find(SlotTypes, { 'id': this.slotData.type }).type
    },
    colspan() {
      return _.find(SlotTypes, { 'id': this.slotData.type }).colspan
    }
  }
}
</script>

<style scoped lang="scss">

</style>
