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
          <nuxt-link to="/mart">
            <div class="imge">
              <img src="~/assets/img/purse.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Manage your wallets &amp; make transactions
            </p>
            <p class="higlight text-center">Make Transactions</p>
          </nuxt-link>
        </li>
        <li class="link-card">
          <nuxt-link to="/mart">
            <div class="imge">
              <img src="~/assets/img/bills.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Pay your bills for utilities &amp; services
            </p>
            <p class="higlight text-center">Pay Bills</p>
          </nuxt-link>
        </li>
        <li class="link-card">
          <nuxt-link to="/exchange">
            <div class="imge">
              <img src="~/assets/img/exchange.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Exchange your cryptocurrencies with ease
            </p>
            <p class="higlight text-center">Exchange</p>
          </nuxt-link>
        </li>
        <li class="link-card">
          <nuxt-link to="/support">
            <div class="imge">
              <img src="~/assets/img/supporting.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Get professional support &amp; quality customer care
            </p>
            <p class="higlight text-center">Support</p>
          </nuxt-link>
        </li>
      </ul>
      <div class="wallets--and--transactions">
        <div class="wallets">
          <h3 class="c-white">WALLETS</h3>
          <div class="table--holder">
            <a-skeleton :loading="loading" active :paragraph="{ rows: 12 }">
              <a-table
                :expand-row-by-click="true"
                :data-source="data"
                :pagination="{ hideOnSinglePage: true }"
                :row-key="(record) => record.className"
                @expand="onRowExpandChange"
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
                  key="data"
                  title="30 DAY TREND"
                  data-index="data"
                  class="relative table--trend"
                >
                  <template slot-scope="data">
                    <trend
                      :data="data.trend"
                      :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                      auto-draw
                      smooth
                    >
                    </trend>
                    <h3 v-if="!data.collapsed" class="table-expand-text">
                      Expand
                    </h3>
                    <h3 v-if="data.collapsed" class="table-expand-text">
                      Collapse
                    </h3>
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
                        spacingLeft: 0,
                        spacingRight: 0,
                        type: 'line',
                        width: 1600,
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
                          marker: {
                            enabled: false,
                          },
                          name: record.name,
                          data: record.chart,
                        },
                      ],
                    }"
                  />
                </p>
              </a-table>
            </a-skeleton>
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
                <th class="text-left"><span>TRANSACTION</span></th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction of transfers" :key="transaction.id">
                <td>
                  <strong>{{ +transaction.sent_amount }}</strong> tokens to
                  {{ transaction.receiver }}
                </td>
                <td>{{ new Date(transaction.created).toDateString() }}</td>
              </tr>
            </tbody>
          </table>
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
    layout: 'main',
    data() {
      return {
        width: 1000,
        baseUrl: process.env.baseUrl,
        interswitchBaseUrl: process.env.interswitchBaseUrl,
        loadingPurchases: false,
        loadingTransfers: false,
        nextPageUrl: '',
        previousPageUrl: '',
        transfersPagination: {
          page: 1,
          itemsPerPage: 10,
          totalRecords: 0,
        },
        transfers: [],
        purchases: [],
        filters: {
          minDate: '',
          maxDate: '',
          receiver: '',
          transactionStatus: '',
        },
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
        loading: 'dataLoading',
      }),
    },
    beforeMount() {
      this.getUserTransactions(this.baseUrl + 'transactions/transactions')
    },
    methods: {
      ...mapMutations({
        toggleChatBox: 'toggleChatBox',
      }),
      async getUserTransactions(url) {
        this.transfers = []
        this.loadingTransfers = true
        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }

        try {
          const userTransactionsResponse = await this.$axios.$get(url, {
            headers,
          })
          console.log('User transactions ==>', userTransactionsResponse)

          if (
            this.transfersPagination.itemsPerPage >
            userTransactionsResponse.count
          ) {
            this.transfersPagination.itemsPerPage =
              userTransactionsResponse.count
          }

          this.nextPageUrl = userTransactionsResponse.next
          this.previousPageUrl = userTransactionsResponse.previous

          this.transfersPagination.totalRecords = userTransactionsResponse.count
          this.transfers = userTransactionsResponse.results
          this.loadingTransfers = false
        } catch (e) {
          // this.$toast.error(e.response.data.detail)
          console.log(e.response.data.detail)
          this.loadingTransfers = false
        }
      },
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
      /*
      async triggerFetchData() {
        await this.$store.dispatch('getCoinData')
      }, */
      onChange(e) {
        console.log(`checked = ${e.target.value}`)
      },
      onRowExpandChange(val, record) {
        record.balance = 1
        this.$store.commit('chart/setChartDataCollapsed', record.currency)
      },
      toggleChatBox() {
        this.$store.commit('global/toggleChatBox')
      },
      toggleTokenModal() {
        this.$store.commit('global/toggleTokenModal')
      },
    },
    middleware: 'query',
  }
</script>

<style lang="scss"></style>
