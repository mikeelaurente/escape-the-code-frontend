<template>
  <preloader></preloader>
  <scroll-to-top></scroll-to-top>
  <navbar></navbar>
  <left-right-sidebar></left-right-sidebar>
  <div ref="layout" class="app-layout">
    <main>
      <router-view :key="$route.path"></router-view>
    </main>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import LeftRightSidebar from './components/partials/LeftRightSidebar';
import Navbar from './components/partials/Navbar';
import Preloader from './components/partials/Preloader';
import ScrollToTop from './components/partials/ScrollToTop';
import { useAuthStore } from './stores/auth';

export default {
  name: 'app',
  components: {
    LeftRightSidebar,
    Navbar,
    Preloader,
    ScrollToTop,
  },

  computed: {
    ...mapStores(useAuthStore),
    user() {
      console.log('user access', this.authStore.user);
      return this.authStore.user;
    },
    inLogin() {
      return this.$route.path.includes('/login');
    },
  },
  watch: {
    inLogin(current, old) {
      console.log('inlogin', old, current);
      if (current !== old && current) {
        console.log('changing style');
        this.$refs.layout.style.marginLeft = 'auto';
      } else {
        this.$refs.layout.removeAttribute('style');
      }
    },
  },
};
</script>
