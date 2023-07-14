<template>
  <div>
    <v-list>
      <v-list-item v-for="task in tasks" :key="task.id">
        <v-list-item-content>
          <v-card class="task-card">
            <v-card-text class="d-flex align-center">
              <v-list-item-title class="task-name">{{
                task.name
              }}</v-list-item-title>
              <v-list-item-subtitle class="task-person">{{
                task.person
              }}</v-list-item-subtitle>
              <v-spacer></v-spacer>
              <v-btn icon @click="editTask(task)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="deleteTask(task.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn icon @click="archiveTask(task.id)">
                <v-icon>mdi-archive</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  data() {
    return {
      name: "TaskList",
      tasks: [],
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
    }
  },
};
</script>

<style scoped>
.task-card {
  width: 300px;
  margin-bottom: 16px;
}

.task-name {
  font-weight: bold;
}

.task-person {
  margin-left: 8px;
}

.align-center {
  display: flex;
  align-items: center;
}
</style>
