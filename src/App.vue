<template>
  <div id="app">
    <div class="center routers">
      <router-link class="router" to="/">Go to Home</router-link>
      <router-link class="router" to="/weekly">Go to Weekly Activity Page</router-link>
      <router-link class="router" to="/weeklylist">Go to Weekly Activity List</router-link>

    </div>

    <div class="export-container">
      <p>Select a ".json" file from a previous data export</p>
      <input type="file" accept=".json" name="import-file" @change="onImportFileChange" />
      <button v-if="hasImportData" @click="performImport">
        File read successfully! Click here to confirm import.
      </button>

      <button type="button" name="button" @click="exportJSON">Export</button>
    </div>

    <keep-alive>
    <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import { EventBus } from './bus'
import saveFile from './util/save-file'

export default {
  name: 'app',
  data () {
    return {
      hasImportData: false
    }
  },
  mounted () {
    this.exportData = {}
    EventBus.$on('export-data', () => {
      this.exportData = {} // refresh exportData and wait for below events to fill it
    })

    EventBus.$on('home-data', data => {
      this.exportData.home = data
      this.exportDataIfPossbile()
    })
    EventBus.$on('weekly-data', data => {
      this.exportData.weekly = data
      this.exportDataIfPossbile()
    })
    EventBus.$on('list-data', data => {
      this.exportData.weeklyList = data
      this.exportDataIfPossbile()
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
      EventBus.$emit('export-data')
    },
    exportDataIfPossible () {
      // export to JSON once all data has arrived
      let valid = this.exportData.home && this.exportData.weekly && this.exportData.weeklyList
      if (valid) {
        saveFile({
          name: 'picker-export.json'
          data: JSON.stringify(this.exportData)
        })
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
  height: 20px;
  margin: 10px;
}

.center{
  text-align: center;
}

.router {
  margin: 30px;
  font-size: 20px;
}

.routers {
  margin-bottom: 20px;
}
</style>
