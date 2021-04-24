<template>
  <ul class="comments">
      <li v-for="comment in comments" :key="comment.id">
          <comment-item :comment="comment" @edit="onEdit" @delete="onDelete" />
      </li>
      <li v-if="comments.length <= 0">
          입력된 댓글이 없습니다. 
      </li>
  </ul>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { mapActions } from 'vuex'

export default {
    components: { CommentItem },
    name: 'CommentList',
    props: {
        comments: {
            type: Array, 
            default () {
                return []
            }
        }
    },
    methods: {
        ...mapActions([
            'editComment',
            'deleteComment'
        ]),
        onEdit({ id, comment }) {
           this.editComment({ commentId: id, comment})
           .then(res => {
               alert('댓글이 수정되었습니다. ')
           })
           .catch(err => {
               if(err.response.status === 401) {
                   alert('로그인이 필요합니다. ')
                   this.$router.push({name: 'Signin'})
               } else {
                   alert(err.response.data.msg)
               }
           }) 
        },
        onDelete(id){
            this.deleteComment(id)
            .then(res => {
               alert('댓글이 삭제되었습니다. ')
           })
           .catch(err => {
               if(err.response.status === 401) {
                   alert('로그인이 필요합니다. ')
                   this.$router.push({name: 'Signin'})
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