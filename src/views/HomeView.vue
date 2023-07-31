<template>

    <div class="section row-1 homepage">
        <div :class="(isMobile()) ? '' : 'container'">
            <Carousel :autoplay="6000" :wrap-around="true" :items-to-show="(isMobile() ? 1.1 : 1)">
                <Slide v-for="slide in 4" :key="slide">
                    <div class="carousel__item">
                        <div class="banner">
                            <div class="banner-image">
                                <a :href="'assets/images/slider/' + slide + (isMobile() ? '-mobile' : '') + '.png'">
                                    <img :src="'assets/images/slider/' + slide + (isMobile() ? '-mobile' : '') + '.png'" alt="Banner Image">
                                </a>
                                <!-- <a href="shop-grid.html"><img src="assets/images/slider/slide-1.jpg" alt="Banner Image"></a> -->
                            </div>
                            <!-- <div class="info">
                                <div class="small-banner-content">
                                    <h4 class="sub-title">Up to <span>{{ slide }}%</span> Off</h4>
                                    <h3 class="title">Office Dress</h3>
                                    <a href="shop-grid.html" class="btn btn-primary btn-hover-dark btn-sm">Shop Now</a>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </Slide>
                <template #addons>
                <Navigation v-if="!isMobile()"/>
                <Pagination />
                </template>
            </Carousel>
        </div>
    </div>

  
    <div class="section section-margin row-2" :class="(isMobile()) ? 'pb-4 pt-5 mt-3 mb-5' : ''">
        <div class="container">
            <div class="row mb-n5">
                <div class="col-lg-3 col-md-6 col-3 mb-5">
                    <div class="feature flex-column text-center">
                        <div class="icon w-100 mb-4">
                            <img src="assets/images/icons/feature-icon-2.png" alt="Feature Icon">
                        </div>
                        <div class="content ps-0 w-100">
                            <h5 class="title mb-2">Gratis Ongkir</h5>
                            <p v-if="!isMobile()">Khusus Produk Digital gak perlu Ongkos Kirim dan gratis biaya Jasa Aplikasi. Ongkir hanya produk berfisik </p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-3 mb-5">
                    <div class="feature flex-column text-center">
                        <div class="icon w-100 mb-4">
                            <img src="assets/images/icons/feature-icon-3.png" alt="Feature Icon">
                        </div>
                        <div class="content ps-0 w-100">
                            <h5 class="title mb-2">Support 24/7</h5>
                            <p v-if="!isMobile()">Admin yang fast response! Ada kendala? kita bantu sampai solved & Free remote Teamviewer / anydesk</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-3 mb-5">
                    <div class="feature flex-column text-center">
                        <div class="icon w-100 mb-4">
                            <img src="assets/images/icons/feature-icon-4.png" alt="Feature Icon">
                        </div>
                        <div class="content ps-0 w-100">
                            <h5 class="title mb-2">Garansi Refund</h5>
                            <p v-if="!isMobile()">Produk kami semua Garansi Life time, jika ada kendala kita bisa refund pastinya</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-3 mb-5">
                    <div class="feature flex-column text-center">
                        <div class="icon w-100 mb-4">
                            <img src="assets/images/icons/feature-icon-1.png" alt="Feature Icon">
                        </div>
                        <div class="content ps-0 w-100">
                            <h5 class="title mb-2">Promo Menarik</h5>
                            <p v-if="!isMobile()">Selalu ada promo menarik untuk pelanggan terpilih, seperti pembelian banyak atau pelanggan kita</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section mb-5">
        <ProductList :keyword="''">
        </ProductList>
    </div>
</template>

<script>
// @ is an alias to /src
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import ProductList from '/src/components/ProductList.vue'

export default {
    name: 'HomeView',
    components: {  
        Carousel, Slide, Pagination, Navigation, ProductList, 
    }, 
    data() {
        return {
            user : null,
        }
    },
    mounted() {
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;
    },
}
</script>

