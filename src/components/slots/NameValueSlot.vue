<template>
  <div :id="sid" class="col name-value-slot">
    <span :style="data.nameStyle">{{ data.name}}:</span>
    <span v-for="n in data.breakSize" :key="n"> <br> </span>
    <span v-if="data.type == 'date'">
      <span @dblclick="setEditing('value')" v-if="editing !== 'value'" > {{ formatWeek(data.value) }} </span>
      <span data-hidden v-else>
        <el-date-picker
          v-model="data.value"
          @blur="finishEditing('value')"
          type="date"
          placeholder="Pick date">
        </el-date-picker>
      </span>
    </span>
    <span v-else>
      <span @dblclick="setEditing('value')" v-if="editing !== 'value'" > {{ data.value }} </span>
      <span data-hidden v-else>
        <input ref="value" @blur="finishEditing('value')" v-model="data.value" />
      </span>
    </span>
  </div>
</template>

<script>

import Vue from 'vue'
import moment from 'moment'

export default {
  name: "NameValueSlot",
  props: [ "sid", "slotData", "slotItem" ],
  data() {
    return {
      editing: null,
      data: {
      },
    }
  },
  computed: {
    getterData: function () {
      if(!this.slotItem.getter) return null
      return this.$store.getters.getFromGetter(this.slotItem.getter)
    }
  },
  watch: {
    slotData: {
      handler(newVal) {
        if(!this.slotItem.getter || !this.slotItem.getter.name)
          this.data.name = newVal.name
        if(!this.slotItem.getter || !this.slotItem.getter.type)
          this.data.type = newVal.type
      },
      immediate: true
    },
    getterData: {
      handler(newVal) {
        if (newVal !== null) {
          if(!this.data) {
            this.data = {}
          }

          Vue.set(this.data, 'value', newVal ? newVal : '')
        }
      },
      immediate: true
    }
  },
  methods: {
    deleteSlot() {
      this.$store.dispatch("setDialogData", {
        title: 'Are you sure you want to delete this slot?',
        type: 'delete-slot',
        sid: this.sid
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    setEditing(field) {
      this.editing = field

      setTimeout(() => {
        this.$refs[field].focus()
      }, 200)
    },
    finishEditing(field) {
      if(this.data[field]) {
        this.$store.dispatch("updateSpecificInfo", { key: this.slotItem.getter.split(".")[1], value: this.data[field] })
        this.editing = null
      }
    },
    formatWeek(date) {
      return moment(date).format("dddd, MMMM Do")
    },
    isDate(value){
      return moment.isMoment(value)
    }
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  padding: 12px;
  color: #333;
}

button {
  margin-top: 16px;
  margin-right: 7px;
}

</style>
