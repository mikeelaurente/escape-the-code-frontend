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
      avatar: 'user.png',
      about: '',
    },
  }),
  getters: {
    avatar() {
      console.log('##### user', this.user);
      return `http://localhost:3000/avatars/${this.user.avatar}`;
    },
  },
  actions: {
    login(data) {
      this.isAuthenticated = true;
      this.userToken = data.accessToken;
      this.user = JSON.parse(JSON.stringify(data.user));
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
    setAvatar(avatar) {
      this.user.avatar = avatar;
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
