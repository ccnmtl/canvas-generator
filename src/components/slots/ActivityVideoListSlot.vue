<template>
<div>
  <div class="content-box" v-for="video in itemList" :key="video.id">
    <transition name="fade">

    <div v-if="!getInfo.isBlended" class="grid-row top-xs">
      <div class="col-xs-4">
        <div class="styleguide-section__grid-demo-element">
          <video-slot 
          :slotData="{width: 300, height: 150}"
          :slotItem="{getter: {videoSrc: getWeekItemPropGetter('source', 'videos', video.id)}}"/>
        </div>
      </div>
      <div class="col-xs-8">
        <div class="styleguide-section__grid-demo-element">
          <div class="STV1_Welcome">VIDEO: {{video.title}}</div>
          <p>{{video.description}}</p>
        </div>
      </div>
    </div>

    <div v-if="getInfo.isBlended" class="grid-row top-xs">
      <div class="col-xs-6">
        <div class="styleguide-section__grid-demo-element">
          <video-slot 
          :slotData="{}"
          :slotItem="{getter: {videoSrc: getWeekItemPropGetter('source', 'videos', video.id)}}"/>
        </div>
      </div>

      <div class="col-xs-6">
        <blockquote :style="{borderLeft: '4px solid' + primary}" style="height: 300px; font-weight: normal; font-size: 16px; font-style: inherit;">
        <div class="styleguide-section__grid-demo-element">
          <div :style="{background: primary, fontSize: '14px', padding: '12px', color: '#FFFFFF'}" >{{video.title}}</div>
          <p>{{video.description}}</p>
        </div>
        </blockquote>
      </div>
    </div>
  </transition>
</div>
</div>

  
</template>

<script>

import slotMixin from '../mixins/slot-mixin.js'
import VideoSlot from './VideoSlot'
import TitleSlot from './TitleSlot'
import ContentSlot from './ContentSlot'

import { mapActions, mapGetters } from 'vuex'


export default {
  name: "ActivityItemListSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  components: {
    VideoSlot, TitleSlot, ContentSlot
  },  
  data() {
    return {
      editing: null,
      data: {
        
      },
      primary: this.$store.getters.getTheme.primary,
      editableProps: ['weekID', 'type']
    }
  },
  computed: {
    ...mapGetters(['getWeekPropByID', 'getWeekItemPropGetter','getInfo']),
    itemList: function(){
        let videos = this.getWeekPropByID('videos', this.data.weekID).get
        return videos
      }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  padding: 12px;
  color: #333;
}

button {
  margin-top: 16px;
  margin-right: 7px;
}

</style>
