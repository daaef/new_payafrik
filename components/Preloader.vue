<template>
  <transition name="appear" mode="in-out">
    <div v-if="loading" class="loader">
      <div class="animated__circs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xml:space="preserve"
          width="1.27143in"
          height="0.998063in"
          version="1.1"
          style="
            shape-rendering: geometricPrecision;
            text-rendering: geometricPrecision;
            image-rendering: optimizeQuality;
            fill-rule: evenodd;
            clip-rule: evenodd;
          "
          viewBox="0 0 1760 1381"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <g id="_1093129483136">
              <polygon
                id="logo--up"
                fill="#FDB302"
                class="fil0"
                points="1029,7 0,0 514,1192 "
              />
              <polygon
                id="logo--up"
                fill="#0740A9"
                class="fil0"
                points="1760,1375 731,1381 1245,189 "
              />
            </g>
          </g>
        </svg>
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
      }, 1500)
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
