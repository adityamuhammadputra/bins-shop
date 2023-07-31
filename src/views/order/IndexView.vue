<template>
    <div class="section mt-5 mb-5 mt-1-mobile">
        <div class="container">

            <div class="row" v-if="user">
                
                <div class="col-lg-12">
                    <div class="myaccount-page-wrapper">
                        <div class="row">
                            <div class="col-lg-3 col-md-4">
                                <TabMenu v-bind:url="'order'"></TabMenu>
                            </div>
                            <!-- My Account Tab Menu End -->

                            <!-- My Account Tab Content Start -->
                            <div class="col-lg-9 col-md-8" v-if="this.loading === true" style="position: relative;top: -5px;">
                                <template v-for="row in 5" :key="row">
                                    <div class="col-12 product">
                                        <content-loader  viewBox="0 0 700 320" :speed="2" primaryColor="#f3f3f3"
                                            secondaryColor="#ecebeb">
                                            <rect x="0" y="20" rx="3" ry="3" width="700" height="30"/> 
                                            <rect x="8" y="70" rx="3" ry="3" width="150" height="150"/> 
                                            <rect x="190" y="70" rx="3" ry="3" width="500" height="90"/> 
                                            <rect x="190" y="180" rx="3" ry="3" width="500" height="30"/> 
                                            <rect x="450" y="240" rx="3" ry="3" width="250" height="70" /> 
                                            <!-- <rect x="11" y="128" rx="3" ry="3" width="78" height="900" />  -->
                                        </content-loader>
                                    </div>
                                </template>
                            </div>

                            <div class="col-lg-9 col-md-8" v-else>
                                <div class="shop_toolbar_wrapper flex-column flex-md-row mb-4">
                                    <div class="shop-top-bar-left alert-transaction">
                                        <div class="shop-top-show" v-if="!isMobile()">
                                            <span>Menampilkan <b>{{ dataOrder.length }}</b> Transaksi, <b>{{ this.$store.state.default.notif }}</b> Transaksi Berlangsung</span>
                                        </div>
                                        <div class="shop-top-show" v-else>
                                            <span><b>{{ this.$store.state.default.notif }}</b> Transaksi sedang Berlangsung</span>
                                        </div>
                                    </div>
                                    <div class="shop-top-bar-right">
                                        <span class="mr-1">Tampilkan:</span>
                                        <div class="shop-short-by mr-4">
                                            <select class="nice-select" v-model="status" @change="orderIndex">
                                                <option value="">--Semua Transaksi--</option>
                                                <option value="1,2,3,9">Sedang Berlangsung</option>
                                                <option value="4">Transaksi Selesai</option>
                                                <option value="10,11,12">Transaksi Batal</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="card mb-4 " 
                                    v-if="dataOrder.length > 0"
                                    v-for="(order, indexOrder) in dataOrder" v-bind:key="order.id">
                                    <div class="card-header" style="background: white;border: none;">
                                        <i class="fa fa-calendar-o"></i> {{ dateOuput2(order.created_at) }}
                                        <span class="text-detail">|</span> {{ order.invoice }}
                                        <span class="badge pull-left"
                                            v-if="isMobile()"
                                            :class="'bg-' + order.status.color"> 
                                            {{ order.status.name }} 
                                        </span>
                                        <span class="badge pull-right"
                                            v-else
                                            :class="'bg-' + order.status.color"> 
                                            {{ order.status.name }} 
                                        </span>
                                    </div>
                                    <div class="alert alert-warning d-flex align-items-center mx-3 py-2" role="alert"
                                     v-if="order.status.id == 1">
                                        <div>
                                            Lakukan pembayaran dalam waktu
                                            <vue-countdown :time="order.transaction_midtrans.payment_diff" v-slot="{ hours, minutes, seconds }">
                                                <b>{{ hours }} jam, {{ minutes }} menit, {{ seconds }} detik.</b>
                                            </vue-countdown> 
                                                <!-- <b>{{ dateTimeOuput2(order.transaction_midtrans.payment_timeout) }}</b> -->
                                        </div>
                                    </div>

                                    <div class="alert alert-info d-flex align-items-center mx-3 py-2" role="alert"
                                     v-if="order.status.id == 2">
                                        <div>
                                            {{ order.status.desc }}
                                        </div>
                                    </div>

                                    <div class="alert alert-danger d-flex align-items-center mx-3 py-2" role="alert"
                                     v-if="order.status.id == 11">
                                        <div>
                                            Tidak melakukan pembayaran <b>{{ order.transaction_midtrans.payment_type }}</b>, batas waktu <b> {{ dateTimeOuput2(order.transaction_midtrans.payment_timeout) }}</b>
                                        </div>
                                    </div>

                                    <div class="card-body comment-area-wrapper pt-1" 
                                        v-for="detail in order.transaction_details" v-bind:key="detail.id">
                                        
                                        <div class="single-comment-wrap mb-2">
                                            <router-link :to="'/product/'+detail.product.slug+ '?back=order'" class="image author-thumb">
                                                <img :src="detail.product.file" alt="Author">
                                            </router-link>
                                            <div class="comments-info">
                                                <p class="mb-0" style="font-size: 14px;">
                                                    <router-link :to="'/product/'+detail.product.slug+ '?back=order'" class="image">
                                                        {{ detail.name }}
                                                    </router-link>
                                                </p>
                                                <p class="mb-0">
                                                    {{ detail.qty }} barang x <b>{{ detail.price_discount_rp }}</b> &nbsp;
                                                    <del v-if="detail.discount > 0" style="font-size: 12px;"> 
                                                        {{ detail.price_rp }} ({{ detail.discount }}%)
                                                    </del>
                                                </p>

                                                <p v-if="order.status.id == 4" 
                                                    style="font-size: 14px;font-style: italic;">
                                                    <template v-if="order.transaction_rating">
                                                        <star-rating v-model:rating="order.transaction_rating.rating" 
                                                            :star-size="17" 
                                                            :read-only="true">
                                                        </star-rating>
                                                        {{ order.transaction_rating.desc }}
                                                    </template>
                                                    <template v-else>
                                                        Belum diulas
                                                    </template>
                                                </p>
                                            </div>
                                            <!-- <star-rating v-model:rating="rating" v-if="order.status.id == 4"></star-rating> -->
                                        </div>
                                       
                                    </div>
                                    <div class="card-footer text-muted">
                                        <span class="pull-left" v-if="order.status.id == 1 && !isMobile()">
                                            <small>Pembayaran : {{ order.transaction_midtrans.payment_type }} </small>
                                        </span>
                                        <a href="#" class="btn btn-primary pull-right btn-sm" 
                                            v-if="order.status.id == 1"
                                            @click="orderPay(order.transaction_midtrans.payment_token)">
                                            Cara Bayar
                                        </a>

                                        <a class="btn btn-primary btn-sm pull-right" 
                                            :href="'https://api.whatsapp.com/send/?phone=62816262439&text=Hai admin, mau tanya ' + order.invoice + '&type=phone_number&app_absent=0'"
                                            target="_blank"
                                            v-if="order.status.id == 2"
                                            >
                                            <i class="fa fa-whatsapp"></i> Tanya Admin
                                        </a>

                                        <ModalRating 
                                            v-if="order.status.id == 4 && !order.transaction_rating"
                                            v-bind:order="order"
                                            v-bind:type="'index'">
                                        </ModalRating>

                                        <router-link :to="'/order/'+order.id" class="text-danger pull-right mr-1"
                                            >
                                            <b>Lihat Detail </b>
                                        </router-link>
                                    </div>
                               </div>
                               <div class="card mb-4 text-center" v-else>
                                    <div class="card-body">
                                        <img src="/assets/images/keranjang-kosong.png" alt="keranjang-kosong" style="width: 300px;"/>
                                            <h5>Waaah Transaksi belanjamu kosong!</h5>
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

            <div class="row" v-if="!this.$store.state.auth.user">
                <div class="col-lg-12">
                    <h5 class="title mb-3 mt-3">Transaksi </h5>
                    <div class="card">
                        <div class="card-body p-0-mobile">
                            <ElseLogin></ElseLogin>
                        </div>
                    </div>
                </div>
            </div>

            <ProductRecomend>
            </ProductRecomend>

        </div>
    </div>


   

    <!-- <div class="swal2-container swal2-center swal2-backdrop-show" 
        style="overflow-y: auto;"
        :style="modal">
        <div aria-labelledby="swal2-title" aria-describedby="swal2-html-container" class="swal2-popup swal2-modal swal2-show" tabindex="-1" role="dialog" aria-live="assertive" aria-modal="true" style="display: grid;">
            <h2 class="swal2-title" id="swal2-title" style="display: block;">Beri Ulasan</h2>
            <div class="swal2-html-container" id="swal2-html-container" style="display: block;">
                Tulis ulasan untuk transaksi <br/><b>{{ (rating.order) ? rating.order.invoice : '' }}</b>
                <div class="mt-2 swal2-wrap-rating">
                    <star-rating v-model:rating="rating.value" animate="true"></star-rating>
                </div>
            </div>
            <textarea class="swal2-textarea mt-1" v-model="rating.desc"></textarea>
            <span class="swal2-html-container" style="font-size: 14px;">Ulasan kamu sangat berati untuk kami :)</span>
            <div class="swal2-actions" style="display: flex;">
                <button type="button" class="swal2-confirm swal2-styled" aria-label="" style="display: inline-block;"
                    @click="orderRating()">
                    Kirim Ulasan
                </button>
                <button type="button" class="swal2-cancel swal2-styled" aria-label="" style="display: inline-block;"
                    @click="modal = 'display: none;'">
                    Batal
                </button>
            </div>
        </div>
    </div> -->

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
            dataOrder : [],
            user : null,
            loading : true,
            status: '',
            exlude: [],
        }
    },
    mounted() {
        if (this.$store.state.auth.user) {
            this.user = this.$store.state.auth.user.user;
            this.orderIndex();
        }

    },
    methods: {
        orderIndex: function() {
            this.axios.get('order?status='+this.status, this.$store.state.config)
            .then((response) => {
                this.dataOrder = response.data.data
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