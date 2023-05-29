<template>
    <div class="section mt-5 mb-5">
        <div class="container mb-5">
            <div class="row"><div class="col-12"><h5 class="title mb-3">Informasi Akun </h5></div></div>
            <div class="row" v-if="user">
                <div class="col-lg-12">
                    <div class="myaccount-page-wrapper">
                        <div class="row">
                            <div class="col-lg-3 col-md-4" v-if="!isMobile()">
                                <div class="myaccount-tab-menu nav" role="tablist">
                                    <router-link to="/user" class="active">
                                        <i class="pe-7s-user"></i> Pengaturan Akun
                                    </router-link>
                                    <a @click="this.logOut()"><i class="fa fa-sign-out"></i> Logout</a>
                                </div>
                            </div>
                            <!-- My Account Tab Menu End -->

                            <!-- My Account Tab Content Start -->
                            <div class="col-lg-9 col-md-8 ">
                                <div class="tab-content m-0-mobile" id="myaccountContent">
                                    <!-- Single Tab Content Start -->
                                    <div class="tab-pane fade active show" id="account-info" role="tabpanel">
                                        <div class="progress  mb-0">
                                            <div class="progress-bar" role="progressbar" 
                                                :style="'width: '+user.percen +'%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                Kelengkapan profile kamu, {{ user.percen }}%
                                            </div>
                                        </div>
                                        <div class="myaccount-content">
                                            <div class="account-details-form ">
                                                <div class="row">
                                                    <div class="col-md-2 text-center">
                                                        <img :src="user.avatar" referrerpolicy="no-referrer" class="img-user-avatar"
                                                            style="border-radius: 100%;" v-if="user">
                                                        <span class="badge badge-user-avatar bg-dark">Silver Member</span>
                                                    </div>
                                                    <div class="col-md-10">
                                                        <div class="form-floating mb-2">
                                                            <input type="text" class="form-control" 
                                                                id="email" 
                                                                placeholder="Email"
                                                                v-model="this.user.email"
                                                                style="height: 45px;border-radius: 0px;padding-top: 1rem;border: none;cursor: not-allowed;">
                                                            <label for="email" style="padding-top: 7px;">Email </label>
                                                        </div>
                                                        
                                                        <div class="form-floating mb-5">
                                                            <input type="text" class="form-control" 
                                                                id="name" 
                                                                placeholder="Nama Lengkap"
                                                                v-model="this.user.name"
                                                                style="height: 45px;border-radius: 0px;padding-top: 1rem;border: none;cursor: not-allowed;">
                                                            <label for="name" style="padding-top: 7px;">Nama Lengkap </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <fieldset class="mt-2 mb-5">
                                                    <legend class="mt-0 mb-2">Akun yang terhubung</legend>
                                                    <div class="form-group">
                                                        <span aria-hidden="true" class="NA_Img dkWypw"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="24" width="24"><path fill="#4285f4" d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"></path><path fill="#34a853" d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"></path><path fill="#fbbc02" d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"></path><path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"></path></svg></span>
                                                        {{ this.user.email }}
                                                    </div>
                                                </fieldset>

                                                <fieldset class="mt-2">
                                                    <legend class="mt-0 mb-5">Info Pribadi</legend>
                                                    <div class="form-floating mb-5">
                                                        <input type="text" class="form-control" id="phone" 
                                                            placeholder="Nomor Hp"
                                                            v-model="this.user.phone"
                                                            style="height: 45px;border-radius: 0px;padding-top: 1rem;">
                                                        <label for="phone" style="padding-top: 7px;">Nomor Hp </label>
                                                    </div>

                                                    <div class="form-floating mb-5">
                                                        <select class="form-control" id="gender" placeholder="Jenis Kelamin"
                                                            v-model="this.user.gender"
                                                            style="height: 45px; padding-top: 0.6rem;">
                                                            <option value="">--Pilih--</option>
                                                            <option value="1">Pria</option>
                                                            <option value="2">Wanita</option>
                                                        </select>
                                                        <label for="gender" style="padding-top: 7px;">Jenis Kelamin </label>
                                                    </div>
                                                    
                                                    <div class="form-floating mb-5">
                                                        <datepicker
                                                            v-model="this.user.birth"
                                                            :clearable="false"
                                                            inputFormat="dd MMMM yyyy"
                                                            class="form-control" 
                                                            placeholder="Tanggal Lahir"
                                                            id="birth"
                                                            style="height: 45px;border-radius: 0px;padding-top: 1rem;background: white;"
                                                        />
                                                        <label for="birth" style="padding-top: 7px;opacity: unset;transform: scale(0.85) translateY(-1.45rem) translateX(0.15rem);background: white;color: #9f9f9f;">
                                                            Tanggal Lahir 
                                                        </label>
                                                    </div>
                                                </fieldset>

                                                <fieldset class="mt-2 mb-5">
                                                    <legend class="mt-0 mb-2">Info Lainnya</legend>
                                                    <table style="font-size: 14px;">
                                                        <tr>
                                                            <td>bergabung</td>
                                                            <td> 
                                                                <b>
                                                                    <i class="fa fa-check text-success"></i> {{ dateOuput2(user.created_at) }}
                                                                </b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="vertical-align: top;padding-right: 15px;">Transkasi berhasil</td>
                                                            <td> 
                                                                <b> 
                                                                    <i class="fa fa-check" :class="(user.transaction_count > 10) ? 'text-success' : ''"></i> 
                                                                    {{ user.transaction_count }} Transkasi 
                                                                </b>
                                                                <p style="font-size: 11px;font-style: italic;" class="mt-0">
                                                                    Dapatkan Cashback langsung Rp 50.000 setiap 10 transaksi.
                                                                    {{ 10 - user.transaction_count }} transaksi lagi, untuk mendapatkan casback Rp. 50.000
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="vertical-align: top;">Badge Member</td>
                                                            <td> 
                                                                <span class="badge badge-user-avatar bg-dark mt-3" style="width: fit-content;">
                                                                    <i class="fa fa-badge"></i>
                                                                    Silver Member
                                                                </span>
                                                                
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </fieldset>
                                                <div class="single-input-item" v-if="!isMobile()">
                                                    <button class="btn btn-outline-primary mt-3 btn-block"
                                                        @click="profileUpdate">
                                                        Simpan Profile
                                                    </button>
                                                </div>
                                                <div class="single-input-item" v-else>
                                                    <button class="btn btn-primary mt-3 btn-block"
                                                        @click="profileUpdate">
                                                        Simpan Profile
                                                    </button>
                                                    <button class="btn btn-outline-primary mt-3 btn-block"
                                                        @click="this.logOut()">
                                                        Logout
                                                    </button>
                                                </div>
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
import Datepicker from 'vue3-datepicker'
import moment from 'moment';

