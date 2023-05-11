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
                                                    <li class="list-group-left">No Invoice</li>
                                                    <li class="list-group-right" 
                                                        v-if="this.dataOrder">
                                                        <router-link :to="'/order/' + this.dataOrder.id + '/print'"
                                                            target="_blank">
                                                            {{ (this.dataOrder) ? this.dataOrder.invoice : '' }}
                                                        </router-link>
                                                    </li>
                                                </ul>
                                                <ul class="list-group list-group-horizontal">
                                                    <li class="list-group-left">Tanggal Pembelian</li>
                                                    <li class="list-group-right">{{ (this.dataOrder) ? dateTimeOuput2(this.dataOrder.created_at) : '' }}</li>
                                                </ul>
                                                <ul class="list-group list-group-horizontal">
                                                    <li class="list-group-left">Pembayaran</li>
                                                    <li class="list-group-right">{{ (this.dataOrder) ? this.dataOrder.transaction_midtrans.payment_type : '' }}</li>
                                                </ul>
                                                <hr>
                                                <h5 style="font-size: 16px;font-weight: bold">Detail Produk</h5>
                                                <div class="card-body comment-area-wrapper pt-1 px-0"><div class="single-comment-wrap mb-2"><a href="/product/lisensi-office-2016-pro-plus-original" class="image author-thumb"><img src="http://bins.local/api/v1/storage/2016_1.png" alt="Author"></a><div class="comments-info"><p class="mb-0" style="font-size: 14px;"><a href="/product/lisensi-office-2016-pro-plus-original" class="image">Lisensi Office 2016 Pro Plus Original</a></p><p>1 barang x <b>Rp99.000</b></p></div></div></div>
                                                <hr>
                                                <h5 style="font-size: 16px;font-weight: bold">Detail Transaksi</h5>
                                                <!-- Section: Timeline -->
                                                <section class="py-1">
                                                    <ul class="timeline-with-icons  ml-3">
                                                        <li class="timeline-item mb-5">
                                                            <span class="timeline-icon">
                                                                <i class="fas fa-rocket text-primary fa-sm fa-fw"></i>
                                                            </span>
                                                            <div class="ml-1">
                                                                <h5 class="fw-bold mb-0" style="font-size: 14px;">
                                                                    Pesanan telah tiba di tujuan.
                                                                </h5>
                                                                <p class="text-muted mb-1 fw-bold" style="font-size: 14px;font-weight: 400 !important;">
                                                                    6 Mei 2023, 14:43 WIB
                                                                </p>
                                                                <p class="text-muted" style="font-size: 14px;">
                                                                    voluptas et corrupti distinctio maxime corporis optio?
                                                                </p>
                                                            </div>
                                                        </li>

                                                        <li class="timeline-item mb-5">
                                                            <span class="timeline-icon">
                                                                <i class="fas fa-hand-holding-usd text-primary fa-sm fa-fw"></i>
                                                            </span>
                                                            <div class="ml-1">
                                                                <h5 class="fw-bold mb-0" style="font-size: 14px;">
                                                                    Pesanan telah dikirim.
                                                                </h5>
                                                                <p class="text-muted mb-1 fw-bold" style="font-size: 14px;font-weight: 400 !important;">
                                                                    6 Mei 2023, 14:43 WIB
                                                                </p>
                                                                <p class="text-muted" style="font-size: 14px;">
                                                                    Phasellus suscipit porta mattis.
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
                                        <button type="button" class="btn btn-primary btn-block pull-right">Selesaikan Pesanan</button>
                                        <button type="button" class="btn btn-white btn-block mt-2 pull-right">Ajukan Refund</button>
                                        <button type="button" class="btn btn-white btn-block mt-2 pull-right" @click="this.orderDetailModalProps = 'hide'">Kembali</button>
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
        orderShow: function(id) {
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
    },
    
}
</script>
