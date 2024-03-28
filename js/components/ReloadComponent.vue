<template>
  <div>
    <h4>
      <!-- <a v-bind:href="title">{{ title }}</a> -->
    </h4>
    <button class="btn btn-danger" v-on:click="reloadAPI">reload API</button>
    <!-- <button class="btn btn-info" v-on:click="removeAll">removeAll</button> -->
  </div>
</template>

<script>
import { EventBus } from "../event-bus";

export default {
  data: function () {
    return {};
  },
  mounted() {},
  methods: {
    reloadAPI() {
      let users = JSON.parse(localStorage.users);
      localStorage.users = JSON.stringify([]);

      EventBus.$emit("users-list", {
        users: users,
      });
    },

    //
  },
};
</script>
