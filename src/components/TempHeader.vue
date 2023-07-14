<template>
    <div class="header section" id="myHeader" v-if="!isMobile()">
    <!-- Header Bottom Start -->
        <div class="header-bottom">
            <div class="header-sticky">
                <div class="container">
                    <div class="row align-items-center">

                        <!-- Header Logo Start -->
                        <div class="col-xl-2 col-6">
                            <div class="header-logo">
                                <router-link to="/">
                                    <img src="/assets/images/logo/logo.png" alt="Site Logo" style="width: 60px;"/>
                                    <span style="font-size: 20px;position: relative;left: -8px;top: 7px;">Bins Shop</span>
                                </router-link> 
                            </div>
                        </div>
                        <!-- Header Logo End -->

                        <!-- Header Menu Start -->
                        <div class="col-xl-8 d-none d-xl-block">
                            <div class="main-menu position-relative">
                                <ul>
                                    <li>
                                        <div class="error_form mt-6">
                                            <form class="search-form-error" @submit.prevent="search">
                                                <router-link to="/product">
                                                    <input class="input-text" placeholder="Cari..." type="text" 
                                                        v-model="this.$store.state.meta.q"
                                                        >
                                                    <button class="submit-btn" type="button" @click="search">
                                                        <i class="fa fa-search"></i>
                                                    </button>
                                                </router-link>
                                            </form>
                                        </div>
                                    </li>
                                    <li>
                                        <router-link to="/about">Tentang</router-link> 
                                    </li>
                                    <li>
                                        <router-link to="/faq" id="faq">Faq ?</router-link> 
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- Header Menu End -->

                        <!-- Header Action Start -->
                        <div class="col-xl-2 col-6">
                            <div class="header-actions" v-if="!this.$store.state.auth.user">
                                <!-- <GoogleLogin :callback="handleLogin" prompt auto-login/> -->
                                <router-link to="/user" class="btn btn-sm btn-outline-primary">
                                    Login
                                </router-link>
                            </div>
                            <div class="header-actions" v-else>

                                <router-link to="/order" class="header-action-btn header-action-btn-cart"
                                    @mouseover="notif = 'show'">
                                    <i class="pe-7s-bell"></i>
                                    <span class="header-action-num">{{ this.$store.state.default.notif }}</span>
                                </router-link> 
                                    <!-- <div class="dropdown-menu notification-ui_dd" :class="notif" @mouseleave="notif = ''" aria-labelledby="navbarDropdown">
                                        <div class="notification-ui_dd-header">
                                            <b>Notification</b>
                                            <i class="pe-7s-close pull-right" @click="notif = ''" style="font-size: 32px; cursor: pointer; font-weight: bolder;"></i>
                                        </div>
                                        <div class="notification-ui_dd-content">
                                            <div class="notification-list notification-list--unread">
                                                <router-link to="/rating">
                                                    <div class="notification-list_detail">
                                                        <i class="pe-7s-star"></i> Ulasan <small class="pull-right">1 hari lalu</small>
                                                        <p><b><small>INV20230524175505</small></b> </p>
                                                        <p><small>Ada Lisensi Office 2021 Pro Plus Original dan 1 barang lainnya belum kamu kasih ulasan, yuk lengkapi ulasan kamu</small></p>
                                                    </div>
                                                </router-link> 

                                            </div>
                                            <div class="notification-list notification-list--unread">
                                                <div class="notification-list_detail">
                                                    <i class="pe-7s-news-paper"></i> Transaksi <small class="pull-right">1 hari lalu</small>
                                                    <p><b><small>INV20230524175505</small></b> </p>
                                                    <p><small>Pesanan Lisensi Office 2021 Pro Plus Original Pemesanan berhasil, menunggu verifikasi pembayaran</small></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="notification-ui_dd-footer">
                                            <a href="#!" class="btn btn-primary btn-sm btn-block">Lihat Semua</a>
                                        </div>
                                    </div> -->
                                <router-link to="/cart" class="header-action-btn header-action-btn-cart"
                                    @mouseover="notif = ''">
                                    <i class="pe-7s-cart"></i>
                                    <span class="header-action-num">{{ this.$store.state.default.cart }}</span>
                                </router-link> 
                                <router-link to="/user" class="header-action-btn d-none d-md-block">
                                    <img :src="user.avatar"  referrerpolicy="no-referrer" width="30" style="border-radius: 100%;" v-if="user">
                                    <i class="pe-7s-user" v-else></i>
                                </router-link> 
                            </div>
                        </div>
                        <!-- Header Action End -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="header section" id="myHeader" 
        v-else
        v-if="!$route.meta.hideMobile">
        <div class="header-bottom">
            <div class="header-sticky">
                <div class="container">
                    <div class="row align-items-center">
                        <!-- Header Logo Start -->
                        <div class="col-2" style="position:relative; left: -10px; top: 11px;">
                            <div class="header-logo">
                                <router-link to="/">
                                    <img src="/assets/images/logo/logo.png" alt="Logo" style="width: 60px;"/>
                                </router-link> 
                            </div>
                        </div>
                        <div class="col-10" style="padding-right: 20px; padding-left: 0px;">
                            <div class="error_form" style="margin-top: 23px;">
                                <form class="search-form-error" @submit.prevent="search">
                                    <router-link to="/product"> 
                                        <input class="input-text" placeholder="Cari di Bins" type="text" v-model="this.$store.state.meta.q">
                                        <button class="submit-btn" type="button"  @click="search">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </router-link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
// import { decodeCredential } from 'vue3-google-login'
// import { googleTokenLogin } from "vue3-google-login"

export default {
    name: 'Header',
    data() {
        return {
            q : null,
            user : null,
            notif: '',
            default: {
                cart : '',
            }
        }
    },
    mounted() {
        // if (!this.isMobile()) {
        this.toHttps();
        this.stickyScroll();
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;
    },
    created() {
        this.countChart();
        this.countNotif();
    },
    methods: {
        stickyScroll: function() {
            window.onscroll = function() {
                var header = document.getElementById("myHeader");
                if (header) {
                    var sticky = header.offsetTop;

                    if (window.pageYOffset > sticky) {
                        header.classList.add("sticky");
                    } else {
                        header.classList.remove("sticky");
                    }
                }

            }
        },
    }
}


</script>



  