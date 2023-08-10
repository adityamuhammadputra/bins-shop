import { createStore } from 'vuex'
import { auth } from './auth' 

export default createStore({
  state: {
    meta : {
      q:'',
      sort:'',
      page: 1,
      length: null,
      from:'',
      to:'',
      total: null,
      data : [],
    },
    config : {
      headers:{
        Authorization: (auth.state.user) ? 'Bearer ' + auth.state.user.accessToken : null,
      }
    },
    default : {
      cart : (localStorage.getItem('cartLocal')) ? parseInt(localStorage.getItem('cartLocal')) : 0,
      carts: [],
      notif : (localStorage.getItem('notifLocal')) ? parseInt(localStorage.getItem('notifLocal')) : 0,
      cartLoading : false,
      exclude : '',
      trx: 0,
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  }
})
