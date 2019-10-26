<template>
  <section>
    <h3>Player Stats</h3>
    <p>
      Total players:
      <strong>{{ totalPlayers || 'loading...'}}</strong>
    </p>
    <p>
      <span>
        New players since
        <em>{{ pastSnapshotDate }}</em>:&nbsp;
      </span>
      <span class="green">+{{ dailyNewPlayers }} ({{ dailyNewPlayersPercent }}%)</span>
    </p>
  </section>
</template>

<script>
import axios from "axios";
// import { player_snapshots } from "./_mock.js";
export default {
  name: "PlayerStats",
  props: {},
  mounted: function() {
    axios.get("/api/players").then(res => {
      this.totalPlayers = res.data.players_total;
      this.snapshots = res.data.snapshots;
    });

    // Test data
    // this.totalPlayers = 59012;
    // this.snapshots = player_snapshots;
  },
  data: function() {
    return {
      totalPlayers: null,
      snapshots: null
    };
  },
  computed: {
    yesterday: function() {
      return Date.now() - 1000 * 60 * 60 * 24;
    },
    dailyNewPlayersPercent: function() {
      return ((this.dailyNewPlayers / this.totalPlayers) * 100).toFixed(3);
    },
    dailyNewPlayers: function() {
      if (!this.snapshots) return 0;

      let res = this.totalPlayers - this.pastSnapshot.players_total;

      return res;
    },
    pastSnapshotDate: function() {
      if (!this.pastSnapshot) return;

      return new Date(this.pastSnapshot.created_at).toDateString();
    },
    pastSnapshot: function() {
      if (!this.snapshots) return;

      let pastSnapshot = this.snapshots
        .slice(0)
        .reverse()
        .find(snapshot => {
          return snapshot.created_at < this.yesterday;
        });

      return pastSnapshot || this.snapshots[0];
    }
  },
  watch: {},
  methods: {}
};
</script>

<style scoped>
.green {
  color: #bada55;
}
</style>
