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

  async updateTask(updatedTask) {
    const taskId = updatedTask.id;
    try {
      const response = await axios.put(`${BASE_URL}/${taskId}`, {
        task: updatedTask,
      });
      return response.data;
    } catch (error) {
      console.log("Error al actualizar la tarea:", error);
      throw error;
    }
  },
  async deleteTask(taskId) {
    try {
      return await axios.delete(`${BASE_URL}/${taskId}`);
    } catch (error) {
      console.log("Error al eliminar la tarea:", error);
      throw error;
    }
  },
};
