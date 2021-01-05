<template>
  <div :id="sid" class="col simple-list-slot">
    <h5>{{ data.title }}</h5>
    <div class="simple-list">
      <p class="simple-list-item" v-for="item in data.items" :key="item[data.idField]">
        {{ item[data.labelField] }}
        <template v-if="data.type == 'instructor-ta'">
          (<a :href="'mailto:' + item[data.emailField]">{{ item[data.emailField] }}</a>)
          <br />
          {{ item[data.officeField] }}
        </template>
      </p>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'

export default {
  name: "SimpleListSlot",
  props: [ "sid", "slotData", "slotItem" ],
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
