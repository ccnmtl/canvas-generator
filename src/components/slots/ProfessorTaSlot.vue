<template>
  <div :id="sid" class="professor-ta-slot">
    <div class="pad-box-mini border border-tl">
      <div class="STV1_ProfileBG color-columbia-blue" :style="{background:getTheme.primary}">
        <img :src="slotData.imgSrc" class="STV1_SyllabusPhoto">
        </div>
        <p>{{ slotData.type }}:</p>
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
import slotMixin from '../mixins/slot-mixin.js'

export default {
  name: "ProfessorTaSlot",
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
