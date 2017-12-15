//MAYBE DO NOT NEED AND CAN KEEP ALL THE REST AS LOCAL STATE?

export default {
  state: {
    home:{

    },
    weekly:{

    },
    syllabus:{

    }
  },
  getters: {
    getHome: state => state.home,

  },
  mutations: {
    updateHome: (state, payload) => {
      state.home = payload
    }
  }
}
