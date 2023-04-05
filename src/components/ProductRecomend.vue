<template>

    <div class="row mt-5">
        <div class="col-12">
            <div class="section-title mb-5">
                <h3 class="pb-3">Produk Lainnya</h3>
                <span></span>
                <div class="title-border-bottom"></div>
            </div>
        </div>
        <div class="col">
            <div class="">
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
                                        <a href="wishlist.html" title="Wishlist" class="action wishlist"><i class="pe-7s-like"></i></a>
                                        <a href="#" title="Quickview" class="action quickview" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"><i class="pe-7s-search"></i></a>
                                        <a href="compare.html" title="Compare" class="action compare"><i class="pe-7s-shuffle"></i></a>
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
                                        <span class="rating-num"><i class="fa fa-star text-warning"></i> 4 &nbsp;|</span> <span class="rating-num ml-1">Terjual 100</span>
                                    </span>
                                    <span class="price">
                                        <span class="new">{{ product.price_rp }}</span>
                                        <span class="old">{{ product.price_rp }}</span>
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
            exclude: this.excludeProps ?? '-'
        }
    },
    mounted() {
        this.getRecomend();
    },
    methods: {
        getRecomend: function() {
            console.log(this.exclude);
            this.loading = true
            this.axios.get('product?exclude='+this.exclude)
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