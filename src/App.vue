<template>
  <div id="app">

      <a href="#offcanvas-slide" class="uk-button uk-button-default noBorder" uk-toggle><span uk-icon="icon: table"></span> &nbsp;Menu</a>

      <!-- <a href="#offcanvas-slide" uk-toggle>Open</a> -->

      <div class="uk-float-right uk-padding-small">
        <h6><span class="uk-margin-small-right" uk-icon="icon: cog; ratio: 1" v-loading.fullscreen.lock="loading"></span> CANVAS CODE GENERATOR</h6>
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
          <li><router-link class="router" to="/weeklylist">Weekly Activites</router-link></li>
          <li><router-link class="router" to="/weekly">Individual Activity</router-link></li>
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
      exportData: {}
    };
  },
  methods: {
    ...mapMutations([
      'addWeek', 'sliceWeek', 'updateWeeks', 'updateInfo'
    ]),
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  mounted() {
    let weeklyActivities = [];

    for (let i = 1; i <= 13; i++ ){
      let tempWeek = _.cloneDeep(this.$store.getters.dWeek)
      tempWeek.imgSrc = this.$store.state.imageServer + 'week' + i + '.png'

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
