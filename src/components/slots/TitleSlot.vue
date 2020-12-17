<template>
  <div :id="sid" class="col">
    <div v-html="header" v-if="editing !== 'title'" @dblclick="setEditing('title')" />
    <span v-else>
      <input ref="title" v-model="data.title" :class="'font-' + data.type" />
      <select v-model="data.type" :class="'font-' + data.type">
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="h4">H4</option>
        <option value="h5">H5</option>
        <option value="h6">H6</option>
      </select>
      <button class="btn btn-primary" :class="'font-' + data.type" @click="finishEditing">
        Save changes
      </button>

      <button class="btn btn-danger" :class="'font-' + data.type" @click="deleteSlot">
        Delete Slot
      </button>
    </span>
  </div>
</template>

<script>
import mutations from "../../store/mutations"

export default {
  name: "TitleSlot",
  props: [ "sid", "slotData" ],
  data() {
    return {
      editing: null,
      data: this.slotData
    }
  },
  computed: {
    header: function () {
      return `<${this.slotData.type}>${this.slotData.title}</${this.slotData.type}>`
    }
  },
  methods: {
    setEditing(field) {
      this.editing = field
      setTimeout(() => {
        this.$refs[field].focus()
      }, 200)
    },
    finishEditing() {
      if(this.data.title) {
        this.$store.dispatch("updateSlotData", { sid: this.sid, data: this.data })
        this.editing = null
      }
    },
    deleteSlot() {
      this.$store.dispatch("setDialogData", {
        title: 'Are you sure you want to delete this slot?',
        type: 'delete-slot',
        sid: this.sid
      })
      this.$store.dispatch("setDialogVisibility", true)
    }
  }
}
</script>

<style scoped lang="scss">

input, select {
    padding: 0 12px;
    font-size: 18px;
    font-weight: 200;
    border: none;
    letter-spacing: -1px;
    color: #333;
    margin: 0;
    background: #00000022;
    display: inline-block;
    vertical-align: middle;
}

button {
  font-size: 16px !important;
}

input, select, button {
    &.font-h1 {
      font-size: 2.625rem;
      height: 64px;
    }

    &.font-h2 {
      font-size: 2rem;
      height: 52px;
    }

    &.font-h3 {
      font-size: 1.5rem;
      height: 52px;
    }

    &.font-h4 {
      font-size: 1.25rem;
      height: 52px;
    }

    &.font-h5 {
      font-size: 16px;
      height: 48px;
    }

    &.font-h6 {
      font-size: 0.875rem;
      height: 44px;
    }
}

select {
  padding: 7px 16px;
  margin: 0 12px;
  text-align: center;

  option {
    font-size: 16px;
    background: #FFF;
  }
}

</style>
