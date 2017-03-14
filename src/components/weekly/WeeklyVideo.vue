<template lang="html">
  <transition name="fade">
  <div class="content-box">
  <div class="grid-row top-xs">
  <div class="col-xs-4">
  <div class="styleguide-section__grid-demo-element">
  <div class="embed-container"><iframe :src="data.source" width="300" height="150" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></div>
  </div>
  </div>
  <div class="col-xs-8">
  <div class="styleguide-section__grid-demo-element">
  <div class="welcome">VIDEO: {{data.title}}</div>
  <p>{{data.description}}</p>
  </div>
  </div>
  </div>
  </div>
  </transition>
</template>

<script>
import store from '../../store'

export default {
  data() {
    return {
      url: store.courseUrl
    }
  },
  props: ['data', 'index']
}
</script>

<style lang="css">
</style>
