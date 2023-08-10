<!-- mnodal detail -->
<template>
    <div class="section mt-2 mb-5">
        <div class="container">
            <div class="row align-items-center" v-if="user && this.dataOrder">
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


                <div class="col-12">
                    <div class="card mb-4 " style="border: none;">
                        <div class="card-body comment-area-wrapper pt-1"
                            :style="(this.dataOrder.status.id == 1 || this.dataOrder.status.id == 12 || this.dataOrder.status.id == 11) ? 'background: url(/assets/images/unpaid.png) no-repeat center center;background-size: 70% 40%;' : 'background: url(/assets/images/paid.png) no-repeat center center;background-size: 70% 40%;'">
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
                                                {{ (this.dataOrder) ? this.dataOrder.transaction_provider.payment_type : '' }}
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
                                    <div class="card-body comment-area-wrapper pt-1 px-0 pb-0">
                                        <table class="table">
                                            <tr>
                                                <th>Produk</th>
                                                <th>Harga Satuan</th>
                                                <th class="text-center">Jumlah</th>
                                                <th class="text-right">Total Harga</th>
                                            </tr>
                                            <tr v-for="detail in this.dataOrder.transaction_details" v-bind:key="detail.id">
                                                <td>
                                                    <b>{{ detail.name }}</b>
                                                </td>
                                                <td>
                                                    {{ detail.price_discount_rp }}
                                                </td>
                                                <td class="text-center">
                                                    {{ detail.qty }}
                                                </td>
                                                <td class="text-right">
                                                    {{ detail.total_rp }}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <hr>
                                    <h5 style="font-size: 16px;font-weight: bold">Detail Pembayaran</h5>
                                    <div class="detail-pay">
                                        <ul class="list-group list-group-horizontal my-1">
                                            <li class="list-group-left">Metode Pembayaran</li>
                                            <li class="list-group-right">{{ this.dataOrder.transaction_provider.payment_type }}</li>
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
                            </div>
                        </div>
                    </div>
                </div> <!-- My Account Tab Content End -->

                <div class="col-12">
                    <p style="font-size: 13px;">
                        <span>
                            Invoice ini sah dan diproses oleh komputer <br/>
                        Silakan hubungi Admin apabila kamu membutuhkan bantuan.
                        </span>
                        <span class="pull-right" v-if="!isMobile()">
                            Dicetak pada: {{ dateNow() }}
                        </span>

                        <span v-else>
                            <p class="pt-3">Dicetak pada: {{ dateNow() }}</p>
                        </span>
                    </p>
                </div>
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
