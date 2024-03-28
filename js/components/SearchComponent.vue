<template>
  <div>
    <!-- <h4>{{ title }}</h4> -->
    <h4>
      <a v-bind:href="title">{{ title }}</a>
    </h4>

    <div>
      <div class="form" v-if="usersLength">
        <h5 class="text-primary">
          last removed:
          <span class="text-danger">{{ lastRemoved }}</span>
        </h5>

        <div class="form-group has-search">
          <span
            class="fa fa-search form-control-feedback"
            v-on:click="makeFilter"
          ></span>
          <input
            type="text"
            class="form-control search-value"
            :placeholder="placeholderMain"
            v-model="search"
            @keydown="keyDown"
          />
        </div>
      </div>
      <div v-else>
        <h4>{{ "That's all!" }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { EventBus } from "../event-bus";

export default {
  props: ["placeholderMain"],
  data: function () {
    return {
      search: "",
      title: "",
      usersLength: true,

      lastRemoved: "",
    };
  },
  mounted() {
    EventBus.$on("title", (data) => {
      // console.log("Custom event triggered!");
      this.title = data.title;
    });
    //...
    EventBus.$on("users-list-length", (data) => {
      this.usersLength = data.usersLength;
      this.lastRemoved = "every";
    });

    EventBus.$on("!users-list-length", () => {
      console.log("removedAll");
      this.users = [];
      this.lastRemoved = "All";
    });
    EventBus.$on("last-removed-name", (data) => {
      console.log("Custom event triggered!- " + data.lastRemovedName);
      this.lastRemoved = data.lastRemovedName; //это для тех, кто не в роутере - очистка Main, Remove, Reload
      localStorage.lastRemoved = data.lastRemovedName; //это для роутера - User
    });
    this.lastRemoved = localStorage.lastRemoved;
  },
  methods: {
    makeFilter() {
      if (this.search) {
        let usersFilter = JSON.parse(localStorage.users).filter(
          (user) => user.name.indexOf(this.search) != -1
        );

        console.log(usersFilter);
        EventBus.$emit("users-change-filter", {
          usersFilter: usersFilter,
        });

        this.search = "";
      } else {
        Swal.fire({
          icon: "error",
          text: "Field Search must be filled in!",
        });
      }
    },

    keyDown(event) {
      if (event.keyCode == 13) {
        this.makeFilter();

        event.preventDefault();
      }
    },
  },
};
</script>
