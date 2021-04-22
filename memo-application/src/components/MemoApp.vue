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
                    @updateMemo="updateMemo" />
        </ul>
    </div>
</template>

<script>
import MemoForm from './MemoForm';
import Memo from './Memo';

export default {
    name: 'MemoApp',
    components: {
        MemoForm,
        Memo
    },
    data() {
        return {
            memos: []
        }
    },
    created(){
        // 1. 만약 기존에 추가된 localStorage 에 데이터가 있다면 created 훅에서 해당 데이터를 컴포넌트 내의 memos 데이터에 넣어주고, 
        // 그렇지 않다면 그대로 빈 배열로 초기화한다. 
        this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
    },
    methods: {
        addMemo(payload) {
            // MemoForm 에서 올려받은 데이터를 먼저 컴포넌트 내부 데이터에 추가한다. 
            this.memos.push(payload); 

            // 내부 데이터를 문자열로 변환 후, 로컬 스토리지에 저장. 
            this.storeMemo(); 

        },
        storeMemo() {
            const memosToString = JSON.stringify(this.memos); 
            localStorage.setItem('memos', memosToString); 

        },
        deleteMemo(id) {
            // 1. 자식 컴포넌트에서 인자로 전달해주는 id에 해당하는 메모 데이터의 인덱스를 찾는다. 
            const targetIndex = this.memos.findIndex(v => v.id === id); 
            // 2. 해당 인덱스 번호에 해당하는 메모 데이터를 삭제한다. 
            this.memos.splice(targetIndex, 1); 
            // 3. 삭제된 후의 데이터를 다시 로컬 스토리지에 저장. 
            this.storeMemo(); 
        },
        updateMemo(payload) {
            const {id, content} = payload; 
            const targetIndex = this.memos.findIndex(v => v.id === id);
            const targetMemo = this.memos[targetIndex]; 
            this.memos.splice(targetIndex, 1,  {...targetMemo, content}); 
            this.storeMemo(); 
        }
    }
}
</script>

<style scoped>
.memo-list {
    padding: 20px 0; 
    margin: 0; 
}
</style>