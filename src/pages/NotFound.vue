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
                <h2 class="heading-2 text-w-neutral-1 mb-3">Error 404</h2>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/" class="breadcrumb-link">
                      Home
                    </router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <span class="breadcrumb-icon">
                      <i class="ti ti-chevrons-right"></i>
                    </span>
                  </li>
                  <li class="breadcrumb-item">
                    <span class="breadcrumb-current">Error 404</span>
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

    <!-- not found 404 section start -->
    <section class="section-py">
      <div class="container">
        <div class="flex-col-c text-center">
          <h1
            class="lg:text-[160px] md:text-[140px] sm:text-[120px] text-7xl font-borda text-w-neutral-1 mb-3"
          >
            404
          </h1>
          <h1 class="heading-1 text-w-neutral-1 mb-24p">
            Looks Like You are Lost
          </h1>
          <p class="text-l-medium text-w-neutral-4 mb-40p">
            We can’t seem to find the page you’re looking for.
          </p>
          <router-link to="/" class="btn btn-xl py-3 btn-primary rounded-12">
            BACK TO HOME
          </router-link>
        </div>
      </div>
    </section>
    <!-- not found 404 section end -->
  </div>
</template>
