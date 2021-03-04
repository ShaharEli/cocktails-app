<template>
  <div class="container">
    <span>{{ data.baseFileName }}</span>
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
      <div v-on:click="handleClick">Approve</div>
    </div>
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
    };
  },
  methods: {
    async handleClick() {
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
        return '';
      } catch ({message}) {
        console.log(message);
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
.images-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
