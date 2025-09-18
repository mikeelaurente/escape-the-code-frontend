import { defineStore } from 'pinia';
import { inject } from 'vue';

const tokenKey = 'accessToken';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    userToken: null,
    initialized: false,
  }),
  actions: {
    login(token) {
      this.isAuthenticated = true;
      this.userToken = token;
      localStorage.setItem(tokenKey, this.userToken);
    },
    logout() {
      this.isAuthenticated = false;
      this.userToken = null;
      localStorage.removeItem(tokenKey);
    },
    async init() {
      if (this.initialized) {
        return;
      }
      this.initialized = true;
      const http = inject('http');
      try {
        const response = await http.get('/auth/me');
        if (response.status !== 200) {
          this.logout();
        } else {
          const token = localStorage.getItem(tokenKey);
          this.login(token);
        }
      } catch (e) {
        this.logout();
      }
    },
  },
});
