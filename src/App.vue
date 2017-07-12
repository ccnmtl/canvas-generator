<template>
  <div id="app">
    <div class="center routers">
      <router-link class="router" to="/">Go to Home</router-link>
      <router-link class="router" to="/weekly">Go to Weekly Activity Page</router-link>
      <router-link class="router" to="/weeklylist">Go to Weekly Activity List</router-link>

    </div>

    <div class="export-container">
      <form v-on:submit.prevent="onFormSubmit()">
        <input name="import" id="import-file" type="file">
        <input type="submit" value="Submit!">
      </form>
      <button type="button" name="button" @click="exportJSON()"> Export</button>
    </div>

    <keep-alive>
    <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import { EventBus } from './bus'

export default {
  name: 'app',
  methods: {
    onFormSubmit(){
      let importData = document.querySelector('#import-file')
      let parsedData = JSON.parse(importData.files[0])
      EventBus.$emit('import-data', parsedData)
    },
    exportJSON(){
      EventBus.$emit('export-data')

      // wait for home, weekly, and weekly list events through async?

      // assmble each part into one larger object with the keys home: home, weekly: weekly, etc

      // export to JSON and save as file
      
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
