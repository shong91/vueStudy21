// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 인스턴스가 생성된 후  this.$data 로 접근 가능. (this.$data.a == this.a)

const data = {a: 1};
new Vue({
  data: data
})

// 컴포넌트에서 data 속성을 정의 시, 반드시 ojbect 자료형을 반환하는 함수로 선언되어야 한다. 
// vue instance는 SPA에서 단 하나만 존재하지만, 컴포넌트는 여러개인 경우가 많기 때문에 각 컴포넌트가 완전 독립적인 data 속성을 갖게 하기 위함
const myComponent = Vue.extend({
  name: 'myComponent',
  data() {
    return {a: 1};
  }
})

// props 속성 선언 1) 단순 구문으로 표현
Vue.component('myComponent', {
  props: ['size', 'myMessage']

})

{/* <myComponent :width="3" :height="3"></myComponent> */} 

// props 속성 선언 2) 타입체크, 유효성 검사, 기본값 등 
Vue.component('myComponent', {
  props: {
    height: Number,
    width: {
      type: Number,
      required: true, 
      default: 1,
      validator (value) {
        return value > 0
      }
    }
  }
})

// props 속성 선언 3) 반응형으로 사용 
Vue.component('myComponent2', {
  props: {
    height: Number,
  },
  data() {
    return {
      dataHeight: this.height, 
    }
  }
})


// Vue 인스턴스의 각종 속성 정리 =============================================================================
Vue.component('myComp', {
  template: '<div> {{ doubleAge }} </div>',
  data() {
    return {age: 28}
  },
  // computed: 계산된 데이터. computed 내부에서 사용된 데이터가 변경되면 자동으로 값이 갱신된다.  
  computed: {
    // doubleAge () {
    //   return this.age * 2; 
    // }, 
    
    // getter/setter 를 분리할 수도 있음 
    doubleAge: {
      get: function(){
        return age * 2 
      },
      set: function(newAge){
        this.age = newAge; 
      }
    }
  },

  // methods: 인스턴스에 추가되는 메서드. 
  // methods 에 선언된 메서드를 실행 시에는, this 를 통해 직접 접근하거나 디렉티브 표현식을 사용한다. 선언된 모든 메서드는 this context 를 Vue instance에 바인딩한다. 
  // 이때, 화살표 함수를 이용하여 메소드 정의 시 this가 현재 인스턴스가 아닌 부모 컨텍스트를 의미하게 되므로, 메소드 내부에서 현재 인스턴스의 dasta/props 에 접근할 수 없게 된다. 
  methods: {
    plusNumber () {
      this.age++; 
    }
  },

  // 변화 감지 속성 
  watch: {
    a (nextValue, prevValue) {
      console.log(`new ${nextValue}, old ${prevValue}`)
    },
    // 감시하고자 하는 데이터가 Object 속성이라면, deep, handler와 같은 옵션을 사용하여 데이터의 내부 속성까지 감시할 수 있다. 
    b: {
      handler (nextValue, prevValue) {
        console.log(`new ${nextValue}, old ${prevValue}`)
      }, 
      deep: true
    }

  }
})


// Vue 인스턴스의 생명주기 
new Vue({
  el: '#app',
  beforeCreate() {

  },
  created() {

  },
  beforeMount(){

  },
  mounted(){

  },
  beforeUpdate(){

  },
  updated(){

  },
  beforeDestroy(){

  },
  destroyed(){

  }
})

// 디렉티브 (지시문) =============================================================================
// 1) v-bind: HTML 속성값의 동적 바인딩 / 컴포넌트의 props 속성에 값을 주입할 때 사용. (약어: :href, :class, ....)
// 2) v-on: DOM element / component 에 이벤트 리스너를 연결할 수 있는 디렉티브. (약어: @click, ... )
// 3) v-if, v-else-if, v-else: 컴포넌트/엘리먼트의 조건부 렌더링 기능
// 4) v-show: 컴포넌트/엘리먼트의 CSS display 속성 변경. (v-if와 달리 항상 DOM에 남아있음)
// 5) v-for
// 6) v-model: 사용자의 입력을 받을 수 있는 요소에 양방향 데이터 바인딩 
// 7) v-once: 컴포넌트/엘리먼트를 "한번만" 렌더링. 렌더된 후 값이 변경되더라도 화면에 노출된 글자는 변경되지 않는다. 
// 8) v-pre: v-pre 디렉티브가 사용된 엘리먼트는 하위 요소에 대한 모든 컴파일을 하지 않는다. (템플릿 문법으로 인식하지 않고, 문자열로 그대로 인식)

// 자주 사용하는 속성과 메서드 
// 1) vm.$emit(): 이벤트 트리거 
/*
    <template>
      <Foo @click="sayHi"/>
    </template>

    export default {
      name: 'Foo',
      methods: {
        onClick() {
          this.$emit('click', {message: 'Hi'})
        }
      }
    }
*/
// 2) vm.$on(): 이벤트 핸들러 등록. $emit() 에 의해 호출된다. 
/*
    vm.$emit('clcik', 'Hello')
    vm.$on('click', payload => {
      console.log(payload); // Hello 가 출력된다. 
    })
*/
// 3) vm.$once(): $on과 동일한 기능을 하나, "한번만" 실행된다. 
