<template>
  <transition name="appear" mode="in-out">
    <div v-if="loading" class="loader">
      <div class="animated__circs">
        <img src="~/assets/img/logo.png" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Preloader',
    data: () => ({
      loading: true,
    }),
    mounted() {
      setTimeout(() => {
        this.finish()
      }, 500)
    },
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .animated__circs {
    display: flex;
    width: 200px;
    height: 200px;
    justify-content: center;
    align-items: center;
    position: relative;
    &::before {
      content: '';
      background: url(../assets/img/circ1.png);
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 4567890;
      background-size: cover;
      top: 0;
      left: 0;
      animation: circRotate infinite 20s linear;
    }
    &::after {
      content: '';
      background: url(../assets/img/circ2.png);
      position: absolute;
      height: 90%;
      width: 90%;
      z-index: 4567890;
      top: 10px;
      left: 10px;
      background-size: cover;
      animation: circRotate infinite 20s linear reverse;
    }
  }

  .loader {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 999980;
    background: #111649;
    img {
      height: 35px !important;
    }
  }

  .appear-enter {
    //transform: scaleX(0);
    opacity: 0;
  }

  .appear-enter-active {
    transition: all 0.5s ease;
  }

  .appear-leave-active {
    //transform: scaleX(0);
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  @keyframes circRotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
