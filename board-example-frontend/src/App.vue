<template>
  <div id="app">
    <router-view name="header"/>
    <!-- name 이 없는 router-view 는 name="default" -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import 'http://localhost:8000/assets/index.css'; 

</style>
