<template>
  <div class="home-page">
    <container-component cid="home" :defaultRows="syllabusLayout"/>
  </div>

</template>

<script>
import ContainerComponent from './common/ContainerComponent.vue'
import RowTypes from '../util/row-types.js'

export default {
  name: "NewHome",
  data() {
    return {
      defRows: [
        'banner-row',
        'welcome-row',
        'instructor-ta-row',
        'dates-times-row',
        'list-row',
      ],
      // defRowsNew: [
      //   'homeWelcome',
      //   'homeInstructors',
      // ],
      defRowsStringLayout: [
        'homeWelcome',
        'homeWelcome',
        'homeInstructors',
        ["home-sidebar"],
        [['image-slot'],['image-slot']]
      ],
      syllabusLayout: [
        [['banner-slot']],
        'homeInstructors',
        'dates-times-row',
        [['title-slot']],
        [['content-slot']],
        [['title-slot']],
        [['content-slot']],
        'list-row'
      ],
      studentLayout: [
        [['banner-slot']],
        [['image-slot'], ['content-slot']],
      ],
      zoomLayout: [
        [['banner-slot']],
        'list-row',
        [['title-slot']],
        [['content-slot']],
      ]
    }
  },
  components: {
    ContainerComponent
  },
  mixins: [RowTypes]
}
</script>

<style scoped lang="scss">

</style>
