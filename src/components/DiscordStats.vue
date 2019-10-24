<template>
  <div>
    <h3>Discord</h3>
    <p>Total members: {{ memberCount || 'loading...'}}</p>
    <p>
      <span>Today:&nbsp;</span>
      <span class="green">+{{ dailyNewMembers }} ({{ dailyNewMembersPercent }}%)</span>
      <small>&nbsp;coming soon...</small>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DiscordStats",
  props: {},
  mounted: function() {
    axios.get("/api/discord").then(res => {
      this.memberCount = res.data.memberCount;
    });
  },
  data: function() {
    return {
      memberCount: null,
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
