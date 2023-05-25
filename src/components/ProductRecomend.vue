<template>
    <div class="row mt-5">
        <div class="col-12">
            <div class="section-title mb-5">
                <h5 class="pb-1">Produk Lainnya</h5>
                <span></span>
                <div class="title-border-bottom"></div>
            </div>
        </div>
        <div class="col">
            <Carousel :items-to-show="(isMobile()) ? 2 : 5">
                <Slide v-for="product in this.dataRekomends" :key="product.id">
                    <div class="product">
                        <div class="product-inner">
                            <div class="thumb">
                                <router-link :to="'/product/'+product.slug" class="image">
                                    <img class="first-image" :src="product.file" alt="Product">
                                    <img class="second-image" :src="product.file" alt="Product">
                                </router-link>

                                <div class="actions">
                                    <a @click="copyLink('/product/'+product.slug)" title="Salin Halaman" class="action compare">
                                        <i class="fa fa-copy"></i>
                                    </a>    
                                </div>
                            </div>
                            <div class="content">
                                <h4 class="sub-title" style="display: none;"><a href="single-product.html">{{ product.category }}</a></h4>
                                <h5 class="title">
                                    <router-link :to="'/product/'+product.slug" class="image">
                                        {{ product.name }}
                                    </router-link>
                                </h5>
                                <span class="ratings">
                                    <span class="rating-num" v-if="product.rating_avg > 0">
                                        <i class="fa fa-star text-warning"></i> 
                                        {{ product.rating_avg }} &nbsp;|
                                    </span> 
                                    <span class="rating-num ml-1">
                                        Terjual {{ product.sold }}
                                    </span>
                                </span>
                                <span class="price" v-if="product.discount">
                                    <span class="new">{{ product.price_discount }}</span>
                                    <span class="old">{{ product.price_rp }}</span>
                                </span>
                                <span class="price" v-else>
                                    <span class="new">{{ product.price_rp }}</span>
                                </span>
                                
                                <button class="btn btn-sm btn-outline-danger btn-hover-danger w-100" title="Add To Cart"
                                    @click="addChart(product.id, this.loadTheChart)"
                                    >+ Keranjang 
                                </button>
                            </div>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                <Navigation />
                </template>
            </Carousel>
        </div>

    </div>
</template>
<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ContentLoader } from 'vue-content-loader'

export default {
    props : ['excludeProps', 'loadChart'],
    name: 'ProdcutRecoment',
    components: {  
        Carousel, Slide, Pagination, Navigation, ContentLoader
    }, 
    data() {
        return {
            dataRekomends: [],
            loadTheChart : this.loadChart ?? false,
            exclude: this.excludeProps ?? this.$store.state.default.exlude,
        }
    },
    mounted() {
        this.getRecomend();
    },
    methods: {
        getRecomend: function() {
            this.loading = true
            this.axios.get('product?exclude='+localStorage.getItem('exlude'))
            .then((response) => {
                this.dataRekomends = response.data.data;
                // this.$emit('modal-pick', this.resultModal)
            })
            .catch(error => {
                this.loading = true
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
    }
}
</script>