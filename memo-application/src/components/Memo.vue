<template>
  <li class="memo-item">
    <strong> {{ memo.title }} </strong>
    <p @dblclick="handleDbClick"> 
        <template v-if="!isEditing">
            {{ memo.content }}
        </template>
        <!-- update 용 필드 -->
        <input v-else
                type="text"
                ref="content"
                :value="memo.content"
                @keydown.enter="updateMemo"/>
    </p>

    <button type="button" @click="deleteMemo">
        <i class="fas fa-times"></i>
    </button>

  </li>
</template>

<script>
export default {
    name: 'Memo', 
    data () {
        return {
            isEditing: false, 
        }
    },
    // 1. 부모에게 내려받은 props 를 등록한다. (MemoApp > ul > v-for :memo="memo")
    props: {
        memo: {
            type: Object, 
        }
    },
    methods: {
        deleteMemo() {
            const id = this.memo.id; 
            // 부모 컴포넌트의 deleteMemo methods 로 이벤트 전달 
            this.$emit('deleteMemo', id); 
        },
        handleDbClick (){
            this.isEditing = true; 
            // 데이터 값이 변경됨에 따라 리렌더링 할 때, 1)리렌더링 2)refs.content 값 참조 의 순으로 되어야 하나, 이 순서는 보장되지 않는다. (content is undefined)
            // =>  이를 방지하기 위해 nextTick() 사용: Vue.js에서 데이터갱신 후 UI까지 완료한 뒤에 nextTick에 있는 함수를 최종적으로 수행한다. 
            this.$$nextTick(() => {
                this.$$refs.content.focus();
            });
        },

        updateMemo(e) {
            const id = this.memo.id; 
            const content = e.target.value.trim(); 

            // isEmpty 처리
            if(content.length <= 0) {
                return false; 
            }

            this.$emit('updateMemo', {id, content}); 
            this.isEditing = false; 
            
        }
    }
}
</script>

<style scoped>
.memo-item {
    overflow: hidden; 
    position: relative; 
    margin-bottom: 20px;
    padding: 24px; 
    box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    list-style: none;
}

.memo-item button {
    background: none;
    position: absolute;
    right: 20px; 
    top: 20px; 
    font-size: 20px; 
    color: #e5e5e5; 
    border: 0; 
}

.memo-item strong {
    display: block; 
    margin-bottom: 12px;
    font-size: 18px; 
    font-weight: normal;
    word-break: break-all;
}

.memo-item p {
    margin: 0;
    font-size: 14px; 
    line-height: 22px;
    color: #666; 
}

.memo-item p input[type="text"] {
    box-sizing: border-box;
    width: 100%;
    font-size: inherit; 
    border: 1px solid #999; 
}
</style>