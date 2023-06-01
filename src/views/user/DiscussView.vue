<template>
    <div class="section mt-5 mb-5 mt-1-mobile">
        <div class="container">

            <div class="row" v-if="user">
                <div class="col-lg-12">
                    <div class="myaccount-page-wrapper">
                        <div class="row">
                            <div class="col-lg-3 col-md-4">
                                <TabMenu v-bind:url="'discuss'"></TabMenu>
                            </div>
                            <!-- My Account Tab Menu End -->

                            <!-- My Account Tab Content Start -->
                            <div class="col-lg-9 col-md-8" v-if="this.loading === true">
                                <content-loader style="position: relative; top: -70px;" viewBox="0 0 400 200" :speed="1" primaryColor="#f3f3f3"
                                    secondaryColor="#ecebeb" >
                                    <rect x="10" y="42" rx="3" ry="3" width="40" height="40" /> 
                                    <rect x="10" y="95" rx="3" ry="3" width="120" height="22" /> 
                                </content-loader>
                            </div>

                            <div class="col-lg-9 col-md-8" v-else>
                                <div class="shop_toolbar_wrapper flex-column flex-md-row mb-4">
                                    <div class="shop-top-bar-left" v-if="!isMobile()">
                                        <div class="shop-top-show">
                                            <span>Menampilakan <b>{{ dataDiscuss.length }}</b> Diskusi</span>
                                        </div>
                                    </div>
                                    <div class="shop-top-bar-right">
                                        <span class="mr-1">Tampilkan: </span>
                                        <div class="shop-short-by mr-4">
                                            <select class="nice-select" v-model="status" @change="discussIndex">
                                                <option value="">--Semua Diskusi--</option>
                                                <option value="1">Sudah Dibalas</option>
                                                <option value="2">Belum Dibalas</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="card mb-4 col-custom single-product-tab" 
                                    v-if="dataDiscuss.length > 0"
                                    v-for="(discuss, indexDiscuss) in dataDiscuss" v-bind:key="discuss.id">
                                    <div class="card-header" style="background: white;border: none;">
                                        <div class="comment-area-wrapper">
                                            <div class="single-comment-wrap mb-2" 
                                                style="height: 60px;border-bottom: 1px solid #e9e9e9;">
                                                <router-link :to="'/product/'+discuss.product.slug+ '?back=discuss'" class="image author-thumb"
                                                    style="width: 50px;">
                                                    <img :src="discuss.product.file" alt="Author">
                                                </router-link>
                                                <div class="comments-info">
                                                    <p class="mb-0" style="font-size: 14px;">
                                                        <router-link :to="'/product/'+discuss.product.slug+ '?back=discuss'" class="image">
                                                            {{ discuss.product.name }}
                                                        </router-link>
                                                    </p>
                                                    <p class="mb-0">
                                                        <b>{{ (discuss.product.price_discount) ? discuss.product.price_discount : discuss.product.price_rp }}</b> &nbsp;
                                                        <del v-if="discuss.product.price_discount" style="font-size: 12px;"> 
                                                            {{ discuss.product.price_discount }} ({{ discuss.product.discount }})
                                                        </del>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card-body comment-area-wrapper pt-1">
                                        <div class="single-review d-flex " >
                                            <template v-if="discuss.parent != 'null'">
                                                <div class="review_thumb">
                                                    <img :src="discuss.user.avatar"  
                                                        referrerpolicy="no-referrer" style="border-radius: 100%;width: 45px;">
                                                </div>
                                                <div class="review_details ml-0" style="width: 100%;">
                                                    <div class="review_info mb-2">
                                                        <div class="review-title-date d-flex">
                                                            <h5 class="title" style="font-size: 16px;">{{ discuss.user.name.split(' ')[0] }} </h5>
                                                            <span class="ml-1"> {{ dateOuput2(discuss.created_at) }}</span>
                                                        </div>
                                                    </div>
                                                    <p>
                                                        {{ discuss.desc }}
                                                    </p>
                                                    <div class="replay" v-if="discuss.replay.length > 0">
                                                        <div class="input-group"
                                                            v-for="replay in discuss.replay">
                                                            <span class="input-group-text" 
                                                                style="background: transparent;border: none;padding-top: 0px; padding-left: 0px;" 
                                                                v-if="replay">
                                                                <img :src="replay.user.avatar"  
                                                                    referrerpolicy="no-referrer" style="border-radius: 100%; width: 30px;">
                                                            </span>
                                                            <p> 
                                                                <span class="mr-1" style="font-size: 16px;">
                                                                    {{ replay.user.name.split(' ')[0] }}
                                                                </span>
                                                                <span style="color:#7e7e7e;">
                                                                    {{ dateOuput2(replay.created_at) }}
                                                                </span><br/>
                                                                {{ replay.desc }}
                                                            </p> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <!-- <div class="card-footer text-muted">
                                        <router-link :to="'/order/'" class="text-danger pull-right mr-1"
                                            >
                                            <b>Lihat Detail </b>
                                        </router-link>
                                    </div> -->
                               </div>
                               <div class="card mb-4 text-center" v-else>
                                    <div class="card-body">
                                        <img src="/assets/images/keranjang-kosong.png" alt="keranjang-kosong" style="width: 400px;"/>
                                            <h5>Waaah Diskusimu kosong!</h5>
                                            <p>Dari pada kosong, yuk lihat Produk Lainnya barang untuk kamu. kali aja cocok :D</p>
                                            <router-link to="/product" class="btn btn-primary">Lihat Produk Lainnya</router-link> 
                                    </div>
                                </div>
                            </div> <!-- My Account Tab Content End -->
                        </div>
                    </div>
                    <!-- My Account Page End -->

                </div>
            </div>

            <div class="row" v-else>
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <ElseLogin></ElseLogin>
                        </div>
                    </div>
                </div>
            </div>


            <ProductRecomend 
                v-bind:excludeProps="this.exlude"
                v-bind:loadChart="true">
            </ProductRecomend>

        </div>
    </div>

</template>

<style>
</style>


<script>
import ElseLogin from '/src/components/ElseLogin.vue'
import ProductRecomend from '/src/components/ProductRecomend.vue'
import ModalRating from '/src/components/ModalRating.vue'
import TabMenu from '/src/components/TabMenu.vue'

import VueCountdown from '@chenfengyuan/vue-countdown';
import StarRating from 'vue-star-rating'

export default {
    name: 'Header',
    components: {
        ElseLogin,
        VueCountdown,
        ProductRecomend,
        ModalRating,
        TabMenu,
        StarRating,
    },
    data() {
        return {
            dataDiscuss: [],
            user: null,
            loading: true,
            status: '',
            exlude: [],
        }
    },
    mounted() {
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;

        this.discussIndex();
    },
    methods: {
        discussIndex: function() {
            this.axios.get('discuss?status='+this.status, this.$store.state.config)
            .then((response) => {
                this.dataDiscuss = response.data.data
            })
            .catch(error => {
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
        orderPay: function(token) {
            window.snap.pay(token, {
                onSuccess: function(result){
                },
                onPending: function(result){
                },
                onError: function(result){
                },
                onClose: function(){
                    return false;
                },
            })
        },
        // orderRating: function() {
        //     this.modal = 'display: none;';
        //     this.axios.post('order-rating', this.rating, this.$store.state.config)
        //         .then((response) => {
        //             this.successNotif(response.data.message)
        //         })
        //         .catch(error => {
        //             this.errorNotif(error)
        //         })
        //         .finally(
        //             () => this.loadingButton = false
        //         )
        // }
        
    },
    
}
</script>