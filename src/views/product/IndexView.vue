<template>
<div class="section mb-5 mt-5">
    <ProductList>
    </ProductList>
    </div>
</template>

<script>

import ProductList from '/src/components/ProductList.vue'

export default {
    name: 'HomeView',
    components: {  
         ProductList, 
    }, 
    data() {
        return {
        }
    }
}
</script>