import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {

  },
  methods: {
    deleteSlot(sid) {
        this.$store.dispatch("setDialogData", {
          title: 'Are you sure you want to delete this slot?',
          type: 'delete-slot',
          sid,
        })
        this.$store.dispatch("setDialogVisibility", true)
      }      

  },
}