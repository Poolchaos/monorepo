<template>
  <div id="app">
    <PaymentHistory />
  </div>
</template>

<script>
import PaymentHistory from './components/PaymentHistory.vue'

export default {
  name: 'App',
  components: {
    PaymentHistory
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
