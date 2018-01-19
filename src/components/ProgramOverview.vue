<template lang="html">

  <div id="weeklylist">

  <hr>

  <div class="code-container">

    <div class="textbox-container">
      <el-card class="card">
        How Many Weeks: <br> <el-input-number  style="margin: 10px;" v-model="info.execWeeks" :min="1" :max="4"></el-input-number> <br>
        How Many Days per Week: <br> <el-input-number  style="margin: 10px;" v-model="info.execWeekLength" :min="1" :max="7"></el-input-number>
        <br>
        <button type="button" class="add-weekly center uk-button uk-button-primary"
        name="button" @click="populateActivities(info.execWeeks*info.execWeekLength)">Edit # of Sessions</button>

        <br> <br> Start Date <br>
        <el-date-picker
          style="margin: 10px; margin-bottom:20px"
          v-model="info.startDate"
          type="date"
          placeholder="Pick start date">
        </el-date-picker>
      </el-card>
    </div>


      <hr>

      <div>
        <!-- <el-card>
        <div class="code-input center">
          Edit {{info.classType.dateType}}: <el-input-number  style="margin: px;" v-model="userInput.weekNumber" :min="1" :max="weeks.length"
            controls-position="right" size="small" :label="'Edit ' + info.classType.dateType"></el-input-number>
        </div>

        <select v-model="userInput.weekNumber" class="uk-select">
          <option v-for="n in weeks.length" :value="n">{{info.classType.dateType}} {{n}}</option>
        </select>

        <div v-if="weeks.length > 0">
          <div class="code-input center uk-margin-small-top">
            <label for="text-area">Title</label> <br>
            <el-input type="textarea" autosize v-model="weeks[userInput.weekNumber - 1].title"> </el-input>
          </div>

          <div class="code-input center uk-margin-small-top">
            <label for="text-area">Description</label>
            <el-input type="textarea" autosize v-model="weeks[userInput.weekNumber - 1].description"> </el-input>
          </div>
        </div>
        </el-card> -->

    </div>

    <!-- Where the canvas code is stored -->
    <div id="canvas-code" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
      <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]">
        <p>{{info.title.toUpperCase()}}</p>
      </div>

      <div class="content-box">
        <div class="grid-row top-xs">
          <div class="col-xs-12">
            <div class="styleguide-section__grid-demo-element">
              <p style="text-align: left;"><span>The objective of this program is to offer experienced Brazilian public sector managers different tools to be used in solving problems and improving results, within an ethical model. Based on successful examples from around the world of public projects in urban areas, health, and education, the sessions will help executives explore new ways of working together across traditional boundaries to solve complex urban problems.</span></p>
            </div>
          </div>
        </div>
      </div>
      <div v-for="week in info.execWeeks">
        <div class="content-box">
          <div :class="'STV1_CC_Banner0' + (week + 2)">
            <p class="STV1_CC_BannerTitle">SCHEDULE // WEEK {{week}}</p>
          </div>
        </div>

        <div class="content-box">
          <div class="grid-row top-xs">
            <div class="col-xs-12">
              <div class="styleguide-section__grid-demo-element">
                <table class="ic-Table ic-Table--hover-row" style="height: 58px;" width="431">
                  <thead>
                    <tr>
                      <th style="width: 90px;">&nbsp;</th>
                      <th style="width: 75px;" v-for="day in info.execWeekLength"> {{incrementDate(info.startDate, week - 1, day - 1)}}</th>


                      <!-- This line grab dates of first four days, then next four days, etc.. would work if I implemented a seperate start day for each week (possibly better)
                      <th style="width: 75px;" v-for="i in info.execWeekLength"> {{formatDate(weeks[(day - 1) + (week - 1) * info.execWeekLength].date)}}</th> -->

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="width: 88px;">9:30 am - 12:00 pm</td>
                      <td style="width: 74x;" v-for="day in info.execWeekLength">
                        <p v-if="day == 1 && week == 1"><em>(Overview of Program)</em></p>
                        <div v-if="(day - 1) + (week - 1) * info.execWeekLength < weeks.length">
                          <p><strong>{{weeks[(day - 1) + (week - 1) * info.execWeekLength].title}}</strong></p>
                          <p>{{info.profs[0].name}}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 88px;"><strong>Lunch Break</strong></td>
                      <td v-for="day in info.execWeekLength"></td>
                    </tr>
                    <tr>
                      <td style="width: 88px;">1:30 pm - &nbsp;4:00 pm</td>
                      <td style="width: 74x;" v-for="day in info.execWeekLength">
                        <p v-if="day == 1 && week == 1"><em>(Overview of Program)</em></p>
                        <div v-if="(day - 1) + (week - 1) * info.execWeekLength < weeks.length">
                          <p><strong>{{weeks[(day - 1) + (week - 1) * info.execWeekLength].title + " II"}}</strong></p>
                          <p>{{info.profs[0].name}}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
