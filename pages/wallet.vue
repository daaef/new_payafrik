<template>
  <section class="dash-body">
    <div>
      <div class="welcome-text">
        <div class="text-center">
          <h1 class="w-100 c-white am-type mt-0 mb-0 text-large light">
            Wallets
          </h1>
        </div>
      </div>
      <div class="summary__chart">
        <highchart
          :options="{
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
              backgroundColor: null,
              borderColor: null,
            },
            title: {
              text: null,
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            },
            accessibility: {
              point: {
                valueSuffix: '%',
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderWidth: 0,
                dataLabels: {
                  enabled: false,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  connectorColor: 'silver',
                },
              },
            },
            series: [
              {
                innerSize: '95%',
                name: 'balance',
                data: [
                  { name: 'AfriToken Balance', y: 150.41 },
                  { name: 'Bitcoin Balance', y: 0.084 },
                  { name: 'Ethereum Balance', y: 0.85 },
                  { name: 'Litecoin Balance', y: 4.67 },
                  { name: 'Dashcoin Balance', y: 1.18 },
                ],
              },
            ],
          }"
        />
      </div>
    </div>

    <!-- Card Request Modal -->
    <div
      id="buyCryptoModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="buyCryptoModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalCenterTitleTitle" class="modal-title">
              Swap your AfriTokens for Cryptocurrency
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container ml-3">
              <div class="row">
                <div class="col-md-12">
                  <p>
                    You are about to convert your available
                    <span class="warn">AfriTokens</span> to cryptocurrency.
                  </p>
                  <p>
                    Please select the currency you want to receive below and
                    enter the amount of AfriTokens you would like to convert
                  </p>
                  <label>Select card type</label>
                  <select v-model="cryptoToReceive">
                    <option value="">Select currency to receive</option>
                    <option value="AFK">Africoin</option>
                    <option value="BTC">Bitcoin</option>
                    <option value="ETH">Ethereum</option>
                    <option value="BTC">LiteCoin</option>
                    <option value="DASH">Dash</option>
                  </select>
                  <label>Amount</label>
                  <input
                    v-model="amount"
                    type="number"
                    class="mb-2"
                    placeholder="Amount in AfriTokens"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <button type="button" class="cancel" data-dismiss="modal">
                    Cancel
                  </button>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-7">
                  <button
                    v-if="!processing"
                    class="success-btn"
                    type="submit"
                    @click="requestConversion()"
                  >
                    Request Conversion
                  </button>
                  <button v-if="processing" class="success-btn" disabled>
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    components: {},
    data() {
      return {
        baseUrl: process.env.baseUrl,
        activeWallet: 'afk',
        processing: false,
        amount: 0,
        cryptoToReceive: '',
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      ...mapGetters({
        countryCodes: 'countryCodes',
        btcData: 'btcData',
        ethData: 'ethData',
        litecoinData: 'litecoinData',
        dashData: 'dashData',
        btcChartData: 'btcChartData',
        ethChartData: 'ethChartData',
        litecoinChartData: 'litecoinChartData',
        dashChartData: 'dashChartData',
        data: 'chartData',
        chatBoxClosed: 'chatBoxClosed',
        tokenModalActive: 'tokenModalActive',
        canvasClass: 'canvasClass',
        daysInterval: 'daysInterval',
        btcPrices: 'btcPrices',
        ethPrices: 'ethPrices',
        ltcPrices: 'ltcPrices',
        dashPrices: 'dashPrices',
        activeCurrency: 'activeCurrency',
      }),
    },
    mounted() {
      // this.loadChart()
      console.log('BTCDATA ======', this.btcData)
      if (this.$route.query.active) {
        // console.log('theres a query')
        this.changeWallet(this.$route.query.active)
      }
    },
    beforeMount() {
      this.closeSideBar()
    },
    methods: {
      openModal(modalId) {
        /* $('#' + modalId).modal('show')
        $('.modal-backdrop').hide() */
      },
      changeWallet(wallet) {
        this.activeWallet = wallet
        setTimeout(() => {
          this.loadChart()
        }, 500)
      },
      closeSideBar() {
        this.$store.commit('global/closeSidebar')
      },
      ...mapMutations({
        toggleSidebar: 'global/toggleSidebar',
        closeSideBar: 'global/closeSidebar',
        openFunctionModal: 'global/openFunctionModal',
      }),

      openFunctionModal(modalActiveClass, activeWallet, activeCurrency) {
        this.$store.commit('global/openFunctionModal', {
          class: modalActiveClass,
          wallet: activeWallet,
          currency: activeCurrency,
        })
      },

      async requestConversion() {
        if (!this.amount || this.amount === 0) {
          this.$toast.error('Please select an amount greater than 0')
          return
        }
        if (!this.cryptoToReceive || this.cryptoToReceive === '') {
          this.$toast.error('Please choose a currency to receive')
          return
        }

        this.processing = true

        const payload = {
          amount: this.amount,
          from_currency: 'AFRITOKEN',
          to_currency: this.cryptoToReceive,
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.userDetails.token,
        }
        try {
          const requestResponse = await this.$axios.$post(
            this.baseUrl + 'exchange/barter/swap/',
            payload,
            { headers }
          )
          console.log('request response', requestResponse)
          this.$toast.success('Conversion request successful!')
          this.processing = false
        } catch (e) {
          console.log(e.response)
          this.$toast.error(e.response.data.error)
          this.processing = false
        }
      },

      loadChart() {
        const ctx = document.getElementById('myChart')
        ctx.getContext('2d')
        ctx.style.height = '174px'
        ctx.style.maxHeight = '174px'
        ctx.style.width = '100%'
      },
    },
  }
