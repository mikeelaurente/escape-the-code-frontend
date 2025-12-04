<template>
  <div>
    <section class="pt-30p">
      <div class="section-pt" v-if="status === 'loading'">
        <div class="flex justify-center items-center min-h-[50vh]">
          <i
            class="ti ti-loader icon-60 animate-spin"
            :class="appStore.isDarkMode ? 'text-w-neutral-4' : 'text-gray-600'"
          ></i>
        </div>
      </div>

      <div class="section-pt" v-if="status === 'ok'">
        <div
          class="relative bg-[url('../images/photos/breadcrumbImg.png')] bg-cover bg-no-repeat rounded-24 overflow-hidden"
        >
          <div class="container">
            <div
              class="grid grid-cols-12 gap-x-30p gap-y-10 relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]"
            >
              <div class="lg:col-start-2 lg:col-end-12 col-span-12">
                <h2
                  class="heading-2 mb-3"
                  :class="
                    appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                  "
                >
                  {{ section.title }}
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
                    <router-link
                      :to="`/courses/${section.chapter.courseId}?chapter=${section.chapter.id}`"
                    >
                      {{ section.chapter.title }}
                    </router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <span class="breadcrumb-icon">
                      <i class="ti ti-chevrons-right"></i>
                    </span>
                  </li>
                  <li class="breadcrumb-item">
                    <span class="breadcrumb-current">
                      {{ section.title }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="overlay-11"></div>
        </div>
      </div>

      <div class="section-pt" v-if="status === 'error'">
        <div
          class="relative bg-[url('../images/photos/breadcrumbImg.png')] bg-cover bg-no-repeat rounded-24 overflow-hidden"
        >
          <div class="container">
            <div
              class="grid grid-cols-12 gap-x-30p gap-y-10 relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]"
            >
              <div class="lg:col-start-2 lg:col-end-12 col-span-12">
                <div class="flex justify-center">
                  <i class="ti ti-lock icon-60 mb-2 text-danger mr-2"></i>
                </div>
                <h2 class="heading-2">
                  {{ message }}
                </h2>
              </div>
            </div>
          </div>
          <div class="overlay-11"></div>
        </div>
      </div>
    </section>
    <!-- breadcrumb end -->

    <!-- saved details start -->
    <section
      class="section-pb pt-60p relative overflow-visible"
      v-if="section.id"
    >
      <div class="container">
        <div class="grid grid-cols-12 gap-x-30p gap-y-10">
          <div class="4xl:col-span-9 xxl:col-span-8 xl:col-span-7 col-span-12">
            <div>
              <p
                class="mb-3"
                :class="
                  appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                "
              >
                {{ section.description }}
              </p>

              <div
                class="text-m-regular mb-3"
                :class="
                  appStore.isDarkMode ? 'text-w-neutral-4' : 'text-gray-700'
                "
                v-html="section.content"
              ></div>

              <div
                class="grid grid-cols-1 gap-30p *:rounded-12 *:px-32p *:py-24p"
                :class="
                  appStore.isDarkMode
                    ? '*:bg-b-neutral-3'
                    : '*:bg-white *:border *:border-gray-200'
                "
              >
                <challenge
                  :course-id="section.chapter.courseId"
                  :section="section"
                ></challenge>
              </div>
            </div>
          </div>
          <div class="4xl:col-span-3 xxl:col-span-4 xl:col-span-5 col-span-12">
            <div class="xl:sticky xl:top-30">
              <div
                class="grid grid-cols-1 gap-30p *:rounded-12 *:px-32p *:py-24p"
                :class="
                  appStore.isDarkMode
                    ? '*:bg-b-neutral-3'
                    : '*:bg-white *:border *:border-gray-200'
                "
              >
                <div>
                  <h4
                    class="heading-4 mb-20p"
                    :class="
                      appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                    "
                  >
                    <i class="ti ti-bulb icon-24 text-warning"></i>
                    Trivias
                  </h4>
                  <div v-if="!section.trivias.length">No available trivias</div>
                  <ul
                    class="grid grid-cols-1 gap-16p *:flex-y *:justify-between text-m-regular"
                    :class="
                      appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                    "
                  >
                    <li
                      v-for="(trivia, idx) in section.trivias"
                      :key="idx"
                      class="border-2 rounded-10 p-2 border-dotted"
                      :class="
                        appStore.isDarkMode
                          ? 'border-gray-600'
                          : 'border-gray-300'
                      "
                    >
                      <span
                        :class="
                          appStore.isDarkMode
                            ? 'text-w-neutral-4'
                            : 'text-gray-600'
                        "
                        >{{ trivia }}</span
                      >
                    </li>
                  </ul>
                </div>
                <div>
                  <h4
                    class="heading-4 mb-20p"
                    :class="
                      appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                    "
                  >
                    <i class="ti ti-album icon-24 text-warning"></i>
                    Examples
                  </h4>
                  <div v-if="!section.runnables.length">
                    No available examples
                  </div>
                  <div class="grid grid-cols-1 gap-20p" v-else>
                    <runnables :runnables="section.runnables"></runnables>
                  </div>
                </div>

                <div>
                  <h4
                    class="heading-4 mb-20p"
                    :class="
                      appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                    "
                  >
                    <i class="ti ti-file icon-24 text-warning"></i>
                    Additional Resources
                  </h4>
                  <div v-if="!section.additionalResources.length">
                    No additional resources
                  </div>
                  <ul
                    class="grid grid-cols-1 gap-16p *:flex-y *:justify-between text-m-regular"
                    :class="
                      appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                    "
                  >
                    <li
                      v-for="(resource, idx) in section.additionalResources"
                      :key="idx"
                    >
                      <a
                        :href="resource.url"
                        target="_blank"
                        class="w-full rounded-8 p-2"
                        :class="
                          appStore.isDarkMode
                            ? 'bg-shap hover:bg-dark-900'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        "
                      >
                        {{ resource.title }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- saved details end -->
  </div>
</template>
<script>
import { mapStores } from 'pinia';
import { useAppStore } from '../stores/app';
import Runnables from '../components/Runnables.vue';
import Challenge from '../components/Challenge.vue';

export default {
  components: {
    Runnables,
    Challenge,
  },
  computed: {
    ...mapStores(useAppStore),
  },
  data() {
    return {
      status: '',
      error: '',
      section: {
        id: 0,
        chapterId: 0,
        order: 0,
        title: '',
        description: '',
        content: '',
        runnables: [],
        rewardOptions: [],
        chapter: {},
      },
    };
  },
  inject: ['http'],
  methods: {
    async fetchSection(sectionId) {
      try {
        this.status = 'loading';
        this.message = '';
        const response = await this.http.get('/sections/' + sectionId);

        this.status = response.data.status;

        if (this.status === 'error') {
          this.message = response.data.message;
          return;
        }

        const data = response.data.data;

        this.section = JSON.parse(
          JSON.stringify({
            ...data,
            runnables: JSON.parse(data.runnables),
            trivias: JSON.parse(data.trivias),
            additionalResources: JSON.parse(data.additionalResources),
          })
        );

        this.status = 'ok';
        return;
      } catch (error) {
        this.status = 'error';
        this.message = 'An error occurred while fetching the section.';
        return;
      }
    },
  },
  async mounted() {
    await this.fetchSection(this.$route.params.section);
  },
};
</script>
