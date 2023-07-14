<template>
  <v-app>
    <v-container>
      <task-form @add="addTask"></task-form>
      <task-list :tasks="tasks"></task-list>
      
    </v-container>
    <router-view></router-view>
  </v-app>
</template>

<script>
import TaskList from './components/TaskList.vue';
import TaskForm from './components/TaskForm.vue';
import api from './api.js';

export default {
  components: {
    TaskList,
    TaskForm
  },
  data() {
    return {
      tasks: []
    };
  },
  async mounted() {
    try {
      await this.fetchTasks();
    } catch (error) {
      console.log('Error al obtener las tareas:', error);
    }
  },
  methods: {
    async fetchTasks() {
      try {
        this.tasks = await api.fetchTasks();
      } catch (error) {
        console.log('Error al obtener las tareas:', error);
        throw error;
      }
    },
    async addTask(newTask) {
      try {
        this.tasks.push(newTask);
      } catch (error) {
        console.log('Error al agregar la tarea:', error);
        throw error;
      }
    }
  }
};
</script>











