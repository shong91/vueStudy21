// Vuex 란 Vue로 작성된 애플리케이션의 상태관리를 통합적으로 구성할 수 있게 도와주는 라이브러리이다. 
// -> 분산되어 있는 컴포넌트의 상호작용을 위해, 애플리케이션의 상태를 저장할 수 있게 도와주는 집중식 저장소. 
'<template>
    <div>
        {{ count }} + {{ number }} = {{ sum }}


        {{ multiply }}

        
        <button @click="increment"> 더하기 </button>
        <button @click="decrement"> 빼기 </button>

        <button @click="incrementActions"> mapaction 더하기 </button>
    </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import store from 'src/stores'
import StoreTest from 'src/components/StoreTest'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'; 

Vue.use(vuex)
const app = new Vue({
    el: '#app',
    // store  옵션을 통해 root component 의 모든 자식 컴포넌트 저장소에 주입을 할 수 있다. (Vuex 스토어 주입 -> 루트 컴포넌트의 모든 자식 컴포넌트에  store 자동 주입)
    store, 
    components: { App },
})

// 1. mapState
export default {
    data(){
        return {
            number: 3
        }
    },
    computed:
        // count(){
        //     return this.$store.state.count; 
        // },

        // mapState - state를 연결해주는 함수
        // mapGetters - getters를 연결해주는 함수 - computed 와 같은 역할을 한다. 
        // mapMutations - mutations를 연결해주는 함수
        // mapActions - actions를 연결해주는 함수

        // mapState  헬퍼 함수를 통해 간단하게 사용한다. 
        mapState({
            count: state => state.count, 
            sum(state) {
                return state.count + this.number 
            }
        }),

    
}

// 2.mapGetters
export default new Vuex.Store({
    state: {
        count: 2
    },
    getters: {
        multiple (state) {
            return state.count * state.count
        }
    },
    // another way : 첫 번째 인자로 속해있는 store 의 status 를 전달받고, 두번째로는  getters 속성 자체를 전달받는다. 
    getters: {
        add: state => {
            return state.count + state.count
        },
        multiply: (state, getters) => {
            return getters.add * state.count
        }
    },

    // the other way: mapGetters 헬퍼 함수 
    computed: {
        ...mapGetters([
            'multiply',
        ])
    }
})

// 3. mapMutation 
// 변이mutation 은 getter와 다르게 store.mutation 으로 직접 접근이 불가하다. 변이를 호출하기 위해서는 반드시 .commit() 을 사용.
// 변이는 반드시 동기적이어야한다. WHY? 비동기처리 시 status 추적 어려움, 네트워크/서버 상태 등의 외부 요인에 따라 콜백 함수의 호출 타이밍 달라짐.
// 그렇다면 비동기 처리는 어떻게? => Actions 를 사용. 
export default {
    methods: {
        // increment() {
        //     store.commit('INCREMENT', 2)
        // },

        // Helper 함수 사용 
        ...mapMutations([
            "INCREMENT",
            "DECREMENT"
        ]),
        increment() {
            this.INCREMENT(2)
        },

        // 변이에서 하나 이상의 인자를 사용 시에는, 여러 개의 나열이 아닌 하나의 객체 형태로 전달하여야 한다. 
        decrement(){
            this.DECREMENT({ count: 2 })
        }
    },
}

// 4. mapActions
// actions 은 dispatch() 를 통해 사용. 
export default {
    methods:{
        // incrementActions () {
        //     store.dispatch('incrementActions', 3)
        // }
        ...mapActions([
            'increment'
        ]),
        incrementActions (){
            this.increment(3)
        }
    }
}
</script>

<style>

</style>'