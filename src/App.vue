<template>
  <div id="app">
    <h1>Gods Unchained Info</h1>
    <DiscordStats />
  </div>
</template>

<script>
import DiscordStats from "./components/DiscordStats.vue";

export default {
  name: "app",
  components: {
    DiscordStats
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
