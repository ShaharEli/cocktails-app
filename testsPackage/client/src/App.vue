<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div v-if="loading">loading...</div>
    <router-view v-else />
  </div>
</template>
<script>
import axios from 'axios';
import {globalStore} from './utils/globalState';

export default {
  data() {
    return {
      localvar: globalStore.pics,
      loading: true,
    };
  },

  methods: {
    getDiffsFolders: (data) => {
      // const dirs = {};
      const diffsFiles = data.filter((files) => !!files.diff);
      // diffsFiles.forEach(({baseFileName},i)=>{
      //
      // })
      // data.map(e=>)
      return diffsFiles;
    },
  },
  async mounted() {
    try {
      if (!globalStore.pics.length) {
        const {data} = await axios.get('/diffs');
        globalStore.pics = data;
        this.getDiffsFolders(data);
      }
    } catch ({message}) {
      console.log(message);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
