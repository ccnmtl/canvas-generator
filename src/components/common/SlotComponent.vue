<template>
  <el-col :span="colspan">
    <component :is="type" :slotData="slotData.data" :sid="sid" />
  </el-col>
</template>

<script>

import SlotTypes from '../../util/slot-types.json'

// Slot Types
import BannerSlot from '../slots/BannerSlot.vue'
import TitleSlot from '../slots/TitleSlot.vue'
import ContentSlot from '../slots/ContentSlot.vue'

export default {
  components: {
    BannerSlot,
    TitleSlot,
    ContentSlot,
  },
  props: [ "sid", "slotData", "colspan" ],
  data() {
    return {

    }
  },
  computed: {
    type() {
      return _.find(SlotTypes, { 'id': this.slotData.type }).type
    },
  }
}
</script>

<style scoped lang="scss">

</style>
