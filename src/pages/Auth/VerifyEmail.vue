<template>
  <div>
    <!-- login section start -->
    <section class="section-py pt-30">
      <div class="container">
        <div class="flex-c">
          <div class="max-w-[530px] w-full p-40p bg-b-neutral-3 rounded-12">
            <h2 class="heading-2 text-w-neutral-1 mb-16p text-center">
              Verifying Email...
            </h2>
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
  inject: ['http'],
  async mounted() {
    try {
      const token = this.$route.query.token;
      const response = await this.http.post('/auth/verification-confirm', {
        token: token,
      });

      if (response.data.status === 'error') {
        Toast.fire({
          icon: 'error',
          title: response.data.errors
            ? response.data.errors.token
            : response.data.error,
        });
      } else if (response.data.status === 'ok') {
        Toast.fire({
          icon: 'success',
          title: response.data.message,
        });
        this.$router.push('/login');
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Something went wrong. Please refresh the page and try again.',
      });
    }
  },
};
</script>
