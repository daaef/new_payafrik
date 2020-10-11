export default function ({ store, redirect }) {
  console.log('state is', store)
  store.commit('setDataLoading', true)
  console.log('running getCoinData from middleware')
  store.dispatch('chart/getCoinData')
  console.log('running getPriceData from middleware')
  store.dispatch('chart/getBitcoinData', store.getters['chart/hourPeriod'])
  store.dispatch('chart/getEthPriceData', store.getters['chart/hourPeriod'])
  store.dispatch('chart/getLtcPriceData', store.getters['chart/hourPeriod'])
  store.dispatch('chart/getDashPriceData', store.getters['chart/hourPeriod'])
  setTimeout(() => {
    store.commit('setDataLoading', false)
  }, 1000)
}
