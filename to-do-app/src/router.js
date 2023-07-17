import Vue from 'vue';
import VueRouter from 'vue-router';

// Importa tus componentes aquí
import TaskList from './components/TaskList.vue';
import TaskEdit from './components/TaskEdit.vue';
import LoginForm from './components/LoginForm.vue';

// Instala Vue Router
Vue.use(VueRouter);

// Define las rutas
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

// Crea la instancia del enrutador
const router = new VueRouter({
  mode: 'history',
  routes
});


export default router;
