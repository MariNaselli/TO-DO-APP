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
            variant="underlined"
            item-text="name"
          ></v-select>
          <v-textarea
            v-model="task.name"
            color="primary"
            :rules="[(v) => !!v || 'Task is required']"
            label="Task name"
            variant="underlined"
            auto-grow
            rows="2"
            class="textarea"
            required
            

          ></v-textarea>
          <v-select
            v-model="task.status"
            :items="statusList"
            :rules="[(v) => !!v || 'Status is required']"
            label="Status"
            variant="underlined"
            item-text="name"
            required
          ></v-select>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="success" :disabled="isLoading">
            Save
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>
<script>
import router from "../router";
import api from "../services/api.js";

export default {
  name: "TaskEdit",
  components: {},
  data() {
    return {
      statusList: [],
      personList: [],
      task: {
        id: 0,
        name: "",
        person: "",
        status: "New",
      },
      isLoading: false,
    };
  },

  methods: {
    async submitTask() {
      if (this.task.name) {
        this.isLoading = true;
        const delay = 500;
        try {
          if (this.task.id === 0) {
            await api.createTask(this.task);
            this.$toast.success("Task created successfully!");
            setTimeout(() => {
              this.isLoading = false;
              router.push("/task/list");
            }, delay);
          } else {
            await api.updateTask(this.task);
            this.$toast.success("Task updated successfully!");
            setTimeout(() => {
              this.isLoading = false;
              router.push("/task/list");
            }, delay);
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }
    },
    async fetchTask() {
      try {
        const taskId = this.$route.params.id;
        if (taskId) {
          this.task = await api.getTaskById(taskId);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    },
    async fetchStatus() {
      try {
        this.statusList = await api.fetchStatus();
      } catch (error) {
        console.log("Error:", error);
        throw error;
      }
    },
    async fetchPersons() {
      try {
        this.personList = await api.fetchPersons();
        if (localStorage.getItem("person")) {
          const personLocalStorage = localStorage.getItem("person");
          const personFound = this.personList.find(t => t.name === personLocalStorage)
          this.task.person = personFound;
        }
      } catch (error) {
        console.log("Error:", error);
        throw error;
      }
    },
  },
  async mounted() {
    await this.fetchStatus();
    await this.fetchPersons();
    await this.fetchTask();
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.fetchPersons();
        this.fetchTask();
      },
    },
  },
};
</script>
