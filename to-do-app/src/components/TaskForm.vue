<template>
  <div>
    <v-form @submit.prevent="addTask">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="6">
            <v-text-field
              v-model="newTask"
              label="Nueva tarea"
              filled
              solo
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn type="submit" color="primary" class="add-button">
              Agregar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: ''
    };
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.$emit('add', this.newTask);
        this.newTask = '';
      }
    }
  }
};
</script>

<style scoped>
.add-button {
  min-width: 80px;
  margin-left: 8px;
}
</style>







