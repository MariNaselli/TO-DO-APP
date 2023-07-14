<template>
  <div>
    <v-form @submit.prevent="submitTaskForm">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="6">
            <v-text-field
              v-model="newTask.name"
              label="Nueva tarea"
              filled
              solo
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn type="submit" color="primary" class="add-button"
              >Agregar</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  data() {
    return {
      newTask: {
        name: "",
        person: "",
        status: "",
      },
    };
  },
  methods: {
    async submitTaskForm() {
      if (this.newTask.name) {
        try {
          const createdTask = await api.createTask(this.newTask);
          this.$emit("add", createdTask);
          this.newTask = {
            name: "",
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

<style scoped>
.add-button {
  min-width: 80px;
  margin-left: 8px;
}
</style>
