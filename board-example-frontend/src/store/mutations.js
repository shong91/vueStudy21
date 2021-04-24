import { 
    FETCH_POST_LIST, FETCH_POST, 
    SET_ACCESS_TOKEN, SET_MY_INFO,
    DESTROY_ACCESS_TOKEN, DESTROY_MY_INFO,
    UPDATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT
} from './mutations-types'

import api from '@/api'
import Cookies from 'js-cookie'

export default {
    [FETCH_POST_LIST] (state, posts) {
        state.posts = posts 
    },
    [FETCH_POST] (state, post) {
        state.post = post
    },
    [SET_ACCESS_TOKEN] (state, accessToken) {
        // 로그인 성공 시 api 모듈의 HTTP 헤더에 토큰을 담는다.
        // (변이가 일어나는 부분은 mutations.js 에, api를 호출하는 부분은 actions.js 에 각각 분리시킴. )
        if(accessToken){
            console.log('SET_ACCESS_TOKEN in mutation.js: ', accessToken)
            state.accessToken = accessToken
            api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

            // 2. 쿠키에 토큰 저장
            Cookies.set('accessToken', accessToken)
        }
    },
    [SET_MY_INFO] (state, me){
        state.me = me
    },
    [DESTROY_ACCESS_TOKEN] (state) {
        state.accessToken = ''
        delete api.defaults.headers.common.Authorization
        Cookies.remove('accessToken')
        console.log('DESTROY_ACCESS_TOKEN in mutation.js: ', state.accessToken)
    },
    [DESTROY_MY_INFO] (state) {
        state.me = null
    },
    [UPDATE_COMMENT] (state, payload) {
        console.log('execute createComment in mutations.js')
        state.post.comments.push(payload)
    },
    [EDIT_COMMENT] (state, payload) {
        const { id: commentId, contents, updateAt} = payload
        const targetComment = state.post.comments.find(comment => comment.id === commentId)
        targetComment.contents = contents
        targetComment.updateAt = updateAt
    },
    [DELETE_COMMENT] (state, commentId) {
        const targetIndex = state.post.comments.findIndex(comment => comment.id === commentId)
        state.post.comments.splice(targetIndex, 1)
    }

}