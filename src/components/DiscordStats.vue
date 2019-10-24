<template>
  <section>
    <h3>Discord Stats</h3>
    <p>
      Total members:
      <strong>{{ totalMembers || 'loading...'}}</strong>
    </p>
    <p>
      Online now:
      <strong>{{ onlineMembers || 'loading...'}}</strong>
    </p>
    <p>
      <span>Today:&nbsp;</span>
      <span class="green">+{{ dailyNewMembers }} ({{ dailyNewMembersPercent }}%)</span>
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
      this.totalMembers = res.data.total_members;
      this.onlineMembers = res.data.online_members;
    });
  },
  data: function() {
    return {
      totalMembers: null,
      onlineMembers: null,
      dailyNewMembers: 0
    };
  },
  computed: {
    dailyNewMembersPercent: function() {
      return 0;
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
