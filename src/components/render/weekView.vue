<template lang="html">
  <div :id="'week-box'+idx" >
  <div class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
    <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]">
      <p>{{info.title.toUpperCase()}}</p>
    </div>
    <div class="grid-row">
      <div class="col-xs-12 col-lg-12">
        <div class="ic-image-text-combo">
          <div class="ic-image-text-combo__text">
            <div class="pad-box-mini">
              <h3 style="margin-bottom: 5px;">
                <i class="icon-clock"></i> {{info.classType.dateType}} {{idx + 1}}: {{weeks[idx].title}}</h3>
              </div>
              <div class="pad-box-mini border border-b border-t">
                <p v-html="weeks[idx].body"></p>
                <div class="pad-box-mini">
                  <span v-html="weeks[idx].required" >
                  </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- The videos, discussions, and assignments are all built into their own smaller components to keep it more organized
    They are WeeklyDiscussion.vue, WeeklyAssignment.vue, and WeeklyVideo.vue respectively. -->
    <weekly-video  v-for="(video, index) in weeks[idx].videos" :data="video" :index="index+1" :key="video.source"> </weekly-video>

    <div class="item-group-container" style="padding-bottom: 0;" v-if="weeks[idx].assignments.length > 0 || weeks[idx].discussions.length > 0">
      <div class="item-group-condensed">
        <ul id="cond_group_1" class="ig-list">
        <weekly-discussion  v-for="(disc, index) in weeks[idx].discussions" :data="disc" :index="index+1" :key="disc.link"> </weekly-discussion>
        <weekly-assignment  v-for="(assign, index) in weeks[idx].assignments" :data="assign" :index="index+1" :key="assign.link"> </weekly-assignment>
        </ul>
      </div>
    </div>

  </div>
  </div>

</template>

<script>

import mutations from '../../store/mutations'
var moment = require('moment');
import WeeklyVideo from '../weekly/WeeklyVideo'
import WeeklyDiscussion from '../weekly/WeeklyDiscussion'
import WeeklyAssignment from '../weekly/WeeklyAssignment'

export default {
  data() {
    return {
      index: 1,
      editable: false
    }
  },
  computed: {
    currentItem(){
      return this.content[this.index - 1];
    }
  },
  methods: {
    returnCode(){
      console.log('week code..')
      let code = document.getElementById("week-box" + this.idx);
      console.log(code)
      return code.innerHTML.replace(/\bdata-v-\S+\"/ig,"")
    },
    formatDate(date){
      return moment(date).format("MMMM Do")
    },
    newLine(val) {
      if (!val) return "";
      return val.replace(/\r?\n/g, "<br />");
    },

  },
  props: ['idx'],
  mixins: [mutations],
  components: {
    WeeklyVideo,
    WeeklyDiscussion,
    WeeklyAssignment
  },
}
</script>

<style lang="css">


</style>
