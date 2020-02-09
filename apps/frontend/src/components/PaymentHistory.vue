<template>
  <div>
    <h3>Payment History</h3>
    
    <div>
      <label>Filter:</label>
      <input v-model="filterText" placeholder="client_id" />
      <button v-on:click="filter(filterText)">Search</button>
      <button v-on:click="filter()">Clear</button>
    </div>

    <table>
      <thead>
        <td>Client Id</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Amount</td>
        <td>Date of payment</td>
        <td>Days till suspended</td>
      </thead>
      <tbody>
      <tr
        v-bind:key="item.device_id"
        v-for="item in payments"
        v-bind:class="{
          sespension: item.days_to_sespension > 0 && item.days_to_sespension <= 30, 
          grace: item.days_to_sespension > 30 && item.days_to_sespension <= 60, 
          covered: item.days_to_sespension > 60 && item.days_to_sespension <= 90, 
          suspended: item.days_to_sespension === 0
        }"
      >
        <td class="selectable" v-on:click="filter(item.client_id)">{{ item.client_id }}</td>
        <td>{{ item.first_name }}</td>
        <td>{{ item.last_name }}</td>
        <td>R{{ item.amount }}</td>
        <td>{{ item.last_payment_date }}</td>
        <td>{{ item.days_to_sespension === 0 ? 'Suspended' : item.days_to_sespension }}</td>
      </tr>
      <tr v-if="!payments || payments.length === 0">
        <td colspan="6">No search results found</td>
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
  name: 'PaymentHistory',
  props: {
    filterText: String
  },
  asyncComputed: {
    async payments() {
      return await this.retrievePayments(null);
    }
  },
  methods: {
    retrievePayments: async function(cid) {
      const baseURI = 'http://localhost:3000/payments'
      const res = await axios.get(baseURI + (cid ? '?cid=' + cid : ''));
      if (res && res.data) {
        return res.data;
      }
      console.error('Failed to get csv content. Make sure that the Express server is running.');
      return [];
    },
    filter: async function(cid) {
      this.payments = await this.retrievePayments(cid);
    }
  }
}

</script>

<style scoped>
table {
  width: 90%;
  min-width: 800px;
  margin: auto;
}

td {
  padding: 5px;
}

tr.covered { background: #D5E5ED; }
tr.grace { background: #D5EDE5; }
tr.sespension { background: #EDE5D5; }
tr.suspended { background: #EDD5E5; }
td.selectable { cursor: pointer; }
td.selectable:hover { background: #5E585F; color: #ffffff; }

input {
  margin: 5px 10px;
  border: 0px;
  background: #464B4E;
  padding: 5px 25px;
  border-radius: 3px;
  color: #fff;
  width: 253px;
}

button {
  background: #34383A;
  color: #fff;
  border: 0px;
  border-radius: 3px;
  padding: 5px 25px;
  margin: 5px;
  cursor: pointer;
}
</style>
