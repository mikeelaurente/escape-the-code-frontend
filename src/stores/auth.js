import { defineStore } from 'pinia';

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
      credits: 0,
      about: '',
    },
  }),
  getters: {
    avatar() {
      return this.user.avatar;
    },
    banner() {
      return this.user.banner;
    },
  },
  actions: {
    login(data) {
      this.isAuthenticated = true;
      this.userToken = data.accessToken;
      this.user = JSON.parse(JSON.stringify(data.user));
      localStorage.setItem(tokenKey, this.userToken);
    },
    logout() {
      this.isAuthenticated = false;
      this.userToken = null;
      this.user = {};
      this.initialized = false;
      localStorage.removeItem(tokenKey);
    },
    setAvatar(avatar) {
      this.user.avatar = avatar;
    },
    setBanner(banner) {
      this.user.banner = banner;
    },
    setCredits(credits) {
      this.user.credits = credits;
    },
    async init() {
      if (this.initialized) {
        return;
      }
      this.initialized = true;
      await this.fetchUser();
    },
    async fetchUser() {
      const http = this.http;
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
        this.logout();
      }
    },
  },
});
