<template>
    <p class="saved-message">
        Oppps... Anda belum login. <br> 
        Gunakan akun google anda untuk login ke Bins Shop <br> 
        <span style="font-size: 14px;font-weight: 400;">Tidak perlu lagi mengingat sandi. Login cepat, mudah dan aman</span>
    </p>
    <!-- <GoogleLogin :callback="handleLoginUser" prompt auto-login></GoogleLogin> -->
</template>

<script>
import { decodeCredential } from 'vue3-google-login'

export default {
    name: 'ElseLogin',
    methods: {
        handleLoginUser: function(response) {
            const userData = decodeCredential(response.credential)
            this.$store.dispatch("auth/login", userData).then(
                () => {
                    window.location.reload()
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    }
}
</script>