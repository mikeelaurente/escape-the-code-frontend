import { defineStore } from 'pinia';
import { inject } from 'vue';

const tokenKey = 'accessToken';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    userToken: null,
    initialized: false,
    user: {
      id: null,
      email: '',
      firstName: '',
      lastName: '',
    },
  }),
  actions: {
    login(data) {
      this.isAuthenticated = true;
      this.userToken = data.accessToken;
      this.user = data.user;
      console.log('-------data-------', data);
      console.log('setting token', this.userToken);
      localStorage.setItem(tokenKey, this.userToken);
    },
    logout() {
      this.isAuthenticated = false;
      this.userToken = null;
      this.user = {};
      localStorage.removeItem(tokenKey);
    },
    async init() {
      const http = inject('http');
      if (this.initialized) {
        return;
      }
      this.initialized = true;
      try {
        const token = localStorage.getItem(tokenKey);
        const response = await http.get('/auth/me');
        if (response.status !== 200) {
          this.logout();
        } else {
          this.login({
            user: response.data.data.user,
            accessToken: token,
          });
        }
      } catch (e) {
        console.log('errror', e);
        this.logout();
      }
    },
  },
});
