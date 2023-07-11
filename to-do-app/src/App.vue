<template>
  <v-app>
    <v-container>
      <v-form @submit.prevent="addTask">
        <v-text-field
          v-model="newTask"
          label="Nueva tarea"
          outlined
          required
        ></v-text-field>
        <v-btn type="submit" color="primary">Agregar</v-btn>
      </v-form>

      <v-list>
        <v-list-item
          v-for="(task, index) in tasks"
          :key="index"
        >
          <v-list-item-content>
            {{ task }}
          </v-list-item-content>
          <v-list-item-action>
            <!-- Agrega botones para cambiar el nombre, eliminar o confirmar la tarea -->
            <!-- Por ejemplo, puedes usar <v-btn> con iconos de Vuetify -->
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tasks: [],
      newTask: '', // Agrega la propiedad newTask en el objeto data
    };
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.tasks.push(this.newTask);
        this.newTask = ''; // Limpia el campo de entrada después de agregar la tarea
      }
    },
  },
};
</script>

