<template>
  <div>
    <v-card class="login-card">
      <v-card-title class="headline">Login</v-card-title>
      <v-card-text>
        <v-container>
          <form @submit.prevent="login">
            <v-text-field
              v-model="username"
              :rules="[(v) => !!v || 'Username is required']"
              label="Username"
              required
              autocomplete="off"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="[(v) => !!v || 'Password is required']"
              label="Password"
              type="password"
              required
              autocomplete="off"
            ></v-text-field>

            <div class="button-container">
              <v-btn type="submit" color="primary">Login</v-btn>
            </div>
          </form>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import api from "../services/api.js";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    async login() {
      if (this.username) {
        let person = { name: this.username };
        const createdPerson = await api.createPerson(person);
        console.log(createdPerson);
        localStorage.setItem("person", this.username);

        this.$router.push("/task/list");
      } else {
        alert("Credenciales inválidas. Por favor, inténtalo nuevamente.");
      }
    },
  },
};
</script>
<style scoped>
.login-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.button-container {
  text-align: right;
  margin-top: 20px;
}
</style>
