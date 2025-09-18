<template>
  <!-- login section start -->
  <section class="section-py pt-30">
    <div class="container">
      <div class="flex-c">
        <div class="max-w-[530px] w-full p-40p bg-b-neutral-3 rounded-12">
          <h2 class="heading-2 text-w-neutral-1 mb-16p text-center">Login</h2>
          <p class="text-m-medium text-w-neutral-3 text-center">
            Don’t have an account?
            <router-link to="/register" class="inline text-primary">
              Sign Up
            </router-link>
          </p>
          <form @submit.prevent="login()">
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
                  v-model="email"
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
                  v-model="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <button class="btn btn-md btn-primary rounded-12 w-full mb-16p">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <!-- login section end -->
</template>

<script>
import Swal from 'sweetalert2';

import { useAuthStore } from '../stores/auth';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export default {
  data() {
    return {
      email: '',
      password: '',
      router: null,
    };
  },
  inject: ['http'],
  methods: {
    async login() {
      const store = useAuthStore();

      const { data } = await this.http.post('/auth/login', {
        email: this.email,
        password: this.password,
      });
      console.log('response', data);
      if (data.status == 'invalid') {
        Swal.fire({
          title: data.error,
          icon: 'error',
          customClass: {
            popup: 'bg-gray-800 text-white shadow-lg rounded-lg',

            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-c-dark-outline',
          },
        });
      } else if (data.status === 'ok') {
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        store.login(data.data);
        this.$router.push('/');
      }
    },
  },
};
</script>
