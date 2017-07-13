<template>
  <div id="app">

    <div class="export-container">
      <h3>Select a ".json" file from a previous data export</h3>
      <input style="display:inline-block; " type="file" accept=".json" name="import-file" @change="onImportFileChange" />
      <br>
      <button v-if="hasImportData" @click="performImport">
        File read successfully! Click here to confirm import.
      </button>
      <br> <br>
      <button class="export-button" type="button" name="button" @click="exportJSON">Export</button>

      <!-- Previously used for rough export option -->
       <!-- <input style="display:inline;" type="checkbox" id="rough-export"> <p style="display:inline;">Rough Export</p> -->

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
      exportData: {}
    }
  },
  mounted () {
    // casually go to each route for a minimal amount of time on load to ensure export works
    // paths is list of all routes with the current route as the last item, so we cycle to where we are
    let initialPath = this.$route.path
    let paths = ['/', '/weekly', '/weeklylist'].filter(p => p !== initialPath).concat([initialPath])
    paths.forEach((path, i) => {
      setTimeout(() => this.$router.replace(path), i * 30)
    })

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
  },
  methods: {
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
      EventBus.$emit('import-data', this.importData)
    },
    exportJSON () {
      this.exportData = {}
      EventBus.$emit('export-data')
    },
    exportDataIfPossible () {
      // only export if all data to arrived
      let valid = this.exportData.home && this.exportData.weekly && this.exportData.weeklyList

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

      // save file as json
      if (valid) {
        console.log ('exporting..')
        setTimeout( () => {
          saveFile({
            name: dateTime + '_export.json',
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
