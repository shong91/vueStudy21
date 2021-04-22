// MemoApp.vue 는 MemoForm[INSERT], Memo[UPDATE/DELETE] 컴포넌트의 부모 컴포넌트 
// => 부모 컴포넌트에 상태를 초기화한다. 
<template>
    <div class="memo-app">
        <!-- v-on:addMemo == @addMemo: child 컴포넌트의 addMemo 이벤트 콜백 함수로 연결한다. -->
        <memo-form @addMemo="addMemo"/>

        <ul class="memo-list">
            <memo v-for="memo in memos"
                    :key="memo.id"
                    :memo="memo"
                    @deleteMemo="deleteMemo"
                    @updateMemo="updateMemo" 
                    :editingId="editingId" 
                    @setEditingId="SET_EDITING_ID"
                    @resetEditingId="RESET_EDITING_ID" />
        </ul>
    </div>
</template>

<script>
import MemoForm from './MemoForm';
import Memo from './Memo';

import axios from 'axios';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'; 
import { SET_EDITING_ID, RESET_EDITING_ID } from '../store/mutations-types'; 

const memoAPICore = axios.create({
    baseURL: 'http://localhost:8000/api/memos'
});

export default {
    name: 'MemoApp',
    components: {
        MemoForm,
        Memo
    },
    /* 기존 데이터는 삭제하고, mapState 헬퍼 함수를 이용하여 memos 데이터를 교체한다.
    // data() {
    //     return {
    //         memos: []
    //     }
    // },
    */
    computed: {
        ...mapState([
            'memos',
            'editingId',
        ])
    },
    created(){
        /* step1: localstrage 에 저장하기 
            // 1. 만약 기존에 추가된 localStorage 에 데이터가 있다면 created 훅에서 해당 데이터를 컴포넌트 내의 memos 데이터에 넣어주고, 
            // 그렇지 않다면 그대로 빈 배열로 초기화한다. 
            this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
        */
        
        /* step2: REST API 연동 
        memoAPICore.get('/')
        .then(res => {
            this.memos = res.data; 
        })
        .catch(); 
        */

       // step3: vuex 의 heler 함수 사용 - 주입된 actions 의 함수를 호출. 
       this.fetchMemos(); 

    },
    methods: {
        addMemo(payload) {
            /* step1: localstrage 에 저장하기 
                // MemoForm 에서 올려받은 데이터를 먼저 컴포넌트 내부 데이터에 추가한다. 
                this.memos.push(payload); 
                // 내부 데이터를 문자열로 변환 후, 로컬 스토리지에 저장. 
                this.storeMemo(); 
            */

            memoAPICore.post('/', payload)
            .then(res => {
                this.memos.push(res.data); 
            })
            .catch();

            // memoCount를 root로 넘겨줘야함.. => 컴포넌트가 늘어날수록 비효율적인 방법 
            // => Vuex 라이브러리 사용 !
            // this.$emit('change', this.memos.length)

        },
        storeMemo() {
            const memosToString = JSON.stringify(this.memos); 
            localStorage.setItem('memos', memosToString); 

        },
        deleteMemo(id) {
            /* step1: localstrage 에 저장하기
                // 1. 자식 컴포넌트에서 인자로 전달해주는 id에 해당하는 메모 데이터의 인덱스를 찾는다. 
                const targetIndex = this.memos.findIndex(v => v.id === id); 
                // 2. 해당 인덱스 번호에 해당하는 메모 데이터를 삭제한다. 
                this.memos.splice(targetIndex, 1); 
                // 3. 삭제된 후의 데이터를 다시 로컬 스토리지에 저장. 
                this.storeMemo(); 
            */

            const targetIndex = this.memos.findIndex(v => v.id === id); 
            memoAPICore.delete(`/${id}`)
            .then(()=> {
                this.memos.splice(targetIndex, 1); 
            }).catch(); 

            // memoCount를 root로 넘겨줘야함..
            // this.$emit('change', this.memos.length)

        },
        updateMemo(payload) {
             /* step1: localstrage 에 저장하기
                const {id, content} = payload; 
                const targetIndex = this.memos.findIndex(v => v.id === id);
                const targetMemo = this.memos[targetIndex]; 
                this.memos.splice(targetIndex, 1,  {...targetMemo, content}); 
                this.storeMemo(); 
            */
            
            const {id, content} = payload; 
            const targetIndex = this.memos.findIndex(v => v.id === id);
            const targetMemo = this.memos[targetIndex]; 
            
            memoAPICore.put(`/${id}`, {content})
            .then(() => {
               this.memos.splice(targetIndex, 1,  {...targetMemo, content}); 
            })
            .catch();
        },
        // vuex 의 heler 함수 사용
        ...mapActions ([
           'fetchMemos',
           'addMemo',
           'deleteMemo',
           'updateMemo'

       ]), 
       ...mapMutations ([
           SET_EDITING_ID, 
           RESET_EDITING_ID,
       ])

    }
}


</script>

<style scoped>
.memo-list {
    padding: 20px 0; 
    margin: 0; 
}
</style>