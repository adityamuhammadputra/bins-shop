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

const currentBaseUrl = 'http://localhost:8080'

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
                .use(vue3GoogleLogin, {
                    clientId: '178946568807-5tfh6j07huih5h53eiun11s6pf19iu2d.apps.googleusercontent.com'
                })

vueApp.component("content-loader", ContentLoader)


vueApp.mixin({
    methods: {
        testAh: function (){
            console.log('test');
        },
        currentBaseUrl: function () {
            return currentBaseUrl;
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
        findString: function(str) {
            console.log(str);
        },
        successNotif: function(msg) {
            toast(msg);
        },
        errorNotif: function(error) {
            let message = (error.response) ? error.response.data.error : error.message
            toast.error(message);
            if(error.response.status == 401) {
                this.logOut();
            }
        },
        errorNotifMsg: function(msg) {
            toast.error(msg);
        },
        userLogin: function(){
            return (this.$store.state.auth) ? this.$store.state.auth.user.user : null;
        },
        logOut: function(){
            console.log('logut');
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
            window.location.href = '/'
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
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
        swalToCart: function(msg) {
            // let timerInterval
            this.$swal({
              title: msg,
              html: 'Anda akan dialihkan kehalaman Keranjang',
              timer: 111000,
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
        }
    },
})

vueApp.mount('#app')

