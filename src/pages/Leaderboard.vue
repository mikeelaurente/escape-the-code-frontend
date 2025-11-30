<template>
  <div>
    <!-- breadcrumb start -->
    <section class="pt-30p">
      <div class="section-pt">
        <div
          class="relative bg-[url('../images/photos/breadcrumbImg.png')] bg-cover bg-no-repeat rounded-24 overflow-hidden"
        >
          <div class="container">
            <div
              class="grid grid-cols-12 gap-30p relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]"
            >
              <div class="lg:col-start-2 lg:col-end-12 col-span-12">
                <h2 class="heading-2 text-w-neutral-1 mb-3">Leaderboard</h2>
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
                    <span class="breadcrumb-current">Leaderboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="overlay-11"></div>
        </div>
      </div>
    </section>
    <!-- breadcrumb end -->

    <!-- Leaderboard section start -->
    <section class="section-pb pt-60p">
      <div class="container">

          <div class="flex-y justify-between flex-wrap gap-24p mb-[30px]">
            <h5 class="heading-5 text-w-neutral-1">
              Viewing {{ meta.offset + 1 }} - {{ meta.offset + params.limit }} of
              {{ meta.total }} groups
            </h5>
            <div
              class="flex items-center sm:justify-end max-sm:flex-wrap w-[500px] gap-24p"
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
                    v-model="params.limit"
                    class="select w-full sm:py-3 py-2 px-24p rounded-full !text-base"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                  </select>
                </form>
              </div>
            </div>
          </div>
        <div v-if="!ranking">
          <h3 class="heading-3 text-b-neutral-1 my-4">No user ranking yet.</h3>
        </div>
        <div
          class="overflow-x-auto scrollbar-sm"
          data-aos="fade-up"
          data-aos-duration="2000"
          v-if="ranking"
        >
          <table
            class="text-l-medium font-poppins text-w-neutral-1 w-full whitespace-nowra"
          >
            <thead class="text-left">
              <tr class="bg-shap rounded-t-12">
                <th class="text-l-medium px-24p py-3 lg:min-w-[150px] min-w-25">
                  Placement
                </th>
                <th
                  class="text-l-medium px-24p py-3 lg:min-w-[300px] min-w-[280px]"
                >
                  User
                </th>
                <th class="text-l-medium px-24p py-3 min-w-25">Points</th>
                <th class="text-l-medium px-24p py-3 min-w-25">
                  Sections Completed
                </th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-solid divide-shap border-b border-shap bg-b-neutral-3"
            >
              <tr
                v-for="(rank, idx) in ranking"
                :key="idx"
                :class="{
                  'bg-glass-1': rank.id === user.id,
                }"
              >
                <td class="px-24p py-3">
                  <div class="flex-y gap-3">
                    <i
                      class="ti icon-24"
                      :class="{
                        'text-yellow-400 ti-trophy-filled': rank.rank === 1,
                        'text-gray-400 ti-trophy-filled': rank.rank === 2,
                        'text-orange-700 ti-trophy-filled': rank.rank === 3,
                        'text-gray-400 ti-trophy': rank.rank > 3,
                      }"
                    ></i>
                    <span class="text-l-medium"> {{ rank.rank }} </span>
                  </div>
                </td>
                <td class="px-24p py-3">
                  <div class="flex items-center gap-20p">
                    <img
                      class="size-48p rounded-full shrink-0"
                      :src="rank.photoUrl"
                      alt="profile"
                    />
                    <div>
                      <router-link :to="`/user-stats/` + rank.id">
                        <span class="text-m-medium text-danger mb-1">
                          {{ rank.email }}
                        </span>
                      </router-link>
                      <router-link
                        :to="`/user-stats/` + rank.id"
                        class="text-l-medium text-w-neutral-1 link-1 line-clamp-1"
                      >
                        {{ rank.lastName }}, {{ rank.firstName }}
                      </router-link>
                    </div>
                  </div>
                </td>
                <td class="px-24p py-3">{{ rank.points }}</td>
                <td class="px-24p py-3">
                  {{ rank.completed }}/{{ rank.total }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Pagination
          :total="meta.total"
          :limit="meta.limit"
          :page="meta.page"
          @navigate-to="onNavigateTo"
        ></Pagination>
      </div>
    </section>

    <!-- Leaderboard section end -->
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { useAppStore } from '../stores/app';
import Pagination from '../components/Pagination.vue';
import { toSearchParams, debounce } from '../assets/js/utils';
import { SlimSelectCustom } from '../assets/js/lib/SlimSelectCustom.js';

export default {
  components: {
    Pagination
  },
  data() {
    return {
      ranking: {},
      params: {
        page: 1,
        limit: 5,
        search: '',
        sort: [
          {
            name: 'title',
            order: 'asc',
          },
        ],
      },
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        offset: 0,
      },
    };
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapStores(useAppStore),
    user() {
      return this.authStore.user;
    },
  },
  inject: ['http'],
  methods: {
    async fetchRangkings() {
      const params = toSearchParams(this.params);
      const response = await this.http.get('/courses/ranking?' + params.toString());
      this.ranking = response.data.data;
      this.meta = {
        ...response.data.meta,
      };
    },
    onNavigateTo(page) {
      this.params.page = page;
    },

    search: debounce(function (event) {
      this.params.search = event.target.value;
    }, 300),
  },
  watch: {
    params: {
      handler: function (val) {
        this.fetchRangkings();
      },
      deep: true,
    },
  },
  async mounted() {
    this.fetchRangkings();
    SlimSelectCustom();
  },
};
</script>
