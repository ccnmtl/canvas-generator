<template>
  <div id="app">

    <el-row>
      <!-- Off Canvas Menu Slide -->
      <el-col :span="6" style="padding: 20px;">
        <a href="#offcanvas-slide" class="uk-button uk-button-default noBorder" uk-toggle><span uk-icon="icon: table"></span> &nbsp;Menu</a>
      </el-col>

      <!-- Breadcrumb navigation bar -->
      <el-col :span="12" style="padding: 10px;">
          <ul class="bcTrail center">
            <li><router-link class="router" to="/home">Home</router-link></li>
            <li><router-link class="router" to="/home-new">Home Prototype</router-link></li>
            <li><router-link class="router" to="/syllabus">Syllabus</router-link></li>
            <li v-show="info.classType.option == 'Executive Training'"><router-link class="router"  to="/program">Program Overview</router-link></li>
            <li><router-link class="router" to="/studentlist">Students List</router-link></li>
            <li><router-link class="router" to="/student">Student</router-link></li>
            <li><router-link class="router" to="/activities">Activities</router-link></li>
            <li><router-link class="router" to="/weekly">Individual Activity</router-link></li>
            <li v-show="info.useZoom"><router-link class="router"  to="/zoom">Zoom</router-link></li>
            <li><router-link class="router" to="/export">Export</router-link></li>
          </ul>
      </el-col>

      <!-- Top Right Dialog Buttons -->
      <el-col :span="6">
        <div class="uk-float-right uk-padding-small">
          <a href="#" v-loading.fullscreen.lock="loading" @click="dialogFormVisible = true">
            <el-button type="primary" style="display: inline-block;">Course Info: <i class="fas fa-cog"></i></el-button>
          </a>

          <!-- New Dropdown, not yet designed
          <el-dropdown>
            <el-button type="success">
              Code <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="fas fa-code"></i> View the code</el-dropdown-item>
              <el-dropdown-item><i class="fas fa-copy"></i> Copy the code</el-dropdown-item>
              <el-dropdown-item><i class="fas fa-exclamation-triangle"></i> Reset to default</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->

          <a href="#help-slide" uk-toggle>
            <el-button type="warning" style="display: inline-block;"> Help <i class="fas fa-info-circle"></i></el-button>
          </a>
        </div>
      </el-col>
    </el-row>

    <vue-snotify></vue-snotify>

    <!-- HELP CONTENT -->
    <div id="help-slide" uk-offcanvas="mode: push">
      <div class="uk-offcanvas-bar help-bar">
         <button class="uk-offcanvas-close" type="button" uk-close></button>
         <h3>Help</h3>
         <div v-html="helpInfo.body"></div>
         <div v-show="!helpInfo.exists">
           <p> There is no help available for this page </p>
         </div>
         <p> Please check the <router-link class="router" to="/guide">User Guide</router-link> for more information. </p>
         <p>If you encounter any bugs please
          email a detailed description of the bug and its context to <a :href="'mailto:coursebuilderhelp@gmail.com?Subject=Bug ' + info.title " target="_top">coursebuilderhelp@gmail.com</a></p>
     </div>
    </div>

    <!-- MENU CONTENT -->
    <div id="offcanvas-slide" uk-offcanvas>
        <div class="uk-offcanvas-bar uk-background">
        <ul class="uk-nav uk-nav-default">
          <li class="uk-nav-header"><router-link class="router" to="/guide">USER GUIDE</router-link></li>
          <li class="uk-nav-header">TEMPLATES</li>
          <li><router-link class="router" to="/home">Home Page</router-link></li>
          <li><router-link class="router" to="/syllabus">Syllabus</router-link></li>
          <li v-show="info.classType.option == 'Executive Training'"><router-link class="router" to="/program">Program Overview</router-link></li>
          <li><router-link class="router" to="/activities">Activites</router-link></li>
          <li ><router-link class="router" to="/weekly">Individual Activity</router-link></li>
          <li v-show="info.useZoom"><router-link class="router"  to="/zoom">Zoom</router-link></li>

          <li class="uk-nav-header"><router-link class="router" to="/export">Export/Import Data</router-link></li>
          <li class="uk-nav-header"><router-link class="router" to="/credits">CREDITS</router-link></li>
          <li class="uk-nav-divider uk-margin-medium-top uk-margin-medium-bottom"></li>
          <li><router-link to="/">Course Builder Home</router-link></li>
          <li><a href="https://www.opengov.network/" target="_blank">Canvas Website</a></li>
          <li class="uk-nav-divider uk-margin-medium-top uk-margin-medium-bottom"></li>
        </ul>
        </div>
    </div>

    <!-- COURSE INFO DIALOG -->
    <el-dialog title="Course Info"
               :visible.sync="dialogFormVisible"
               style="width: 80%; margin:auto;">
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
        <!-- Course Type is currently not an option -->
          <!-- <label for="select" style="min-width: 90px;">Course Type</label>
          <select style="display: inline-block; width:150px; margin-right: 30px;" v-model="info.classType" @input="updateProp('classType', $event)" name="Choose Banner" class="uk-select">
            <option v-for="type in info.classOptions" :value="type">{{type.option}}</option>
          </select> -->

          <label style="min-width: 60px;">Organization </label>
          <select style="display: inline-block; width:150px" v-model="theme" name="Choose Banner" class="uk-select">
            <option v-for="theme in $store.getters.getThemeOptions" :value="theme" :key="theme.option">{{theme.option}}</option>
          </select>
        </p>
        <!-- <p>
          <label for="select" style="min-width: 110px">Blended Model</label>
          <el-switch
            v-model="info.isBlended"
            @input="updateProp('isBlended', $event)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </p> -->
         <p>
          <label for="select" style="min-width: 110px">Use Zoom</label>
          <el-switch
            v-model="info.useZoom"
            @input="updateProp('useZoom', $event)"
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

      <el-button @click="showingCourses = true">Show all courses</el-button>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

    <!-- ALL COURSES DIALOG -->
    <el-dialog title="All Courses"
               :visible.sync="showingCourses"
               style="width: 80%; margin:auto;">

      <div class="courses">
        <div class="course"
             v-for="course in $store.getters.getSavedStates"
             :key="course.uuid"
             :class="{ active: course.uuid == currentCourse }"
             @click="currentCourse = course.uuid">
          <h3>{{ JSON.parse(course.info).title }}</h3>
          <small>{{ course.uuid }}</small>
        </div>
      </div>

      <div class="add-new">
        <label>Add new course</label>
        <input class="form-control" v-model="newCourseName" placeholder="New course name" />
        <el-button type="primary" :disabled="!newCourseName" @click="addNewCourse('default')">Save from default</el-button>
        <el-button type="primary" :disabled="!newCourseName" @click="addNewCourse('current')">Save from current state</el-button>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showingCourses = false">Cancel</el-button>
        <el-button type="primary" @click="chooseCourse">Choose</el-button>
      </span>
    </el-dialog>

    <div class="clearfix"></div>

    <!-- If Export Should be Top Level Insert Code Here -->


    <!-- Where each router component is loaded when navigated to by a router link -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogVisible"
      width="50%">
        <component :is="dialogData.type" :dialogData="dialogData" @cancelDialog="closeDialog" />
    </el-dialog>

    <transition name="fade" appear>
      <settings v-show="isSettingsVisible" />
    </transition>
  </div>
