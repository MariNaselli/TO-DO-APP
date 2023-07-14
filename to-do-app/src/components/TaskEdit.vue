<template>
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
</template>
<script>
import api from "../api.js";
export default {
  name: "TaskEdit",
  data: () => ({
    statusList: ["New", "Done", "Archived", "Deleted"],
    personList: ["Mariana", "Ulises", "Cataldo"],
    task: {
      id: 0,
      name: "",
      person: "",
      status: "New",
    },
  }),
  methods: {
    async submitTask() {
      if (this.task.name) {
        try {
          const createdTask = await api.createTask(this.task);
          this.$emit("add", createdTask);
          this.task = {
            id: 0,
            name: "New",
            person: "",
            status: "",
          };
        } catch (error) {
          console.log("Error al agregar la tarea:", error);
          // Manejar el error según sea necesario
        }
      }
    },
  },
};
</script>

