<template>
    <div class="section mt-5 mb-5 mt-1-mobile">
        <div class="container">

            <div class="row" v-if="user">
                <div class="col-lg-12">
                    <div class="myaccount-page-wrapper">
                        <div class="row">
                            <div class="col-lg-3 col-md-4">
                                <TabMenu v-bind:url="'rating'"></TabMenu>
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
                                            <span>Menampilakan <b>{{ dataRating.length }}</b> Ulasan</span>
                                        </div>
                                    </div>
                                    <div class="shop-top-bar-right">
                                        <span class="mr-1">Tampilkan: </span>
                                        <div class="shop-short-by mr-4">
                                            <select class="nice-select" v-model="status" @change="ratingIndex">
                                                <option value="">--Semua Ulasan--</option>
                                                <option value="1">Sudah Diulas</option>
                                                <option value="2">Belum Diulas</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="card mb-4 " 
                                    v-if="dataRating.length > 0"
                                    v-for="(order, indexOrder) in dataRating" v-bind:key="order.id">
                                    <div class="card-header" style="background: white;border: none;">
                                        <span class="text-primary">{{ order.invoice }}</span>
                                        <!-- <span class="badge pull-left"
                                            v-if="isMobile()"
                                            :class="'bg-' + order.status.color"> 
                                            {{ order.status.name }} 
                                        </span> -->
                                        <span class="pull-right">
                                            Pesanan selesai {{ dateTimeOuput2(order.updated_at) }}
                                        </span>
                                    </div>
                                    

                                    <div class="card-body comment-area-wrapper pt-1" 
                                        v-for="detail in order.transaction_details">
                                        <div class="single-comment-wrap mb-2">
                                            <router-link :to="'/product/'+detail.product.slug+ '?back=rating'" class="image author-thumb">
                                                <img :src="detail.product.file" alt="Author">
                                            </router-link>
                                            <div class="comments-info">
                                                <p class="mb-0" style="font-size: 14px;">
                                                    <router-link :to="'/product/'+detail.product.slug+ '?back=rating'" class="image">
                                                        {{ detail.name }}
                                                    </router-link>
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
                                        </div>
                                    </div>
                                    <div class="card-footer text-muted">
                                        <router-link :to="'/order/'+order.id" class="text-danger pull-right mr-1"
                                            >
                                            <b>Lihat Detail </b>
                                        </router-link>
                                    </div>
                               </div>
                               <div class="card mb-4 text-center" v-else>
                                    <div class="card-body">
                                        <img src="/assets/images/keranjang-kosong.png" alt="keranjang-kosong" style="width: 300px;"/>
                                            <h5>Waaah Ulasan belanjamu kosong!</h5>
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
                    <div class="card">
                        <div class="card-body">
                            <ElseLogin></ElseLogin>
                        </div>
                    </div>
                </div>
            </div>


            <ProductRecomend 
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
            dataRating: [],
            user: null,
            loading: true,
            status: '',
            exlude: [],
        }
    },
    mounted() {
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;

        this.ratingIndex();
    },
    methods: {
        ratingIndex: function() {
            this.axios.get('order?rating='+this.status+'&status=4', this.$store.state.config)
            .then((response) => {
                this.dataRating = response.data.data
            })
            .catch(error => {
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
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