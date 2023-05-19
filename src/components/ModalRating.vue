<template>
    <a href="#" class="btn btn-primary" 
        :class="(type == 'show') ? ' btn-block mt-2' : 'pull-right btn-sm'"
        @click="rating.transaction_id = order.id; modal = ''; rating.order = order">
        Beri Ulasan
    </a>

    <div class="swal2-container swal2-center swal2-backdrop-show" 
        style="overflow-y: auto;"
        :style="modal">
        <div aria-labelledby="swal2-title" aria-describedby="swal2-html-container" class="swal2-popup swal2-modal swal2-show" tabindex="-1" role="dialog" aria-live="assertive" aria-modal="true" style="display: grid;">
            <h2 class="swal2-title" id="swal2-title" style="display: block;">Tulis Ulasan</h2>
            <div class="swal2-html-container" id="swal2-html-container" style="display: block;">
                Transaksi <b>{{ (rating.order) ? rating.order.invoice : '' }}</b>
                <div class="single-comment-wrap mt-2">
                    <template v-for="detail in rating.order.transaction_details" v-bind:key="detail.id">
                        <p style="font-size: 14px; display: flow-root;" class="mb-0">
                            <span class="pull-left"> <b>{{ detail.name }}</b></span> 
                            <span class="pull-right"> {{ detail.qty }} barang</span>
                        </p>
                    </template>
                </div>
                <div class="mt-2 swal2-wrap-rating">
                    <!-- <star-rating v-model:rating="rating.value" animate="true"></star-rating> -->
                    <star-rating v-model:rating="rating.value"></star-rating>
                </div>
            </div>
            <textarea class="swal2-textarea mt-1" v-model="rating.desc"></textarea>
            <span class="swal2-html-container" style="font-size: 14px;">Ulasan kamu sangat berati untuk kami :)</span>
            <div class="swal2-actions" style="display: flex;">
                <button type="button" class="swal2-confirm swal2-styled" aria-label="" style="display: inline-block;"
                    @click="orderRating()">
                    Kirim Ulasan
                </button>
                <button type="button" class="swal2-cancel swal2-styled" aria-label="" style="display: inline-block;"
                    @click="modal = 'display: none;'; $emit('modal')"
                    >
                    Batal
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import StarRating from 'vue-star-rating'

export default {
    name: 'ModalOrder',
    props : ['order', 'type'],
    components: {
        StarRating,
    },
    data() {
        return {
            rating : {
                value : 5,
                desc : '',
                transaction_id: '',
                order : '',
            },
            modal: 'display: none;',
        }
    },
    // watch:{
    //     modalProps(newVal, oldVal) {
    //         this.modal = newVal;
    //     },
    // },
    methods: {
        orderRating: function() {
            console.log(this.$props.type);
            this.modal = 'display: none;';
            this.axios.post('order-rating', this.rating, this.$store.state.config)
                .then((response) => {
                    this.successNotif(response.data.message)
                    if (this.$props.type == 'show') {
                        this.$parent.orderShow();
                    } else {
                        this.$parent.orderIndex();
                    }
                })
                .catch(error => {
                    this.errorNotif(error)
                })
                .finally(
                    () => this.loadingButton = false
                )
        }
    }
}
</script>