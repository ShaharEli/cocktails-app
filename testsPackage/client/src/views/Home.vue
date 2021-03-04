<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{info}}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }, 
  data(){
    return {
      info: null
    }
  }, 
  mounted () {
    axios
      .get('/diffs')
      .then(response => (console.log(response)))
  }
}
</script>
