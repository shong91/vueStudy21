<template>
  <div class="post-edit-page">
      <h1>게시글 수정</h1>
      <post-edit-form v-if="post"
                    :post="post" 
                    @submit="onSubmit" />
      <p v-else> 게시글 불러오는 중 ..</p>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import PostEditForm from '../components/PostEditForm.vue'
import api from '@/api'

export default {
    components: { PostEditForm },
    name: 'PostEditPage',
    props: {
        postId: {
            type: String, 
            required: true, 
        }
    },
    computed:{
        ...mapState([
            'post'
        ])
    },
    methods: {
        onSubmit(payload) {
            const { title, contents } = payload
            api.put(`/posts/${this.postId}`, {title, contents})
            .then(res => {
                alert('게시글이 성공적으로 수정되었습니다. ')
                this.$router.push({
                    name: 'PostViewPage',
                    params: {
                        postId: res.data.id.toString()
                    }})
            })
            .catch(err => {
                // beforeEnter() 가드를 이용하여 라우트에서 1차적으로 가드하나, 
                // 해당 url이 아닌 다른 접근으로 해당 컴포넌트에 접근할 시를 대비하여 onSubmit() 에서도 가드 처리를 해주는 것을 권장한다.
                if(err.response.status === 401) {
                    alert('로그인이 필요합니다. ')
                    this.$router.push({name: 'Signin'})
                } else if (err.response.status === 403) {
                    alert('게시글 수정 권한이 없습니다: ', err.response.data.msg) 
                    this.$router.back()
                } else {
                    alert(err.response.data.msg)
                }
            })
        }
    },
}
</script>

<style>

</style>