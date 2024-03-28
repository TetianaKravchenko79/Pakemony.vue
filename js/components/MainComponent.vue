<template>
  <div class="container p-3">
    <SearchComponent :placeholderMain="searchPlaceholder" />
    <ReloadComponent />
    <RemoveAllComponent />
    <ListComponent />
  </div>
</template>

<script>
import SearchComponent from "../components/SearchComponent.vue";
import ListComponent from "../components/ListComponent.vue";
import ReloadComponent from "../components/ReloadComponent.vue";
import RemoveAllComponent from "./RemoveAllComponent.vue";

export default {
  data: function () {
    return {
      searchPlaceholder: "Search by Name",
    };
  },
  components: {
    SearchComponent,
    ListComponent,
    ReloadComponent,
    RemoveAllComponent,
  },
};
</script>
