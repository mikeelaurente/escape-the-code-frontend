<template>
  <div>
    <!-- profile settiongs section start -->
    <section class="section-py">
      <div class="container pt-30p">
        <div class="relative rounded-32 overflow-hidden">
          <div class="glitch-effect">
            <div class="glitch-thumb">
              <img
                class="w-full xl:h-[472px] lg:h-[400px] md:h-[340px] sm:h-[300px] h-[240px] hover:scale-110 object-cover"
                :src="user.banner"
                alt="image"
              />
            </div>
            <div class="glitch-thumb">
              <img
                class="w-full xl:h-[472px] lg:h-[400px] md:h-[340px] sm:h-[300px] h-[240px] hover:scale-110 object-cover"
                :src="user.banner"
                alt="image"
              />
            </div>
          </div>
          <label
            for="banner"
            class="cursor-pointer absolute xl:top-[30px] md:top-5 top-4 xl:right-[30px] md:right-5 right-4 z-[5]"
          >
            <span
              class="flex-c size-60p rounded-full bg-b-neutral-3 text-w-neutral-1 icon-32"
            >
              <i class="ti ti-camera"></i>
            </span>
          </label>
          <input
            ref="banner"
            type="file"
            name="banner"
            id="banner"
            class="hidden"
            accept="image/*"
            @change="handleBannerChange"
          />
        </div>

        <div
          class="relative flex 3xl:items-end max-3xl:items-center 3xl:justify-between max-3xl:flex-col gap-30p 3xl:mt-[90px] xl:-mt-52 lg:-mt-44 md:-mt-36 sm:-mt-30 -mt-20 4xl:mb-[70px] mb-60p"
        >
          <div
            class="3xl:absolute 3xl:bottom-0 3xl:left-1/2 3xl:-translate-x-1/2 max-3xl:flex-col-c z-[4]"
          >
            <img
              ref="avatarImg"
              class="avatar xl:size-60 lg:size-52 md:size-44 sm:size-40 size-28 border-2 border-secondary"
              :src="authStore.avatar"
              alt="profile"
            />
            <label
              for="avatar"
              class="cursor-pointer absolute lg:-bottom-6 md:-bottom-5 -bottom-4 left-1/2 -translate-x-1/2"
            >
              <span
                class="flex-c size-60p rounded-full bg-primary text-b-neutral-4 icon-32"
              >
                <i class="ti ti-camera"></i>
              </span>
            </label>
            <input
              ref="avatar"
              type="file"
              name="avatar"
              id="avatar"
              class="hidden"
              accept="image/*"
              @change="handleFileChange"
            />
          </div>
        </div>
        <div
          @click="uploadFile"
          class="flex justify-center items-center mb-3"
          v-if="selectedFile"
        >
          <button class="btn btn-primary rounded-10">Upload</button>
        </div>

        <div class="grid grid-cols-12 gap-30p">
          <div class="xxl:col-start-3 xxl:col-end-11 col-span-12 mb-10">
            <div class="bg-b-neutral-3 rounded-12 p-40p">
              <h4 class="heading-4 text-w-neutral-1 mb-60p">
                General Information
              </h4>
              <form @submit.prevent="updateProfile" v-if="user.id > 0">
                <div class="grid grid-cols-8 gap-30p">
                  <div class="sm:col-span-4 col-span-8">
                    <label for="first_name" class="label label-lg mb-3"
                      >First Name</label
                    >
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      v-model="form.firstName"
                      class="box-input-3"
                      :class="{
                        error: errors.firstName,
                      }"
                    />
                    <span v-if="errors.firstName" class="px-2 span text-danger">
                      {{ errors.firstName }}
                    </span>
                  </div>
                  <div class="sm:col-span-4 col-span-8">
                    <label for="last_name" class="label label-lg mb-3"
                      >Last Name</label
                    >
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      v-model="form.lastName"
                      class="box-input-3"
                      :class="{
                        error: errors.lastName,
                      }"
                    />
                    <span v-if="errors.lastName" class="px-2 span text-danger">
                      {{ errors.lastName }}
                    </span>
                  </div>
                  <div class="col-span-8">
                    <label for="email" class="label label-lg mb-3">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      v-model="form.email"
                      class="box-input-3"
                      :class="{
                        error: errors.email,
                      }"
                    />
                    <span v-if="errors.email" class="px-2 span text-danger">
                      {{ errors.email }}
                    </span>
                  </div>
                  <div class="col-span-8">
                    <label for="about" class="label label-lg mb-3"
                      >About me</label
                    >
                    <textarea
                      name="about"
                      id="about"
                      v-model="form.about"
                      class="box-input-3 h-[142px]"
                    ></textarea>
                    <span v-if="errors.about" class="px-2 span text-danger">
                      {{ errors.about }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center md:justify-end justify-center">
                  <button class="btn btn-md btn-primary rounded-12 mt-60p">
                    Save
                  </button>
                </div>
              </form>
              <div></div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-30p">
          <div class="xxl:col-start-3 xxl:col-end-11 col-span-12">
            <div class="bg-b-neutral-3 rounded-12 p-40p">
              <h4 class="heading-4 text-w-neutral-1 mb-60p">Change Password</h4>
              <form @submit.prevent="changePassword" v-if="user.id > 0">
                <div class="col-span-8 mb-10">
                  <label for="email" class="label label-lg mb-3"
                    >Old Password</label
                  >
                  <input
                    type="password"
                    name="old_password"
                    id="old_password"
                    v-model="changePasswordForm.oldPassword"
                    class="box-input-3"
                    :class="{
                      error: errors.oldPassword,
                    }"
                  />
                  <span v-if="errors.oldPassword" class="px-2 span text-danger">
                    {{ errors.oldPassword }}
                  </span>
                </div>
                <div class="grid grid-cols-8 gap-30p">
                  <div class="sm:col-span-4 col-span-8">
                    <label for="first_name" class="label label-lg mb-3"
                      >New Password</label
                    >
                    <input
                      type="password"
                      name="new_password"
                      id="new_password"
                      v-model="changePasswordForm.newPassword"
                      class="box-input-3"
                      :class="{
                        error: errors.newPassword,
                      }"
                    />
                    <span
                      v-if="errors.newPassword"
                      class="px-2 span text-danger"
                    >
                      {{ errors.newPassword }}
                    </span>
                  </div>
                  <div class="sm:col-span-4 col-span-8">
                    <label for="last_name" class="label label-lg mb-3"
                      >Confirm Password</label
                    >
                    <input
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      v-model="changePasswordForm.confirmPassword"
                      class="box-input-3"
                      :class="{
                        error: errors.confirmPassword,
                      }"
                    />
                    <span
                      v-if="errors.confirmPassword"
                      class="px-2 span text-danger"
                    >
                      {{ errors.confirmPassword }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center md:justify-end justify-center">
                  <button class="btn btn-md btn-primary rounded-12 mt-60p">
                    Change Password
                  </button>
                </div>
              </form>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- profile settiongs section end -->
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthStore } from '../stores/auth';
import Swal from 'sweetalert2';
import { Toast } from '../assets/js/swal-mixin';

