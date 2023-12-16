<template>
  <div :id="sid" class="col spacer-slot">
    <span v-if="data.useHR" > <hr> </span>
    <span v-for="n in data.size" :key="n"> <br> </span>
  </div>
</template>

<script>
import slotMixin from '../mixins/slot-mixin.js'

export default {
  name: "SpacerSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],  
  data() {
    return {
      editing: null,
      data: this.slotData,
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  // padding: 16px;
  color: #333;
}

button {
  margin-top: 16px;
  margin-right: 7px;
}

</style>
