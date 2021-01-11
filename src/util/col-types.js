
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
        simpleBanner: {
            id: 2,
            name: "simpleBanner",
            type: "banner-slot",
            data: {
              useWideBanner: false
            }
          },
        syllabusComponent: {
          id: 3,
          name:"syllabusComponent",
          type:"syllabus-component",
          array:[
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
        ]
      },
        instructorList:
        {
          id: 4,
          name: "instructorList",
          type: "instructor-list",
          array: [
          {
              type: "simple-list-slot",
              getter: "info.profs",
              data: {
                idField: "id",
                labelField: "name",
                emailField: "email",
                type: "instructor-ta",
                title: "Instructor:",
                officeField: "office"
              },
              classes: [
                "pad-box-mini",
                "border",
                "border-tbl"
              ]
            }
        ]
        },
        instructorTaList:
        {
          id: 5,
          name:"instructorTaList",
          type:"instructor-TA-list",
          array:[
            {
              type: "list-slot",
              getter: "info.profs",
              data: {
                idField: "id",
                labelField: "name",
                emailField: "email",
                type: "instructor-ta",
                title: "Instructor:",
                officeField: "office"
              },
              classes: [
                "pad-box-mini",
                "border",
                "border-tbl"
              ]
            }
          ],
        },
        banner:
          {
            id: 6,
            name: "Banner",
            type: "banner-col",
            icon: "picture",
            array: [
              {
                type: "banner-slot",
                data: {
                  useWideBanner: true,
                },
                styles: {
                  "margin-bottom": "20px",
                }
              }           
            ]
        },
        dateTime: {
          id: 7,
          type: "date-time-col",
          array: 
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
        },
        instructorTaExpandedList:{
          id: 8,
          name: "instructorTaExpandedList",
          type: 'instructor-expanded-list',
          array: [
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
        }

      }        
    }
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['createColumnsFromArray','updateColTypes']),
    buildHomeSidebarCol(options = {}){
      let column = _.cloneDeep(this.colTypes.homeSidebar.array)
      let {cid, rid} = options

      // overwrite data with anything specifically added to the options parameter, initally for the title
      column[0] = _.merge(column[0], options.title)
      column[1] = _.merge(column[1], options.content)
      column[2] = _.merge(column[2], options.button)

      return column
    },
    buildInstructorListCol(options = {}){
      let column = _.cloneDeep(this.colTypes.instructorList)
      let {cid, rid} = options

      column[0] = _.merge(column[0], options.list)

      
      return column
      // let columns = [column]
      // this.createColumnsFromArray({columns, rid})
    },
    buildSimpleBannerCol(options = {}){
      let column = _.cloneDeep(this.colTypes.simpleBanner)
      let {cid, rid} = options

      column[0] = _.merge(column[0], options.banner)

      return column
    },
    buildBannerCol(options = {}){
      let column = _.cloneDeep(this.colTypes.banner)
      let {cid, rid} = options

      column[0] = _.merge(column[0], options.banner)

      return column
    },        
    buildSyllabusComponentCol(options){
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
