<template>
  <div class="hello">

    <hr>
    <div class="code-container">

      <div class="textbox-container">
        <md-input-container>
          <label>Initial value</label>
          <md-input></md-input>
        </md-input-container>

        <ui-collapsible title="Course Title">
          <ui-textbox v-model="title" ></ui-textbox>
        </ui-collapsible>
        <ui-collapsible title="Semester">
          <ui-textbox v-model="semester" ></ui-textbox>
        </ui-collapsible>
        <ui-collapsible title="Professor">
          <ui-textbox v-model="professor" ></ui-textbox>
        </ui-collapsible>
        <ui-collapsible title="Professor Email">
          <ui-textbox v-model="pEmail" ></ui-textbox>
        </ui-collapsible>
        <ui-collapsible title="Description">
            <p style="font-weight: bold">Description</p>
            <quill-editor ref="myTextEditor"
                          v-model="richText1"
                          :config="editorOption">
            </quill-editor>
            <br>
            <br>
            <br>
        </ui-collapsible>

        <ui-collapsible title="TA">
        <ui-textbox v-model="ta" ></ui-textbox>
        </ui-collapsible>

        <ui-collapsible title="TA Email">
        <ui-textbox v-model="tEmail" ></ui-textbox>
        </ui-collapsible>

        <ui-collapsible title="Office Hours">
        <ui-textbox v-model="office" ></ui-textbox>
        </ui-collapsible>

        <ui-collapsible title="Meeting Times">
        <ui-textbox v-model="meetings" ></ui-textbox>
        </ui-collapsible>

        <ui-collapsible title="Discussions">
        <ui-textbox v-model="discussions" ></ui-textbox>
        </ui-collapsible>

        <ui-collapsible title="Description">
        <ui-textbox :multi-line="true" :rows="5" v-model="description" ></ui-textbox>
        </ui-collapsible>

        <ui-collapsible title="Video Link">
        <ui-textbox v-model="video"></ui-textbox>
        </ui-collapsible>


      </div>

      <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>

      <div class="pad-box-mega GFbanner">
      <p>{{title}}</p>
      <p class="semesterSubtitle">{{semester}}</p>
      </div>
      <div class="content-box">
      <div class="grid-row">
      <div class="col-xs-6">
      <div class="styleguide-section__grid-demo-element">
      <div class="embed-container"><iframe :src="'https://player.vimeo.com/video/' + videoLink" width="300" height="150" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></div>
      </div>
      </div>
      <div class="col-xs-6">
      <div class="styleguide-section__grid-demo-element">
      <div class="welcome">WELCOME TO {{title}}</div>
      <p>Here you&rsquo;ll find course materials and a range of tools to help you get the most out of the class. Please begin by reading the course syllabus, where you&rsquo;ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester.</p>
      <p class="html" v-html="richText1"></p>
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
      <p>Professor {{professor}} (<a :href="'mailto:' + pEmail">{{pEmail}}</a>) <br /> {{office}}</p>
      </div>
      </div>
      <div class="col-xs-6">
      <div class="styleguide-section__grid-demo-element pad-box-mini border border-tbl">
      <p>TA:</p>
      <p> {{ta}} (<a :href="'mailto:' + tEmail">{{tEmail}}</a>) <br /> {{tOffice}}</p>
      </div>
      </div>
      </div>
      </div>
      <div class="content-box pad-box-mini border border-b">
      <p><strong>MEETING DATES / TIMES:</strong> {{meetings}}</p>
      <p><strong>SPECIAL DISCUSSION FORUMS:</strong> {{discussions}}</p>
      </div>

      </div>

    </div>

    <p style="font-weight: bold" class="center">Code Output</p>
    <div class="footer">
      <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea> <br> <br>
    </div>

  </div>
</template>

<script>

    // TODO -- Build Components for the INPUT / Code Output / Preview so one can scope the necessary styles accordingly
    // Use Provide / Inject for child components?

import Vue from 'vue';
import KeenUI from 'keen-ui';
import VueMaterial from 'vue-material'
import { quillEditor } from 'vue-quill-editor';

Vue.use(KeenUI);
Vue.use(VueMaterial);

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote',{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] },'clean'],
  ['link', 'image']
];

export default {
  name: 'hello',
  data () {
    return {
      title: "GLOBAL FOOD SYSTEMS",
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
      outputCode: "",
      description:"Here you’ll find course materials and a range of tools to help you get the most out of the class. Please begin by reading the course syllabus, where you’ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester.",
      richText1:"",
      textbox2: "",
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
  computed: {
    videoLink(){
      let link = this.video;
      var parts = link.split('/');
      return parts[3];
    }
  },
  methods: {
    copyText() {
      var copyTextarea = document.querySelector('#copy-text-area');
      copyTextarea.select();
      document.execCommand('copy')
    },
    updateCode(){
      let code = document.getElementById("canvas-code");
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/ig,"")
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



.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 30%;
  margin-left: 20px;
  align-self: flex-start;
  margin-top: 20px
}

.quill {
  width: 75%;

}

.textbox{
}

#canvas-code {
  width: 1015px;
  margin: auto;
  align-self: flex-start;
}

.tabs {
  width: 90%;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
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

</style>
