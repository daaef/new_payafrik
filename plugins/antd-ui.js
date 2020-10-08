import Vue from 'vue'
import Trend from 'vuetrend'
import { Input, Icon, Select, Table, Radio } from 'ant-design-vue/lib'

Vue.use(Input)
Vue.use(Select)
Vue.use(Icon)
Vue.use(Table)
Vue.use(Radio)

const numeral = require('numeral')

Vue.filter('formatNumber', function (value) {
  return numeral(value).format('0,0') // displaying other groupings/separators is possible, look at the docs
})

Vue.filter('formatNumberLong', function (value) {
  return numeral(value).format('0.00000') // displaying other groupings/separators is possible, look at the docs
})
Vue.use(Trend)
