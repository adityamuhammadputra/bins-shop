<template>
     <div class="section mt-4 mb-5">
        <div class="container">
            <div class="row">
                <div class="col-12" v-if="!isMobile()">
                    <h5 class="title mb-3">
                        <router-link :to="'/product/'+product.slug" class="image">
                            <span class="fa fa-angle-left"></span> 
                            Pembayaran 
                        </router-link>
                    </h5>
                </div>
                <div class="col-12" v-else id="title-mobile">
                    <h5 class="title mb-2"> 
                        <router-link :to="'/product/'+product.slug" class="image">
                            <span class="fa fa-angle-left"></span> 
                            Pembayaran 
                        </router-link>
                    </h5>
                </div>
            </div>

            <div class="row">
                <div class="wrap-loading" v-if="loadingButton">
                    <img src="/assets/images/loading3.gif"/>
                    <p>Loading...</p>
                </div>

                <div class="col-md-8 col-12">
                    <div class="card border-none-mobile" v-if="user">
                        <div class="card-body p-0-mobile">
                            <span v-if="product"><b>Detail Barang</b> </span>
                            <div class="comment-area-wrapper mt-2">
                                <div v-if="product">
                                    <div v-if="product.status == true" style="border-bottom: 1px solid #f3f3f3;padding-bottom: 10px;margin-bottom: 10px;">
                                        <div class="single-comment-wrap">
                                            <a class="author-thumb" href="#" style="width: 55px;height: 55px;">
                                                <router-link :to="'/product/'+product.slug" class="image">
                                                    <img :src="product.file" alt="Author">
                                                </router-link>
                                            </a>
                                            <div class="comments-info">
                                                <p class="mb-0" style="font-size: 14px;">
                                                    <router-link :to="'/product/'+product.slug" class="image">
                                                    {{ product.name }}
                                                    </router-link>
                                                </p>
                                                <p class="mb-0">
                                                    {{ totalBarang }} x 
                                                    <span v-if="product.price_discount">
                                                        {{ product.price_discount }} 
                                                        <del style="font-size: 12px; font-weight: normal;">{{ product.price_rp }} </del>
                                                    </span>
                                                    <span v-else>
                                                        {{ product.price_rp }} 
                                                    </span>
                                                    <b class="pull-right">Rp. {{ formatRibu(product.price_final * totalBarang) }}</b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <table class="table">
                                        <tbody>
                                            <tr class="total">
                                                <td>Ongkos Kirim</td>
                                                <td class="total-amount text-right">Rp. 0</td>
                                            </tr>
                                            <tr class="total">
                                                <td>Fee Aplikasi</td>
                                                <td class="total-amount text-right">Rp. 0</td>
                                            </tr>
                                            <tr class="total" style="border-bottom: 1px solid white;">
                                                <td>Total</td>
                                                <td class="total-amount text-right"><b>Rp. {{ formatRibu(this.totalHarga) }}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-else class="text-center">
                                    <img src="/assets/images/keranjang-kosong.png" alt="keranjang-kosong" style="width: 300px;"/>
                                    <h5>Waaah kamu belum pilih barang yang akan dibayar!</h5>
                                    <p>Dari pada kosong, cek kembali Keranjang kamu</p>
                                    <router-link to="/cart" class="btn btn-primary">Lihat Keranjang</router-link> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 col-12">
                    <div class="card border-none-trl-mobile mb-4">
                        <div class="card-body p-0-mobile" v-if="product.status == true">
                            <span class="mb-3"><b>Pilih metode pembayaran</b> </span>

                            <div class="comment-area-wrapper" v-if="this.loading === true" style="position: relative;top: -10px;">
                                <template v-for="row in 7" :key="row">
                                    <div class="col-12 product">
                                        <content-loader  viewBox="0 0 1000 200" :speed="2" primaryColor="#f3f3f3"
                                            secondaryColor="#ecebeb">
                                            <rect x="8" y="70" rx="3" ry="3" width="250" height="150"/> 
                                            <rect x="300" y="70" rx="3" ry="3" width="700" height="150"/> 
                                            <!-- <rect x="11" y="128" rx="3" ry="3" width="78" height="900" />  -->
                                        </content-loader>
                                    </div>
                                </template>
                            </div>

                            <template v-else>
                                <template v-if="user && this.data" 
                                    v-for="(paymentGroup, key) in this.data" v-bind:key="key">
                                    <p style="margin-top: 1rem;margin-bottom: 0px;color: #a8a8a8;font-size: 14px;">
                                        {{ key.substring(2) }}
                                    </p>
                                    <template v-for="payment in paymentGroup" v-bind:key="payment.code">
                                        <div class="comment-area-wrapper" 
                                            style="padding: 10px 0px; border-bottom: 1px solid #efefef;cursor: pointer;" 
                                            @click="paymentStore(payment)"
                                            >
                                            <img :src="payment.icon_url" alt="Author" style="min-width: 25px;max-height: 25px;"> 
                                            <span class="ml-1" style="font-size: 14px;">{{ payment.name }}</span> 
                                            <span class="fa fa-angle-right pull-right" style="font-size: 20px;font-weight: bold;     line-height: 30px;"></span> 
                                        </div>
                                    </template>
                                </template>
                            </template>
                        </div>
                        <div v-else class="card-body p-0-mobile">
                            <span class="mb-3"><b>Pilih metode pembayaran</b> </span> <br>
                            Terjadi kesalah :(
                        </div>
                    </div>

                    <div class="card mb-3"  v-if="!this.$store.state.auth.user">
                        <div class="card-body p-0-mobile">
                            <ElseLogin></ElseLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import ElseLogin from '/src/components/ElseLogin.vue'

export default {
    name: 'cart',
    components: {
       ElseLogin, 
    },
    data() {
        return {
            data: [],
            product: this.$store.state.default.carts.product ?? [],
            totalBarang: this.$store.state.default.carts.qty,
            totalHarga: this.$store.state.default.carts.amount,
            loading: true,
            loadingButton: false,
            user : null,
        }
    },
    mounted() {
            this.stickyTitleToHeader();
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;
        this.paymentIndex()
    },
    methods: {
        paymentIndex: function() {
            this.loading = true;
            this.axios.get('payment-list', this.$store.state.config)
            .then((response) => {
                this.data = response.data.data;
            })
            .catch(error => {
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
        paymentStore: function(payment) {
            this.loadingButton = true;
            let dataSumm = this.$store.state.default.carts;
            dataSumm.transaction = payment;
            this.axios.post('order', dataSumm, this.$store.state.config)
            .then((response) => {
                this.loadingButton = false;
                this.successNotif('Pesanan berhasil dibuat... Silahkan lanjutkan pembayaran')
                this.countNotif()
                this.countChart()                      
                this.$router.push('/order');
                this.orderPay(response.data.data.reference)
            })
            .catch(error => {
                console.log(error);
                alert(error.response.data.message)
            })
            .finally(
                () => this.loading = false
            )
        },
    },
}
</script>