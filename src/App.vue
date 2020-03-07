<template>
  <div id="app">
    <pro-header></pro-header>
    <router-view />
  </div>
</template>

<script>
import proHeader from '@/components/header'
export default {
  data() {
    return {

    }
  },
  methods: {
  },
  components: {
    proHeader
  }
}
</script>

<style lang="scss">
@import './assets/css/common.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
