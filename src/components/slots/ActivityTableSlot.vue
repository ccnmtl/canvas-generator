<template>
  <div >
    <table class="ic-Table ic-Table--hover-row">
      <thead>
        <tr>
          <!-- Column Labels -->
          <!-- If you add a label here for an additional column, that column must be added to all rows as well -->
          <th>Week</th>
          <th v-if="info.useDates">Date</th>
          <th>Topic</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(week, index) in weeks" :key="week.id">
          <td>{{index + 1}}</td>
          <td v-if="info.useDates" >{{formatWeek(week.date)}}</td>
          <td>{{week.title}}</td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>

import slotMixin from '../mixins/slot-mixin.js'

import { mapActions, mapGetters } from 'vuex'


export default {
  name: "ActivityTableSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  components: {
  },  
  data() {
    return {
      editing: null,
      data: {},
    }
  },
  computed: {
    ...mapGetters(['getInfo', 'getWeeks','getWeekPropByID']),
    info() {
      return this.getInfo
    },
    weeks() {
      return this.getWeeks
    },
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
