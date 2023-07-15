<template>
  <div>
    <v-btn @click="showLoginModal = true" text>Login</v-btn>
    <v-dialog v-model="showLoginModal" max-width="400">
      <v-card>
        <v-card-title class="headline">Iniciar sesión</v-card-title>
        <v-card-text>
          <form @submit.prevent="login">
            <v-text-field v-model="username" label="Nombre de usuario" required></v-text-field>
            <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
            <v-btn type="submit" color="primary">Iniciar sesión</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoginModal: false,
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      // Lógica de inicio de sesión
      // Aquí puedes llamar a tu API de inicio de sesión para autenticar al usuario
      // Puedes utilizar axios u otra biblioteca para hacer la solicitud HTTP
      // Si el inicio de sesión es exitoso, puedes realizar las acciones necesarias
      // Si el inicio de sesión falla, puedes mostrar un mensaje de error o realizar alguna otra acción
      if (this.username === "admin" && this.password === "admin") {
        alert("Inicio de sesión exitoso");
        this.showLoginModal = false;
      } else {
        alert("Credenciales inválidas");
      }
    }
  }
};
</script>











