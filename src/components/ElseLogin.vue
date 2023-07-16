<template>
    <p class="saved-message">
        Oppps... Kamu belum login. <br> 
        Gunakan akun Google atau Facebook kamu untuk login ke Bins Shop <br> 
        <span style="font-size: 14px;font-weight: 400;">Tidak perlu lagi mengingat sandi. Login cepat, mudah dan aman</span>
    </p>
    <div class="text-center mb-3">
        <GoogleLogin :callback="handleLoginGoogle" prompt auto-login></GoogleLogin> <br/>
        <v-facebook-login app-id="178551696757200" @sdk-init="handleSdkInit"  @login="handleLoginFb"></v-facebook-login>
    </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login'
import VFacebookLogin from 'vue-facebook-login-component-next'

export default {
    name: 'ElseLogin',
    components: { VFacebookLogin, decodeCredential },
    data() {
        return {
            FB: {},
        }
    },
    methods: {
        handleLoginFb: function () {
            let that = this
            this.FB.api('/me',  {fields: 'name, email'}, function(response) {
                response.picture = `https://graph.facebook.com/${response.id}/picture?type=normal`;
                response.provider_id = response.id;
                response.provider = 'facebook';
                that.$store.dispatch("auth/login", response).then(
                    () => {
                        if(that.$route.query.back) {
                            window.location.href = that.$route.query.back + '?as=' + response.name;
                        } else {
                            window.location.reload()
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            });
            // console.log(response.authResponse);
        },
        handleSdkInit({ FB}) {
            this.FB = FB
            // this.scope = scope
        },
        handleLoginGoogle: function(response) {
            console.log(response);
            const userData = decodeCredential(response.credential)
            userData.provider_id = userData.sub;
            userData.provider = 'google';
            this.$store.dispatch("auth/login", userData).then(
                () => {
                    if(this.$route.query.back) {
                        window.location.href = this.$route.query.back + '?as=' + userData.name;
                    } else {
                        window.location.reload()
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    }
}
</script>