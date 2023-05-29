<template>
    <div class="myaccount-tab-menu nav" role="tablist">
        <router-link to="/order" :class="(url == 'order') ? 'active' : ''">
            <i class="pe-7s-news-paper"></i> {{ (isMobile()) ? '' : 'Daftar ' }} Transaksi
        </router-link>
        <router-link to="/rating" :class="(url == 'rating') ? 'active' : ''">
            <i class="pe-7s-star"></i> Ulasan
        </router-link>
        <router-link to="/discuss" :class="(url == 'discuss') ? 'active' : ''">
            <i class="pe-7s-chat"></i> Dikusi
        </router-link>
    </div>
</template>

<script>


export default {
    name: 'ModalOrder',
    props : ['url'],
}
</script>