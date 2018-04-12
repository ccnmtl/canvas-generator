import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(["getInfo", "dWeek", 'getWeeks','getTheme']),
    info() {
      return this.getInfo
    },
    weeks() {
      return this.getWeeks
    },
    theme: {
      get () {
        return this.getTheme
      },
      set (payload) {
        this.$store.commit('updateTheme', payload)
      }
    },
  },
  methods: {
    ...mapMutations([
      'addWeek', 'sliceWeek', 'updateWeeks', 'updateInfo'
    ]),
    updateProp(prop, value) {
      this.$store.commit('updateProp', {prop, value})
    },
    updateUser(user, prop, value) {
      this.$store.commit('updateUser', {user, prop, value})
    },
    updateWeek(index, prop, value) {
      this.$store.commit('updateWeek', {index, prop, value})
    },
	},
}
