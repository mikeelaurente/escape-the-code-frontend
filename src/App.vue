<template>
  <preloader></preloader>
  <scroll-to-top></scroll-to-top>
  <navbar></navbar>
  <left-right-sidebar></left-right-sidebar>
  <div
    class="app-layout"
    :style="{
      'margin-left': user && user.id ? '130px' : 'auto',
    }"
  >
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import LeftRightSidebar from './components/partials/LeftRightSidebar.vue';
import Navbar from './components/partials/navbar.vue';
import Preloader from './components/partials/preloader.vue';
import ScrollToTop from './components/partials/scrollToTop.vue';
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
  },
};
</script>
