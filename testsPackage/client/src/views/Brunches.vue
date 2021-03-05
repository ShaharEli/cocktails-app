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
    <div v-if="brunchDiffs.length">
      <div
        v-for="diffs of brunchDiffs.filter((img) => !!img.diff)"
        v-bind:key="diffs.basePic"
      >
        <PicDisplayer :data="diffs" />
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
import PicDisplayer from '../components/PicDisplayer';

export default {
  name: 'Brunches',
  components: {
    PicDisplayer,
  },
  data() {
    return {
      info: globalStore.pics,
      activeBrunch: null,
      loading: false,
      brunchDiffs: [],
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
        this.brunchDiffs = brunchDiffs.pics;
      } catch ({message}) {
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