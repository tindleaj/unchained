<template>
  <section>
    <h3>Player Stats</h3>
    <p>
      Total players:
      <strong>{{ totalPlayers || 'loading...'}}</strong>
    </p>
    <p>
      <span>New players today:&nbsp;</span>
      <!-- <span class="green">+{{ 0 }} ({{ 0 }}%)</span> -->
      <small>&nbsp;coming soon...</small>
    </p>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "PlayerStats",
  props: {},
  mounted: function() {
    axios.get("/api/players").then(res => {
      this.totalPlayers = res.data.players_total;
    });
  },
  data: function() {
    return {
      totalPlayers: null
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.green {
  color: #bada55;
}
</style>
