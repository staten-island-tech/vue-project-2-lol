<template>
  <nav>
    <template v-if="authIsReady">
      <div class="navbar">
        <router-link class="link" to="/">Home</router-link>

        <div class="link" v-if="user">Logged in as {{ user.email }}</div>

        <router-link class="link" v-if="!user" to="/signup"
          >Sign Up</router-link
        >
        <router-link class="link" v-if="!user" to="/login">Log In</router-link>
        <button v-if="user" class="logout" @click="handleClick">Logout</button>

        <div class="dropdown">
          <button>Options</button>
          <ul>
            <li><router-link class="link" to="/search">Search</router-link></li>

            <li>
              <router-link class="link" to="/Champions">Champions</router-link>
            </li>

            <li v-if="user">
              <router-link @click="readUsers" class="link" to="user"
                >User</router-link
              >
            </li>

            <li v-if="user">
              <router-link class="link" to="/Create">Create</router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- <div class="navbar">
        <div class="left">
          <router-link to="/">Home</router-link> |
          <router-link to="/search">Search</router-link>
          <router-link to="/Champions">Champions</router-link>
          <router-link v-if="user" to="/Create">Create</router-link>
        </div>
        <div v-if="user" class="right">
          <router-link @click="readUsers" to="user">User</router-link> |
          <span class="loggedinas">Logged in as {{ user.email }}</span> |
          <button class="logout" @click="handleClick">Logout</button>
        </div>
        <div v-if="!user" class="right">
          <router-link to="/signup">Sign Up</router-link> |
          <router-link to="/login">Login</router-link>
        </div>
      </div> -->
    </template>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const handleClick = () => {
      store.dispatch("logout");
    };

    const readUsers = () => {
      store.commit("readUserData");
      store.commit("updateStar");
    };

    return {
      handleClick,
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),
      readUsers,
    };
  },
};
</script>
<style scoped>
html,
body,
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 62.5%;
  font-family: "Roboto", sans-serif;
}

.navbar {
  width: 100%;
  background-color: lightcoral;

  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 10em;
  height: 5rem;

  align-items: center;
}

.dropdown ul {
  position: absolute;
  z-index: 2;
  background-color: white;
  width: 20rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
  transform: translateY(-10px);
  border-radius: 5px;
}
.dropdown li {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

button {
  border: none;
  background-color: transparent;
  font-size: 3rem;
}
.dropdown li:hover {
  background-color: lightyellow;
  pointer-events: all;
}
.dropdown button:focus + ul {
  opacity: 1;
  pointer-events: all;
  transform: translateY(0px);
}
.link {
  text-decoration: none;
  color: black;
  font-size: 3rem;
}
</style>
