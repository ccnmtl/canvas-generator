<template>
  <div :id="sid" class="col" style="align-items: center; justify-content: center;">
    <a :href="createLink(data.link)" @click="doNothing" :class="{'has-pointer': !data.link && !data.linkID}">
      <img :src="data.imgSrc" :alt="data.alt" :style="[data.forceDimensions ? {width: data.width + 'px', height: data.height + 'px'} : {}]" @dblclick="openUploadDialog()" />
    </a>
    
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
        title: 'Slot Data - Image',
        type: 'slot-data-image-slot',
        slotData: this.slotItem,
        setters: this.setters
      })
      this.$store.dispatch("setDialogVisibility", true)

      // this.$store.dispatch("setDialogData", {
      //   title: 'Upload Image',
      //   type: 'upload-image',
      //   defaultWidth: this.slotData.width || 300,
      //   defaultHeight: this.slotData.height || 300,
      //   item: this.slotItem,
      //   setters: this.setters
      // })
      // this.$store.dispatch("setDialogVisibility", true)
    },
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  color: #333;
  display: flex;
}

.has-pointer {
  cursor: context-menu;
}

button {
  margin-top: 16px;
  margin-right: 7px;
}

</style>
