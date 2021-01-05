<template>
  <div class="slot-outer">
    <div class="delete-options" data-hidden>
      <el-button @click="showConfigSlot"
                 type="secondary"
                 icon="el-icon-s-tools"
                 circle>
        <span>Slot Options</span>
      </el-button>
    </div>
    <component :is="type"
               :slotData="data.data"
               :slotItem="data"
               :sid="sid"
               :class="[{ 'small-col': colspan < 24 }, ...data.classes]"
               :style="data.styles" />
  </div>
</template>

<script>

import _ from 'lodash'
import SlotTypes from '../../util/slot-types.json'

// Slot Types
import BannerSlot from '../slots/BannerSlot.vue'
import ButtonsSlot from '../slots/ButtonsSlot.vue'
import TitleSlot from '../slots/TitleSlot.vue'
import ImageSlot from '../slots/ImageSlot.vue'
import ContentSlot from '../slots/ContentSlot.vue'
import SpacerSlot from '../slots/SpacerSlot.vue'
import SimpleListSlot from '../slots/SimpleListSlot.vue'
import NameValueSlot from '../slots/NameValueSlot.vue'

export default {
  components: {
    BannerSlot,
    ButtonsSlot,
    TitleSlot,
    ImageSlot,
    ContentSlot,
    SpacerSlot,
    SimpleListSlot,
    NameValueSlot,
  },
  props: [ "sid", "slotData", "colspan" ],
  data() {
    return {
      data: {}
    }
  },
  watch: {
    slotData: {
      handler(val) {
        this.data = _.cloneDeep(val)
      },
      immediate: true
    }
  },
  computed: {
    type() {
      return _.find(SlotTypes, { 'id': this.data.type }).type
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
        slotData: this.data
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
