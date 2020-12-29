<template>
  <section class="dash-body">
    <div class="mt-32 power--container w-100">
      <div class="w-100 flex flex-center flex-wrap">
        <div class="power--header">
          <a-card :bordered="false" style="width: 420px">
            <h4 class="power--unit--balance--title">Unit Balance</h4>
            <p class="power--value">48.74</p>
            <p class="power--serial">0101170442855</p>
            <p class="power--state">POWER ON</p>
          </a-card>
        </div>
      </div>
      <div class="mt-32 power--togglers w-100 flex flex-wrap">
        <div class="togglers flex flex-wrap">
          <div class="power--toggle">
            <img src="~/assets/img/energy.png" alt="" />
            <p>Buy Power</p>
          </div>
          <div class="power--toggle">
            <img src="~/assets/img/turned-off.png" alt="" />
            <p>Cut Power</p>
          </div>
          <div class="power--toggle">
            <img src="~/assets/img/electric-meter.png" alt="" />
            <p>Add Meter</p>
          </div>
          <div class="power--toggle">
            <img src="~/assets/img/settings.png" alt="" />
            <p>Settings</p>
          </div>
        </div>
        <div class="power--actions">
          <div class="action--top flex-column flex flex-between">
            <div class="w-100 flex flex-middle flex-between">
              <p class="highlight mb-0">Cut automatically</p>
              <a-switch />
            </div>
            <div class="w-100 flex flex-middle flex-between">
              <p class="mb-0">Cut Power when Unit falls below:</p>
              <div class="w-40 flex flex-end">
                <input
                  type="number"
                  value="0"
                  class="w-50 highlight set--unit"
                />
              </div>
            </div>
          </div>
          <div class="action--bottom">
            <div class="w-100 mb-20 flex flex-middle flex-between">
              <p class="mb-0">Cut Power to Refridgerator</p>
              <a-switch default-checked />
            </div>
            <div class="w-100 mb-20 flex flex-middle flex-between">
              <p class="mb-0">Cut Power to AC Units</p>
              <a-switch default-checked />
            </div>
            <div class="w-100 flex flex-middle flex-between">
              <p class="mb-0">Cut Power to Lighting Units</p>
              <a-switch default-checked />
            </div>
          </div>
        </div>
        <div class="power--charts">
          <div v-if="front" class="chart--front">
            <h4 class="mb-0">7 Day Usage</h4>
            <div class="chart--data flex">
              <PowerBar chart-text="MO" :chart-height="40" />
              <PowerBar chart-text="TU" :chart-height="70" />
              <PowerBar chart-text="WE" :chart-height="80" />
              <PowerBar chart-text="TH" :chart-height="77.3" />
              <PowerBar chart-text="FR" :chart-height="65" />
              <PowerBar chart-text="SA" :chart-height="40" />
              <PowerBar chart-text="SU" :chart-height="25" />
            </div>
          </div>
          <div v-if="!front" class="chart--back"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PowerBar from '~/components/powerBar'

  export default {
    components: { PowerBar },
    data() {
      return {
        baseUrl: process.env.baseUrl,
        activeWallet: 'afk',
        processing: false,
        amount: 0,
        cryptoToReceive: '',
        tabClass: 'afk_chart',
        collapse: ['1'],
        front: true,
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      ...mapGetters({
        countryCodes: 'countryCodes',
        btcData: 'chart/btcData',
        ethData: 'chart/ethData',
        litecoinData: 'chart/litecoinData',
        dashData: 'chart/dashData',
        btcChartData: 'chart/btcChartData',
        ethChartData: 'chart/ethChartData',
        litecoinChartData: 'chart/litecoinChartData',
        dashChartData: 'chart/dashChartData',
        chartData: 'chart/chartData',
        canvasClass: 'canvasClass',
        daysInterval: 'daysInterval',
        btcPrices: 'chart/btcPrices',
        ethPrices: 'chart/ethPrices',
        ltcPrices: 'chart/ltcPrices',
        dashPrices: 'chart/dashPrices',
        activeCurrency: 'activeCurrency',
        hourPeriod: 'chart/hourPeriod',
        monthPeriod: 'chart/monthPeriod',
        yearPeriod: 'chart/yearPeriod',
        dayPeriod: 'chart/dayPeriod',
        weekPeriod: 'chart/weekPeriod',
        allPeriod: 'chart/allPeriod',
        loading: 'dataLoading',
      }),
    },
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 1500)
    },
    layout: 'main',
    middleware: 'query',
  }
</script>

<style lang="scss">
  .power--header .ant-card {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(255, 255, 255, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum', 'tnum';
    position: relative;
    background: #04041b;
    border-radius: 10px;
    transition: all 0.3s;
    text-align: center;
    .power--unit--balance--title {
      font-size: 0.7rem;
      font-weight: lighter;
      color: #f0f0f0;
      text-transform: uppercase;
    }
    .power--value {
      font-family: 'Orbon ITC Regular', sans-serif !important;
      font-size: 5.5rem;
      font-style: normal;
      color: #f3bf33;
      margin-bottom: 0;
      line-height: 1.1;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    .power--serial {
      color: #f0f0f0;
      font-size: 0.9rem;
    }
    .power--state {
      color: #59b624;
      font-size: 1.3rem;
      margin-top: 20px;
      margin-bottom: 0;
    }
  }

  .power--togglers {
    width: 100%;
    justify-content: space-between;
    & > div {
      &:nth-child(1) {
        width: 26%;
      }
      width: 35%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .power--toggle {
        width: calc((50% - 10px));
        background: #0c1034;
        padding: 25px 20px;
        text-align: center;
        border-radius: 10px;
        img {
          height: 55px;
          width: auto;
          object-fit: contain;
        }
        p {
          margin: 0;
          margin-top: 20px;
        }
        &:nth-child(3) {
          margin-top: 20px;
        }
        &:nth-child(4) {
          margin-top: 20px;
        }
      }
    }
  }

  .power--actions {
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    overflow: hidden;
    .action--top {
      height: 50%;
      background: #04051b;
      width: 100%;
      padding: 25px;
      .set--unit {
        font-size: 1.2rem;
        text-align: right;
        border: none;
        background: transparent;
      }
    }

    .flex-end {
      justify-content: flex-end;
    }

    .ant-switch::after {
      background: #ffffff;
      top: 50%;
      transform: translateY(-50%);
    }

    .ant-switch {
      background-color: rgba(0, 0, 0, 25%);
      height: 12px;
    }
    .ant-switch-checked {
      background: #193990;
    }

    .ant-switch-checked::after {
      left: 100%;
      margin-left: 0;
      background: #2d52c9;
      transform: translateX(-100%) translateY(-50%);
    }

    .action--bottom {
      height: 50%;
      background: #080a28;
      width: 100%;
      padding: 25px;
    }
  }

  .power--container {
    max-width: 1080px;
    margin: 0 auto;
  }

  .power--charts {
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    .chart--front,
    .chart--back {
      height: 100%;
      width: 100%;
      background: #e18d29;
      padding: 20px;
    }
  }

  .chart--data {
    min-height: 170px;
    width: 100%;
    justify-content: space-between;
    align-items: end;
    padding: 20px 0;
    margin-top: 10px;
  }
</style>
