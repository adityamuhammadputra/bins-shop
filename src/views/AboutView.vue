<template>
    <div class="section pt-2 mb-5" :class="(isMobile() ? '' : 'mt-5')">
        <div class="container">
            <div class="row mb-n6">
                <div class="col-lg-6 align-self-center mb-6 aos-init aos-animate" data-aos="fade-right" data-aos-delay="600">
                    <div class="about_content">
                        <h2 class="title">Cerita Kami</h2>
                        <h3 class="sub-title">Kenapa kami membuat bins.shop ?</h3>
                        <p>Bins shop dibuat sebagai alternatif untuk penjualan lisensi original yang berkualitas, karena sebelumnya kita fokus berjualan di tokopedia dan shopee. Akan tetapi entah ada yang iri atau mungkin hanya sekedar iseng, produk kita selalu hilang di dua marcket place raksasa tersebut</p>
                        <h3 class="sub-title">Sudah Terjual Ribuan ? </h3>
                        <p>Ya, sudah terjual ribuan di tokopedia dan shoope dengan berbagai ulasan Positif, tapi apa daya namanya dalam dunia bisnis ada saja kendala dan itu menjadi alasan kami kenapa harus membuat Bins Shop</p>
                    </div>
                </div>
                <div class="col-lg-6 mb-6 aos-init aos-animate" data-aos="fade-left" data-aos-delay="600">
                    <div class="about_thumb">
                        <img class="fit-image" src="assets/images/about/1.jpg" alt="About Image">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section section-margin row-2" :class="(isMobile()) ? 'pb-4 pt-5 mt-3 mb-5' : ''">
        <div class="container">
            <h2 class="title text-center mb-5 pb-5 pt-5">Apa yang kamu dapatkan?</h2>
            <div class="row mb-n5 pt-5">
                <div class="col-lg-3 col-md-6 col-6 mb-5">
                    <div class="feature flex-column text-center">
                        <div class="icon w-100 mb-4">
                            <img src="assets/images/icons/feature-icon-2.png" alt="Feature Icon">
                        </div>
                        <div class="content ps-0 w-100">
                            <h5 class="title mb-2">Gratis Ongkir</h5>
                            <p>Produk digital, tanpa ongkos kirim pastinya. Jika ingin fisik seperti foto produk, bisa request juga kok</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-6 mb-5">
                    <div class="feature flex-column text-center">
                        <div class="icon w-100 mb-4">
                            <img src="assets/images/icons/feature-icon-3.png" alt="Feature Icon">
                        </div>
                        <div class="content ps-0 w-100">
                            <h5 class="title mb-2">Support 24/7</h5>
                            <p>Admin yang fast response! Ada kendala? kita bantu sampai solved & Free remote Teamviewer / anydesk</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-6 mb-5">
                    <div class="feature flex-column text-center">
                        <div class="icon w-100 mb-4">
                            <img src="assets/images/icons/feature-icon-4.png" alt="Feature Icon">
                        </div>
                        <div class="content ps-0 w-100">
                            <h5 class="title mb-2">Garansi Refund</h5>
                            <p>Produk kami semua Garansi Life time, jika ada kendala kita bisa refund pastinya</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-6 mb-5">
                    <div class="feature flex-column text-center">
                        <div class="icon w-100 mb-4">
                            <img src="assets/images/icons/feature-icon-1.png" alt="Feature Icon">
                        </div>
                        <div class="content ps-0 w-100">
                            <h5 class="title mb-2">Promo Menarik</h5>
                            <p>Selalu ada promo menarik untuk pelanggan terpilih, seperti pembelian banyak atau pelanggan kita</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section section-margin mt-0">
        <div class="container">
            <h2 class="title text-center mb-5 pt-5" :class="(isMobile() ? '' : 'pb-4')">Ulasan pelanggan kami</h2>
            <p></p>
            <div class="row mb-n6 pt-2">
                <Carousel :autoplay="3000" :wrap-around="true" :items-to-show="(isMobile()) ? 1 : 3.3" class="p-0-mobile">
                    <Slide v-for="slide in 12" :key="slide">
                        <div class="carousel__item">
                            <div class="banner ">
                                <div class="banner-image">
                                    <a href=""><img src="assets/images/banner/banner-1.jpg" alt=""></a>
                                </div>
                                <div class="info">
                                    <div class="small-banner-content">
                                        <h4 class="sub-title">{{ slide }}</h4>
                                        <h3 class="title">Get Offer <br>For Summer</h3>
                                        <a href="shop-grid.html" class="btn btn-dark btn-sm">Shop Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slide>
                    <template #addons>
                    <Navigation />
                    <Pagination />
                    </template>
                </Carousel>
            </div>
        </div>
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
           
        }
    },
}
</script>
