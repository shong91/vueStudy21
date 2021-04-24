import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import AppHeader from '@/components/AppHeader'
import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'
import PostCreatePage from '@/pages/PostCreatePage'
import PostEditPage from '@/pages/PostEditPage'

// import { Signup, Signin } from '@/pages/'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      component: PostListPage
    },
    {
      path: '/post/create', 
      name: 'PostCreatePage', 
      components: {
        header: AppHeader, 
        default: PostCreatePage
      },
      // UnAuthorized (HTTP 401 error) 접근에 대한 클라이언트 단의 최소한의 방어가 필요 => 전역 가드 사용
      // 전역가드: 애플리케이션의 라우트가 변경될 때 마다 호출되는, 애플리케이션 전역에서 통용되는 가드.
      // 컴포넌트 가드: 라우트에 해당 컴포넌트가 있을 경우 호출되는 가드. 
      beroreEnter(to, from, next){
        const { isAuthorized } = store.getters
        if (!isAuthorized){
          alert('로그인이 필요합니다. ')
          next({ name: 'Signin' }) // 로그인 페이지로 이동. 
        }
        next()
      }
    },
    {
      path: '/post/:postId',  // router는 위에서 아래로 읽는다 - /post/create 도 이 path 로 인식하기 때문에, 순서를 위로 올려줘야 함 
      name: 'PostViewPage', 
      components: {
        header: AppHeader,
        default: PostViewPage
      },
      // url의 postId 값을 PostViewPage 컴포넌트로 가져와야하므로, 라우트에 props 옵션을 true 로 설정하여 props 를 통해 라우트의 파라미터에 접근할 수 있도록 한다. 
      props: {
        default: true
      }, 
    },
    {
      path: '/post/:postId/edit', 
      name: 'PostEditPage', 
      components: {
        header: AppHeader, 
        default: PostEditPage
      },
      props: {
        default: true
      },
      // 가드 추가
      beforeEnter(to, from, next){
        const { isAuthorized } = store.getters
        if(!isAuthorized){ 
          alert('로그인이 필요합니다. ')
          next({name: 'Signin'})
          return false  
        }

        store.dispatch('fetchPost', to.params.postId)
        .then(() => {
          // 요청 성공 시 && 작성자 본인 => 다음 라우트로 이동한다.
          const post = store.state.post
          const isAuthor = post.user.id === store.state.me.id

          if(isAuthor) {
            next()
          } else {
            alert('게시물의 작성자만 글수정이 가능합니다. ')
            next(from)
          }
        })
        .catch(err => {
          // 요청 실패 시 전 페이지로 돌아간다. 
          alert(err.response.data.msg) 
          next(from)
        })

      }
    },
    {
      path: '/signup',
      name: 'Signup',
      components: {
        header: AppHeader, 
        default: Signup
      },
    },
    {
      path: '/signin', 
      name: 'Signin', 
      // components 속성이 아니라 component 속성을 사용하면 자동으로 이름이 없는 router-view 에만 컴포넌트를 렌더한다.  
      component: Signin
    },
    
  ]
})
