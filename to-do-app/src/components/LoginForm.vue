<template>
  <div>
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <v-card-text>
        <v-card class="mx-auto" max-width="400">
          <v-container>
            <form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </form>
          </v-container></v-card
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username && this.password) {
        localStorage.setItem("username", this.username); // Guardar el nombre de usuario en el localStorage
        alert("Inicio de sesión exitoso");
      } else {
        alert("Credenciales inválidas");
      }
    },
  },
};
</script>