import { mapGetters, mapMutations } from "vuex";
import { EventBus } from "../bus";
import { quillEditor } from "vue-quill-editor";
import saveState from "vue-save-state";

var moment = require('moment');

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
];

export default {
  name: "weekly",
  data() {
    return {
      userInput: {
        isFile: true,
        weekNumber: 0,
        uploadSwitchText: "Click to Upload Image from Url"
      },
      pEditable: false,
      tEditable: false,
      iEditable: true,
      outputCode: "",
      selected: { index: 0, list: this.$store.getters.getInfo.profs },
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    };
  },
  components: {
    quillEditor
  },
  mixins: [saveState],
  computed: {
    ...mapGetters(["getInfo", "dWeek", 'getWeeks']),

    info: {
      get() {
        return this.$store.getters.getInfo;
      },
      set(payload) {
        this.$store.commit("updateInfo", payload);
      }
    },
    weeks: {
      get() {
        return this.getWeeks;
      },
      set(payload) {
        this.$store.commit("updateWeeks", payload);
      }
    }
  },
  methods: {
    ...mapMutations([
      'addWeek', 'sliceWeek', 'updateWeeks', 'updateInfo'
    ]),
    formatDate(date){
      return moment(date, "dddd, MMMM Do").format("dddd Do")
    },
    incrementDate(date, weeks, days){
      return moment(date).add(weeks, 'w').add(days, 'd').format("dddd Do")
    },
    newLine(val) {
      if (!val) return "";
      return val.replace(/\r?\n/g, "<br />");
    },
    copyText(option) {
      var copyTextarea = document.querySelector("#copy-text-area");

      if (option == "aux") {
        var aux = document.createElement("input");
        aux.setAttribute("value", copyTextarea.value);
        document.body.appendChild(aux);
        aux.select();
        console.log("creating aux element..");
      } else {
        copyTextarea.select();
      }

      document.execCommand("copy");

      this.$snotify.success("Code has been copied", { showProgressBar: false });

      if (option == "aux") document.body.removeChild(aux);
    },
    updateCode() {
      let code = document.getElementById("canvas-code");
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/gi, "");
    },
    updateSwitch() {
      this.userInput.isFile = !this.userInput.isFile;
      this.userInput.uploadSwitchText = this.userInput.isFile
        ? "Click to Upload Image from URL"
        : "Click to Upload Image from Computer";
    },
    AddActivity(){
      let index = this.weeks.length + 1

      if (index > 15 && this.info.classType.dateType == "Week") index = 15;

      let tempWeek = _.cloneDeep(this.dWeek)
      tempWeek.imgSrc = this.$store.state.imageServer + this.info.classType.dateType.toLowerCase() + index + '.png'

      // let tempWeek = this.dWeek
      // tempWeek.imgSrc = this.$store.state.imageServer + 'week' + index + '.png'
      //
      this.addWeek(tempWeek)
    },
    // Adds a user inputted number of activities
    populateActivities(num){
      let diff = num - this.weeks.length

      console.log(diff)

      if (diff > 0 ){
        for (let i = 0; i < diff; i++ ) this.AddActivity();
      }

      if (diff < 0) {
        this.userInput.weekNumber = 1;
        this.weeks = this.weeks.slice(0, num);
      }

      this.updateDates()

    },
    onFormSubmit(
      type,
      obj,
      id = type == "url" ? "#image-url" : "#image-file",
      ev
    ) {
      var formData = new FormData();

      if (type == "url") {
        console.log("uploading url...");
        var imageurl = document.querySelector(id); // Gets form data in html
        if (imageurl.value == "") return;
        formData.append("imageUrl", imageurl.value); // Adds api header to tell server that it is a url
      } else {
        console.log("uploading file...");
        var imagefile = document.querySelector(id);
        if (imagefile.files.length == 0) return;
        formData.append("image", imagefile.files[0]); // Adds api header to tell server that it is a file
      }

      // More api headers to tell the server the dimensions to crop
      formData.append("imageWidth", 200);
      formData.append("imageHeight", 200);

      // Send post request to Amazon server using vue-resource with form data
      this.$http
        .post(
          "http://ec2-34-229-16-148.compute-1.amazonaws.com:3000/image",
          formData
        )
        .then(
          response => {
            console.log("success");
            let imageData = JSON.parse(response.bodyText);
            obj.imgSrc = imageData.imageUrls[0]; // Change requisite weekly activity image src to the hosted file
          },
          response => {
            console.log(response);
          }
        );
    },
    updateDates(){
      this.weeks.forEach((week, index)=>{
        let interval = this.info.classType.dateType == "Week" ? 'w' : 'd'
        week.date = moment(this.info.startDate).add(index, interval)
      })
    },
    updateImages(){
      this.weeks.forEach((week, index)=>{
        if (index > 14 && this.info.classType.dateType == "Week") index = 14;
        week.imgSrc = this.$store.state.imageServer + this.info.classType.dateType.toLowerCase() + (index + 1) + '.png'
      })
    },
    setToDefault() {
      console.log("resetting data...");
      this.info = { ...this.$store.getters.dInfo };
    },
    getSaveStateConfig() {
      return {
        cacheKey: "Syllabus"
      };
    }
  },
  mounted() {
    this.updateCode();
    setInterval(() => {
      this.updateCode();
    }, 1000);

    updateDates()
    updateImages()
  },
  beforeCreate() {
    EventBus.$on("set-default", response => {
      this.setToDefault();
      console.log(response);
    });

    EventBus.$on("import-data", data => {
      this.userInput = { ...data.weekly.userInput };
      this.videos = data.weekly.videos;
      this.assignments = data.weekly.assignments;
      this.discussions = data.weekly.discussions;
      console.log("importing data to weekly...");
    });

    EventBus.$on("export-data", () => {
      // let weeklyList = {
      //   weeklyActivites: this.weeklyActivites
      // }
      // EventBus.$emit('list-data', weeklyList)

      let syllabus = this.$data;
      console.log("sending syllabus");
      EventBus.$emit("syllabus-data", syllabus);
    });
  },
  beforeUpdate() {
    this.updateCode();
  }
};
</script>



<style scoped>
h1,
h2 {
  font-weight: normal;
}

textarea {
  width: auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.big-text {
  font-size: 1.2rem;
}

.box-card {
  width: 380px;
}

.card {
  margin: 10px;
}

.e-input {
  margin: 5px;
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

.edit-button {
  margin-right: 10px;
  margin-left: auto;
  float: right;
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 500px;
  margin: auto;
  align-self: flex-start;
  margin-top: 20px;
}

.teacher {
  width: 350px;
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
.fade-leave-to {
  opacity: 0;
}
</style>
