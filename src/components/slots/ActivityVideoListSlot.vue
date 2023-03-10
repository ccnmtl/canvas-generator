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
          <span class="STV1_Welcome" @dblclick="setEditing('title1')" v-if="editing !== 'title1'" > VIDEO: {{video.title}} </span>
          <span data-hidden v-else>
            <input ref="title1" @blur="finishEditing('title')" v-model="data[video.id].title" />
          </span>
          <br>
          <div v-html="video.description" v-if="editing !== 'description1'" @dblclick="setEditing('description1')" />
          <div data-hidden v-else>
          <quill-editor ref="description1"
                        v-model="data[video.id].description"
                        :config="editorOption" />
          <button class="btn btn-success" @click="finishEditing('description', video.id)">
            Save changes
          </button>
          </div>
        </div>
      </div>
    </div>



    <div v-if="getInfo.isBlended" >
      <div v-if="video.header" title="Video Header Image" class="STV1_SlimBanner Banner_Engineering_Slim">
              <p>{{video.header}}</p>
     </div>
     <br>
     <div class="grid-row top-xs">
      <div class="col-xs-6">
        <div class="styleguide-section__grid-demo-element">
          <video-slot
          :slotData="{}"
          :slotItem="{getter: {videoSrc: getWeekItemPropGetter('source', 'videos', video.id)}}"/>
        </div>
      </div>

      <div class="col-xs-6">
        <blockquote :style="{borderLeft: '4px solid' + primary}" style="min-height: 300px; font-weight: normal; font-size: 16px; font-style: inherit;">
        <div class="styleguide-section__grid-demo-element">
          <h3 style="font-size:16px; padding: 12px; color: #FFFFFF; background: #006EAD;" 
          @dblclick="setEditing(video.id + 'title')" v-if="editing !== video.id + 'title'" >{{video.title}}</h3>
          <span data-hidden v-else>
            <input ref="title" @blur="finishEditing('title', video.id)" v-model='data[video.id].title' />
          </span>
          <br>
          <div v-html="video.description" v-if="editing !== video.id + 'description'" @dblclick="setEditing(video.id +'description')" />
          <div data-hidden v-else>
          <quill-editor ref="description"
                        :value="video.description"
                        v-model="data[video.id].description"
                        :config="editorOption" />
          <button style="margin-top: 12px" class="btn btn-success" @click="finishEditing('description', video.id)">
            Save changes
          </button>
          <button class="btn" style="margin-top: 12px" @click="removeTimecode(video.id)">
            Remove Timecode
          </button>
          <button class="btn btn-danger" style="margin-top: 12px" @click="summarizeGPT(video.id)">
            Summarize
          </button>
          <button class="btn btn-danger" style="margin-top: 12px" @click="summarizeGPTVideo(video.id)">
            Summarize From Video
          </button>
          </div>
        </div>
        </blockquote>
      </div>
     </div>
     <div v-if="video.quiz" class="item-group-condensed">
        <ul id="cond_group_1" class="ig-list">
          <li>
            <activity-item-slot
            :slotData="{title: video.title + ' Quiz', type: 'quiz', link: video.quiz, due: 'hidden'}"
            :slotItem="{}"/>
          </li>
        </ul>
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
import ActivityItemSlot from './ActivityItemSlot'
import { quillEditor } from "vue-quill-editor"
import axios from 'axios'


import { mapActions, mapGetters } from 'vuex'

const toolbarOptions = [
  ["bold", "italic", "underline"],
  ["blockquote", { list: "ordered" }, { list: "bullet" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }, "clean"],
  ["link"]
]


export default {
  name: "ActivityVideoListSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  components: {
    VideoSlot, TitleSlot, ContentSlot, quillEditor, ActivityItemSlot
  },
  data() {
    return {
      editing: null,
      data: {
      },
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      },
      primary: this.$store.getters.getTheme.primary,
      editableProps: ['weekID', 'type']
    }
  },
  computed: {
    ...mapGetters(['getWeekPropByID', 'getWeekItemPropGetter','getInfo','getWeekItemPropByID']),
    itemList: function(){
        let videos = this.getWeekPropByID('videos', this.data.weekID).get
        videos.forEach( video => {
          this.data[video.id] = video
        })
        return videos
      }
  },
  watch: {
  },
  methods: {
    finishEditing(field, id) {
        this.$store.dispatch("updateSlotDataWithSetter", {
          setter: this.getWeekItemPropByID(field, 'videos', id).set,
          data: this.data[id][field]
        })
        this.editing = null

    },
    removeTimecode(videoID){
    this.data[videoID].description = this.data[videoID].description.replaceAll(/<[^>]*>/g, "").replaceAll(/\d{1,2}:\d{2}/g, " ").trim()
  },
  async summarizeGPT(videoID){
    // make post call to https://cb-openai-proxy.netlify.app/openai with body {text: this.data[videoID].description}
    let promptText = this.data[videoID].description.replaceAll(/<[^>]*>/g, "").replaceAll(/\d{1,2}:\d{2}/g, " ").trim()
    console.log('prompt', promptText)

    const request = new Request(
        "https://cb-openai-proxy.netlify.app/openai",
        {
          method: "POST",
          mode: "cors",
          cache: "default",
          body: JSON.stringify({prompt: promptText})
        }
      );
      const res = await fetch(request);
      const data = await res.json();
      this.data[videoID].description = data.completion.content

  },
  async summarizeGPTVideo(videoID){
    let youtubeID = this.data[videoID].source.split('/')[4]
    console.log('youtubeID', youtubeID)

    const response  = await fetch(`https://cb-youtube-captions.netlify.app/captions?videoId=${youtubeID}}`)
    console.log(response)
    let res = await response.json()
    console.log(res)
    let promptText = res.transcript.substring(0, 2000)
    console.log('prompt: ', promptText)
    this.data[videoID].description = await summarize(promptText)

    async function summarize(promptItem) {
      console.log('summarizing...')
      const request = new Request(
        "https://cb-openai-proxy.netlify.app/openai",
        {
          method: "POST",
          mode: "cors",
          cache: "default",
          body: JSON.stringify({prompt: promptItem})
        }
      );
      const res = await fetch(request);
      const data = await res.json();
      console.log(data)
      return data.completion.content
    }
  }

  }
}
</script>

<style scoped lang="scss">

.content-slot {
  padding: 12px;
  color: #333;
}

button {
  margin-right: 7px;
}

</style>
