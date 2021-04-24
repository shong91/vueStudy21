import Vue from 'vue'
import Vuex from 'vuex'

import state from './states.js' // import 명을 states => state 로 변경하니 정상적으로 데이터를 받아옴. 
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    mutations, 
    actions

})

