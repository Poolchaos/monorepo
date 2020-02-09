<template>
  <h3>Hello world</h3>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  beforeMount: function() {
    console.log('Component has been created!');
    this.fetchUsers();
  },
  methods: {
    fetchUsers: function () {
      const baseURI = 'http://localhost:3000/users'
      axios.get(baseURI)
      .then((result) => {
        console.log(' ::>> users >>>> ', result);
        this.users = result.data;
      })
      .catch((error) => {
        console.error(' ::>> an error occurred >> ', error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
