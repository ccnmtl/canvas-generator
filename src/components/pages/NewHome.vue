<template>
  <div class="home-page">
    <container-component cid="home" :defaultRows="homeLayout"/>
  </div>

</template>

<script>
import ContainerComponent from '../common/ContainerComponent.vue'
import RowTypes from '../../util/row-types.js'

export default {
  name: "NewHome",
  data() {
    return {
      homeLayout: [
        'home-banner-row',
        [['image-slot'], 'home-sidebar'],
        'home-instructors-row',
        'date-time-row',
      ],
    }
  },
  components: {
    ContainerComponent
  },
  mixins: [RowTypes],
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
