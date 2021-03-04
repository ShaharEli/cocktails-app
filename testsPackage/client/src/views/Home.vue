<template>
  <div class="home">
    <div v-if="info.length">
      <div :key="pics.basePic" v-for="pics in info.filter((img) => !!img.diff)">
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
  data() {
    return {
      info: globalStore.pics,
    };
  },
};
</script>

<style scoped >
.images-container {
  display: flex;
  flex-wrap: wrap;
}
</style>