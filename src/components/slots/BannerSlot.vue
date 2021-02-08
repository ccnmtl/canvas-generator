<template>
  <div :id="sid" class="col-xs-12">
      <div v-if="useWideBanner" :class="['pad-box-mega','STV1_Banner', data.wideBanner ? theme.wide : theme.banner]" style="postition: relative">

        <img v-if="theme.logo" :src="theme.logo" style="margin-top: -10px; margin-left: 10px" />
        <img v-if="theme.rightLogo" :src="theme.rightLogo" style="float: right; height: 100px; margin-top: 10px;" />

        <p>
          <span @dblclick="setEditing('title')" v-if="editing !== 'title'">{{ data.title.toUpperCase() }}</span>
          <span data-hidden v-else>
            <input ref="title" @blur="finishEditing('title')" v-model="data.title" />
          </span>
        </p>
        <p class="STV1_CourseCode">
          <span @dblclick="setEditing('semester')" v-if="editing !== 'semester'">{{ data.semester }}</span>
          <span data-hidden v-else>
            <input ref="semester" @blur="finishEditing('semester')" v-model="data.semester" />
          </span>
        </p>
      </div>

      <div v-else >
        <div :class="['STV1_SlimBanner', theme.slim]" style="postition: relative">
         <p>
           <span @dblclick="setEditing('title')" v-if="editing !== 'title'">{{ data.title.toUpperCase() }}</span>
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
    getterData: function () {
      const self = this
      if(!this.slotItem.getter) return null
      if(typeof this.slotItem.getter !== 'string') {
        const res = {}
        const getters = this.asArray(this.slotItem.getter)
        getters.forEach(getter => {
          res[getter[0]] = self.$store.getters.getFromGetter(getter[1])
        })
        return res
      }
      else return this.$store.getters.getFromGetter(this.slotItem.getter)
    }
  },
  watch: {
    info: {
      handler(val) {
        const self = this
        if (val !== null) {
          if(!this.data) {
            this.data = {}
          }

          if(typeof this.slotItem.getter === 'string') Vue.set(this, 'data', val ? val : '')
          else {
            this.asArray(val).forEach(getter => {
              Vue.set(self.data, getter[0], getter[1] ? getter[1] : '')
            })
          }
        }

      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    asArray(obj) {
      return Object.keys(obj).map((key) => [key, obj[key]])
    },
    setEditing(field) {
      this.editing = field

      setTimeout(() => {
        this.$refs[field].focus()
      }, 200)
    },
    finishEditing(field) {
      if(this.data[field]) {
        this.$store.dispatch("updateSpecificInfo", { key: field, value: this.data[field] })
        this.editing = null
      }
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
