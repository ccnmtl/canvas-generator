<template>
  <div class="hello">


    <hr>
    <div class="code-container">

      <div class="textbox-container">
        <div class="textbox" id='textbox1'>
          <p style="font-weight: bold">Course Title</p>
          <textarea v-model="title" id="text-area" rows="2" cols="30"></textarea> <br>
        </div>
        <div class="textbox" id='textbox1'>
          <p style="font-weight: bold">Course ID / Semester</p>
          <textarea v-model="semester" id="text-area" rows="2" cols="30"></textarea> <br>
        </div>
        <div class="textbox" id='textbox2'>
          <p style="font-weight: bold">Professor</p>
          <textarea v-model="professor" id="text-area" rows="2" cols="30"></textarea> <br>
        </div>
        <div class="textbox" id='textbox3'>
          <p style="font-weight: bold">Professor Email</p>
          <textarea v-model="pEmail" id="text-area" rows="2" cols="30"></textarea> <br>
        </div>
        <div class="textbox" id='textbox2'>
          <p style="font-weight: bold">TA</p>
          <textarea v-model="ta" id="text-area" rows="2" cols="30"></textarea> <br>
        </div>
        <div class="textbox" id='textbox3'>
          <p style="font-weight: bold">TA Email</p>
          <textarea v-model="tEmail" id="text-area" rows="2" cols="30"></textarea> <br>
        </div>
        <div class="textbox" id='textbox1'>
          <p style="font-weight: bold">Office Hours</p>
          <textarea v-model="office" id="text-area" rows="2" cols="40"></textarea> <br>
        </div>
        <div class="textbox" id='textbox1'>
          <p style="font-weight: bold">Meeting Times</p>
          <textarea v-model="meetings" id="text-area" rows="2" cols="40"></textarea> <br>
        </div>
        <div class="textbox" id='textbox1'>
          <p style="font-weight: bold">Discussions</p>
          <textarea v-model="discussions" id="text-area" rows="2" cols="40"></textarea> <br>
        </div>
        <div class="textbox" id='textbox1'>
          <p style="font-weight: bold">Video Link: {{videoLink}}</p>
          <textarea v-model="video" id="text-area" rows="2" cols="40"></textarea> <br>
        </div>

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
      richText1:""
    }
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
    }
  },
  filters: {
    linkify(text) {
      var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(urlRegex, function(url) {
          return '<a href="' + url + '">' + url + '</a>';
      });
    }
  },
  mounted(){
    setInterval( () => {
      var code = document.getElementById("canvas-code");
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/ig,"")
    }, 2000);
  },
  beforeUpdate(){
    var code = document.getElementById("canvas-code");
    this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/ig,"")
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
}

.textbox{
  margin-left: 20px;
}

#canvas-code {
  width: 1015px;
  margin: auto;
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
