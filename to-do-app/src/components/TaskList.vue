<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(task, index) in tasks"
        :key="index"
      >
        <v-list-item-content>
          {{ task }}
        </v-list-item-content>
        <v-list-item-action>
          <div class="d-flex">
            <v-btn class="mr-2" @click="editTask(index)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="mr-2" @click="archiveTask(index)">
              <v-icon>mdi-archive</v-icon>
            </v-btn>
            <v-btn @click="removeTask(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  methods: {
    editTask() {
      // Lógica para editar una tarea
    },
    archiveTask() {
      // Lógica para archivar una tarea
    },
    removeTask() {
      // Lógica para eliminar una tarea
    }
  }
};
</script>

<style scoped>
.v-list-item {
  background-color: #fff;
  margin-bottom: 8px;
  border-radius: 4px;
}

.d-flex {
  display: flex;
}

.v-btn {
  min-width: unset;
  padding: 4px;
}
</style>





