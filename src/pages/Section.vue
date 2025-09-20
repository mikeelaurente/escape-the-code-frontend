<template>
  <!-- breadcrumb start -->

  <!-- breadcrumb start -->
  <section class="pt-30p">
    <div class="section-pt" v-if="status === 'ok'">
      <div
        class="relative bg-[url('../images/photos/breadcrumbImg.png')] bg-cover bg-no-repeat rounded-24 overflow-hidden"
      >
        <div class="container">
          <div
            class="grid grid-cols-12 gap-x-30p gap-y-10 relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]"
          >
            <div class="lg:col-start-2 lg:col-end-12 col-span-12">
              <h2 class="heading-2 text-w-neutral-1 mb-3">
                {{ section.title }}
              </h2>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#" class="breadcrumb-link"> Home </a>
                </li>
                <li class="breadcrumb-item">
                  <span class="breadcrumb-icon">
                    <i class="ti ti-chevrons-right"></i>
                  </span>
                </li>
                <li class="breadcrumb-item">
                  <span class="breadcrumb-current">Game Details</span>
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
            <div class="glitch-effect rounded-24 overflow-hidden mb-3">
              <div class="glitch-thumb">
                <img
                  class="w-full xxl:h-[510px] lg:h-[440px] md:h-[400px] sm:h-[320px] h-[300px] object-cover"
                  src="../assets/images/saved/savedBanner.png"
                  alt="image"
                />
              </div>
              <div class="glitch-thumb">
                <img
                  class="w-full xxl:h-[510px] lg:h-[440px] md:h-[400px] sm:h-[320px] h-[300px] object-cover"
                  src="../assets/images/saved/savedBanner.png"
                  alt="image"
                />
              </div>
            </div>
            <p class="text-w-neutral-1 mb-3">
              {{ section.description }}
            </p>

            <div
              class="text-m-regular text-w-neutral-4 mb-3"
              v-html="section.content"
            ></div>

            <div
              class="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:px-32p *:py-24p"
            >
              <challenge
                :challenges="section.challenges"
                :credit-usages="section.creditUsages"
              ></challenge>
            </div>
          </div>
        </div>
        <div class="4xl:col-span-3 xxl:col-span-4 xl:col-span-5 col-span-12">
          <div class="xl:sticky xl:top-30">
            <div
              class="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:px-32p *:py-24p"
            >
              <div>
                <h4 class="heading-4 text-w-neutral-1 mb-20p">
                  🧙‍♀️ Cast a Spell
                </h4>
                <div class="grid grid-cols-1 gap-20p">
                  <runnables :runnables="section.runnables"></runnables>
                </div>
              </div>
              <div>
                <h4 class="heading-4 text-w-neutral-1 mb-20p">Trivias</h4>
                <ul
                  class="grid grid-cols-1 gap-16p *:flex-y *:justify-between text-m-regular text-w-neutral-1"
                >
                  <li>
                    <a href="#" class="hover:text-secondary transition-1">
                      Gaming
                    </a>
                    <span class="text-w-neutral-4"> (12) </span>
                  </li>
                  <li>
                    <a href="#" class="hover:text-secondary transition-1">
                      Live
                    </a>
                    <span class="text-w-neutral-4"> (12) </span>
                  </li>
                  <li>
                    <a href="#" class="hover:text-secondary transition-1">
                      Electronic
                    </a>
                    <span class="text-w-neutral-4"> (13) </span>
                  </li>
                  <li>
                    <a href="#" class="hover:text-secondary transition-1">
                      Online
                    </a>
                    <span class="text-w-neutral-4"> (07) </span>
                  </li>
                  <li>
                    <a href="#" class="hover:text-secondary transition-1">
                      Contraoller
                    </a>
                    <span class="text-w-neutral-4"> (02) </span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="heading-4 text-w-neutral-1 mb-20p">
                  Additional Resources
                </h4>
                <div class="tag">
                  <a href="#" class="tag-item tag-neutral-4"> E- Sports </a>
                  <a href="#" class="tag-item tag-neutral-4"> Fantasy </a>
                  <a href="#" class="tag-item tag-neutral-4"> Matches </a>
                  <a href="#" class="tag-item tag-neutral-4"> Streamers </a>
                  <a href="#" class="tag-item tag-neutral-4"> Landing </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- saved details end -->
</template>
<script>
import Runnables from '../components/Runnables.vue';
import Challenge from '../components/Challenge.vue';

export default {
  components: {
    Runnables,
    Challenge,
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
      },
    };
  },
  inject: ['http'],
  async mounted() {
    console.log(this.$route.params);
    const response = await this.http.get(
      '/story/sections/' + this.$route.params.section
    );

    this.status = response.data.status;

    if (this.status === 'error') {
      this.message = response.data.message;
      return;
    }

    const data = response.data.data;

    this.section = {
      ...data,
      runnables: JSON.parse(data.runnables),
    };
    console.log(this.section);
  },
};
</script>
