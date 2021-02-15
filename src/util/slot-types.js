
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import moment from "moment"


export default {

  computed: {
    ...mapGetters(['getInfo', 'getConfig', 'getTheme', 'getWeeks']),
    slotTypes(){
      return {...this.defaultSlotTypes, ...this.getConfig.slots.customSlots}
    },
    defaultSlotTypes(){
      return {
        titleSlot: {
          id: 1,
          name: "Title Slot",
          type: "title-slot",
          pages: '*',
          icon: "edit",
          colspan: 4,
          visible: true,
          defaultData: {
            title: "Default Title",
            type: "h1"
          }
        },
        bannerSlot: {
          id: 2,
          name: "Banner Slot",
          type: "banner-slot",
          pages: '*',
          icon: "s-platform",
          colspan: 12,
          visible: true,
          defaultData: {
            title: "Default Title",
            semester: "U6411 // SPRING 2020"
          }
        },
        imageSlot: {
          id: 3,
          name: "Image Slot",
          type: "image-slot",
          pages: '*',
          icon: "picture",
          colspan: 4,
          visible: true,
          defaultData: {
            "imgSrc": "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/OGH_LogoWide.png",
            "width": "300",
            "height": "300"
          }
        },
        contentSlot: {
          id: 4,
          name: "Content Slot",
          type: "content-slot",
          pages: '*',
          icon: "menu",
          colspan: 4,
          visible: true,
          defaultData: {
            content: "Here you’ll find course materials and a range of tools to help you get the most out of the class. Please begin by reading the course syllabus, where you’ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester."
          }
        },
        spacerSlot: {
          id: 5,
          name: "Spacer Slot",
          type: "spacer-slot",
          pages: '*',
          icon: "menu",
          colspan: 4,
          visible: true,
          defaultData: {
            "useHR": true,
            "size": 2
          }
        },
        buttonsSlot: {
          id: 6,
          name: "Buttons Slot",
          type: "buttons-slot",
          pages: ['home'],
          icon: "menu",
          colspan: 4,
          visible: true,
          defaultData: {
          }
        },
        simpleListSot: {
          id: 7,
          name: "Simple List Slot",
          type: "simple-list-slot",
          pages: '*',
          icon: "menu",
          colspan: 4,
          visible: true,
          defaultData: {
          }
        },
        nameValueSlot: {
          id: 8,
          name: "Name Value Slot",
          type: "name-value-slot",
          pages: '*',
          icon: "menu",
          colspan: 4,
          visible: true,
          getter: {
            value: "info.startDate"
          },
          defaultData: {
            name: "Title",
            getter: "info.startDate",
            nameStyle: {'font-weight': 'bold'}
          }
        },
        instructorListSlot: {
          id: 9,
          name: "Instructor List Slot",
          type: "instructor-list-slot",
          pages: '*',
          icon: "menu",
          colspan: 4,
          visible: true,
          defaultData: {
          }
        },
        ActivityItemSlot: {
          id: 10,
          name: "Activity Item Slot",
          type: 'activity-item-slot',
          pages: '*',
          icon: "menu",
          visible: true,
          defaultData: {
            type: 'discussion',
            item: this.getWeeks[0].discussions[0]
          }
        },
        ActivityItemListSlot: {
          id: 11,
          name: "Activity Item List Slot",
          type: 'activity-item-list-slot',
          pages: '*',
          icon: "menu",
          visible: true,
          defaultData: {
            type: 'all',
            weekID: this.getWeeks[0].id
          }
        },
        VideoSlot: {
          id: 12,
          name: "Video Slot",
          type: 'video-slot',
          pages: '*',
          icon: "menu",
          visible: true,
          defaultData: {
            videoSrc: 'https://www.youtube.com/watch?v=GxSGKD50ioE',
          }
        }
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(['createSlotsFromArray','updateSlotTypes']),
    findSlot(objKey, objValue){
      for (const [name, slot] of Object.entries(this.slotTypes)){
        if (slot[objKey] == objValue) return slot
      }
    }    

  },
}
