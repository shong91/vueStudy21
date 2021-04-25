<template>
    <div class="post-view-page">
        <!-- vue 컴포넌트가 렌더링 될 때, post 변수가 null 값일 경우 데이터를 받아오지 못하는 에러 발생.
        이를 방지하기 위해 v-if/else 분기 처리를 해준다. -->
        <post-view v-if="post" :post="post" />
        <p v-else> 게시글을 불러오는 중 ..</p>
        <router-link :to="{ name: 'PostEditPage'} "> 수정</router-link>
        <button @click="onDelete"> 삭제 </button>
        <router-link :to="{ name: 'PostListPage'} "> 목록 </router-link>

        <comment-list v-if="post" :comments="post.comments" />
        <comment-form @submit="onCommentSubmit" />
    </div>
</template>

<script>
import api from '@/api'
import { mapState, mapActions, mapGetters } from 'vuex'
import PostView from '../components/PostView.vue';
import CommentList from '../components/CommentList.vue';
import CommentForm from '../components/CommentForm.vue';

export default {
  components: { PostView, CommentList, CommentForm },
    name: 'PostViewPage',
    props: {
        postId: {
            type: String, 
            required: true
        }
    },
    created() {
        this.fetchPost(this.postId)
        .catch(err => {
            alert(err.response.data.msg)
            this.$router.back()
        }); 
        // 2. catch() 문을 action.js 에서 처리할 경우 $router.() 이 실행되지 않음.
        // [this] 의 문제 .. -> 어디로 해줘야 되지?  
    },
    computed: {
        ...mapState([
            'post'
        ]),
        ...mapGetters([
            'isAuthorized'
        ])
    },
    methods: {
        ...mapActions([
            'fetchPost',
            'createComment'
        ]),
        onDelete(){ 
            const { id } = this.post
            console.log ('post: ', id)
            console.log('postId:', this.postId)

            api.delete(`/posts/${id}`)
            .then(res => {
                alert('게시글이 성공적으로 삭제되었습니다. ')
                this.$router.push({ name: 'PostListPage' })
            })
            .catch(err => {
                if(err.response.status === 401) {
                    alert('로그인이 필요합니다. ')
                    this.$router.push({ name: 'Signin'})
                } else {
                    alert(err.response.data.msg)
                }
            })
        },
        onCommentSubmit(comment){ 
            if(!this.isAuthorized) {
                alert('로그인이 필요합니다. ')
                this.$router.push({name: 'Signin'})
            } else {
                console.log('execute createComment in vue component ')
                this.createComment(comment)
                .then(() => {
                    alert('댓글이 성공적으로 작성되었습니다. ')
                })
                .catch(err => {
                    alert(err.response.data.msg)
                })
            }


        }
    }

}
</script>

<style>

</style>