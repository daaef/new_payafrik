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
        <li class="link-card active">
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
                    ${{ change }}%
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
              <a-table-column key="balance" title="BALANCE" />
              <p slot="expandedRowRender" style="margin: 0">
                <!--{{ record.description }}-->oi oi oi
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
    async asyncData({ store, $axios }) {
      await store.dispatch('getCoinData')
    },
    data() {
      return {
        chartOptions: {
          series: [
            {
              data: [
                1.015265195472865,
                1.01242680319435,
                1.0096478854081303,
                1.0124543031237503,
                1.0127278998766567,
                1.0110777222454648,
                1.0100523220204507,
                1.0099747039363762,
                1.0105604453430104,
                1.0090738300244995,
                1.0106146631115616,
                1.0109582202843705,
                1.0092981982357934,
                1.0107788722728457,
                1.00805660600075,
                1.0100710323132955,
                1.009619186324768,
                1.010161707574495,
                1.0093092059065067,
                1.0099072484037694,
                1.0102823323155186,
                1.0099305559899803,
                1.0089813227144306,
                1.0105546749128793,
                1.0119640797496332,
                1.0106554276055224,
                1.0060052535236157,
                1.0113619889110974,
                1.011331387581466,
                1.009657993772738,
                1.0134647900310305,
                1.0121680934976525,
                1.012324264110342,
                1.0118448153176656,
                1.0111162012440214,
                1.0129512244272698,
                1.0127437543106859,
                1.0145513451958748,
                1.012200782172699,
                1.010441773218563,
                1.010892943469041,
                1.0126299292840304,
                1.0124375497369293,
                1.013934291173744,
                1.0093737168739871,
                1.010842695946667,
                1.0105953605250055,
                1.0091236291784735,
                1.011824724687361,
                1.0092062976534548,
              ],
              pointStart: 1,
            },
          ],
        },
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
      }),
    },
    async mounted() {
      await this.triggerFetchData()
      this.$store.commit(
        'setIntervalClearer',
        setInterval(
          function () {
            this.triggerFetchData()
          }.bind(this),
          30000
        )
      )
      const dDate = Math.floor(
        this.$moment().subtract(30, 'days').format('x') / 1000
      )
      console.log(dDate)
      await this.getBTCChartData(dDate, 'bitcoin')
    },
    methods: {
      async triggerFetchData() {
        await this.$store.dispatch('getCoinData')
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
        const today = Math.round(new Date().getTime() / 1000)
        const btcMarketData = await this.$axios.$get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${period}&to=${today}`
        )
        console.log(btcMarketData.prices)
        return btcMarketData.prices
      },
      async getETHChartData(period) {
        const today = Math.round(new Date().getTime() / 1000)
        const btcMarketData = await this.$axios.$get(
          `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${period}&to=${today}`
        )
        return btcMarketData.prices
      },
      async getLTCChartData(period) {
        const today = Math.round(new Date().getTime() / 1000)
        const btcMarketData = await this.$axios.$get(
          `https://api.coingecko.com/api/v3/coins/litecoin/market_chart/range?vs_currency=usd&from=${period}&to=${today}`
        )
        return btcMarketData.prices
      },
      async getDASHChartData(period) {
        const today = Math.round(new Date().getTime() / 1000)
        const btcMarketData = await this.$axios.$get(
          `https://api.coingecko.com/api/v3/coins/dash/market_chart/range?vs_currency=usd&from=${period}&to=${today}`
        )
        return btcMarketData.prices
      },
    },
  }
</script>
