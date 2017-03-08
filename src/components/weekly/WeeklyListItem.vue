<template lang="html">
  <div class="content-box">
  <div class="grid-row top-xs">
  <div class="col-xs-4">
  <div class="styleguide-section__grid-demo-element"><a :title="'Week ' + index" href="https://courseworks2.columbia.edu/courses/35006/pages/week-1" data-api-endpoint="https://courseworks2.columbia.edu/api/v1/courses/35006/pages/week-1" data-api-returntype="Page">
    <img class="weeklyIconImg" :src="data.imgSrc" alt=""  /> </a></div>
  </div>
  <div class="col-xs-8">
  <div class="styleguide-section__grid-demo-element">
  <div class="welcome">Week {{index + 1}}: {{data.title}} </div>
  <p>{{data.description}}</p>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props: ['data', 'index']
}
</script>

<style lang="css">
</style>
