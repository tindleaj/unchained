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
      <small>&nbsp;coming soon...</small>
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

    this.discordStatSnapshots = [
      { id: 0, members_total: 0, members_online: 0, created_at: 0 },
      { id: 1, members_total: 15392, members_online: 0, created_at: 0 },
      {
        id: 2,
        members_total: 15404,
        members_online: 0,
        created_at: 1572004800
      },
      {
        id: 3,
        members_total: 15454,
        members_online: 1956,
        created_at: 1571974738
      },
      {
        members_total: 15459,
        members_online: 1832,
        id: 4,
        created_at: 1571979471702
      },
      {
        members_total: 15459,
        members_online: 1832,
        id: 5,
        created_at: 1571979566425
      },
      {
        members_total: 15459,
        members_online: 1832,
        id: 6,
        created_at: 1571979584223
      },
      {
        members_total: 15458,
        members_online: 1801,
        id: 7,
        created_at: 1571980648449
      },
      {
        members_total: 15458,
        members_online: 1801,
        id: 8,
        created_at: 1571980666444
      }
    ];
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
      return 0;
      // if (!this.discordStatSnapshots.length) return 0;
      // let yesterday = this.getYesterday();
      // let yesterdaySnapshot = this.discordStatSnapshots.find(snapshot => {
      //   return snapshot.created_at > yesterday;
      // });
      // return (yesterdaySnapshot.members_total / this.totalDiscordMembers) * 100;
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
