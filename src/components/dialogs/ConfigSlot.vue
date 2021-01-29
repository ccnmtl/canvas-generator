<template>
  <div class="dialog-inner">
      <div class="dialog-data">
        <h5>Slot Data Source</h5>

        <div class="data-item">
          <strong>Data Source: </strong>
          <span v-if="getter !== null">
            <span @dblclick="showEditGetter" v-show="!editGetter">{{ getter ? getter : 'Unassigned' }}</span>
            <span v-show="editGetter">
              <input class="form-control" ref="getter ? getter : 'Unassigned'" style="display: inline-block; width: 50%" v-model="getter" @blur="editGetter = false" />
            </span>
            <div>
              <small>Global data can be assigned as an object eg: info.title</small>
            </div>
          </span>
          <span v-else>Local data</span>

          <div class="data-button">
            <button @click="setDataTypeTo('local')" v-if="getter !== null" class="btn-primary btn">Change to local data</button>
            <button @click="setDataTypeTo('global')" v-else class="btn-primary btn">Change to Global data</button>

            <button v-if="dialogData.slotData.type === 7 || dialogData.slotData.type === 9" @click="changeSlotData" class="btn-secondary btn">
              Config Slot data
            </button>
          </div>
        </div>

        <h5>Slot Styles</h5>

        <div class="style-item" v-for="(st, i) in asArray(styles)" :key="'style' + i">
            <span>
                {{ st[0] + ': ' + st[1] }}
                <i class="el-icon-error" />
            </span>
        </div>

        <el-select v-model="styleAtt" placeholder="Select">
            <el-option
                v-for="item in styleOptions"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
        </el-select>

        <el-input placeholder="Style value" v-model="styleVal"></el-input>

        <el-button type="primary" @click="addStyle">Add new Style</el-button>

        <h5>Slot CSS Classes</h5>

        <div class="class-item" v-for="(cls, i) in classes" :key="'class' + i">
            <span class="bg">
                {{ cls }}
                <i class="el-icon-error" />
            </span>
        </div>

        <el-input placeholder="Class name" v-model="classVal"></el-input>
        <el-button type="primary" @click="addClass">Add new Class</el-button>
      </div>

    <footer>
      <el-button type="secondary" @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="saveChanges">Save Changes</el-button>
    </footer>
  </div>
</template>

<script>

import _ from 'lodash'
import SlotTypesComponent from '../../util/slot-types.js'
const SlotTypes = SlotTypesComponent.computed.SlotTypes()
import StyleOptions from '../../util/style-options.json'

export default {
  props: [
    'dialogData'
  ],
  name: 'ConfigSlot',
  data() {
    return {
      slotTypes: SlotTypes,
      styles: [],
      classes: [],
      usedStyles: [],
      styleAtt: null,
      styleVal: '',
      classVal: '',
      editGetter: false,
      getter: null
    }
  },
  beforeMount() {
      if(this.dialogData.slotData.styles)
        this.styles = _.cloneDeep(this.dialogData.slotData.styles)

      if(this.dialogData.slotData.classes)
        this.classes = _.cloneDeep(this.dialogData.slotData.classes)

      if(this.dialogData.slotData.getter)
        this.getter = _.cloneDeep(this.dialogData.slotData.getter)
  },
  computed: {
      styleOptions() {
          return _.xor(StyleOptions, this.usedStyles)
      }
  },
  methods: {
    asArray(obj) {
      return Object.keys(obj).map((key) => [key, obj[key]])
    },
    changeSlotData() {
      this.$store.dispatch("setDialogVisibility", false)
      this.$store.dispatch("setDialogData", {
        title: 'Config Slot Data',
        type: 'config-slot-data',
        slotData: this.dialogData.slotData
      })
      setTimeout(() => { this.$store.dispatch("setDialogVisibility", true) }, 300)
    },
    setDataTypeTo(type) {
      if(type === 'local') {
        this.getter = null
      }
      else {
        this.getter = this.dialogData.slotData.getter
                      ? _.cloneDeep(this.dialogData.slotData.getter)
                      : ''
      }
    },
    showEditGetter() {
      this.editGetter = true
      setTimeout(() => { this.$refs.getter.focus() }, 200)
    },
    saveChanges() {
        const finalStyles = {}

        this.asArray(this.styles).forEach((st, i, arr) => {
            finalStyles[st[0]] = st[1] + ' !important'

            if(i == arr.length - 1) {
                this.$store.dispatch("setSlotStyles", {
                    slot: this.dialogData.slotData,
                    styles: finalStyles
                })
            }
        });

        this.$store.dispatch("setSlotClasses", {
            slot: this.dialogData.slotData,
            classes: this.classes
        })

        this.$store.dispatch("setSlotGetter", {
            slot: this.dialogData.slotData,
            getter: this.getter
        })

        this.$store.dispatch("setDialogVisibility", false)

    },
    cancel() {
      this.$store.dispatch("setDialogVisibility", false)
    },
    addStyle() {
        if(this.styleAtt && this.styleVal) {
            this.usedStyles.push(this.styleAtt)
            this.styles[this.styleAtt] = this.styleVal
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

.style-item, .class-item {
    margin-bottom: 18px;

    span {
        background-color: #409eff;
        padding: 9px 16px;
        border-radius: 20px;
        color: #FFF;

        &.bg {
            background-color: #777;
        }

        i {
            margin-left: 12px;
            cursor: pointer;
        }
    }
}

.data-item {
  .data-button {
    margin-top: 12px;
  }
}

</style>
