import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import Activate from '@/views/user/Activate.vue';
import ForgotPassword from '@/views/user/ForgotPassword.vue';
import Login from '@/views/user/Login.vue';
import Register from '@/views/user/Register.vue';
import ResetPassword from '@/views/user/ResetPassword.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    props: true,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'register', name: 'Register', component: Register },
      { path: 'login', name: 'Login', component: Login },
      { path: 'forgot-password', name: 'ForgotPassword', component: ForgotPassword },
      { path: 'reset-password', name: 'ResetPassword', component: ResetPassword },
      { path: 'activate', name: 'Activate', component: Activate },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
