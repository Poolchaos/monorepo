<template>
  <div>
    <h3>Hello world</h3>

    <table>
      <thead>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Amount</td>
        <td>Date</td>
        <td>Days Since Payment made</td>
      </thead>
      <tbody>
      <tr v-bind:key="item.device_id" v-for="item in payments">
        <td>{{ item.first_name }}</td>
        <td>{{ item.last_name }}</td>
        <td>R{{ item.amount }}</td>
        <td>{{ item.last_payment_date }}</td>
        <td>{{ item.days_passed }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';

import axios from 'axios';
import AsyncComputed from 'vue-async-computed'

Vue.use(AsyncComputed);

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  asyncComputed: {
    async payments() {
      const baseURI = 'http://localhost:3000/users'
      const res = await axios.get(baseURI);
      console.log(' ::>> res.data >>>> ', res.data);
      if (res && res.data) {
        return res.data;
      }
      console.error('Failed to get csv content. Make sure that the Express server is running.');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="scss" scoped>
h3 {
  margin: 40px 0 0;
}
table {
  width: 80%;
  min-width: 800px;
  margin: auto;

  /* td */
}
</style>
