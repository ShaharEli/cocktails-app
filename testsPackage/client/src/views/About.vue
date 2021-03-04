<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script>
import {globalStore} from '../utils/globalState';

export default {
  name: 'About',
  components: {},
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