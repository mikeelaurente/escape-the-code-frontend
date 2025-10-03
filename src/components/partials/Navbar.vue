<template>
  <header id="header" class="absolute w-full z-[999]">
    <div class="mx-auto relative">
      <div id="header-nav" class="w-full px-24p bg-b-neutral-3 relative">
        <div class="flex items-center justify-between gap-x-2 mx-auto py-20p">
          <nav
            class="relative xl:grid xl:grid-cols-12 flex justify-between items-center gap-24p text-semibold w-full"
          >
            <div
              class="3xl:col-span-6 xl:col-span-5 flex items-center 3xl:gap-x-10 gap-x-5"
            >
              <router-link to="/">
                <img
                  class="xl:w-[190px] sm:w-58 w-48 h-auto shrink-0"
                  src="../../assets/images/icons/logo.png"
                  alt="brand"
                />
              </router-link>
            </div>
            <div
              class="3xl:col-span-6 xl:col-span-7 flex items-center xl:justify-end justify-end w-full"
            >
              <div class="relative hidden lg:block mr-4">
                <span
                  v-if="user.id"
                  class="px-3 py-2 rounded-12 btn-outline-secondary font-bold"
                  title="Credits Available"
                >
                  <i class="ti ti-moneybag"></i>
                  {{ authStore.user.credits }}
                </span>
              </div>
              <div
                class="flex items-end lg:gap-x-32p gap-x-2"
                v-if="user && user.id"
              >
                <div
                  x-data="dropdown"
                  class="dropdown relative shrink-0 lg:block hidden"
                >
                  <button
                    @click.prevent.stop="toggle()"
                    class="dropdown-toggle gap-24p"
                  >
                    <span class="flex items-center gap-3">
                      <img
                        class="size-48p rounded-full shrink-0"
                        :src="authStore.avatar"
                        alt="profile"
                      />
                      <span class="">
                        <span class="text-m-medium text-w-neutral-1 mb-1">
                          {{ user.email }}
                        </span>
                      </span>
                    </span>
                    <span
                      :class="appStore.isSettingsOpen ? '-rotate-180' : ''"
                      class="btn-c btn-c-lg text-w-neutral-4 icon-32 transition-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 9l6 6l6 -6" />
                      </svg>
                    </span>
                  </button>

                  <div v-if="appStore.isSettingsOpen" class="dropdown-content">
                    <router-link
                      :to="`/user-stats/` + user.id"
                      class="dropdown-item"
                      >Profile</router-link
                    >
                    <router-link to="/profile" class="dropdown-item"
                      >Settings</router-link
                    >
                    <a @click.prevent="logout()" class="dropdown-item"
                      >Logout</a
                    >
                  </div>
                </div>

                <button
                  @click="showSideNavMobile = !showSideNavMobile"
                  class="lg:hidden btn-c btn-c-lg btn-c-dark-outline nav-toggole shrink-0"
                >
                  <i class="ti ti-menu-2"></i>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <nav
        class="w-full flex justify-between items-center"
        v-if="showSideNavMobile"
      >
        <div
          class="duration-500 ease-in-out fixed h-screen left-0 max-md:translate-x-0 md:translate-y-0 shadow-lg small-nav top-0 transform transition-transform w-full z-[999]"
        >
          <div
            class="absolute z-[5] inset-0 bg-b-neutral-3 flex-col-c min-h-screen max-md:max-w-[400px]"
          >
            <div
              class="container max-md:p-0 md:overflow-y-hidden overflow-y-scroll scrollbar-sm lg:max-h-screen"
            >
              <div class="p-40p">
                <div class="flex justify-between items-center mb-10">
                  <router-link to="/">
                    <img
                      class="w-[142px]"
                      src="../../assets/images/icons/logo.png"
                      alt="EscapeTheCode"
                    />
                  </router-link>
                  <button
                    @click="showSideNavMobile = false"
                    class="nav-close btn-c btn-c-md btn-c-primary"
                  >
                    <i class="ti ti-x"></i>
                  </button>
                </div>
                <div class="grid grid-cols-12 gap-x-24p gap-y-10 sm:p-y-48p">
                  <div class="xl:col-span-8 md:col-span-7 col-span-12">
                    <div
                      class="overflow-y-scroll overflow-x-hidden scrollbar scrollbar-sm xl:max-h-[532px] md:max-h-[400px] md:pr-4"
                    >
                      <ul
                        class="flex flex-col justify-center items-start gap-20p text-w-neutral-1"
                      >
                        <li class="mobail-menu">
                          <router-link to="/">Dashboard</router-link>
                        </li>
                        <li class="mobail-menu">
                          <router-link to="/story">Story</router-link>
                        </li>
                        <li class="mobail-menu">
                          <router-link to="/leaderboard"
                            >Leaderboard</router-link
                          >
                        </li>
                        <li class="mobail-menu">
                          <router-link to="/achievements"
                            >Achievements</router-link
                          >
                        </li>
                        <li class="mobail-menu">
                          <router-link :to="`/user-stats/` + user.id"
                            >Profile</router-link
                          >
                        </li>
                        <li class="mobail-menu">
                          <router-link to="/profile">Settings</router-link>
                        </li>
                        <li class="mobail-menu">
                          <a @click.prevent="logout()">Logout</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="xl:col-span-4 md:col-span-5 col-span-12">
                    <div
                      class="flex flex-col items-baseline justify-between h-full"
                    >
                      <div class="mt-40p">
                        <img
                          class="mb-16p"
                          src="../../assets/images/icons/logo.png"
                          alt="logo"
                        />
                        <p class="text-base text-w-neutral-3 mb-32p">
                          Learn JavaScript the fun way in Escape the Code, a
                          gamified platform with real coding practice and smart
                          feedback.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-close min-h-[200vh] navbar-overly"></div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
import { mapStores } from 'pinia';
import { useAuthStore } from '../../stores/auth';
import { useAppStore } from '../../stores/app';

export default {
  data() {
    return { showSideNavMobile: false };
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useAppStore),
    user() {
      console.log('user access', this.authStore.user);
      return this.authStore.user;
    },
    route() {
      return this.$route.path;
    },
  },
  watch: {
    route(current, old) {
      if (current !== old && this.showSideNavMobile) {
        this.showSideNavMobile = false;
      }
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.$router.push('/login');
      this.close();
    },
    toggle() {
      this.appStore.isSettingsOpen
        ? this.appStore.closeSettings()
        : this.appStore.openSettings();
    },
    close() {
      this.appStore.closeSettings();
    },
  },
};
</script>
