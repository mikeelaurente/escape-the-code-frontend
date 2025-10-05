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
        <div
          class="overflow-x-auto scrollbar-sm"
          data-aos="fade-up"
          data-aos-duration="2000"
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
                data-aos="fade-left"
                data-aos-duration="1000"
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
      </div>
    </section>

    <!-- Leaderboard section end -->
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { useAppStore } from '../stores/app';

export default {
  data() {
    return {
      ranking: {},
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
  async mounted() {
    const response = await this.http.get('/story/ranking');
    this.ranking = response.data.data;
  },
};
</script>
