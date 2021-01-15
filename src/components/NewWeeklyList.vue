<template>
  <div class="home-page">
    <container-component cid="activities-list" :defaultRows="homeLayout"/>
  </div>

</template>

<script>
import ContainerComponent from './common/ContainerComponent.vue'
import RowTypes from '../util/row-types.js'
import { mapGetters, mapActions } from 'vuex'


export default {
  name: "NewWeekly",
  data() {
    return {
      homeLayout: [
        'banner-row',
      ],
    }
  },
  computed:{
    ...mapGetters({
      weeks: 'getWeeks',
    }),
    activityRows(){
      let rows =  this.$store.getters.getRowsByCID['activities-list'] || []
      return rows.filter( row => row.type == 'activity-row')
    }
  },
  methods: {
    ...mapActions(['deleteRow']),
  },
  watch: {
    weeks: {
      handler(newWeeks) {
          if (newWeeks !== null) {

            let weekIDs = []
            let rowWeekIDs = []
            newWeeks.forEach(week => weekIDs.push(week.id))
            this.activityRows.forEach(row => rowWeekIDs.push(row.data.weekID))


            let diff = newWeeks.length - this.activityRows.length

            console.log(diff)

            if (diff < 0) {
              this.activityRows.forEach (row => {
                if (!_.includes(weekIDs, row.data.weekID)) this.deleteRow(row.rid)
              })
            }

            if (diff > 0) {
              newWeeks.forEach ((week, index) => {
                if (!_.includes(rowWeekIDs, week.id)) {
                  this.$store.dispatch('createRowsFromArray', {
                    cid: 'activities-list',
                    rows: this.activityRow(index),
                    type: 'activity-row',
                    data: {
                      weekID: week.id
                    }
                  })
                }
              })
            }

          }
        },
        immediate: true
      }
  },
  created(){
    // add banner to top of Weekly List Element
    this.$store.dispatch('createRowsFromArray', {
      cid: 'activities-list',
      rows: ['banner-row']
    })

  },
  components: {
    ContainerComponent
  },
  mixins: [RowTypes]
}
</script>

<style scoped lang="scss">

</style>
