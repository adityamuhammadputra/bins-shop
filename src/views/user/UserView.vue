<template>
    <div class="section mt-5 mb-5">
        <div class="container">

            <div class="row">
                <div class="col-12">
                    <h5 class="title mb-3">Akun dan History </h5>
                </div>
            </div>


            <div class="row" v-if="user">
                <div class="col-lg-12">
                    <div class="myaccount-page-wrapper">
                        <div class="row">
                            <div class="col-lg-3 col-md-4">
                                <div class="myaccount-tab-menu nav" role="tablist">
                                    <router-link to="/user" class="active">
                                        <i class="pe-7s-user"></i> Pengaturan Akun
                                    </router-link>
                                    <router-link to="/order">
                                        <i class="pe-7s-news-paper"></i> Daftar Transaksi
                                    </router-link>
                                    <a href="#" data-bs-toggle="tab" class=""><i class="pe-7s-star"></i> Ulasan</a>
                                    <a @click="this.logOut()"><i class="fa fa-sign-out"></i> Logout</a>
                                </div>
                            </div>
                            <!-- My Account Tab Menu End -->

                            <!-- My Account Tab Content Start -->
                            <div class="col-lg-9 col-md-8">
                                <div class="tab-content" id="myaccountContent">
                                    <!-- Single Tab Content Start -->
                                    <div class="tab-pane fade active show" id="account-info" role="tabpanel">
                                        <div class="myaccount-content">
                                            <h3 class="title">Informasi Akun</h3>
                                            <div class="alert alert-info mb-5" role="alert">
                                                Silahkan lengkapi profile akun
                                            </div>

                                            <div class="account-details-form ">
                                                <form action="#" class="mt-5 pt-3">
                                                    <div class="row">
                                                        <div class="col-3">
                                                            <img :src="user.avatar"  referrerpolicy="no-referrer"
                                                             style="border-radius: 100%; width: 100%;" v-if="user">
                                                        </div>
                                                        <div class="col-9">
                                                            <div class="form-floating mb-5">
                                                                <input type="text" class="form-control" 
                                                                    id="email" 
                                                                    placeholder="Email"
                                                                    v-model="this.user.email"
                                                                    style="height: 45px;border-radius: 0px;padding-top: 1rem;">
                                                                <label for="email" style="padding-top: 7px;">Email </label>
                                                            </div>
                                                            
                                                            <div class="form-floating mb-5">
                                                                <input type="text" class="form-control" 
                                                                    id="name" 
                                                                    placeholder="Nama Lengkap"
                                                                    v-model="this.user.name"
                                                                    style="height: 45px;border-radius: 0px;padding-top: 1rem;">
                                                                <label for="name" style="padding-top: 7px;">Nama Lengkap </label>
                                                            </div>

                                                            <div class="form-floating mb-5">
                                                                <input type="number" class="form-control" 
                                                                    id="phone" 
                                                                    placeholder="Nomor Hp"
                                                                    v-model="this.user.phone"
                                                                    style="height: 45px;border-radius: 0px;padding-top: 1rem;">
                                                                <label for="phone" style="padding-top: 7px;">Nomor Hp </label>
                                                            </div>
                                                            
                                                            <!-- <div class="single-input-item mb-3">
                                                                <label for="phone" class="required mb-1">Nomor Hp</label>
                                                                <input type="number" v-model="this.user.phone">
                                                            </div> -->
                                                        </div>
                                                    </div>

                                                    <fieldset>
                                                        <legend>Password change</legend>
                                                        <div class="single-input-item mb-3">
                                                            <label for="current-pwd" class="required mb-1">Current Password</label>
                                                            <input type="password" id="current-pwd" placeholder="Current Password">
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="single-input-item mb-3">
                                                                    <label for="new-pwd" class="required mb-1">New Password</label>
                                                                    <input type="password" id="new-pwd" placeholder="New Password">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="single-input-item mb-3">
                                                                    <label for="confirm-pwd" class="required mb-1">Confirm Password</label>
                                                                    <input type="password" id="confirm-pwd" placeholder="Confirm Password">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <div class="single-input-item single-item-button">
                                                        <button class="btn btn btn-dark btn-hover-primary rounded-0">Save Changes</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div> <!-- Single Tab Content End -->
                                </div>
                            </div> <!-- My Account Tab Content End -->
                        </div>
                    </div>
                    <!-- My Account Page End -->

                </div>
            </div>

            <div class="row" v-else>
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <ElseLogin></ElseLogin>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
</style>


<script>
import ElseLogin from '/src/components/ElseLogin.vue'

export default {
    name: 'Header',
    components: {
        ElseLogin
    },
    data() {
        return {
            user : null,
        }
    },
    mounted() {
        if (this.$store.state.auth.user) {
            this.user = this.$store.state.auth.user.user;
            this.user.phone = (this.user.phone) ? this.user.phone : '+62'; 
        }

    },
    methods: {
       
    }
}
</script>