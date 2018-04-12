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
    // Copies the text when user selects the code output area
    copyText(option) {
      this.updateCode();
      var copyTextarea = document.querySelector('#copy-text-area');

      if (option == 'aux'){
        var aux = document.createElement("input");
        aux.setAttribute("value", copyTextarea.value);
        document.body.appendChild(aux);
        aux.select();
        console.log('creating aux element..')
      }
      else {
        copyTextarea.select();
      }

      document.execCommand('copy')

      this.$snotify.success('Code has been copied', {showProgressBar: false});

      if (option == 'aux') document.body.removeChild(aux);
    },
    // Parses the code from the canvas-code div and puts it in the output
    updateCode(){
      let code = document.getElementById("canvas-code");
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+\"/ig,"")
    },
	},
}
