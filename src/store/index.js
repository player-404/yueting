import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import playBar from './playBar/playBar'
import playing from './playing/playing'
import list from './list/list'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    playBar,
    playing,
    list
  }
})
