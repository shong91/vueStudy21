<template>
  <div class="memo-form">
      <!-- 동기 방식의 이벤트 처리 시(ex. submit) 리로딩을 방지하기 위해 e.preventDefault() 를 사용하여야 한다. 
      vue 에서는 prevent 옵션을 제공한다.  -->
      <form @submit.prevent="addMemo">
        <fieldset>
            <div>
                <input class="memo-form__title-form"
                        type="text"
                        v-model="title"
                        placeholder="please input title. "/>
                <textarea class="memo-form__content-form"
                        v-model="content"
                        placeholder="please input content"/>
                <button type="reset">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
            <button type="submit"> Register </button>
        </fieldset>
      </form>
  </div>
</template>

<script>
export default {
    name: 'MemoForm',
    data () {
        return {
            // 컴포넌트 내의 데이터 초기화. 사용자가 입력할 제목과 콘텐츠가 저장될 데이터의 key, value 설정
            // v-model 을 통해 데이터 바인딩 되어, 사용자가 값을 입력할 때 모델 변수(title, content) 도 갱신된다. 
            
            /*
            양방향 데이터 바인딩. 
                v-model: 한 컴포넌트 내의 바인딩 시에는 좋지만, 부모-자식 간 등 다른 컴포넌트와의 데이터 바인딩에는 부적합. 추적 어려움 
            단방향 데이터 바인딩.
                props: 상위 컴포넌트의 정보를 하위 컴포넌트에 전달
                emit: 다른 컴포넌트에게 이벤트 전달.
             */
            
            title: '',
            content: '',
        }
    },
    methods: {
        addMemo() {
            // destructuring assignment(비구조 할당) 방식으로 변수 선언. 
            const { title, content} = this; 
            const id = new Date().getTime();

            const isEmpty = title.length <= 0 || content.length <= 0; 
            if (isEmpty) {
                return false;
            }

            // addMemo 이벤트 발생, payload 로 사용자가 입력한 데이터를 넣어준다. 
            // emit(): 다른 컴포넌트로 이벤트를 전달. (부모 컴포넌트인 MemoApp 에게 전달된다. )
            this.$emit('addMemo', {id, title, content}); 
            this.resetFields(); 

        },
        resetFields() {
            this.title = ''; 
            this.content = '';

        },
    }
}
</script>

<style scoped>
.memo-form {
    margin-bottom: 24px;
    padding-bottom: 40px;
    border-bottom: 1px solid #eee; 

}

.memo-form form fieldset div { 
    position: relative;
    padding: 24px; 
    margin-bottom: 20px; 
    box-shadow: 0 40px 10px -4px rgba(0, 0, 0, 0.2);
    background-color: #ffffff; 
}

.memo-form form fieldset div button[type="reset"] {
    position: absolute;
    right: 20px; 
    bottom: 20px; 
    font-size: 16px; 
    background: none; 
}

.memo-form form fieldset button[type="submit"] {
    float: right; 
    width: 96px; 
    padding: 12px 0;
    border-radius: 4px;
    background-color: #ff5a00; 
    color: #fff; 
    font-size: 16px; 

}

.memo-form form fieldset .memo-form__title-form {
    width: 100%; 
    margin-bottom: 12px; 
    font-size: 18px; 
    line-height: 26px; 
}

.memo-form form fieldset .memo-form__content-form {
    widows: 100%;
    height: 66px; 
    font-size: 14px; 
    line-height: 22px; 
    vertical-align: top;
}

.memo-form input:focus {
    outline: none;
}

</style>