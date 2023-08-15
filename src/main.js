import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//style
import  './assets/css/vendor.min.css'
import  './assets/css/plugins.min.css'
import  './assets/css/style.min.css'
import  './assets/css/custom.css'

// Axios
import axios from 'axios'
// axios.defaults.baseURL = 'https://be.binsshop.tech/api/v1/'
axios.defaults.baseURL = 'http://bins.local/api/v1/'

import VueAxios from 'vue-axios'

// googleLogin
import vue3GoogleLogin from 'vue3-google-login'

// others
import moment from 'moment';
import { ContentLoader } from 'vue-content-loader'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";
import bottomNavigationVue from "bottom-navigation-vue";
import "bottom-navigation-vue/dist/style.css";
import VueSocialSharing from 'vue-social-sharing'
import VueLazyload from 'vue-lazyload'

const optionToast = {
    timeout: 5500,
    position: "bottom-center",
};

const toast = useToast();
const vueApp = createApp(App)
                .use(store)
                .use(router)
                .use(VueSweetalert2)
                .use(Toast, optionToast)
                .use(bottomNavigationVue)
                .use(ContentLoader)
                .use(VueAxios, axios)
                .use(VueSocialSharing)
                .use(VueLazyload)
                .use(vue3GoogleLogin, {
                    clientId: '178946568807-5tfh6j07huih5h53eiun11s6pf19iu2d.apps.googleusercontent.com'
                })


vueApp.component("content-loader", ContentLoader)
// vueApp.component("facebook-login", FacebookLogin)

