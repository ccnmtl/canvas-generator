<template>
  <div :id="sid" class="col content-slot">
    <img :src="data.imgSrc" :style="[forceDimensions ? {width: data.width + 'px', height: data.height + 'px'} : {}]" alt="" @dblclick="openUploadDialog()" />
  </div>
</template>

<script>



export default {
  name: "ImageSlot",
  props: [ "sid", "slotData", "slotItem" ],
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
    deleteSlot() {
      this.$store.dispatch("setDialogData", {
        title: 'Are you sure you want to delete this slot?',
        type: 'delete-slot',
        sid: this.sid
      })
      this.$store.dispatch("setDialogVisibility", true)
    }
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  padding: 12px;
  color: #333;
}

button {
  margin-top: 16px;
  margin-right: 7px;
}

</style>
