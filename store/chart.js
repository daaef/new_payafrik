export const state = () => ({
  myUserDetails: {},
  banks: [],
  btcPrices: [],
  ethPrices: [],
  ltcPrices: [],
  dashPrices: [],
  daysInterval: 30,
  priceCurrency: 'USD',
  bitcoinCurrency: 'BTC',
  ethereumCurrency: 'ETH',
  litecoinCurrency: 'LTC',
  dashcoinCurrency: 'DASH',
  hourPeriod: 'hour',
  monthPeriod: 'month',
  yearPeriod: 'year',
  dayPeriod: 'day',
  weekPeriod: 'week',
  allPeriod: 'all',
  btcData: {},
  ethData: {},
  litecoinData: {},
  dashData: {},
  btcChartData: [],
  ethChartData: [],
  litecoinChartData: [],
  dashChartData: [],
  AFK: false,
  BTC: false,
  ETH: false,
  LTC: false,
  DASH: false,
})
export const mutations = {
  setChartDataCollapsed(state, payload) {
    state[payload] = !state[payload]
    console.log(`set ${payload} done`)
  },
  setUser(state, payload) {
    state.myUserDetails = payload
  },
  setDaysInterval(state, payload) {
    state.daysInterval = payload
  },
  setBtcPrices(state, payload) {
    state.btcPrices = payload
  },
  setEthPrices(state, payload) {
    state.ethPrices = payload
  },
  setLtcPrices(state, payload) {
    state.ltcPrices = payload
  },
  setDashPrices(state, payload) {
    state.dashPrices = payload
  },
  loadBTCData(state, data) {
    // console.log(data)
    state.btcData = data
  },
  loadEthData(state, data) {
    // console.log(data)
    state.ethData = data
  },
  loadLitecoinData(state, data) {
    // console.log(data)
    state.litecoinData = data
  },
  loadDashData(state, data) {
    // console.log(data)
    state.dashData = data
  },
  loadBTCChartData(state, data) {
    // console.log('btc chart data', data)
    state.btcChartData = data
  },
  loadEthChartData(state, data) {
    // console.log('eth chart data', data)
    state.ethChartData = data
  },
  loadLitecoinChartData(state, data) {
    // console.log('lite coin chart data', data)
    state.litecoinChartData = data
  },
  loadDashChartData(state, data) {
    // console.log('dash chart data', data)
    state.dashChartData = data
  },
  setBanks(state, bank) {
    state.banks = bank
  },
}
export const actions = {
  setUser({ rootState, commit }) {
    commit('setUser', rootState.auth.user)
  },
  async getCoinData({ commit, dispatch, state }) {
    dispatch('setUser')
    const coinMarketData = await this.$axios.$get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h'
    )
    const btcSparkline = []
    for (let i = 0; i < 50; i++) {
      btcSparkline.push(coinMarketData[0].sparkline_in_7d.price[i])
    }
    const ethSparkline = []
    for (let i = 0; i < 50; i++) {
      ethSparkline.push(
        coinMarketData.filter((mrkData) => {
          return mrkData.id === 'ethereum'
        })[0].sparkline_in_7d.price[i]
      )
    }
    const litecoinSparkline = []
    for (let i = 0; i < 50; i++) {
      litecoinSparkline.push(
        coinMarketData.filter((mrkData) => {
          return mrkData.id === 'litecoin'
        })[0].sparkline_in_7d.price[i]
      )
    }
    const dashSparkline = []
    for (let i = 0; i < 50; i++) {
      dashSparkline.push(
        coinMarketData.filter((mrkData) => {
          return mrkData.id === 'dash'
        })[0].sparkline_in_7d.price[i]
      )
    }
    commit('loadBTCChartData', btcSparkline)
    commit('loadEthChartData', ethSparkline)
    commit('loadLitecoinChartData', litecoinSparkline)
    commit('loadDashChartData', dashSparkline)

    commit('loadBTCData', coinMarketData[0])
    commit(
      'loadEthData',
      coinMarketData.filter((mrkData) => {
        return mrkData.id === 'ethereum'
      })[0]
    )
    commit(
      'loadLitecoinData',
      coinMarketData.filter((mrkData) => {
        return mrkData.id === 'litecoin'
      })[0]
    )
    commit(
      'loadDashData',
      coinMarketData.filter((mrkData) => {
        return mrkData.id === 'dash'
      })[0]
    )
  },
  async getBitcoinData({ state, commit }, period) {
    const currencyData = await this.$axios.$get(
      `https://www.coinbase.com/api/v2/prices/${state.bitcoinCurrency}-${state.priceCurrency}/historic?period=${period}`
    )
    const btcArray = []
    currencyData.data.prices.forEach((btc) => {
      btcArray.push([new Date(btc.time).toDateString(), +btc.price])
    })
    commit('setBtcPrices', btcArray)
  },
  async getEthPriceData({ state, commit }, period) {
    const currencyData = await this.$axios.$get(
      `https://www.coinbase.com/api/v2/prices/${state.ethereumCurrency}-${state.priceCurrency}/historic?period=${period}`
    )
    const btcArray = []
    currencyData.data.prices.forEach((btc) => {
      btcArray.push([new Date(btc.time).toDateString(), +btc.price])
    })
    commit('setEthPrices', btcArray)
  },
  async getLtcPriceData({ state, commit }, period) {
    const currencyData = await this.$axios.$get(
      `https://www.coinbase.com/api/v2/prices/${state.litecoinCurrency}-${state.priceCurrency}/historic?period=${period}`
    )
    const btcArray = []
    currencyData.data.prices.forEach((btc) => {
      btcArray.push([new Date(btc.time).toDateString(), +btc.price])
    })
    commit('setLtcPrices', btcArray)
  },
  async getDashPriceData({ state, commit }, period) {
    const currencyData = await this.$axios.$get(
      `https://www.coinbase.com/api/v2/prices/${state.dashcoinCurrency}-${state.priceCurrency}/historic?period=${period}`
    )
    const btcArray = []
    currencyData.data.prices.forEach((btc) => {
      btcArray.push([new Date(btc.time).toDateString(), +btc.price])
    })
    commit('setDashPrices', btcArray)
  },
}
export const getters = {
  chartData(state, commit, rootState) {
    return [
      {
        key: 1,
        currClass: 'btc-color',
        className: 'btc_chart',
        currency: 'BTC',
        asset_name: {
          name: state.btcData.name,
          img: state.btcData.image,
        },
        price: state.btcData.current_price,
        change: state.btcData.price_change_percentage_24h,
        market_cap: state.btcData.market_cap,
        data: {
          trend: state.btcChartData,
          collapsed: state.BTC,
        },
        balance: state.myUserDetails.btc_balance,
        chart: state.btcPrices,
        query: 'chart/getBitcoinData',
        wallet: rootState.auth.user.btc_wallet,
      },
      {
        key: 2,
        currClass: 'eth-color',
        className: 'eth_chart',
        currency: 'ETH',
        asset_name: {
          name: state.ethData.name,
          img: state.ethData.image,
        },
        data: {
          trend: state.ethChartData,
          collapsed: state.ETH,
        },
        price: state.ethData.current_price,
        change: state.ethData.price_change_percentage_24h,
        market_cap: state.ethData.market_cap,
        balance: state.myUserDetails.eth_balance,
        chart: state.ethPrices,
        query: 'chart/getEthPriceData',
        wallet: rootState.auth.user.eth_wallet,
      },
      {
        key: 3,
        currClass: 'ltc-color',
        className: 'ltc_chart',
        currency: 'LTC',
        asset_name: {
          name: state.litecoinData.name,
          img: state.litecoinData.image,
        },
        price: state.litecoinData.current_price,
        change: state.litecoinData.price_change_percentage_24h,
        market_cap: state.litecoinData.market_cap,
        data: {
          trend: state.litecoinChartData,
          collapsed: state.LTC,
        },
        balance: 0.0,
        chart: state.ltcPrices,
        query: 'chart/getLtcPriceData',
        wallet: rootState.auth.user.dash_wallet,
      },
      {
        key: 4,
        currClass: 'dash-color',
        className: 'dash_chart',
        currency: 'DASH',
        asset_name: {
          name: state.dashData.name,
          img: state.dashData.image,
        },
        price: state.dashData.current_price,
        change: state.dashData.price_change_percentage_24h,
        market_cap: state.dashData.market_cap,
        data: {
          trend: state.dashChartData,
          collapsed: state.DASH,
        },
        balance: 0.0,
        chart: state.dashPrices,
        query: 'chart/getDashPriceData',
        wallet: rootState.auth.user.litecoin_wallet,
      },
    ]
  },
  btcPrices(state) {
    return state.btcPrices
  },
  ethPrices(state) {
    return state.ethPrices
  },
  ltcPrices(state) {
    return state.ltcPrices
  },
  dashPrices(state) {
    return state.dashPrices
  },
  daysInterval(state) {
    return state.daysInterval
  },
  priceCurrency(state) {
    return state.priceCurrency
  },
  bitcoinCurrency(state) {
    return state.bitcoinCurrency
  },
  ethereumCurrency(state) {
    return state.ethereumCurrency
  },
  litecoinCurrency(state) {
    return state.litecoinCurrency
  },
  dashcoinCurrency(state) {
    return state.dashcoinCurrency
  },
  hourPeriod(state) {
    return state.hourPeriod
  },
  monthPeriod(state) {
    return state.monthPeriod
  },
  yearPeriod(state) {
    return state.yearPeriod
  },
  dayPeriod(state) {
    return state.dayPeriod
  },
  weekPeriod(state) {
    return state.weekPeriod
  },
  allPeriod(state) {
    return state.allPeriod
  },
  btcData(state) {
    return state.btcData
  },
  ethData(state) {
    return state.ethData
  },
  litecoinData(state) {
    return state.litecoinData
  },
  dashData(state) {
    return state.dashData
  },
  btcChartData(state) {
    return state.btcChartData
  },
  ethChartData(state) {
    return state.ethChartData
  },
  litecoinChartData(state) {
    return state.litecoinChartData
  },
  dashChartData(state) {
    return state.dashChartData
  },
  btcPrice(state) {
    return state.btcData.current_price
  },
  ethPrice(state) {
    return state.ethData.current_price
  },
  ltcPrice(state) {
    return state.litecoinData.current_price
  },
  dashPrice(state) {
    return state.dashData.current_price
  },
  banks(state) {
    return state.banks
  },
}
