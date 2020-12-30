<template>
  <div class="slot-outer">
    <div class="delete-options">
      <el-button @click="showConfigSlot"
                 type="secondary"
                 icon="el-icon-s-tools"
                 circle>
        <span>Slot Options</span>
      </el-button>
    </div>
    <component :is="type"
               :slotData="slotData.data"
               :slotItem="slotData"
               :sid="sid"
               :class="[{ small: colspan < 24 }, ...slotData.classes]"
               :style="slotData.styles" />
  </div>
</template>

<script>

import SlotTypes from '../../util/slot-types.json'

// Slot Types
import BannerSlot from '../slots/BannerSlot.vue'
import TitleSlot from '../slots/TitleSlot.vue'
import ImageSlot from '../slots/ImageSlot.vue'
import ContentSlot from '../slots/ContentSlot.vue'

export default {
  components: {
    BannerSlot,
    TitleSlot,
    ImageSlot,
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
    showConfigSlot() {
      this.$store.dispatch("setDialogData", {
        title: 'Config Slot',
        type: 'config-slot',
        slotData: this.slotData
      })
      this.$store.dispatch("setDialogVisibility", true)      
    }
  }
}
</script>

<style scoped lang="scss">
.slot-outer {
  .delete-options {
    transition: all 0.43s;
    width: 3vw;
    float: left;
    z-index: 100;
    text-align: center;
    position: relative;
    margin-top: -25px;
    margin-left: -20px;
    opacity: 0;
    margin-bottom: -100%;

    button {
      transition: all 0.43s;
      margin: 4px 0;
      border-radius: 20px;
      box-shadow: 1px 1px 3px 0 #00000044;
      padding: 10px 6px 10px 11px;

      span {
        transition: all 0.43s;
        display: inline-block;
        width: 0;
        overflow: hidden;
        margin-left: 0;
        vertical-align: text-top;
      }

      &:hover {
        padding: 10px 11px;
        
        span {
          width: 77px;
        }
      }
    }
  }

  &:hover {
    .delete-options {
      margin-top: -16px;
      opacity: 1;
    }
  }
}
</style>
