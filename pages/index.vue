<template>
  <section class="dash-body">
    <div>
      <div class="welcome-text">
        <div class="text-center">
          <p class="w-100 c-white">welcome to</p>
          <h1 class="w-100 c-white am-type mt-0 mb-0">PayAfrik.io</h1>
        </div>
      </div>
      <ul class="card-links">
        <li class="link-card">
          <a href="#">
            <div class="imge">
              <img src="~/assets/img/purse.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Manage your wallets &amp; make transactions
            </p>
            <p class="higlight text-center">Make Transactions</p>
          </a>
        </li>
        <li class="link-card">
          <a href="#">
            <div class="imge">
              <img src="~/assets/img/bills.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Pay your bills for utilities &amp; services
            </p>
            <p class="higlight text-center">Pay Bills</p>
          </a>
        </li>
        <li class="link-card">
          <a href="#">
            <div class="imge">
              <img src="~/assets/img/exchange.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Exchange your cryptocurrencies with ease
            </p>
            <p class="higlight text-center">Exchange</p>
          </a>
        </li>
        <li class="link-card">
          <a href="#">
            <div class="imge">
              <img src="~/assets/img/supporting.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Get professional support &amp; quality customer care
            </p>
            <p class="higlight text-center">Support</p>
          </a>
        </li>
      </ul>
      <div class="wallets--and--transactions">
        <div class="wallets">
          <h3 class="c-white">WALLETS</h3>
          <div class="table--holder">
            <!--<table>
              <thead>
                <tr>
                  <th class="text-left"><span>ASSET NAME</span></th>
                  <th>PRICE</th>
                  <th>24H CHANGE</th>
                  <th>MARKET CAP</th>
                  <th>30 DAY TREND</th>
                  <th>BALANCE</th>
                </tr>
              </thead>
              <tbody>
                <tr onclick="window.location='#';">
                  <td>
                    <span>
                      <img src="~/assets/img/Africoin.png" alt="" />
                      <span class="ml-16 d-block">
                        <span class="mb-4 d-block">Africoin</span>
                        <span class="muted">AFK</span>
                      </span>
                    </span>
                  </td>
                  <td>$1.00</td>
                  <td><span class="c-success">+0.3%</span></td>
                  <td>$3.21B</td>
                  <td>
                    <canvas id="myChart"></canvas>
                  </td>
                  <td><span class="c-afk">0AFK</span></td>
                </tr>
                <tr onclick="window.location='#';">
                  <td>
                    <span>
                      <img src="~/assets/img/bitcoin.png" alt="" />
                      <span class="ml-16 d-block">
                        <span class="mb-4 d-block">Bitcoin</span>
                        <span class="muted">BTC</span>
                      </span>
                    </span>
                  </td>
                  <td>$7,634.32</td>
                  <td><span class="c-success">+1.19%</span></td>
                  <td>$140B</td>
                  <td>
                    <canvas id="myChart1"></canvas>
                  </td>
                  <td><span class="c-btc">0BTC</span></td>
                </tr>
                <tr onclick="window.location='#';">
                  <td>
                    <span>
                      <img src="~/assets/img/eth.png" alt="" />
                      <span class="ml-16 d-block">
                        <span class="mb-4 d-block">Ethereum</span>
                        <span class="muted">ETH</span>
                      </span>
                    </span>
                  </td>
                  <td>$7,634.32</td>
                  <td><span class="c-success">+0.94%</span></td>
                  <td>$21.64B</td>
                  <td>
                    <canvas id="myChart2"></canvas>
                  </td>
                  <td><span class="c-eth">0BTC</span></td>
                </tr>
              </tbody>
            </table>-->
            <a-table
              :data-source="data"
              :pagination="{ hideOnSinglePage: true }"
              :row-key="(record) => record.className"
            >
              <a-table-column
                key="asset_name"
                title="ASSET NAME"
                data-index="asset_name"
              >
                <template slot-scope="asset">
                  <span>
                    <img :src="asset.img" alt="" />
                    {{ asset.name }}
                  </span>
                </template>
              </a-table-column>
              <a-table-column key="price" title="PRICE" data-index="price">
                <template slot-scope="price">
                  ${{ price | formatNumber }}
                </template>
              </a-table-column>
              <a-table-column
                key="change"
                title="24H CHANGE"
                data-index="change"
              >
                <template slot-scope="change">
                  <span :class="[change > 0 ? 'c-success' : 'c-alert']">
                    {{ change > 0 ? '+' : '' }}{{ change }}%
                  </span>
                </template>
              </a-table-column>
              <a-table-column
                key="market_cap"
                title="MARKET CAP"
                data-index="market_cap"
              >
                <template slot-scope="cap_data">
                  ${{ cap_data | formatNumber }}
                </template>
              </a-table-column>
              <a-table-column
                key="trend"
                title="30 DAY TREND"
                data-index="trend"
              >
                <template slot-scope="trend">
                  <trend
                    :data="trend"
                    :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                    auto-draw
                    smooth
                  >
                  </trend>
                </template>
              </a-table-column>
              <a-table-column
                key="balance"
                title="BALANCE"
                data-index="balance"
              >
                <template slot-scope="balance"> ${{ balance }} </template>
              </a-table-column>
              <!--<a-table-column key="balance" title="BALANCE" />-->
              <p
                slot="expandedRowRender"
                slot-scope="record"
                class="important_chart"
                style="margin: 0"
              >
                <!-- <a-radio-group default-value="a" @change="onChange">
                  <a-radio-button :value="`a`"> Hangzhou </a-radio-button>
                  <a-radio-button :value="`b`"> Shanghai </a-radio-button>
                  <a-radio-button :value="`c`"> Beijing </a-radio-button>
                  <a-radio-button :value="`d`"> Chengdu </a-radio-button>
                </a-radio-group>-->
                <highchart
                  :options="{
                    title: {
                      text: null,
                    },
                    chart: {
                      backgroundColor: null,
                      className: record.className,
                      styledMode: true,
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
                        name: record.name,
                        data: record.chart,
                      },
                    ],
                  }"
                />
              </p>
            </a-table>
          </div>
          <!--<div class="add&#45;&#45;more">
            <button class="blueish-btn btn">+Add More</button>
          </div>-->
        </div>
        <div class="transactions">
          <h3 class="c-white">TRANSACTIONS</h3>
          <table>
            <thead>
              <tr>
                <th class="text-left"><span>TYPE</span></th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <div class="no-trans">
            <p class="c-white">No Transactions</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  /*
  let dashChartData */
  export default {
    async fetch() {
      await this.$store.dispatch('chart/getCoinData')
    },

    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      data() {
        return {
          value: 'a',
        }
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
        data: 'chart/chartData',
        chatBoxClosed: 'chatBoxClosed',
        tokenModalActive: 'tokenModalActive',
        canvasClass: 'canvasClass',
        daysInterval: 'chart/daysInterval',
        priceCurrency: 'chart/priceCurrency',
        bitcoinCurrency: 'chart/bitcoinCurrency',
        ethereumCurrency: 'chart/ethereumCurrency',
        litecoinCurrency: 'chart/litecoinCurrency',
        dashcoinCurrency: 'chart/dashcoinCurrency',
        hourPeriod: 'chart/hourPeriod',
        monthPeriod: 'chart/monthPeriod',
        yearPeriod: 'chart/yearPeriod',
        dayPeriod: 'chart/dayPeriod',
        weekPeriod: 'chart/weekPeriod',
        allPeriod: 'chart/allPeriod',
      }),
    },
    async mounted() {
      await this.$store.dispatch('chart/getBitcoinData', this.hourPeriod)
      await this.$store.dispatch('chart/getEthPriceData', this.hourPeriod)
      await this.$store.dispatch('chart/getLtcPriceData', this.hourPeriod)
      await this.$store.dispatch('chart/getDashPriceData', this.hourPeriod)
      // await this.triggerFetchData()
      /* await this.$store.commit(
        'setBtcPrices',
        await this.getBTCChartData(this.daysInterval)
      )
      await this.$store.commit(
        'setEthPrices',
        await this.getETHChartData(this.daysInterval)
      )
      await this.$store.commit(
        'setLtcPrices',
        await this.getLTCChartData(this.daysInterval)
      )
      await this.$store.commit(
        'setDashPrices',
        await this.getDASHChartData(this.daysInterval)
      ) */
    },
    methods: {
      /*
      async triggerFetchData() {
        await this.$store.dispatch('getCoinData')
      }, */
      onChange(e) {
        console.log(`checked = ${e.target.value}`)
      },
      toggleChatBox() {
        this.$store.commit('global/toggleChatBox')
      },
      toggleTokenModal() {
        this.$store.commit('global/toggleTokenModal')
      },
      ...mapMutations({
        toggleChatBox: 'toggleChatBox',
      }),
      async getBTCChartData(period) {
        const dDate = Math.floor(
          this.$moment().subtract(period, 'days').format('x') / 1000
        )
        console.log('dDate', dDate)
        const today = Math.round(new Date().getTime() / 1000)
        const btcMarketData = await this.$axios.$get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${dDate}&to=${today}`
        )
        // new Date(1598731229695).toDateString()
        const btcArray = []
        btcMarketData.prices.forEach((btc) => {
          btcArray.push([new Date(btc[0]).toDateString(), btc[1]])
        })
        return btcArray
      },
      async getETHChartData(period) {
        const dDate = Math.floor(
          this.$moment().subtract(period, 'days').format('x') / 1000
        )
        console.log('dDate', dDate)
        const today = Math.round(new Date().getTime() / 1000)
        const ethMarketData = await this.$axios.$get(
          `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${dDate}&to=${today}`
        )
        const btcArray = []
        ethMarketData.prices.forEach((btc) => {
          btcArray.push([new Date(btc[0]).toDateString(), btc[1]])
        })
        return btcArray
      },
      async getLTCChartData(period) {
        const dDate = Math.floor(
          this.$moment().subtract(period, 'days').format('x') / 1000
        )
        console.log('dDate', dDate)
        const today = Math.round(new Date().getTime() / 1000)
        const ltcMarketData = await this.$axios.$get(
          `https://api.coingecko.com/api/v3/coins/litecoin/market_chart/range?vs_currency=usd&from=${dDate}&to=${today}`
        )
        const btcArray = []
        ltcMarketData.prices.forEach((btc) => {
          btcArray.push([new Date(btc[0]).toDateString(), btc[1]])
        })
        return btcArray
      },
      async getDASHChartData(period) {
        const dDate = Math.floor(
          this.$moment().subtract(period, 'days').format('x') / 1000
        )
        console.log('dDate', dDate)
        const today = Math.round(new Date().getTime() / 1000)
        const dashMarketData = await this.$axios.$get(
          `https://api.coingecko.com/api/v3/coins/dash/market_chart/range?vs_currency=usd&from=${dDate}&to=${today}`
        )
        const btcArray = []
        dashMarketData.prices.forEach((btc) => {
          btcArray.push([new Date(btc[0]).toDateString(), btc[1]])
        })
        return btcArray
      },
    },
  }
</script>

<style lang="scss"></style>
