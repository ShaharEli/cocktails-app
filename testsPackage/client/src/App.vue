<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/brunches">Brunches</router-link>
    </div>
    <div v-if="loading">
      <md-progress-spinner
        class="md-accent"
        md-mode="indeterminate"
      ></md-progress-spinner>
    </div>
    <router-view v-else />
  </div>
</template>
<script>
import axios from 'axios';
import {globalStore} from './utils/globalState';
const useDarkTheme = () => import('vue-material/dist/theme/default-dark.css');

export default {
  data() {
    return {
      loading: true,
    };
  },

  async mounted() {
    try {
      const {
        data: {theme: appTheme},
      } = await axios.get('/theme');
      if (appTheme === 'dark') {
        useDarkTheme();
      }
      const {data: brunches} = await axios.get('/brunches');
      globalStore.brunches = brunches;
      globalStore.theme = appTheme;
      if (!globalStore.pics.length) {
        const {
          data: {pics: allPics},
        } = await axios.get('/diffs');

        globalStore.pics = allPics;
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
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}
#nav {
  padding: 30px;
  font-size: 20px;
}
#nav a {
  font-weight: bold;
  margin-right: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
