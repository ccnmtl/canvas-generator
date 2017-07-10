<template>
  <div id="app">
    <div class="center routers">
      <router-link class="router" to="/">Go to Home</router-link>
      <router-link class="router" to="/weekly">Go to Weekly Activity Page</router-link>
      <router-link class="router" to="/weeklylist">Go to Weekly Activity List</router-link>

    </div>

    <keep-alive>
    <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'app'
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
