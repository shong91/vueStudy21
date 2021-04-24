<template>
    <form @submit.prevent="submit" nonvalidate>
        <fieldset>
        <input v-model="name"
                type="text"
                placeholder="이름을 입력해주세요."/>
        <input v-model="email"
                type="text"
                placeholder="이메일을 입력해주세요."/>
        <input type="password"
                v-model="password"
                placeholder="비밀번호를 입력해주세요."/>
        <input type="password"
                v-model="passwordConfirm"
                placeholder="비밀번호를 다시 입력해주세요." />
        <button type="submit">회원가입</button>
        </fieldset>
    </form>
  
</template>

<script>
export default {
    name: 'SignupForm',
    data (){
        return {
            name: '', 
            email: '', 
            password: '',
            passwordConfirm: ''
        }
    },
    methods: {
        submit(){
            const {name, email, password, passwordConfirm } = this
            if(!name || !email || !password || !passwordConfirm) {
                alert('모든 항목을 입력해주세요. ')
            }

            if(password !== passwordConfirm) {
                alert('비밀번호가 일치하지 않습니다. ')
                return
            }

            this.$emit('submit', {name, email, password })
            
        }
    },

}
</script>

<style>

</style>