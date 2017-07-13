<template>
  <div class="hello">

    <!-- This Div contains all of the information inputs -->
    <!-- Currently it uses a component from the Element UI library for the tabs -->

    <div class="textbox-container center">

      <el-tabs v-model="activeName">
        <el-tab-pane label="Course Info" name="1" class="center">
          <textarea v-model="userInput.title" class="code-input" rows="1" cols="25"></textarea>
          <textarea v-model="userInput.semester" class="code-input" rows="1" cols="20"></textarea>
          <textarea v-model="userInput.url" class="code-input" rows="1" cols="45"></textarea> <br>
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
      <br> <br>
      <button type="button" name="button" @click="setToDefault">Reset to Default</button>

    </div>

    <hr>
    <br>


    <!-- Right now the code display and output are displayed in a flexbox in the code-container class-->
    <!-- Statements with {{}} or inside tags like :src or v-if mean that it is pulling content from the data or methods of local Vue component -->

    <div class="code-container">

      <!-- This Div contains the displayed code which will be parsed for the code output-->

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
      <div v-if="this.userInput.isVideo" class="embed-container"><iframe :src="this.videoLink" width="300" height="150" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></div>
      </div>
      </div>
      <div class="col-xs-6">
      <div class="styleguide-section__grid-demo-element">
      <div class="welcome">WELCOME TO {{newTitle.toUpperCase()}}</div>
      <p class="html" v-html="userInput.description"></p>
      <p><a class="Button" style="text-decoration: none;" :href="userInput.url + 'assignments/syllabus'" >Course Syllabus</a></p>
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

      <!-- The Code Output -->

      <div class="footer">
        <p style="font-weight: bold" class="center">Code Output</p>
        <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea> <br> <br>
      </div>

    </div>

  </div>
</template>

<script>
import store from '../store'
import { EventBus } from '../bus'
import saveState from 'vue-save-state';
import { quillEditor } from 'vue-quill-editor';

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote',{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] },'clean'],
  ['link']
];

export default {
  name: 'Home',
  data () {
    return {
      userInput: {
        title: store.title,
        url: store.courseUrl,
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
    quillEditor
  },
  mixins: [saveState],
  computed: {
    // Parses an inputted video link to output the correct embed link for the source
    videoLink(){
      let output;
      let link = this.userInput.video;
      let parts = link.split('/');
      if (parts[2].includes('vimeo.com')){
        output = 'https://player.vimeo.com/video/' + parts[3]
      }
      else if (parts[2].includes('youtube')){
        let split = link.split('=')
        output = 'https://www.youtube.com/embed/' + split[1]
      }
      else {
        output = link;
      }
      return output;
    },
    // Updates the user inputted title and course url into the store
    newTitle(){
      let title = this.userInput.title
      let url = this.userInput.url
      console.log('updating store...')
      store.title = title
      store.courseUrl = this.userInput.url = url.replace(/\/?(\?|#|$)/, '/$1')
      return title
    }
  },
  methods: {
    // Copies the text when user selects the code output area
    copyText() {
      var copyTextarea = document.querySelector('#copy-text-area');
      copyTextarea.select();
      console.log(this.videoLink)
      document.execCommand('copy')
      this.$notify({
        message: 'Code has been copied!',
      });
    },
    // Parses the code from the canvas-code div and puts it in the output
    updateCode(){
      let code = document.getElementById("canvas-code");
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/ig,"")
      store.title = this.userInput.title
      store.courseUrl = this.userInput.url
    },
    // Toggles button to insert video or image
    mediaSwitch(){
      this.userInput.isVideo = !this.userInput.isVideo;
      this.userInput.mediaSwitchText = this.userInput.isVideo ? "Click to input Image" : "Click to input Video"
    },
    setToDefault(){
      console.log('resetting data...')
      this.userInput = { ...store.homeDefault };
      EventBus.$emit('set-default', 'setting all to default...');
    },
    getSaveStateConfig() {
      return {
          'cacheKey': 'Home',
      };
    }
  },
  mounted(){
    // Once the component is loaded, start updating the code every second
    this.updateCode();
    setInterval( () => {
      this.updateCode();
    }, 1000);
  },
  beforeCreate(){
    EventBus.$on('import-data', data => {
      this.userInput = { ...data.home.userInput}
      console.log('importing data to home...')
    })

    EventBus.$on('export-data', () => {
      let home = this.$data
      console.log('sending home')
      EventBus.$emit('home-data', home)
    })
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
