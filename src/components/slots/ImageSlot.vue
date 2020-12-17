<template>
  <div :id="sid" class="col content-slot">
    <img :src="slotData.imgSrc" :style="{width: slotData.width + 'px', height: slotData.height + 'px'}" alt="" @dblclick="openUploadDialog()"> </img>
    </div>
  </div>
</template>

<script>



export default {
  name: "ImageSlot",
  props: [ "sid", "slotData" ],
  data() {
    return {
      editing: null,
      data: this.slotData,
      imgWidth: 300,
      imgHeight: 300,
    }
  },
  methods: {
    openUploadDialog(){
      this.$store.dispatch("setDialogData", {
        title: 'Upload Image',
        type: 'upload-image',
        sid: this.sid
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
