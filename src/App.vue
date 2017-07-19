<template>
  <div id="app">
    <a href="#offcanvas-slide" class="uk-button uk-button-default noBorder" uk-toggle><span uk-icon="icon: table"></span> &nbsp;Menu</a>

    <!-- <a href="#offcanvas-slide" uk-toggle>Open</a> -->

    <div id="offcanvas-slide" uk-offcanvas>
        <div class="uk-offcanvas-bar uk-background">
    		<ul class="uk-nav uk-nav-default">
    			<li class="uk-nav-header">TEMPLATES</li>
    			<li><router-link class="router" to="/home">Home Page Template</router-link></li>
          <li><router-link class="router" to="/weekly">Weekly Activity Page Template</router-link></li>
          <li><router-link class="router" to="/weeklylist">Weekly List Page Template</router-link></li>
          <li><router-link class="router" to="/export">Export/Import Data</router-link></li>
    			<li class="uk-nav-divider uk-margin-medium-top uk-margin-medium-bottom"></li>
    			<li><router-link to="/">Code Generator Home</router-link></li>
    			<li><a href="#">Canvas Website</a></li>
    			<li class="uk-nav-divider uk-margin-medium-top uk-margin-medium-bottom"></li>
    		</ul>
       		<button class="uk-button uk-button-primary uk-margin-large-top">download the guide</button>
        </div>
    </div>

    <div class="center routers">
      <router-link class="router" to="/home">Home Page Template </router-link>
      <router-link class="router" to="/weekly">Weekly Activity Template</router-link>
      <router-link class="router" to="/weeklylist">Weekly List Template</router-link>
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
