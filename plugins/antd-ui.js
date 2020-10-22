import Vue from 'vue'
import Trend from 'vuetrend'
import Antd from 'ant-design-vue/lib'
import VueCurrencyInput from 'vue-currency-input'

Vue.use(VueCurrencyInput)
Vue.use(Antd)
console.log(Antd)
const numeral = require('numeral')

Vue.filter('formatNumber', function (value) {
  return numeral(value).format('0,0') // displaying other groupings/separators is possible, look at the docs
})

Vue.filter('formatNumberLong', function (value) {
  return numeral(value).format('0,0.000') // displaying other groupings/separators is possible, look at the docs
})

Vue.filter('doubleForm', function (value) {
  return numeral(value).format('0,0.00') // displaying other groupings/separators is possible, look at the docs
})

Vue.filter('exchangeFilter', function (value) {
  return numeral(value).format('0,0.0000000') // displaying other groupings/separators is possible, look at the docs
})
Vue.use(Trend)
