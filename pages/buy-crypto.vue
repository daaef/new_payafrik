<template>
  <div class="dash-body">
    <div class="container">
      <div class="row">
        <div class="col-md-10 mr-auto align--middle ml-auto">
          <div class="w-100">
            <form>
              <div class="exchange">
                <span class="muted mt-5 mb-2 d-block"
                  >Select currency to buy</span
                >

                <div class="relative custom--select">
                  <label :class="[crypClass, 'token_modal']" for="currency">
                    {{ cryptoCurrency }}
                  </label>
                  <div class="prefix-img">
                    <img :src="selImg" alt="" />
                  </div>
                  <a-select
                    id="currency"
                    v-model="fromCurrency"
                    :class="dataClass"
                    style="width: 120px"
                    :show-arrow="false"
                    @change="handleChange"
                    @select="handleSelect"
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
                <div class="line--input mt-5 mb-4">
                  <span class="muted mb-2 d-block">How much do you need?</span>
                  <input
                    v-model="exchangeAmount"
                    type="number"
                    :class="crypClass"
                    placeholder="0.00"
                  />
                  <span class="wallet--name">{{ fromCurrency }}</span>
                </div>

                <div class="sending--amnt flex flex-between">
                  <span :class="crypClass">{{
                    (exchangeAmount * exchangeRate) | formatNumber
                  }}</span>
                  <span class="currency c-white">USD</span>
                </div>
                <!-- <span class="muted mb-20 d-block"
                >Enter the amount of the selected currency you are exchanging
                above and press enter</span
              > -->
              </div>
            </form>

            <div class="exchange--breakdown w-100">
              <div class="exchange-breakdown text-right">
                <div class="mb-16">
                  <img :src="selImg" height="50" alt="" />
                </div>
                <div>
                  <span class="c-white mb-4 d-block">You are buying</span>
                  <h3 :class="crypClass">
                    {{ exchangeAmount | formatNumber }} {{ fromCurrency }}
                  </h3>
                  <!-- <span class="small-text c-white">$0.00</span> -->
                  <span class="small-text c-white"
                    >${{ (exchangeAmount * exchangeRate) | formatNumber }}</span
                  >
                </div>
              </div>
              <div class="arrow--breakdown">
                <img src="~/assets/img/right.png" alt="" />
              </div>
              <div class="recieve-breakdown text-left">
                <div class="mb-16">
                  <img
                    src="~/assets/img/side-wallet.png"
                    height="50"
                    style="width: 35px; opacity: 0.5"
                    alt=""
                  />
                </div>
                <div>
                  <span class="c-white mb-4 d-block">You will pay</span>
                  <h3 :class="crypClass">₦{{ amountToPay | formatNumber }}</h3>
                </div>
              </div>
            </div>
            <div class="cash--crypto--btns text-center mt-5">
              <div>
                <div class="sub-button">
                  <button
                    v-if="!processing"
                    type="submit"
                    @click="generateTransaction"
                  >
                    BUY WITH CASH
                  </button>
                  <button v-if="processing" type="submit">
                    <a-spin />
                    BUYING
                  </button>
                </div>

                <div class="sub-button">
                  <button target="_blank" @click="buyWithToken = true">
                    <!-- href="https://commerce.coinbase.com/checkout/0bb96b95-c8bc-42bd-b1b7-a67a48f4357b" -->
                    BUY WITH TOKENS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-modal
      title="Buy Crypto"
      :visible="buyWIthCash"
      centered
      @cancel="buyWIthCash = false"
    >
      <p>
        You are about to pay for
        <span class="warn"
          >{{ exchangeAmount | doubleForm }} {{ toCurrency }}</span
        >.
      </p>

      <label>Amount due today:</label>
      <h2 class="c-btc">{{ toCurrency }}{{ amountToPay | doubleForm }}</h2>

      <label>Transaction Reference:</label>
      <p>{{ transactionRef }}</p>
      <template slot="footer">
        <div class="text-right sub--btn--holder">
          <div class="sub-button">
            <form
              name="form1"
              action="https://webpay.interswitchng.com/collections/w/pay"
              method="post"
            >
              <input v-model="productId" name="product_id" type="hidden" />
              <input v-model="paymentItemId" name="pay_item_id" type="hidden" />
              <input v-model="amountInKobo" name="amount" type="hidden" />
              <input v-model="currency" name="currency" type="hidden" />
              <input
                v-model="redirectUrl"
                name="site_redirect_url"
                type="hidden"
              />
              <input v-model="transactionRef" name="txn_ref" type="hidden" />
              <input v-model="customerId" name="cust_id" type="hidden" />
              <input v-model="customerName" name="cust_name" type="hidden" />
              <input v-model="transactionHash" name="hash" type="hidden" />
              <button class="w-100" type="submit">
                <img src="~/assets/img/interswitch_icon.png" class="mr-2" />PAY
                WITH INTERSWICH
              </button>
            </form>
          </div>
        </div>
      </template>
    </a-modal>

    <a-modal
      :title="`Buy ${fromCurrency}`"
      :visible="buyWithToken"
      centered
      @cancel="buyWithToken = false"
    >
      <p>
        You are about to pay for
        <span class="warn"> {{ exchangeAmount }} {{ fromCurrency }} </span>
        using Afritoken. Please click on the "PAY NOW" button to complete the
        transaction.
      </p>
      <template slot="footer">
        <div class="text-right sub--btn--holder">
          <div class="sub-button">
            <button
              v-if="!purchasingWithTokens"
              class="w-100"
              type="submit"
              @click="purchaseWithTokens()"
            >
              PAY NOW
            </button>
            <button v-if="purchasingWithTokens" class="w-100" type="submit">
              <a-spin />
            </button>
          </div>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  const sha512 = require('js-sha512')

  export default {
    data() {
      return {
        baseUrl: process.env.baseUrl,
        interswitchBaseUrl: process.env.interswitchBaseUrl,
        // toCurrency: 'AFK',
        exchangeRate: 1,
        selImg:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADd0lEQVRYhcWYWUhUYRTHf7O0mEtWZotbRhvUQwS20EoELRMGvVRmSbRZYEREDxFtVg/1EkVklD20TEQUUlY+RLQQBFIRWoilTWKmlW1jLmUa5/bdQZ3l3huT/mHgzr3n+5/f3Dvfd75zbYlj72JB8cAiYDYwARgBxKjh3wEPUArcB4qAWrPWZkFmAjuABYDTpPdv4DZwGHhoFGw3uD4SKAQeAIstQIgcaswD5THyX0FWAM8Al4XkweRSXhlWQXYD7g7PPxwSr4vK2xTITmBfGAG6Srx3GYHI4zj4HyF05apcAUFSgVPdAKHrlMrpB3IciO5GkGiVsxPIjDDNDqtyqTXKB7KjByB0bddBZNle2IMgUjLineog4Ip5aO8YlqYPpanpd0gnu93Gd28rG7eU8rKswSqIxuBUBSygzl+qYcmiIcQN6m3odrWglrLyH1YhdM2xqyoaUGXlDeSdrTJ0qfQ0cvZ8NW1t7cydPYhpk2Otgoy3q1IeUO3tcOnK+5C3W2IuXK6huqaZ/jFO7XFmr022CpJqN1o7PtX/JP9ctZYwkIqffOWc+512ZXVGAgnD+jJrxkBc8wdbAYkWEJtR1LXrtTwu/up3vrW1nZNnqmhpaWP0qEgylyVo550OG2syE4mKMr9rEBCvUZAkPHK0kqbmzrOnoLCOO/fqtVmzPiuJ4cP6+K5NSYtl1fLh2Ax/piavgLwxE1n89BsFNz74vn/89JMTp99qx9OnDiDdFe83ZsOaJJISI8zYewTkhSlm4Fieh7oPLdpxXn4VrysaiejrICsjgch+Dr94mfY5G1PMWJcKyD2zINXvmrVZVP76B4VFf+/O/Hlx2ieYliyOJ21SfyPr+46YuKz3wFYT+1dNryoaefT4CxWVjdovPnxgXMgFr5fTTkpyBM9LvNR//hUopBXYJMnr1NbflGQ6l7z4+//evC6ZsaMjDcdMTYtlW05qsMuSu05vJ2aq3XZPaJa0G/rjkL7jZg9A3NJ7no7/iy1m1pQwSnLl6HYdQSqB7G4EyVY5/UBE7mB9R5i1R/VNPgWasrkq8H9C7O96MtjaIYErAcvbrRBqUJ5+EKFAULduYphm0y3l5Q4WYLSaVqiOXraT0tGH3rx2VpsaI2OlbRCvoDK7YZDFTj5SYsVUf1EjFU0vJN8AKcfyokZi5d2IlA9jAX8AjTrqj3odLhAAAAAASUVORK5CYII=',
        cryptoCurrency: 'Africoin',
        fromCurrency: 'AFK',
        dataClass: 'afk_chart',
        crypClass: 'afk-color',
        exchangeAmount: '',
        toCurrency: '₦',
        toValue: 0,
        afkDollarRate: 1,
        calculatingRate: false,
        productId: 22108792,
        paymentItemId: 101,
        currency: 566,
        transactionHash: '',
        transactionRef: '',
        redirectUrl: '',
        customerName: '',
        customerId: '',
        purchasingWithTokens: false,
        buyWIthCash: false,
        buyWithToken: false,
        processing: false,
        exchanging: false,
        amountToPay: 0,
        amountInKobo: 0,
        exchangeValue: 0,
        dollarRates: {},
        nairaValues: {
          afk: 365,
          eth: 0,
          btc: 0,
          ltc: 0,
          dash: 0,
        },
      }
    },
    watch: {
      exchangeAmount(val) {
        console.log('exchange amount', val)
        this.amountToPay =
          val * this.nairaValues[this.fromCurrency.toLowerCase()]
      },
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
        activeCurrency: 'activeCurrency',
      }),
    },
    async created() {
      const nairaVals = this.nairaValues
      for (const myData of this.data) {
        if (myData.currency === 'AFK') continue
        nairaVals[
          myData.currency.toLocaleLowerCase()
        ] = await this.getExchangeRate(myData.currency)
      }
      console.log('Nairavals are', nairaVals)
    },
    methods: {
      handleChange(value) {
        console.log(`selected ${value}`)
      },
      handleSelect(val) {
        const current = this.data.filter((datum) => {
          return datum.currency === val
        })
        this.cryptoCurrency = current[0].asset_name.name
        this.selImg = current[0].asset_name.img
        this.crypClass = current[0].currClass
        this.dataClass = current[0].className
        this.exchangeRate = current[0].price
        this.rightExchangeValue1 = this.exchangeAmount * this.rightPrice
      },
      checkKeyPress(event) {
        if (event.keyCode !== 13) {
          this.calculateRates()
        }
      },

      /* async getNairaValues() {
        this.nairaValues.dash = await this.getExchangeRate('DASH')
        this.nairaValues.btc = await this.getExchangeRate('BTC')
        this.nairaValues.eth = await this.getExchangeRate('ETH')
        this.nairaValues.ltc = await this.getExchangeRate('LTC')

        console.log('NAIRA VALUES', this.nairaValues)
      }, */

      calculateRates() {
        // this.calculatingRate = true
        let rate = 0
        let fromNairaValue = 0
        let toNairaValue = 0

        console.log('from: ', this.fromCurrency)
        if (this.toCurrency === 'ETH') {
          fromNairaValue = this.nairaValues.eth
        } else if (this.toCurrency === 'BTC') {
          fromNairaValue = this.nairaValues.btc
        } else if (this.toCurrency === 'AFK') {
          fromNairaValue = this.nairaValues.afk
        } else if (this.toCurrency === 'LTC') {
          fromNairaValue = this.nairaValues.ltc
        } else if (this.toCurrency === 'DASH') {
          fromNairaValue = this.nairaValues.dash
        }

        console.log('to: ', this.toCurrency)
        if (this.toCurrency === 'ETH') {
          toNairaValue = this.nairaValues.eth
        } else if (this.toCurrency === 'BTC') {
          toNairaValue = this.nairaValues.btc
        } else if (this.toCurrency === 'AFK') {
          toNairaValue = this.nairaValues.afk
        } else if (this.toCurrency === 'LTC') {
          toNairaValue = this.nairaValues.ltc
        } else if (this.toCurrency === 'DASH') {
          toNairaValue = this.nairaValues.dash
        }

        rate = (fromNairaValue * this.exchangeAmount) / toNairaValue
        this.exchangeValue = rate
        // this.calculatingRate = false
        console.log(rate)
      },

      async getExchangeRate(currency) {
        /* const payload = {
          base: currency,
          quote: 'NGN',
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        } */

        try {
          const response = await this.$axios.$get(
            `https://api.coinbase.com/v2/prices/${currency}-NGN/spot`
          )
          console.log(response.data.amount)
          return response.data.amount
        } catch (e) {
          console.log(e.response)
          this.$toast.error(e.response.data.data.error)
          this.processing = false
        }
      },

      swapCurrencies() {
        const tempFrom = this.toCurrency
        const tempTo = this.toCurrency
        this.toCurrency = tempTo
        this.toCurrency = tempFrom
      },
      reference() {
        let text = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

        for (let i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text
      },

      calculateParams() {
        this.amountInKobo = this.amountToPay * 100
        this.transactionRef = this.reference()
        // amount =  this.amountToPay * 100;
        this.redirectUrl =
          +'https://portal.payafrik.io/user-area/payment-done?ref=' +
          this.transactionRef +
          '&amount=' +
          this.amountInKobo +
          '&prodId=' +
          this.productId
        this.customerId = 'CUST' + this.userDetails.username
        this.customerName =
          this.userDetails.first_name + ' ' + this.userDetails.last_name
        const macKey =
          'kP31VzqzzYKmvW7ShN3BNXOP4fQY1AOMeIv5XwiXT7GzBfFhuZ0Yga8iuNh85H7NdAUBNWCtkCopcuLWGOA1NK42DCAeclercLH8L8NgEWh8S9AVZzxD3oPjAjTQ9A5W'
        this.transactionHash = sha512(
          this.transactionRef +
            this.productId +
            this.paymentItemId +
            this.amountInKobo +
            this.redirectUrl +
            macKey
        )
      },

      async generateTransaction() {
        this.calculateParams()
        this.processing = true
        const payload = {
          amount: this.amountToPay,
          username: this.userDetails.username,
          receiptEmail: this.email,
          transactionType: 'CASH',
          transactionStatus: 'PENDING',
          pfkTransactionReference: this.transactionRef,
          interswitchTransactionRef: '',
          channel: 'INTERSWITCH',
          transactionFor: 'COIN_PURCHASE',
          currency: this.toCurrency,
        }

        const headers = {
          'Content-Type': 'application/json',
          'pfk-user-token': this.$auth.getToken('local'),
        }
        try {
          const response = await this.$axios.$post(
            this.interswitchBaseUrl + 'transactions/new',
            payload,
            { headers }
          )
          console.log('request response', response)
          this.processing = false
          this.buyWIthCash = true
        } catch (e) {
          console.log(e.response)
          this.$toast.error(e.response.data.error)
          this.processing = false
        }
      },

      async purchaseWithTokens() {
        if (!this.exchangeAmount || this.exchangeAmount === 0) {
          this.$toast.error('Please select an amount greater than 0')
          return
        }
        if (!this.toCurrency || this.toCurrency === '') {
          this.$toast.error('Please choose a currency to buy')
          return
        }

        this.purchasingWithTokens = true

        const payload = {
          amount: this.exchangeAmount,
          from_currency: 'AFRITOKEN',
          to_currency: this.fromCurrency,
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }
        try {
          const requestResponse = await this.$axios.$post(
            this.baseUrl + 'exchange/barter/swap/',
            payload,
            { headers }
          )
          console.log('request response', requestResponse)
          this.$toast.success('Token purchase successful!')
          this.purchasingWithTokens = false
        } catch (e) {
          console.log(e.response)
          this.$toast.error(JSON.stringify(e.response.data.error))
          this.purchasingWithTokens = false
        }
      },

      ...mapMutations({
        toggleSidebar: 'global/toggleSidebar',
        closeSideBar: 'global/closeSidebar',
      }),
    },
    middleware: 'query',
    layout: 'main',
  }
