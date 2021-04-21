import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import moment from 'moment'

export default {
  data(){
    return {
      data: {
      },
      setters: {},
    }
  },
  computed: {
    ...mapGetters(["getInfo", 'getTheme',]),
    info() {
      return this.getInfo
    },
    getterData: function () {
      const self = this
      if (!this.slotItem.getter) return null

      if (typeof this.slotItem.getter !== 'string') {
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
            let getterFunc = self.$store.getters[val.func]
            let actualGetter = getterFunc(...val.props)
            res[key] = actualGetter.get
            this.setters[key] = actualGetter.set
          }
        })
        return res
      }
      else {
        this.setters[this.defaultGetter] = `${this.slotItem.getter}`
        return this.$store.getters.getFromGetter(this.slotItem.getter)
      }
    }
  },
  watch: {
    slotData: {
      handler(newVal) {
        this.asArray(newVal).forEach(valPair => {
          let prop = valPair[0]
          if (!this.slotItem.getter || !this.slotItem.getter[prop] && !(prop == this.defaultGetter && typeof this.slotItem.getter == 'string'))
          this.data[prop] = newVal[prop]
        })
      },
      immediate: true
    },
    slotItem: {
      handler(newVal) {
        if (newVal.setters){
          this.setters = {...this.setters, ...newVal.setters}
        }
      },
      immediate: true
    },
    getterData: {
      handler(newVal) {
        const self = this
        if (newVal !== null) {
          if (!this.data) {
            this.data = {}
          }

          if (typeof this.slotItem.getter === 'string') Vue.set(this.data, this.defaultGetter, newVal ? newVal : '')
          else {
            this.asArray(newVal).forEach(getter => {
              let key = getter[0]
              let val = getter[1]
              Vue.set(self.data, key, val ? val : '')
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
    deleteSlot(sid) {
      this.$store.dispatch("setDialogData", {
        title: 'Are you sure you want to delete this slot?',
        type: 'delete-slot',
        sid,
      })
      this.$store.dispatch("setDialogVisibility", true)
    },
    setEditing(field) {
      this.editing = field

      setTimeout(() => {
        // if (this.$refs[field]) this.$refs[field].focus()
      }, 200)
    },
    finishEditing(field) {
      if (this.data[field]) {
        if (this.setters[field]){
          this.$store.dispatch("updateSlotDataWithSetter", {
            setter: this.setters[field],
            data: this.data[field]
          }) 
        }
        // else {
        //   this.$store.dispatch("updateSpecificInfo", { key: field, value: this.data[field] })
        // }
        this.$store.dispatch("updateSlotData", {
        item: this.slotItem,
        data: this.data
        })
        this.editing = null
      }
    },
    formatWeek(date) {
      return moment(date).format("dddd, MMMM Do")
    },
    createLink(link){
      if (this.data.linkID) link = '/pages/session-' + ( this.$store.getters.getWeekIndexByID(this.data.linkID) + 1)
      if (!link) return null
      return this.info.url + link
    },
    doNothing(e) {
      e.preventDefault();
      return false;
    },
  },
}
