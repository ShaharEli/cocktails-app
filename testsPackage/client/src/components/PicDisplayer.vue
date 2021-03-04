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
    </div>
  </div>
</template>

<script>
import VueCompareImage from 'vue-compare-image';

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
      // data: props.data,
    };
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
