
import { mapActions, mapGetters } from 'vuex'
import columnTypes from './col-types'
import _ from 'lodash'

export default {

  computed: {
    ...mapGetters(['getColumnsByRowID', 'getRowsByCID', 'getSlotsByColID']),
    rowTypes(){
      return {
        homeWelcome: {
          id: 1,
          name: "Home Welcome Row",
          type: 'homeWelcome',
          icon: "s-home",
          array: [
            [['image-slot'], 'home-sidebar']
          ]
        },
        homeInstructors: {
          id: 2,
          name: "Home Instructors",
          type: 'homeInstructors',
          icon: "s-home",
          array: [
            [this.instructorListCol(), this.instructorListCol({list: {getter: 'info.tas'}})]
          ]
        },       
        dateTimeRow: {
          id: 3,
          name: "Dates/Times Row",
          type: "dates-times-row",
          icon: "time",
          array: [
            [
              [
                {
                  type: "name-value-slot",
                  getter: "info.meetings",
                  data: {
                    name: "MEETING DATES / TIMES"
                  },
                  styles: {
                    margin: "20px 0"
                  }
                },
                {
                  type: "name-value-slot",
                  getter: "info.discussions",
                  data: {
                    name: "SPECIAL DISCUSSION FORUMS"
                  },
                  styles: {
                    "padding-bottom": "40px",
                    "margin-bottom": "20px",
                    "border-bottom": "1px solid #C7CDD1",
                  }
                }
              ]
            ]
          ]          

        },
        listRow: {
          id: 4,
          name: "List Row",
          type: "list-row",
          icon: "sheet",
          array: [
            [
              [
                {
                  type: "list-slot",
                  getter: "info.profs",
                  getter2: "info.tas",
                  data: {
                    idField: "id",
                    labelField: "name",
                    emailField: "email",
                    type: "instructor-ta",
                    title: "TA:",
                    officeField: "office",
                    component: "professor-ta-slot"
                  }
                }
              ]
            ]
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
      let row = _.cloneDeep(this.rowTypes.homeWelcome)
      let cid = options.cid

      let rows = row
      this.createRowsFromArray({rows, cid})
    },  
    dateTimeRow(options){
      let row = _.cloneDeep(this.rowTypes.dateTimeRow.array)
      let cid = options.cid

      let rows = row
      this.createRowsFromArray({rows, cid})
    },    
    listRow(options){
      let row = _.cloneDeep(this.rowTypes.listRow.array)
      let cid = options.cid

      let rows = row
      this.createRowsFromArray({rows, cid})
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
