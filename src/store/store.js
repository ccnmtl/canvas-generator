import Vue from 'vue';
import Vuex from 'vuex';
import defaults from './components/defaults'
import graphics from './components/graphics'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    imageServer: "https://s3.us-east-2.amazonaws.com/sipa-canvas/canvas-images/",
    title: "Global Food Systems",
    semester: "U6411 // SPRING 2017",
    professor: "Glenn Denning",
    courseUrl: "https://courseworks2.columbia.edu/courses/35006/",
    dateType: "Week",
    dateLength: "12",
  },
  getters: {},
  mutations: {},
  modules: {
    defaults,
    graphics
  }
})
