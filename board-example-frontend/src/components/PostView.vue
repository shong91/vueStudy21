<template>
    <div class="post-view">
        <div>
            <h1> {{ post.title }} </h1>
            <span>게시물 번호 {{ post.id }}</span>
            <strong>{{ post.user.name }} · {{ post.createdAt }}</strong>
        </div>
        <p> {{ post.contents }} </p>
    </div>
</template>

<script>
export default {
    name: 'PostView',
    props: {
        post: {
            type: Object, 
            required: true, 
            validator(post) {
                const isValidPostId = typeof post.id === 'number'
                const isValidTitle = !!post.title && post.title.length; // !! 가 뭐지? Truthy, Falsy 값을 이용한 검사 방법
                const isValidContents = post.contents && post.contents.length; 
                return isValidPostId && isValidTitle && isValidContents
                
            }
        }
    }
}
</script>

<style>

</style>