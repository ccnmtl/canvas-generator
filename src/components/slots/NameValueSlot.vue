<template>
  <div :id="sid" class="col name-value-slot">
    <span :style="data.nameStyle">{{ data.name}}:</span>
    <span v-for="n in data.breakSize" :key="n"> <br> </span>
    <span v-if="data.type == 'date'">
      <span @dblclick="setEditing('value')" v-if="editing !== 'value'" > {{ formatWeek(data.value) }} </span>
      <span data-hidden v-else>
        <el-date-picker
          ref="value"
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
  props: [ "sid", "slotData", "slotItem", "width" ],
  data() {
    return {
      editing: null,
      data: {
      },
      setters: { 
      }
    }
  },
  computed: {
    getterData: function () {
      const self = this
      if(!this.slotItem.getter) return null

      if(typeof this.slotItem.getter !== 'string') {
        const res = {}
        const getters = this.asArray(this.slotItem.getter)

        getters.forEach(getter => {
          let key = getter[0]
          let val = getter[1]

          if (typeof val == 'string') {
            res[key] = self.$store.getters.getFromGetter(val)
            this.setters[key] = val
          }
          else {
            res[key] = val.get
            this.setters[key] = val.set
          }
        console.log(getter)
        })
        return res
      }
      else return this.$store.getters.getFromGetter(this.slotItem.getter)
    }
  },
  watch: {
    slotData: {
      handler(newVal) {
        if(!this.slotItem.getter || !this.slotItem.getter.name)
          this.data.name = newVal.name
        if(!this.slotItem.getter || !this.slotItem.getter.type)
          this.data.type = newVal.type
        if(!this.slotItem.getter || !this.slotItem.getter.value)
          this.data.value = newVal.value
      },
      immediate: true
    },
    getterData: {
      handler(newVal) {
        console.log(newVal)
        const self = this
        if (newVal !== null) {
          if(!this.data) {
            this.data = {}
          }

          if(typeof this.slotItem.getter === 'string') Vue.set(this.data, 'value', newVal ? newVal : '')
          else {
            this.asArray(newVal).forEach(getter => {
              let key = getter[0]
              let val = getter[1]
              Vue.set(self.data, key, val ? val : '')
              if (typeof val !== 'string') Vue.set (self.setters, key, val.set)
            })
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    asArray(obj) {
      return Object.keys(obj).map((key) => [key, obj[key]])
    },
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
        if(typeof this.slotItem.getter === 'string')
          this.$store.dispatch("updateSpecificInfo", { key: this.slotItem.getter.split(".")[1], value: this.data[field] })
        else {
          this.$store.dispatch("updateSlotDataWithSetter", {
            setter: this.setters[field],
            data: this.data[field]
          })
          //this.$store.dispatch("updateSpecificInfo", { key: this.slotItem.getter[field].split(".")[1], value: this.data[field] })
        }
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
