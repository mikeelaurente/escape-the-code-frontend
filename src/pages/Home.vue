<template>
  <div>
    <!-- hero section start -->
    <section class="section-pt">
      <div class="container relative pt-[30px]">
        <div
          class="thumbs-carousel-container"
          data-carousel-name="home-hero-slider"
          data-slides-per-view="3"
        >
          <div class="swiper thumbs-gallery-main">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="w-full rounded-32 overflow-hidden relative">
                  <img
                    class="w-full xxl:h-[630px] xl:h-[580px] lg:h-[520px] md:h-[420px] sm:h-[380px] h-[300px] object-cover"
                    src="../assets/images/photos/heroBanner1.png"
                    alt="product"
                  />
                  <div
                    class="absolute inset-0 z-[2] mx-80p 3xl:pt-[125px] xxl:pt-28 xl:pt-25 md:pt-12 pt-8"
                  >
                    <div class="max-w-[790px]">
                      <h1
                        class="display-120 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-2"
                        data-text="THINK. CODE. CONQUER."
                      >
                        THINK. CODE. CONQUER.
                      </h1>
                      <div
                        class="flex flex-wrap items-center gap-3 text-l-medium text-w-neutral-1 mb-40p"
                      ></div>
                      <router-link
                        to="/courses"
                        class="btn btn-lg btn-primary rounded-12"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                      >
                        Start Now
                      </router-link>
                    </div>
                  </div>
                  <div class="overlay-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div
        class="pb-30p overflow-visible relative grid 4xl:grid-cols-12 grid-cols-1 gap-30p lg:-mt-50 md:-mt-40 sm:mt-48 xsm:mt-0"
      >
        <div class="4xl:col-start-2 4xl:col-end-12">
          <div
            class="relative z-10 grid 4xl:grid-cols-11 items-center gap-30p md:mt-10 bg-b-neutral-3 shadow-4 p-40p rounded-24 xl:divide-x divide-shap/70"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <div
              class="3xl:col-span-4 xl:col-span-7 col-span-12 grid xl:grid-cols-4 grid-cols-2 gap-y-30p xl:divide-x divide-shap/70"
            >
              <div class="flex-col-c text-center">
                <h4 class="heading-4 text-w-neutral-1">Rank</h4>
                <h3 class="py-3 heading-3 text-yellow-300 text-center">
                  <div v-if="data.ranking.rank">
                    {{ data.ranking.rank }} <i class="ti ti-crown"></i>
                  </div>
                  <span v-else>- -</span>
                </h3>
              </div>
              <div class="flex-col-c text-center">
                <h4 class="heading-4 text-w-neutral-1">
                  Total Courses Enrolled
                </h4>
                <h3 class="py-3 heading-3 text-fuchsia-500 text-center">
                  {{ data.ranking.points }} <i class="ti ti-book"></i>
                </h3>
              </div>
              <div class="flex-col-c text-center">
                <h4 class="heading-4 text-w-neutral-1">Total Points</h4>
                <h3 class="py-3 heading-3 text-lime-500 text-center">
                  {{ data.ranking.points }} <i class="ti ti-star"></i>
                </h3>
              </div>
              <div class="flex-col-c text-center">
                <h4 class="heading-4 text-w-neutral-1">
                  Shortest Completion Time
                </h4>
                <h3 class="py-3 heading-3 text-cyan-600 text-center">
                  <div v-if="data.ranking.shortestTime">
                    {{ data.ranking.shortestTime }} sec
                    <i class="ti ti-clock"></i>
                  </div>
                  <span v-else>- -</span>
                </h3>
              </div>
            </div>
          </div>

          <div
            class="tab-navbar flex items-center flex-wrap gap-x-32p gap-y-24p sm:text-xl text-lg *:font-borda font-medium text-w-neutral-1 whitespace-nowrap pt-30p"
          >
            <a
              @click.prevent="selectedTab = 'overview'"
              class="cursor-pointer"
              :class="{
                active: selectedTab == 'overview',
              }"
            >
              Overview
            </a>
            <a
              @click.prevent="selectedTab = 'transactions'"
              class="cursor-pointer"
              :class="{
                active: selectedTab == 'transactions',
              }"
            >
              Transactions
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedTab == 'overview'">
      <section class="mb-10">
        <div class="container">
          <template v-if="loaded">
            <h2>Enrolled Courses</h2>
            <div v-if="!data.courses">
              <h3 class="heading-3 text-b-neutral-1 my-4">
                No course enrolled yet :(
              </h3>
            </div>
            <div
              v-if="data.courses"
              class="overflow-x-auto scrollbar-sm rounded-12"
            >
              <table
                class="text-sm font-poppins text-w-neutral-1 w-full whitespace-nowra"
              >
                <thead class="text-left">
                  <tr class="bg-shap rounded-t-12">
                    <th class="text-sm px-24p py-3 lg:min-w-[150px] min-w-25">
                      Course
                    </th>
                    <th class="text-sm px-24p py-3 max-w-25">Actions</th>
                  </tr>
                </thead>
                <tbody
                  class="divide-y divide-solid divide-shap border-b border-shap bg-b-neutral-3"
                >
                  <template v-for="(course, idx) in data.courses" :key="idx">
                    <tr>
                      <td class="px-24p py-3">
                        <div class="flex-y gap-3">
                          <span class="text-sm"> {{ course.title }} </span>
                        </div>
                      </td>
                      <td class="px-24p py-3 text-right">
                        <router-link
                          :to="`/courses/${course.id}/progress`"
                          class="btn btn-sm btn-primary rounded-12 text-center"
                        >
                          View <span class="hidden sm:inline">Progress</span>
                        </router-link>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </template>
        </div>
      </section>
    </div>

    <div v-if="selectedTab == 'transactions'" data-aos="zoom-in">
      <!-- Progress section start -->
      <section class="section-pb">
        <div class="container">

            <div class="flex-y justify-between flex-wrap gap-24p mb-[30px]">
              <h5 class="heading-5 text-w-neutral-1">
                Viewing {{ creditTransactionsStore.meta.offset + 1 }} -
                {{ Number(creditTransactionsStore.meta.offset) + Number(creditTransactionsStore.params.limit) }} of
                {{ creditTransactionsStore.meta.total }} groups
              </h5>
              <div
                class="flex items-center sm:justify-end max-sm:flex-wrap justify-center w-[500px] gap-24p"
              >
                <form
                  class="flex items-center sm:gap-3 gap-2 max-w-[500px] w-full px-20p py-16p bg-b-neutral-3 rounded-full"
                >
                  <span class="flex-c icon-20 text-white">
                    <i class="ti ti-search"></i>
                  </span>
                  <input
                    autocomplete="off"
                    class="bg-transparent w-full"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search..."
                    @input="search"
                  />
                </form>
                <div class="shrink-0 flex-y gap-28p">
                  <span class="text-m-medium text-w-neutral-1"> Per Page: </span>
                  <form class="select-2 shrink-0">
                    <select
                      v-model="creditTransactionsStore.params.limit"
                      class="select w-full sm:py-3 py-2 px-24p rounded-full !text-base"
                      @change="
                        creditTransactionsStore.params.page = 1;
                        dirty = true;
                      "
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="50">50</option>
                      <option value="75">75</option>
                    </select>
                  </form>
                </div>
              </div>
            </div>


            <div class="flex my-4 gap-4 items-center justify-center">
              <div class="shrink-0 flex-y gap-28p">
                <span class="text-m-medium text-w-neutral-1"> Type: </span>
                <form class="select-2 shrink-0">
                  <select
                    v-model="params.filters.type"
                    class="select w-full sm:py-3 py-2 px-24p rounded-full !text-base"
                  >
                    <option value="all">All</option>
                    <option value="in">Debit</option>
                    <option value="out">Credit</option>
                  </select>
                </form>
              </div>
              <div class="shrink-0 flex-y gap-28p">
                <span class="text-m-medium text-w-neutral-1"> Group: </span>
                <form class="select-2 shrink-0">
                  <select
                    v-model="params.filters.group"
                    class="select w-full sm:py-3 py-2 px-24p rounded-full !text-base"
                  >
                    <option value="all">All</option>
                    <option value="hint">Hints</option>
                    <option value="reward">Rewards</option>
                  </select>
                </form>
              </div>
            </div>


          <div class="overflow-x-auto scrollbar-sm rounded-12">
            <table
              class="text-sm font-poppins text-w-neutral-1 w-full whitespace-nowra"
            >
              <thead class="text-left">
                <tr class="bg-shap rounded-t-12">
                  <th class="text-sm px-24p py-3 min-w-25">Date</th>
                  <th class="text-sm px-24p py-3 lg:min-w-[150px] min-w-25">
                    Title
                  </th>
                  <th class="text-sm px-24p py-3 min-w-25">Type</th>
                  <th class="text-sm px-24p py-3 min-w-25">Amount</th>
                </tr>
              </thead>
              <tbody
                class="divide-y divide-solid divide-shap border-b border-shap bg-b-neutral-3"
              >
                <template
                  v-for="(transaction, idx) in creditTransactionsStore.transactionList"
                  :key="idx"
                >
                  <tr>
                    <td class="px-24p py-3 text-left">
                      {{ formatDate(transaction.createdAt) }}
                    </td>
                    <td class="px-24p py-3">
                      <div class="flex-y gap-3">
                        <span class="text-sm"> {{ transaction.title }} </span>
                      </div>
                    </td>
                    <td class="px-24p py-3">
                      <span
                        :class="{
                          'text-success': transaction.type === 'in',
                          'text-danger': transaction.type === 'out',
                        }"
                      >
                        {{ transaction.type === 'in' ? 'Debit' : 'Credit' }}
                      </span>
                    </td>
                    <td class="px-24p py-3 text-right">
                      <span
                        :class="{
                          'text-success': transaction.type === 'in',
                          'text-danger': transaction.type === 'out',
                        }"
                      >
                        {{ transaction.type === 'in' ? '+' : '-' }}
                        {{ transaction.amount }}
                        <i class="ti ti-star-filled"></i>
                      </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <Pagination
            :total="creditTransactionsStore.meta.total"
            :limit="creditTransactionsStore.meta.limit"
            :page="creditTransactionsStore.meta.page"
            @navigate-to="onNavigateTo"
          ></Pagination>
        </div>
      </section>
      <!-- Progress section end -->
    </div>
  </div>
