import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    isSettingsOpen: false,
    isDarkMode: localStorage.getItem('theme') !== 'light',
  }),
  actions: {
    openSettings(data) {
      this.isSettingsOpen = true;
    },
    closeSettings() {
      this.isSettingsOpen = false;
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      const theme = this.isDarkMode ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      if (this.isDarkMode) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    },
    initTheme() {
      const theme = localStorage.getItem('theme') || 'dark';
      this.isDarkMode = theme === 'dark';
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.add('light');
      }
    },
  },
});
