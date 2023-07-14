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
