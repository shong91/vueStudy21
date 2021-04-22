import Vue from 'vue'; 
import Vuex from 'vuex'; 

import state from './states.js'; 
import getters from './getters.js'; 
import mutations from './mutations.js'; 
import actions from './actions.js'; 

Vue.use(Vuex); 

// Store 인스턴스에 파일들을 추가.
export default new Vuex.Store({
    state, 
    getters, 
    mutations, 
    actions
});

