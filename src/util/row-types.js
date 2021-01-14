
import { mapActions, mapGetters } from 'vuex'
import columnTypes from './col-types'
import _ from 'lodash'

export default {

  computed: {
    ...mapGetters(['getColumnsByRowID', 'getRowsByCID', 'getSlotsByColID', 'getConfig', 'getWeeks']),
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
            [this.buildInstructorListCol(), this.buildInstructorListCol({list: {getter: 'info.tas'}})]
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
    buildHomeWelcomeRow(options){
      let row = _.cloneDeep(this.rowTypes.homeWelcomeRow.array)
      let cid = options.cid

      return row
    },
    buildHomeInstructorsRow(options){
      let row = _.cloneDeep(this.rowTypes.homeInstructorsRow.array)
      let cid = options.cid

      return row
    },        
    buildDateTimeRow(options){
      let row = _.cloneDeep(this.rowTypes.dateTimeRow)
      let cid = options.cid

      return row
    },    
    buildListRow(options){
      let row = _.cloneDeep(this.rowTypes.listRow.array)
      let cid = options.cid

      return row
    },
    buildBannerRow(){
      let row = _.cloneDeep(this.rowTypes.bannerRow.array)
      let cid = options.cid

      return row
    },
    activityRow(index){
      let imageCol = this.activityImageCol({
          data: {
            imgSrc: this.$store.state.imageServer + this.$store.state.info.classType.dateType.toLowerCase() + (index+1) + ".png"
          }
        })
      let sidebarCol = this.activitySidebarCol({
        title: {
          data: {
            name: "Session",
            value: this.getWeeks[index].title
          },
        },
        date: {
          getter: {
            value: 'info.startDate' // this getter should actually be `week[${index}].date`
          },
        }
      })

      return [[imageCol, sidebarCol]]
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

  }
}
