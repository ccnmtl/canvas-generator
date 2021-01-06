
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'

export default {

  computed: {
    ...mapGetters(['getColumnsByRowID', 'getRowsByCID', 'getSlotsByColID', 'getInfo']),
    colTypes(){
      console.log(this.getInfo)
      let res = {
        homeSidebar: [
          {
            type: "title-slot",
            data: {
              title: "WELCOME TO " + this.getInfo.title.toUpperCase(),
              type: "custom"
            },
            classes: ["STV1_Welcome"],
            styles: {
              "text-transform": "uppercase",
              "font-size": "14px !important",
              margin: "0px"
            }
          },
          {
            type: "content-slot",
            styles: {
              margin: "20px 0",
              padding: "0",
              "font-size": "14px"
            }
          },
          {
            type: "buttons-slot",
            styles: {
              margin: "50px 0 20px",
              padding: "0",
              "font-size": "14px"
            },
            data: {
              buttons: [
                {
                  label: "Course Syllabus",
                  to: "/assignments/syllabus"
                },
                {
                  label: "Activities",
                  to: "/pages/activities"
                },
                {
                  label: "Zoom",
                  to: "/pages/zoom"
                }
              ]
            }
          }
        ],
        instructorList:
        [
          {
            "type": "simple-list-slot",
            "getter": "info.profs",
            "data": {
              "idField": "id",
              "labelField": "name",
              "emailField": "email",
              "type": "instructor-ta",
              "title": "Instructor:",
              "officeField": "office"
            },
            "classes": [
              "pad-box-mini",
              "border",
              "border-tbl"
            ]
          }
        ],

      }
      return res
    }
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['createColumnsFromArray']),
    buildHomeSidebar(options){
      let column = _.cloneDeep(this.colTypes.homeSidebar)
      let {cid, rid} = options

      // overwrite data with anything specifically added to the options parameter, initally for the title
      column[0] = _.merge(column[0], options.title)
      column[1] = _.merge(column[1], options.content)
      column[2] = _.merge(column[2], options.button)

      let columns = [column]
      this.createColumnsFromArray({columns, rid})
    },
    buildInstructorList(options){
      let column = _.cloneDeep(this.colTypes.instructorList)
      let {cid, rid} = options

      column[0] = _.merge(column[0], options.list)

      let columns = [column]
      this.createColumnsFromArray({columns, rid})
    }
 

  },
}
