<template>
    <div class="section pt-2 mb-5" :class="(isMobile() ? '' : 'mt-5')">
        <div class="container">
            <div class="faq_content_area">
                <div class="container">
                    <div class="row mb-n6">
                        <div class="col-lg-6 mb-6 p-0-mobile">
                            <div class="about_content">
                                <h3 class="title">Hal yang sering ditanyakan</h3>
                                <p>Beberapa hal sering ditanyakan oleh pelanggan kami, kami coba rangkum dibawah ini untuk menjadi refensi jika tidak bertanya kepada admin kami.
                                    Namun, jika masih bingung tanyakan apapun kepada admin kami. kami usahakan berikan pelayan terbaik kami :)
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-6 p-0-mobile">
                            <div class="about_thumb">
                                <img class="fit-image" src="/assets/images/faq.PNG" alt="About Image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion_area">
                <div class="container">
                    <div class="row">
                        <div class="col-12 p-0-mobile">
                            <div id="accordionExample" class="accordion mb-n4">
                                <div class="card_dipult accordion-item mb-4">
                                    <div class="card-header card_accor" id="headingOne" @click="collapsed = '', show='show'">
                                        <button class="btn btn-link" :class="collapsed">
                                            Apa bedanya dengan produk yang di bins.shop dengan produk lain di shopee atau tokopedia ?
                                            <i class="fa fa-plus"></i>
                                            <i class="fa fa-minus"  @click="collapsed = 'collapsed', show=''"></i>
                                        </button>
                                    </div>
                                    <div id="collapseOne" class="collapse accordion-collapse border-0" :class="show" 
                                    aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="card-body">
                                            <p>Tentu beda, karena yang kami jual adalah produk Original. Aktivasi pada produk kami semua langsung By Internet, bukan harus kirim validasi Screen Shoot (ss) by telephone kemudian divalidasi oleh Admin Toko tesebut </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card_dipult accordion-item mb-4">
                                    <div class="card-header card_accor" id="headingTwo" @click="collapsed = '', show='show'">
                                        <button class="btn btn-link" :class="collapsed">
                                            Saya lihat kok harganya toko lain atau Marketplace lain lebih murah, bahkan ada yang dibawah 30K ?
                                            <i class="fa fa-plus"></i><i class="fa fa-minus" @click="collapsed = 'collapsed', show=''"></i>
                                        </button>
                                    </div>
                                    <div id="collapseTwo" class="collapse accordion-collapse border-0" :class="show">
                                        <div class="card-body">
                                            <p>Ada harga ada rupa :). bisa dipastikan produk tersebut menggunakan Aktivasi By Phone yang harus kirim SS untuk validasi. Perlu diketahui, lisensi office original aktivasi langsung by internet. </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card_dipult accordion-item mb-4">
                                    <div class="card-header card_accor" id="headingThree" @click="collapsed = '', show='show'">
                                        <button class="btn btn-link" :class="collapsed" >
                                            Bagaimana jika produk yang saya beli di Bins.Shop bermasalah ? 
                                            <i class="fa fa-plus"></i>
                                            <i class="fa fa-minus"  @click="collapsed = 'collapsed', show=''"></i>
                                        </button>
                                    </div>
                                    <div id="collapseThree" class="collapse accordion-collapse border-0" :class="show">
                                        <div class="card-body">
                                            <p>Jika ada kendala terkait produk kami, tahap pertama tentu kami akan bantu dengan menjawab kendala apa terjadi. Jika belum solved kami akan bantu Remote menggunakan Teamviewer / Anydesk</p>
                                            <p>sampai pada akhirnya kami akan refund langsung kerening Pembeli, jika memang masih belum bisa untuk kendala terkait</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card_dipult accordion-item mb-4">
                                    <div class="card-header card_accor" id="headingfour" @click="collapsed = '', show='show'">
                                        <button class="btn btn-link" :class="collapsed" >
                                            Bagaiaman Cara Refund
                                            <i class="fa fa-plus"></i>
                                            <i class="fa fa-minus"  @click="collapsed = 'collapsed', show=''"></i>
                                        </button>
                                    </div>
                                    <div id="collapseFour" class="collapse accordion-collapse border-0" :class="show" >
                                        <div class="card-body">
                                            <p>Jika produk bermasalah, tinggal ajukan saya di sistem kami saat transaksi. atau bisa langsung by chat kepada Admin kami</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card_dipult accordion-item mb-4">
                                    <div class="card-header card_accor" id="headingfive" @click="collapsed = '', show='show'">
                                        <button class="btn btn-link" :class="collapsed" >
                                            Saya ingin produk fisik seperti difoto Produk
                                            <i class="fa fa-plus"></i>
                                            <i class="fa fa-minus"  @click="collapsed = 'collapsed', show=''"></i>
                                        </button>
                                    </div>
                                    <div id="collapseFive" class="collapse accordion-collapse border-0" :class="show">
                                        <div class="card-body">
                                            <p>Bisa kami kirim langsung menggunakan Kurir atau Jasa kirim yang telah dispakati oleh pembeli. ongkos kirim tergantung daerah masing masing yaa :) </p>
                                            <p>Untuk detailnya bisa tanyakan langsung ke Admin kita yaa :) </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
// @ is an alias to /src
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import ProductList from '/src/components/ProductList.vue'

export default {
    name: 'faq',
    components: {  
        Carousel, Slide, Pagination, Navigation, ProductList, 
    }, 
    data() {
        return {
            collapsed: 'collapsed',
            show: null,
           
        }
    },
    methods: {
        
    }
}
</script>
