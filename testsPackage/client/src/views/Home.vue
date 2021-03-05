<template>
  <div class="home">
    <div v-if="getPics.length">
      <div
        :key="pics.basePic"
        v-for="pics in getPics.filter((img) => !!img.diff)"
      >
        <PicDisplayer :data="pics" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PicDisplayer from '../components/PicDisplayer';
import {globalStore} from '../utils/globalState';

export default {
  name: 'Home',
  components: {
    PicDisplayer,
  },
  computed: {
    getPics() {
      return globalStore.pics;
    },
  },
};
</script>

<style scoped >
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>