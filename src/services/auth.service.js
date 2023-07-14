import axios from 'axios';
class AuthService {
    login(user) {
      // console.log('user: ' + user);
      return axios
        .post('auth/login', {
          email: user.email,
          name: user.name,
          picture: user.picture,
          provider_id: user.provider_id,
          provider: user.provider,
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response.data;
        });
    }

    refresh(token) {
      return axios
        .post('auth/refresh', null, {
          headers:{
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          }
        })
        .then(response => {
          // console.log(response);
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          window.location.reload()
          return response.data;
        });
    }
  
    logout() {
      localStorage.removeItem('user');
    }
  
    // register(user) {
    //   return axios.post('auth/signup', {
    //     username: user.username,
    //     email: user.email,
    //     password: user.password
    //   });
    // }
  }
  
  export default new AuthService();