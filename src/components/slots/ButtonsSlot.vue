<template>
  <div :id="sid" class="col button-slot">
    <template v-for="button in data.buttons">
      <button class="Button" v-if="button.type == 'button'" :key="button.label">{{ button.label }}</button>
      <router-link class="Button"
         style="margin-right: 5px"
         v-else
         :key="button.label"
         :to="button.to ? button.to : '/'">{{ button.label }}</router-link>
    </template>
  </div>
</template>

<script>

export default {
  name: "ButtonsSlot",
  props: [ "sid", "slotData", "slotItem" ],
  data() {
    return {
      editing: null,
      data: this.slotData,
    }
  },
  methods: {
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
