import Vue from 'vue';
import VueRouter from 'vue-router';

// Importa tus componentes aquí
import TaskList from './components/TaskList.vue';
import TaskForm from './components/TaskForm.vue';
import TaskCompleted from './components/TaskCompleted.vue';

// Instala Vue Router
Vue.use(VueRouter);

// Define las rutas
const routes = [
  {
    path: '/',
    component: TaskList
  },
  {
    path: '/add',
    component: TaskForm
  },
  {
    path: '/completed',
    component: TaskCompleted
  }
];

// Crea la instancia del enrutador
const router = new VueRouter({
  routes
});

export default router;
