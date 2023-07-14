<template>
    <div class="header section" id="myHeader" v-if="isMobile()" style="height: 55px;">
        <div class="header-bottom">
            <div class="">
                <div class="container">
                    <div class="row align-items-center mt-5" id="title-mobile" style="margin-top: 1.3rem !important;">
                        <!-- Header Logo Start -->
                        <div class="col-1">
                            <router-link :to="($route.query.back) ? '/' + $route.query.back : '/'">
                                <span class="fa fa-angle-left"></span> 
                            </router-link> 
                        </div>
                        <div class="col-11" style="padding-right: 20px;">
                            <div class="error_form">
                                <form class="search-form-error" @submit.prevent="search">
                                    <router-link to="/product"> 
                                        <input class="input-text" placeholder="Cari di Bins" type="text" v-model="this.$store.state.meta.q">
                                        <button class="submit-btn" type="button"  @click="search">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </router-link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section mb-5 mt-5 m-0-mobile">
        <ProductList>
        </ProductList>
    </div>
</template>

<script>

import ProductList from '/src/components/ProductList.vue'

export default {
    name: 'ProductView',
    components: {  
         ProductList, 
    }, 
    data() {
        return {
        }
    }
}
</script>