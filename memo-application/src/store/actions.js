import axios from 'axios'; 
import { FETCH_MEMOS, ADD_MEMO, DELETE_MEMO, UPDATE_MEMO } from './mutations-types'; 


// actions 을 사용할 때에는 API 응답 내의 메모 데이터를 commit() 을 통해 변이시켜야 한다. 
// (스토어의 상태를 직접 변경할 수 없다. )

const memoAPICore = axios.create({
    baseURL: 'http://localhost:8080/api/memos'

});

// 사용할 함수 정의 
export function fetchMemos ({ commit }) {
    // MemoApp 의 created() 훅에서 실행되는 함수를 가져온다. 
    memoAPICore.get('/')
    .then(res => {
        commit(FETCH_MEMOS, res.data);
    })
    .catch(); 
}

export function addMemo ({ commit}, payload) {
    memoAPICore.post('/', payload)
    .then(res => {
        // ADD_MEMO 변이를 호출하고, API를 통해 받아온 메모 데이터를 넘겨준다. 
        commit(ADD_MEMO, res.data);
    })
    .catch(); 
}

export function deleteMemo({ commit }, id) {
    memoAPICore.delete(`/${id}`)
    .then(() => {
        commit(DELETE_MEMO, id); 
    })
    .catch(); 

}

export function updateMemo({ commit }, payload){
    const { id, content } = payload; 
    memoAPICore.put(`${id}`, { content })
    .then(() => {
        commit(UPDATE_MEMO, payload); 
    })
    .catch(); 

}

export default {
    fetchMemos,
    addMemo
}