<template>
  <div :id="sid" class="row list-slot">
    <component class=""
               :is="slotData.component"
               v-for="item in data.items"
               :key="item.id"
               :sid="'list-slot-' + item.id"
               :slotData="item"
               :slotItem="{}"/>
  </div>
</template>

<script>

import Vue from 'vue'
import ProfessorTaSlot from './ProfessorTaSlot.vue'
import CaseSlot from './CaseSlot.vue'
import slotMixin from '../mixins/slot-mixin.js'

export default {
  components: {
    ProfessorTaSlot, CaseSlot
  },
  name: "ListSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  data() {
    return {
      editing: null,
      data: {
      },
    }
  },
  computed: {
  },
  watch: {
    
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

.col {
  display: flex;
}

</style>
