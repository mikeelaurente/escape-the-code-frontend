import { createWebHashHistory, createRouter } from 'vue-router';
import Home from '../../pages/Home.vue';
import Story from '../../pages/Story.vue';
import Chapter from '../../pages/Chapter.vue';
import Section from '../../pages/Section.vue';
import Login from '../../pages/Login.vue';
import Register from '../../pages/Register.vue';
import { useAuthStore } from '../../stores/auth'; // Import your Pinia store
import NotFound from '../../pages/NotFound.vue';
import Achievements from '../../pages/Achievements.vue';
import Leaderboard from '../../pages/Leaderboard.vue';
import Progress from '../../pages/Progress.vue';
import Profile from '../../pages/Profile.vue';
import UserStats from '../../pages/UserStats.vue';

export const createRoutes = () => {
  const routes = [
    { name: 'login', path: '/login', component: Login },
    { path: '/register', component: Register },
    { name: 'home', path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/story', component: Story, meta: { requiresAuth: true } },
    {
      path: '/achievements',
      component: Achievements,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: '/leaderboard',
      component: Leaderboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/progress',
      component: Progress,
      meta: { requiresAuth: true },
    },
    {
      path: '/user-stats/:id',
      component: UserStats,
      meta: { requiresAuth: true },
    },
    {
      path: '/story/chapters/:chapter',
      component: Chapter,
      meta: { requiresAuth: true },
    },
    {
      path: '/story/chapters/:chapter/:section',
      component: Section,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all for unmatched routes
      component: NotFound,
    },
  ];

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore(); // Access the Pinia store
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
