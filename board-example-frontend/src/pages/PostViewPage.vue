<template>
    <div class="post-view-page">
        <!-- vue 컴포넌트가 렌더링 될 때, post 변수가 null 값일 경우 데이터를 받아오지 못하는 에러 발생.
        이를 방지하기 위해 v-if/else 분기 처리를 해준다. -->
        <post-view v-if="post" :post="post" />
        <p v-else> 게시글을 불러오는 중 ..</p>
        <router-link :to="{ name: 'PostListPage'} "> 목록 </router-link>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostView from '../components/PostView.vue';

export default {
  components: { PostView },
    name: 'PostViewPage',
    props: {
        postId: {
            type: String, 
            required: true
        }
    },
    created() {
        this.fetchPost( `/${this.postId}`)
        .catch(err => {
            alert(err.response.data.msg)
            this.$router.back()
        }); 
        // 1. 왜 그냥 this.postId 를 하면 안되는거지? 
        // 2. catch() 문을 action.js 에서 처리할 경우 back() 이 실행되지 않음. 
    },
    computed: {
        ...mapState([
            'post'
        ])
    },
    methods: {
        ...mapActions([
            'fetchPost',
        ])
    }

}
</script>

<style>

</style>