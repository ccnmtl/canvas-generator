<template>
  <div id="app">

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-large">
              <h1>IMPORT</h1>
              <p>If you have previously saved an export file from this version of Coursebuilder you can use the input below to import all of the data into this
              session. Warning! This will overwrite all information you have currently entered.</p>
              <h4>Select a ".json" file from a previous data export</h4>

              <form>
                <button class="uk-button uk-button-default" v-if="hasImportData" @click.prevent="performImport">
                  File read successfully! Click here to confirm import.
                </button>
                <div class="uk-margin" uk-margin>
                   <input style="display:inline-block;" class="uk-padding" type="file" accept=".json" name="import-file" @change="onImportFileChange" />
                   <!-- <input style="display:inline-block;" class="uk-padding" type="file" name="import-file2" @change="onImportFileChange2" /> -->
                   <br> <br>
                </div>
              </form>
            </div>
        </div>
        <div>
            <div class="uk-background-secondary uk-padding uk-light uk-height-large">
              <h1>EXPORT</h1>
              <p>If you have completed your class or want to save the data you have previously submitted, click the export button to
               save a ".json" file that you can import at a later date (using the import section to the left).</p>
               <br> <br> <br>
              <button class="uk-button-large uk-button-default" type="button" name="button" @click="exportJSON">Export</button>
              <!-- <button class="uk-button-large uk-button-default" type="button" name="button" @click="testChildren">Test</button> -->
              <button class="uk-button-large uk-button-default" type="button" name="button" @click="exportIMSCC">IMSCC</button>

            </div>
        </div>
        <home-view v-show="false" ref="home"></home-view>
        <syllabus-view v-show="false" ref="syllabus"></syllabus-view>

    </div>

  <!-- <div class="uk-child-width-1-1@s uk-light" uk-grid>
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
  </div> -->

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
import homeView from './render/home-view'
import syllabusView from './render/syllabusView'

import mutations from '../store/mutations'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'

export default {
  name: 'Export',
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
  components: {homeView, syllabusView},
  mixins: [mutations],
  mounted () {
  },
  methods: {
    // openFullScreen() {
    //     this.fullscreenLoading = true;
    //     setTimeout(() => {
    //       this.fullscreenLoading = false;
    //     }, 2000);
    // },
    testChildren(){
      this.updateProp('url', this.parseUrl(this.info.url))
      setTimeout( () => {
        let code = this.$refs.home.returnCode()
        console.log(code)}, 50)
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
    onImportFileChange2 (changeEvent) {
      let homeHeading = `
      <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Home</title>
        <meta name="identifier" content="i95bef606c8b4f001957aa6848c66310f" />
        <meta name="editing_roles" content="teachers" />
        <meta name="workflow_state" content="active" />
        <meta name="front_page" content="true" />
      </head>
      <body>`

      let homeFooter = '</body> </html>'

      this.updateProp('url', this.parseUrl(this.info.url))

      let files = changeEvent.target.files
      JSZip.loadAsync(files[0]).then((zip) => {
        console.log(zip)
        zip.file("wiki_content/home.html", homeHeading + this.$refs.home.returnCode() + homeFooter);
        zip.generateAsync({type:"blob"})
        .then((blob) => {
          saveFile({
            name: this.info.title + '_export.imscc',
            data: blob
          })
        });
        // zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
        // });
      })

    },
    exportIMSCC () {
      let heading = {
        home:
        `
        <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>Home</title>
          <meta name="identifier" content="i95bef606c8b4f001957aa6848c66310f" />
          <meta name="editing_roles" content="teachers" />
          <meta name="workflow_state" content="active" />
          <meta name="front_page" content="true" />
        </head>
        <body>`,
        syllabus:
        `<html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Syllabus</title>
        </head>
        <body>`
      }

      let footer = '</body> </html>'

      this.updateProp('url', this.parseUrl(this.info.url))

      JSZipUtils.getBinaryContent('static/files/weekly-template.imscc', (err, data) => {
          if(err) {
              throw err; // or handle err
          }

          JSZip.loadAsync(data).then((zip) => {
            console.log(zip)
            zip.file("wiki_content/home.html", heading.home + this.$refs.home.returnCode() + footer)
            zip.file("course_settings/syllabus.html", heading.syllabus + this.$refs.syllabus.returnCode() + footer);
            zip.generateAsync({type:"blob"})
            .then((blob) => {
              saveFile({
                name: this.info.title + '_export.imscc',
                data: blob
              })
            });
          })
      });


    },
    performImport () {
      this.$store.commit('updateInfo', this.importData.store.info)
      this.$store.commit('updateTheme', this.importData.store.theme.theme)
      this.$store.commit('updateWeeks', this.importData.store.weeks)
      this.$router.push({path: '/home'});
    },
    exportJSON () {
      this.exportData = {}
      // EventBus.$emit('export-data')
      this.exportDataIfPossible()
    },
    exportDataIfPossible () {
      console.log("here")
      // only export if all data to arrived
      // let valid = this.exportData.home && this.exportData.weekly && this.exportData.weeklyList && this.exportData.syllabus
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
      console.log ('exporting..')
      setTimeout( () => {
        saveFile({
          name: this.$store.state.info.title + " " + dateTime + '.json',
          data: JSON.stringify(this.exportData)
        })
      }, waitTime)
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
