<template>
  <div class="dialog-inner">

    <div class="dialog-content">
      <div class="dialog-video" v-for="(video, i) in videos" :key="video.id">
        <h3>
          Video {{ (i + 1) }}
          <a @click="deleteVideo(video.id)">delete</a>
        </h3>
        <div class="row">
          <div class="col-sm-6">
            <label>Title:
              <input class="form-control" @blur="finishEditing('title')" ref="title" v-model="video.title" placeholder="Course Title">
            </label>
          </div>
          <div class="col-sm-6">
            <label>Video URL:
              <input class="form-control" @blur="finishEditing('source')" ref="source" v-model="video.source" placeholder="Video URL">
            </label>
          </div>
        </div>
        <label>Description:
          <textarea class="form-control" @blur="finishEditing('description')" ref="description" v-model="video.description" placeholder="Description"></textarea>
        </label>
        <hr>
      </div>
      <!-- <el-button type="primary" @click="addNew">Add New Video</el-button> -->
    </div>

    <footer>
      <el-button type="secondary" @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="saveChoice">Confirm</el-button>
    </footer>
  </div>
</template>

<script>

import _ from 'lodash'
import { mapGetters } from 'vuex'

import slotTypes from '../../../util/slot-types.js'
import slotMixin from '../../mixins/slot-mixin.js'
import pageMixin from '../../mixins/page-mixin.js'

export default {
  props: [
    'dialogData'
  ],
  name: 'ActivityVideoListSlotData',
  mixins: [slotTypes, slotMixin, pageMixin],
  data() {
    return {
      selectedSlot: 1,
      data: {},
      videos: [],
      slotItem: {},
      slotData: {}
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
      Config: 'getConfig',
      getTheme: 'getTheme',
      getWeekPropByID: 'getWeekPropByID',
      getWeekItemPropGetter: 'getWeekItemPropGetter',
      getInfo: 'getInfo',
      getWeekItemPropByID: 'getWeekItemPropByID'
   }),
    itemList: function(){
      let videos = this.getWeekPropByID('videos', this.data.weekID).get
      return videos
    },
    theme: {
      get() {
        return this.getTheme
      },
      set(payload) {
        this.$store.commit('updateTheme', payload)
      }
    },
  },
  methods: {
    cancel() {
      this.$store.dispatch("setDialogVisibility", false)
    },
    saveChoice() {
      let key = _.findIndex(this.weeks, { id: this.getSelectedWeekID })
      this.updateWeek(key, 'videos', this.videos)
      this.$store.dispatch("setDialogVisibility", false)
    },
    addNew() {
      this.videos.push({})
    },
    deleteVideo(id) {
      let key = _.findIndex(this.videos, { id: id })
      this.videos.splice(key, 1)
    }
  },
  mounted() {
    setTimeout(() => {
      let videos = this.getWeekPropByID('videos', this.data.weekID).get

      videos.forEach(video => {
        this.videos.push(video)
      })
    }, 500)
  },
}
</script>

<style lang="scss" scoped>

.dialog-content {
  text-align: center;
  padding: 0 12px;
  margin-bottom: 18px;
  max-height: calc(52vh - 124px);
  overflow: auto;

  .row {
    margin-right: -12px;
  }

  h3 {
    text-align: left;

    a {
      float: right;
      color: #d64848;
      font-size: 20px;
      margin-top: 4px;
    }
  }

  hr {
    margin-top: 0;
  }

  label {
    width: 100%;
    text-align: left;
    padding-bottom: 16px;

    input, textarea {
      margin-top: 7px;
      font-weight: normal;
    }
  }
}

footer {
  margin: 30px 0 -10px;
  text-align: right;
}

</style>
