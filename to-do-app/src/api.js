import axios from "axios";

const BASE_URL = "http://localhost:3000/tasks";

export default {
  async fetchTasks() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.log("Error al obtener las tareas:", error);
      throw error;
    }
  },
  async createTask(task) {
    try {
      const response = await axios.post(BASE_URL, task);
      const createdTask = response.data; // Obtener la tarea creada de la respuesta
      return createdTask;
    } catch (error) {
      console.log("Error al agregar la tarea:", error);
      throw error;
    }
  },

  async getTaskById(taskId) {
    try {
      const response = await axios.get(`${BASE_URL}/${taskId}`);
      return response.data;
    } catch (error) {
      console.log("Error al obtener la tarea:", error);
      throw error;
    }
  },

  async updateTask(task) {
    try {
      const response = await axios.put(`${BASE_URL}/${task.id}`, task);
      const updatedTask = response.data;
      return updatedTask;
    } catch (error) {
      console.log("Error al actualizar la tarea:", error);
      throw error;
    }
  },
  
  async deleteTask(taskId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${taskId}`);
      return response.data; // Retorna la respuesta de la eliminación exitosa
    } catch (error) {
      console.log("Error al eliminar la tarea:", error);
      throw error;
    }
  }
  
};
