<template lang="html">
  <div id="weeklylist">
  <hr>
  <div class="code-container">

    <div class="textbox-container">
      <div class="code-input center">
        Number of Weeks to Add: <textarea v-model="userInput.toAdd" class="code-input" rows="1" cols="4"></textarea>
      </div>
      <button type="button" class="add-weekly center" name="button" @click="populateActivities(userInput.toAdd)">Add New Weekly Activities</button>
      <button type="button" class="add-weekly center"  name="button" @click="weeklyActivites.splice(1, weeklyActivites.length - 1)">Clear</button>
      <hr>
      <div class="code-input center">
        Edit Week: <textarea v-model="userInput.weekNumber" class="code-input" rows="1" cols="4"></textarea>
      </div>

      <select v-model="userInput.weekNumber">
        <option v-for="n in weeklyActivites.length" :value="n">Week {{n}}</option>
      </select>

      <div v-if="weeklyActivites.length > 0">
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

        <form class="your-form-class" v-on:submit.prevent="onFormSubmit('image')">
          <input name="image" id="image-file" type="file">
          <input type="submit" value="Submit!">
        </form>

        <form class="your-form-class" v-on:submit.prevent="onFormSubmit('url')">
          <input name="imageUrl" id="image-url" type="text">
          <input type="submit" value="Submit!">
        </form>

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
      <p>Welcome to the Weekly Activities page! Below you'll find an overview of all {{numWeeks}} lectures, each covering a distinct topic in the field of {{userInput.title}}. Clicking on a week will take you to a page where you can watch the entire lecture and complete the activities related to that lecture.</p>
      </div>
      </div>
      </div>
      </div>
      </div>

      <weekly-list-item v-if="weeklyActivites.length > 0" v-for="(activity, index) in weeklyActivites" :data="activity" :index="index+1" :key="activity.title" > </weekly-list-item>
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
import store from '../store'
import { quillEditor } from 'vue-quill-editor';
import WeeklyListItem from './weekly/WeeklyListItem'
import Home from './Home'

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
        title: store.title,
        weekNumber: 1,
        toAdd: 1,
      },
      weeklyActivites: [],
      numActivities: 13,
      outputCode: '',
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
    numWeeks(){
      let num = this.weeklyActivites.length

      var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
      var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

      if ((num = num.toString()).length > 9) return 'overflow';
      let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return; var str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
      str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
      return str;
    }
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
      this.userInput.title = store.title // Home.data().userInput.title
    },
    AddActivity(){
      let index = this.weeklyActivites.length + 1

      if (index > 15) index = 15;

      let tempActivity = {
        title: "Sustainable Agriculture and Food Systems: Key Concepts and Historical Perspective",
        description: "Class: Tuesday, January 17th",
        imgSrc: 'http://s3.us-east-2.amazonaws.com/sipa-canvas/temp/week' + index + '.png' // "http://assets.ce.columbia.edu/i/ce/intl/intl-fp@2x.jpg"
      }

      this.weeklyActivites.push(tempActivity);
    },

    populateActivities(num){
      for (let i = 0; i < num; i++ ) this.AddActivity();
    },
    onFormSubmit (type, ev){
      var formData = new FormData();
      if (type == 'url'){
        console.log('url')
        var imageurl = document.querySelector('#image-url');
        formData.append("imageUrl", imageurl.value);
        console.log(imageurl.value)
      }
      else {
        console.log('file')
        var imagefile = document.querySelector('#image-file');
        formData.append("image", imagefile.files[0]);
      }
      formData.append('imageWidth', 350)
      formData.append('imageHeight', 160)

      this.$http.post('http://ec2-34-229-16-148.compute-1.amazonaws.com:3000/image',formData).then( response => {
        console.log('success')
        console.log(response)
        let imageData = JSON.parse(response.bodyText);

        console.log(imageData.imageUrls[0])
        this.weeklyActivites[this.userInput.weekNumber - 1].imgSrc = imageData.imageUrls[0]
      }, response => {
        console.log(response)
      });
      // axios.post('upload_file', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })
      // }
    }

  },
  mounted(){
    this.populateActivities(12)
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
  margin: 10px
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
