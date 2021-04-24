import api from '@/api'
import { FETCH_POST_LIST, FETCH_POST, SET_ACCESS_TOKEN, SET_MY_INFO } from './mutations-types'

export default {
    fetchPostList({ commit }){
        return api.get('/posts')
        .then(res => {
            commit(FETCH_POST_LIST, res.data); // 응답으로 내려온 게시물 데이터를 FETCH_POST_LIST 변이의 실행과 함께 인자로 넘겨준다.  
        })
        .catch(); 
    },
    fetchPost({ commit }, postId) {
        return api.get(`/posts/${postId}`)
        .then(res => {
            commit(FETCH_POST, res.data)
        })
        .catch();
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
    }

}