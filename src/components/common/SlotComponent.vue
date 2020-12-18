<template>
  <div class="slot-outer">
    <component :is="type"
               :slotData="slotData.data"
               :slotItem="slotData"
               :sid="sid"
               :class="{ small: colspan < 24 }" />
  </div>
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
