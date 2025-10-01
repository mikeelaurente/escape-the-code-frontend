<template>
  <div>
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
              <router-link
                to="/password-reset"
                class="text-m-medium text-primary text-center"
              >
                Forgot your password?
              </router-link>
            </form>
            <div
              v-if="showVerificationLink"
              class="flex justify-center items-center border-t border-dotted mt-5 pt-5"
            >
              <button
                @click="resendVerificationLink()"
                class="btn btn-c-outline-primary rounded-4"
              >
                <i class="ti ti-send"></i>
                Resend Verification Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- login section end -->
  </div>
</template>

<script>
import Swal from 'sweetalert2';

import { useAuthStore } from '../../stores/auth';
import { Toast } from '../../assets/js/swal-mixin';

export default {
  data() {
    return {
      email: '',
      password: '',
      showVerificationLink: false,
    };
  },
  inject: ['http'],
  methods: {
    async resendVerificationLink() {
      try {
        const { data } = await this.http.post('/auth/verification-resend', {
          email: this.email,
          password: this.password,
        });
        if (data.status === 'ok') {
          Swal.fire({
            icon: 'success',
            title: data.message,
          });
          this.showVerificationLink = false;
        } else if (data.status === 'error') {
          Swal.fire({
            icon: 'error',
            title: data.errors ? data.errors.email : data.error,
          });
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Something went wrong. Please refresh the page and try again.',
        });
      }
    },
    async login() {
      const store = useAuthStore();

      const { data } = await this.http.post('/auth/login', {
        email: this.email,
        password: this.password,
      });
      console.log('response', data);
      if (data.status == 'error') {
        if (data.code === 'invalid_credentials') {
          Swal.fire({
            title: data.error,
            icon: 'error',
            customClass: {
              popup: 'bg-gray-800 text-white shadow-lg rounded-lg',

              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-c-dark-outline',
            },
          });
        } else if (data.code === 'not_verified') {
          this.showVerificationLink = true;
          Toast.fire({
            icon: 'error',
            title: data.error,
          });
        }
      } else if (data.status === 'ok') {
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        store.login(data.data);
        await this.$router.push('/');
      }
    },
  },
};
</script>
