export default {
  computed: {
    // ...mapGetters(["getInfo", "dWeek", 'getWeeks']),
    info() {
      return this.$store.getters.getInfo
    },
    weeks() {
      return this.$store.getters.getWeeks
    },
    theme: {
      get () {
        return this.$store.getters.getTheme
      },
      set (payload) {
        this.$store.commit('updateTheme', payload)
      }
    },
  },
  methods: {
    updateProp(prop, value) {
      this.$store.commit('updateProp', {prop, value})
    },
    updateUser(user, prop, e) {
      this.$store.commit('updateUser', {user, prop, value: e.target.value})
    },
    updateWeek(index, prop, value) {
      this.$store.commit('updateWeek', {index, prop, value})
    },
	},
}
