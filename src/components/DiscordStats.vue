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
      <span>
        New members since
        <em>{{ pastSnapshotDate }}</em>:&nbsp;
      </span>
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
      return (
        (this.dailyDiscordMembersAdded / this.totalDiscordMembers) *
        100
      ).toFixed(3);
    },
    dailyDiscordMembersAdded: function() {
      if (!this.discordStatSnapshots.length) return 0;

      return this.totalDiscordMembers - this.pastSnapshot.members_total;
    },
    pastSnapshotDate: function() {
      if (!this.pastSnapshot) return;

      return new Date(this.pastSnapshot.created_at).toDateString();
    },
    pastSnapshot: function() {
      if (!this.discordStatSnapshots.length) return;

      let pastSnapshot = this.discordStatSnapshots
        .slice(0)
        .reverse()
        .find(snapshot => {
          return snapshot.created_at < this.yesterday;
        });

      return pastSnapshot;
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
