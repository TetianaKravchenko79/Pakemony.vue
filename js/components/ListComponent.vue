<template>
  <div>
    <!-- <button class="btn btn-danger" v-on:click="reloadAPI">reload API</button> -->
    <!-- <button class="btn btn-info" v-on:click="removeAll">removeAll</button> -->
    <div class="row">
      <div class="col font-weight-bold">Name</div>
      <div class="col font-weight-bold">URL</div>
      <div class="col">Remove</div>
    </div>
    <div class="users">
      <div class="row" v-for="(item, index) in users">
        <div class="col">{{ item.name }}</div>
        <div class="col">
          <a v-bind:href="item.url">{{ item.url }}</a>
        </div>
        <!-- <div class="col"><button class="btn btn-link" v-bind:value="item.indexOriginal" v-on:click="makeRemove">remove</button></div> -->
        <div class="col">
          <!--
          <button
            class="btn btn-link"
            v-on:click="makeRemove(item.indexOriginal)"
          >
            remove
          </button>
          -->
          <router-link
            class="btn btn-xs btn-edit"
            :to="{ name: 'UserComponent', params: { id: item.indexOriginal } }"
            >show user</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";

export default {
  data: function () {
    return {
      API: "https://pokeapi.co/api/v2/pokemon/",
      users: [], //!!!
    };
  },
  mounted() {
    this.getAPI(); //!!!
    EventBus.$on("users-change-filter", (data) => {
      // console.log("Custom event triggered!!");
      this.users = data.usersFilter;
    });
    EventBus.$on("!users-list-length", () => {
      console.log("removedAll");
      this.users = [];
    });
    EventBus.$on("users-list", (data) => {
      this.getAPI();
      console.log("reloadAll");

      this.users = data.users;
    });
    EventBus.$emit("title", {
      title: this.API,
    });
  },
  methods: {
    getAPI() {
      if (!localStorage.users || !JSON.parse(localStorage.users).length) {
        fetch(this.API) //!!!
          .then((responce) => {
            return responce.json();
          })
          .then((data) => {
            let users = data.results;

            users.map(function (user, index) {
              user.indexOriginal = index;
            });

            console.log(users);

            localStorage.users = JSON.stringify(users);
            this.users = users; //!!!
            EventBus.$emit("users-list-length", {
              usersLength: users.length,
            });
          });
      } else {
        this.users = JSON.parse(localStorage.users); //!!!
      }
    },

    // makeRemove(id) {
    //   let index = id; //!!!

    //   let users = JSON.parse(localStorage.users); //!!!

    //   let removed = users.splice(index, 1);
    //   console.log(removed[0].name);

    //   users.map(function (user, index) {
    //     user.indexOriginal = index;
    //   });

    //   localStorage.users = JSON.stringify(users);

    //   this.users = users;

    //   EventBus.$emit("users-list-length", {
    //     usersLength: users.length,
    //     userName: removed[0].name,
    //   });
    // },

    // reloadAPI() {
    //   localStorage.users = JSON.stringify([]);
    //   this.getAPI();
    // },

    // removeAll() {
    //   let users = JSON.parse(localStorage.users);
    //   localStorage.users = JSON.stringify([]);
    //   this.users = users;
    //   EventBus.$emit("!users-list-length", {
    //     users: [],
    //   });
    // },
  },
};
</script>
