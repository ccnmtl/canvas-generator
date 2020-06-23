<template lang="html">

  <div id="weeklylist">

  <hr>
  

  <div class="code-container">
    
    <div class="textbox-container">

      <div class="code-input center uk-margin-small-top">
        <label for="text-area">Zoom Link</label> <br>
        <el-input type="textarea" autosize :value="info.zoomLink"
        @input="updateProp('zoomLink', $event)"> </el-input>
      </div>

    </div>

    <!-- Where the canvas code is stored -->
    <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]">
        <p>{{info.title.toUpperCase()}}</p>
      </div>
     
      <div class="content-box">
      <div class="grid-row">
      <div class="col-xs-12 col-lg-12">
      <div class="ic-image-text-combo">
      <div class="ic-image-text-combo__text">
      <div class="pad-box-mini">
      <h3 style="margin-bottom: 5px;"><i class="icon-group"></i> Zoom Web-Conferencing Collaboration</h3>
      </div>
      <div class="pad-box-mini border border-b border-t">
      <p>Using ZOOM technology, students are able to interact with classmates to discuss and collaborate. Please review the <a class="instructure_file_link instructure_scribd_file" title="Zoom Student Guide - 08.26.16.pdf" href="https://sipa-canvas.s3.us-east-2.amazonaws.com/documents/A1.+Zoom+Student+Guide+-+EMPA.pdf" data-api-returntype="File">Zoom Student Guide</a> and visit <a href="https://zoom.us/">zoom.us</a> to download the desktop client and create a free account.</p>
      <p>Please mute your accounts when joining live streaming zoom sessions.</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div class="content-box">
      <div class="item-group-container" style="padding-bottom: 0;">
      <div class="item-group-condensed">
      <ul id="cond_group_1" class="ig-list">
      <li>
      <div class="ig-row">
      <div class="ig-row__layout">
      <div class="ig-type-icon" aria-hidden="true"><i class="icon-group"></i></div>
      <div class="ig-info"><a class="ig-title" :href="info.zoomLink" target="_blank" rel="noopener"> LAUNCH ZOOM SESSION</a><a class="ig-title" href="#" target="_blank" rel="noopener"></a></div>
      </div>
      </div>
      </li>
      <li v-for="(week, index) in weeks">
      <div class="ig-row">
      <div class="ig-row__layout">
      <div class="ig-type-icon" aria-hidden="true"><i class="icon-group"></i></div>
      <div class="ig-info"><a href=""> Class Session {{index+1}} Recording</a></div>
      </div>
      </div>
      </li>



      </ul>
      </div>
      </div>
      </div>


   
    </div>

  </div>

  <div class="uk-float-right">
    <a class="uk-button uk-button-primary" href="#modal-overflow" uk-toggle>View the Code</a>
    <button class="uk-button uk-button-primary" @click="copyText('aux')">Copy the Code</button>
    <button class="uk-button uk-button-danger" @click="setToDefault">Reset to Default</button>
  </div>

  <div id="modal-overflow" uk-modal>
      <div class="uk-modal-dialog">

          <button class="uk-modal-close-default" type="button" uk-close></button>

          <div class="uk-modal-header">
              <h2 class="uk-modal-title">Canvas Code</h2>
          </div>

          <div class="uk-modal-body" uk-overflow-auto>
            <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea>
          </div>

          <div class="uk-modal-footer uk-text-right">
              <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
              <button class="uk-button uk-button-primary" type="button" @click="copyText">Copy Code</button>
          </div>

      </div>
  </div>

  <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left uk-margin-medium-top" uk-grid>
      <div class="uk-background-muted uk-padding">
      <p>Copyright © Columbia University. All rights reserved.</p>
      </div>
  </div>

  <!-- <p style="font-weight: bold" class="center">Code Output</p>

  <div class="footer">
    <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea> <br> <br>
  </div> -->

</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import mutations from "../store/mutations"
import { EventBus } from "../bus"
import { quillEditor } from "vue-quill-editor"
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import WeeklyCodeModule from "./weekly/WeeklyCodeModule"
import WeeklyVideo from "./weekly/WeeklyVideo"
import WeeklyDiscussion from "./weekly/WeeklyDiscussion"
import WeeklyAssignment from "./weekly/WeeklyAssignment"
import saveState from "vue-save-state"
import Home from "./Home"
import moment from "moment"

