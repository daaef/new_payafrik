<template>
  <section class="dash-body">
    <div class="exchange--content">
      <div class="w-100">
        <form class="w-100">
          <div class="flex flex-between flex-middle w-100">
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
    layout: 'main',
    middleware: 'query',
    data() {
      return {
        exchanging: false,
        leftSide: '',
        rightSide: '',
        leftSelImg:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADd0lEQVRYhcWYWUhUYRTHf7O0mEtWZotbRhvUQwS20EoELRMGvVRmSbRZYEREDxFtVg/1EkVklD20TEQUUlY+RLQQBFIRWoilTWKmlW1jLmUa5/bdQZ3l3huT/mHgzr3n+5/f3Dvfd75zbYlj72JB8cAiYDYwARgBxKjh3wEPUArcB4qAWrPWZkFmAjuABYDTpPdv4DZwGHhoFGw3uD4SKAQeAIstQIgcaswD5THyX0FWAM8Al4XkweRSXhlWQXYD7g7PPxwSr4vK2xTITmBfGAG6Srx3GYHI4zj4HyF05apcAUFSgVPdAKHrlMrpB3IciO5GkGiVsxPIjDDNDqtyqTXKB7KjByB0bddBZNle2IMgUjLineog4Ip5aO8YlqYPpanpd0gnu93Gd28rG7eU8rKswSqIxuBUBSygzl+qYcmiIcQN6m3odrWglrLyH1YhdM2xqyoaUGXlDeSdrTJ0qfQ0cvZ8NW1t7cydPYhpk2Otgoy3q1IeUO3tcOnK+5C3W2IuXK6huqaZ/jFO7XFmr022CpJqN1o7PtX/JP9ctZYwkIqffOWc+512ZXVGAgnD+jJrxkBc8wdbAYkWEJtR1LXrtTwu/up3vrW1nZNnqmhpaWP0qEgylyVo550OG2syE4mKMr9rEBCvUZAkPHK0kqbmzrOnoLCOO/fqtVmzPiuJ4cP6+K5NSYtl1fLh2Ax/piavgLwxE1n89BsFNz74vn/89JMTp99qx9OnDiDdFe83ZsOaJJISI8zYewTkhSlm4Fieh7oPLdpxXn4VrysaiejrICsjgch+Dr94mfY5G1PMWJcKyD2zINXvmrVZVP76B4VFf+/O/Hlx2ieYliyOJ21SfyPr+46YuKz3wFYT+1dNryoaefT4CxWVjdovPnxgXMgFr5fTTkpyBM9LvNR//hUopBXYJMnr1NbflGQ6l7z4+//evC6ZsaMjDcdMTYtlW05qsMuSu05vJ2aq3XZPaJa0G/rjkL7jZg9A3NJ7no7/iy1m1pQwSnLl6HYdQSqB7G4EyVY5/UBE7mB9R5i1R/VNPgWasrkq8H9C7O96MtjaIYErAcvbrRBqUJ5+EKFAULduYphm0y3l5Q4WYLSaVqiOXraT0tGH3rx2VpsaI2OlbRCvoDK7YZDFTj5SYsVUf1EjFU0vJN8AKcfyokZi5d2IlA9jAX8AjTrqj3odLhAAAAAASUVORK5CYII=',
        leftCryptoCurrency: 'Africoin',
        leftFromCurrency: 'AFK',
        leftDataClass: 'afk_chart',
        leftCrypClass: 'afk-color',
        leftExchangeValue: 1,
        leftExchangeValue1: 1,
        rightSelImg:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADd0lEQVRYhcWYWUhUYRTHf7O0mEtWZotbRhvUQwS20EoELRMGvVRmSbRZYEREDxFtVg/1EkVklD20TEQUUlY+RLQQBFIRWoilTWKmlW1jLmUa5/bdQZ3l3huT/mHgzr3n+5/f3Dvfd75zbYlj72JB8cAiYDYwARgBxKjh3wEPUArcB4qAWrPWZkFmAjuABYDTpPdv4DZwGHhoFGw3uD4SKAQeAIstQIgcaswD5THyX0FWAM8Al4XkweRSXhlWQXYD7g7PPxwSr4vK2xTITmBfGAG6Srx3GYHI4zj4HyF05apcAUFSgVPdAKHrlMrpB3IciO5GkGiVsxPIjDDNDqtyqTXKB7KjByB0bddBZNle2IMgUjLineog4Ip5aO8YlqYPpanpd0gnu93Gd28rG7eU8rKswSqIxuBUBSygzl+qYcmiIcQN6m3odrWglrLyH1YhdM2xqyoaUGXlDeSdrTJ0qfQ0cvZ8NW1t7cydPYhpk2Otgoy3q1IeUO3tcOnK+5C3W2IuXK6huqaZ/jFO7XFmr022CpJqN1o7PtX/JP9ctZYwkIqffOWc+512ZXVGAgnD+jJrxkBc8wdbAYkWEJtR1LXrtTwu/up3vrW1nZNnqmhpaWP0qEgylyVo550OG2syE4mKMr9rEBCvUZAkPHK0kqbmzrOnoLCOO/fqtVmzPiuJ4cP6+K5NSYtl1fLh2Ax/piavgLwxE1n89BsFNz74vn/89JMTp99qx9OnDiDdFe83ZsOaJJISI8zYewTkhSlm4Fieh7oPLdpxXn4VrysaiejrICsjgch+Dr94mfY5G1PMWJcKyD2zINXvmrVZVP76B4VFf+/O/Hlx2ieYliyOJ21SfyPr+46YuKz3wFYT+1dNryoaefT4CxWVjdovPnxgXMgFr5fTTkpyBM9LvNR//hUopBXYJMnr1NbflGQ6l7z4+//evC6ZsaMjDcdMTYtlW05qsMuSu05vJ2aq3XZPaJa0G/rjkL7jZg9A3NJ7no7/iy1m1pQwSnLl6HYdQSqB7G4EyVY5/UBE7mB9R5i1R/VNPgWasrkq8H9C7O96MtjaIYErAcvbrRBqUJ5+EKFAULduYphm0y3l5Q4WYLSaVqiOXraT0tGH3rx2VpsaI2OlbRCvoDK7YZDFTj5SYsVUf1EjFU0vJN8AKcfyokZi5d2IlA9jAX8AjTrqj3odLhAAAAAASUVORK5CYII=',
        rightCryptoCurrency: 'Africoin',
        rightExchangeValue: 1,
        rightExchangeValue1: 1,
        rightFromCurrency: 'AFK',
        rightDataClass: 'afk_chart',
        rightCrypClass: 'afk-color',
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
    },
    methods: {
      blurredRightExchange() {
        this.leftExchangeValue =
          this.rightExchangeValue * (this.rightPrice / this.leftPrice)
      },
      toggleChatBox() {
        this.$store.commit('global/toggleChatBox')
      },
      calculateConvertion(val) {
        return numeral(val).format('0,0.00')
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
      toggleTokenModal() {
        this.$store.commit('global/toggleTokenModal')
      },
      ...mapMutations({
        toggleChatBox: 'toggleChatBox',
      }),
    },
  }
</script>
