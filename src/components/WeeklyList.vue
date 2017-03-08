<template lang="html">
  <div id="weeklylist">
  <hr>
  <div class="code-container">

    <div class="textbox-container">
      <button type="button" class="add-weekly center" name="button" @click="AddActivity">Add New Weekly Activity</button>
      <br>
      <div class="code-input center">
        Edit Week: <textarea v-model="userInput.weekNumber" class="code-input" rows="1" cols="4"></textarea>
      </div>
      <div class="code-input center" id='textbox1'>
        <p style="font-weight: bold">Title</p>
        <textarea v-model="weeklyActivites[userInput.weekNumber - 1].title" id="text-area" rows="3" cols="30"></textarea> <br>
      </div>
      <div class="code-input center" id='textbox1'>
        <p style="font-weight: bold">Description</p>
        <textarea v-model="weeklyActivites[userInput.weekNumber - 1].description" id="text-area" rows="3" cols="30"></textarea> <br>
      </div>
      <div class="code-input center" id='textbox1'>
        <p style="font-weight: bold">Image</p>
        <textarea v-model="weeklyActivites[userInput.weekNumber - 1].imgSrc" id="text-area" rows="3" cols="30"></textarea> <br>
      </div>



    </div>

    <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
      <div class="GFslimbanner">
      <p>{{userInput.title.toUpperCase()}}</p>
      </div>
      <div class="grid-row">
      <div class="col-xs-12 col-lg-12">
      <div class="ic-image-text-combo">
      <div class="ic-image-text-combo__text">
      <div class="pad-box-mini">
      <h3 style="margin-bottom: 5px;"><i class="icon-clock"></i> WEEKLY ACTIVITIES</h3>
      </div>
      <div class="pad-box-mini border border-b border-t">
      <p>Welcome to the Weekly Activities page! Below you'll find an overview of all twelve lectures, each covering a distinct topic in the field of {{userInput.title}}. Clicking on a week will take you to a page where you can watch the entire lecture and complete the activities related to that lecture.</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      <weekly-list-item v-for="(activity, index) in weeklyActivites" :data="activity" :index="index"> </weekly-list-item>
    </div>

  </div>

  <p style="font-weight: bold" class="center">Code Output</p>
  <div class="footer">
    <textarea @click="copyText" v-model="outputCode" id="copy-text-area" rows="30" cols="120"></textarea> <br> <br>
  </div>

</div>
</template>

<script>
import CanvasCode from './CanvasCode.vue'
import { quillEditor } from 'vue-quill-editor';
import WeeklyListItem from './weekly/WeeklyListItem'

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote',{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] },'clean'],
  ['link', 'image']
];

export default {
  name:"weeklylist",
  data () {
    return {
      userInput: {
        title:"Global Food Systems",
        weekNumber: 1
      },
      weeklyActivites: [
        {
          title: "Sustainable Agriculture and Food Systems: Key Concepts and Historical Perspective",
          description: "Class: Tuesday, January 17th",
          imgSrc: "http://assets.ce.columbia.edu/i/ce/intl/intl-fp@2x.jpg"
        },
        {
          title: "Sustainable Agriculture and Food Systems: Key Concepts and Historical Perspective",
          description: "Class: Tuesday, January 17th",
          imgSrc: "http://assets.ce.columbia.edu/i/ce/intl/intl-fp@2x.jpg"
        }
      ],
      editorOption:{
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  components: {
    quillEditor,
    CanvasCode,
    WeeklyListItem
  },
  computed: {
  },
  methods: {
    copyText() {
      var copyTextarea = document.querySelector('#copy-text-area');
      copyTextarea.select();
      document.execCommand('copy')

      this.$notify({
        message: 'Code has been copied!',
      });

    },
    updateCode(){
      let code = document.getElementById("canvas-code");
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/ig,"")
    },
    AddActivity(){
      this.weeklyActivites.push(this.weeklyActivites[0])
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

.add-weekly {

  margin-bottom: 20px;
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 300px;
  margin: auto;
  align-self: flex-start;
  margin-top: 20px
}

.code-input {
  margin: 10px;
}

.quill {
  width: 75%;

}


#canvas-code {
  width: 1015px;
  margin: auto;
  align-self: flex-start;
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
