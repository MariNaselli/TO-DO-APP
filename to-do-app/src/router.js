import Vue from 'vue';
import VueRouter from 'vue-router';
import TaskList from './components/TaskList.vue';
import TaskEdit from './components/TaskEdit.vue';
import LoginForm from './components/LoginForm.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: LoginForm
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  },
 
  {
    path: '/task/list',
    component: TaskList
  },
  {
    path: '/task/list/:status',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/task/new',
    component: TaskEdit,
    name: 'TaskNew'
  },
  {
    path: '/task/:id',
    component: TaskEdit,
    name: "EditTask"
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});


export default router;
