<template>
    <footer class="section footer-section" v-if="!$route.meta.headerHide">
        <!-- Footer Top Start -->
        <div class="footer-top pt-7 pb-7" :class="(isMobile() ? 'mb-7' : '')">
            <div class="container">
                <div class="row mb-n10" v-if="!isMobile()">
                    <div class="col-12 col-sm-6 col-lg-4 col-xl-4 mb-10">
                        <div class="single-footer-widget">
                            <h2 class="widget-title mb-3">Kontak Kami</h2>
                            <p class="desc-content">Beritahu kami jika kamu ada pertanyaan atau kendala lainnya, melalui :</p>
                            <!-- Contact Address Start -->
                            <ul class="widget-address">
                                <li><span>Email: </span> <a href="#"> admin@binsshop.tech</a></li>
                            </ul>
                            <!-- Contact Address End -->

                            <!-- Soclial Link Start -->
                            <div class="widget-social justify-content-start">
                                <a title="WhatsApp" href="https://api.whatsapp.com/send/?phone=62816262439&text=Hai admin, mau tanya&type=phone_number&app_absent=0">
                                    <i class="fa fa-whatsapp whatsapp-color"></i>
                                </a>
                                <a title="Facebook" href="#">
                                    <i class="fa fa-facebook-square facebook-color"></i>
                                </a>
                                <a title="Twitter" href="#">
                                    <i class="fa fa-instagram"></i>
                                </a>
                            </div>
                            <!-- Social Link End -->
                        </div>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-4 col-xl-4 mb-10">
                        <div class="single-footer-widget">
                            <h2 class="widget-title mb-3">Eksplor</h2>
                            <ul class="widget-list">
                                <li>
                                    <router-link to="/about">
                                        Tentang    
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/tutorial">
                                        Tutorial & Link Download  
                                    </router-link>
                                    
                                </li>
                                <li>
                                    <router-link to="/faq">
                                        Cara Refund, Ingin Produk Fisik di foto produk ?
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-4 col-xl-4 mb-10">
                        <div class="single-footer-widget">
                            <h2 class="widget-title mb-3">Pembayaran</h2>
                            <p cla ss="desc-content mb-0">Untuk mempermudah transkasi, kami mendukung berbagai macam pembayaran :</p>
                            <div class="widget-social justify-content-start">
                                <img src="/assets/images/pay-wallet.PNG" style="width: 250px;"/>
                                <img src="/assets/images/pay-bank.PNG" style="width: 280px;"/>
                                <img src="/assets/images/pay-mart.PNG" style="width: 300px;"/>
                                <!-- <img src="/assets/images/pay-debit.png" style="width: 350px;"/> -->
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="row mb-n10" v-else>
                    <div class="col-12 col-sm-6 col-lg-4 col-xl-4 mb-10">
                        <div class="single-footer-widget">
                            <h2 class="widget-title mb-3">Kontak Kami</h2>
                            <p class="desc-content">Beritahu kami jika kamu ada pertanyaan atau kendala lainnya, melalui:</p>
                            <!-- Contact Address Start -->
                            <ul class="widget-address">
                                <li><span>Email: </span> <a href="#"> admin@binsshop.tech</a></li>
                            </ul>
                            <!-- Contact Address End -->

                            <!-- Soclial Link Start -->
                            <div class="widget-social justify-content-start">
                                <a title="WhatsApp" href="https://api.whatsapp.com/send/?phone=62816262439&text=Hai admin, mau tanya&type=phone_number&app_absent=0">
                                    <i class="fa fa-whatsapp whatsapp-color"></i>
                                </a>
                                <a title="Facebook" href="#">
                                    <i class="fa fa-facebook-square facebook-color"></i>
                                </a>
                                <a title="Twitter" href="#">
                                    <i class="fa fa-instagram"></i>
                                </a>
                            </div>
                            <!-- Social Link End -->
                        </div>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-4 col-xl-4 mb-10" v-if="!$route.meta.hideMobile">
                        <div class="single-footer-widget">
                            <h2 class="widget-title mb-3">Eksplor</h2>
                            <ul class="widget-list">
                                <li>
                                    <router-link to="/about">
                                        Tentang    
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/tutorial">
                                        Tutorial & Link Download  
                                    </router-link>
                                    
                                </li>
                                <li>
                                    <router-link to="/faq">
                                        Cara Refund, Ingin Produk Fisik di foto produk?
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-4 col-xl-4 mb-10">
                        <div class="single-footer-widget"> 
                            <h2 class="widget-title mb-3">Pembayaran </h2>
                            <p cla ss="desc-content mb-0">Untuk mempermudah transkasi, kami mendukung berbagai macam pembayaran</p>
                            <div class="widget-social justify-content-start">
                                <img src="/assets/images/pay-wallet.PNG" style="width: 250px;"/>
                                <img src="/assets/images/pay-bank.PNG" style="width: 280px;"/>
                                <img src="/assets/images/pay-mart.PNG" style="width: 300px;"/>
                                <!-- <img src="/assets/images/pay-debit.png" style="width: 350px;"/> -->
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- Footer Top End -->

        <!-- Footer Bottom Start -->
        <div class="footer-bottom" :style="(isMobile() ? 'display:none;' : '')">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-12 text-center">
                        <div class="copyright-content">
                            <p class="mb-0">Copyright © 2023 <a href="https://bins.shop/">Bins Shop.</a> <span class="text-danger"> 100% Aktivasi online, bukan by phone!</span>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer Bottom End -->
    </footer>
    
    <div v-if="isMobile()" 
        data-v-67637842="" class="wn-btn-container-foreground" 
        style="--border-color: #9B9B9B; --background-color: #FFFFFF; --badge-color: #828282; height: 47px;">
        <div data-v-67637842="" class="wn-btn-container">
            <router-link to="/"> 
                <div data-v-67637842="" class="wn-btn-item">
                    <div data-v-67637842="" class="wn-btn-icon" style="color: rgb(46, 46, 46);">
                        <i data-v-67637842="" data-v-67637842-s="" class="pe-7s-home"></i><!--v-if-->
                        <span>Home</span>
                    </div>
                    <div data-v-67637842="" class="wn-btn-border"></div>
                </div>
            </router-link>
        </div>
        <div data-v-67637842="" class="wn-btn-container">
            <router-link to="/about"> 
                <div data-v-67637842="" class="wn-btn-item">
                    <div data-v-67637842="" class="wn-btn-icon" style="color: rgb(46, 46, 46);">
                        <i data-v-67637842="" data-v-67637842-s="" class="pe-7s-bookmarks"></i><!--v-if-->
                        <span>Tentang</span>
                    </div>
                    <div data-v-67637842="" class="wn-btn-border"></div>
                </div>
            </router-link>
        </div>
        <div data-v-67637842="" class="wn-btn-container">
            <router-link to="/cart"> 
                <div data-v-67637842="" class="wn-btn-item">
                    <div data-v-67637842="" class="wn-btn-icon" style="color: rgb(46, 46, 46);">
                        <i data-v-67637842="" data-v-67637842-s="" class="pe-7s-cart"></i>
                        <div data-v-67637842="" class="wn-btn-badge" v-if="this.$store.state.default.cart > 0">{{ this.$store.state.default.cart }}</div>
                        <span>Keranjang</span>
                    </div>
                    <div data-v-67637842="" class="wn-btn-border"></div>
                </div>
            </router-link>
        </div>
        <div data-v-67637842="" class="wn-btn-container">
            <router-link to="/order"> 
                <div data-v-67637842="" class="wn-btn-item">
                    <div data-v-67637842="" class="wn-btn-icon" style="color: rgb(46, 46, 46);">
                        <i data-v-67637842="" data-v-67637842-s="" class="pe-7s-news-paper"></i><!--v-if-->
                        <div data-v-67637842="" class="wn-btn-badge" v-if="this.$store.state.default.notif > 0">{{ this.$store.state.default.notif }}</div>
                        <span>Transaksi</span>
                    </div>
                    <div data-v-67637842="" class="wn-btn-border"></div>
                </div>
            </router-link>
        </div>
        <div data-v-67637842="" class="wn-btn-container">
            <router-link to="/user"> 
                <div data-v-67637842="" class="wn-btn-item">
                    <div data-v-67637842="" class="wn-btn-icon" style="color: rgb(46, 46, 46);">
                        <img :src="user.avatar"  referrerpolicy="no-referrer" style="border-radius: 100%;width: 22px;position: relative;top: -5px;" v-if="user">
                        <i data-v-67637842="" data-v-67637842-s="" class="pe-7s-user" v-else></i><!--v-if-->
                        <span>Akun</span>
                    </div>
                    <div data-v-67637842="" class="wn-btn-border"></div>
                </div>
            </router-link>
        </div>
    </div>

    <!-- <WindowsBottomNavigation :options="options" :replaceRoute="true" v-model="selected" v-if="isMobile()" style="height: 47px;"/> -->
