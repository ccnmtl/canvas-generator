<template>
  <el-col :span="colspan">
    <div class="delete-options">
      <el-button @click="showDeleteSlot" type="danger" icon="el-icon-delete" circle></el-button>
    </div>
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
  },
  methods: {
    showDeleteSlot() {
      this.$store.dispatch("setDialogData", {
        title: 'Delete Slot',
        type: 'delete-slot',
        sid: this.sid
      })
      this.$store.dispatch("setDialogVisibility", true)
    }
  }
}
</script>

<style scoped lang="scss">
.delete-options {
  transition: all 0.43s;
  width: 3vw;
  float: right;
  z-index: 100;
  text-align: center;
  position: relative;
  margin-top: 5px;
  opacity: 0;
  margin-bottom: -100%;

  button {
    margin: 4px 0;
  }

  &:hover {
    margin-top: 10px;
    opacity: 1;
  }

}

</style>
