<!-- mnodal detail -->
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
                                <div class="card mb-4 ">
                                    <div class="card-header" style="background: white;border-bottom: 1px dashed #dfdfdf;">
                                        <h5 class="title mb-0">
                                            <router-link to="/order">
                                                <i class="fa fa-arrow-left"></i> Kembali
                                            </router-link>

                                            <span class="badge pull-right mt-1 mb-1"
                                                v-if="this.dataOrder" 
                                                style="font-size: 12px;"
                                                :class="'bg-' + dataOrder.status.color"> 
                                                {{ dataOrder.status.name }} 
                                            </span>
                                        </h5>
                                    </div>

                                    
                                    
                                    <div class="card-body comment-area-wrapper pt-1">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <ul class="list-group list-group-horizontal">
                                                    <li class="list-group-left" style="cursor: pointer;">
                                                        <b v-if="this.dataOrder" @click="copyInvoice(this.dataOrder.invoice)">
                                                            {{ (this.dataOrder) ? this.dataOrder.invoice : '' }}
                                                            <i class="pe-7s-copy-file"></i>
                                                        </b>
                                                    </li>
                                                    <li class="list-group-right">
                                                        <router-link :to="'/order/' + this.dataOrder.id + '/print'"
                                                            target="_blank">
                                                            Lihat Invoice
                                                        </router-link>
                                                    </li>
                                                </ul>
                                                <ul class="list-group list-group-horizontal">
                                                    <li class="list-group-left">Tanggal Pembelian</li>
                                                    <li class="list-group-right">{{ (this.dataOrder) ? dateTimeOuput2(this.dataOrder.created_at) : '' }}</li>
                                                </ul>
                                                <hr>

                                                <h5 style="font-size: 16px;font-weight: bold">Detail Produk</h5>
                                                <div class="card-body comment-area-wrapper pt-1 px-0 pb-0" v-if="this.dataOrder">
                                                    <div class="single-comment-wrap mb-2" 
                                                        v-for="detail in this.dataOrder.transaction_details" v-bind:key="detail.id">
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
                                                    
                                                    <div class="alert alert-warning d-flex align-items-center py-2 mt-1" role="alert"
                                                        v-if="this.dataOrder && dataOrder.status.id == 1">
                                                        <div>
                                                            Lakukan pembayaran dalam waktu
                                                            <vue-countdown :time="dataOrder.transaction_midtrans.payment_diff" v-slot="{ hours, minutes, seconds }">
                                                                <b>{{ hours }} jam, {{ minutes }} menit, {{ seconds }} detik.</b>
                                                            </vue-countdown> 
                                                        </div>
                                                    </div>

                                                    <div class="detail-pay">
                                                        <ul class="list-group list-group-horizontal my-1">
                                                            <li class="list-group-left">Metode Pembayaran</li>
                                                            <li class="list-group-right">{{ this.dataOrder.transaction_midtrans.payment_type }}</li>
                                                        </ul>
                                                        <ul class="list-group list-group-horizontal">
                                                            <li class="list-group-left">Total Harga ({{ this.dataOrder.qty }} barang)</li>
                                                            <li class="list-group-right">
                                                                {{ this.dataOrder.price_rp }}
                                                            </li>
                                                        </ul>
                                                        <ul class="list-group list-group-horizontal">
                                                            <li class="list-group-left">Total Ongkos Kirim</li>
                                                            <li class="list-group-right">
                                                                Rp.0
                                                            </li>
                                                        </ul>
                                                        <ul class="list-group list-group-horizontal">
                                                            <li class="list-group-left">Diskon atau Promo</li>
                                                            <li class="list-group-right">
                                                                -Rp.{{ this.dataOrder.discount }}
                                                            </li>
                                                        </ul>
                                                        <ul class="list-group list-group-horizontal my-1">
                                                            <li class="list-group-left">
                                                                <b>Total Belanja</b>
                                                            </li>
                                                            <li class="list-group-right">
                                                                <b>{{ this.dataOrder.total_rp }}</b>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <hr>
                                                
                                                <h5 style="font-size: 16px;font-weight: bold">Detail Transaksi</h5>
                                                <!-- Section: Timeline -->
                                                <section class="py-1">
                                                    <ul class="timeline-with-icons  ml-3" v-if="this.dataOrder">
                                                        <li class="timeline-item mb-5"
                                                            v-for="(status, key) in this.dataOrder.transaction_statuses" v-bind:key="status.id">
                                                            <span class="timeline-icon" 
                                                                :style="(key === 0) ? 'background:#ff4545;' : 'background:#d1d1d1;'">
                                                            </span>
                                                            <div class="ml-1">
                                                                <h5 class="fw-bold mb-0" style="font-size: 14px;">
                                                                    {{ status.name }}
                                                                </h5>
                                                                <p class="text-muted mb-1 fw-bold" style="font-size: 14px;font-weight: 400 !important;">
                                                                    {{ status.date }}
                                                                </p>
                                                                <p class="text-muted" style="font-size: 14px;">
                                                                    {{ status.desc }}
                                                                </p>
                                                            </div>
                                                        </li>

                                                    </ul>
                                                </section>
                                                <!-- Section: Timeline -->
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card-footer text-muted">
                                        <template v-if="this.dataOrder.status.id == 1">
                                            <button type="button" class="btn btn-primary btn-block pull-right"
                                                @click="orderPay(this.dataOrder.transaction_midtrans.payment_token)">
                                                Cara Bayar
                                            </button>
                                            <button type="button" class="btn btn-white btn-block mt-2 pull-right"
                                                @click="orderCancelDoneRefund(this.dataOrder, 'cancel')">
                                                Batalkan Pesanan
                                            </button>
                                        </template>
                                        <template v-if="this.dataOrder.status.id == 2 || this.dataOrder.status.id == 3">
                                            <button type="button" class="btn btn-primary btn-block pull-right"
                                                @click="orderCancelDoneRefund(this.dataOrder, 'done')">
                                                Selesaikan Pesanan
                                            </button>
                                            <button type="button" class="btn btn-white btn-block mt-2 pull-right"
                                                @click="orderCancelDoneRefund(this.dataOrder, 'refund')">
                                                Ajukan Refund
                                            </button>
                                        </template>


                                        
                                        <template v-if="this.dataOrder.status.id == 4">
                                            <button type="button" class="btn btn-primary btn-block mt-2 pull-right"
                                                @click="orderPay(this.dataOrder.transaction_midtrans.payment_token)">
                                                Beri Ulasan
                                            </button>
                                        </template>

                                        
                                        <a target="_blank" class="btn btn-white btn-block mt-2 pull-right"
                                            :href="'https://api.whatsapp.com/send/?phone=62816262439&text=' + this.dataOrder.invoice + '&type=phone_number&app_absent=0'"
                                        >
                                            <i class="fa fa-whatsapp"></i> Hubungi Penjual
                                        </a>
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
            dataOrder : null,
            user : null,
            loading : true,
            exlude: [],
        }
    },
    mounted() {
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;
        this.orderShow();
    },
    methods: {
        orderShow: function() {
            this.axios.get('order/' + this.$route.params.order_id, this.$store.state.config)
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
        orderCancelDoneRefund: function(row, type) {
            let attr;
            if (type == 'cancel') {
                attr = {
                    'type' : type,
                    'textHtml' : 'Batalkan transaksi <b>' + row.invoice + '</b> ?',
                    'textButton' : 'Ya, batalkan',
                }
            }
            if (type == 'done') {
                attr = {
                    'type' : type,
                    'textHtml' : 'Selesaikan transaksi <b>' + row.invoice + '</b> ? <p style="font-size: 14px;color: #8d8d8d;">Dana transaksi akan dilepas ke saldo penjual</p>',
                    'textButton' : 'Ya, selesaikan',
                }
            }
            if (type == 'refund') {
                attr = {
                    'type' : type,
                    'textHtml' : 'Ajukan pengembalian dana,  transaksi <b>' + row.invoice + '</b> ?',
                    'textButton' : 'Ya, Setuju',
                }
            }
            this.$swal({
                title: "Konfirmasi !",
                html: attr.textHtml,
                showCancelButton: true,
                confirmButtonText: attr.textButton,
                cancelButtonText: 'Kembali',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.axios.patch('order/' + row.id, {
                        order : row,
                        type : attr.type,
                        }, this.$store.state.config)
                    .then((response) => {
                        this.successNotif(response.data.message)
                        this.orderShow();
                    })
                    .catch(error => {
                        this.errorNotif(error)
                    })
                }
            })
        },
        copyInvoice: function(env){
            navigator.clipboard.writeText(env)
            this.successNotif(env + " Berhasil disalin")
        }
    },
    
}
</script>
