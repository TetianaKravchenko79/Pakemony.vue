<template>
  <div>
    <router-link class="btn btn-xs btn-edit" :to="{ name: 'MainComponent' }"
      >back</router-link
    >
    <h3>{{ user.name }}</h3>
    <h4>
      <a v-bind:href="user.url">{{ user.url }}</a>
    </h4>
    <div>
      <img v-bind:src="user.back_default" alt="back_default" />
      <img v-bind:src="user.back_shiny" alt="back_shiny" />
      <img v-bind:src="user.front_default" alt="front_default" />
      <img v-bind:src="user.front_shiny" alt="front_shiny" />
    </div>

    <button class="btn btn-link" v-on:click="makeRemove()">remove</button>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";
import { fetchData, resultAPI } from "../api";

export default {
  data: function () {
    return {
      API: "https://pokeapi.co/api/v2/pokemon/",
      user: {
        name: "",
        indexOriginal: null,
        url: null,
        back_default: null,
        back_shiny: null,
        front_default: null,
        front_shiny: null,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.getUser();
    }, "200");
  },
  methods: {
    getUser() {
      let app = this;

      //   console.log(app.$route.params.id);

      let user = JSON.parse(localStorage.users).filter(
        (user, index) => index == app.$route.params.id
      );
      console.log(user[0]);
      app.user.indexOriginal = user[0].indexOriginal;
      app.user.name = user[0].name;
      app.user.url = user[0].url;

      console.log(app.user.name);
      fetchData(user[0].url);
      const result = new Promise((resolve, reject) => {
        let interval = setInterval(() => {
          if (resultAPI && Object.keys(resultAPI.sprites).length) {
            resolve(resultAPI.sprites);
            clearInterval(interval);
          }
        }, 50);
      });
      result.then((value) => {
        app.user.back_default = value.back_default;
        app.user.back_shiny = value.back_shiny;
        app.user.front_default = value.front_default;
        app.user.front_shiny = value.front_shiny;
        console.log(value.back_default);
      });
    },

    makeRemove() {
      let app = this;

      let users = JSON.parse(localStorage.users);

      let lastRemoved = users[app.user.indexOriginal];
      users.splice(app.user.indexOriginal, 1);

      users.map(function (user, index) {
        user.indexOriginal = index;
      });

      localStorage.users = JSON.stringify(users);

      app.$router.push({ name: "MainComponent" });
      EventBus.$emit("last-removed-name", {
        lastRemovedName: lastRemoved.name,
      });
      console.log(app.user.name);
    },
  },
};
</script>
