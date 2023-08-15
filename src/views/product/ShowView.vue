<template>
 <div class="section">
        <div class="container">
            <div class="row" v-if="!isMobile()">
                <div class="col-12" >
                    <div class="mt-1" v-if="loading" style="position: relative;top: 5px;">
                        <content-loader viewBox="0 0 200 4" :speed="1" primaryColor="#f3f3f3" secondaryColor="#ecebeb">
                            <rect x="0" y="0" rx="0" ry="0" width="63" height="2" /> 
                        </content-loader>
                    </div>
                    <div class="breadcrumb-content mt-3 mb-2" v-else>
                        <ul>
                            <li> <a href="/">Home </a> </li>
                            <li class="active"> {{ this.detail.category }}</li>
                            <li class="active"> {{ this.detail.name   }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="row" v-else>
                <div class="col-12" id="title-mobile" style="position: absolute;z-index: 11;margin-top: 10px;">
                    <h5 class="title mb-2"> 
                        <router-link :to="($route.query.back) ? '/' + $route.query.back : '/product'" class="image">
                            <span class="fa fa-angle-left"></span> 
                            Kembali 
                        </router-link>
                    </h5>
                </div>

                <!-- <div class="col-12" id="title-mobile">
                    <h5 class="title mb-0" style="position: absolute;z-index: 11;margin-top: 10px;">
                        <router-link :to="($route.query.back) ? '/' + $route.query.back : '/product'">
                            <i class="fa fa-arrow-left"></i> Kembali
                        </router-link>
                    </h5>
                </div> -->
            </div>

            <div class="row">
                <div class="wrap-loading" v-if="loadingButton">
                    <img src="/assets/images/loading3.gif"/>
                    <p>Loading....</p>
                </div>
                <div class="col-lg-4 offset-lg-0 col-md-8 offset-md-2 col-custom p-0-mobile">
                    <div v-if="loading">
                        <content-loader viewBox="0 0 100 200" :speed="1" primaryColor="#f3f3f3"
                        secondaryColor="#ecebeb" >
                            <rect x="0" y="4" rx="1" ry="1" width="100" height="92" /> 
                            <rect x="0" y="100" rx="1" ry="1" width="100" height="35" /> 
                        </content-loader>
                    </div>
                    <div class="product-details-img" v-else>
                        <div class="single-product-img swiper-container gallery-top" >
                            <a class="swiper-slide w-100" 
                                v-lazy-container="{ selector: 'img', error: '/assets/images/loading-error.jpg', loading: '/assets/images/loading-img.gif' }">
                                <img class="w-100" :src="detail.file" :data-src="detail.file" alt="Product">
                            </a>
                        </div>
                        <!-- Single Product Thumb Start -->
                        <div class="single-product-thumb swiper-container gallery-thumbs">
                            <Carousel :items-to-show="3" :mouseDrag="false" :touchDrag="false">
                                <Slide v-for="fileData in detail.files" :key="fileData.name" 
                                    style="height: 32%;width: 32%; padding: 0px; margin-right: 7px;">
                                    <div v-lazy-container="{ selector: 'img', error: '/assets/images/loading-error.jpg', 
                                     loading: '/assets/images/loading-img.gif' }">
                                    <img :src="fileData.path" 
                                        :data-src="fileData.path"
                                        @click="preview" :alt="fileData.name" style="width: 117px;"
                                        :name="fileData.name"
                                        :class="(fileData.name == activeImg) ? 'active' : ''">
                                    </div>

                                </Slide>
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-custom">
                    <div v-if="loading" :style="(isMobile() ? 'position: fixed;z-index: 11111;top: 596px;width: 100%;left: 0;' : '')">
                        <content-loader viewBox="0 0 100 200" :speed="1"  primaryColor="#f3f3f3"
                                secondaryColor="#ecebeb" >
                            <rect x="0" y="2" rx="1" ry="1" width="100" height="8" /> 
                            <rect x="0" y="10" rx="1" ry="1" width="80" height="3" /> 
                            <rect x="0" y="16" rx="1" ry="1" width="50" height="7" /> 
                            <rect x="0" y="25" rx="1" ry="1" width="30" height="5" /> 
                            <rect x="0" y="32" rx="1" ry="1" width="50" height="20" /> 
                            <rect x="0" y="55" rx="1" ry="1" width="100" height="60" v-if="!isMobile()"/> 
                        </content-loader>
                    </div>
                    <!-- Product Summery Start -->
                    <div class="product-summery position-relative" v-else>

                        <!-- Product Head Start -->
                        <div class="product-head mb-1">
                            <h2 class="product-title mb-0">{{ detail.name }}</h2>
                            <div class="sku">
                                <span class="mr-1">Terjual {{ detail.sold }}</span>
                                
                                <span class="mr-1" v-if="detail.rating_avg">
                                    <i class="fa fa-star text-warning"></i> {{ detail.rating_avg }} ({{ detail.rating_count }} rating)
                                </span>
                                <span class="mr-1" v-if="detail.discussions">
                                    <i class="pe-7s-comment"></i> Diskusi ({{ detail.discussions.length }})
                                </span>
                            </div>
                        </div>
                        <!-- Product Head End -->

                        <!-- Price Box Start -->

                        <div class="price-box mb-2" v-if="detail.discount">
                            <span class="regular-price">{{ detail.price_discount }}</span>
                            <span class="old-price"><del>{{ detail.price_rp }}</del></span>
                        </div>

                        <div class="price-box mb-2" v-else>
                            <span class="regular-price">{{ detail.price_rp }}</span>
                        </div>

                        <div class="col-lg-12 col-custom single-product-tab">
                            <ul class="nav nav-tabs pt-1" style="border-top: none;">
                                <li class="nav-item pl-0">
                                    <a class="nav-link active">Detail Produk</a>
                                </li>
                            </ul>
                        </div>
                       
                        <div class="sku mb-0">
                            <table>
                                <tr>
                                    <td>Kategori</td>
                                    <td>:</td>
                                    <td><b><router-link :to="'/'+detail.category">{{ detail.category }}</router-link></b></td>
                                </tr>
                                <tr>
                                    <td>Stok</td>
                                    <td>:</td>
                                    <td><b>{{ detail.stock }}</b></td>
                                </tr>
                                <tr>
                                    <td style="width: 110px;">Minimal Order</td>
                                    <td style="width: 10px;">:</td>
                                    <td><b>{{ detail.minorder }}</b></td>
                                </tr>
                                <tr v-if="detail.weight">
                                    <td>Berat Produk</td>
                                    <td>:</td>
                                    <td><b>{{ detail.weight }} Gram</b></td>
                                </tr>
                                <tr v-if="detail.weight">
                                    <td style="vertical-align: top;" colspan="3">
                                        <div class="alert alert-info d-flex align-items-center mt-2 py-2" role="alert">
                                            <div>
                                                <span class="fa fa-check text-primary"></span>
                                                <b> Produk ini tersedia fisik seperti difoto produk</b>
                                                <p style="font-size: 12px;font-style: italic;color: grey;position: relative;top: -2px;">
                                                    Kamu bisa pilih apakah perlu dikirim fisik atau tidak. Menggunakan jasa kirim pilihan kamu :)
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        

                        <p class="desc-content mb-5 mt-3" v-html="detail.desc"></p>
                        <!-- <span  v-for="(line, index) of detail.desc.split('\r\n')" 
                            :key="index" v-if="detail.desc">
                            {{ line }}<br/>
                        </span> -->

                        <!-- Quantity Start -->
                        <div class="quantity mb-5">
                            <div class="cart-plus-minus">
                                <input class="cart-plus-minus-box" v-model="form.qty" type="number">
                                <div class="dec qtybutton" @click="(form.qty > 1) ? form.qty-- : form.qty">
                                    <i class="fa fa-minus"></i>
                                </div>
                                <div class="inc qtybutton" @click="(form.qty < detail.stock) ? form.qty++ : form.qty">
                                    <i class="fa fa-plus"></i>
                                </div>
                            </div>
                        </div>
                        <!-- Quantity End -->

                        <!-- Cart & Wishlist Button Start -->
                        <div class="cart-wishlist-btn mb-4">
                            <div class="add-to_cart">
                                <button class="btn btn-danger btn-hover-danger"
                                    @click="addChart(detail.id)"
                                    :disabled="loadingButton">
                                    + Keranjang
                                </button>
                            </div>
                            <div class="add-to-wishlist">
                                <button class="btn btn-outline-danger btn-hover-danger" 
                                    @click="cartCheckout(detail)"
                                    :disabled="loadingButton">
                                    Beli Langsung
                                </button>
                            </div>
                        </div>
                        <!-- Social Shear Start -->
                        <div class="social-share">
                            <span>
                                <a 
                                    :href="'https://api.whatsapp.com/send/?phone=62816262439&text=Hai min, mau tanya produk ini %0a' + 'https://binsshop.tech'+$route.fullPath + '&type=phone_number&app_absent=0'" 
                                    target="_blank"
                                    style="cursor: pointer;">
                                    <i class="pe-7s-chat"></i> Chat 
                                </a>
                            </span>
                            |
                            <span> Bagikan : {{  }}</span>
                            <!--  -->
                            <a @click="copyLink('https://binsshop.tech'+$route.fullPath)" style="cursor: pointer;">
                                <i class="fa fa-copy text-primary"></i>
                            </a>

                            <ShareNetwork
                                network="whatsapp"
                                :url="'https://binsshop.tech'+$route.fullPath"
                                :title="+'Yuk beli '+ detail.name + ' Di bins shop!'"
                            >
                                <i class="fa fa-whatsapp whatsapp-color"></i>
                            </ShareNetwork>
                            <ShareNetwork
                                network="facebook"
                                :url="'https://binsshop.tech'+$route.fullPath"
                                :title="+'Yuk beli '+ detail.name + ' Di bins shop!'"
                                hashtags="binsshop"
                            >
                                <i class="fa fa-facebook-square facebook-color"></i>
                            </ShareNetwork>
                            <ShareNetwork
                                network="twitter"
                                :url="'https://binsshop.tech'+$route.fullPath"
                                :title="+'Yuk beli '+ detail.name + ' Di bins shop!'"
                                hashtags="binsshop"
                            >
                                <i class="fa fa-twitter twitter-color"></i>
                            </ShareNetwork>
                            <ShareNetwork
                                network="linkedin"
                                :url="'https://binsshop.tech'+$route.fullPath"
                                :title="+'Yuk beli '+ detail.name + ' Di bins shop!'"
                                hashtags="binsshop"
                            >
                                <i class="fa fa-linkedin-square linkedin-color"></i>
                            </ShareNetwork>
                        </div>
                    </div>

                </div>
            </div>

            <div class="row section-margin" style="margin-top: 3rem !important; margin-bottom: 3rem;" v-if="detail">
                <div class="col-lg-12 col-custom single-product-tab">
                    <ul class="nav nav-tabs" style="padding-bottom: 0px; border-top: 0px; border-bottom: 1px solid #ebebeb;">
                        <li class="nav-item">
                            <a class="nav-link" :class="(activeTab == 'rating') ? 'active' : ''" @click="activeTab = 'rating'">
                                Ulasan Pembeli ({{ detail.ratings.length }})
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" :class="(activeTab == 'discus') ? 'active' : ''" @click="activeTab = 'discus'">
                                Diskusi ({{ detail.discussions.length }})
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content mb-text pt-0">
                        <div class="tab-pane " :class="(activeTab == 'rating') ? 'active fade show' : ''">
                            <div class="desc-content p-3">
                                <div class="row" v-if="detail.rating_count > 0">
                                    <div class="col-md-3 mb-1-mobile p-0-mobile">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="rating-avg">
                                                    <i class="fa fa-star text-warning"></i>
                                                    <b>{{ detail.rating_avg }}</b>
                                                    <p>Penilaisan rata-rata pembeli</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-9 p-0-mobile">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="shop_toolbar_wrapper flex-column flex-md-row mb-5" style="border: none; padding: 0px;">
                                                    <div class="shop-top-bar-left mb-md-0 mb-2">
                                                        <div class="shop-top-show" v-if="!isMobile()">
                                                            <span>Menampilkan <b>{{ detail.rating_count }}</b> Ulasan</span>
                                                        </div>
                                                    </div>
                                                    <div class="shop-top-bar-right">
                                                        <span class="mr-1">Urutkan: </span>
                                                        <div class="shop-short-by mr-0">
                                                            <select class="nice-select">
                                                                <option value="1" selected>Terbaru</option>
                                                                <option value="2">Terlama</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="section-body mb-5">
                                                    <div class="single-review d-flex mb-4"
                                                        v-for="rating in detail.ratings" :key="rating.id">
                                                        <template v-if="rating.user">
                                                            <div class="review_thumb">
                                                                <img :src="rating.user.avatar"  
                                                                    referrerpolicy="no-referrer" style="border-radius: 100%;width: 45px;">
                                                            </div>
                                                            <div class="review_details ml-0">
                                                                <div class="review_info mb-2">
                                                                    <div class="review-title-date d-flex">
                                                                        <h5 class="title" style="font-size: 14px;">{{ rating.user.name }} </h5>
                                                                        <span class="ml-1"> 
                                                                            {{ (isMobile() ? dateOuput(rating.created_at) : dateOuput2(rating.created_at)) }}
                                                                        </span>
                                                                    </div>

                                                                    <span class="ratings justify-content-start mb-3">
                                                                        <star-rating 
                                                                            v-model:rating="rating.rating" 
                                                                            :star-size="15" 
                                                                            :read-only="true">
                                                                        </star-rating>
                                                                    </span>
                                                                </div>
                                                                <p>
                                                                    {{ rating.desc }}
                                                                </p>
                                                            </div>
                                                        </template>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-else>
                                    <div class="card">
                                        <div class="card-body" >
                                            <i class="pe-7s-info"></i> Belum ada ulasan Produk ini
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" :class="(activeTab == 'discus') ? 'active fade show' : ''">
                            <div class="desc-content p-3 pt-0 p-0-mobile">
                                <div class="mb-4">
                                    <i class="pe-7s-comment"></i> Ada pertanyaan? diskusikan disini
                                </div>
                                <div class="single-review d-flex mb-4">
                                    <div class="review_thumb" v-if="user">
                                        <img :src="user.avatar"  
                                            referrerpolicy="no-referrer" style="border-radius: 100%; width: 45px;">
                                    </div>
                                    <div class="review_details ml-0 p-0" style="width: 100%;">
                                        <textarea class="form-control" style="border: none; padding-right: 110px;" placeholder="Tulis diskusi disini"
                                            v-model="discus.desc"></textarea>
                                        <button class="btn btn-outline-primary btn-hover-primary" style="position: absolute;right: 10px;top: 11px;"
                                            @click="discusPost(detail)"> 
                                            Kirim 
                                        </button>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-body" v-if="detail.discussions.length > 0">

                                        <div class="shop_toolbar_wrapper flex-column flex-md-row mb-5" style="border: none; padding: 0px;">
                                            <div class="shop-top-bar-left mb-md-0 mb-2">
                                                <div class="shop-top-show" v-if="!isMobile()">
                                                    <span>Menampilkan <b>{{ detail.discussions.length }}</b> Diskusi</span>
                                                </div>
                                            </div>
                                            <div class="shop-top-bar-right">
                                                <span class="mr-1">Urutkan: </span>
                                                <div class="shop-short-by mr-0">
                                                    <select class="nice-select">
                                                        <option selected value="1">Terbaru</option>
                                                        <option value="2">Terlama</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="section-body mb-2">
                                            <div class="single-review d-flex mb-2 pb-3" style="border-bottom: 1px solid #e7e7e7;"
                                                v-for="(discussion, index) in detail.discussions" v-bind:key="discussion.id">
                                                <template v-if="detail.parent != 'null' && discussion.user">
                                                    <div class="review_thumb">
                                                        <img :src="discussion.user.avatar"  
                                                            referrerpolicy="no-referrer" style="border-radius: 100%;width: 45px;">
                                                    </div>
                                                    <div class="review_details ml-0" style="width: 100%;">
                                                        <div class="review_info">
                                                            <div class="review-title-date d-flex">
                                                                <h5 class="title" style="font-size: 14px;">{{ discussion.user.name.split(' ')[0] }} </h5>
                                                                <span class="ml-1"> {{ dateOuput2(discussion.created_at) }}</span>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            {{ discussion.desc }}
                                                        </p>
                                                        <div class="replay mt-3">
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text" 
                                                                    style="background: transparent;border: none; padding-left: 0px;"
                                                                    v-if="user">
                                                                    <img :src="user.avatar"  
                                                                        referrerpolicy="no-referrer" style="border-radius: 100%; width: 30px;">
                                                                </span>
                                                                <input type="text" class="form-control" placeholder="Isi komentar disini"
                                                                    v-model="discus.desc_parent[index]">
                                                                <span class="input-group-text p-0-mobile" style="background: #ff4545;cursor: pointer;"
                                                                    @click="discusPost(detail, discussion.id, index)">
                                                                    <button class="btn btn-primary btn-hover-primary btn-sm"> Kirim </button>
                                                                </span>
                                                            </div>

                                                            <div class="input-group mb-2"
                                                                v-for=" replay in discussion.replay">
                                                                <span class="input-group-text" 
                                                                    style="background: transparent;border: none;padding-top: 0px; padding-left: 2px;"
                                                                    v-if="replay">
                                                                    <img :src="replay.user.avatar"  
                                                                        referrerpolicy="no-referrer" style="border-radius: 100%; width: 30px;">
                                                                </span>
                                                                <p>
                                                                    <span class="mr-1" style="font-size: 16px;">
                                                                        {{ replay.user.name.split(' ')[0] }}
                                                                    </span>
                                                                    <span style="color:#7e7e7e;">{{ dateOuput2(replay.created_at) }}</span><br/>
                                                                    {{ replay.desc }}
                                                                </p> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        
                                        </div>
                                    </div>
                                    <div class="card-body" v-else>
                                        <i class="pe-7s-info"></i> Belum ada diskusi Produk ini
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProductRecomend>
            </ProductRecomend>

        </div>
    </div>

