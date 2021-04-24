<template>
  <div class="post-create-page">
      <h3>게시글 작성하기 </h3>
      <post-create-form @submit="onSubmit" />
  </div>
</template>

<script>
import PostCreateForm from '../components/PostCreateForm.vue'
import { mapActions } from 'vuex'
import api from '@/api'

export default {
    components: { PostCreateForm },
    name: 'PostCreatePage',
    methods: {
        onSubmit(payload){
            // this.postcreate()
            const { title, contents } = payload
            api.post('/posts', { title, contents })
            .then(res => {
                alert('게시글이 성공적으로 작성되었습니다. ')
                this.$router.push({
                    name: 'PostViewPage', 
                    params: {
                        postId: res.data.id.toString()
                    }
                })
            })
            .catch(err => {
                if(err.response.status === 401) {
                    alert('로그인이 필요합니다. ')
                    this.$router.push({ name: 'Signin' })
                } else {
                    alert(err.response.data.msg)
                }

            }); 
        }
    },
}
</script>

<style>

</style>