<template>
  <div class="hello">
    <div class="textbox-container center">

      <el-tabs v-model="activeName">
        <el-tab-pane label="Course Info" name="1" class="center">
          <textarea v-model="userInput.title" class="code-input" rows="1" cols="25"></textarea>
          <textarea v-model="userInput.semester" class="code-input" rows="1" cols="20"></textarea> <br>
        </el-tab-pane>

        <el-tab-pane label="Description" class="center" name="3" >
          <div class="quill">
            <quill-editor ref="myTextEditor"
                          v-model="userInput.description"
                          :config="editorOption">
            </quill-editor>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Professor" class="center" name="4">
          <textarea v-model="userInput.professor" class="code-input" rows="1" cols="20"></textarea>
          <textarea v-model="userInput.pEmail" class="code-input" rows="1" cols="25"></textarea>
          <textarea v-model="userInput.office" class="code-input" rows="1" cols="50"></textarea>
        </el-tab-pane>
        <el-tab-pane label="TA" class="center" name="5">
          <textarea v-model="userInput.ta" class="code-input" rows="1" cols="20"></textarea>
          <textarea v-model="userInput.tEmail" class="code-input" rows="1" cols="25"></textarea>
          <textarea v-model="userInput.tOffice" class="code-input" rows="1" cols="50"></textarea>
        </el-tab-pane>

        <el-tab-pane label="Meeting Times" class="center" name="6">
          <textarea v-model="userInput.meetings" class="code-input" rows="1" cols="50"></textarea>
          <textarea v-model="userInput.discussions" class="code-input" rows="1" cols="50"></textarea>
        </el-tab-pane>

        <el-tab-pane label="Media Link" class="center" name="7">
          <button type="button" name="button" @click="mediaSwitch">{{userInput.mediaSwitchText}}</button>
          <textarea v-show="this.userInput.isVideo" v-model="userInput.video" class="code-input" rows="1" cols="50"></textarea>
          <textarea v-show="!this.userInput.isVideo" v-model="userInput.image" class="code-input" rows="1" cols="50"></textarea>
        </el-tab-pane>

      </el-tabs>

    </div>

    <hr>
    <br>
    <div class="code-container">
      <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>

      <div class="pad-box-mega GFbanner">
      <p>{{userInput.title.toUpperCase()}}</p>
      <p class="semesterSubtitle">{{userInput.semester}}</p>
      </div>
      <div class="content-box">
      <div class="grid-row">
      <div class="col-xs-6">
      <div class="styleguide-section__grid-demo-element">
      <div v-if="!this.userInput.isVideo" >
        <img :src="this.userInput.image" alt=""> </img>
      </div>
      <div v-if="this.userInput.isVideo" class="embed-container"><iframe :src="'https://player.vimeo.com/video/' + this.videoLink" width="300" height="150" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></div>
      </div>
      </div>
      <div class="col-xs-6">
      <div class="styleguide-section__grid-demo-element">
      <div class="welcome">WELCOME TO {{userInput.title.toUpperCase()}}</div>
      <p class="html" v-html="userInput.description"></p>
      <p><a class="Button" style="text-decoration: none;" href="https://courseworks2.columbia.edu/courses/35006/files/916242/download?wrap=1" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/35006/files/916242" data-api-returntype="File">Spring 2017 Schedule</a></p>
      </div>
      </div>
      </div>
      </div>
      <div class="content-box">
      <div class="grid-row">
      <div class="col-xs-6">
      <div class="styleguide-section__grid-demo-element pad-box-mini border border-tbl">
      <p>Instructor:</p>
      <p>Professor {{userInput.professor}} (<a :href="'mailto:' + userInput.pEmail">{{userInput.pEmail}}</a>) <br /> {{userInput.office}}</p>
      </div>
      </div>
      <div class="col-xs-6">
      <div class="styleguide-section__grid-demo-element pad-box-mini border border-tbl">
      <p>TA:</p>
      <p> {{userInput.ta}} (<a :href="'mailto:' + userInput.tEmail">{{userInput.tEmail}}</a>) <br /> {{userInput.tOffice}}</p>
      </div>
      </div>
      </div>
      </div>
      <div class="content-box pad-box-mini border border-b">
      <p><strong>MEETING DATES / TIMES:</strong> {{userInput.meetings}}</p>
      <p><strong>SPECIAL DISCUSSION FORUMS:</strong> {{userInput.discussions}}</p>
      </div>
      </div>

      <div class="footer">
        <p style="font-weight: bold" class="center">Code Output</p>
        <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea> <br> <br>
      </div>


    </div>

  </div>
</template>

<script>
import CanvasCode from './CanvasCode.vue'
import store from '../store'
import { quillEditor } from 'vue-quill-editor';

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote',{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] },'clean'],
  ['link']
];

export default {
  name: 'hello',
  data () {
    return {
      userInput: {
        title: store.title ,
        semester: "U6411 // SPRING 2017",
        professor: "Glenn Denning",
        pEmail: "gd2147@sipa.columbia.edu",
        ta: "Chandani Punia",
        tEmail:"cp2868@columbia.edu",
        office: "Office Hours: Monday 3:00-6:00 pm (IAB Room 1434)",
        tOffice: "Tuesday 1:00-2:30 pm (Publique, IAB 6th floor)",
        meetings: "Tuesday 9:00-10:50 am (IAB Room 411)",
        discussions: "Thursday 9:00-10:50 am (IAB Room 411)",
        video:"https://vimeo.com/199382848/1dd8fc0f31",
        image:"http://assets.ce.columbia.edu/i/ce/intl/intl-fp@2x.jpg",
        isVideo: true,
        mediaSwitchText: "Click to input Image",
        taInfo:"Instructor: \nProfessor Glenn Denning (gd2147@sipa.columbia.edu) Office Hours: Monday 3:00-6:00 pm (IAB Room 1434)",
        description: "Here you’ll find course materials and a range of tools to help you get the most out of the class. \n Please begin by reading the course syllabus, where you’ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester."
      },
      activeName: '1',
      outputCode: "",
      editorOption:{
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    quillEditor,
    CanvasCode
  },
  computed: {
    videoLink(){
      let link = this.userInput.video;
      console.log(link);
      var parts = link.split('/');
      return parts[3];
    }
  },
  methods: {
    copyText() {
      var copyTextarea = document.querySelector('#copy-text-area');
      copyTextarea.select();
      console.log(this.videoLink)
      document.execCommand('copy')
      this.$notify({
        message: 'Code has been copied!',
      });
    },
    updateCode(){
      let code = document.getElementById("canvas-code");
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/ig,"")
    },
    mediaSwitch(){
      this.userInput.isVideo = !this.userInput.isVideo;
      this.userInput.mediaSwitchText = this.userInput.isVideo ? "Click to input Image" : "Click to input Video"
    }
  },
  mounted(){
    this.updateCode();
    setInterval( () => {
      this.updateCode();
    }, 1000);
  },
  beforeUpdate(){
    this.updateCode();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

textarea {
  width: auto;
}

.quill{
  width: 700px;

}

el-tab-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: 'blue';
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.textbox{
  margin-left: 40px;
}

#canvas-code {
  width: 1000px;
  margin: auto;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  margin-right: 30px;
  width: 30%;
}

#copy-text-area {
  width: 100%;
}

.GFbanner {
  height: 190px;
}

</style>
