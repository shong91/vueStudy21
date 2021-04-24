import Vue from 'vue'
import Router from 'vue-router'
import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'

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
      path: '/post/:postId', 
      name: 'PostViewPage', 
      component: PostViewPage,
      // url의 postId 값을 PostViewPage 컴포넌트로 가져와야하므로, 라우트에 props 옵션을 true 로 설정하여 props 를 통해 라우트의 파라미터에 접근할 수 있도록 한다. 
      props: true, 
    }
  ]
})
