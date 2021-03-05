<template>
  <div class="about">
    <div>
      <div
        v-bind:key="brunch"
        v-for="brunch of getBrunches.brunches"
        v-bind:class="
          brunch === getBrunches.currentBrunch ? 'current-brunch' : 'brunch'
        "
        @click="() => handleClick(brunch)"
      >
        <span v-bind:class="brunch === activeBrunch && 'active-brunch'">
          {{ brunch }}
        </span>
      </div>
    </div>
    <div v-if="loading">
      <md-progress-spinner
        class="md-accent"
        md-mode="indeterminate"
      ></md-progress-spinner>
    </div>
  </div>
</template>


<script>
import {globalStore} from '../utils/globalState';
import axios from 'axios';

export default {
  name: 'Brunches',
  components: {},
  data() {
    return {
      info: globalStore.pics,
      activeBrunch: null,
      loading: false,
    };
  },
  computed: {
    getBrunches() {
      return globalStore.brunches;
    },
  },
  methods: {
    async handleClick(brunch) {
      this.loading = true;
      this.activeBrunch = brunch;
      try {
        const {data: brunchDiffs} = await axios.get(`/brunch/${brunch}`);
        console.log(brunchDiffs);
      } catch ({message}) {
        console.log(message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped >
.images-container {
  display: flex;
  flex-wrap: wrap;
}
.active-brunch {
  color: blue;
}
.current-brunch {
  font-weight: bold;
  cursor: pointer;
}
.brunch {
  cursor: pointer;
}
</style>