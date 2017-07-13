<template>
  <div id="app">
    <div class="center routers">
      <router-link class="router" to="/">Go to Home</router-link>
      <router-link class="router" to="/weekly">Go to Weekly Activity Page</router-link>
      <router-link class="router" to="/weeklylist">Go to Weekly Activity List</router-link>
      <router-link class="router" to="/export">Export/Import Data</router-link>

    </div>

    <!-- If Export Should be Top Level Insert Code Here -->

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import { EventBus } from './bus'

export default {
  name: 'app',
  data () {
    return {
      hasImportData: false,
      exportData: {}
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
  height: 80px;
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
