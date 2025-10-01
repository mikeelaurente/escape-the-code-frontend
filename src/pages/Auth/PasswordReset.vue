<template>
  <!-- login section start -->
  <section class="section-py pt-30">
    <div class="container">
      <div class="flex-c">
        <div class="max-w-[530px] w-full p-40p bg-b-neutral-3 rounded-12">
          <h2 class="heading-2 text-w-neutral-1 mb-16p text-center">
            Reset Password
          </h2>
          <form @submit.prevent="resetPassword()">
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
            </div>
            <button class="btn btn-md btn-primary rounded-12 w-full mb-16p">
              Submit
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

import { useAuthStore } from '../../stores/auth';
import { Toast } from '../../assets/js/swal-mixin';

export default {
  data() {
    return {
      email: '',
      password: '',
      showVerificationLink: false,
      swalClasses: {
        popup: 'bg-gray-800 text-white shadow-lg rounded-lg',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-c-dark-outline',
      },
    };
  },
  inject: ['http'],
  methods: {
    async resetPassword() {
      try {
        const { data } = await this.http.post('/auth/password-reset', {
          email: this.email,
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
  },
};
</script>
