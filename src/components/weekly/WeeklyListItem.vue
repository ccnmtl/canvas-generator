<template lang="html">
  <div class="content-box">
  <div class="grid-row top-xs">
  <div class="col-xs-4">
  <div class="styleguide-section__grid-demo-element"><a :title="'Week ' + index" :href='url + "pages/week-" + index' :data-api-endpoint='url + "pages/week-" + index' data-api-returntype="Page">
    <img class="weeklyIconImg" :src="data.imgSrc" alt=""  /> </a></div>
  </div>
  <div class="col-xs-8">
  <div class="styleguide-section__grid-demo-element">
  <a :title="'Week ' + index" :href='url + "pages/week-" + index' :data-api-endpoint='url + "pages/week-" + index' data-api-returntype="Page">
  <div class="welcome">Week {{index}}: {{data.title}} </div>
  </a>
  <p>{{data.description}}</p>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import store from '../../store'

export default {
  data(){
    return{
      url: store.courseUrl
    }
  },
  props: ['data', 'index']
}
</script>

<style lang="css">
</style>
