<template>
  <div class="dialog-inner">
      <div class="dialog-data">
        <div class="data-item">
          <strong>Data Source: </strong>
          {{ getter ? getter : 'Local data' }}
        </div>

        <div class="items-list">
          <div class="item" v-for="item in data" :key="item.id">
            <h6>{{ item.name}}</h6>
            <div v-for="(att, i) in asArray(item)" :key="i" class="att">
              <strong>{{ att[0] }}:</strong>
              {{ att[1] }}
            </div>
          </div>
        </div>

        <div class="item-form">
            <h5>Add new item</h5>
            <div v-for="(att, i) in asArray(data[0])" :key="i" class="att">
              <input v-model="form[att[0]]" :placeholder="att[0] + ' field'" class="form-control"/>
            </div>
            <el-button type="primary" @click="addItem">Add Item</el-button>
        </div>
      </div>

    <footer>
      <el-button type="secondary" @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="saveChanges">Save Changes</el-button>
    </footer>
  </div>
</template>

<script>

import Vue from  'vue'
import _ from 'lodash'
import SlotTypesComponent from '../../util/slot-types.js'
const SlotTypes = SlotTypesComponent.computed.SlotTypes()

export default {
  props: [
    'dialogData'
  ],
  name: 'ConfigSlotData',
  data() {
    return {
      slotTypes: SlotTypes,
      usedStyles: [],
      styleAtt: null,
      styleVal: '',
      classVal: '',
      editGetter: false,
      getter: null,
      data: [],
      form: {}
    }
  },
  beforeMount() {
      if(this.dialogData.slotData.getter) {
        this.getter = _.cloneDeep(this.dialogData.slotData.getter)
      }

      if(this.data.length > 0) {
        this.asArray(this.data[0]).forEach(field => {
          this.form[field[0]] = ""
        })
      }
  },
  computed: {
    getterData: function () {
      if(!this.dialogData.slotData.getter) return null
      return this.$store.getters.getFromGetter(this.dialogData.slotData.getter)
    },
  },
  watch: {
    getterData: {
      handler(newVal) {
        if (newVal !== null) {
          if(!this.data) {
            this.data = []
          }

          if(!newVal) newVal = []

          Vue.set(this, 'data', _.cloneDeep(newVal))
        }
      },
      immediate: true
    }
  },
  methods: {
    addItem() {
      let res = {}
      this.asArray(this.form).forEach(field => {
        res[field[0]] = field[1]
      })

      this.data.push(res)
    },
    asArray(obj) {
      return Object.keys(obj).map((key) => [key, obj[key]])
    },
    saveChanges() {
      this.$store.dispatch("setDialogVisibility", false)

      const res = this.getter.split('.')

      if(res[0] === 'info') {
        this.$store.dispatch('setInfoField', {
          field: res[1],
          value: this.data
        })
      }

      else {
        this.$store.dispatch('setStateField', {
          field: res[0],
          value: this.data
        })
      }

      this.$store.dispatch("setDialogData", {
        title: 'Config Slot',
        type: 'config-slot',
        slotData: this.dialogData.slotData
      })
      setTimeout(() => { this.$store.dispatch("setDialogVisibility", true) }, 300)
    },
    cancel() {
      this.$store.dispatch("setDialogVisibility", false)
      this.$store.dispatch("setDialogData", {
        title: 'Config Slot',
        type: 'config-slot',
        slotData: this.dialogData.slotData
      })
      setTimeout(() => { this.$store.dispatch("setDialogVisibility", true) }, 300)
    },
    addStyle() {
        if(this.styleAtt && this.styleVal) {
            this.usedStyles.push(this.styleAtt)
            this.styles.push({
                att: this.styleAtt,
                value: this.styleVal,
            })

            this.styleAtt = null
            this.styleVal = ''
        }
    },
    addClass() {
        if(this.classVal) {
            this.classes.push(this.classVal)
            this.classVal = ''
        }
    }
  }
}
</script>

<style lang="scss">

.dialog-inner {
    .dialog-data {
        max-height: calc(52vh - 95px);
        overflow: auto;
        margin-top: -25px;
        padding-bottom: 7px;

        .el-input, .el-select {
            width: 180px;
        }
    }

    footer {
      margin: 30px 0 -10px;
      text-align: right;
    }
}

.items-list {
  .item {
    width: 98%;
    padding: 20px;
    border: 1px solid #CCC;
    margin-top: 12px;

    h6 {
      margin-bottom: 7px;
      font-weight: bold;
      font-size: 16px;
    }

    &:nth-child(even) {
      background-color: #EEE;
    }
  }
}

.item-form {
  padding: 20px 0;
  width: 50%;

  input {
    margin: 7px 0;
  }
}

</style>
