<template>
  <div :id="sid" class="col content-slot">
    <img :src="data.imgSrc" :style="[forceDimensions ? {width: data.width + 'px', height: data.height + 'px'} : {}]" alt="" @dblclick="openUploadDialog()" />
  </div>
</template>

<script>
import slotMixin from '../mixins/slot-mixin.js'


export default {
  name: "ImageSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],  
  data() {
    return {
      editing: null,
      data: null,
      forceDimensions: false,
      imgWidth: this.slotData.width || 300,
      imgHeight: this.slotData.height || 300,
    }
  },
  watch: {
    slotData: {
      handler(newVal) {
        this.data = newVal
      },
      immediate: true
    }
  },
  methods: {
    openUploadDialog(){
      this.$store.dispatch("setDialogData", {
        title: 'Upload Image',
        type: 'upload-image',
        defaultWidth: this.slotData.width || 300,
        defaultHeight: this.slotData.height || 300,
        item: this.slotItem
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  // padding: 12px;
  color: #333;
}

button {
  margin-top: 16px;
  margin-right: 7px;
}

</style>
