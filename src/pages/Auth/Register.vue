<template>
  <div>
    <!-- register section start -->
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
            <form @submit.prevent="register()">
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
                    for="firstName"
                    class="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    First Name
                  </label>
                  <input
                    class="border-input-1"
                    type="text"
                    name="firstName"
                    id="firstName"
                    v-model="firstName"
                    placeholder="First Name"
                    :class="{
                      error: errors.firstName,
                    }"
                  />
                  <span v-if="errors.firstName" class="px-2 span text-danger">
                    {{ errors.firstName }}
                  </span>
                </div>
                <div>
                  <label
                    for="lastName"
                    class="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    Last Name
                  </label>
                  <input
                    class="border-input-1"
                    type="text"
                    name="lastName"
                    id="lastName"
                    v-model="lastName"
                    placeholder="Last Name"
                    :class="{
                      error: errors.lastName,
                    }"
                  />
                  <span v-if="errors.lastName" class="px-2 span text-danger">
                    {{ errors.lastName }}
                  </span>
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
                    :class="{
                      error: errors.password,
                    }"
                  />
                  <span v-if="errors.password" class="px-2 span text-danger">
                    {{ errors.password }}
                  </span>
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
    <!-- register section end -->
  </div>
</template>

<script>
import Swal from 'sweetalert2';

import { useAuthStore } from '../../stores/auth';
import { Toast } from '../../assets/js/swal-mixin';
import { resolveComponent } from 'vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      errors: {},

      swalClasses: {
        popup: 'bg-gray-800 text-white shadow-lg rounded-lg',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-c-dark-outline',
      },
    };
  },
  inject: ['http'],
  methods: {
    resetForm() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.errors = {};
    },
    async register() {
      const payload = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
      };

      try {
        this.errors = {};

        const response = await this.http.post('auth/register', payload);

        if (response.data.status === 'ok') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
            customClass: this.swalClasses,
          });
          this.resetForm();
        }

        if (response.data.status === 'error' && response.data.errors) {
          this.errors = response.data.errors;
        } else if (
          response.data.status === 'error' &&
          response.data.code === 'email_taken'
        ) {
          this.errors['email'] = response.data.error;
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: response.data.error,
            customClass: this.swalClasses,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong. Please refresh the page and try again',
          customClass: this.swalClasses,
        });
      }
    },
  },
};
</script>
