<template>
  <div :id="sid"  >
      <div v-if="useWideBanner" :class="['pad-box-mega','STV1_Banner', data.wideBanner ? theme.wide : theme.banner]" style="postition: relative" >

        <img v-if="theme.logo" :src="theme.logo" style="margin-top: -10px; margin-left: 10px; height:40px" @dblclick="openUploadDialog()" />
        <img v-if="theme.rightLogo" :src="theme.rightLogo" style="float: right; height: 100px; margin-top: 10px;" />

        <p>
          <span data-dbclick @dblclick="setEditing('title')" v-if="editing !== 'title'">{{ data.title.toUpperCase() }}</span>
          <span data-hidden v-else>
            <input ref="title" @blur="finishEditing('title')" v-model="data.title" />
          </span>
        </p>
        <p class="STV1_CourseCode">
          <span data-dbclick @dblclick="setEditing('semester')" v-if="editing !== 'semester'">{{ data.semester }}</span>
          <span data-hidden v-else>
            <input ref="semester" @blur="finishEditing('semester')" v-model="data.semester" />
          </span>
        </p>
      </div>

      <div v-else >
        <div :class="['STV1_SlimBanner', theme.slim]" style="postition: relative">
         <p>
           <span data-dbclick @dblclick="setEditing('title')" v-if="editing !== 'title'">{{ data.title.toUpperCase() }}</span>
           <span data-hidden v-else>
             <input ref="title" @blur="finishEditing('title')" v-model="data.title" />
           </span>
         </p>
        </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import slotMixin from '../mixins/slot-mixin.js'


export default {
  name: "BannerSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],
  data() {
    return {
      editing: null,
      data: {}
    }
  },
  computed: {
    ...mapGetters({
      info: 'getInfo',
      theme: 'getTheme'
    }),
    useWideBanner(){
      return this.slotData.useWideBanner
    },
  },
  watch: {
  },
  methods: {
    openUploadDialog(){
    this.$store.dispatch("setDialogData", {
      title: 'Slot Data - Banner',
      type: 'slot-data-banner-slot',
      slotData: this.slotItem
    })
    this.$store.dispatch("setDialogVisibility", true)
    }
  }
}
</script>

<style scoped lang="scss">

.pad-box-mega {
  margin: 0 -10px;
  height: auto;
}

.logo {
  &.left {
    margin: -10px 0 7px 10px;
  }

  &.right {
    float: right;
    height: 100px;
    margin: 10px 0 7px;
  }
}

input {
    font-size: 18px;
    font-weight: 200;
    border: none;
    letter-spacing: -1px;
    color: #F5F5F5;
    margin: 0;
    background: #00000077;
}

</style>
