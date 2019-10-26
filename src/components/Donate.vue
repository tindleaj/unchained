<template>
  <footer>
    <small>
      <a :href="betaLink">Sign up with my beta key: {{ betaKey }}</a>
    </small>
    <small>
      <p>Buy me some packs 😃: {{ ethAddress }}</p>
    </small>
  </footer>
</template>

<script>
export default {
  name: "DiscordStats",
  props: {
    betaKey: String,
    ethAddress: String
  },
  computed: {
    betaLink: function() {
      return `https://godsunchained.com?beta-key=${this.betaKey}`;
    }
  }
};
</script>

<style scoped>
.green {
  color: #bada55;
}
</style>