</script>

<style scoped>
  .dash-body > .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .row {
    height: 100%;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  a {
    cursor: pointer;
  }

  .coin-option {
    border-radius: 10px;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 5px;
    border: 2px solid;
    width: 100%;
    display: block;
  }

  .coin-option span.rate {
    color: #ffffffaf;
    display: inline-block;
    margin-top: 10px;
    margin-left: 35px;
    font-size: 12px;
  }

  .coin-option .dropdown-toggle::after {
    /* display: inline-block; */
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
    float: right;
    margin-top: 10px;
  }

  .coin-option img {
    margin-top: -3px;
  }

  .coin-option.btc {
    border-color: #f8ae30;
  }

  .coin-option.btc label,
  .dropdown-item.btc label {
    color: #f8ae30;
  }

  .coin-option.eth {
    border-color: #6d76bc;
  }

  .coin-option.eth label,
  .dropdown-item.eth label {
    color: #6d76bc;
  }

  .coin-option.afk {
    border-color: #476efb;
  }

  .coin-option.afk label,
  .dropdown-item.eth label {
    color: #476efb;
  }

  .dropdown.coin-options .dropdown-menu {
    width: 100%;
    padding: 15px;
    background-color: #0b1a4d;
    z-index: 999;
  }

  .dropdown-item {
    margin-bottom: 10px;
    padding: 10px;
    background-color: transparent;
    display: block;
    position: relative;
  }

  .dropdown-item label {
    font-size: 13px;
  }

  .dropdown-item span.rate {
    font-size: 12px;
    margin-top: 20px;
    display: block;
    margin-left: 40px;
  }

  .exchange--content {
    height: inherit !important;
  }
  .main-content main .dash-body > div {
    padding-bottom: 50px;
    overflow-y: unset !important;
  }

  input#exchange-afk {
    border-color: #476efb;
  }
  input#exchange-btc {
    border-color: #f8ae30;
  }
  input#exchange-eth {
    border-color: #6d76bc;
  }
  input#exchange-dash {
    border-color: #fff;
  }
  input#exchange-ltc {
    border-color: #a5a5a5;
  }

  .c-yellow {
    color: #f8ae30;
  }

  .c-blue {
    color: #476efb;
  }

  .overlay {
    width: 100%;
    height: 50vh;
    z-index: 999;
    background-color: #466dfb99;
    position: absolute;
    top: 0;
    left: 0;
  }

  .overlay i {
    color: #ffffffa7;
    margin-top: 50vh;
  }

  .exchange--breakdown {
    margin-top: 0;
    z-index: 1;
  }

  #cryptoPurchaseConfirmationModal .modal-content,
  #buyWIthCashModal .modal-content {
    background-color: #131c4b;
    border: dashed 1px #4451ff;
    box-shadow: 25px 25px 100px #00000044;
    padding: 0;
    color: #fff;
  }

  #cryptoPurchaseConfirmationModal .modal-header,
  #buyWIthCashModal .modal-header {
    margin-bottom: 15px;
    border: none !important;
  }

  #cryptoPurchaseConfirmationModal .modal-header button,
  #buyWIthCashModal .modal-header button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }

  #cryptoPurchaseConfirmationModal .modal-header h5,
  #buyWIthCashModal .modal-header h5 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.2em;
  }

  #cryptoPurchaseConfirmationModal .modal-footer,
  #buyWIthCashModal .modal-footer {
    border: none !important;
  }

  #cryptoPurchaseConfirmationModal .modal-footer button,
  #buyWIthCashModal .modal-footer button {
    background: #11154b;
    color: #f6f6f6;
    border: solid #2832c3;
    padding: 10px 40px;
    border-radius: 25px;
    cursor: pointer;
  }

  #cryptoPurchaseConfirmationModal .modal-footer button.cancel,
  #buyWIthCashModal .modal-footer button.cancel {
    border: solid transparent;
  }
</style>
