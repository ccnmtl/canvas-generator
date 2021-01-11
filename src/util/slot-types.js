
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import moment from "moment"


export default {

  computed: {
    ...mapGetters(['getInfo']),
    SlotTypes(){
      return [
        {
          "id": 1,
          "name": "Title Slot",
          "type": "title-slot",
          "icon": "edit",
          "colspan": 4,
          "visible": true,
          "defaultData": {
            "title": "Default Title",
            "type": "h1"
          }
        },
        {
          "id": 2,
          "name": "Banner Slot",
          "type": "banner-slot",
          "icon": "s-platform",
          "colspan": 12,
          "visible": true,
          "defaultData": {
            "title": "Default Title",
            "semester": "U6411 // SPRING 2020"
          }
        },
        {
          "id": 3,
          "name": "Image Slot",
          "type": "image-slot",
          "icon": "picture",
          "colspan": 4,
          "visible": true,
          "defaultData": {
            "imgSrc": "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/OGH_LogoWide.png",
            "width": "300",
            "height": "300"
          }
        },
        {
          "id": 4,
          "name": "Content Slot",
          "type": "content-slot",
          "icon": "menu",
          "colspan": 4,
          "visible": true,
          "defaultData": {
            "content": "Here you’ll find course materials and a range of tools to help you get the most out of the class. Please begin by reading the course syllabus, where you’ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester."
          }
        },
        {
          "id": 5,
          "name": "Spacer Slot",
          "type": "spacer-slot",
          "icon": "menu",
          "colspan": 4,
          "visible": true,
          "defaultData": {
            "useHR": true,
            "size": 2
          }
        },
        {
          "id": 6,
          "name": "Buttons Slot",
          "type": "buttons-slot",
          "icon": "menu",
          "colspan": 4,
          "visible": true,
          "defaultData": {
          }
        },
        {
          "id": 7,
          "name": "Simple List Slot",
          "type": "simple-list-slot",
          "icon": "menu",
          "colspan": 4,
          "visible": true,
          "defaultData": {
          }
        },
        {
          "id": 8,
          "name": "Name Value Slot",
          "type": "name-value-slot",
          "icon": "menu",
          "colspan": 4,
          "visible": true,
          "getter": "info.startDate",
          "defaultData": {
            name: "Title",
            getter: "info.startDate",
            value: moment().day(1),
            type: 'date',
            nameStyle: {'font-weight': 'bold'}
          }
        },
        {
          "id": 9,
          "name": "List Slot",
          "type": "list-slot",
          "icon": "menu",
          "colspan": 4,
          "visible": true,
          "defaultData": {
          }
        }
      ]
    }
  },
  data() {
    return {
    }
  },
  methods: {

  },
}