export default {
  data() {
    return {
      form: {
        email: '',
        firstName: '',
        lastName: '',
        about: '',
      },
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      selectedFile: null,
      selectedBanner: null,
      objectUrl: null,
      errors: {},
      swalClasses: {
        popup: 'bg-gray-800 text-white shadow-lg rounded-lg',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-c-dark-outline',
      },
    };
  },
  inject: ['http'],
  computed: {
    ...mapStores(useAuthStore),
    user() {
      return this.authStore.user;
    },
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.objectUrl = URL.createObjectURL(this.selectedFile);
      this.$refs.avatarImg.src = this.objectUrl;
    },
    async uploadFile() {
      if (!this.selectedFile) {
        Toast.fire({
          icon: 'warning',
          title: 'Please select a file',
        });
        return;
      }

      const formData = new FormData();
      formData.append('avatar', this.selectedFile); // 'file' is the key expected by your server

      try {
        // Use a library like Axios for HTTP requests
        const response = await this.http.post(
          '/users/avatar?type=avatar',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            // You can also add onUploadProgress for progress tracking
          }
        );
        URL.revokeObjectURL(this.objectUrl);
        Toast.fire({
          icon: 'success',
          title: 'Avatar has been updated successfully!',
        });
        this.selectedFile = null; // Clear the selected file after upload
        this.$refs.avatar.value = ''; // Clear the input field
        this.authStore.setAvatar(response.data.data.avatar);
      } catch (error) {
        console.error('Error uploading file:', error);
        Toast.fire({
          icon: 'error',
          title: 'Error uploading avatar',
        });
      }
    },
    handleBannerChange(event) {
      this.selectedBanner = event.target.files[0];
      this.objectUrl = URL.createObjectURL(this.selectedBanner);

      Swal.fire({
        html: `
            <img
              class="w-full xl:h-[472px] lg:h-[400px] md:h-[340px] sm:h-[300px] h-[240px] object-cover"
              src="${this.objectUrl}"
              alt="image"
            />
        `,
        width: 1500,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText: 'Upload',
        customClass: this.swalClasses,
        preConfirm: async () => {
          try {
            Toast.fire({
              icon: 'info',
              title: 'Uploading...',
            });

            const formData = new FormData();
            formData.append('banner', this.selectedBanner);

            const response = await this.http.post(
              '/users/banner?type=banner',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            Toast.fire({
              icon: 'success',
              title: response.data.message,
            });

            // update banner state
            this.authStore.setBanner(response.data.data.banner);

            return response.data;
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          } finally {
            URL.revokeObjectURL(this.objectUrl);
            this.$refs.banner.value = '';
          }
        },
      });
    },
    updateProfile() {
      try {
        Swal.fire({
          title: `Are you sure?`,
          showCancelButton: true,
          confirmButtonText: 'Update Profile',
          showLoaderOnConfirm: true,
          customClass: this.swalClasses,
          preConfirm: async () => {
            try {
              const response = await this.http.post('/users', {
                ...this.form,
              });
              return response.data;
            } catch (error) {
              Swal.showValidationMessage(`Request failed: ${error}`);
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        })
          .then((result, response) => {
            if (result.value.status === 'ok') {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: result.value.message,
                customClass: this.swalClasses,
              });
            } else if (result.value.status === 'error') {
              if (result.value.errors) {
                this.errors = result.value.errors;
              } else {
                if (result.value.code === 'email_taken') {
                  this.errors['email'] = result.value.message;
                }
                Swal.fire({
                  icon: 'error',
                  title: 'Oops!',
                  text: result.value.message,
                  customClass: this.swalClasses,
                });
              }
            }
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'Something went wrong. Please try again',
              customClass: this.swalClasses,
            });
          });
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong. Please refresh the page and try again',
          customClass: this.swalClasses,
        });
      }
    },
    changePassword() {
      try {
        Swal.fire({
          title: `Are you sure?`,
          showCancelButton: true,
          confirmButtonText: 'Change Password',
          showLoaderOnConfirm: true,
          customClass: this.swalClasses,
          preConfirm: async () => {
            try {
              const response = await this.http.post('/users/change-password', {
                ...this.changePasswordForm,
              });
              return response.data;
            } catch (error) {
              Swal.showValidationMessage(`Request failed: ${error}`);
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        })
          .then((result, response) => {
            if (result.value.status === 'ok') {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: result.value.message,
                customClass: this.swalClasses,
              });
            } else if (result.value.status === 'error') {
              Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: result.value.error,
                customClass: this.swalClasses,
              });
            }
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'Something went wrong. Please try again',
              customClass: this.swalClasses,
            });
          });
      } catch (e) {}
    },
  },

  mounted() {
    this.form = { ...this.authStore.user };
  },
};
</script>
