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
            <v-btn v-on="on" text class="ml-auto" @click="openLoginModal">
              {{ username ? username : 'Login' }}
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
      <login-modal v-if="showLoginModal" @login-success="handleLoginSuccess"></login-modal>
      
    </v-main>

  </v-app>
</template>

<script>
import LoginModal from "./components/LoginModal.vue";
export default {
  components: {
    LoginModal,
  },
  data() {
    return {
      drawer: false,
      showLoginModal: false,
      username: "",
    };
  },
  methods: {
    openLoginModal() {
      console.log("Abrir modal de inicio de sesión");
      this.showLoginModal = true;  // Abre el modal de inicio de sesión
    },
    handleLoginSuccess(username) {
      this.username = username;
      this.showLoginModal = false;
   
    },
    logout() {
      this.username = "";
     
    },
  },
};
</script>