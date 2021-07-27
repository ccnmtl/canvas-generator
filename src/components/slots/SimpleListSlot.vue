<template>
  <div :id="sid" class="col simple-list-slot" v-if="data.items.length > 0">
    <h5>{{ data.title }}</h5>

    <div class="simple-list">
      <p class="simple-list-item" v-for="(item, i) in data.items" :key="item[data.idField]">
        <span data-dbclick @dblclick="setEditing('name')" v-if="editing !== 'name'" >{{ item[data.labelField] }}</span>
        <span data-hidden v-else>
          <input ref="name"
                 @blur="finishEditing(slotItem.getter + '['+i+'].fromGetter', 'items['+i+']')"
                 v-model="item[data.labelField]">
        </span>
        <template v-if="data.type == 'instructor-ta'">
          <!-- Email:  -->
          <span data-dbclick @dblclick="setEditing('email')" v-if="editing !== 'email'">(<a @click="doNothing" :href="'mailto:' + item[data.emailField]" v-if="item[data.emailField]">{{ item[data.emailField] }}</a>)</span>
          <span data-hidden v-else>
            <input ref="email"
                   @blur="finishEditing(slotItem.getter + '['+i+'].fromGetter', 'items['+i+']')"
                   v-model="item[data.emailField]">
          </span>
          <br />

          <!-- Office Hours:  -->
          <span data-dbclick @dblclick="setEditing('office')" v-if="editing !== 'office'" >{{ item[data.officeField] }}</span>
          <span data-hidden v-else>
            <input ref="office"
                   @blur="finishEditing(slotItem.getter + '['+i+'].fromGetter', 'items['+i+']')"
                   v-model="item[data.officeField]">
          </span>
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
