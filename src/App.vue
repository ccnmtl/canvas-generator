<template>
  <div id="app">

      <a href="#offcanvas-slide" class="uk-button uk-button-default noBorder" uk-toggle><span uk-icon="icon: table"></span> &nbsp;Menu</a>

      <!-- <a href="#offcanvas-slide" uk-toggle>Open</a> -->

      <div class="uk-float-right uk-padding-small">
        <h6>Course Info: <span class="uk-margin-small-right" uk-icon="icon: cog; ratio: 1" v-loading.fullscreen.lock="loading" @click="dialogFormVisible = true"></span> CANVAS CODE GENERATOR</h6>
      </div>

    <vue-snotify></vue-snotify>

    <div id="offcanvas-slide" uk-offcanvas>
        <div class="uk-offcanvas-bar uk-background">
    		<ul class="uk-nav uk-nav-default">
          <li class="uk-nav-header"><router-link class="router" to="/guide">USER GUIDE</router-link></li>
          <li class="uk-nav-header uk-margin-remove"><router-link class="router" to="/home">GET STARTED</router-link></li>
    			<li class="uk-nav-header">TEMPLATES</li>
    			<li><router-link class="router" to="/home">Home Page</router-link></li>
          <li><router-link class="router" to="/syllabus">Syllabus</router-link></li>
          <li v-show="info.classType.option == 'Executive Training'"><router-link class="router" to="/program">Program Overview</router-link></li>
          <li><router-link class="router" to="/weeklylist">Weekly Activites</router-link></li>
          <!-- <li v-show="info.classType.option !== 'Blended'"><router-link class="router" to="/weekly">Individual Activity</router-link></li> -->
          <li v-show="!info.isBlended"><router-link class="router" to="/weekly">Individual Activity</router-link></li>
          <li v-show="info.isBlended"><router-link class="router" to="/weeklyblended">Individual Activity</router-link></li>
          <li class="uk-nav-header"><router-link class="router" to="/export">Export/Import Data</router-link></li>
          <li class="uk-nav-header"><router-link class="router" to="/credits">CREDITS</router-link></li>
    			<li class="uk-nav-divider uk-margin-medium-top uk-margin-medium-bottom"></li>
    			<li><router-link to="/">Course Builder Home</router-link></li>
    			<li><a href="https://courseworks2.columbia.edu/" target="_blank">Canvas Website</a></li>
    			<li class="uk-nav-divider uk-margin-medium-top uk-margin-medium-bottom"></li>
    		</ul>
       		<!-- <button class="uk-button uk-button-primary uk-margin-large-top">download the guide</button> -->
        </div>
    </div>

    <!-- OLD DIALOG -->
    <el-dialog title="Course Info" :visible.sync="dialogFormVisible">
      <div class="center">
        <label for="input"> Course Title <el-input placeholder="Please input" v-model="info.title"></el-input> </label>
        <label for="input"> Course URL <br> <el-input autosize style="width: 400px" placeholder="Please input" v-model="info.url"></el-input> </label>
        <br>
        <label for="select">Class Type
          <select style="display: inline-block; width:150px" v-model="info.classType" name="Choose Banner" class="uk-select">
            <option v-for="type in info.classOptions" :value="type">{{type.option}}</option>
          </select>
        </label>

        <span style="display:inline-block; width: 10px;"> </span>

        <label style="margin-left: 20px;">
          School:
          <select style="display: inline-block; width:150px" v-model="theme" name="Choose Banner" class="uk-select">
            <option v-for="theme in $store.getters.getThemeOptions" :value="theme">{{theme.option}}</option>
          </select>
        </label>

        <span style="display:inline-block; width: 20px;"> </span>

        <label for="select">Blended Model
        <el-switch
          v-model="info.isBlended"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        </label>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

    <div class="clearfix"></div>

    <!-- <div class="center routers">
      <router-link :to="this.$store.state.prevPage">
      <el-button type="primary" class="nav-button"><i class="el-icon-arrow-left el-icon-left"></i>Previous Page</el-button>
      </router-link>
      <span class="nav-text">{{this.$route.name}}</span>
      <router-link :to="this.$store.state.nextPage">
      <el-button type="primary" class="nav-button">Next Page<i class="el-icon-arrow-right el-icon-right"></i></el-button>
      </router-link>

    </div> -->

    <!-- If Export Should be Top Level Insert Code Here -->

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { EventBus } from "./bus";
import { mapGetters, mapMutations } from 'vuex'

var moment = require('moment');

export default {
  name: "app",
  data() {
    return {
      hasImportData: false,
      dialogFormVisible: false,
      exportData: {},
      ruleForm: {
        title: this.$store.getters.getInfo.title,
        url: this.$store.getters.getInfo.urlArgs,
        classType: this.$store.getters.getInfo.classType,
        isBlended: this.$store.getters.getInfo.isBlended,
        theme: this.$store.getters.getTheme,
      },
      rules: {
        title: [
          { required: true, message: 'Course Title is required', trigger: 'blur' },
          { min: 0, max: 35, message: 'Length should be less than 35 characters', trigger: 'blur' }
        ],
        url: [
          { required: true, message: 'Course URL is required', trigger: 'blur' },
          { type: "url" , message: 'Must be a valid URL', trigger: 'blur' }
        ],

      }
    };
  },
  methods: {
    ...mapMutations([
      'addWeek', 'sliceWeek', 'updateWeeks', 'updateInfo'
    ]),
    confirmForm(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.info.title = this.ruleForm.title
          this.info.url = this.ruleForm.url
          this.info.classType = this.ruleForm.classType
          this.info.isBlended = this.ruleForm.isBlended
          this.theme = this.ruleForm.theme
          this.dialogFormVisible = false

        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    info: {
      get () {
        return this.$store.getters.getInfo
      },
      set (payload) {
        this.$store.commit('updateInfo', payload)
      }
    },
    theme: {
      get () {
        return this.$store.getters.getTheme
      },
      set (payload) {
        this.$store.commit('updateTheme', payload)
      }
    },
  },
  mounted() {
    let weeklyActivities = [];

    for (let i = 1; i <= 12; i++ ){
      let tempWeek = _.cloneDeep(this.$store.getters.dWeek)
      tempWeek.imgSrc = this.$store.state.imageServer + this.$store.state.info.classType.dateType.toLowerCase() + i + '.png'

      weeklyActivities.push(tempWeek);
    }

    weeklyActivities.forEach((week, index)=>{
      week.date = moment().add(index, 'w')
    })

    this.updateWeeks(weeklyActivities)
  }
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

/*.uk-button, .uk-button-small {
  font-size: 13px;
  font-weight: bold;
}*/

.export-container {
  height: 80px;
  margin: 10px;
}

.center {
  text-align: center;
}

.router {
  /*margin: 30px;
  font-size: 20px;*/
}

.nav-text {
  font-size: 25px;
  margin: 25px;
}

.routers {
  margin-bottom: 20px;
}

.nav-button {
  display:inline-block;
}
</style>
