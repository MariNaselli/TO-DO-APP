<template>
  <div>
    <v-list>
      <v-list-item v-for="task in tasks" :key="task.id">
        <v-list-item-content>
          <v-list-item-title>{{ task.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ task.person }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="editTask(task)">mdi-pencil</v-icon>
          <v-icon @click="deleteTask(task.id)">mdi-delete</v-icon>
          <v-icon @click="archiveTask(task.id)">mdi-archive</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>


<script>
export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
/* Estilos */
</style>
