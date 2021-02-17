<template>
  <div :id="sid"  class="ig-row ig-published">
      <div class="ig-row__layout">
          <div class="ig-type-icon" aria-hidden="true"><i :class="iconType"></i></div>
          <div class="ig-info"><a class="ig-title" :href="data.item.link" :data-api-endpoint="data.item.link" :data-api-returntype="data.item.type"> {{data.item.type.charAt(0).toUpperCase() + data.item.type.slice(1)}} {{data.index + 1}}</a>
            <div class="ig-details">
              <!-- <div class="ig-details__item"><strong>Due</strong> {{formatWeek(data.item.due)}}</div>
              <div class="ig-details__item">
                <name-value-slot 
                  :sid="'name-value-' + this.sid"
                  :slotData='{type: "date", name: "Due", value: data.item.due, nameStyle: {"font-weight": "bold"}}'
                  :slotItem={} />
                </div> -->
                <div class="ig-details__item">
                <name-value-slot 
                  :sid="'name-value-' + this.sid"
                  :slotData='{type: "date", name: "Due", value: "",nameStyle: {"font-weight": "bold"}}'
                  :slotItem='{
                    getter: {
                      value: testGetter
                    }}'
                   />
                </div>

              <!-- <div class="ig-details__item">{{data.points}} pts</div> -->
            </div>
          </div>
      </div>
  </div>
</template>

<script>

import slotMixin from '../mixins/slot-mixin.js'
import NameValueSlot from './NameValueSlot'
import TitleSlot from './TitleSlot'

import { mapActions, mapGetters } from 'vuex'


export default {
  name: "ActivityItemSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  components: {
    NameValueSlot,
    TitleSlot
  },  
  data() {
    return {
      editing: null,
      data: {},
      editableProps: ['type', 'item', 'index']
    }
  },
  computed: {
    ...mapGetters(['getWeekItemPropGetter','getWeekItemPropByID']),
    iconType: function() {
      return 'icon-' + this.data.item.type
    },
    testGetter: function() {
      return this.getWeekItemPropGetter('due', this.data.item.type + 's', this.data.item.id)
    },
    testValue: function() {
      return this.getWeekItemPropByID('due', this.data.item.type + 's', this.data.item.id)
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