</template>


<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ContentLoader } from 'vue-content-loader'
import StarRating from 'vue-star-rating'

import ProductRecomend from '/src/components/ProductRecomend.vue'

export default {
    name: 'HomeView',
    components: {  
        Carousel, Slide, Pagination, Navigation, ContentLoader, ProductRecomend, StarRating
    }, 
    data() {
        return {
            data: [],
            detail: '',
            activeImg: 'img1',
            activeTab: 'rating',
            discus: {
                parent : '',
                product_id : '',
                desc : '',
                desc_parent : [],
                desc_key : '',
            },
            form: {
                qty: 1,
                price: '',
                product: '',
            },
            loading: true,
            errored: false,
            showMobileMenu: false,
            loadingButton: false
        }
    },
    watch:{
        $route (to, from){
            this.getData();
        }
    },
    created() {
        this.getData();
    },
    mounted() {
        if(this.$route.query.as) { 
            this.successNotif('Kamu login sebagai ' + this.$route.query.as)
        }
        this.stickyTitleToHeader()
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;
    },
    // beforeRouteUpdate() {
    //     console.log(this.$route.params);
    //     this.getData();
    // },
    methods: {
        preview: function(e){
            this.activeImg = e.target.name;
            this.detail.file = e.target.src;
        },
        getData: function(loadingBypass = false) {
            if (loadingBypass == false) 
                this.loading = true
            this.axios.get('product/'+this.$route.params.slug, this.$store.state.config)
            .then((response) => {
                this.detail = response.data.data;
            })
            .catch(error => {
                this.loading = true
                this.$router.push('/404');
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
        cartCheckout: function(product) {
            if (!this.$store.state.auth.user) {
                this.errorHasLogin('Opps... Login untuk lanjutkan checkout', '/user?back=' + this.$route.path)
                return false;
            }
            this.loadingButton = true
            this.form.product = product;
            const dataSumm = {
                amount : product.price_final * this.form.qty,
                qty : this.form.qty,
                product: this.form.product,
                direct: true,
            }
            // console.log(dataSumm);
            this.$store.state.default.carts = dataSumm;
            this.$router.push('/product/payment');
        },
        discusPost: function(product, parent = null, key = null) {
            if (!this.$store.state.auth.user) {
                this.errorHasLogin('Opps... Login untuk lanjutkan diskusi', '/user?back=' + this.$route.path)
                return false;
                // this.errorNotifMsg('Opps... Silahkan login terlebih dahulu')
                // return false;
            }
            this.loadingButton = true
            this.discus.product_id = product.id
            this.discus.parent = parent
            this.discus.desc_key = key
            this.axios.post('discuss', this.discus, this.$store.state.config)
            .then((response) => {
                this.successNotif(response.data.message)
                this.getData(true);
                this.discus.desc = ''
                this.discus.desc_parent = [];
                this.discus.desc_key = '';
            })
            .catch(error => {
                this.errorNotif(error)
            })
            .finally(
                () => this.loadingButton = false
            )
        },
        copyLink: function(url){
            console.log(url);
            navigator.clipboard.writeText(url)
            this.successNotif("Url berhasil disalin")
        },
    }
}
</script>

