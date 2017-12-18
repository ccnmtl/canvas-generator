<template>
  <div id="app">

  <div class="uk-child-width-1-1@s uk-light" uk-grid>
      <div>
          <div class="uk-background-primary uk-height-large uk-panel uk-text-center">
             <p>&nbsp;</p>
             <p>&nbsp;</p>

             <form>
               <h3>Select a ".json" file from a previous data export</h3>
               <button class="uk-button uk-button-default" v-if="hasImportData" @click.prevent="performImport">
                 File read successfully! Click here to confirm import.
               </button>
               <div class="uk-margin" uk-margin>
                  <input style="display:inline-block;" class="uk-padding" type="file" accept=".json" name="import-file" @change="onImportFileChange" />
                  <br> <br>
                  <button class="uk-button-large uk-button-default" type="button" name="button" @click="exportJSON">Export</button>
               </div>
             </form>

          </div>
      </div>
  </div>

  <div class="clearfix"></div>

  <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left uk-margin-medium-top" uk-grid>
      <div class="uk-background-muted uk-padding">
  		<p>Copyright © Columbia University. All rights reserved.</p>
     	</div>
  </div>

  </div>
</template>

<script>
import { EventBus } from '../bus'
import saveFile from '../util/save-file'

export default {
  name: 'app',
  data () {
    return {
      hasImportData: false,
      fullscreenLoading: false,
      exportData: {}
    }
  },
  computed: {
    loading: {
      get () {
        return this.$store.getters.loading
      },
      set (payload) {
        this.$store.commit('updateLoading', payload)
      }
    },
  },
  mounted () {
    // casually go to each route for a minimal amount of time on load to ensure export works
    // paths is list of all routes with the current route as the last item, so we cycle to where we are

    // const loading = this.$loading({
    //       lock: true,
    //       text: 'Loading',
    //       spinner: 'el-icon-loading',
    //       background: 'rgba(0, 0, 0, 0.7)'
    // });

    this.loading = true;

    setTimeout(() => {
      let initialPath = this.$route.path
      let paths = ['/home', '/weekly', '/weeklylist','/syllabus'].filter(p => p !== initialPath).concat([initialPath])
      paths.forEach((path, i) => {
        setTimeout(() => this.$router.replace(path), i * 30)
      })
    }, 500);



    setTimeout(() => {
      this.loading = false //loading.close();
    }, 1500);

    EventBus.$on('home-data', data => {
      this.exportData.home = data
      console.log('got home')
      this.exportDataIfPossible()
    })
    EventBus.$on('weekly-data', data => {
      this.exportData.weekly = data
      console.log('got weekly')
      this.exportDataIfPossible()
    })
    EventBus.$on('list-data', data => {
      this.exportData.weeklyList = data
      console.log('got list')
      this.exportDataIfPossible()
    })
    EventBus.$on('syllabus-data', data => {
      this.exportData.syllabus = data
      console.log('got syllabus')
      this.exportDataIfPossible()
    })
  },
  methods: {
    openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
    },
    onImportFileChange (changeEvent) {
      let file = changeEvent.target.files[0]
      if (!file) {
        return
      }

      let reader = new FileReader()
      reader.onload = loadEvent => {
        this.importData = JSON.parse(loadEvent.target.result)
        this.hasImportData = !!this.importData
      }

      reader.readAsText(file)
    },
    performImport () {
      this.$store.commit('updateInfo', this.importData.store.info)
      this.$store.commit('updateTheme', this.importData.store.theme)
      EventBus.$emit('import-data', this.importData)
      this.$router.push({name: 'Home'});
    },
    exportJSON () {
      this.exportData = {}
      EventBus.$emit('export-data')
    },
    exportDataIfPossible () {
      // only export if all data to arrived
      let valid = this.exportData.home && this.exportData.weekly && this.exportData.weeklyList && this.exportData.syllabus
      let waitTime = 0;

      // if rough export is selected wait a short amount of time for all data to come in
      // currently not used as all routes are cycled when app is mounted

      // if (document.getElementById("rough-export").checked){
      //   console.log('waiting..')
      //   valid = true;
      //   waitTime = 300;
      // }

      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + "-" + today.getMinutes();
      let dateTime = date+' '+time;

      // get store
      this.exportData.store = this.$store.getters.getStore

      // save file as json
      if (valid) {
        console.log ('exporting..')
        setTimeout( () => {
          saveFile({
            name: dateTime + '-CourseB-Export.json',
            data: JSON.stringify(this.exportData)
          })
        }, waitTime)
      }
    }
  }
}
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

.export-container{
  width: 100%;
  text-align: center;
}

.export-button{
  width: 80px;
  height: 50px;
}

.center{
  text-align: center;
}

</style>
