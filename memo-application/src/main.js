import Vue from 'vue'
import App from './App.vue'

import store from './store'; // ./store 로 디렉토리만 적어주면 index.js 파일을 찾아와 불러준다. 

new Vue({
  el: '#app',
  // Vue 인스턴스에 store 옵션 등록. 
  store, 
  render: h => h(App)
})
