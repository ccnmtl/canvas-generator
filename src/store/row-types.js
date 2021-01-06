
import { mapActions, mapGetters } from 'vuex'
import columnTypes from './col-types'
import _ from 'lodash'

export default {

  computed: {
    ...mapGetters(['getColumnsByRowID', 'getRowsByCID', 'getSlotsByColID']),
    rowTypes(){
      let res = {
        homeWelcome: [
            ['image-slot'], this.colTypes.homeSidebar
        ],
        instructorRow:
        [""],
      }
      return res
    }
  },
  mixins: [columnTypes],
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(['createRowsFromArray']),
    buildHomeWelcomeRow(options){
      let row = this.rowTypes.homeWelcome
      let cid = options.cid

      let rows = [row]
      this.createRowsFromArray({rows, cid})
    },

  },
}
