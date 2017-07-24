<template>
  <div class="hello">
    <div class="uk-child-width-1-1@s uk-light" uk-grid>
        <div>
            <div class="uk-background-cover uk-height-large uk-panel uk-text-center" style="background-image: url(static/images/cover01.jpg);">
               <p>&nbsp;</p>
               <p>&nbsp;</p>
               <img src="static/images/sipalogo_trans.png" />
               <h1 class="uk-heading"><span class="uk-margin-small-right" uk-icon="icon: cog; ratio: 2.5"></span> Guide</h1>
            </div>
        </div>
    </div>

    <!--
    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center uk-height-large" uk-grid>
        <div class="uk-background-primary uk-padding uk-light">
        	<h4>HOW TO USE THIS TOOL</h4>
      		<p class="uk-width-1-2 uk-margin-auto-left uk-margin-auto-right">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      		<button class="uk-button uk-button-default">download the guide</button>
       	</div>
    </div>
    -->

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>1</h1>
            	<h5>DESIGN IN REAL TIME</h5>
            	<p>This website allows Columbia Professors and TA’s to quickly build Canvas class websites using our pre-built course template. </p>
            </div>
        </div>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>2</h1>
            	<h5>EXPORT CODE</h5>
            	<p>Once each page is built, you can copy the code for the page template.</p>
            </div>
        </div>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>3</h1>
            	<h5>INSERT INTO CANVAS</h5>
            	<p>And insert it into the canvas Page! See user guide for details.</p>
            </div>
        </div>
    </div>


    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-left" uk-grid>
        <div class="uk-background-muted uk-padding">
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
