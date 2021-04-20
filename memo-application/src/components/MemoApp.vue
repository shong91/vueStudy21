// MemoApp.vue 는 MemoForm[INSERT], Memo[UPDATE/DELETE] 컴포넌트의 부모 컴포넌트 
// => 부모 컴포넌트에 상태를 초기화한다. 
<template>
    <div class="memo-app">
        <memo-form />
        <memo/>
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
    }
}
</script>

<style scoped>

</style>