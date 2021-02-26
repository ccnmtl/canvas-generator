<template>
  <div :id="sid" class="col simple-list-slot" v-if="data.items.length > 0">
    <h5>{{ data.title }}</h5>
    <div class="simple-list">
      <p class="simple-list-item" v-for="item in data.items" :key="item[data.idField]">
        {{ item[data.labelField] }}
        <template v-if="data.type == 'instructor-ta'">
          <span v-if='item[data.emailField]'>(<a :href="'mailto:' + item[data.emailField]">{{ item[data.emailField] }}</a>) </span>
          <br />
          {{ item[data.officeField] }}
        </template>
      </p>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import slotMixin from '../mixins/slot-mixin.js'

export default {
  name: "SimpleListSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
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
