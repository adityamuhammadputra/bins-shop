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
                            <div class="col-lg-9 col-md-8">

                                <div class="card mb-4 " 
                                    v-for="(order, indexOrder) in dataOrder" v-bind:key="order.id">
                                    <div class="card-header" style="background: white;border: none;">
                                        <i class="fa fa-calendar-o"></i> {{ dateOuput2(order.created_at) }}
                                        {{ order.invoice }}
                                        <span class="badge bg-warning text-dark pull-right"> {{ order.asset_status.name }} </span>
                                    </div>
                                    <div class="card-body comment-area-wrapper pt-1">
                                        <div class="single-comment-wrap mb-2">
                                            <a href="/product/lisensi-project-2016" class="image author-thumb">
                                                <img src="http://bins.local/api/v1/storage/default.png" alt="Author">
                                            </a>
                                            <div class="comments-info">
                                                <p class="mb-0" style="font-size: 14px;">
                                                    <a href="/product/lisensi-project-2016" class="image">Lisensi Project 2016</a>
                                                </p>
                                                <p>
                                                    <b>Rp99.000</b>
                                                </p>
                                            </div>
                                            <a href="#" style="font-weight: 500; font-size: 20px; margin-right: 10px;">
                                                <i class="pe-7s-close-circle"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-footer text-muted">
                                        <a href="#" class="btn btn-primary">Go somewhere</a>
                                        2 days ago
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

        </div>
    </div>
</template>

<style>
</style>


<script>
import ElseLogin from '/src/components/ElseLogin.vue'

export default {
    name: 'Header',
    components: {
        ElseLogin
    },
    data() {
        return {
            dataOrder : [],
            user : null,
        }
    },
    mounted() {
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;

        this.orderIndex();
    },
    methods: {
        orderIndex: function() {
            this.axios.get('checkout', this.$store.state.config)
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
    }
}
</script>