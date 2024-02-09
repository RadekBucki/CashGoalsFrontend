import { RouteRecordRaw } from 'vue-router';

import LeftNavBarLayout from '@/layouts/view/LeftNavbar/LeftNavbar.vue';
import TopNavBarLayout from '@/layouts/view/TopNavbar/TopNavbar.vue';
import Budget from '@/views/budget/Budget/Budget.vue';
import BudgetCategories from '@/views/budget/BudgetCategories.vue';
import BudgetCreate from '@/views/budget/BudgetCreate.vue';
import BudgetGoals from '@/views/budget/BudgetGoals.vue';
import BudgetHome from '@/views/budget/BudgetHome/BudgetHome.vue';
import BudgetIncomes from '@/views/budget/BudgetIncomes.vue';
import BudgetUsers from '@/views/budget/BudgetUsers.vue';
import Dashboard from '@/views/Dashboard.vue';
import Activate from '@/views/user/Activate.vue';
import ForgotPassword from '@/views/user/ForgotPassword.vue';
import Login from '@/views/user/Login.vue';
import Profile from '@/views/user/Profile/Profile.vue';
import Register from '@/views/user/Register.vue';
import ResetPassword from '@/views/user/ResetPassword.vue';

export default [
  {
    path: '/',
    props: true,
    component: TopNavBarLayout,
    children: [
      { path: '', name: 'Home', component: Login },
      { path: 'register', name: 'Register', component: Register },
      { path: 'login', name: 'Login', component: Login },
      { path: 'forgot-password', name: 'ForgotPassword', component: ForgotPassword },
      { path: 'reset-password', name: 'ResetPassword', component: ResetPassword, props: true },
      { path: 'activate', name: 'Activate', component: Activate, props: true },
    ],
  },
  {
    path: '/',
    props: true,
    component: LeftNavBarLayout,
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      { path: 'profile', name: 'Profile', component: Profile },
      { path: 'budget/create', name: 'BudgetCreate', component: BudgetCreate },
      {
        path: 'budget/:id',
        name: 'Budget',
        component: Budget,
        props: true,
        children: [
          { path: '', name: 'BudgetHome', component: BudgetHome },
          { path: 'incomes', name: 'BudgetIncomes', component: BudgetIncomes },
          { path: 'categories', name: 'BudgetCategories', component: BudgetCategories },
          { path: 'goals', name: 'BudgetGoals', component: BudgetGoals },
          { path: 'users', name: 'BudgetUsers', component: BudgetUsers },
        ],
      },
    ],
  },
] as RouteRecordRaw[];
