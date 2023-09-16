import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/user/Login.vue';
import Register from '@/views/user/Register.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    props: true,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: Login,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
