<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-select
            label="Person"
            :items="persons"
            variant="underlined"
            v-model="selectedPerson"
            item-text="name"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            label="Status"
            :items="status"
            v-model="selectedStatus"
            variant="underlined"
            item-text="name"
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
      <v-list-item v-for="task in filteredTasks" :key="task.id">
        <v-list-item-content>
          <v-card class="task-card">
            <v-card-text class="d-flex align-center">
              <v-list-item-title class="task-name"
                >{{ task.name }}
                <br />
                <span class="task-person">{{ task.person }}</span>
              </v-list-item-title>
              <v-list-item-subtitle class="task-person">{{
                task.status
              }}</v-list-item-subtitle>
              <v-spacer></v-spacer>
              <v-btn icon @click="editTask(task)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="deleteTaskConfirmation(task)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn icon @click="archivedTaskConfirmation(task)">
                <v-icon>mdi-archive</v-icon>
              </v-btn>
              <v-btn icon @click="confirmedTaskConfirmation(task)">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- Modal de confirmación de eliminación -->
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>
          Are you sure you want to change to <b>{{ newStatus }}</b
          >?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="cancelDialogClick">Cancelar</v-btn>
          <v-btn color="green" text @click="confirmDialogClick">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "../services/api.js";

export default {
  data() {
    return {
      name: "TaskList",
      tasks: [],
      status: [],
      persons: [],
      selectedPerson: "ALL",
      selectedStatus: "ALL",
      search: "",
      filteredTasks: [],
      confirmDialog: false,
      taskToChange: null,
      newStatus: "",
    };
  },
  async mounted() {
    try {
      await this.fetchStatus();
      await this.fetchPersons();
      await this.fetchTasks();
    } catch (error) {
      console.log("Error:", error);
    }
  },
  methods: {
    async fetchPersons() {
      try {
        this.persons.push("ALL");
        const fetchedPersons = await api.fetchPersons();
        this.persons.push(...fetchedPersons);
      } catch (error) {
        console.log("Error:", error);
      }
    },
    async fetchStatus() {
      try {
        this.status.push("ALL");
        const fetchStatus = await api.fetchStatus();
        this.status.push(...fetchStatus);
      } catch (error) {
        console.log("Error:", error);
      }
    },
    async fetchTasks() {
      try {
        this.tasks = await api.fetchTasks(
          this.selectedPerson,
          this.selectedStatus,
          this.search
        );
        this.filteredTasks = this.tasks; // Inicialmente, mostrar todas las tareas
      } catch (error) {
        console.log("Error al obtener las tareas:", error);
      }
    },
    async editTask(task) {
      const taskId = task.id;
      this.$router.push({ name: "EditTask", params: { id: taskId } });
    },
    async changeStatusTask(task) {
      try {
        task.status = this.newStatus;
        await api.updateTask(task);
        await this.fetchTasks(); // Actualizar la lista de tareas después de eliminar una
      } catch (error) {
        console.log("Error:", error);
      }
    },
    archivedTaskConfirmation(task) {
      this.newStatus = "Archived";
      this.taskToChange = task;
      this.confirmDialog = true;
    },
    deleteTaskConfirmation(task) {
      this.newStatus = "Deleted";
      this.taskToChange = task;
      this.confirmDialog = true;
    },
    confirmedTaskConfirmation(task) {
      this.newStatus = "Completed";
      this.taskToChange = task;
      this.confirmDialog = true;
    },
    cancelDialogClick() {
      this.confirmDialog = false;
      this.taskToChange = null;
    },
    async confirmDialogClick() {
      await this.changeStatusTask(this.taskToChange, this.newStatus);
      this.confirmDialog = false; // Oculta el modal de confirmación
      this.taskToChange = null; // Borra la tarea que se iba a eliminar
    },
    async filterTasks() {
      const desiredRoutePath = `/task/list/${this.selectedStatus.toLowerCase()}`;
      if (this.$route.path !== desiredRoutePath) {
        this.$router.push({ path: desiredRoutePath });
      }
      await this.fetchTasks();
    },
  },
  watch: {
    search: {
      handler: "filterTasks", // Observar cambios en el texto de búsqueda
      immediate: true, // Ejecutar el watcher cuando el componente se monta por primera vez
    },
    selectedPerson: {
      handler: "filterTasks", // Observar cambios en la lista de personas
      deep: true, // Observar cambios profundos en la lista de personas
    },
    selectedStatus: {
      handler: "filterTasks", // Observar cambios en la lista de estados
      deep: true, // Observar cambios profundos en la lista de estados
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
  font-size: 12px;
  font-style: italic;
}

.align-center {
  display: flex;
  align-items: center;
}
</style>
