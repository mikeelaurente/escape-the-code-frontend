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
                    class="border-input-1 py-5"
                    type="email"
                    name="email"
                    id="userEmail"
                    v-model="email"
                    placeholder="Email"
                    :class="{
                      error: errors.email,
                    }"
                  />
                  <span v-if="errors.email" class="px-2 span text-danger">
                    {{ errors.email }}
                  </span>
                </div>
                <div>
                  <label
                    for="userPassword"
                    class="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    Password
                  </label>
                  <div
                    class="flex-y justify-between gap-3 bg-b-neutral-3 rounded-24 border-input-1"
                    :class="{
                      error: errors.password,
                    }"
                  >
                    <input
                      class="bg-transparent w-full"
                      :type="showPassword ? 'text' : 'password'"
                      name="Password"
                      id="userPassword"
                      v-model="password"
                      placeholder="Password"
                    />
                    <i
                      class="ti cursor-pointer"
                      :class="showPassword ? 'ti-eye' : 'ti-eye-closed'"
                      @click="showPassword = !showPassword"
                    ></i>
                  </div>
                  <span v-if="errors.password" class="px-2 span text-danger">
                    {{ errors.password }}
                  </span>
                </div>
              </div>
              <button
                :disabled="loading"
                class="btn btn-md btn-primary rounded-12 w-full mb-16p"
              >
                <Loading :loading="loading" />
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
import { mapStores } from 'pinia';

import { useAuthStore } from '../../stores/auth';
import { useAppStore } from '../../stores/app';
import { Toast } from '../../assets/js/swal-mixin';
import Loading from '../../components/ui/Loading.vue';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      showVerificationLink: false,
      showPassword: false,
      errors: {},
    };
  },
  inject: ['http'],
  computed: {
    ...mapStores(useAppStore),
    swalClasses() {
      return {
        popup: this.appStore.isDarkMode
          ? 'bg-gray-800 text-white shadow-lg rounded-lg'
          : 'bg-white text-gray-900 shadow-lg rounded-lg',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-c-dark-outline',
      };
    },
  },
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
            customClass: this.swalClasses,
          });
          this.showVerificationLink = false;
        } else if (data.status === 'error') {
          Swal.fire({
            icon: 'error',
            title: data.errors ? data.errors.email : data.error,
            customClass: this.swalClasses,
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

      try {
        this.loading = true;
        const { data } = await this.http.post('/auth/login', {
          email: this.email,
          password: this.password,
        });
        if (data.status == 'error') {
          if (data.code == 'invalid_credentials') {
            Swal.fire({
              title: data.error,
              text: 'Email or Password may be wrong.',
              icon: 'error',
              customClass: this.swalClasses,
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
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          message: 'Something went wrong',
          customClass: this.swalClasses,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
