<template>
  <div>
    <!-- breadcrumb start -->
    <section class="pt-30p">
      <div class="section-pt">
        <div
          class="relative bg-[url('../images/photos/breadcrumbImg1.png')] bg-cover bg-no-repeat rounded-24 overflow-hidden"
        >
          <div class="container">
            <div
              class="grid grid-cols-12 gap-30p relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]"
            >
              <div class="lg:col-start-2 lg:col-end-12 col-span-12">
                <h2
                  class="heading-2 mb-3"
                  :class="
                    appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                  "
                >
                  Progress
                </h2>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/" class="breadcrumb-link"
                      >Home</router-link
                    >
                  </li>
                  <li class="breadcrumb-item">
                    <span class="breadcrumb-icon">
                      <i class="ti ti-chevrons-right"></i>
                    </span>
                  </li>
                  <li class="breadcrumb-item">
                    <span class="breadcrumb-current">Progress</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="overlay-11"></div>
        </div>
      </div>
    </section>
    <div v-if="!progress.length" class="container">
      <h3
        class="heading-3 mb-20p text-center my-10"
        :class="appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'"
      >
        No sections completed yet :(
      </h3>
    </div>
    <!-- breadcrumb end -->
    <!-- User profile Progress section start -->
    <section class="section-pb pt-60p overflow-visible">
      <div class="container">
        <div class="grid grid-cols-12">
          <div class="4xl:col-start-2 4xl:col-end-11 col-span-12">
            <!-- Timeline -->
            <div v-for="(time, key) in timeline" :key="key">
              <!-- Heading -->
              <div class="ps-2 my-2 first:mt-0">
                <h3 class="text-xs font-medium uppercase text-gray-500 my-24p">
                  {{ time.group }}
                </h3>
              </div>
              <!-- End Heading -->

              <!-- Item -->
              <div
                class="flex gap-x-3 my-3"
                v-for="(item, idx) in time.items"
                :key="idx"
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                <!-- Icon -->
                <div
                  class="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200"
                >
                  <div
                    class="relative z-10 size-7 flex justify-center items-center"
                  >
                    <div class="size-2 rounded-full bg-gray-400"></div>
                  </div>
                </div>
                <!-- End Icon -->

                <!-- Right Content -->
                <div
                  class="grow px-4 py-6 rounded-12 transition-1"
                  :class="
                    appStore.isDarkMode
                      ? 'bg-neutral-900'
                      : 'bg-white border border-gray-200'
                  "
                >
                  <h3
                    class="flex gap-x-1.5 font-semibold"
                    :class="
                      appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                    "
                  >
                    <svg
                      class="shrink-0 size-7 mt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                      ></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" x2="8" y1="13" y2="13"></line>
                      <line x1="16" x2="8" y1="17" y2="17"></line>
                      <line x1="10" x2="8" y1="9" y2="9"></line>
                    </svg>
                    {{ item.section.title }}
                  </h3>
                  <p
                    class="mt-1 text-sm"
                    :class="
                      appStore.isDarkMode ? 'text-gray-600' : 'text-gray-700'
                    "
                  >
                    {{ item.section.description }}
                  </p>
                </div>
                <!-- End Right Content -->
              </div>
              <!-- End Item -->
            </div>
            <!-- End Timeline -->
          </div>
        </div>
      </div>
    </section>

    <!-- User profile Progress section end -->
  </div>
</template>

<script>
import { Toast } from '../assets/js/swal-mixin';
import dayjs from 'dayjs';
import { mapStores } from 'pinia';
import { useAppStore } from '../stores/app';

export default {
  data() {
    return {
      progress: [],
    };
  },
  inject: ['http'],
  computed: {
    ...mapStores(useAppStore),
    timeline() {
      const group = this.progress.reduce((acc, cur) => {
        const dt = dayjs(cur.createdAt);
        const key = dt.format('YYYY-MM-DD');
        if (!(key in acc)) {
          acc[key] = {
            group: dt.format('MMM DD, YYYY'),
            items: [],
          };
        }
        acc[key].items.push(cur);
        return acc;
      }, {});
      return group;
    },
  },
  async mounted() {
    try {
      const { data } = await this.http.get('/courses/progress');
      this.progress = data.data;
    } catch (e) {
      Toast.fire({
        icon: 'error',
        title: 'Failed to retrieve progress',
      });
    }
  },
};
</script>
