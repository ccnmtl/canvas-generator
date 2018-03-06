<template lang="html">

  <div id="weeklylist">

  <hr>

  <div class="code-container">

    <div class="textbox-container">
      <el-select v-model="selected" placeholder="Select" style="margin-right: 100px; margin-left:100px; margin-bottom:10px; width: 150px;">
        <el-option
          v-for="(week, index) in weeks"
          :key="week.date"
          :label="info.classType.dateType + ' ' + (index + 1)"
          :value="index">
        </el-option>
      </el-select>
      <textarea v-model="weeks[selected].title" class="code-input uk-textarea" rows="2" cols="60"></textarea>
      <!-- <button type="button" name="button" class="uk-button uk-button-primary" @click="setToDefault">Reset to Default</button> -->
      <button type="button" name="button" class="show-editor center uk-button uk-button-primary" @click="showEditor = !showEditor" >{{showEditor ? "Hide Text Editor" : "Show Text Editor"}}</button>
      <!-- This transition is defined as a css animations in the style section -->
      <transition name="fade"></transition>
      <div v-show="showEditor">
        <div class="quill">
          <quill-editor ref="myTextEditor"
                        v-model="weeks[selected].body"
                        :config="editorOption">
          </quill-editor>
        </div>
        <div class="quill">
          <quill-editor ref="myTextEditor"
                        v-model="weeks[selected].required"
                        :config="editorOption">
          </quill-editor>
        </div>
      </div>
      </transition>

      <hr>

      <!-- This is a seperate component to handle adding new Acitivity Page elements abstractly. For more information check the WeeklyCodeModule.vue file. -->
      <weekly-code-module
        class="code-module"
        :content="weeks[selected].videos"
        :fn="addVideo"
        :inputs="['title','description', 'source']"
        @clearArr="weeks[selected].videos = []">
        Video
      </weekly-code-module>

      <weekly-code-module
        class="code-module"
        :content="weeks[selected].discussions"
        :fn="addDiscussion"
        :inputs="['link','due', 'available', 'points']"
        @clearArr="weeks[selected].discussions = []">
        Discussion
      </weekly-code-module>

      <weekly-code-module
        class="code-module"
        :content="weeks[selected].assignments"
        :fn="addAssignment"
        :inputs="['link','due', 'available', 'points']"
        @clearArr="weeks[selected].assignments = []">
        Assignment
      </weekly-code-module>


    </div>

    <!-- Where the canvas code is stored -->
    <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>

      <!-- STV1_SlimBanner is default. Change banner with additional class declarations (SB02, SB03, SB04) -->
      <div class="STV1_SlimBanner">
        <p>EFFECTIVE MANAGEMENT IN PUBLIC SERVICE</p>
      </div>
      <div style="width: 100%; padding: 0;">
        <h2 style="background-color: #ffffff; padding: 5px 10px 0 10px; font-weight: bold; color: #666666; margin: 10px 0 10px 0;"><img src="https://courseworks2.columbia.edu/courses/3969/files/246999/preview" alt="weekly_icon.png" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/files/246999" data-api-returntype="File" /> Week 1: Introduction: Managing Toward 2019</h2>
        <div style="width: 95%; border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; margin: 0 5px 15px 5px; padding: 10px; color: #666666;">Below you'll find links to a variety of news articles and supplemental readings that the professor has selected to accompany the lecture. Please read them, and watch the video lecture, which has been divided into four parts. Complete the quiz after
          watching all segments, and respond to the discussion prompt after watching Part Three.</div>
      </div>
      <div style="width: 100%; padding: 10px 0 15px 0;">

        <div style="float: left; display: inline; width: 40%; margin: 0 20px 10px 0; padding: 10px;">
          <h5>READINGS</h5>
          <ul>
            <li><a class="instructure_file_link instructure_scribd_file " title="6auftrag94+_1_+copy.pdf" href="https://courseworks2.columbia.edu/courses/3969/files/246317/download?wrap=1" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/files/246317"
                data-api-returntype="File">Auftragstaktik</a></li>
            <li><a href="http://www.businessweek.com/stories/2005-11-27/the-man-who-invented-management">Drucker and Management </a></li>
            <li><a class=" instructure_scribd_file instructure_file_link" title="Memo+Resource+Action+Verbs-1.docx" href="https://courseworks2.columbia.edu/courses/3969/files/246315/download?wrap=1" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/files/246315"
                data-api-returntype="File">Action Verb List</a></li>
            <li><a id="" class=" instructure_scribd_file instructure_file_link" title="Memo Resource Instructions Spring 2016_.docx" href="https://courseworks2.columbia.edu/courses/3969/files/350608/download?wrap=1" target="" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/files/350608"
                data-api-returntype="File">Memo Guide</a></li>
          </ul>
        </div>

        <div style="float: left; display: inline; width: 40%; padding: 10px;">
          <h5>LECTURE PRESENTATION</h5>
          <ul>
            <li><a class="instructure_file_link " title="Lecture_01_EPM_FALL 2014(IntroManaging).pptx" href="https://courseworks2.columbia.edu/courses/3969/files/246335/download?wrap=1" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/files/246335"
                data-api-returntype="File">Managing to 2019</a></li>
            <li><a class=" instructure_scribd_file instructure_file_link" title="Memo Resource Format _Fall2014_.doc" href="https://courseworks2.columbia.edu/courses/3969/files/247151/download?wrap=1" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/files/247151"
                data-api-returntype="File">Memo Format</a>&nbsp;&amp;&nbsp;<a class=" instructure_scribd_file instructure_file_link" title="Example Memo 1.docx" href="https://courseworks2.columbia.edu/courses/3969/files/246331/download?wrap=1" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/files/246331"
                data-api-returntype="File">Memo Example</a></li>
            <li><a title="General Theories and Best Practices in Public Management" href="https://courseworks2.columbia.edu/courses/3969/discussion_topics/30828" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/discussion_topics/30828" data-api-returntype="Discussion">Discussion</a></li>
            <li><a class=" instructure_scribd_file instructure_file_link" title="Recitation Lecture 1 - Jan 30 (adobe Connect).pdf" href="https://courseworks2.columbia.edu/courses/3969/files/357870/download?wrap=1" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/files/357870"
                data-api-returntype="File">Recitation 1</a></li>
          </ul>
        </div>

      </div>

      <div style="clear: both; height: 10px;">&nbsp;</div>
      <div style="width: 93%; padding: 0 5% 0 2%;">
        <div style="float: left; display: inline; width: 500px; padding: 10px 0 0 0; margin: 0 20px 0 0;"><iframe src="https://player.vimeo.com/video/116159098" width="500" height="281" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></div>
        <div style="float: left; display: inline; width: 45%;">
          <blockquote style="height: 281px; border-left: 4px solid #0b5395;">
            <h4 style="background-color: #0b5395; padding: 5px 10px 5px 10px; font-weight: normal; font-size: 16px; color: #ffffff;">Lecture 1-1 Managing to 2019</h4>
            <p>In this segment, Prof. Eimicke covers what the course is all about, the history of management, and how you will become a better manager/leader in the next 12 weeks.</p>
          </blockquote>
        </div>
      </div>
      <div style="clear: both; height: 10px;">&nbsp;</div>
      <div style="width: 93%; padding: 0 5% 0 2%;">
        <div style="float: left; display: inline; width: 500px; padding: 10px 0 0 0; margin: 0 20px 0 0;"><iframe src="https://player.vimeo.com/video/116159099" width="500" height="281" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></div>
        <div style="float: left; display: inline; width: 45%;">
          <blockquote style="height: 281px; border-left: 4px solid #0b5395;">
            <h4 style="background-color: #0b5395; padding: 5px 10px 5px 10px; font-weight: normal; font-size: 16px; color: #ffffff;">Lecture 1-2 Managing to 2019</h4>
            <p>In this section, the Professor discusses and talks about the important people who have influenced management going as far back as the 1700's and offers a brief prelude into the importance of performance management.&nbsp;</p>
          </blockquote>
        </div>
      </div>
      <div style="clear: both; height: 10px;">&nbsp;</div>
      <div style="width: 93%; padding: 0 5% 0 2%;">&nbsp;</div>
      <div style="width: 96%; padding: 0 2%;">
        <div style="float: left; display: inline; width: 150px; margin: 0 20px 5px 0;"><a title="Managing to 2019 Quiz 1" href="https://courseworks2.columbia.edu/courses/3969/assignments/20029" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/assignments/20029" data-api-returntype="Assignment"><img src="https://courseworks2.columbia.edu/courses/3969/files/247319/preview" alt="quizIcon.jpg" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/files/247319" data-api-returntype="File" /></a></div>
        <div style="float: left; display: inline; width: 80%;">
          <h4 style="background-color: #f7f7f7; padding: 5px 10px 5px 5px; font-weight: bold; color: #666666; margin-top: 0;"><a title="Strategic Planning, Parts 1 and 2" href="https://courseworks2.columbia.edu/courses/3969/quizzes/4090" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/quizzes/4090" data-api-returntype="Quiz"><img src="https://courseworks2.columbia.edu/courses/3969/files/247385/preview" alt="quiz.jpg" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/files/247385" data-api-returntype="File" /></a></h4>
          <p style="padding: 0 5px;">After watching the above video and doing the readings, please participate in this week's quiz. <a title="Managing to 2019 Quiz 1" href="https://courseworks2.columbia.edu/courses/3969/assignments/20029" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/3969/assignments/20029"
              data-api-returntype="Assignment">Click here</a> to be redirected to the quiz page.</p>
        </div>
      </div>
      <div style="clear: both; height: 10px;">&nbsp;</div>
      <div style="width: 93%; padding: 0 5% 0 2%;">
        <div style="float: left; display: inline; width: 500px; padding: 10px 0 0 0; margin: 0 20px 0 0;"><iframe src="https://player.vimeo.com/video/116159100" width="500" height="281" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></div>
        <div style="float: left; display: inline; width: 45%;">
          <blockquote style="height: 281px; border-left: 4px solid #0b5395;">
            <h4 style="background-color: #0b5395; padding: 5px 10px 5px 10px; font-weight: normal; font-size: 16px; color: #ffffff;">Lecture 1-3 Managing into 2019</h4> This segement is a continuation of classical economists and philosophers and how they influenced management techniques over the years.<br />&nbsp;</blockquote>
        </div>
      </div>
      <div style="width: 93%; padding: 0 5% 0 2%;">
        <div style="float: left; display: inline; width: 500px; padding: 10px 0 0 0; margin: 0 20px 0 0;"><iframe src="https://player.vimeo.com/video/116159097" width="500" height="281" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></div>
        <div style="float: left; display: inline; width: 45%;">
          <blockquote style="height: 281px; border-left: 4px solid #0b5395;">
            <h4 style="background-color: #0b5395; padding: 5px 10px 5px 10px; font-weight: normal; font-size: 16px; color: #ffffff;">Lecture 1-4 Managing to 2019</h4>
            <p>This lecture discusses the history of management, the art and science as it relates to people managing organizations.</p>
          </blockquote>
        </div>
      </div>
      <div style="clear: both;">&nbsp;</div>

      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]">
        <p>{{info.title.toUpperCase()}}</p>
      </div>
      <div class="grid-row">
        <div class="col-xs-12 col-lg-12">
          <div class="ic-image-text-combo">
            <div class="ic-image-text-combo__text">
              <div class="pad-box-mini">
                <h3 style="margin-bottom: 5px;">
                  <i class="icon-clock"></i> {{info.classType.dateType}} {{selected + 1}}: {{weeks[selected].title}}</h3>
                </div>
                <div class="pad-box-mini border border-b border-t">
                  <p v-html="weeks[selected].body"></p>
                  <div class="pad-box-mini">
                    <span v-html="weeks[selected].required" >
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- The videos, discussions, and assignments are all built into their own smaller components to keep it more organized
      They are WeeklyDiscussion.vue, WeeklyAssignment.vue, and WeeklyVideo.vue respectively. -->
      <weekly-video  v-for="(video, index) in weeks[selected].videos" :data="video" :index="index+1" :key="video.source"> </weekly-video>

      <transition name="fade">
      <div class="item-group-container" style="padding-bottom: 0;" v-if="weeks[selected].assignments.length > 0 || weeks[selected].discussions.length > 0">
        <div class="item-group-condensed">
          <ul id="cond_group_1" class="ig-list">
          <weekly-discussion  v-for="(disc, index) in weeks[selected].discussions" :data="disc" :index="index+1" :key="disc.link"> </weekly-discussion>
          <weekly-assignment  v-for="(assign, index) in weeks[selected].assignments" :data="assign" :index="index+1" :key="assign.link"> </weekly-assignment>
          </ul>
        </div>
      </div>
    </transition>

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
import { mapGetters, mapMutations } from 'vuex'
import { EventBus } from '../bus'
import { quillEditor } from 'vue-quill-editor';
import WeeklyCodeModule from './weekly/WeeklyCodeModule'
import WeeklyVideo from './weekly/WeeklyVideo'
import WeeklyDiscussion from './weekly/WeeklyDiscussion'
import WeeklyAssignment from './weekly/WeeklyAssignment'
import saveState from 'vue-save-state';
import Home from './Home'

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote', {
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  ['link', 'clean']
];

