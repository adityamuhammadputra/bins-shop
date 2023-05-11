<template>
    <div class="section mt-5 mb-5">
        <div class="container">

            <div class="row">
                <div class="col-12">
                    <h5 class="title mb-3">Transaksi </h5>
                </div>
            </div>


            <div class="row" v-if="user">
                <div class="col-lg-12">
                    <div class="myaccount-page-wrapper">
                        <div class="row">
                            <div class="col-lg-3 col-md-4">
                                <div class="myaccount-tab-menu nav" role="tablist">
                                    <router-link to="/user">
                                        <i class="pe-7s-user"></i> Pengaturan Akun
                                    </router-link>
                                    <router-link to="/order" class="active">
                                        <i class="pe-7s-news-paper"></i> Daftar Transaksi
                                    </router-link>
                                    <a href="#" data-bs-toggle="tab" class=""><i class="pe-7s-star"></i> Ulasan</a>
                                    <a @click="this.logOut()"><i class="fa fa-sign-out"></i> Logout</a>
                                </div>
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
                                            <router-link :to="'/product/'+detail.product.slug" class="image author-thumb">
                                                <img :src="detail.product.file" alt="Author">
                                            </router-link>
                                            <div class="comments-info">
                                                <p class="mb-0" style="font-size: 14px;">
                                                    <router-link :to="'/product/'+detail.product.slug" class="image">
                                                        {{ detail.name }}
                                                    </router-link>
                                                </p>
                                                <p>
                                                    {{ detail.qty }} barang x <b>{{ detail.price_rp }}</b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer text-muted">
                                        <span class="pull-left" v-if="order.status.id == 1">
                                            <small>Pembayaran : {{ order.transaction_midtrans.payment_type }} </small>
                                        </span>
                                        <a href="#" class="btn btn-primary pull-right" 
                                            v-if="order.status.id == 1"
                                            @click="orderPay(order.transaction_midtrans.payment_token)">
                                            Cara Bayar
                                        </a>

                                        <a href="#" class="btn btn-primary btn-sm pull-right" 
                                            v-if="order.status.id == 2"
                                            >
                                            <i class="pe-7s-chat"></i> Tanya Admin
                                        </a>
                                        <router-link :to="'/order/'+order.id" class="text-danger pull-right mr-1"
                                            v-if="order.status.id == 2">
                                            <b>Lihat Detail</b>
                                        </router-link>
                                    </div>
                               </div>
                               <div class="card mb-4 text-center" v-else>
                                    <div class="card-body">
                                        <img src="/assets/images/keranjang-kosong.png" alt="keranjang-kosong" style="width: 400px;"/>
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
import VueCountdown from '@chenfengyuan/vue-countdown';

export default {
    name: 'Header',
    components: {
        ElseLogin,
        VueCountdown,
        ProductRecomend,
    },
    data() {
        return {
            dataOrder : [],
            user : null,
            loading : true,
            exlude: [],
        }
    },
    mounted() {
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;

        this.orderIndex();
    },
    methods: {
        orderIndex: function() {
            this.axios.get('order', this.$store.state.config)
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
        
    },
    
}
</script>