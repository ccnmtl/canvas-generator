
import { mapActions, mapGetters } from 'vuex'
import columnTypes from './col-types'
import _ from 'lodash'

export default {

  computed: {
    ...mapGetters(['getColumnsByRowID', 'getRowsByCID', 'getSlotsByColID']),
    rowTypes(){
      return {
        blankRow: {
          id: 0,
          name: 'Blank Row',
          type: 'blank-row',
          icon: 'blank'
        },
        homeWelcomeRow: {
          id: 1,
          name: "Home Welcome Row",
          type: 'home-welcome-row',
          icon: "s-home",
          array: [
            [['image-slot'], 'home-sidebar']
          ]
        },
        homeInstructorsRow: {
          id: 2,
          name: "Home Instructors",
          type: 'home-instructors-row',
          icon: "s-home",
          array: [
            [this.buildInstructorListCol(), this.buildInstructorListCol({list: {getter: 'info.tas'}})]
          ]
        },       
        dateTimeRow: {
          id: 3,
          name: "Date/Time Row",
          type: "date-time-row",
          icon: "time",
          array: [
            ['date-time-col']
          ]          
        },
        listRow: {
          id: 4,
          name: "List Row",
          type: "list-row",
          icon: "sheet",
          array: [
            ['instructor-expanded-list']
          ]          
        },
        bannerRow: {
          id: 5,
          name: "Banner Row",
          type: "banner-row",
          icon: "picture",
          array: [
            ['banner-col']
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

      let rows = row
      return rows
    },
    buildHomeInstructorsRow(options){
      let row = _.cloneDeep(this.rowTypes.homeInstructorsRow.array)
      let cid = options.cid

      let rows = row
      return rows
    },        
    buildDateTimeRow(options){
      let row = _.cloneDeep(this.rowTypes.dateTimeRow)
      let cid = options.cid

      let rows = row
      return rows
    },    
    buildListRow(options){
      let row = _.cloneDeep(this.rowTypes.listRow.array)
      let cid = options.cid

      let rows = row
      return rows
    },
    buildBannerRow(){
      let row = _.cloneDeep(this.rowTypes.bannerRow.array)
      let cid = options.cid

      let rows = row
      return rows     

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
