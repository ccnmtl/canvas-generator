<template>
  <div class="item-group-container" style="padding-bottom: 0px;">
    <div class="item-group-condensed">
        <ul id="cond_group_1" class="ig-list">
          <li v-for="(item, index) in itemList" :key="item.id">
            <activity-item-slot 
            :slotData="{item, index}"
            :slotItem="{}"/>
          </li>
        </ul>
     </div>
  </div>
</template>

<script>

import slotMixin from '../mixins/slot-mixin.js'
import ActivityItemSlot from './ActivityItemSlot'

import { mapActions, mapGetters } from 'vuex'


export default {
  name: "ActivityItemListSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  components: {
    ActivityItemSlot,
  },  
  data() {
    return {
      editing: null,
      data: {},
      editableProps: ['weekID', 'type']
    }
  },
  computed: {
    ...mapGetters(['getWeekPropByID']),
    itemList: function(){
      let list = this.getWeekPropByID(this.data.type + 's', this.data.weekID)
      return list.get
    }
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

</style>
