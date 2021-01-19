<template>
  <div :id="sid" class="professor-ta-slot">
    <div class="pad-box-mini border border-tl">
      <div class="STV1_ProfileBG" style="background: rgb(31, 19, 71);">
        <img :src="slotData.imgSrc" class="STV1_SyllabusPhoto">
        </div>
        <p>{{ slotItem.type }}:</p>
        <p>
          {{ slotData.name }} (<a :href="'mailto:' + slotData.email">{{ slotData.email }}</a>)
          <br>
          Office Hours: <span>{{ slotData.office }}</span>
        </p>
      </div>
  </div>
</template>

<script>

import Vue from 'vue'

export default {
  name: "ProfessorTaSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  data() {
    return {
      editing: null,
      data: {},
    }
  },
  computed: {
    getterData: function () {
      if(!this.slotItem.getter) return null
      return this.$store.getters.getFromGetter(this.slotItem.getter)
    }
  },
  watch: {
    slotData: {
      handler(newVal) {
        this.data = newVal
      },
      immediate: true
    },
    getterData: {
      handler(newVal) {
        if (newVal !== null) {
          if(!this.data) {
            this.data = {}
          }

          Vue.set(this.data, 'items', newVal ? newVal : [])
        }
      },
      immediate: true
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
