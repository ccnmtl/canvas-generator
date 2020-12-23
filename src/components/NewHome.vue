<template>
  <div class="home-page">
    <container-component cid="home" />
  </div>

</template>

<script>
import ContainerComponent from './common/ContainerComponent.vue'

export default {
  name: "NewHome",
  data() {
    return {
    }
  },
  components: {
    ContainerComponent
  }
}
</script>

<style scoped lang="scss">

</style>
