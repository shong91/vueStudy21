import api from '@/api'
import { FETCH_POST_LIST, FETCH_POST } from './mutations-types'

export default {
    fetchPostList({ commit }){
        return api.get('/posts')
        .then(res => {
            commit(FETCH_POST_LIST, res.data); // 응답으로 내려온 게시물 데이터를 FETCH_POST_LIST 변이의 실행과 함께 인자로 넘겨준다.  
        })
        .catch(); 
    },
    fetchPost( { commit }, postId) {
        return api.get(`/posts/${postId}`)
        .then(res => {
            commit(FETCH_POST, res.data)
        })
        .catch();
    },
}