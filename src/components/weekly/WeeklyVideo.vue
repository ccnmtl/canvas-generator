<template lang="html">
  <transition name="fade">
    <div class="content-box">
      <div class="grid-row top-xs">
        <div class="col-xs-4">
          <div class="styleguide-section__grid-demo-element">
            <div class="embed-container">
              <iframe :src="this.videoLink" width="300" height="150" allowfullscreen="allowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe>
            </div>
          </div>
        </div>
        <div class="col-xs-8">
          <div class="styleguide-section__grid-demo-element">
            <div class="STV1_Welcome">VIDEO: {{data.title}}</div>
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
  props: ['data', 'index'],
  computed: {
    videoLink(){
      let output;
      let link = this.data.source;
      let parts = link.split('/');
      if (parts[2].includes('vimeo.com')){
        output = 'https://player.vimeo.com/video/' + parts[3]
      }
      else if (parts[2].includes('youtube')){
        let split = link.split('=')
        output = 'https://www.youtube.com/embed/' + split[1]
      }
      else {
        output = link;
      }
      return output;
    }
  }
}
</script>

<style lang="css">
</style>
