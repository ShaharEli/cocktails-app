<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div  v-if="info.length">
    <div  :key="pics.basePic"  v-for="pics in info">
      <div v-if="!!pics.diff">
        <img :style="imgStyle" v-bind:src="pics.basePicFile" />
        <img  :style="imgStyle"  v-bind:src="pics.diff.data" />
        <img  :style="imgStyle"  v-bind:src="pics.newShotsPicFile" />
        <div  :style="imgStyle">
        <VueCompareImage  :leftImage="pics.basePicFile" :rightImage="pics.newShotsPicFile" />;
        </div>

      </div>
    
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import VueCompareImage from 'vue-compare-image';

export default {
  name: 'Home',
  components: {
    VueCompareImage
    // HelloWorld
  }, 
  data(){
    return {
      info: []
    }
  }, 
  mounted () {
    axios
      .get('/diffs')
      .then(response => this.info = response.data).catch(({message})=>console.log(message))
  },
  computed: {
    imgStyle() {
      const {diff:{height,width}}=this.info.find(img=>img.diff)
      return {
        height: `${height/5}px`,
        width: `${width/5}px`,
        margin: 0
      };
    }
  }
}
</script>

<style scoped>
.diff-img{
  width:200px;
  height:400px;
}

</style>