export default {
  name: "weekly",
  data() {
    return {
      userInput: {
        videoNumber: 1,
        weekTitle: 'WEEK 1: Sustainable Agriculture and Food Systems: Key Concepts and Historical Perspective',
        description: "We will begin with an overview of the course objectives and content, the methods of instruction, the assignments, and the grading system. We will then present and discuss “The Big Picture,” starting with the historical context of the current global food system, including the “Green Revolution.” Which institutions have shaped and will shape global food systems? We will briefly discuss the concept of Sustainable Intensification. We will also consider the recently agreed SDGs and how they could contribute to more sustainable and equitable global food systems. And we will discuss some of the forces shaping food systems around the world.",
        required:'<span ><p><strong>Lecture Slides:</strong></p><p><strong>Download PDF:&nbsp;</strong><a href="https://courseworks2.columbia.edu/courses/29191/files/1032282/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">GFS Week 6 Africa (February 21, 2017) Final.pdf<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></p><p><strong>Required Readings / Viewings:</strong></p><ul><li>Sanchez, P.A. (2002) Soil fertility and hunger in Africa.&nbsp;<em>Science&nbsp;</em><strong>295</strong>: 2019-2020.</li><li>Download PDF:&nbsp;<a href="https://courseworks2.columbia.edu/courses/29191/files/929036/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">Soil_Fertility_and_Hunger_in_Africa_2002.pdf<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></li><li><strong>Familiarize yourself with the work of the Alliance for an African Green Revolution (AGRA):&nbsp;</strong><a href="http://www.agra.org/" target="_blank" style="color: rgb(0, 142, 226);">http://www.agra.org/&nbsp;(Links to an external site.)</a></li></ul><p><strong>Supplementary Resources</strong></p><ul><li>Listen: --“African Land Fertile Ground for Crops and Investors.” NPR. June 15, 2012.&nbsp;<a href="http://www.npr.org/2012/06/15/155095598/african-land-fertile-ground-for-crops-and-investors" target="_blank" style="color: rgb(0, 142, 226);">http://www.npr.org/2012/06/15/155095598/african-land-fertile-ground-for-crops-and-investors&nbsp;(Links to an external site.)</a></li><li>Download mp3:&nbsp;<a href="https://courseworks2.columbia.edu/courses/29191/files/1009373/download?wrap=1" target="_blank" style="color: rgb(0, 142, 226);">20120615_atc_06.mp3<strong><img src="https://courseworks2.columbia.edu/images/preview.png" alt="Preview the document"><img src="https://courseworks2.columbia.edu/images/popout.png" alt="View in a new window"></strong></a></li></ul></span>',
      },
      selected: 0,
      videoEditable: false,
      showEditor: false,
      videos: [],
      discussions: [],
      assignments: [],
      outputCode: '',
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
  mixins: [saveState],
  computed: {
    ...mapGetters([
      'getInfo', 'dWeek', 'getWeeks'
    ]),

    info: {
      get () {
        return this.getInfo
      },
      set (payload) {
        this.updateInfo
      }
    },
    weeks: {
      get () {
        return this.getWeeks
      },
      set (payload) {
        this.$store.commit('updateWeeks', payload)
      }
    }
  },
  methods: {
    copyText(option) {
      var copyTextarea = document.querySelector('#copy-text-area');

      if (option == 'aux'){
        var aux = document.createElement("input");
        aux.setAttribute("value", copyTextarea.value);
        document.body.appendChild(aux);
        aux.select();
        console.log('creating aux element..')
      }
      else {
        copyTextarea.select();
      }

      document.execCommand('copy')

      this.$snotify.success('Code has been copied', {showProgressBar: false});

      if (option == 'aux') document.body.removeChild(aux);
    },
    updateCode() {
      let code = document.getElementById("canvas-code");
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/ig, "")
    },
    addVideo() {
      let tempVideo = {
        title: "All that Glitters is not Gold (18 minutes)",
        description: "‘All that Glitters is not Gold’ features various communities’ representatives concern about the introduction of genetically engineered ‘Golden’ rice in the Philippines.",
        source: "https://www.youtube.com/watch?v=GxSGKD50ioE"
      }

      this.weeks[this.selected].videos.push(tempVideo);
    },
    addDiscussion() {
      let tempDisc = {
        due: "Feb 4, 2017",
        available: "Jan 1",
        link: this.info.url + 'discussion_topics/',
        points: 10
      }

      this.weeks[this.selected].discussions.push(tempDisc);
    },
    addAssignment() {
      let tempAssign = {
        due: "Feb 4, 2017",
        available: "Jan 1",
        link: this.info.url + 'assignments/',
        points: 10
      }

      this.weeks[this.selected].assignments.push(tempAssign);
    },
    setToDefault(){
      console.log('resetting data...')
      this.userInput = { ...this.$store.getters.dWeekly};
      this.weeks[this.selected].videos = this.weeks[this.selected].assignments = this.weeks[this.selected].discussions = [];
    },
    getSaveStateConfig() {
      return {
          'cacheKey': 'Weekly',
      };
    }
  },
  mounted() {
    this.updateCode();
    setInterval(() => {
      this.updateCode();
    }, 1000);
  },
  beforeCreate(){
    EventBus.$on('set-default', response => {
      this.setToDefault()
      console.log(response)
    })

    EventBus.$on('import-data', data => {
      this.userInput = { ...data.weekly.userInput}
      this.weeks[selected].videos = data.weekly.videos
      this.weeks[selected].assignments = data.weekly.assignments
      this.weeks[selected].discussions = data.weekly.discussions
      console.log('importing data to weekly...')
    })

    EventBus.$on('export-data', () => {

      // let weeklyList = {
      //   weeklyActivites: this.weeklyActivites
      // }
      // EventBus.$emit('list-data', weeklyList)

      let weekly = this.$data
      console.log('sending weekly')
      EventBus.$emit('weekly-data', weekly)
    })
  },
  beforeUpdate() {
    this.updateCode();
  }

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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 40%;
  margin: auto;
  align-self: flex-start;
  margin-top: 20px
}

.code-input {
  margin: 10px;
}

.quill {
  width: 80%;
  margin-bottom: 50px;
  margin-right: 50px;
  margin-left: 50px;
}

#canvas-code {
  width: 1015px;
  margin: auto;
  margin-bottom: auto;
  align-self: flex-start;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

#copy-text-area {
  width: 80%;
  height: 200px
}

.GFbanner {
  height: 190px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}
</style>
