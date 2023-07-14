<template>
    <div>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <span>{{ task.name }}</span>
          <span>{{ task.person }}</span>
          <span>{{ task.status }}</span>
        </li>
      </ul>
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
  
  