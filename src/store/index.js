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
        g: auth.state.user.id,
      }
    },
    default : {
      cart : (localStorage.getItem('cartLocal')) ? parseInt(localStorage.getItem('cartLocal')) : 0,
      cartLoading : false,
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
