
import { mapActions, mapGetters } from 'vuex'
import columnTypes from './col-types'
import _ from 'lodash'

export default {

  computed: {
    ...mapGetters(['getColumnsByRowID', 'getRowsByCID', 'getSlotsByColID', 'getConfig', 'getWeeks', 'getWeekByID','getWeekIndexByID','getWeekPropByID', 'getWeekPropGetter']),
    rowTypes(){
      return {...this.defaultRowTypes, ...this.getConfig.rows.customRows}
    },
    defaultRowTypes(){
      return {
        blankRow: {
          id: 0,
          name: 'Blank Row',
          type: 'blank-row',
          pages: '*',
          icon: 'circle-plus-outline'
        },
        homeWelcomeRow: {
          id: 1,
          name: "Home Welcome Row",
          type: 'home-welcome-row',
          icon: "s-home",
          pages: ['home'],
          array: [
            [['image-slot'], 'home-sidebar']
          ]
        },
        homeInstructorsRow: {
          id: 2,
          name: "Home Instructors",
          type: 'home-instructors-row',
          icon: "s-home",
          pages: ['home'],
          array: [
            [this.instructorListCol(), this.instructorListCol({list: {getter: 'info.tas'}})]
          ]
        },
        dateTimeRow: {
          id: 3,
          name: "Date/Time Row",
          type: "date-time-row",
          icon: "time",
          pages: ['home'],
          array: [
            ['date-time-col']
          ]
        },
        listRow: {
          id: 4,
          name: "List Row",
          type: "list-row",
          icon: "notebook-2",
          pages: ['syllabus'],
          array: [
            ['instructor-expanded-list']
          ]
        },
        homeBannerRow: {
          id: 5,
          name: "Home Banner",
          type: "home-banner-row",
          icon: "picture",
          pages: ['home'],
          array: [
            ['home-banner-col']
          ]
        },
        simpleBannerRow: {
          id: 6,
          name: "Simple Banner",
          type: "banner-row",
          icon: "picture",
          array: [
            ['banner-col']
          ],
        },
        activityRow: {
          id: 7,
          name: "Activity Row",
          type: "activity-row",
          icon: "picture",
          array: [
            ['activity-image','activity-sidebar']
          ],
        },
        testExclusionRow: {
          id: 20,
          name: "Exluded Row",
          type: "excluded-row",
          icon: "document-copy",
          pages: ['syllabus'],
          array: [
            ['instructor-expanded-list']
          ]
        },
      }
    },
  },
  mixins: [columnTypes],
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(['createRowsFromArray','updateRowTypes']),
    homeWelcomeRow(options){
      let row = _.cloneDeep(this.rowTypes.homeWelcomeRow.array)

      return row
    },
    homeInstructorsRow(options){
      let row = _.cloneDeep(this.rowTypes.homeInstructorsRow.array)

      return row
    },
    dateTimeRow(options){
      let row = _.cloneDeep(this.rowTypes.dateTimeRow)

      return row
    },
    listRow(options){
      let row = _.cloneDeep(this.rowTypes.listRow.array)

      return row
    },
    bannerRow(){
      let row = _.cloneDeep(this.rowTypes.bannerRow.array)

      return row
    },
    activityRow(index){
      let imageCol = this.activityImageCol({
          getter: {
            imgSrc: this.$store.state.imageServer + this.$store.state.info.classType.dateType.toLowerCase() + (index+1) + ".png",
          }
        })
      console.log(`week[${index}].title`)
      let sidebarCol = this.activitySidebarCol({
        title: {
          getter: {
            value: `weeks[${index}].title` 
          },
        },
        date: {
          getter: {
            value: `weeks[${index}].date`
          },
        }
      })

      return [[{ width: 4, array: imageCol}, { width: 8, array: sidebarCol }]]
    },
    activityRowByID(id){
      let imageCol = this.activityImageCol({
          getter: {
          imgSrc: this.getWeekPropGetter('imgSrc', id) // this.$store.state.imageServer + this.$store.state.info.classType.dateType.toLowerCase() + (this.getWeekIndexByID(id)+1) + ".png",
          }
        })
      let sidebarCol = this.activitySidebarCol({
        title: {
          getter: {
            value: this.getWeekPropGetter('title', id) // {func: this.getWeekPropByID, props: ['title', id]}
          },
        },
        date: {
          getter: {
            value: this.getWeekPropGetter('date', id) // {func: this.getWeekPropByID, props: ['date', id] }
          },
        }
      })

      return [[{ width: 4, array: imageCol}, { width: 8, array: sidebarCol }]]
    },
    findRow(objKey, objValue){
      for (const [name, row] of Object.entries(this.rowTypes)){
        if (row[objKey] == objValue) return row
      }
    }

  },
  beforeMount(){
    this.updateRowTypes(this.rowTypes)
    this.updateColTypes(this.colTypes)
    this.updateSlotTypes(this.slotTypes)

  }
}
