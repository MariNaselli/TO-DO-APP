<template>
  <v-app>
    <v-container>
      <task-form @add="addTask"></task-form>
      <task-list :tasks="tasks"></task-list>
    </v-container>
  </v-app>
</template>

<script>
import TaskList from './components/TaskList.vue';
import TaskForm from './components/TaskForm.vue';

export default {
  components: {
    TaskList,
    TaskForm
  },
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    addTask(task) {
      this.tasks.push(task);
    }
  }
};
</script>



