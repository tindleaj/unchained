<template>
  <section>
    <h3>Discord Stats</h3>
    <p>
      Total members:
      <strong>{{ totalDiscordMembers || 'loading...'}}</strong>
    </p>
    <p>
      Online now:
      <strong>{{ onlineDiscordMembers || 'loading...'}}</strong>
    </p>
    <p>
      <span>Today:&nbsp;</span>
      <span class="green">+{{ dailyDiscordMembersAdded }} ({{ dailyDiscordMembersAddedPercent }}%)</span>
    </p>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "DiscordStats",
  props: {},
  mounted: function() {
    axios.get("/api/discord").then(res => {
      this.totalDiscordMembers = res.data.members_total;
      this.onlineDiscordMembers = res.data.members_online;
      this.discordStatSnapshots = res.data.snapshots;
    });
  },
  data: function() {
    return {
      totalDiscordMembers: null,
      onlineDiscordMembers: null,
      discordStatSnapshots: []
    };
  },
  computed: {
    yesterday: function() {
      return Date.now() - 1000 * 60 * 60 * 24;
    },
    dailyDiscordMembersAddedPercent: function() {
      return (this.dailyDiscordMembersAdded / this.totalDiscordMembers) * 100;
    },
    dailyDiscordMembersAdded: function() {
      if (!this.discordStatSnapshots.length) return 0;

      let yesterdaySnapshot = this.discordStatSnapshots
        .slice(0)
        .reverse()
        .find(snapshot => {
          return snapshot.created_at < this.yesterday;
        });

      return this.totalDiscordMembers - yesterdaySnapshot.members_total;
    }
  },
  methods: {}
};
</script>

<style scoped>
.green {
  color: #bada55;
}
</style>
