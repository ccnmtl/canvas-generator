<template>
  <div class="dialog-inner">

    <div class="dialog-content">
      <label>
        <span>Select from URL:</span>
        <input v-model="newVideo" class="form-control" name="video" id="video-link" placeholder="Video URL">
      </label>

      <div class="col-sm-12">
        <label>
          <span>Current Video:</span>
          <iframe @click="doNothing"
                  :src="videoLink"
                  allowfullscreen
                  webkitallowfullscreen
                  mozallowfullscreen
                  ref="iframe"
                  :style="{ width: '100%', height: '24vw' }" />
        </label>
      </div>
    </div>

    <footer>
      <el-button type="primary" @click="saveChoice">Confirm</el-button>
    </footer>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import slotTypes from '../../../util/slot-types.js'
import slotMixin from '../../mixins/slot-mixin.js'

export default {
  props: [
    'dialogData'
  ],
  name: 'VideoSlotData',
  mixins: [slotTypes, slotMixin],
  data() {
    return {
      selectedSlot: 1,
      newVideo: '',
      data: {},
      slotItem: {},
      slotData: {},
    }
  },
  watch: {
    dialogData: {
      handler(val) {
        this.slotItem = val.slotData
        this.slotData = val.slotData.data
      },
      deep: true,
      immediate: true
    }
  },
  computed:{
    ...mapGetters({
      fullSlotTypes: 'getSlotTypes',
      Config: 'getConfig'
    }),
    videoLink() {
      let output
      let link = this.newVideo || this.slotData.videoSrc
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
  methods: {
    saveChoice() {
      this.$store.dispatch('updateSlotData', {
        item: this.dialogData.slotData,
        data: {
          videoSrc: this.newVideo,
          }
        })
      this.$store.dispatch("setDialogVisibility", false)
    },
    doNothing(e) {
      e.preventDefault();
      return false;
    },
  }
}
</script>

<style lang="scss" scoped>

.dialog-content {
  text-align: center;
  padding: 0 12px;
  margin-bottom: 18px;

  label {
    width: 100%;

    input, iframe {
      margin-bottom: 25px;
    }

    span {
      display: block;
      width: 100%;
      margin: 0 0 7px;
    }
  }
}

footer {
  margin: 30px 0 -10px;
  text-align: right;
}

</style>
