import api from '@/api'
import { 
    FETCH_POST_LIST, FETCH_POST, 
    SET_ACCESS_TOKEN, SET_MY_INFO,
    DESTROY_ACCESS_TOKEN, DESTROY_MY_INFO,
    UPDATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT
 } from './mutations-types'

export default {
    fetchPostList({ commit }){
        return api.get('/posts')
        .then(res => {
            commit(FETCH_POST_LIST, res.data); // 응답으로 내려온 게시물 데이터를 FETCH_POST_LIST 의 실행과 함께 인자로 넘겨준다.  
        })
        .catch(); 
    },
    fetchPost({ commit }, postId) {
        return api.get(`/posts/${postId}`)
        .then(res => {
            commit(FETCH_POST, res.data)
        })
        .catch(err => {
            // Promise.reject(err)
            // actions.js 단에서 다른 경로로 라우팅 해주고 싶다면 commit() 을 통해 다른 action 을 부르면 될 것 같은데.. res.data 가 없어서 일단 보류.
            // commit(FETCH_POST_LIST)
        });
    },
    signin({ commit }, payload) {
        const { email, password } = payload
        return api.post('/auth/signin', { email, password })
        .then(res => {
            // 1. 요청이 성공적으로 종료되어 토큰을 받았다면, SET_ACCESS_TOKEN 변이를 커밋한다. 
            console.log('successfully completed actions.js: ', res.data);
            const { accessToken } = res.data
            commit(SET_ACCESS_TOKEN, accessToken)
            
            // 2. 해당 토큰을 store 에 저장 -> api 모듈의 headers 에 토큰을 저장하여 바로 사용할 수 있도록 함. 
            return api.get('/users/me')
        })
        .then(res => {
            // 3. 사용자 정보 요청(2)이 성공했다면 변이를 사용하여 스토어에 사용자 정보를 저장한다. 
            commit(SET_MY_INFO, res.data)
        })
        .catch(); 
    },
    signinByToken({ commit }, token) {
        console.log('if had token in cookie, successfully dispatch actions - signinByToken.')
        // 1. 토큰을 스토어에 커밋
        commit(SET_ACCESS_TOKEN, token)

        // 사용자 정보를 받아온 후 스토어에 커밋 
        return api.get('/users/me')
        .then(res => {
            commit(SET_MY_INFO, res.data)
        })
        .catch()
    },
    signout({ commit }) {
        commit(DESTROY_ACCESS_TOKEN)
        commit(DESTROY_MY_INFO)
    },
    createComment ({ commit, state }, comment) {
        console.log('execute createComment in actions.js')
        const postId = state.post.id
        return api.post(`/posts/${postId}/comments`, { contents: comment })
        .then(res => {
        commit(UPDATE_COMMENT, res.data)
        })
      },
    editComment({ commit, state }, { commentId, comment }) {
        const postId = state.post.id
        return api.put(`/posts/${postId}/comments/${commentId}`, { contents: comment })
        .then(res => {
            commit(EDIT_COMMENT, res.data)
        })
        .catch()
    },
    deleteComment({ commit, state }, commentId) {
        const postId = state.post.id
        return api.delete(`/posts/${postId}/comments/${commentId}`)
        .then(res => {
            commit(DELETE_COMMENT, commentId)
        })
        .catch()
    }

}