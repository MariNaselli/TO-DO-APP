<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item router to="/">
          <v-list-item-content>
            <v-list-item-title>Task List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/task/completed">
          <v-list-item-content>
            <v-list-item-title>Task Completed</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Task List</v-toolbar-title>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text class="ml-auto">
            {{ username }}
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <task-form @add="addTask"></task-form>
        <task-list :tasks="tasks"></task-list>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TaskList from "./components/TaskList.vue";
import TaskForm from "./components/TaskForm.vue";
import api from "./api.js";

export default {
  components: {
    TaskList,
    TaskForm,
  },
  data() {
    return {
      drawer: false,
      tasks: [],
      username: "John Doe", // Nombre de usuario (puedes obtenerlo de la autenticación)
    };
  },
  async mounted() {
    try {
      await this.fetchTasks();
    } catch (error) {
      console.log("Error al obtener las tareas:", error);
    }
  },
  methods: {
    async fetchTasks() {
      try {
        this.tasks = await api.fetchTasks();
      } catch (error) {
        console.log("Error al obtener las tareas:", error);
        throw error;
      }
    },
    async addTask(newTask) {
      try {
        this.tasks.push(newTask);
      } catch (error) {
        console.log("Error al agregar la tarea:", error);
        throw error;
      }
    },
    logout() {
      // Lógica para cerrar sesión
    },
  },
};
</script>
