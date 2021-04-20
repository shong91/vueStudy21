<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- 중첩된 라우트 사용 -->
    <router-view>
      <div id="post">
        <h4> Post 컴포넌트 입니다. </h4>
        <!-- 중첩된 router-view에 다른 컴포넌트를 렌더할 수 있다.  -->
        <router-view></router-view>
      </div>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}


new VueRouter({
  routes: [
    {
      path: '/post',
      component: Post, 
      // nested router-view 에 해당하는 컴포넌트
      children: [
        {
          path: 'foo',
          component: Foo
        },
        {
          path: 'bar',
          component: Bar
        }
      ]
    }
  ]
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
