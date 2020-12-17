<template>
  <div :id="sid" class="col">
      <div :class="['pad-box-mega','STV1_Banner', info.wideBanner ? theme.wide : theme.banner]" style="postition: relative">

        <img v-if="theme.logo" :src="theme.logo" class="logo left" />
        <img v-if="theme.rightLogo" :src="theme.rightLogo" class="logo right" />

        <p>
          <span @dblclick="setEditing('title')" v-if="editing !== 'title'">{{ slotData.title.toUpperCase() }}</span>
          <span v-else>
            <input ref="title" @blur="finishEditing('title')" v-model="data.title" />
          </span>
        </p>
        <p class="STV1_CourseCode">
          <span @dblclick="setEditing('semester')" v-if="editing !== 'semester'">{{ slotData.semester }}</span>
          <span v-else>
            <input ref="semester" @blur="finishEditing('semester')" v-model="data.semester" />
          </span>
        </p>
      </div>
  </div>
</template>

<script>
import mutations from "../../store/mutations"

export default {
  name: "BannerSlot",
  props: [ "sid", "slotData" ],
  data() {
    return {
      editing: null,
      data: this.slotData
    }
  },
  mixins: [mutations],
  methods: {
    setEditing(field) {
      this.editing = field
      setTimeout(() => {
        this.$refs[field].focus()
      }, 200)
    },
    finishEditing(field) {
      this.$store.dispatch("updateSlotData", { sid: this.sid, data: this.data })
      this.editing = null
    }
  }
}
</script>

<style scoped lang="scss">

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
