export const state = () => ({
  myUserDetails: {},
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
  chartData(state) {
    return [
      {
        className: 'afk_chart',
        currency: 'AFK',
        key: 1000,
        currClass: 'afk-color',
        asset_name: {
          name: 'Africoin',
          img:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADd0lEQVRYhcWYWUhUYRTHf7O0mEtWZotbRhvUQwS20EoELRMGvVRmSbRZYEREDxFtVg/1EkVklD20TEQUUlY+RLQQBFIRWoilTWKmlW1jLmUa5/bdQZ3l3huT/mHgzr3n+5/f3Dvfd75zbYlj72JB8cAiYDYwARgBxKjh3wEPUArcB4qAWrPWZkFmAjuABYDTpPdv4DZwGHhoFGw3uD4SKAQeAIstQIgcaswD5THyX0FWAM8Al4XkweRSXhlWQXYD7g7PPxwSr4vK2xTITmBfGAG6Srx3GYHI4zj4HyF05apcAUFSgVPdAKHrlMrpB3IciO5GkGiVsxPIjDDNDqtyqTXKB7KjByB0bddBZNle2IMgUjLineog4Ip5aO8YlqYPpanpd0gnu93Gd28rG7eU8rKswSqIxuBUBSygzl+qYcmiIcQN6m3odrWglrLyH1YhdM2xqyoaUGXlDeSdrTJ0qfQ0cvZ8NW1t7cydPYhpk2Otgoy3q1IeUO3tcOnK+5C3W2IuXK6huqaZ/jFO7XFmr022CpJqN1o7PtX/JP9ctZYwkIqffOWc+512ZXVGAgnD+jJrxkBc8wdbAYkWEJtR1LXrtTwu/up3vrW1nZNnqmhpaWP0qEgylyVo550OG2syE4mKMr9rEBCvUZAkPHK0kqbmzrOnoLCOO/fqtVmzPiuJ4cP6+K5NSYtl1fLh2Ax/piavgLwxE1n89BsFNz74vn/89JMTp99qx9OnDiDdFe83ZsOaJJISI8zYewTkhSlm4Fieh7oPLdpxXn4VrysaiejrICsjgch+Dr94mfY5G1PMWJcKyD2zINXvmrVZVP76B4VFf+/O/Hlx2ieYliyOJ21SfyPr+46YuKz3wFYT+1dNryoaefT4CxWVjdovPnxgXMgFr5fTTkpyBM9LvNR//hUopBXYJMnr1NbflGQ6l7z4+//evC6ZsaMjDcdMTYtlW05qsMuSu05vJ2aq3XZPaJa0G/rjkL7jZg9A3NJ7no7/iy1m1pQwSnLl6HYdQSqB7G4EyVY5/UBE7mB9R5i1R/VNPgWasrkq8H9C7O96MtjaIYErAcvbrRBqUJ5+EKFAULduYphm0y3l5Q4WYLSaVqiOXraT0tGH3rx2VpsaI2OlbRCvoDK7YZDFTj5SYsVUf1EjFU0vJN8AKcfyokZi5d2IlA9jAX8AjTrqj3odLhAAAAAASUVORK5CYII=',
        },
        price: '1.00',
        change: +0.3,
        market_cap: '3.21B',
        data: {
          trend: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
          collapsed: state.AFK,
        },
        balance: state.myUserDetails.afk_balance,
        chart: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
        query: 'chart/getBitcoinData',
      },
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
}
