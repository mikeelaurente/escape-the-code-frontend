<template>
  <div ref="wrapper" @click="wrapperClicked">
    <preloader></preloader>
    <scroll-to-top></scroll-to-top>
    <navbar></navbar>
    <left-right-sidebar></left-right-sidebar>
    <div ref="layout" class="app-layout">
      <router-view v-slot="{ Component, route }">
        <main>
          <transition name="slide" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </main>
      </router-view>
    </div>
  </div>
</template>
<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.1s ease-in-out;
}

.slide-enter-from {
  transform: translateX(100%); /* Start from the right */
}

.slide-enter-to {
  transform: translateX(0); /* End at its original position */
}

.slide-leave-from {
  transform: translateX(0); /* Start from its original position */
}

.slide-leave-to {
  transform: translateX(-100%); /* Slide out to the left */
}

/* Basic setup for the flip animation */
.flip-enter-active,
.flip-leave-active {
  transition: 0.2s all ease; /* Adjust duration as needed */
}

.flip-enter-from,
.flip-leave-to {
  transform: rotateY(
    90deg
  ); /* Starting state for entering, ending state for leaving */
  opacity: 0;
}

/* You'll need to set position: absolute on the components */
/* .router-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} */
</style>

<script>
import { mapStores } from 'pinia';
import LeftRightSidebar from './components/partials/LeftRightSidebar';
import Navbar from './components/partials/Navbar';
import Preloader from './components/partials/Preloader';
import ScrollToTop from './components/partials/ScrollToTop';
import { useAuthStore } from './stores/auth';
import { useAppStore } from './stores/app';

export default {
  name: 'app',
  components: {
    LeftRightSidebar,
    Navbar,
    Preloader,
    ScrollToTop,
  },
  methods: {
    wrapperClicked(e) {
      if (this.appStore.isSettingsOpen) {
        this.appStore.closeSettings();
      }
    },
  },

  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useAppStore),
    user() {
      return this.authStore.user;
    },
    hideLeftNav() {
      return (
        this.$route.path.includes('/login') ||
        this.$route.path.includes('/verify-email') ||
        this.$route.path.includes('/password-reset') ||
        this.$route.path.includes('/password-confirm') ||
        this.$route.path.includes('/register')
      );
    },
  },
  mounted() {
    this.appStore.initTheme();
  },
  watch: {
    hideLeftNav(current, old) {
      if (current !== old && current) {
        this.$refs.layout.style.marginLeft = 'auto';
      } else {
        this.$refs.layout.removeAttribute('style');
      }
    },
  },
};
</script>
