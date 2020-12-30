<template>
  <div class="dialog-inner">
      <div class="dialog-data">
        <h5>Slot Styles</h5>

        <div class="style-item" v-for="(st, i) in styles" :key="i">
            <span>
                {{ st.att + ': ' + st.value }}
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

        <div class="class-item" v-for="(cls, i) in classes" :key="i">
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
import SlotTypes from '../../util/slot-types.json'
import StyleOptions from '../../util/style-options.json'

export default {
  props: [
    'dialogData'
  ],
  name: 'ChooseSlot',
  data() {
    return {
      slotTypes: SlotTypes,
      styles: [],
      classes: [],
      usedStyles: [],
      styleAtt: null,
      styleVal: '',
      classVal: ''
    }
  },
  beforeMount() {
      if(this.dialogData.slotData.styles) 
        this.styles = this.dialogData.slotData.styles

      if(this.dialogData.slotData.classes) 
        this.classes = this.dialogData.slotData.classes
  },
  computed: {
      styleOptions() {
          return _.xor(StyleOptions, this.usedStyles)
      }
  },
  methods: {
    saveChanges() {
        const finalStyles = {}

        this.styles.forEach((st, i, arr) => {
            finalStyles[st.att] = st.value + ' !important'

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
        
        this.$store.dispatch("setDialogVisibility", false)

    },
    cancel() {
      this.$store.dispatch("setDialogVisibility", false)
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

</style>
