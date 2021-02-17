<template>
  <div class="activity-page">
    <el-select :value="getSelectedWeekID" @input="setStateField({field: 'selectedWeekID', value: $event})" 
    placeholder="Select" style="width: 150px; margin-left: 12vw; margin-right:12vw; margin-bottom: 15px;" 
    class="input-element">
    <el-option
      v-for="(week, index) in weeks"
      :label="info.classType.dateType + ' ' + (index + 1)"
      :value="week.id" :key="week.id">
    </el-option>
    </el-select>
    <container-component cid="activity" :defaultRows="defRows"/>
  </div>

</template>

<script>
import ContainerComponent from './common/ContainerComponent.vue'
import mutations from "../store/mutations"
import RowTypes from '../util/row-types.js'

export default {
  name: "NewActivity",
  data() {
    return {
      defRows: [
        'banner-row',
        ['syllabus-component'],
        [['activity-video-list-slot']],
        [['activity-item-list-slot']],
      ],
    }
  },
  components: {
    ContainerComponent
  },
  mixins: [RowTypes, mutations]
}
</script>

<style scoped lang="scss">

</style>
