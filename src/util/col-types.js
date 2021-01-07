
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'

export default {

  computed: {
    ...mapGetters(['getColumnsByRowID', 'getRowsByCID', 'getSlotsByColID', 'getInfo']),
    colTypes(){
      return {
        homeSidebar: {
          id: 1,
          name: "Banner Row",
          type: "home-sidebar",
          icon: "picture",
          array: [
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
        },
        simpleBanner: [
          {
            type: "banner-slot",
            data: {
              useWideBanner: false
            }
          }
        ],
        syllabusComponent: [
          {
            type: "title-slot",
          },
          {
            type: "content-slot",
            data: {
              content: 'This is a sample Syllabus Element'
            },
            styles: {
            }
          },
          {
            type: "spacer-slot",
            data: {
              useHR: true,
              size: 2
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
        instructorTaList:
        [
          {
            "type": "list-slot",
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
    }
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['createColumnsFromArray','updateColTypes']),
    homeSidebarCol(options = {}){
      let column = _.cloneDeep(this.colTypes.homeSidebar.array)
      let {cid, rid} = options

      // overwrite data with anything specifically added to the options parameter, initally for the title
      column[0] = _.merge(column[0], options.title)
      column[1] = _.merge(column[1], options.content)
      column[2] = _.merge(column[2], options.button)

      return column
    },
    instructorListCol(options = {}){
      let column = _.cloneDeep(this.colTypes.instructorList)
      let {cid, rid} = options

      column[0] = _.merge(column[0], options.list)

      
      return column
      // let columns = [column]
      // this.createColumnsFromArray({columns, rid})
    },
    simpleBannerCol(options){
      let column = _.cloneDeep(this.colTypes.simpleBanner)
      let {cid, rid} = options

      column[0] = _.merge(column[0], options.banner)

      return column
    },
    syllabusComponentCol(options){
      let column = _.cloneDeep(this.colTypes.syllabusComponent)
      let {cid, rid} = options

      column[0] = _.merge(column[0], options.syllabus)

      return column
    },
    findCol(objKey, objValue){
      for (const [name, col] of Object.entries(this.colTypes)){
        if (col[objKey] == objValue) return col
      }
    }
  },
  beforeMount(){
    this.updateColTypes(this.colTypes)
  }
}
