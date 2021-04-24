<template>
  <div class="post-list-page">
    <h1>포스트 게시글</h1>
    <!-- PostListPage 는 껍데기 역할만 하며, 실질적인 페이지의 내용은 PostList 컴포넌트에서 담당한다. 
    WHY? Vue 컴포넌트 설계의 FIRST 원칙 - 단일 책임 원칙에서 작은 단위의 모듈을 만들어 조립하는 형태로 개발하여 유연한 프로그램을 만들기 위함. -->
    <post-list :posts="posts" />
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import { mapState, mapActions } from 'vuex'

export default {
    components: { 
      PostList 
    },
    name: 'PostListPage',
    computed: {
      ...mapState([
        'posts',
      ])
    },
    created() { 
      this.fetchPostList();
    },
    methods: {
      ...mapActions([
        'fetchPostList',
      ])
    },
}

</script>

<style>

</style>