</template>



<script>

// import { WindowsBottomNavigation } from "bottom-navigation-vue";
import "bottom-navigation-vue/dist/style.css";


export default {
    name: 'footerView',
    // components: { WindowsBottomNavigation },
    data() {
        return {
            user : null,
            selected: 1,
            replaceRoute: true,
            // options: [
            //     // { id: 1, icon: 'pe-7s-home', title: 'Home', color: '#2e2e2e', path: { name: "home", query: { bookmark: "important" } }},
            //     { id: 1, icon: 'pe-7s-home', title: 'Home', color: '#2e2e2e', path: { name: "home" }, replaceRoute: true},
            //     { id: 2, icon: 'pe-7s-bookmarks', title: 'Blog', color: '#2e2e2e', path: { name: "about"} },
            //     { id: 3, icon: 'pe-7s-cart', title: 'Keranjang', color: '#2e2e2e', badge: this.$store.state.default.cart, path: { name: "cart" }},
            //     { id: 4, icon: 'pe-7s-news-paper', title: 'Transaksi', color: '#2e2e2e', badge: this.$store.state.default.notif, path: { name: "order" } },
            //     { id: 5, icon: 'pe-7s-user', title: 'Akun', color: '#2e2e2e', path: { name: "user" }}
            // ]
        }
    },
    mounted() {
        // if (!this.isMobile()) {
        if (this.$store.state.auth.user) 
            this.user = this.$store.state.auth.user.user;
    },
    
}
</script>

