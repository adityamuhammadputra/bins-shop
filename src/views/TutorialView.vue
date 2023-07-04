<template>
    <div class="section pt-2 mb-5" :class="(isMobile() ? '' : 'mt-5')">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-12 order-1 order-lg-1">
                    <!-- Sidebar Widget Start -->
                    <aside class="sidebar_widget mt-10 mt-lg-0 m-0-mobile">
                        <div class="widget_inner">
                            <div class="widget-list mb-10">
                                <h3 class="widget-title">Tutorial Aktivasi</h3>
                                <div class="sidebar-body">
                                    <ul class="sidebar-list">
                                        <template v-for="(tutorial, index) in dataTutorial" v-if="dataTutorial.length > 0">
                                        <li
                                            v-if="tutorial.desc !== null">
                                            <a href="#" :class="(active.name == tutorial.name ? 'active' : '')" 
                                                @click="active.name = tutorial.name; 
                                                        active.pdf = this.axios.defaults.baseURL + 'storage/' + tutorial.pdf">
                                                {{ tutorial.desc }}
                                            </a>
                                        </li>
                                        <li v-else
                                            style="font-size: 14px;color: #b5b5b5;font-weight: 500;">{{ tutorial.name }}
                                        </li>
                                        </template>
<!-- 
                                        <li>
                                            <a href="#" :class="(active == 'key' ? 'active' : '')" @click="active = 'key'">
                                                Key Office 2016, 2019, 2021
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" :class="(active == '365' ? 'active' : '')" @click="active = '365'">
                                                Office 365
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" :class="(active == 'windows' ? 'active' : '')" @click="active = 'windows'">
                                                key Windows 10/11
                                            </a>
                                        </li>
                                        <li><a href="#">Visio & Project</a></li>
                                        <li><a href="#">Hapus Key KMS /crack </a></li>
                                        <li style="font-size: 14px;color: #b5b5b5;font-weight: 500;">MAC OS</li>
                                        <li><a href="#">Office 365 </a></li>
                                        <li><a href="#">Office 2016, 2019, 2021</a></li> -->
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="widget-list mb-10">
                                <h3 class="widget-title mb-4">Link Download for Windows</h3>
                                <div class="sidebar-body">
                                    <ul class="tags mb-n2">
                                        <li><a href="#">Office </a></li>
                                        <li><a href="#">Visio </a></li>
                                        <li><a href="#">Project</a></li>
                                        <li><a href="#">Windows OS</a></li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </aside>
                    <!-- Sidebar Widget End -->
                </div>

                <div class="col-lg-9 col-12 order-2 order-lg-2">
                    <iframe :src="active.pdf" width="100%" height="2100px"></iframe>
                </div>
            </div>
        </div>
    </div>
   
</template>



<script>
// @ is an alias to /src
// 

export default {
    name: 'tutorial',
    // components: {  
    //     Carousel, Slide, Pagination, Navigation, ProductList, 
    // }, 
    data() {
        return {
            active: {
                name: '',
                pdf: '',
            },
            dataTutorial: [],
        }
    },
    mounted() {
        this.tutorialIndex();
    },
    methods: {
        tutorialIndex: function() {
            this.axios.get('tutorial', this.$store.state.config)
            .then((response) => {
                this.dataTutorial = response.data
                this.active.name = response.data[1].name
                this.active.pdf = this.axios.defaults.baseURL + 'storage/' + response.data[1].pdf
            }) 
            .catch(error => {
                this.errorNotif(error)
            })
            .finally(
                () => this.loading = false
            )
        },
    }
}
</script>
