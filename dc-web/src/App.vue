<template>
  <div id="app">
    <dc-index/>
    <router-view/>
  </div>
</template>

<script>
import Index from './pages/index.vue';
export default {
  components:{
    'dc-index': Index
  },
  name: 'App'
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
