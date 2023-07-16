<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="shop_toolbar_wrapper flex-column flex-md-row mb-4" >
                    <div class="shop-top-bar-left mb-md-0 mb-2" v-if="!isMobile()">
                        <div class="shop-top-show">
                            <span>Menampilakan <b>{{ this.meta.total }}</b> Produk</span>
                        </div>
                    </div>

                    <div class="shop-top-bar-right">
                        <span class="mr-1">Urutkan: </span>
                        <div class="shop-short-by mr-4">
                            <select class="nice-select" @change="getIndex()"
                                v-model="this.sort">
                                <option value="">--Pilih Urutan--</option>
                                <option value="1">Penjualan Terbanyak</option>
                                <option value="5">Promo</option>
                                <option value="2">Terbaru</option>
                                <option value="3">Harga Terendah</option>
                                <option value="4">Harga Tertinggi</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- <div class="shop_toolbar_wrapper flex-column flex-md-row mb-10" v-else>
                    <div class="shop-top-bar-left mb-md-0 mb-2">
                        <div class="shop-top-show">
                            <span>Menampilakan <b>{{ this.meta.total }}</b> Produk</span>
                        </div>
                    </div>

                    <div class="shop-top-bar-right">
                        <span class="mr-1">Urutkan: </span>
                        <div class="shop-short-by mr-4">
                            <select class="nice-select" @change="getIndex()"
                                v-model="this.$store.state.meta.sort">
                                <option value="">--Urutkan--</option>
                                <option value="1">Penjualan Terbanyak</option>
                                <option value="2">Terbaru</option>
                                <option value="3">Harga Terendah</option>
                                <option value="4">Harga Tertinggi</option>
                            </select>
                        </div>
                    </div>
                </div> -->
                <!-- <div class="form-group row" v-else>
                    <label for="staticEmail" class="col-6 col-form-label"><b>{{ this.meta.total }}</b> Produk</label>
                    <div class="col-6 shop-short-by">
                        <select class="nice-select" @change="getIndex()" 
                            style="width: 100%;"
                            v-model="this.$store.state.meta.sort">
                            <option value="">--Urutkan--</option>
                            <option value="1">Penjualan Terbanyak</option>
                            <option value="2">Terbaru</option>
                            <option value="3">Harga Terendah</option>
                            <option value="4">Harga Tertinggi</option>
                        </select>
                    </div>
                </div> -->
                <!-- Shop Wrapper Start -->
                <div class="row shop_wrapper grid_4">
                    <template  v-if="loading">
                        <template v-for="row in 8" :key="row">
                            <div class="col-xl-3 col-lg-4 col-md-4 col-6 product">
                                <content-loader  viewBox="0 0 700 1100" :speed="2" primaryColor="#f3f3f3"
                                    secondaryColor="#ecebeb" >
                                    <rect x="5" y="42" rx="3" ry="3" width="700" height="800" /> 
                                    <rect x="8" y="870" rx="3" ry="3" width="700" height="50"/> 
                                    <rect x="8" y="930" rx="3" ry="3" width="350" height="50"/> 
                                    <rect x="8" y="1000" rx="3" ry="3" width="700" height="170" /> 
                                    <!-- <rect x="11" y="128" rx="3" ry="3" width="78" height="900" />  -->
                                </content-loader>
                            </div>
                        </template>
                    </template>
                    <!-- Single Product Start -->
                    <div class="col-xl-3 col-lg-4 col-md-4 col-6 product" 
                        v-else 
                        v-for="product in this.meta.data" :key="product.id">
                        <div class="product-inner">
                            <div class="thumb">
                                <router-link :to="'/product/'+product.slug" class="image"
                                    v-lazy-container="{ selector: 'img', error: 'assets/images/loading-error.jpg', loading: 'assets/images/loading-img.gif' }">
                                    <img class="first-image" :src="product.file" :data-src="product.file" alt="Product">
                                    <img class="second-image" :src="product.file" :data-src="product.file" alt="Product">
                                </router-link>

                                <div class="actions">
                                    <a @click="copyLink('/product/'+product.slug)" title="Salin Halaman" class="action compare">
                                        <i class="fa fa-copy"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="content">
                                <h4 class="sub-title" style="display: none;">
                                    <a href="single-product.html">{{ product.category }}</a>
                                </h4>
                                <h5 class="title">
                                    <router-link :to="'/product/'+product.slug" class="image">
                                        {{ product.name }}
                                    </router-link>
                                </h5>
                                <span class="ratings">
                                    <span class="rating-num" v-if="product.rating_avg > 0">
                                        <i class="fa fa-star text-warning"></i> {{ product.rating_avg }} &nbsp;|
                                    </span> 
                                    <span class="rating-num ml-1">Terjual {{ product.sold }}</span>
                                </span>
                                <span class="price" v-if="product.discount">
                                    <span class="new">{{ product.price_discount }}</span>
                                    <span class="old">{{ product.price_rp }}</span>
                                </span>
                                <span class="price" v-else>
                                    <span class="new">{{ product.price_rp }}</span>
                                </span>
                                <div class="shop-list-btn">
                                    <button class="btn btn-sm btn-outline-danger btn-hover-primary w-100" 
                                        title="Add To Cart"
                                        :loading="loadingButton"
                                        @click="addChart(product.id)">
                                        + Keranjang
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import { ContentLoader } from 'vue-content-loader'

export default {
    components: {  
        ContentLoader, 
    }, 
    data() {
        return {
            meta: this.$store.state.meta,
            sort: 5,
            data: this.$store.state.meta.data,
            loading: true,
            loadingButton: false,
            errored: false,
        }
    },
    watch:{
        $route (to, from){
            this.getIndex();
        }
    },
    mounted() {
        this.getIndex();
    },
    methods: {
        getIndex: function() {
            this.loading = true
            this.axios.get('product?q=' + this.$store.state.meta.q + '&sort=' + this.sort)
            .then((response) => {
                this.meta.data = response.data.data;
                this.meta.total = response.data.meta.total
            })
            .catch(error => {   
                this.loading = true
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
        copyLink: function(url){
            navigator.clipboard.writeText(url)
            this.successNotif("Url berhasil disalin")
        }
        // , this.config
    }
}
</script>