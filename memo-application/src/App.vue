<template>
  <div id="app">
    <app-header :memo-count="memoCount" />
    <memo-app @change="updateMemoCount" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import MemoApp from './components/MemoApp';

export default {
  name: 'app',
  data () {
    return {
      memoCount: 0,
    }
  },
  components: {
    // import 한 컴포넌트를 등록한다. 등록된 컴포넌트는 template 영역에서 custome element 로 사용할 수 있다. 
    AppHeader,
    MemoApp
  },
  methods: {
    updateMemoCount(count) {
      this.memoCount = count; 
    }
  }
  
}
</script>

<style>
@import "./styles/reset.css";

#app {
  width: 560px;
  margin: 0 auto; 
}

</style>
