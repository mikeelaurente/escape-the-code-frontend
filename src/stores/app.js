import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    isSettingsOpen: false,
  }),
  actions: {
    openSettings(data) {
      this.isSettingsOpen = true;
    },
    closeSettings() {
      this.isSettingsOpen = false;
    },
  },
});
