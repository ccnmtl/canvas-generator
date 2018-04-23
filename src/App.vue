<template>
  <div id="app">

    <el-row>
      <el-col :span="6" style="padding: 20px;">
        <a href="#offcanvas-slide" class="uk-button uk-button-default noBorder" uk-toggle><span uk-icon="icon: table"></span> &nbsp;Menu</a>
      </el-col>
      <el-col :span="12" style="padding: 10px;">
          <ul class="bcTrail center">
            <li><router-link class="router" to="/home">Home</router-link></li>
            <li><router-link class="router" to="/syllabus">Syllabus</router-link></li>
            <li v-show="info.classType.option == 'Executive Training'"><router-link class="router"  to="/program">Program Overview</router-link></li>
            <li><router-link class="router" to="/weeklylist">Weekly List</router-link></li>
            <li><router-link class="router" to="/weekly">Individual Activity</router-link></li>
            <li><router-link class="router" to="/export">Export</router-link></li>
          </ul>
      </el-col>
      <el-col :span="6">
        <div class="uk-float-right uk-padding-small">
          <a href="#" v-loading.fullscreen.lock="loading" @click="dialogFormVisible = true">
            <el-button type="primary" style="display: inline-block;">Course Info: <i class="fas fa-cog"></i></el-button>
          </a>
          <a href="#help-slide" uk-toggle>
            <el-button type="warning" style="display: inline-block;"> Help <i class="fas fa-question-circle"></i></el-button>
          </a>
        </div>
      </el-col>
    </el-row>

    <!--
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/syllabus' }">Syllabus</el-breadcrumb-item>
      <el-breadcrumb-item v-show="info.classType.option == 'Executive Training'" :to="{ path: '/program' }" >Program Overview</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/weeklylist' }">Weekly List</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/weekly' }" >Individual Activity</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/export' }">Export</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }"></el-breadcrumb-item>
    </el-breadcrumb>

    <a href="#offcanvas-slide" uk-toggle>Open</a>
    -->

    <vue-snotify></vue-snotify>

    <!-- HELP CONTENT -->
    <div id="help-slide" uk-offcanvas="mode: push">
      <div class="uk-offcanvas-bar">
         <button class="uk-offcanvas-close" type="button" uk-close></button>
         <h3>Help</h3>
         <div v-html="helpInfo.body"></div>
         <div v-show="!helpInfo.exists">
           <p> There is no help available for this page </p>
         </div>
         <p> Please check the <router-link class="router" to="/guide">User Guide</router-link> for more information.</p>
     </div>
    </div>

    <!-- MENU CONTENT -->
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
          <li ><router-link class="router" to="/weekly">Individual Activity</router-link></li>
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

    <!-- COURSE INFO DIALOG -->
    <el-dialog title="Course Info" :visible.sync="dialogFormVisible" style="width: 80%; margin:auto;">
      <div class="left">
        <p>
          <label for="coursetitle" style="min-width: 90px">Course Title</label>
          <el-input name="coursetitle" style="width: 400px" placeholder="Please input" v-model="info.title" @input="updateProp('title', $event)"></el-input>
        </p>
        <p>
          <label for="courseurl" style="min-width: 90px">Course URL</label>
          <el-input name="courseurl" style="width: 400px" placeholder="Please input" v-model="info.url" @input="updateProp('url', $event)"></el-input>
        </p>
        <p>
          <label for="select" style="min-width: 90px">Class Type</label>
          <select style="display: inline-block; width:150px" v-model="info.classType" @input="updateProp('classType', $event)" name="Choose Banner" class="uk-select">
            <option v-for="type in info.classOptions" :value="type">{{type.option}}</option>
          </select>

          <label style="margin-left: 30px; min-width: 60px;">School </label>
          <select style="display: inline-block; width:150px" v-model="theme" name="Choose Banner" class="uk-select">
            <option v-for="theme in $store.getters.getThemeOptions" :value="theme">{{theme.option}}</option>
          </select>
        </p>
        <p>
          <label for="select" style="min-width: 110px">Blended Model</label>
          <el-switch
            v-model="info.isBlended"
            @input="updateProp('isBlended', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </p>
        <p>
          <label for="select" style="min-width: 110px">Help Tooltips</label>
          <el-switch
            v-model="info.usePops"
            @input="updateProp('usePops', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </p>
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
import saveState from 'vue-save-state';
import { mapGetters, mapMutations } from 'vuex'
import help from './store/help'
import mutations from './store/mutations'

var moment = require('moment');

export default {
  name: "app",
  data() {
    return {
      hasImportData: false,
      dialogFormVisible: false,
      exportData: {},
    };
  },
  methods: {
    ...mapMutations([
      'addWeek', 'sliceWeek', 'updateWeeks', 'updateInfo'
    ]),
    getSaveStateConfig() {
      return {
          'cacheKey': 'App',
      };
    }
  },
  mixins: [saveState, mutations],
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    helpInfo() {
      let path = this.$route.name
      let body = help[path] || ''
      body = '<h5>' + path + '</h5>' + body
      return {body, exists: help[path]}
    },
    // info: {
    //   get () {
    //     return this.$store.getters.getInfo
    //   },
    //   set (payload) {
    //     this.$store.commit('updateInfo', payload)
    //   }
    // },
    // theme: {
    //   get () {
    //     return this.$store.getters.getTheme
    //   },
    //   set (payload) {
    //     this.$store.commit('updateTheme', payload)
    //   }
    // },
  },
  mounted() {

    if (this.weeks.length < 1){
      let weeklyActivities = [];

      for (let i = 1; i <= 12; i++ ){
        let tempWeek = _.cloneDeep(this.$store.getters.dWeek)
        tempWeek.imgSrc = this.$store.state.imageServer + this.$store.state.info.classType.dateType.toLowerCase() + i + '.png'
        tempWeek.title = "Lecture " + i
        tempWeek.secondTitle = "Lecture " + i + " II"


        weeklyActivities.push(tempWeek);
      }

      weeklyActivities.forEach((week, index)=>{
        week.date = moment().add(index, 'w')
      })

      this.updateWeeks(weeklyActivities)
    }
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

.bcTrail{
  padding-top: 15px;
}

.bcTrail li{
  list-style: none;
  display: inline-block;
  padding-right: 5px;
  font-size: 13px;
}

.bcTrail li::after {
    content: " / ";
    padding-left: 5px;
}

.bcTrail li a{
  text-decoration: none;
  color: #48576a;
}

.bcTrail li a:hover{
  text-decoration: none;
  color: #39f;
}




</style>
