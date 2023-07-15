<template>
  <div>
  <v-form @submit.prevent="submitTask">
    <v-card class="mx-auto" max-width="500">
      <v-container>
        <v-select
          v-model="task.person"
          :items="personList"
          :rules="[(v) => !!v || 'Person is required']"
          label="Person"
          required
        ></v-select>
        <v-textarea
          v-model="task.name"
          color="primary"
          label="Task name"
          variant="underlined"
          auto-grow
          rows="2"
          class="textarea"
        ></v-textarea>
        <v-select
          v-model="task.status"
          :items="statusList"
          :rules="[(v) => !!v || 'Status is required']"
          label="Status"
          required
        ></v-select>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="success">
          Save
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
  <!-- Mensaje de éxito -->
  <v-alert
      v-if="showSuccessMessage"
      type="success"
      variant="outlined"
      dismissible
      @input="showSuccessMessage = false"
    >
      Task created successfully!
    </v-alert>

</div>
</template>
<script>

import router from "../router";
import api from "../api.js";
import { VAlert } from 'vuetify/lib';


export default {
  name: "TaskEdit",
  components: {
    VAlert,
  },
  data() {
  return {
    statusList: ["New", "Done", "Archived", "Deleted"],
    personList: ["Mariana", "Ulises", "Cataldo"],
    task: {
      id: 0,
      name: "",
      person: "",
      status: "New", 
    },
    showSuccessMessage: false, // Agrega esta línea
  };
},
  methods: {
    async submitTask() {
      console.log('Submit Task function called');
      if (this.task.name) {
        try {
          if (this.task.id === 0) {
            // Crear una nueva tarea
            const createdTask = await api.createTask(this.task);
            this.$emit("add", createdTask);
            this.showSuccessMessage = true;
            console.log('Task created successfully!');

          } else {
            // Actualizar una tarea existente
            await api.updateTask(this.task);
          }
          this.task = {
            id: 0,
            name: "",
            person: "",
            status: "New",
          };
          router.push("/task/list");
        } catch (error) {
          console.log("Error al guardar la tarea:", error);
          // Manejar el error según sea necesario
        }
      }
    },
  },
  async mounted() {
  try {
    const taskId = this.$route.params.id;
    this.task = await api.getTaskById(taskId);
  } catch (error) {
    console.log("Error al obtener la tarea:", error);
  }
},
};
</script>

