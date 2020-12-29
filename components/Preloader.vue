<template>
  <XyzTransition appear xyz="fade ease-out-back">
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
                id="logo--down"
                fill="#0740A9"
                class="fil0"
                points="1760,1375 731,1381 1245,189 "
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  </XyzTransition>
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
  }

  .loader {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 9999980;
    top: 0;
    left: 0;
    background: linear-gradient(270deg, #111649, #101968);
    background-size: 400% 400%;
    animation: bgSwitch 4s ease infinite;

    svg {
      height: 50px !important;
    }
  }

  .appear-enter {
    transform: translateX(0);
  }

  .appear-enter-active {
    transition: all 0.5s ease;
  }

  .appear-leave-active {
    transform: translateX(100%);
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

  #logo--up {
    animation: logoTop infinite 1s linear;
  }

  @keyframes logoTop {
    0% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(100px);
    }
  }

  @keyframes bgSwitch {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  #logo--down {
    animation: logoDown infinite 1s linear;
  }

  @keyframes logoDown {
    0% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(-100px);
    }
  }
</style>
