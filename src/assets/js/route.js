import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../../stores/auth'; // Import your Pinia store
import Login from '../../pages/Auth/Login.vue';

export const createRoutes = () => {
  const routes = [
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: () => import('../../pages/Auth/Register.vue'),
    },
    {
      name: 'home',
      path: '/',
      component: () => import('../../pages/Home.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/courses',
      component: () => import('../../pages/Courses.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/courses/:id',
      component: () => import('../../pages/Course.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/achievements',
      component: () => import('../../pages/Achievements.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      component: () => import('../../pages/Profile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/leaderboard',
      component: () => import('../../pages/Leaderboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/progress',
      component: () => import('../../pages/Progress.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/user-stats/:id',
      component: () => import('../../pages/UserStats.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/sections/:section',
      component: () => import('../../pages/Section.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/verify-email',
      component: () => import('../../pages/Auth/VerifyEmail.vue'),
    },
    {
      path: '/password-reset',
      component: () => import('../../pages/Auth/PasswordReset.vue'),
    },
    {
      path: '/password-confirm',
      component: () => import('../../pages/Auth/PasswordConfirm.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all for unmatched routes
      component: () => import('../../pages/NotFound.vue'),
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore(); // Access the Pinia store
    await authStore.init();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next({ name: 'login' });
    } else if (to.name === 'login' && authStore.isAuthenticated) {
      // If the user is authenticated and tries to access the login page,
      // redirect to a dashboard or home page.
      next({ name: 'home' }); // Or whatever your authenticated landing page is
    } else {
      // Allow navigation to proceed.
      next();
    }
  });

  return router;
};
