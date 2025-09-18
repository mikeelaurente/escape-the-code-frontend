<template>
  <!-- login section start -->
  <section class="section-py pt-30">
    <div class="container">
      <div class="flex-c">
        <div class="max-w-[530px] w-full p-40p bg-b-neutral-3 rounded-12">
          <h2 class="heading-2 text-w-neutral-1 mb-16p text-center">
            Register
          </h2>
          <p class="text-m-medium text-w-neutral-3 text-center">
            Already have an account?
            <router-link to="/login" class="inline text-primary">
              Login
            </router-link>
          </p>
          <form>
            <div class="grid grid-cols-1 gap-30p mb-40p">
              <div>
                <label
                  for="userEmail"
                  class="label label-xl text-w-neutral-1 font-borda mb-3"
                >
                  Email
                </label>
                <input
                  class="border-input-1"
                  type="email"
                  name="email"
                  id="userEmail"
                  placeholder="Email"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="label label-xl text-w-neutral-1 font-borda mb-3"
                >
                  Password
                </label>
                <input
                  class="border-input-1"
                  type="Password"
                  name="Password"
                  id="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <button class="btn btn-md btn-primary rounded-12 w-full mb-16p">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <!-- login section end -->
</template>
