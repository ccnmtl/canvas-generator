<template>
  <div :id="sid" class="col content-slot">
    <div v-html="slotData.content" v-if="editing !== 'content'" @dblclick="setEditing('content')" />

    <div data-hidden v-else>
      <quill-editor ref="content"
                    v-model="data.content"
                    :config="editorOption" />

      <button class="btn btn-primary" @click="finishEditing('content')">
        Save changes
      </button>
    </div>
  </div>
</template>

<script>

import { quillEditor } from "vue-quill-editor"
import slotMixin from '../mixins/slot-mixin.js'

const toolbarOptions = [
  ["bold", "italic", "underline"],
  ["blockquote", { list: "ordered" }, { list: "bullet" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }, "clean"],
  ["link"]
]

export default {
  components: {
    quillEditor
  },
  name: "ContentSlot",
  props: [ "sid", "slotData", "slotItem", "width" ],
  mixins: [slotMixin],  
  data() {
    return {
      editing: null,
      data: this.slotData,
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    }
  },
  methods: {
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

</style>
