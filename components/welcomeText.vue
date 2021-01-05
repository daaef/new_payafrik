<template>
  <div class="welcome-text">
    <div>
      <p class="w-100 c-white">Good {{ greeting }}</p>
      <h1 class="w-100 c-white am-type mt-0 mb-0">
        {{ userDetails.first_name }} {{ userDetails.last_name }}
      </h1>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'WelcomeText',
    data: () => ({
      greeting: 'Morning',
    }),
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
    },
    mounted() {
      const currentTime = new Date()
      if (currentTime.getHours() < 12) {
        this.greeting = 'Morning'
      } else if (currentTime.getHours() >= 12) {
        if (currentTime.getHours() < 16) {
          this.greeting = 'Afternoon'
        } else this.greeting = 'Evening'
      }
    },
  }
</script>

<style lang="scss">
  .main-content main .dash-body > div .welcome-text {
    display: flex;
    align-items: start;
    justify-content: start;
    margin: 20px 0;
  }
</style>
