<template>
  <section class="dash-body">
    <div>
      <div :class="[{ 'pl-0': $device.isMobileOrTablet }, 'welcome-text']">
        <div class="text-center">
          <h1 class="w-100 c-white am-type mt-0 mb-0 text-large light">
            Wallets
          </h1>
        </div>
      </div>
      <div :class="[{ 'pl-0': $device.isMobileOrTablet }, 'summary__chart']">
        <highchart
          v-if="
            +userDetails.afk_balance !== 0 &&
            +userDetails.btc_balance !== 0 &&
            +userDetails.eth_balance !== 0
          "
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
                borderColor: '#000000',
                allowPointSelect: true,
                cursor: 'pointer',
                borderWidth: 1,
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
                  { name: 'AfriToken Balance', y: +userDetails.afk_balance },
                  { name: 'Bitcoin Balance', y: +userDetails.btc_balance },
                  { name: 'Ethereum Balance', y: +userDetails.eth_balance },
                ],
              },
            ],
          }"
        />
        <a-empty
          v-else
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          :image-style="{
            height: '60px',
          }"
        >
          <span slot="description" class="c-white">
            You have 0 credit in all your wallets
          </span>
          <div class="sub-button mt-20">
            <button class="w-100">Buy Crypto</button>
          </div>
        </a-empty>
      </div>
      <a-skeleton :loading="loading" active :paragraph="{ rows: 12 }">
        <div class="wallet-content mt-40">
          <a-tabs
            :tab-position="$device.isMobileOrTablet ? 'top' : 'left'"
            :class="tabClass"
            @change="callback"
          >
            <a-tab-pane v-for="data in chartData" :key="data.className">
              <span slot="tab">
                <span class="d-block">${{ data.price | doubleForm }}</span>
                {{ data.asset_name.name }}
                <span class="d-block">
                  {{ data.balance | formatNumberLong }}
                  {{ data.currency }}
                </span>
              </span>
              <div class="w-100">
                <div class="w-100 text-center">
                  <img height="40" :src="data.asset_name.img" alt="" />
                  <h2 class="currency__balance mt-8">
                    <span class="large-text">
                      {{ data.balance | doubleForm }}
                    </span>
                    {{ data.currency }}
                  </h2>
                  <h3 class="c-white light">
                    <span class="small-text mr-4">$</span>
                    {{ data.price | doubleForm }}
                    <span class="small-text">USD</span>
                  </h3>
                </div>
                <div class="wallet-btns flex flex-center flex-wrap w-100 mt-20">
                  <button
                    class="normal-btn afk-bordered mr-20"
                    @click="$store.commit('setWalletSend', data.currency)"
                  >
                    Send
                  </button>
                  <button
                    class="normal-btn afk-bordered mr-20"
                    @click="$store.commit('setWalletRecieve', data.currency)"
                  >
                    Recieve
                  </button>
                  <a class="icon-btn">
                    <img
                      src="~/assets/img/exchange-icon.png"
                      height="35"
                      alt=""
                    />
                  </a>
                </div>
                <a-collapse v-model="collapse" expand-icon-position="right">
                  <a-collapse-panel key="1" header="PRICE CHART">
                    <highchart
                      :options="{
                        title: {
                          text: null,
                        },
                        chart: {
                          backgroundColor: false,
                          className: data.className,
                          styledMode: true,
                          type: 'line',
                          width: 1200,
                        },
                        xAxis: {
                          reversed: false,
                          gridLineWidth: 0.5,
                          gridLineColor: '#131a4b',
                        },
                        yAxis: {
                          reversed: false,
                          gridLineWidth: 0.5,
                          gridLineColor: '#272f6a',
                        },
                        series: [
                          {
                            name: data.name,
                            data: data.chart,
                          },
                        ],
                      }"
                    />
                  </a-collapse-panel>
                  <a-collapse-panel
                    key="2"
                    header="DESCRIPTION"
                    :disabled="false"
                  >
                    <p class="c-white">
                      <span class="small-text"
                        >PayAfrik offers a cryptocurrency wallet with which
                        users can accept cryptocurrencies for services rendered
                        & pay with cryptocurrencies for services received. The
                        PayAfrik wallet can receive and send value
                        anywhere.</span
                      >
                    </p>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-skeleton>
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
    middleware: 'query',
    components: {},
    data() {
      return {
        baseUrl: process.env.baseUrl,
        activeWallet: 'afk',
        processing: false,
        amount: 0,
        cryptoToReceive: '',
        tabClass: 'afk_chart',
        collapse: ['1'],
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
      // this.loadChart()
      /* this.$notification.error({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        duration: 0,
        class: 'error',
        icon: false,
        onClick: () => {
          console.log('Notification Clicked!')
        },
      }) */
      if (this.$route.query.active) {
        // console.log('theres a query')
        this.changeWallet(this.$route.query.active)
      }
    },
    beforeMount() {
      this.closeSideBar()
    },
    methods: {
      callback(val) {
        console.log(val)
        this.tabClass = val
      },
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
          Authorization: this.$auth.getToken('local'),
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
  .welcome-text,
  .summary__chart {
    padding-left: 115px;
  }
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
