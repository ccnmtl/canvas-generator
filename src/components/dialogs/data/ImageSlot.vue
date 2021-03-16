<template>
  <div class="dialog-inner">

    <div class="dialog-content">
      <div class="row">
        <div class="col-sm-6">
          <form name="file-form" v-on:submit.prevent="uploadImage()">
            <label>Source:
              <el-radio-group v-model="source">
                <el-radio-button label="computer">From Computer</el-radio-button>
                <el-radio-button label="url">From URL</el-radio-button>
              </el-radio-group>
            </label>

            <transition name="fade" mode="out-in">
              <label key="computer" v-if="source === 'computer'">Upload New Image:
                <input @change="setImage" class="form-control" ref="image" name="image" id="image-file" type="file">
              </label>
              <label key="url" v-else>Select from URL:
                <input v-model="newImage" class="form-control" name="image" id="image-link" placeholder="Image URL">
              </label>
            </transition>
            <div class="row">
                <label> Width: <el-input ref="width" style="width:80px; margin-right: 30px" v-model="data.width" /></label>
                <label> Height: <el-input ref="height" style="width:80px" v-model="data.height" /></label>
            </div>
            <label>
              <input type="submit" class="el-button el-button--primary" value="Upload">
            </label>
          </form>
        </div>
        <div class="col-sm-6">
          <label>Current Image:
            <br><img :src="data.imgSrc" alt="" />
          </label>
        </div>
      </div>



      <hr>

          <label> Modify Alt Text <el-input ref="alt" v-model="data.alt" /></label>



    </div>

    <footer>
      <el-button type="primary" @click="saveChoice">Confirm</el-button>
    </footer>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import slotTypes from '../../../util/slot-types.js'
import slotMixin from '../../mixins/slot-mixin.js'

export default {
  props: [
    'dialogData'
  ],
  name: 'ImageSlotData',
  mixins: [slotTypes, slotMixin],
  data() {
    return {
      selectedSlot: 1,
      forceDimensions: false,
      data: this.dialogData.slotData.data || {},
      slotItem: {},
      slotData: {},
      source: 'computer',
      newImage: ''
    }
  },
  watch: {
    dialogData: {
      handler(val) {
        this.slotItem = val.slotData
        this.slotData = val.slotData.data
      },
      deep: true,
      immediate: true
    }
  },
  computed:{
    ...mapGetters({
      fullSlotTypes: 'getSlotTypes',
      Config: 'getConfig',
      getTheme: 'getTheme'
    }),
    theme: {
      get() {
        return this.getTheme
      },
      set(payload) {
        this.$store.commit('updateTheme', payload)
      }
    },
  },
  methods: {
    saveChoice() {
      this.$store.dispatch("updateSlotData", {
        item: this.dialogData.slotData,
        data: {
          imgSrc: this.data.imgSrc,
          width: this.data.width,
          height: this.data.height,
          alt: this.data.alt,
          forceDimensions: true
          }
        })
      this.$store.dispatch("setDialogVisibility", false)
    },
    setImage() {

    },
    uploadImage() {
      var formData = new FormData()

      if (this.source == "url") {
        console.log("uploading url...")
        if (this.newImage.length == 0) return
        formData.append("imageUrl", this.newImage)
      } else {
        console.log("uploading file...")
        var imagefile = document.querySelector("#image-file")
        if (imagefile.files.length == 0) return
        formData.append("image", imagefile.files[0])
      }

      formData.append("imageWidth", this.data.width)
      formData.append("imageHeight", this.data.height)
      this.$http.post("https://images.columbiacoursebuilder.org/image", formData).then(
        response => {
          let imageData = JSON.parse(response.bodyText)

          let imgSetter
          if(this.dialogData.setters && this.dialogData.setters.imgSrc) {
            imgSetter = this.dialogData.setters.imgSrc
            this.$store.dispatch("updateSlotDataWithSetter", {
              setter: imgSetter,
              data: imageData.imageUrls[0]
            })
          }

          else {
            this.data.imgSrc = imageData.imageUrls[0]

            this.$store.dispatch("updateSlotData", {
            item: this.dialogData.slotData,
            data: {
              imgSrc: imageData.imageUrls[0],
              width: this.data.width, height: this.data.height
              }
            })
          }


        },
        response => {
          console.log(response)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>

.dialog-content {
  text-align: center;
  padding: 0 12px;
  margin-bottom: 18px;
  max-height: calc(52vh - 124px);
  overflow: auto;

  > label, form > label {
    width: 100%;
    text-align: left;
    padding-bottom: 16px;

    img {
      max-width: 50%;
      display: block;
      margin: 7px 0;
      border: 1px solid #DDD;
    }

    input, div {
      margin-top: 7px;
      font-weight: normal;

      &.uk-button {
        float: left;
      }
    }
  }

  .row {
      width: 100%;
      text-align: left;
      padding-left: 16px;

      input {
        font-weight: normal;
      }
  }
}

footer {
  margin: 30px 0 -10px;
  text-align: right;
}

</style>