</template>

<style scoped>
.chart {
  background: #343839;
}
</style>

<script>
import dayjs from 'dayjs';
import { mapStores } from 'pinia';
import { debounce } from '../assets/js/utils';
import { useTransactionStore } from '../stores/transactions';
import Pagination from '../components/Pagination.vue';
import { SlimSelectCustom } from '../assets/js/lib/SlimSelectCustom.js';

export default {
  components: {
    Pagination
  },
  data() {
    return {
      selectedTab: 'overview',
      data: {
        ranking: {},
        courses: [],
        transactions: [],
        longestStreak: 0,
      },
      loaded: false,
      swalClasses: {
        popup: 'bg-gray-800 text-white shadow-lg rounded-lg',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-c-dark-outline',
      },
    };
  },
  inject: ['http'],
  computed: {
    ...mapStores(useTransactionStore),
    params() {
      return this.creditTransactionsStore.params;
    },
  },
  watch: {
    params: {
      handler: function (newVal) {
        this.creditTransactionsStore.getTransactions();
      },
      deep: true,
    },
    selectedTab(newVal) {
      if (newVal === 'transactions') {
        setTimeout(() => {
          SlimSelectCustom();
        }, 100);
      }
    }
  },
  async mounted() {
    this.loaded = false;
    const response = await this.http.get('/users/dashboard');
    this.data = {
      courses: response.data.data.courses,
      ranking: response.data.data.ranking,
    };
    this.loaded = true;
    this.creditTransactionsStore.getTransactions();
  },
  methods: {
    onNavigateTo(page) {
      this.creditTransactionsStore.params.page = page;
    },
    search: debounce(function (event) {
      this.creditTransactionsStore.params.page = 1;
      this.creditTransactionsStore.params.search = event.target.value;
    }, 300),

    formatDate(date) {
      const dt = dayjs(date);
      return dt.format('YYYY-MM-DD HH:mm:ss');
    },
    formatTime(seconds) {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds - hours * 3600) / 60);
      seconds = seconds - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return hours + 'h:' + minutes + 'm:' + seconds + 's';
    },
  },
};
</script>
