import Vue from 'vue';
import VueRouter from 'vue-router';

// Importa tus componentes aquí
import TaskList from './components/TaskList.vue';
import TaskEdit from './components/TaskEdit.vue';

// Instala Vue Router
Vue.use(VueRouter);

// Define las rutas
const routes = [
  {
    path: '/task/list',
    component: TaskList
  },
  {
    path: '/task/new',
    component: TaskEdit
  },
  {
    path: '/task/:id',
    component: TaskEdit
  }
];

// Crea la instancia del enrutador
const router = new VueRouter({
  routes
});

export default router;
