<template>
  <div :id="sid" class="embed-container">
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
      let link = this.data.videoSrc
      let parts = link.split("/")
      if (parts[2].includes("vimeo.com") && !parts[2].includes("player.vimeo.com")) {
        output = "https://player.vimeo.com/video/" + parts[3]
      } else if (parts[2].includes("youtube")) {
        let split = link.split("=")
        output = "https://www.youtube.com/embed/" + split[1]
      } else if (parts[2].includes("panopto")) {
        let split = link.split("=")
        let root = link.split('Pages/')[0]
        output = root + 'Pages/Embed.aspx?id='  + split[1] + '&showbrand=false'
      } else {
        output = link
      }
      return output
    }
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

</style>
