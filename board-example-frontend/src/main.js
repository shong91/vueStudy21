// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' // main.js에서 vue instance에 vuex store 옵션을 주입해 주어야 함.
import Cookies from 'js-cookie'

Vue.config.productionTip = false

// 쿠키 보유 여부를 확인한 뒤에 vue 인스턴스가 생성되어야 함. => 비동기 처리
function init () {
  const savedToken = Cookies.get('accessToken')
  if (savedToken) {
    // 저장된 토큰이 존재한다면 해당 액션을 return 함. 
    return store.dispatch('signinByToken', savedToken)
  } else {
    // resolve(): 비동기식 로직의 성공 / reject(): 비동기식 로직의 실패 
    return Promise.resolve()
  }
}

init().then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})

