<template>
  <div :id="sid" class="embed-container" style="position:relative">
      <div data-hidden v-if="videoLink.includes('external_tools')" class="embed-cover">
        <p class="warning-text">THIS EMBED WILL WORK ON CANVAS. DO NOT MODIFY.</p>
      </div>
      <iframe @click="doNothing" :src="videoLink" :width="data.width || 500"
      :height="data.height || 281" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen"
      mozallowfullscreen="mozallowfullscreen"></iframe>
  </div>
</template>

<script>

import slotMixin from '../mixins/slot-mixin.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "VideoSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  data() {
    return {
      editing: null,
      data: {},
      editableProps: ['videoSrc', 'width', 'height']
    }
  },
  computed: {
    videoLink() {
      let output
      let link = this.slotData.videoSrc || this.data.videoSrc
      let parts = link.split("/")
      let referenceConditions = ['localhost', 'coursebuilder']
      if (parts[2].includes("vimeo.com") && !parts[2].includes("player.vimeo.com")) {
        output = "https://player.vimeo.com/video/" + parts[3]
      } else if (parts[2].includes("youtube")) {
        let split = link.split("=")
        output = "https://www.youtube.com/embed/" + split[1]
      } else if (parts[2].includes("panopto")) {
        let split = link.split("=")
        let root = link.split('Pages/')[0]
        output = root + 'Pages/Embed.aspx?id='  + split[1] + '&showbrand=false'
      } 
      else if (referenceConditions.some(el => parts[2].includes(el))) {
        let source = this.info.url
        if (this.info.url.length < 5) source = this.info.url
        output = 'http://www.placeholderurl.org' + link.replace(/[^$]*/i,'').replace('$CANVAS_COURSE_REFERENCE$','')
        console.log(output)
      }
      else {
        output = link
      }
      return output
    },
  },
  watch: {
  },
  methods: {
    doNothing(e) {
      e.preventDefault();
      return false;
    },
  }
}
</script>

<style scoped lang="scss">

button {
  margin-top: 16px;
  margin-right: 7px;
}
.embed-cover{
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: black;
    z-index: 100;
}

.warning-text{
  border: 5px solid;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background: white;
}


</style>
