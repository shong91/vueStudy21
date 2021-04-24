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

/*
Vuex? 중앙 집중식 저장소. props, event 에 얽매이지 않고 vuex 를 통해 별도의 저장소에서 데이터를 효율적으로 관리 가능. 

Vuex                            Vuex Component
================================================================
state                           data() { }
    - 원본 소스의 역할. view와 직접적으로 연결되어 있는 model. 직접 변경 불가하며, mutation 을 통해 변경. 
mutation                        v-on event 
    - state 를 변경하는 유일한 방법. payload 인자를 받아 사용. 직접 호출 발가하며, commit() 을 통해 호출 

action                         v-on event
    - mutation 과 유사하나, 비동기 작업이 가능. context, payload 인자를 받아 사용. dispatch() 을 통해 호출
getter                         computed() {}
    - 계산된 속성. getter의 결과는 종속성에 따라 캐시 되고 종속성이 변경된 경우에만 다시 재계산된다. 
      state 에 대해 특정 연산을 하고, 그 결과를 view 에 바인딩할 수 있으며, 변경 여부에 따라 getter를 재계산하고 view 를 업데이트한다. (이 때, state 는 원본 데이터이므로 변경되지 않는다. )      

 */