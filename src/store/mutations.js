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
      console.log(value)
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


//
// import _ from 'lodash'
//
// export default {
// 	data() {
//     return {
//       info: _.cloneDeep(this.$store.getters.getInfo),
//     }
//   },
//   computed: {
//     getInfo() {
//       return this.$store.getters.getInfo;
//     }
//   },
//   watch: {
//     getInfo: {
//     	deep: true,
//     	handler(newInfo) {
//         if (_.isEqual(newInfo, this.info)) { // condition to prevent infinite loops
//     			this.info = _.cloneDeep(newInfo);
//         }
//     	}
//     },
//   	info: {
//     	deep: true,
//     	handler(newInfo) {
//     		this.$store.commit('updateInfo', _.cloneDeep(newInfo))
//     	}
//     }
// 	}
// }
