<template>
  <div :id="sid" class="row list-slot" style="display: flex;">
    <professor-ta-slot class="col-md-6"
               v-for="item in itemList"
               :key="item.id"
               :sid="'professor-ta-slot-' + item.id"
               :slotData="item"
               :slotItem="item"/>
  </div>
</template>

<script>

import Vue from 'vue'
import ProfessorTaSlot from './ProfessorTaSlot.vue'
import slotMixin from '../mixins/slot-mixin.js'
import { mapGetters } from 'vuex'


export default {
  components: {
    ProfessorTaSlot
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
    ...mapGetters({
      info: 'getInfo',
    }),
    itemList: function() {
      return this.info.profs.concat(this.info.tas)
    }
  },
  watch: {

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

.col {
  display: flex;
}

</style>
