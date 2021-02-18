<template>
  <div class="dialog-inner">
    Upload image below:
    <br>
    <hr>
    <button type="button" name="button" class="uk-button-small uk-button-primary" @click="updateSwitch">{{uploadSwitchText}}</button> <br> <hr>
    <!-- These forms upload the file or url to Amazon S3. More detail in the onFormSubmit method. -->
    <form name="file-form" v-show="this.isFile"v-on:submit.prevent="uploadImage('image')">
      <input name="image" id="image-file" type="file"> <br>
      <label> Width: </label> <el-input ref="width" style="width:80px" v-model="imgWidth" />
      <label> Height: </label> <el-input ref="height" style="width:80px" v-model="imgHeight" />
      <br> <hr>
      <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
    </form>
    <form v-show="!this.isFile" v-on:submit.prevent="uploadImage('url')">
      <label> Link: </label> <el-input  id="image-url" style="width:400px" placeholder="Image Link" v-model="imgLink"/> <br> <br>
      <label> Width: </label> <el-input ref="width" style="width:80px" v-model="imgWidth" />
      <label> Height: </label> <el-input ref="height" style="width:80px" v-model="imgHeight" />
      <br> <hr>
      <input type="submit" class="uk-button uk-button-primary" value="Submit Image">
    </form>


    <footer>
      <el-button @click="$emit('cancelDialog')">Cancel</el-button>
    </footer>
  </div>
</template>

<script>


export default {
  props: [
    'dialogData'
  ],
  name: 'UploadImage',
  data() {
    return {
      selectedSlot: 1,
      isFile: true,
      uploadSwitchText: "Click to Upload Image from Url",
      imgWidth: this.dialogData.defaultWidth,
      imgHeight: this.dialogData.defaultHeight,
      imgLink: ""
    }
  },
  methods: {
    updateSwitch() {
      this.isFile = !this.isFile
      this.uploadSwitchText = this.isFile
        ? "Switch to Upload Image from URL"
        : "Switch to Upload Image from Computer"
    },
    uploadImage(type, ev) {
      var formData = new FormData()

      if (type == "url") {
        console.log("uploading url...")
        if (this.imgLink.length == 0) return
        formData.append("imageUrl", this.imgLink) // Adds api header to tell server that it is a url
      } else {
        console.log("uploading file...")
        var imagefile = document.querySelector("#image-file")
        if (imagefile.files.length == 0) return
        formData.append("image", imagefile.files[0]) // Adds api header to tell server that it is a file
      }

      // More api headers to tell the server the dimensions to crop
      formData.append("imageWidth", this.imgWidth)
      formData.append("imageHeight", this.imgHeight)

      // Send post request to Amazon server using vue-resource with form data
      this.$http.post("http://ec2-34-229-16-148.compute-1.amazonaws.com:3000/image", formData).then(
        response => {
          console.log("success")
          let imageData = JSON.parse(response.bodyText)
          console.log(imageData)
          console.log(this.dialogData)

          let imgSetter = this.dialogData.setters.imgSrc
          if(imgSetter) {
            this.$store.dispatch("updateSlotDataWithSetter", {
              setter: imgSetter,
              data: imageData.imageUrls[0]
            }) 
          }

          this.$store.dispatch("updateSlotData", {
            item: this.dialogData.item,
            data: {
              imgSrc: imageData.imageUrls[0],
              width: this.imgWidth, height: this.imgHeight
              }
            })
          // this.info.image = imageData.imageUrls[0] // Change requisite weekly activity image src to the hosted file
          this.$emit('cancelDialog')
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


footer {
  margin: 30px 0 -10px;
  text-align: right;
}

</style>
