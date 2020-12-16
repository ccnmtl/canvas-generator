<template>
  <div :id="sid" class="col">
      <div :class="['pad-box-mega','STV1_Banner', info.wideBanner ? theme.wide : theme.banner]" style="postition: relative">
        <img  v-if="theme.logo" :src="theme.logo" style="margin-top: -10px; margin-left: 10px" />
        <img  style="float: right; height: 100px; margin-top: 10px;" v-if="theme.rightLogo" :src="theme.rightLogo"/> 
        <div v-if="!theme.logo"> <br> </div>
        <p>{{info.title.toUpperCase()}}</p>
        <p class="STV1_CourseCode">{{info.semester}}</p>
      </div>
  </div>
</template>

<script>
import mutations from "../../store/mutations"

export default {
  name: "BannerSlot",
  data() {
    return {}
  },
  props: ["sid"],
  mixins: [mutations]
}
</script>

<style scoped lang="scss">
</style>