var toolbarOptions = [
  ["bold", "italic", "underline"],
  [
    "blockquote",
    {
      list: "ordered"
    },
    {
      list: "bullet"
    }
  ],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ script: "sub" }, { script: "super" }],
  ["link", "clean"]
]

export default {
  name: "weekly",
  data() {
    return {
      userInput: {
        videoNumber: 1,
        weekTitle: "WEEK 1: Sustainable Agriculture and Food Systems: Key Concepts and Historical Perspective",
        description:
          "We will begin with an overview of the course objectives and content, the methods of instruction, the assignments, and the grading system. We will then present and discuss “The Big Picture,” starting with the historical context of the current global food system, including the “Green Revolution.” Which institutions have shaped and will shape global food systems? We will briefly discuss the concept of Sustainable Intensification. We will also consider the recently agreed SDGs and how they could contribute to more sustainable and equitable global food systems. And we will discuss some of the forces shaping food systems around the world.",
        required:
          '<span ><p><strong>Lecture Slides:</strong></p><p><strong>Download PDF:&nbsp;</strong><a href="https://courseworks2.columbia.edu/courses/29191/files/1032282/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">GFS Week 6 Africa (February 21, 2017) Final.pdf<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></p><p><strong>Required Readings / Viewings:</strong></p><ul><li>Sanchez, P.A. (2002) Soil fertility and hunger in Africa.&nbsp;<em>Science&nbsp;</em><strong>295</strong>: 2019-2020.</li><li>Download PDF:&nbsp;<a href="https://courseworks2.columbia.edu/courses/29191/files/929036/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">Soil_Fertility_and_Hunger_in_Africa_2002.pdf<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></li><li><strong>Familiarize yourself with the work of the Alliance for an African Green Revolution (AGRA):&nbsp;</strong><a href="http://www.agra.org/" target="_blank" style="color: rgb(0, 142, 226);">http://www.agra.org/&nbsp;(Links to an external site.)</a></li></ul><p><strong>Supplementary Resources</strong></p><ul><li>Listen: --“African Land Fertile Ground for Crops and Investors.” NPR. June 15, 2012.&nbsp;<a href="http://www.npr.org/2012/06/15/155095598/african-land-fertile-ground-for-crops-and-investors" target="_blank" style="color: rgb(0, 142, 226);">http://www.npr.org/2012/06/15/155095598/african-land-fertile-ground-for-crops-and-investors&nbsp;(Links to an external site.)</a></li><li>Download mp3:&nbsp;<a href="https://courseworks2.columbia.edu/courses/29191/files/1009373/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">20120615_atc_06.mp3<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></li></ul></span>'
      },
      selected: 0,
      videoEditable: false,
      showEditor: false,
      videos: [],
      discussions: [],
      assignments: [],
      outputCode: "",
      // editor: ClassicEditor,
      editorConfig: {},
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    quillEditor,
    WeeklyVideo,
    WeeklyCodeModule,
    WeeklyDiscussion,
    WeeklyAssignment
  },
  mixins: [mutations],
  computed: {
    ...mapGetters(["getInfo", "dWeek", "getWeeks", "getCases"]),
    caseOptions() {
      let cases = this.getCases
      let options = []

      cases.forEach(function(category, i) {
        options[i] = {
          value: category.category,
          label: category.category,
          children: []
        }

        category.cases.forEach(function(caseChild, j) {
          options[i].children[j] = {
            value: caseChild.name,
            label: caseChild.name
          }
        })
      })

      return options
    }
  },
  methods: {
    addCase(caseStudy) {
      let arr = _.cloneDeep(this.weeks[this.selected].cases)

      let isUnique = true
      arr.forEach(function(testCase) {
        if (testCase.id == caseStudy.id) isUnique = false
      })

      if (isUnique) arr.push(caseStudy)
      this.updateWeek(this.selected, "cases", arr)
    },
    removeCase(caseStudy) {
      let arr = _.cloneDeep(this.weeks[this.selected].cases)

      arr.forEach(function(testCase, index, array) {
        if (testCase.id == caseStudy.id) {
          console.log("splice")
          arr.splice(index, 1)
        }
      })

      this.updateWeek(this.selected, "cases", arr)
    },
    addVideo() {
      let tempVideo = {
        title: "All that Glitters is not Gold (18 minutes)",
        description:
          "‘All that Glitters is not Gold’ features various communities’ representatives concern about the introduction of genetically engineered ‘Golden’ rice in the Philippines.",
        source: "https://www.youtube.com/watch?v=GxSGKD50ioE"
      }
      let arr = _.cloneDeep(this.weeks[this.selected].videos)
      arr.push(tempVideo)
      this.updateWeek(this.selected, "videos", arr)
    },
    addDiscussion() {
      let manifestID =
        "ccb-session-" + (this.selected + 1) + "-disccusion-" + (this.weeks[this.selected].discussions.length + 1)
      let tempDisc = {
        due: moment(this.weeks[this.selected].date).add(7, "d"),
        id: manifestID,
        link: "%24CANVAS_OBJECT_REFERENCE%24/discussion_topics/" + manifestID
      }

      let arr = _.cloneDeep(this.weeks[this.selected].discussions)
      arr.push(tempDisc)
      this.updateWeek(this.selected, "discussions", arr)
    },
    addAssignment() {
      let manifestID =
        "ccb-session-" + (this.selected + 1) + "-assignment-" + (this.weeks[this.selected].assignments.length + 1)
      let tempAssign = {
        due: moment(this.weeks[this.selected].date).add(7, "d"),
        id: manifestID,
        link: "%24CANVAS_OBJECT_REFERENCE%24/assignments/" + manifestID
      }

      let arr = _.cloneDeep(this.weeks[this.selected].assignments)
      arr.push(tempAssign)
      this.updateWeek(this.selected, "assignments", arr)
    },
    setToDefault() {
      console.log("resetting data...")
      let dWeek = _.cloneDeep(this.$store.getters.dWeek)
      let props = ["description", "title", "body", "required", "videos", "discussions", "assignments", "cases"]

      props.forEach(prop => {
        this.updateWeek(this.selected, prop, dWeek[prop])
      })
    },
    getSaveStateConfig() {
      return {
        cacheKey: "Weekly"
      }
    }
  },
  mounted() {
    this.weeks.forEach(week => {
      if (!week.cases) week.cases = []
    })
    this.updateCode()
  },
  beforeCreate() {
    EventBus.$on("set-default", response => {
      this.setToDefault()
      console.log(response)
    })

    EventBus.$on("import-data", data => {
      this.userInput = { ...data.weekly.userInput }
      this.weeks[selected].videos = data.weekly.videos
      this.weeks[selected].assignments = data.weekly.assignments
      this.weeks[selected].discussions = data.weekly.discussions
      console.log("importing data to weekly...")
    })

    EventBus.$on("export-data", () => {
      // let weeklyList = {
      //   weeklyActivites: this.weeklyActivites
      // }
      // EventBus.$emit('list-data', weeklyList)

      let weekly = this.$data
      console.log("sending weekly")
      EventBus.$emit("weekly-data", weekly)
    })
  },
  beforeUpdate() {}
}
</script>



<style scoped>
h1,
h2 {
  font-weight: normal;
}

textarea {
  width: auto;
}

.home-bar {
  width: 50vw;
}

.code-module {
  margin-left: 20%;
  margin-right: 20%;
}

.show-editor {
  height: 40px;
  margin-bottom: 10px;
  margin-left: 30%;
  margin-right: 30%;
}

.textbox-container {
  width: 40%;
  margin-top: 20px;
}

.input-element {
  clear: both;
  display: block;
}

.code-input {
  margin: 10px;
}

.quill {
  width: 80%;
  margin-bottom: 25px;
  margin: auto;
}

#canvas-code {
  width: 1015px;
  margin: auto;
  margin-bottom: auto;
  align-self: flex-start;
}

.code-container {
  transition: all 0.5s ease;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

#copy-text-area {
  width: 80%;
  height: 200px;
}

.GFbanner {
  height: 190px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

 {
  opacity: 0;
}
</style>
