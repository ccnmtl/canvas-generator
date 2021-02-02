<template>
  
  <div class="home-page">
    <el-input-number  style="margin: 10px;" v-model="userInput.toChange" :min="1" :max="20" />

      <button type="button" class="add-weekly center uk-button uk-button-primary"
      name="button" @click="populateActivities(userInput.toChange)">Edit # of Activities</button>

      <hr>
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
      userInput: {
        startDate: null,
        weekNumber: 1,
        toChange: 12,
        isFile: true,
        isLinked: true,
        uploadSwitchText: "Click to Upload Image from Url"
      },
      needsInit: true,
      outputCode: "",
      homeLayout: [
        'banner-row',
      ],
    }
  },
  computed:{
    ...mapGetters({
      weeks: 'getWeeks',
      info: 'getInfo'
    }),
    activityRows(){
      let rows =  this.$store.getters.getRowsByCID['activities-list'] || []
      return rows.filter( row => row.type == 'activity-row')
    }
  },
  methods: {
    ...mapActions(['deleteRow', 'deleteRows',"addWeek", "sliceWeek", "updateWeeks", "updateInfo"]),
    AddActivity() {
      let index = this.weeks.length + 1
      this.addWeek(index)
    },
    // Adds a user inputted number of activities
    populateActivities(num) {
      let diff = num - this.weeks.length

      if (diff > 0) {
        for (let i = 0; i < diff; i++) this.AddActivity()
      }

      if (diff < 0) {
        this.userInput.weekNumber = 1
        this.sliceWeek(num)
      }

    },
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
                    rows: this.activityRowByID(week.id),
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