vueApp.mixin({
    methods: {
        toHttps: function() {
            if (location.protocol == 'http:') {
                // console.log(location.protocol);
                // window.location.href = 'https://binsshop.tech';
            }
        },
        currentBaseUrl: function () {
            return 'https://binsshop.tech';
        },
        globalAlert: function (message) {
            this.$swal(message);
        },
        strippedContent: function(string) {
            return string.replace(/<\/?[^>]+>/ig, " "); 
        },
        substringLimit: function(string) {
            if(string.length > 4)
                return string.substring(0, 4)
            return string
        },
        dateNow: function() {
            return moment(new Date()).format('DD MMMM YYYY') + ' Pukul ' + moment(new Date()).format('HH:mm');
        },
        dateOuput: function(date) {
            return moment(date).format('DD/MM/YYYY');
        },
        dateOuput2: function(date) {
            return moment(date).format('DD MMMM YYYY');
        },
        dateTimeOuput: function(date) {
            return moment(date).format('DD/MM/YYYY HH:mm');
        },
        dateTimeOuput2: function(date) {
            return moment(date).format('DD MMMM YYYY') + ' Pukul ' + moment(date).format('HH:mm');
        },
        dateTimeUnixOutput: function(date) {
            return moment.unix(date).format('DD MMMM YYYY') + ' Pukul ' + moment.unix(date).format('HH:mm');
        },
        findString: function(str) {
            console.log(str);
        },
        successNotif: function(msg) {
            toast(msg);
        },
        errorNotif: function(error) {
            let message = (error.response.data) ? error.response.data.error : error.message
            if(error.response.status == 401) {
                // this.$store.dispatch('auth/refresh');
                this.logOut();
                // disini request baru berarti
            } else {
                toast.error(message);
            }
        },
        errorNotifMsg: function(msg) {
            toast.error(msg);
        },
        userLogin: function(){
            return (this.$store.state.auth) ? this.$store.state.auth.user.user : null;
        },
        logOut: function(){
            this.$store.dispatch('auth/logout');
            // this.$router.push('/login');
            window.location.href = '/user'
        },
        search: function() {
            this.$router.push('/product?q=' + this.$store.state.meta.q);
        },
        countChart : function() {
            this.axios.get('chart-count', this.$store.state.config)
            .then((response) => {
                this.$store.state.default.cart = response.data.message
                localStorage.setItem('cartLocal', response.data.message)
            })
            .catch(error => {
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
        countNotif : function() {
            this.axios.get('notif-count?status=1,2,3,9', this.$store.state.config)
            .then((response) => {
                this.$store.state.default.notif = response.data.message
                localStorage.setItem('notifLocal', response.data.message)
            })
            .catch(error => {
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
        addChart: function(id, loadChart = false) {
            if (!this.$store.state.auth.user) {
                this.errorHasLogin('Opps... Silahkan login terlebih dahulu', '/user?back=' + this.$route.path)
                return false;
            }
            this.loadingButton = true
            const data = {
                product_id: id,
            };
            this.axios.post('chart', data, this.$store.state.config)
            .then((response) => {
                this.countChart();
                if (loadChart == true) {
                    this.$store.state.default.cartLoading = true
                    this.successNotif(response.data.message)
                } else {
                    this.swalToCart(response.data.message)
                }
                // if (loadChart == true) {
                //     console.log('loading...');
                //     // localStorage.setItem('cartLocal', response.data)

                // }
            })
            .catch(error => {
                this.loadingButton = true
                this.errorNotif(error)
            })
            .finally(
                () => this.loadingButton = false
            )
        },
        cartData: function(loadingProcess = true) {
            this.loading = loadingProcess
            this.axios.get('chart', this.$store.state.config)
            .then((response) => {
                this.loading = false
                this.data = response.data.data;
                const resultExlude = [];
                for(var key in response.data.data) {
                    resultExlude.push(response.data.data[key].product.slug);
                }
                // this.exclude = resultExlude.join();
                localStorage.setItem('exlude', resultExlude.join())
                this.$store.state.default.cartLoading = false
            })
            .catch(error => {
                window.location.href = '/user'
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
        orderPay: function(payload) {
            this.loadingOverlay = true;
            this.axios.get('order/preview?payload='+payload, this.$store.state.config)
            .then((response) => {

                let htmlQr = ''
                    , htmlPayCode = ''
                    , htmlPayButton = '';
                let result = response.data.data;
                
                if (result.qr_url) {
                    htmlQr = `<div class="mb-2">
                                <div style="font-size: 12px;color: #98a3b2;">
                                    <i>Scan Untuk Bayar</i>
                                </div>
                                <div style="text-align: center;">
                                    <img src="`+result.qr_url+`" style="width: 250px;">
                                </div>
                            </div>`;
                }
                
                if (result.pay_url && (result.payment_method == 'OVO' || result.payment_method == 'SHOPEEPAY')) {
                    let bgButton = '#ee4d2d';
                    if (result.payment_method == 'OVO') {
                        bgButton = '#4b3491';
                    }
                    htmlPayButton = `<div class="mb-2 mt-4">
                                        <a class="btn btn-info btn-block" style="background: `+bgButton+`;" href="`+ result.pay_url +`">Lanjut Bayar</a>
                                        </div>
                                    </div>`;
                }
                if (result.pay_code) {
                    htmlPayCode = `<div class="mb-2">
                                        <div style="font-size: 14px;color: #98a3b2;">
                                            Kode Bayar/Nomor VA
                                        </div>
                                        <div style="font-size: 15px;color: #2c4656;font-weight: 600;">
                                            `+ result.pay_code +`
                                            <span class="text-success pull-right" 
                                            style="cursor: pointer;" 
                                            onclick="navigator.clipboard.writeText('`+ result.pay_code +`'), alert('Berhasil disalin')"><i class="pe-7s-copy-file"></i> Salin</span>
                                        </div>
                                    </div>`;
                }

                let labelTop = `Selesaikan Pembayaran Sebelum</h6>
                                <b class="text-danger mb-3">`+ this.dateTimeUnixOutput(result.expired_time) + `</b>`,
                                htmlIcon = false;
                if (result.status == 'PAID') {
                    labelTop = `Terimakasih, Pembayaran Berhasil!</h6>`;
                    htmlPayButton = '';
                    htmlIcon = 'success';
                    htmlQr = '';
                }

                let html =`<h6 class="mt-2">`+ labelTop + `
                            <div class="card mt-3">
                                <div class="card-header" style="background: white;">
                                    <b class="pull-left" style="font-size: 16px;">` + result.payment_name + `</b>
                                    <img class="pull-right" src="`+result.icon_url+`" style="width: 65px;">
                                </div>
                                <div class="card-body text-left">
                                    <div class="mb-2">
                                        <div style="font-size: 14px;color: #98a3b2;">
                                            No. Invoice
                                        </div>
                                        <div style="font-size: 15px;color: #2c4656;font-weight: 600;">
                                            `+ result.merchant_ref +`
                                        </div>
                                    </div>
                                    ` + htmlPayCode + `
                                    <div class="mb-2">
                                        <div style="font-size: 14px;color: #98a3b2;">
                                            Jumlah Tagihan
                                        </div>
                                        <div style="font-size: 15px;color: #2c4656;font-weight: 600;">
                                            Rp. `+ this.formatRibu(result.amount) +`
                                            <span class="text-success pull-right"
                                            style="cursor: pointer;" 
                                            onclick="navigator.clipboard.writeText('`+ result.amount +`'), alert('Berhasil disalin')"><i class="pe-7s-copy-file"></i> Salin</span>
                                        </div>
                                    </div>
                                    ` + htmlQr + `
                                    ` + htmlPayButton + `
                                </div>
                            </div>`;
                this.$swal({
                    icon: htmlIcon,
                    title: "",
                    html: html,
                    showCancelButton: true,
                    showConfirmButton: false,
                    // confirmButtonText: 'Ya, Hapus',
                    cancelButtonText: 'Tutup',
                })
            })
            .catch(error => {
                alert(error)
                // this.errorNotif(error)
            })
            .finally(
                () => this.loadingOverlay = false
            )
        },
        swalToCart: function(msg) {
            // let timerInterval
            this.$swal({
              title: msg,
              html: 'Kamu akan dialihkan kehalaman Keranjang',
              timer: 3000,
              icon: 'success',
              timerProgressBar: true,
              didOpen: () => {
                this.$swal.showLoading()
              },
              willClose: () => {
                // clearInterval(timerInterval)
              }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === this.$swal.DismissReason.timer) {
                    this.$router.push('/cart');
                }
            })
        },
        errorHasLogin: function(msg, urlBack) {
            this.errorNotifMsg(msg)
            this.$router.push(urlBack);
        },
        formatRibu: function(num){
            if (num) {
                var str = num.toString().replace("", ""), parts = false, output = [], i = 1, formatted = null;
                if(str.indexOf(".") > 0) {
                    parts = str.split(".");
                    str = parts[0];
                }
                str = str.split("").reverse();
                for(var j = 0, len = str.length; j < len; j++) {
                    if(str[j] != ",") {
                        output.push(str[j]);
                        if(i%3 == 0 && j < (len - 1)) {
                            output.push(",");
                        }
                        i++;
                    }
                }
                formatted = output.reverse().join("");
                return("" + formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
            } else {
                return '-';
            }
        },
        countDown : function (time) {
            setInterval(function () {
                if (time > 0)
                    time = time - 1;
            }, 1000);

            return time;
        },
        isMobile() {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
              return true
            } else {
              return false
            }
        },
        stickyTitleToHeader: function() {
            if (this.isMobile()) {
                window.onscroll = function() {
                    var header = document.getElementById("title-mobile");
                    if (header) {
                        var sticky = header.offsetTop;
                        if (window.pageYOffset > sticky) {
                            header.classList.add("title-mobile-to-header");
                        } else {
                            header.classList.remove("title-mobile-to-header");
                        }
                    }
                }
            }
        },
    },
})

vueApp.mount('#app')



