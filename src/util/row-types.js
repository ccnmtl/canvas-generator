
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
          id: 1,
          name: "Home Instructors",
          type: 'homeInstructors',
          icon: "s-home",
          array: [
            [this.instructorListCol(), this.instructorListCol({list: {getter: 'info.tas'}})]
          ]
        }
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
