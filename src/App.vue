<template>
  <div id="app">
    <h1>Gods Unchained Info</h1>
    <PlayerStats />
    <DiscordStats />

    <Donate betaKey="viMMXXXGTJ" ethAddress="0xD7D59474C7EbBF5Ef3Ed7dc0075D22CE4a16013d" />
  </div>
</template>

<script>
import DiscordStats from "./components/DiscordStats.vue";
import PlayerStats from "./components/PlayerStats.vue";
import Donate from "./components/Donate.vue";

export default {
  name: "app",
  components: {
    PlayerStats,
    DiscordStats,
    Donate
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

.green {
  color: #bada55;
}

#app section {
  margin-bottom: 42px;
}
</style>
