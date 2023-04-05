<template>
  <div v-if="$route.fullPath === '/login'">
    <router-view/>
  </div>
  <div v-else>
    <HeaderTemp></HeaderTemp>
    <router-view/>
    <FooterTemp></FooterTemp>
  </div>



</template>

<style lang="scss">

</style>


<script>
import HeaderTemp from './components/TempHeader.vue'
import FooterTemp from './components/TempFooter.vue'
import { ref } from 'vue'

export default {
    components : {
      HeaderTemp,
      FooterTemp,
    }, 
    data() {
        return {
          theme: ref('light'),
        }
    },
    methods: {
      onClick() {
        this.theme.value = this.theme.value === 'light' ? 'dark' : 'light'
        console.log(this.theme.value);
      },
    }
}


</script>