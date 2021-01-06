<template>
  <div :id="sid" class="col">
      <div :class="['pad-box-mega','STV1_Banner', data.wideBanner ? theme.wide : theme.banner]" style="postition: relative">

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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "BannerSlot",
  props: [ "sid", "slotData", "slotItem" ],
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
    })
  },
  beforeMount() {
    this.data = this.info
  },
  methods: {
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
