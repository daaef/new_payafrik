<template>
  <section class="dash-body">
    <div class="exchange--content">
      <div class="w-100">
        <form class="w-100">
          <div class="flex flex-wrap flex-between flex-middle w-100">
            <div class="exchange">
              <span class="muted mb-20 d-block">Exchange</span>
              <div class="relative custom--select">
                <label
                  :class="[leftCrypClass, 'token_modal']"
                  for="currencyLeft"
                >
                  {{ leftCryptoCurrency }}
                </label>
                <div class="prefix-img">
                  <img :src="leftSelImg" alt="" />
                </div>
                <a-select
                  id="currencyLeft"
                  v-model="leftFromCurrency"
                  :class="leftDataClass"
                  style="width: 120px"
                  :show-arrow="false"
                  @select="handleLeftSelect"
                >
                  <a-select-option
                    v-for="myAsset in data"
                    :key="myAsset.key"
                    :value="myAsset.currency"
                  >
                    <span class="mr-12"
                      >$ {{ +myAsset.price | doubleForm }}</span
                    >
                    <span
                      >Balance: {{ +myAsset.balance | doubleForm }}
                      <span :class="myAsset.currClass">{{
                        myAsset.currency
                      }}</span></span
                    >
                  </a-select-option>
                </a-select>
              </div>
              <div class="line--input mt-64 mb-4">
                <currency-input
                  v-model="leftExchangeValue"
                  :class="[leftCrypClass, 'c-afk']"
                  :currency="null"
                  placeholder="0.00"
                  locale="ng"
                  :distraction-free="false"
                />
                <span class="wallet--name">{{ leftFromCurrency }}</span>
              </div>
              <div class="sending--amnt flex flex-between">
                <span class="amount c-white">
                  {{ leftExchangeValue1 | doubleForm }}
                </span>
                <span class="currency c-white">USD</span>
              </div>
            </div>
            <div class="exchange--btn">
              <a href="#" @click="flipCurrencies">
                <ExchangeBtn
                  :left-color="leftCrypClass"
                  :right-color="rightCrypClass"
                />
              </a>
            </div>
            <div class="recieve">
              <span class="muted mb-20 d-block">Recieve</span>
              <div class="relative custom--select">
                <label :class="[rightCrypClass, 'token_modal']" for="currency">
                  {{ rightCryptoCurrency }}
                </label>
                <div class="prefix-img">
                  <img :src="rightSelImg" alt="" />
                </div>
                <a-select
                  id="currency"
                  v-model="rightFromCurrency"
                  :class="rightDataClass"
                  style="width: 120px"
                  :show-arrow="false"
                  @select="handleRightSelect"
                >
                  <a-select-option
                    v-for="myAsset in data"
                    :key="myAsset.key"
                    :value="myAsset.currency"
                  >
                    <span class="mr-12">
                      $ {{ +myAsset.price | doubleForm }}
                    </span>
                    <span>
                      1
                      <span :class="leftCrypClass">
                        {{ leftFromCurrency }}
                      </span>
                      = {{ (leftPrice / +myAsset.price) | exchangeFilter }}
                      <span :class="myAsset.currClass">
                        {{ myAsset.currency }}
                      </span>
                    </span>
                  </a-select-option>
                </a-select>
              </div>
              <div class="line--input mt-64 mb-4">
                <currency-input
                  v-model="rightExchangeValue"
                  :class="[rightCrypClass, 'c-afk']"
                  :currency="null"
                  placeholder="0.00"
                  locale="ng"
                  :distraction-free="false"
                  disabled
                />
                <span class="wallet--name">{{ rightFromCurrency }}</span>
              </div>
              <div class="sending--amnt flex flex-between">
                <span class="amount c-white">{{
                  leftExchangeValue1 | doubleForm
                }}</span>
                <span class="currency c-white">USD</span>
              </div>
            </div>
          </div>
        </form>
        <div class="exchange--breakdown flex-middle">
          <div class="exchange-breakdown text-right">
            <div class="mb-16">
              <img :src="leftSelImg" height="50" alt="" />
            </div>
            <div>
              <span class="c-white mb-4 d-block">You are exchanging</span>
              <h2 :class="leftCrypClass">
                {{ leftExchangeValue | doubleForm }} {{ leftFromCurrency }}
              </h2>
              <span class="small-text c-white"
                >${{ leftExchangeValue1 | doubleForm }}</span
              >
            </div>
          </div>
          <div class="arrow--breakdown">
            <img src="~/assets/img/right.png" alt="" />
          </div>
          <div class="recieve-breakdown text-left">
            <div class="mb-16">
              <img :src="rightSelImg" height="50" alt="" />
            </div>
            <div>
              <span class="c-white mb-4 d-block">You will receive</span>
              <h2 :class="rightCrypClass">
                {{ rightExchangeValue | doubleForm }} {{ rightFromCurrency }}
              </h2>
              <span class="small-text c-white"
                >${{ leftExchangeValue1 | doubleForm }}</span
              >
            </div>
          </div>
        </div>

        <div class="text-center mt-20 sub--btn--holder">
          <div class="sub-button mt-20">
            <button class="w-100" :disabled="exchanging" @click="exchange">
              <span v-if="exchanging">EXCHANGING</span>
              <span v-else>EXCHANGE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { CurrencyDirective } from 'vue-currency-input'
  import numeral from 'numeral'
  import ExchangeBtn from '~/components/exchangeBtn'

  export default {
    components: { ExchangeBtn },
    directives: {
      currency: CurrencyDirective,
    },
    data() {
      return {
        exchanging: false,
        leftSide: '',
        rightSide: '',
        leftSelImg:
          'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        leftCryptoCurrency: 'Bitcoin',
        leftFromCurrency: 'BTC',
        leftDataClass: 'btc_chart',
        leftCrypClass: 'btc-color',
        leftExchangeValue: 1,
        leftExchangeValue1: 1,
        rightSelImg:
          'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        rightCryptoCurrency: 'Bitcoin',
        rightExchangeValue: 1,
        rightExchangeValue1: 1,
        rightFromCurrency: 'BTC',
        rightDataClass: 'btc_chart',
        rightCrypClass: 'btc-color',
        calculatedValue: '1',
        afkPrice: 1,
        leftPrice: 1,
        rightPrice: 1,
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      ...mapGetters({
        countryCodes: 'countryCodes',
        btcPrice: 'chart/btcPrice',
        ethPrice: 'chart/ethPrice',
        ltcPrice: 'chart/ltcPrice',
        dashPrice: 'chart/dashPrice',
        data: 'chart/chartData',
      }),
    },
    watch: {
      // whenever question changes, this function will run
      leftExchangeValue(val) {
        this.leftExchangeValue1 = val * this.leftPrice
        this.rightExchangeValue = val * (this.leftPrice / this.rightPrice)
      },
      // whenever question changes, this function will run
      rightExchangeValue(val) {
        this.rightExchangeValue1 = val * this.rightPrice
      },
    },
    mounted() {
      this.leftExchangeValue1 = this.leftExchangeValue1 * this.leftPrice
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 1500)
    },
    methods: {
      blurredRightExchange() {
        this.leftExchangeValue =
          this.rightExchangeValue * (this.rightPrice / this.leftPrice)
      },
      calculateConvertion(val) {
        return numeral(val).format('0,0.00')
      },
      async exchange() {
        this.exchanging = true
        const payload = {
          amount: this.leftExchangeValue,
          from_currency: this.leftFromCurrency,
          to_currency: this.rightFromCurrency,
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }

        try {
          const response = await this.$axios.$post(
            this.baseUrl + 'exchange/barter/swap/',
            payload,
            { headers }
          )
          this.exchanging = false
          console.log(response)
          this.$notification.success({
            key: 'updatable',
            message: 'Success!',
            description: response.msg,
            duration: 0,
            class: 'success',
          })
        } catch (e) {
          console.log(e.response)
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            description: e.response.data.detail,
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          this.exchanging = false
        }
      },
      flipCurrencies() {
        ;[
          this.leftDataClass,
          this.rightDataClass,
          this.leftFromCurrency,
          this.rightFromCurrency,
          this.leftPrice,
          this.rightPrice,
        ] = [
          this.rightDataClass,
          this.leftDataClass,
          this.rightFromCurrency,
          this.leftFromCurrency,
          this.rightPrice,
          this.leftPrice,
        ]
        this.handleLeftSelect(this.leftFromCurrency)
        this.handleRightSelect(this.rightFromCurrency)
        this.leftExchangeValue1 = this.leftExchangeValue * this.leftPrice
      },
      handleLeftSelect(val) {
        const current = this.data.filter((datum) => {
          return datum.currency === val
        })
        this.leftCryptoCurrency = current[0].asset_name.name
        this.leftSelImg = current[0].asset_name.img
        this.leftCrypClass = current[0].currClass
        this.leftDataClass = current[0].className
        this.leftPrice = current[0].price
        this.leftExchangeValue1 = this.leftExchangeValue * this.leftPrice
        this.rightExchangeValue =
          this.leftExchangeValue * (this.leftPrice / this.rightPrice)
        console.log('changing leftExcangevalue')
      },
      handleRightSelect(val) {
        const current = this.data.filter((datum) => {
          return datum.currency === val
        })
        this.rightCryptoCurrency = current[0].asset_name.name
        this.rightSelImg = current[0].asset_name.img
        this.rightCrypClass = current[0].currClass
        this.rightDataClass = current[0].className
        this.rightPrice = current[0].price
        this.rightExchangeValue =
          this.leftExchangeValue * (this.leftPrice / this.rightPrice)
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
    },
    layout: 'main',
    middleware: 'query',
  }
</script>
