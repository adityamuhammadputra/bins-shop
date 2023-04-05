import axios from 'axios';

class AuthService {
    login(user) {
      // console.log('user: ' + user);
      return axios
        .post('auth/login', {
          email: user.email,
          name: user.name,
          picture: user.picture,
          sub: user.sub,
        })
        .then(response => {
            // console.log(response.data);
          if (response.data.email) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
  
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