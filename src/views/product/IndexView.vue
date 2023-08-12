<template>
    <div class="header section" id="myHeader" v-if="isMobile()" style="height: 55px;">
        <div class="header-bottom">
            <div class="">
                <div class="container">
                    <div class="row align-items-center mt-4" style="padding-top: 2px;">
                        <!-- Header Logo Start -->
                        <div class="col-1">
                            <router-link :to="($route.query.back) ? '/' + $route.query.back : '/'">
                                <span class="fa fa-angle-left" style="margin-right: 1rem;font-size: 24px;font-weight: bold;"></span> 
                            </router-link> 
                        </div>
                        <div class="col-11" style="padding-right: 20px;">
                            <div class="error_form">
                                <form class="search-form-error" @submit.prevent="search">
                                    <router-link to="/product"> 
                                        <input class="input-text" placeholder="Cari di Bins" type="text" v-model="q" 
                                            ref="input"> 
                                        <button class="submit-btn" type="submit">
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
        <ProductList :keyword="this.q">
        </ProductList>
    </div>
</template>

<script>

import ProductList from '/src/components/ProductList.vue'
// import { nextTick } from 'vue';

export default {
    name: 'ProductView',
    components: {  
         ProductList, 
    }, 
    mounted() {
        // this.focusOnEditButton()
        if (this.isMobile() == true) {
            this.$refs.input.focus()
        }
        // this.$nextTick(this.$refs.input.focus())
        // this.$refs.qx.focus = 'x'
        // nextTick(() => {
        //     console.log(this.$refs.qx);
        // });
    },
    data() {
        return {
            q: '',
        }
    },
    methods: {
        focusOnEditButton() {
            this.$nextTick(() => {
                const editButtonRef = this.$refs.input;
                console.log(editButtonRef);
                editButtonRef.focus();
            });
            // const editButtonRef = this.$refs.input;
            //     editButtonRef.focus();
        }
    }
}
</script>