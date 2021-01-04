<template>
  <div class="slot-outer" :class="{ 'settings-open' : showSettings }">
    <component :is="type"
               :slotData="slotData.data"
               :slotItem="slotData"
               :sid="sid"
               :class="{ small: colspan < 24 }" />

    <div data-hidden class="actions">
      <button @click="showSlotSettings" class="btn btn-secondary">
        <i class="el-icon-edit" /> Slot Options
      </button>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import SlotTypes from '../../util/slot-types.json'

// Slot Types
import BannerSlot from '../slots/BannerSlot.vue'
import TitleSlot from '../slots/TitleSlot.vue'
import ImageSlot from '../slots/ImageSlot.vue'
import ContentSlot from '../slots/ContentSlot.vue'
import SpacerSlot from '../slots/SpacerSlot.vue'

export default {
  components: {
    BannerSlot,
    TitleSlot,
    ImageSlot,
    ContentSlot,
    SpacerSlot,
  },
  props: [ "sid", "slotData", "colspan" ],
  data() {
    return {
      showSettings: false
    }
  },
  computed: {
    type() {
      return _.find(SlotTypes, { 'id': this.slotData.type }).type
    },
  },
  methods: {
    showDeleteSlot() {
      this.$store.dispatch("setDialogData", {
        title: 'Delete Slot',
        type: 'delete-slot',
        sid: this.sid
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    showSlotSettings() {
      this.$store.dispatch("setSettingsVisibility", true)
    }
  }
}
</script>

<style scoped lang="scss">

.slot-outer {
  .actions {
    transition: all 0.43s;
    z-index: 99;
    padding-top: 3px;
    margin-bottom: 0px;
    opacity: 1;
    height: 45px;
    position: relative;
    text-align: left;
  }
}

</style>
