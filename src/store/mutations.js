// A mixin which is injected into most components (the properties here, like methods are acessible within the component without having to rewrite)
// Stores the basic mutation functions to update various properties
// Also stored commonly used functions like copyText, which is the same on all Components

// TODO Refactor more of the shared functions here (or to a seperate mixin file)

import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(["getInfo", "getDWeek", 'getWeeks', 'getTheme', 'getStudents']),
    info() {
      return this.getInfo
    },
    weeks() {
      return this.getWeeks
    },
    theme: {
      get() {
        return this.getTheme
      },
      set(payload) {
        this.$store.commit('updateTheme', payload)
      }
    },
  },
  methods: {
    ...mapActions(['addWeek', 'sliceWeek', 'updateWeeks', 'updateInfo', "updateTheme"]),
    updateProp(prop, value) {
      this.$store.dispatch('updateProp', { prop, value })
    },
    updateUser(user, prop, value) {
      this.$store.dispatch('updateUser', {user, prop, value})
    },
    updateWeek(index, prop, value) {
      this.$store.dispatch('updateWeek', { index, prop, value })
    },
    // Copies the text when user selects the code output area
    copyText(option) {
      this.updateCode(option.div);
      this.updateProp('url', this.parseUrl(this.info.url))

      setTimeout(() => {
        if (option.elem == 'aux') {
          var aux = document.createElement("input");
          aux.setAttribute("value", this.outputCode);
          aux.id = 'code-input-copy'
          document.body.appendChild(aux);
          aux.select();
          console.log('creating aux element..')
        }
        else {
          copyTextarea.select();
        }
        document.execCommand('copy')
        console.log('copying text..')

        if (option.elem == 'aux') {
          aux.style.display = "none";
        }
      }, 40)
      this.$snotify.success('Code has been copied', { showProgressBar: false });


    },
    // Parses the code from the canvas-code div and puts it in the output
    updateCode(div) {
      console.log('updating code..')
      if (this.$route.path == '/home') this.updateProp('url', this.parseUrl(this.info.url))
      let code = document.getElementById(div);
      setTimeout(() => {
        this.outputCode = code.innerHTML.replace(/\bdata-v-\S+"/ig, "")
      }, 30)
      this.outputCode = code.innerHTML.replace(/\bdata-v-\S+"/ig, "")

    },
    returnCode(div) {
      console.log("week code..")
      let code = document.getElementById(div)
      console.log(code)
      return code.innerHTML.replace(/\bdata-v-\S+"/gi, "")
    },
    // Parses the URL so that it always has a trailing backslash
    parseUrl(url) {
      url = url.replace(/\/?(\?|#|$)/, '/$1')
      return url
    },
  },
}
