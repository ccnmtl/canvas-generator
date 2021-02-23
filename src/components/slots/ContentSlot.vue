<template>
  <div :id="sid" class="col content-slot">
    <div v-html="slotData.content" v-if="editing !== 'content'" @dblclick="setEditing('content')" />

    <div data-hidden v-else>
      <quill-editor v-if="editorType == 'Quill'" ref="content"
                    v-model="data.content"
                    :config="editorOption" />

      <tiny-editor
        v-if="editorType == 'Tiny'"
        api-key="no-api-key"
        v-model="data.content"
        :init="{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount autoresize'
          ],
          menubar: 'edit view insert format tools table tc help',
          toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link codesample',
        }"
      />
      
      <ckeditor v-if="editorType == 'CK'" :editor="editor" v-model="data.content" :config="editorConfig"></ckeditor>

      <!-- <el-select v-model="editorType" placeholder="Select">
        <el-option
          label="Quill"
          value="Quill">
        </el-option>
        <el-option
          label="CK"
          value="CK">
        </el-option>
        <el-option
          label="Tiny"
          value="Tiny">
        </el-option>
      </el-select> -->
      <button class="btn btn-success" @click="finishEditing('content')">
        Save changes
      </button>
    </div>
  </div>
</template>

<script>

import { quillEditor } from "vue-quill-editor"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import TinyEditor from '@tinymce/tinymce-vue'


import slotMixin from '../mixins/slot-mixin.js'

const toolbarOptions = [
  ["bold", "italic", "underline"],
  ["blockquote", { list: "ordered" }, { list: "bullet" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }, "clean"],
  ["link"]
]

export default {
  components: {
    quillEditor,
    TinyEditor
  },
  name: "ContentSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],  
  data() {
    return {
      editing: null,
      editor: ClassicEditor,
      editorConfig: {
        // plugins: [ImageInsert]
      },
      editorType: 'Quill',
      data: this.slotData,
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  methods: {
  },
  mounted(){
    this.editorType = this.data.editorType || 'Quill'
  }
}
</script>

<style scoped lang="scss">

.content-slot {
  padding: 16px;
  color: #333;
}

button {
  margin-top: 16px;
  margin-right: 7px;
}

.tox-notifications-container {display: none !important;}


</style>
