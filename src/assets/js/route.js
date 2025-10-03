import {
  createWebHashHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';
import { useAuthStore } from '../../stores/auth'; // Import your Pinia store

export const createRoutes = () => {
  const routes = [
    {
      name: 'login',
      path: '/login',
      component: import('../../pages/Auth/Login.vue'),
    },
    { path: '/register', component: import('../../pages/Auth/Register.vue') },
    {
      name: 'home',
      path: '/',
      component: import('../../pages/Home.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/story',
      component: import('../../pages/Story.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/achievements',
      component: import('../../pages/Achievements.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      component: import('../../pages/Profile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/leaderboard',
      component: import('../../pages/Leaderboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/progress',
      component: import('../../pages/Progress.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/user-stats/:id',
      component: import('../../pages/UserStats.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/story/chapters/:chapter',
      component: import('../../pages/Chapter.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/story/chapters/:chapter/:section',
      component: import('../../pages/Section.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/verify-email',
      component: import('../../pages/Auth/VerifyEmail.vue'),
    },
    {
      path: '/password-reset',
      component: import('../../pages/Auth/PasswordReset.vue'),
    },
    {
      path: '/password-confirm',
      component: import('../../pages/Auth/PasswordConfirm.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all for unmatched routes
      component: import('../../pages/NotFound.vue'),
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore(); // Access the Pinia store
    console.log('===========================================');
    console.log(authStore.isAuthenticated, authStore.userToken);
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
