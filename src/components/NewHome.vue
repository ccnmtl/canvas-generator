<template>
  <div class="home-page">
    <container-component cid="home" :defaultRows="defRowsNew"/>
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
        'dates-times-row',
        'list-row'
      ],
      defRowsNew: [
        'homeWelcome',
        'homeWelcome',
        'homeInstructors'
      ]
    }
  },
  components: {
    ContainerComponent
  },
  mixins: []
}
</script>

<style scoped lang="scss">

</style>
