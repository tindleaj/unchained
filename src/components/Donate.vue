<template>
  <footer>
    <a :href="betaLink">Sign up with my beta key: {{ betaKey }}</a>
    <p>Buy me some packs 😃: {{ ethAddress }}</p>
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