</script>

<style scoped lang="scss">
  #buyCryptoModal {
    display: none;
  }
  .summary__chart {
    .highcharts-credits {
      display: none !important;
    }
    svg {
      rect {
        fill: transparent;
      }
    }
  }
  a.tag-button {
    display: inline-block;
    padding: 3px 15px;
    border-radius: 50px;
    background-color: #f8ae30;
    color: #141f50;
    font-size: 0.9em;
    left: 170px;
    position: absolute;
  }

  a.tag-button:hover {
    background-color: #141f50;
    color: #f8ae30;
  }

  select {
    padding: 20px;
    color: #ffffff99;
    background: #111a3f;
    border: solid 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    width: 100%;
  }

  #buyCryptoModal .modal-content {
    background-color: #131c4b;
    border: dashed 1px #4451ff;
    box-shadow: 25px 25px 100px #00000044;
    padding: 0;
    color: #fff;
  }

  .input-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  #buyCryptoModal .modal-content {
    background-color: #131c4b;
    border: dashed 1px #4451ff;
    box-shadow: 25px 25px 100px #00000044;
    padding: 0;
    color: #fff;
  }

  #buyCryptoModal .modal-header {
    margin-bottom: 15px;
    border: none !important;
  }

  #buyCryptoModal .modal-header button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }

  #buyCryptoModal .modal-header h5 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.2em;
  }

  #buyCryptoModal .modal-footer {
    border: none !important;
  }

  #buyCryptoModal .modal-footer button {
    background: #11154b;
    color: #f6f6f6;
    border: solid #2832c3;
    padding: 10px 40px;
    border-radius: 25px;
    cursor: pointer;
  }

  #buyCryptoModal .modal-footer button.cancel {
    border: solid transparent;
  }

  p.warn,
  span.warn,
  a.warn {
    font-weight: 700;
    color: #f8ae30;
  }

  label {
    font-weight: 500;
    color: #ffffffcb;
    font-size: 0.8em;
  }

  input {
    padding: 20px;
    color: #ffffff99;
    background: #111a3f;
    border: solid 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    width: 100%;
  }

  a.icon-btn {
    cursor: pointer;
  }

  a.card-option.bordered {
    border-radius: 5px;
    border: 2px solid #f8ae30;
    display: block;
  }

  @media (max-width: 768px) {
    /* .not-for-mobile{
      display:none;
    } */
    .w-afk,
    .w-eth,
    .w-btc,
    .w-ltc,
    .w-dash .wallet-chart {
      width: 100%;
    }

    .afk-wallet,
    .btc-wallet,
    .eth-wallet,
    .dash-wallet,
    .ltc-wallet {
      margin: auto;
    }
  }
</style>
