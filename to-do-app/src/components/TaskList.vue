<template>
  <div>
    <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-select
          label="Person"
          :items="['Option 1', 'Option 2', 'Option 3']"
          variant="underlined"
        ></v-select>
      </v-col>
      <v-col cols="4">
        <v-select
          label="Status"
          :items="['Option A', 'Option B', 'Option C']"
          variant="underlined"
        ></v-select>
      </v-col>
      <v-col cols="4">
        <v-text-field
            v-model="search"
            label="Search"
            class="pa-4"
          ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
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
              <v-btn icon @click="deleteTaskConfirmation(task)">
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
    <!-- Modal de confirmación de eliminación -->
    <v-dialog v-model="confirmDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirmar eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que quieres eliminar esta tarea?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="cancelDelete">Cancelar</v-btn>
          <v-btn color="green" text @click="confirmDelete">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  data() {
    return {
      name: "TaskList",
      tasks: [],
      search: "",
      confirmDeleteDialog: false, // Controla la visibilidad del modal de confirmación
      taskToDelete: true, // Tarea que se va a eliminar
    };
  },
  async mounted() {
    try {
      await this.fetchTasks();
    } catch (error) {
      console.log("Error al obtener las tareas:", error);
    }
  
  },
  
  methods: 
  {
    
    async fetchTasks() {
      try {
        this.tasks = await api.fetchTasks();
      } catch (error) {
        console.log("Error al obtener las tareas:", error);
        throw error;
      }
    },
    async editTask(task) {
    const taskId = task.id;
    this.$router.push({ name: "EditTask", params: { id: taskId } });
  },
  async deleteTask(taskId) {
      try {
        await api.deleteTask(taskId);
        await this.fetchTasks(); // Actualizar la lista de tareas después de eliminar una
      } catch (error) {
        console.log("Error al eliminar la tarea:", error);
      }
    },
    deleteTaskConfirmation(task) {
      this.taskToDelete = task; // Guarda la tarea que se va a eliminar
      this.confirmDeleteDialog = true; // Muestra el modal de confirmación
    },
    cancelDelete() {
      this.confirmDeleteDialog = false; // Oculta el modal de confirmación
      this.taskToDelete = null; // Borra la tarea que se iba a eliminar
    },
    confirmDelete() {
      // Llama a tu función deleteTask y pasa el ID de la tarea a eliminar
      this.deleteTask(this.taskToDelete.id);

      this.confirmDeleteDialog = false; // Oculta el modal de confirmación
      this.taskToDelete = null; // Borra la tarea que se iba a eliminar
    },
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
