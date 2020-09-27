import Vue from 'vue'
import Antd from 'ant-design-vue/lib'
import Trend from 'vuetrend'

const numeral = require('numeral')

Vue.filter('formatNumber', function (value) {
  return numeral(value).format('0,0') // displaying other groupings/separators is possible, look at the docs
})

Vue.filter('formatNumberLong', function (value) {
  return numeral(value).format('0.00000') // displaying other groupings/separators is possible, look at the docs
})
Vue.use(Trend)
Vue.use(Antd)
