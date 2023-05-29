<template>
 <div class="section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb-content mt-3 mb-2">
                        <ul>
                            <li> <a href="/">Home </a> </li>
                            <li class="active"> {{ this.detail.category }}</li>
                            <li class="active"> {{ this.detail.name   }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 offset-lg-0 col-md-8 offset-md-2 col-custom">
                    <div v-if="loading">
                        <content-loader viewBox="0 0 100 200" :speed="1" style="position: relative; top: -140px;"  primaryColor="#f3f3f3"
                        secondaryColor="#ecebeb" >
                            <rect x="5" y="42" rx="3" ry="3" width="88" height="78" /> 
                            <rect x="8" y="139" rx="3" ry="3" width="82" height="12" /> 
                            <rect x="11" y="128" rx="3" ry="3" width="78" height="1" /> 
                        </content-loader>
                    </div>
                    <div class="product-details-img" v-else>
                        <div class="single-product-img swiper-container gallery-top">
                            <a class="swiper-slide w-100" @click="showModal = true">
                                <img class="w-100" :src="detail.file" alt="Product">
                            </a>
                        </div>
                        <!-- Single Product Thumb Start -->
                        <div class="single-product-thumb swiper-container gallery-thumbs">
                            <Carousel :items-to-show="3">
                                <Slide v-for="fileData in detail.files" :key="fileData.name" 
                                    style="height: 117px;width: 117px; padding: 0px; margin-right: 10px;">
                                    <div class="carousel__item">
                                        <img :src="fileData.path" @click="preview" :alt="fileData.name" style="width: 117px;"
                                            :name="fileData.name"
                                            :class="(fileData.name == activeImg) ? 'active' : ''">
                                    </div>
                                </Slide>
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-custom">

                    <!-- Product Summery Start -->
                    <div class="product-summery position-relative">

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
                                    <td>: <b><router-link :to="'/'+detail.category">{{ detail.category }}</router-link></b></td>
                                </tr>
                                <tr>
                                    <td>Stok</td>
                                    <td>: <b>{{ detail.stock }}</b></td>
                                </tr>
                            </table>
                        </div>
                       
                        <!-- SKU End -->

                        <!-- Description Start -->
                        <p class="desc-content mb-5 mt-1" v-html="detail.desc"></p>

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
                                <button class="btn btn-outline-danger btn-hover-danger"
                                    @click="addChart(detail.id)"
                                    :disabled="loadingButton">
                                    + Keranjang
                                </button>
                            </div>
                            <div class="add-to-wishlist">
                                <button class="btn btn-danger btn-hover-danger" 
                                    @click="cartCheckout(detail)"
                                    :disabled="loadingButton">
                                    Beli Langsung
                                </button>
                            </div>
                        </div>
                        <!-- Social Shear Start -->
                        <div class="social-share">
                            <span>Bagikan : {{  }}</span>
                            <!--  -->
                            <a @click="copyLink(currentBaseUrl()+$route.fullPath)" style="cursor: pointer;">
                                <i class="fa fa-copy text-primary"></i>
                            </a>

                            <ShareNetwork
                                network="whatsapp"
                                :url="currentBaseUrl()+$route.fullPath"
                                :title="+'Yuk beli '+ detail.name + ' Di bins shop!'"
                            >
                                <i class="fa fa-whatsapp whatsapp-color"></i>
                            </ShareNetwork>
                            <ShareNetwork
                                network="facebook"
                                :url="currentBaseUrl()+$route.fullPath"
                                :title="+'Yuk beli '+ detail.name + ' Di bins shop!'"
                                hashtags="binsshop"
                            >
                                <i class="fa fa-facebook-square facebook-color"></i>
                            </ShareNetwork>
                            <ShareNetwork
                                network="twitter"
                                :url="currentBaseUrl()+$route.fullPath"
                                :title="+'Yuk beli '+ detail.name + ' Di bins shop!'"
                                hashtags="binsshop"
                            >
                                <i class="fa fa-twitter twitter-color"></i>
                            </ShareNetwork>
                            <ShareNetwork
                                network="linkedin"
                                :url="currentBaseUrl()+$route.fullPath"
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
                                    <div class="col-md-3">
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
                                    <div class="col-md-9">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="shop_toolbar_wrapper flex-column flex-md-row mb-5" style="border: none; padding: 0px;">
                                                    <div class="shop-top-bar-left mb-md-0 mb-2">
                                                        <div class="shop-top-show">
                                                            <span>Menampilakan <b>{{ detail.rating_count }}</b> Produk</span>
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
                                                        <div class="review_thumb">
                                                            <img :src="rating.user.avatar"  
                                                                referrerpolicy="no-referrer" style="border-radius: 100%;width: 45px;">
                                                        </div>
                                                        <div class="review_details ml-0">
                                                            <div class="review_info mb-2">
                                                                <div class="review-title-date d-flex">
                                                                    <h5 class="title" style="font-size: 16px;">{{ rating.user.name }} </h5>
                                                                    <span class="ml-1"> {{ dateOuput2(rating.created_at) }}</span>
                                                                </div>

                                                                <span class="ratings justify-content-start mb-3">
                                                                    <star-rating 
                                                                        v-model:rating="rating.rating" 
                                                                        :star-size="15" 
                                                                        read-only="true">
                                                                    </star-rating>
                                                                </span>
                                                            </div>
                                                            <p>
                                                                {{ rating.desc }}
                                                            </p>
                                                        </div>
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
                            <div class="desc-content p-3 pt-0">
                                <div class="mb-4">
                                    <i class="pe-7s-comment"></i> Ada pertanyaan? diskusikan dengan penjual
                                </div>
                                <div class="single-review d-flex mb-4">
                                    <div class="review_thumb" v-if="user">
                                        <img :src="user.avatar"  
                                            referrerpolicy="no-referrer" style="border-radius: 100%; width: 45px;">
                                    </div>
                                    <div class="review_details ml-0 p-0" style="width: 100%;">
                                        <textarea class="form-control" style="border: none; padding-right: 125px;" placeholder="Tulis diskusi disini"
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
                                                <div class="shop-top-show">
                                                    <span>Menampilakan <b>{{ detail.discussions.length }}</b> Diskusi</span>
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
                                                <template v-if="detail.parent != 'null'">
                                                    <div class="review_thumb">
                                                        <img :src="discussion.user.avatar"  
                                                            referrerpolicy="no-referrer" style="border-radius: 100%;width: 45px;">
                                                    </div>
                                                    <div class="review_details ml-0" style="width: 100%;">
                                                        <div class="review_info mb-2">
                                                            <div class="review-title-date d-flex">
                                                                <h5 class="title" style="font-size: 16px;">{{ discussion.user.name }} </h5>
                                                                <span class="ml-1"> {{ dateOuput2(discussion.created_at) }}</span>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            {{ discussion.desc }}
                                                        </p>
                                                        <div class="replay">
                                                            <div class="input-group mb-3">
                                                                <span class="input-group-text" 
                                                                    style="background: transparent;border: none; padding-left: 0px;"
                                                                    v-if="user">
                                                                    <img :src="user.avatar"  
                                                                        referrerpolicy="no-referrer" style="border-radius: 100%; width: 30px;">
                                                                </span>
                                                                <input type="text" class="form-control" placeholder="Isi komentar disini"
                                                                    v-model="discus.desc_parent[index]">
                                                                <span class="input-group-text" style="background: #ff4545;cursor: pointer;"
                                                                    @click="discusPost(detail, discussion.id, index)">
                                                                    <button class="btn btn-primary btn-hover-primary btn-sm"> Kirim </button>
                                                                </span>
                                                            </div>

                                                            <div class="input-group mb-2 ml-2"
                                                                v-for=" replay in discussion.replay">
                                                                <span class="input-group-text" 
                                                                    style="background: transparent;border: none;padding-top: 0px;"
                                                                    v-if="replay">
                                                                    <img :src="replay.user.avatar"  
                                                                        referrerpolicy="no-referrer" style="border-radius: 100%; width: 30px;">
                                                                </span>
                                                                <p> 
                                                                    <span class="mr-1" style="font-size: 16px;">
                                                                        {{ replay.user.name }}
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

            <ProductRecomend 
                v-bind:excludeProps="this.$route.params.slug">
            </ProductRecomend>

        </div>
    </div>

    <div class="modal" :class="(showModal) ? 'show' : ''" tabindex="-1" :style="(showModal) ? 'display: block; background: radial-gradient(black, transparent);' : 'display: none;'">
        <div class="modal-dialog modal-lg" style="margin-top: 150px;">
            <div class="modal-content">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="showModal=false"
                    style="position: absolute;right: 10px;top: 10px"></button>
                <img src="http://bins.local/api/v1/storage/2016_1.png">
            </div>
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
            showModal: false,
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
            this.axios.get('product/'+this.$route.params.slug)
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
            this.loadingButton = true
            this.form.product = product;
            const dataSumm = {
                amount : product.price_final * this.form.qty,
                qty : this.form.qty,
                product: this.form.product,
                direct: true,
            }
            this.axios.post('checkout', dataSumm, this.$store.state.config)
            .then((response) => {
                var that = this;
                window.snap.pay(response.data.token, {
                    onSuccess: function(result){
                        that.successNotif('Pembayaran berhasil... Pesanan dalam proses')
                        that.cartCreated(that, result, response.data.token);
                    },
                    onPending: function(result){
                        that.successNotif('Pesanan berhasil dibuat... Silahkan lanjutkan pembayaran')
                        that.cartCreated(that, result, response.data.token);
                    },
                    onError: function(result){
                        that.successNotif('Pesanan gagal, Silahkan muat ulang halaman')
                    },
                    onClose: function(){
                        return false;
                    },
                })
                // window.snap.pay(response.data.token);
            })
            .catch(error => {
                this.errorNotif(error)
            })
            .finally(
                () => this.loadingButton = false
            )
        },
        cartCreated: function (that, result, snap) {
            const dataSumm = {
                amount : that.form.product.price_final * that.form.qty,
                qty : that.form.qty,
                product: that.form.product,
                snapData: snap,
                midtrans: result,
                direct: true,
            }
            that.axios.post('order', dataSumm, that.$store.state.config)
            .then((response) => {
                // console.log(response);
                that.countNotif();
                that.$router.push('/order');
            })
            .catch(error => {
                that.errorNotif(error)
            })
            
            that.totalHarga = 0;
            that.totalBarang = 0;
            that.data.map(function(cart, key){                
                // delete cart & insert order 
                if (cart.status === true || cart.status === false) {
                    if (cart.status === true) {
                        that.axios.delete('chart/' + cart.id, that.$store.state.config)
                        .then((response) => {
                            that.cartData(false)
                            that.countChart();
                        })
                        .catch(error => { })
                    } 
                }
            });
        },
       
        discusPost: function(product, parent = null, key = null) {
            this.loadingButton = true
            this.discus.product_id = product.id
            this.discus.parent = parent
            this.discus.desc_key = key
            // console.log(parent);
            // console.log(this.discus);
            // return false;
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
            navigator.clipboard.writeText(url)
            this.successNotif("Url berhasil disalin")
        }

    }
}
</script>

