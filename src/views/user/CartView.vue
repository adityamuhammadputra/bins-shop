<template>
     <div class="section mt-5 mb-5">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h5 class="title mb-3">Keranjang </h5>
                </div>
            </div>

            <div class="row">
                <div class="col-md-8 col-12">
                    <div class="card">
                        <div class="card-body" v-if="user">
                            <div class="comment-area-wrapper" v-if="this.loading === true">
                                <div class="spinner-grow spinner-grow-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div class="comment-area-wrapper" v-else>
                                <div class="mb-4 pb-4" style="border-bottom: 1px solid #f3f3f3;" 
                                    v-for="(cart, indexCart) in data" v-bind:key="cart.id">
                                    <div class="single-comment-wrap mb-2">
                                        <input type="checkbox" 
                                            v-model="data[indexCart].status"
                                            @change="cartCheck(data)"
                                            style="width: 20px;margin-right: 15px;height: 20px;"
                                        >
                                        <a class="author-thumb" href="#">
                                            <router-link :to="'/product/'+data[indexCart].product.slug" class="image">
                                                <img :src="cart.product.file" alt="Author">
                                            </router-link>
                                        </a>
                                        <div class="comments-info">
                                            <p class="mb-0" style="font-size: 14px;">
                                                <router-link :to="'/product/'+data[indexCart].product.slug" class="image">
                                                {{ data[indexCart].product.name }}
                                                </router-link>
                                            </p>
                                            <p>
                                                <b>{{ data[indexCart].product.price_rp }}</b>
                                            </p>
                                        </div>
                                        <a href="#" style="font-weight: 500;font-size: 20px; margin-right: 10px;"
                                            @click="chartDelete(cart)">
                                            <i class="pe-7s-close-circle"></i>
                                        </a>
                                    </div>
                                    <div class="comment-footer d-flex justify-content-between ml-2">
                                        <span class="author">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" :id="'floatingInputGrid' + indexCart" 
                                                    v-model="data[indexCart].notes"
                                                    @blur="chartUpdate(cart)" placeholder="Catatan" 
                                                        style="height: 45px;border-radius: 0px;padding-top: 1rem;">
                                                <label :for="'floatingInputGrid' + indexCart" style="padding-top: 7px;">Catatan </label>
                                            </div>
                                        </span>
                                        <a href="#" class="btn-reply">
                                            <div class="quantity">
                                                <div class="cart-plus-minus">
                                                    <input class="cart-plus-minus-box" v-model="data[indexCart].qty" type="text">
                                                    <div class="dec qtybutton" 
                                                        @click="(data[indexCart].qty > 1) ? data[indexCart].qty-- : 1; cartCheck(data); chartUpdate(cart)"
                                                        :style="(data[indexCart].qty > 1) ? '' : 'color: grey;pointer-events: none;'">
                                                        <i class="fa fa-minus"></i>
                                                    </div>
                                                    <div class="inc qtybutton" 
                                                        @click="data[indexCart].qty++; cartCheck(data); chartUpdate(cart)">
                                                        <i class="fa fa-plus"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body" v-else="user">
                            <ElseLogin></ElseLogin>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="cart-calculate-items">
                                <h6 class="title">Ringkasan Belanja</h6>
                                <div class="table-responsive">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>Total Harga ({{ this.totalBarang }} barang)</td>
                                                <td>Rp. {{ formatRibu(this.totalHarga) }}</td>
                                            </tr>
                                            <tr>
                                                <td>Ongkos Kirim</td>
                                                <td>Rp. 0</td>
                                            </tr>
                                            <tr class="total">
                                                <td><b>Total</b></td>
                                                <td class="total-amount"><b>Rp. {{ formatRibu(this.totalHarga) }}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-block w-100" :disabled="loadingButton"
                                @click="cartCheckout()"
                                >Beli ({{ this.totalBarang }} barang)</button>
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
    
<script>
// import { useAttrs } from 'vue';
import ProductRecomend from '/src/components/ProductRecomend.vue'
import ElseLogin from '/src/components/ElseLogin.vue'

export default {
    name: 'cart',
    components: {
        ProductRecomend, ElseLogin
    },
    data() {
        return {
            data: [],
            exlude: [],
            totalBarang: 0,
            totalHarga: 0,
            loading: true,
            loadingButton: false,
            errored: false,
            user : null,
        }
    },
    watch:{
        setCartLoading(oldVal, newVal) {
            if (newVal === false) {
                this.cartData(false)
            }
        },
    },
    created() {
        this.cartData();
    },
    computed: {
        setCartLoading() {
            return this.$store.state.default.cartLoading;
        }
    },
    mounted() {
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;
    },
    methods: {
        cartCheck: function (data) {
            let totalBarang = 0,
                totalHarga = 0;

            data.map(function(value, key){
                
                if (value.status === true || value.status === false) {
                    if (value.status === true) {
                        totalBarang = totalBarang + value.qty
                        totalHarga = totalHarga + parseInt(value.product.price) * parseInt(value.qty)
                    } else {
                        totalBarang - parseInt(value.qty)
                        totalHarga - parseInt(value.product.price) * parseInt(value.qty)
                    }
                }
            });

            this.totalBarang = totalBarang;
            this.totalHarga = totalHarga;
        },  
        chartUpdate: function(row) {
            this.axios.patch('chart/' + row.id, row, this.$store.state.config)
            .then((response) => {
                return response;
                // console.log(response.data.data);
            })
            .catch(error => {
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
        chartDelete: function(row) {
            this.$swal({
                title: "Konfirmasi !",
                text: 'Hapus ' + row.product.name + ' dari keranjang ?',
                showCancelButton: true,
                confirmButtonText: 'Ya, Hapus',
                cancelButtonText: 'Batal',
                }).then((result) => {
                if (result.isConfirmed) {
                    this.axios.delete('chart/' + row.id, this.$store.state.config)
                    .then((response) => {
                        this.successNotif(response.data.message)
                        this.cartData(false)
                        this.countChart();
                    })
                    .catch(error => {
                        this.errorNotif(error)
                    })
                }
            })
        },  
        cartCheckout: function() {
            if (this.totalBarang == 0) {
                this.successNotif('Belum pilih / tandai barang yang akan di beli')
                return false;
            }

            this.loadingButton = true
            const dataSumm = {
                amount : this.totalHarga,
                qty : this.totalBarang,
                product: this.data,
            }
            this.axios.post('checkout', dataSumm, this.$store.state.config)
                .then((response) => {
                    // console.log(response.data.token);
                    var that = this;
                    window.snap.pay(response.data.token, {
                        onSuccess: function(result){
                            that.successNotif('Pembayaran berhasil... Pesanan dalam proses')
                            that.cartCreated(that, result, response.data.token);
                            // alert("payment success!"); 
                        },
                        onPending: function(result){
                            that.successNotif('Pesanan berhasil dibuat... Silahkan lanjutkan pembayaran')
                            that.cartCreated(that, result, response.data.token);
                            // console.log(result); alert("wating your payment!"); 
                        },
                        onError: function(result){
                            that.successNotif('Pesanan gagal, Silahkan muat ulang halaman')
                            // alert("payment failed!"); console.log(result);
                        },
                        onClose: function(){
                            // that.successNotif('Pesanan batal dibuat... Silahkan lanjutkan pembayaran')
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
                amount : that.totalHarga,
                qty : that.totalBarang,
                product: that.data,
                snapData: snap,
                midtrans: result
            }
            that.axios.post('order', dataSumm, that.$store.state.config)
            .then((response) => {
                console.log(response);
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
        }
    },
}
</script>