<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Detail Transaksi</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="this.orderModalProps = 'hide'"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-8" style="border-right: 1px solid #e5e5e5;">
                        <ul class="list-group list-group-horizontal">
                            <li class="list-group-left">No Invoice</li>
                            <li class="list-group-right">
                                <a href="#">INV/20230504/MPL/3213486627</a>
                            </li>
                        </ul>
                        <ul class="list-group list-group-horizontal">
                            <li class="list-group-left">Tanggal Pembelian</li>
                            <li class="list-group-right">04 Mei 2023, 20:49 WIB</li>
                        </ul>
                        <ul class="list-group list-group-horizontal">
                            <li class="list-group-left">Pembayaran</li>
                            <li class="list-group-right">BCA</li>
                        </ul>
                        <hr>
                        <h5 style="font-size: 16px;font-weight: bold">Detail Produk</h5>
                        <div class="card-body comment-area-wrapper pt-1 px-0"><div class="single-comment-wrap mb-2"><a href="/product/lisensi-office-2016-pro-plus-original" class="image author-thumb"><img src="http://bins.local/api/v1/storage/2016_1.png" alt="Author"></a><div class="comments-info"><p class="mb-0" style="font-size: 14px;"><a href="/product/lisensi-office-2016-pro-plus-original" class="image">Lisensi Office 2016 Pro Plus Original</a></p><p>1 barang x <b>Rp99.000</b></p></div></div></div>
                        <hr>
                        <h5 style="font-size: 16px;font-weight: bold">Detail Transaksi</h5>
                        <!-- Section: Timeline -->
                        <section class="py-1">
                            <ul class="timeline-with-icons  ml-3">
                                <li class="timeline-item mb-5">
                                    <span class="timeline-icon">
                                        <i class="fas fa-rocket text-primary fa-sm fa-fw"></i>
                                    </span>
                                    <div class="ml-1">
                                        <h5 class="fw-bold mb-0" style="font-size: 14px;">
                                            Pesanan telah tiba di tujuan.
                                        </h5>
                                        <p class="text-muted mb-1 fw-bold" style="font-size: 14px;font-weight: 400 !important;">
                                            6 Mei 2023, 14:43 WIB
                                        </p>
                                        <p class="text-muted" style="font-size: 14px;">
                                            voluptas et corrupti distinctio maxime corporis optio?
                                        </p>
                                    </div>
                                </li>

                                <li class="timeline-item mb-5">
                                    <span class="timeline-icon">
                                        <i class="fas fa-hand-holding-usd text-primary fa-sm fa-fw"></i>
                                    </span>
                                    <div class="ml-1">
                                        <h5 class="fw-bold mb-0" style="font-size: 14px;">
                                            Pesanan telah dikirim.
                                        </h5>
                                        <p class="text-muted mb-1 fw-bold" style="font-size: 14px;font-weight: 400 !important;">
                                            6 Mei 2023, 14:43 WIB
                                        </p>
                                        <p class="text-muted" style="font-size: 14px;">
                                            Phasellus suscipit porta mattis.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <!-- Section: Timeline -->
                    </div>
                    <div class="col-md-4">
                        <button type="button" class="btn btn-primary btn-block">Selesaikan Pesanan</button>
                        <button type="button" class="btn btn-white btn-block mt-2">Ajukan Refund</button>
                        <button type="button" class="btn btn-white btn-block mt-2" @click="this.orderModalProps = 'hide'">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'ModalOrder',
    props : ['orderProps'],
    data() {
        return {
            order: this.orderProps ?? null,
            // modalClass: this.orderModalProps
        }
    },
    // methods: {
    //     orderDetail : function() {
    //         this.modal = 'show';
    //     }
    // }
}
</script>