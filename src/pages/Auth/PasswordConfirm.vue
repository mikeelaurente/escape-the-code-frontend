<template>
  <div>
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
                    readonly
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    New Password
                  </label>
                  <input
                    class="border-input-1"
                    type="Password"
                    name="Password"
                    id="password"
                    v-model="form.newPassword"
                    placeholder="Password"
                    :class="{
                      error: errors.newPassword,
                    }"
                  />
                  <span v-if="errors.newPassword" class="px-2 span text-danger">
                    {{ errors.newPassword }}
                  </span>
                </div>
                <div>
                  <label
                    for="password"
                    class="label label-xl text-w-neutral-1 font-borda mb-3"
                  >
                    Password Confirmation
                  </label>
                  <input
                    class="border-input-1"
                    type="Password"
                    name="Password"
                    id="password"
                    v-model="form.passwordConfirmation"
                    placeholder="Confirm password"
                    :class="{
                      error: errors.passwordConfirmation,
                    }"
                  />
                  <span
                    v-if="errors.passwordConfirmation"
                    class="px-2 span text-danger"
                  >
                    {{ errors.passwordConfirmation }}
                  </span>
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
      token: '',
      form: {
        newPassword: '',
        passwordConfirmation: '',
      },
      errors: {},
    };
  },
  inject: ['http'],
  methods: {
    async resetPassword() {
      try {
        const { data } = await this.http.post('/auth/password-confirm', {
          email: this.email,
          token: this.token,
          newPassword: this.form.newPassword,
          passwordConfirmation: this.form.passwordConfirmation,
        });
        if (data.status === 'ok') {
          Toast.fire({
            icon: 'success',
            title: data.message,
          });
          this.$router.push('/login');
        } else if (data.status === 'error') {
          if (data.errors) {
            this.errors = data.errors;
          } else {
            Toast.fire({
              icon: 'error',
              title: data.error,
            });
          }
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Something went wrong. Please refresh the page and try again.',
        });
      }
    },
  },
  mounted() {
    const token = this.$route.query.token;
    const email = this.$route.query.email;

    this.email = email;
    this.token = token;
  },
};
</script>
