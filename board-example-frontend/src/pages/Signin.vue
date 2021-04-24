<template>
  <div class="sign-in-page">
        <h3>로그인</h3>
        <signin-form @submit="onSubmit" />
        <p>회원이 아니신가요? 
            <router-link :to="{ name: 'Signup'}"> 회원가입 하러가기 </router-link>
        </p>
  </div>
</template>

<script>
import SigninForm from '../components/SigninForm.vue'
import { mapActions } from 'vuex'

export default {
    components: { SigninForm },
    name: 'Signin',
    methods: {
        onSubmit(payload){
            // JWT 추가로 공부 - 실습까지 해볼것
            this.signin(payload)
            .then(res => {
                alert('로그인이 완료되었습니다. ')
                console.log('sucessfully login !! ')
                this.$router.push({ name: 'PostListPage'})
            })
            .catch(err => {
                alert(err.response.data.msg)
            })
        },
         ...mapActions([
            'signin',
        ]),
    }, 
}
</script>

<style>

</style>