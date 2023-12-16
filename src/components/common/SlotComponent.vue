<template>
  <div class="slot-outer">
    <div data-hidden class="delete-options">
      <el-button @click="showSlotData"
                 type="secondary"
                 icon="el-icon-edit"
                 circle
                 v-if="showEdit">
        <span class="smaller">Edit</span>
      </el-button>
      <el-button @click="showDeleteSlot"
                 type="danger"
                 icon="el-icon-delete"
                 circle>
        <span>Delete Slot</span>
      </el-button>
    </div>
    <div data-hidden data-always class="delete-options" v-if="showEdit">
      <el-button @click="showSlotData"
                 type="success"
                 icon="el-icon-edit"
                 circle>
        <span class="smaller">Edit</span>
      </el-button>
    </div>
    <component :is="type"
               :slotData="data.data"
               :slotItem="data"
               :sid="sid"
               :class="[{ 'small-col': colspan < 24 }, ...data.classes]"
               :style="data.styles"
               :width="width" />
  </div>
</template>

<script>

import Vue from 'vue'
import _ from 'lodash'
import slotTypes from '../../util/slot-types.js'

// Slot Types
import BannerSlot from '../slots/BannerSlot.vue'
import ActivityItemSlot from '../slots/ActivityItemSlot.vue'
import InstructorListSlot from '../slots/InstructorListSlot.vue'
import ActivityItemListSlot from '../slots/ActivityItemListSlot.vue'
import ButtonsSlot from '../slots/ButtonsSlot.vue'
import TitleSlot from '../slots/TitleSlot.vue'
import ImageSlot from '../slots/ImageSlot.vue'
import VideoSlot from '../slots/VideoSlot.vue'
import ActivityVideoListSlot from '../slots/ActivityVideoListSlot.vue'
import ActivityTableSlot from '../slots/ActivityTableSlot.vue'
import ContentSlot from '../slots/ContentSlot.vue'
import SpacerSlot from '../slots/SpacerSlot.vue'
import ListSlot from '../slots/ListSlot.vue'
import SimpleListSlot from '../slots/SimpleListSlot.vue'
import NameValueSlot from '../slots/NameValueSlot.vue'
import CaseSlot from '../slots/CaseSlot.vue'


export default {
  components: {
    ListSlot,
    BannerSlot,
    ActivityItemSlot,
    ActivityItemListSlot,
    InstructorListSlot,
    ButtonsSlot,
    TitleSlot,
    ImageSlot,
    VideoSlot,
    CaseSlot,
    ActivityVideoListSlot,
    ActivityTableSlot,
    ContentSlot,
    SpacerSlot,
    SimpleListSlot,
    NameValueSlot,
  },
  props: [ "sid", "slotData", "colspan", "width" ],
  mixins: [slotTypes],
  data() {
    return {
      data: {}
    }
  },
  watch: {
    slotData: {
      handler(val) {
        //console.log(val)
        Vue.set(this, 'data', _.cloneDeep(val))
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    type() {
      return this.findSlot('id', this.data.type ).type
    },
    typeName() {
      return this.findSlot('id', this.data.type ).name
    },
    showEdit() {
      return this.type === 'banner-slot'
          || this.type === 'video-slot'
          || this.type === 'activity-video-list-slot'
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
    showSlotData() {
      this.$store.dispatch("setDialogData", {
        title: 'Slot Data - ' + this.typeName,
        type: 'slot-data-' + this.type,
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
          width: 74px;

          &.smaller {
            width: 64px;
          }
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
