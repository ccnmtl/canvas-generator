<template>
  <div class="home-page">
    <container-component cid="home" :defaultRows="homeLayout"/>
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
        'date-time-row',
        'list-row',
      ],

      defRowsStringLayout: [
        'home-welcome',
        'home-welcome',
        'home-instructors',
        ["home-sidebar"],
        [['image-slot'],['image-slot']]
      ],
      homeLayout: [
        'home-banner-row',
        [[{
          type: 'image-slot',
          width: 6
          }], 'home-sidebar'],
        'home-instructors-row',
        'date-time-row',
      ],
      syllabusLayout: [
        'banner-row',
        'list-row',
        'date-time-row',
      ],
      studentListLayout: [


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
