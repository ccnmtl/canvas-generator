<template>
  <div class="hello">
    <div class="uk-child-width-1-1@s uk-light" uk-grid>
        <div>
            <div class="uk-background-cover uk-height-large uk-panel uk-text-center" style="background-image: url(static/images/cover01.jpg);">
               <p>&nbsp;</p>
               <p>&nbsp;</p>
               <img src="static/images/sipalogo_trans.png" />
               <h1 class="uk-heading"><span class="uk-margin-small-right" uk-icon="icon: cog; ratio: 2.5"></span> CANVAS CODE GENERATOR</h1>
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
            	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>2</h1>
            	<h5>EXPORT CODE</h5>
            	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
        <div>
            <div class="uk-background-primary uk-padding uk-light uk-height-medium">
            	<h1>3</h1>
            	<h5>INSERT INTO CANVAS</h5>
            	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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

var toolbarOptions = [
  ['bold', 'italic', 'underline'],
  ['blockquote',{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] },'clean'],
  ['link']
];

export default {
  name: 'Home',
  data () {
    return {
      userInput: {
        title: store.title,
        url: store.courseUrl,
        semester: "U6411 // SPRING 2017",
        professor: "Glenn Denning",
        pEmail: "gd2147@sipa.columbia.edu",
        ta: "Chandani Punia",
        tEmail:"cp2868@columbia.edu",
        office: "Office Hours: Monday 3:00-6:00 pm (IAB Room 1434)",
        tOffice: "Tuesday 1:00-2:30 pm (Publique, IAB 6th floor)",
        meetings: "Tuesday 9:00-10:50 am (IAB Room 411)",
        discussions: "Thursday 9:00-10:50 am (IAB Room 411)",
        video:"https://vimeo.com/199382848/1dd8fc0f31",
        image:"http://assets.ce.columbia.edu/i/ce/intl/intl-fp@2x.jpg",
        isVideo: true,
        mediaSwitchText: "Click to input Image",
        taInfo:"Instructor: \nProfessor Glenn Denning (gd2147@sipa.columbia.edu) Office Hours: Monday 3:00-6:00 pm (IAB Room 1434)",
        description: "Here you’ll find course materials and a range of tools to help you get the most out of the class. \n Please begin by reading the course syllabus, where you’ll find information about the structure of the class, and an outline of what will be expected of you over the course of the semester."
      },
      activeName: '1',
      outputCode: "",
      editorOption:{
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

textarea {
  width: auto;
}

.quill{
  width: 700px;

}

el-tab-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: 'blue';
}

.textbox-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.textbox{
  margin-left: 40px;
}

#canvas-code {
  width: 1000px;
  margin: auto;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  margin-right: 30px;
  width: 30%;
}

#copy-text-area {
  width: 100%;
}

.GFbanner {
  height: 190px;
}

.STV1_Banner {
  height: 190px;
}

.crop {
  width: 450px;
  height: 250px;
  object-fit: cover;
}

</style>
