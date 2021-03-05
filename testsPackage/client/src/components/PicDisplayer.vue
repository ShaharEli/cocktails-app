<template>
  <div class="container">
    <span class="file-name">{{ data.baseFileName }}</span>
    <div class="images-container">
      <img :style="imgStyle" v-bind:src="data.basePicFile" />
      <img :style="imgStyle" v-bind:src="data.diff.data" />
      <img :style="imgStyle" v-bind:src="data.newShotsPicFile" />
      <div :style="imgStyle">
        <VueCompareImage
          :handleSize="20"
          :leftImage="data.basePicFile"
          :rightImage="data.newShotsPicFile"
        />
      </div>
      <div v-if="loading">
        <md-progress-spinner
          class="md-accent"
          md-mode="indeterminate"
        ></md-progress-spinner>
      </div>
      <md-button v-else @click="handleClick" class="md-raised"
        >Approve</md-button
      >
    </div>
    <md-snackbar
      :md-position="position"
      :md-duration="3000"
      :md-active.sync="this.error"
      md-persistent
    >
      <span>{{ error }}</span>
      <md-button class="md-primary" @click="handleClick">Retry</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import VueCompareImage from 'vue-compare-image';
import axios from 'axios';
import {globalStore} from '../utils/globalState';

export default {
  name: 'PicDisplayer',
  components: {
    VueCompareImage,
  },
  props: {
    data: Object,
  },

  data() {
    return {
      picsData: this.data,
      loading: false,
      error: false,
    };
  },
  methods: {
    async handleClick() {
      this.loading = true;
      try {
        const {basePic, newShotsPic} = this.picsData;
        const {
          data: {success},
        } = await axios.post('/approve', {basePic, newShotsPic});
        if (success) {
          const {pics: allPics} = globalStore;
          globalStore.pics = allPics.filter(
            ({basePic: basePath, newShotsPic: newPath}) =>
              basePath === basePic && newPath === newShotsPic ? false : true,
          );
        }
      } catch ({message}) {
        this.error = `Error occured, ${message}`;
        setTimeout(() => (this.error = false), 5000);
      } finally {
        this.loading = false;
      }
    },
  },

  computed: {
    imgStyle() {
      const {
        diff: {height, width},
      } = this.data;
      return {
        height: `${height / 5}px`,
        width: `${width / 5}px`,
        margin: `${10}px`,
      };
    },
  },
};
</script>



<style scoped>
BUTTON.md-button
  .md-progress-spinner.md-indeterminate.md-progress-spinner-enter,
BUTTON.md-button
  .md-progress-spinner.md-indeterminate.md-progress-spinner-leave-active {
  display: none;
}
.images-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 30px;
}
.file-name {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
