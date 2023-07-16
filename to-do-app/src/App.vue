<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item router to="/task/new">
          <v-list-item-content>
            <v-list-item-title>New Task</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/task/list">
          <v-list-item-content>
            <v-list-item-title>Task List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Task List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="showLoginForm = true" text>Login</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-dialog v-model="showLoginForm" max-width="400">
      <v-card>
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
          <v-container>
            <form @submit.prevent="login">
              <v-text-field v-model="username" label="Username" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      showLoginForm: false,
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      // Realiza la lógica de inicio de sesión aquí
      if (this.username === "admin" && this.password === "password") {
        // Login exitoso
        this.$emit("login-success", this.username); // Emitir el evento de inicio de sesión exitoso
        this.showLoginForm = false; // Cerrar el modal de inicio de sesión
      } else {
        // Credenciales inválidas
        alert("Credenciales inválidas. Por favor, inténtalo nuevamente.");
      }
    }
  }
};
</script>
