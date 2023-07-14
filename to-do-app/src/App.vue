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
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text class="ml-auto">
            {{ username }}
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      username: "John Doe", // Nombre de usuario (puedes obtenerlo de la autenticación)
    };
  },
  methods: {
    logout() {
      // Lógica para cerrar sesión
    },
  },
};
</script>
