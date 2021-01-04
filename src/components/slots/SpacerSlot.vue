<template>
  <div :id="sid" class="col spacer-slot"></div>
</template>

<script>

export default {
  name: "SpacerSlot",
  props: [ "sid", "slotData", "slotItem" ],
  data() {
    return {
      editing: null,
      data: this.slotData,
    }
  },
  methods: {
    setEditing(field) {
      this.editing = field
    },
    finishEditing() {
      if(this.data.content) {
        this.$store.dispatch("updateSlotData", {
          item: this.slotItem,
          data: this.data
        })
        this.editing = null
      }
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
  padding: 16px;
  color: #333;
}

button {
  margin-top: 16px;
  margin-right: 7px;
}

</style>
