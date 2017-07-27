<template>
  <div class="hello">
    <div class="uk-child-width-1-1@s uk-light" uk-grid>
        <div>
            <div class="uk-background-cover uk-height-large uk-panel uk-text-center" style="background-image: url(static/images/cover01.jpg);">
               <div class="uk-overlay uk-overlay-primary uk-height-large">
                  <h1 class="uk-heading uk-margin-medium-top">Guide</h1>
                  <p class="uk-margin-auto-left uk-margin-auto-right">This website is designed to allow Professors and TA’s to quickly build beautiful and functional class websites on Columbia’s new Canvas/Courseworks platform.</p>
                  <p class="uk-margin-auto-left uk-margin-auto-right">This website provides a standard template for a 12 week course.</p>
                  <p class="uk-margin-auto-left uk-margin-auto-right">To build your course, watch the 4 minute training video, and download the guide below:</p>
                  <div class="uk-margin-medium-bottom uk-margin-auto-left uk-margin-auto-right">
                    <a href="static/files/CanvasCourseBuilderGuide.pdf" download><button class="uk-button uk-button-default uk-button-large uk-margin-medium-top">Download the Guide</button></a> &nbsp;&nbsp; <button class="uk-button uk-button-default uk-button-large uk-margin-medium-top" type="button" uk-toggle="target: #modal-media-video">Watch the Demo</button>
                  </div>
                  <div id="modal-media-video" uk-modal>
                      <div class="uk-modal-dialog uk-width-xlarge uk-margin-auto-vertical">
                          <button class="uk-modal-close-outside" type="button" uk-close></button>
                          <video controls uk-video>
                              <source src="static/files/CourseBuilderDemo.mp4?test1" type="video/mp4">
                          </video>
                      </div>
                  </div>
               </div>
            </div>
        </div>
    </div>

    <div class="clearfix"></div>

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left" uk-grid>
        <div class="uk-background-muted uk-padding uk-margin-xlarge-top">
    		<p>Copyright © Columbia University. All rights reserved.</p>
       	</div>
    </div>

  </div>
</template>

<script>
import store from '../store'
import { EventBus } from '../bus'
import saveState from 'vue-save-state';
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