export default {
    name: 'Header',
    components: {
        ElseLogin, Datepicker
    },
    data() {
        return {
            user : null,

            // picked: new Date(),
            // picked: null,
        }
    },
    mounted() {
        if (this.$store.state.auth.user) {
            this.user = this.$store.state.auth.user.user;
        }
    },
    
    created() {
        this.profileGet()
        // console.log(new Date());
    },
    methods: {
        profileGet: function () {
            this.axios.get('auth/user', this.$store.state.config)
            .then((response) => {
                this.user = response.data;
                this.user.birth = moment(response.data.birth, 'YYYY-MM-DD').toDate();
                this.user.percen = 0
                
                if (this.user.phone) {
                    this.user.percen = this.user.percen + 35;
                }
                if (this.user.gender) {
                    this.user.percen = this.user.percen + 30;
                }
                
                if (this.user.birth) {
                    this.user.percen = this.user.percen + 25;
                }

                if (this.user.transaction_count > 10) {
                    this.user.percen = this.user.percen + 10;
                }
            })
            .catch(error => {
                this.errorNotif(error)
            })
        },
        profileUpdate: function () {
            this.axios.patch('auth/user/' + this.user.id, this.user, this.$store.state.config)
            .then((response) => {
                this.successNotif('Profile berhasil diperharaui')
            })
            .catch(error => {
                this.errorNotif(error)
            })
        }
    }
}
</script>