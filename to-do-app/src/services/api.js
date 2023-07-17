import axios from "axios";

const BASE_URL = "http://localhost:3000";

export default {
  async createPerson(person) {
    try {
      const existingPerson = await this.getPersonByName(person.name);
      if (!existingPerson) {
        const response = await axios.post(`${BASE_URL}/persons`, person);
        const createdPerson = response.data; 
        return createdPerson;
      }
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
  async fetchPersons() {
    try {
      const response = await axios.get(`${BASE_URL}/persons`);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
  async getPersonByName(name) {
    try {
      const response = await axios.get(`${BASE_URL}/persons?name=${name}`);
      const persons = response.data;
      return persons.length > 0 ? persons[0] : null;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
  async fetchStatus() {
    try {
      const response = await axios.get(`${BASE_URL}/status`);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
  async fetchTasks(person, status, search) {
    try {
      let params = "";
      if (person && person != "ALL") {
        params = params + "&person=" + person;
      }
      if (status && status != "ALL") {
        params = params + "&status=" + status;
      }
      if (search) {
        params = params + "&name=" + search;
      }

      const response = await axios.get(`${BASE_URL}/tasks?${params}`);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
  async createTask(task) {
    try {
      const response = await axios.post(`${BASE_URL}/tasks`, task);
      const createdTask = response.data;
      return createdTask;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  async getTaskById(taskId) {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  async updateTask(task) {
    try {
      const response = await axios.put(`${BASE_URL}/tasks/${task.id}`, task);
      const updatedTask = response.data;
      return updatedTask;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },

  async updateTaskStatus(task) {
    try {
      const response = await axios.put(`${BASE_URL}/tasks/${task.id}`, task);
      const updatedTask = response.data;
      return updatedTask;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  },
};
