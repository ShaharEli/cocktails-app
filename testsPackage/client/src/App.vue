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
const darkTheme = () => import('vue-material/dist/theme/default-dark.css');

export default {
  data() {
    return {
      localvar: globalStore.pics,
      loading: true,
    };
  },

  async mounted() {
    try {
      if (!globalStore.pics.length) {
        const {
          data: {pics: allPics, theme: appTheme},
        } = await axios.get('/diffs');
        console.log(appTheme);
        if (appTheme === 'dark') {
          darkTheme();
        }
        globalStore.pics = allPics;
        globalStore.theme = appTheme;
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
.dark {
  background-color: 'red';
  /* @import 'vue-material/dist/theme/default-dark.css'; */
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
