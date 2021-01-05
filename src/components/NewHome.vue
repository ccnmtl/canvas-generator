<template>
  <div class="home-page">
    <container-component cid="home" defaultRows="defRows"/>
  </div>

</template>

<script>
import ContainerComponent from './common/ContainerComponent.vue'

export default {
  name: "NewHome",
  data() {
    return {
      defRows: [
        'banner-row',
        'welcome-row',
        'instructor-ta-row',
        'dates-times-row'
      ]
    }
  },
  components: {
    ContainerComponent
  }
}
</script>

<style scoped lang="scss">

</style>