</template>

<script>
import saveState from "vue-save-state"
import { mapGetters, mapMutations, mapActions } from "vuex"
import help from "./store/help"
import mutations from "./store/mutations"
import Settings from "./components/common/Settings.vue"

// Dialog Types
import ChooseSlot from "./components/dialogs/ChooseSlot.vue"
import DeleteSlot from "./components/dialogs/DeleteSlot.vue"
import UploadImage from "./components/dialogs/UploadImage.vue"
import DeleteRow from './components/dialogs/DeleteRow.vue'
import DeleteColumn from './components/dialogs/DeleteColumn.vue'

import moment from "moment"

export default {
  components: {
    Settings,
    ChooseSlot,
    DeleteSlot,
    UploadImage,
    DeleteRow,
    DeleteColumn
  },
  name: "app",
  data() {
    return {
      hasImportData: false,
      dialogFormVisible: false,
      exportData: {},
      showingCourses: false,
      newCourseName: '',
      currentCourse: null
    }
  },
  created() {
    const self = this

    if(self.getCurrentCourse == null) {
      self.$store.dispatch('addSavedState')
      .then(current => {
        self.$store.dispatch('setCurrentCourse', current)
        self.currentCourse = current
      })
    }

    else {
      self.currentCourse = self.getCurrentCourse
    }
  },
  methods: {
    ...mapMutations(["addWeek", "sliceWeek", "updateWeeks", "updateInfo"]),
    ...mapActions(["updateWeek"]),
    addNewCourse(from) {
      const self = this
      if(from === 'current') {

        self.$store.dispatch('setSavedState', self.getCurrentCourse)
        .then(() => {
          self.$store.dispatch('setInfoField', {
            field: 'title',
            value: self.newCourseName
          })
          setTimeout(() => {
            self.$store.dispatch('addSavedState')
            .then(current => {
              self.$store.dispatch('setCurrentCourse', current)
              self.currentCourse = current
              self.newCourseName = ''
            })
          }, 500)
        })
      }
    },
    chooseCourse() {
      const self = this
      self.$store.dispatch('setSavedState', self.getCurrentCourse)
      .then(() => {
        self.$store.dispatch('chooseSavedState', self.currentCourse)
        self.$store.dispatch('setCurrentCourse', self.currentCourse)
        self.showingCourses = false
      })
    },
    getSaveStateConfig() {
      return {
        cacheKey: "App"
      }
    },
    closeDialog() {
      this.$store.dispatch("setDialogVisibility", false)
    }
  },
  mixins: [saveState, mutations],
  computed: {
    ...mapGetters([ 'isSettingsVisible', 'getCurrentCourse', 'getSavedStates' ]),
    loading() {
      return this.$store.getters.loading
    },
    helpInfo() {
      let path = this.$route.name
      let body = help[path] || ""
      body = "<h5>" + path + "</h5>" + body
      return { body, exists: help[path] }
    },
    dialogVisible: {
      get: function() {
        return this.$store.getters.isDialogVisible
      },
      set: function(newValue) {
        this.$store.dispatch("setDialogVisibility", newValue)
      }
    },
    dialogData() {
      return this.$store.getters.getDialogData
    }
  },
  mounted() {
    if (this.weeks.length < 1) {
      for (let i = 1; i <= 12; i++) {
        let tempWeek = {}
        tempWeek.title = "Lecture " + i
        tempWeek.secondTitle = "Lecture " + i + " II"
        tempWeek.imgSrc =
          this.$store.state.imageServer + this.$store.state.info.classType.dateType.toLowerCase() + i + ".png"
        tempWeek.date = moment().add((i-1), "w")
        this.$store.dispatch("addWeek", tempWeek)

      }
    }
    if (this.info.students.length < 1) this.$store.dispatch("addStudent")
    if (this.info.profs.length < 1) this.$store.dispatch("addProf")
    if (this.info.tas.length < 1) this.$store.dispatch("addTA")
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

.canvas-code {
  width: 1015px;
  margin: auto;
  margin-bottom: auto;
  align-self: flex-start;
}

.help-bar {
  width: 500px;
}

.export-container {
  height: 80px;
  margin: 10px;
}

.center {
  text-align: center;
}

.nav-text {
  font-size: 25px;
  margin: 25px;
}

.routers {
  margin-bottom: 20px;
}

.nav-button {
  display: inline-block;
}

.bcTrail {
  padding-top: 15px;
}

.bcTrail li {
  list-style: none;
  display: inline-block;
  padding-right: 5px;
  font-size: 13px;
}

.bcTrail li::after {
  content: " / ";
  padding-left: 5px;
}

.bcTrail li a {
  text-decoration: none;
  color: #48576a;
}

.bcTrail li a:hover {
  text-decoration: none;
  color: #39f;
}

.courses {
  overflow: auto;
  max-height: 40vh;

  .course {
    border: 1px solid #CCC;
    padding: 16px;
    margin-bottom: 7px;
    cursor: pointer;

    h3 {
      margin-bottom: 1px;
    }

    small {
      color: #777;
    }

    &.active {
      border-color: #409EFF;
      background-color: #eff5fc;
      cursor: default;

      h3, small {
        color: #409EFF;
      }
    }
  }
}

.add-new {
  margin: 25px 0 7px;

  button {
    margin-top: 12px;
    padding: 12px 25px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
