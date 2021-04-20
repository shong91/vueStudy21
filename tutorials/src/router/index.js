import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 전통적인 방식: 클라이언트 -> 서버로 페이지 URL 요청하는 역할만 하며, 서버에서 해당하는 HTML 로 라우팅한다. (server-side)
// SPA: 클라이언트 -> 서버에 페이지 요청 -> 서버는 index.html 으로 응답하며, 클라이언트에서 현재 url에 따라 페이지의 내용을 결정하고 그린다. (client-side)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/foo',
      component: Foo,
    },
    {
      path: '/bar',
      component: Bar,
    }
  ]
})

// 1. 라우트 설정 분리도 가능함 - 각기 다른 라우터 선언
// src/router/auth.js
export const AuthRouter = [
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  }
]

// src/router/user.js
export const UserRouter = [
  {
    path: '/user/profile',
    name: 'Profile',
    component: Profile
  }
]

// 2. 라우트 설정 분리도 가능함 - 각각 선언된 라우트 설정을 default 라우터에 주입 => 보다 간략함 !
import { AuthRouters } from '@/router/auth'
import { UserRouters } from '@/router/user'
import VueRouter from 'vue-router'

export default new VueRouter({
  routes: [
    ...AuthRouters, 
    ...UserRouters,
  ]
})

// 동적 라우트 매칭
// 동적 세그멘트 (ex. /post/1/ 등 url 경로 내부에 들어있는 변수); 콜론(:) 으로 시작한다. 
new VueRouter({
  routes: [
    {
      // /posts/1, /posts/2 등의 패턴을 가진 url을 같은 경로로 인식하고 라우팅 한다. 
      // /posts/1 => /posts/2 으로 url 변경 시, 모든 컴포넌트를 다시 로딩하는 것이 아니다. (created(), mounted() 등의 라이프 사이클이 재기동 되지 않음)
      // -> Vue의 watch 속성을 사용하여 $route 객체를 감시 => 동적 세그먼트가 변경되었다는 것을 감지한다. 
      path: '/posts/:postId',
      component: PostDetailPage,
    }
  ]
})
