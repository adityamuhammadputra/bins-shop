<!-- mnodal detail -->
<template>
    <div class="section mt-2 mb-5">
        <div class="container">
            <div class="row align-items-center" v-if="user">
                <div class="col-12 mb-2">
                    <div class="header-logo">
                        <router-link to="/">
                            <img src="/assets/images/logo/logo.png" alt="Site Logo" style="width: 60px;"/>
                            <span style="font-size: 20px;position: relative;left: -8px;top: 10px;">Bins Shop</span>
                        </router-link> 
                        <div class="pull-right mr-1">
                            <span style="display: block;position: relative; font-weight: 800;font-family:-apple-system,BlinkMacSystemFont,Roboto,sans-serif;font-size: 16px;line-height: 22px;">
                                INVOICE
                            </span>
                            <span style="font-size: 14px;display: block; color: #ff4545;">
                                {{ (this.dataOrder) ? this.dataOrder.invoice : '' }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- <div class="col-5">
                    <b>Diterbitkan Atas Nama</b><br/>
                    Penjual : <b>Bins Shop</b>
                </div>

                <div class="col-7">
                    <b>Untuk</b><br/>
                    <table>
                        <tr>
                            <td>Pembeli</td>
                            <td>: </td>
                        </tr>
                        <tr>
                            <td>Tanggal Pembelian</td>
                            <td>: {{ (this.dataOrder) ? dateTimeOuput2(this.dataOrder.created_at) : '' }}</td>
                        </tr>
                    </table>
                </div> -->

                <div class="col-12">
                    <div class="card mb-4 " style="border: none;">
                        <div class="card-body comment-area-wrapper pt-1"
                            style="background: url(https://assets.tokopedia.net/assets-tokopedia-lite/v2/atreus/kratos/d4ab6312.png) no-repeat center center;">
                            <div class="row">
                                <div class="col-md-12">
                                    <div style="font-size: 14px;">
                                        <ul class="list-group list-group-horizontal">
                                            <li class="list-group-left">Pembeli</li>
                                            <li class="list-group-right">
                                                <p>
                                                    <b>{{ this.user.name }}</b>
                                                </p>
                                                {{ this.user.email }}
                                            </li>
                                        </ul>
                                        <ul class="list-group list-group-horizontal">
                                            <li class="list-group-left">Tanggal Pembelian</li>
                                            <li class="list-group-right">
                                                <b>{{ (this.dataOrder) ? dateTimeOuput2(this.dataOrder.created_at) : '' }}</b>
                                            </li>
                                        </ul>
                                        <ul class="list-group list-group-horizontal">
                                            <li class="list-group-left">Pembayaran</li>
                                            <li class="list-group-right">
                                                {{ (this.dataOrder) ? this.dataOrder.transaction_midtrans.payment_type : '' }}
                                            </li>
                                        </ul>
                                    </div>
                                    <ul class="list-group list-group-horizontal">
                                        <li class="list-group-left">Status </li>
                                        <li class="list-group-right">
                                            <span class="badge pull-right mt-1 mb-1" 
                                                v-if="this.dataOrder"
                                                style="font-size: 12px;"
                                                :class="'bg-' + dataOrder.status.color"> 
                                                {{ dataOrder.status.name }} 
                                            </span>
                                        </li>
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
                    </div>
                </div> <!-- My Account Tab Content End -->
            </div>
        </div>
    </div>

</template>

<style scoped>
    .footer-section {
        display: none !important;
    }
    .header.section {
        display: none !important;
    }

    #myHeader {
        display: none !important;
    }
</style>



<script>

export default {
    name: 'OrderPrint',
    components: {
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
