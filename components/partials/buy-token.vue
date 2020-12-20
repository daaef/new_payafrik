<template>
  <div class="buy--token--modal">
    <a href="#" class="modal-close" @click="$store.commit('setBuyToken')">
      <img src="~/assets/img//close.png" alt="" />
    </a>
    <div class="modal-content">
      <div class="main-modal">
        <div class="w-100">
          <div class="modal-title">
            <h3 class="light text-center">BUY AFK</h3>
            <h3 class="am-type">token</h3>
          </div>
          <div class="token-details">
            <p class="highlight">AVAILABLE TOKEN</p>
            <h1>{{ +userDetails.balance }}</h1>
            <p class="light">1 AFK TOKEN = {{ pricePerToken }} NGN</p>
            <input
              v-model="tokens"
              type="number"
              placeholder="How many tokens?"
              @keyup="calculateParams"
            />
            <input
              v-model="email"
              type="email"
              placeholder="Please provide an email address"
            />
          </div>
          <div class="token--description">
            <p class="c-white">
              You can use AFK tokens to carry out transactions on this platform
              from purchasing utilities to other items in our mart. you can also
              transfer them to your AFK mastercard and make payments on physical
              machines or withdraw from an ATM.
            </p>
          </div>
          <div class="cash--crypto--btns">
            <div>
              <div class="sub-button">
                <button type="submit" @click="generateTransaction">
                  <span v-if="processing" class="mr-8">
                    <a-spin>
                      <a-icon
                        slot="indicator"
                        type="loading"
                        style="font-size: 24px; color: #1c27be"
                        spin
                      />
                    </a-spin>
                  </span>
                  BUY WITH CASH
                </button>
              </div>

              <div class="sub-button">
                <button>
                  <a target="_blank" @click="buywithCrypto = true">
                    <!-- href="https://commerce.coinbase.com/checkout/0bb96b95-c8bc-42bd-b1b7-a67a48f4357b" -->
                    BUY WITH CRYPTO
                  </a>
                  <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-modal
      title="Buy AfriTokens"
      :visible="buyWithCash"
      centered
      @cancel="cancelBuywithCash"
    >
      <span class="d-block">You are about to pay:</span>
      <span class="text-large">
        NGN {{ (amountToPay / 100) | formatNumber }}
      </span>
      <span class="d-block">
        for <span class="warn">{{ tokens }} AfriTokens</span>
      </span>
      <label>Transaction Reference:</label>
      <p>{{ transactionRef }}</p>
      <template slot="footer">
        <form
          name="form1"
          action="https://sandbox.interswitchng.com/collections/w/pay"
          method="post"
        >
          <input v-model="productId" name="product_id" type="hidden" />
          <input v-model="paymentItemId" name="pay_item_id" type="hidden" />
          <input v-model="amountToPay" name="amount" type="hidden" />
          <input v-model="currency" name="currency" type="hidden" />
          <input v-model="redirectUrl" name="site_redirect_url" type="hidden" />
          <input v-model="transactionRef" name="txn_ref" type="hidden" />
          <input v-model="customerId" name="cust_id" type="hidden" />
          <input v-model="customerName" name="cust_name" type="hidden" />
          <input v-model="transactionHash" name="hash" type="hidden" />
          <button
            key="submit"
            class="w-100 inter__btn"
            type="submit"
            @click="handleBuyWithCash"
          >
            <span v-if="buyWithCashLoading" class="mr-8">
              <a-spin>
                <a-icon
                  slot="indicator"
                  type="loading"
                  style="font-size: 24px; color: #1c27be"
                  spin
                />
              </a-spin>
            </span>
            <img src="~/assets/img/interswitch_icon.png" class="mr-2" />
            PAY WITH INTERSWICH
          </button>
        </form>
      </template>
    </a-modal>
    <a-modal
      title="Buy AfriTokens"
      :visible="buywithCrypto"
      :confirm-loading="buywithCryptoLoading"
      centered
      @cancel="cancelBuywithCrypto"
    >
      <p>
        You are about to pay for
        <span class="warn">{{ tokens }} AfriTokens</span> using cryptocurrency.
        Please select one of your cryptocurrency wallets to complete this
        transacion.
      </p>
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
            <span class="mr-12">$ {{ +myAsset.price | doubleForm }}</span>
            <span
              >Balance: {{ +myAsset.balance | doubleForm }}
              <span :class="myAsset.currClass">{{
                myAsset.currency
              }}</span></span
            >
          </a-select-option>
        </a-select>
      </div>
      <template slot="footer">
        <button
          key="submit"
          class="w-100 inter__btn"
          type="submit"
          @click="handleBuywithCrypto"
        >
          <span v-if="buywithCryptoLoading" class="mr-8">
            <a-spin>
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 24px; color: #1c27be"
                spin
              />
            </a-spin>
          </span>
          PAY NOW
        </button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  // import { mapState } from 'vuex'
  // import paystack from 'vue-paystack'
  const sha512 = require('js-sha512')
  // const jsSHA = require('jssha')

  export default {
    /* components: {
      paystack,
    }, */
    data() {
      return {
        baseUrl: process.env.baseUrl,
        interswitchBaseUrl: process.env.interswitchBaseUrl,
        // paystackkey: "pk_test_0a74386a6032347f675dee2ba41fb9d47bba958d", //paystack public key
        // email: "foobar@example.com", // Customer email
        // amount: 1000000, // in kobo
        initiatingPayment: false,
        tokens: '',
        email: '',
        selImg:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADd0lEQVRYhcWYWUhUYRTHf7O0mEtWZotbRhvUQwS20EoELRMGvVRmSbRZYEREDxFtVg/1EkVklD20TEQUUlY+RLQQBFIRWoilTWKmlW1jLmUa5/bdQZ3l3huT/mHgzr3n+5/f3Dvfd75zbYlj72JB8cAiYDYwARgBxKjh3wEPUArcB4qAWrPWZkFmAjuABYDTpPdv4DZwGHhoFGw3uD4SKAQeAIstQIgcaswD5THyX0FWAM8Al4XkweRSXhlWQXYD7g7PPxwSr4vK2xTITmBfGAG6Srx3GYHI4zj4HyF05apcAUFSgVPdAKHrlMrpB3IciO5GkGiVsxPIjDDNDqtyqTXKB7KjByB0bddBZNle2IMgUjLineog4Ip5aO8YlqYPpanpd0gnu93Gd28rG7eU8rKswSqIxuBUBSygzl+qYcmiIcQN6m3odrWglrLyH1YhdM2xqyoaUGXlDeSdrTJ0qfQ0cvZ8NW1t7cydPYhpk2Otgoy3q1IeUO3tcOnK+5C3W2IuXK6huqaZ/jFO7XFmr022CpJqN1o7PtX/JP9ctZYwkIqffOWc+512ZXVGAgnD+jJrxkBc8wdbAYkWEJtR1LXrtTwu/up3vrW1nZNnqmhpaWP0qEgylyVo550OG2syE4mKMr9rEBCvUZAkPHK0kqbmzrOnoLCOO/fqtVmzPiuJ4cP6+K5NSYtl1fLh2Ax/piavgLwxE1n89BsFNz74vn/89JMTp99qx9OnDiDdFe83ZsOaJJISI8zYewTkhSlm4Fieh7oPLdpxXn4VrysaiejrICsjgch+Dr94mfY5G1PMWJcKyD2zINXvmrVZVP76B4VFf+/O/Hlx2ieYliyOJ21SfyPr+46YuKz3wFYT+1dNryoaefT4CxWVjdovPnxgXMgFr5fTTkpyBM9LvNR//hUopBXYJMnr1NbflGQ6l7z4+//evC6ZsaMjDcdMTYtlW05qsMuSu05vJ2aq3XZPaJa0G/rjkL7jZg9A3NJ7no7/iy1m1pQwSnLl6HYdQSqB7G4EyVY5/UBE7mB9R5i1R/VNPgWasrkq8H9C7O96MtjaIYErAcvbrRBqUJ5+EKFAULduYphm0y3l5Q4WYLSaVqiOXraT0tGH3rx2VpsaI2OlbRCvoDK7YZDFTj5SYsVUf1EjFU0vJN8AKcfyokZi5d2IlA9jAX8AjTrqj3odLhAAAAAASUVORK5CYII=',
        cryptoCurrency: 'Africoin',
        fromCurrency: 'AFK',
        dataClass: 'afk_chart',
        crypClass: 'afk-color',
        keygen: 1,
        pricePerToken: 1,
        amountToPay: 0,
        redirectUrl: '',
        transactionRef: '',
        customerId: '',
        customerName: '',
        transactionHash: '',
        productId: 22108792,
        // productId: 1076,
        paymentItemId: 101,
        currency: 566,
        processing: false,
        purchasingWithCrypto: false,
        buyWithCash: false,
        buywithCrypto: false,
        buyWithCashLoading: false,
        buywithCryptoLoading: false,
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      ...mapGetters({
        countryCodes: 'countryCodes',
        btcData: 'btcData',
        ethData: 'ethData',
        litecoinData: 'litecoinData',
        dashData: 'dashData',
        btcChartData: 'btcChartData',
        ethChartData: 'ethChartData',
        litecoinChartData: 'litecoinChartData',
        dashChartData: 'dashChartData',
        data: 'chart/chartData',
        chatBoxClosed: 'chatBoxClosed',
        tokenModalActive: 'tokenModalActive',
        canvasClass: 'canvasClass',
        daysInterval: 'daysInterval',
        btcPrices: 'btcPrices',
        ethPrices: 'ethPrices',
        ltcPrices: 'ltcPrices',
        dashPrices: 'dashPrices',
        activeCurrency: 'activeCurrency',
      }),
    },
    methods: {
      handleBuyWithCash() {
        console.log('handleBuyWithCash')
        this.buyWithCashLoading = true
        setTimeout(() => {
          this.buyWithCash = false
          this.buyWithCashLoading = false
        }, 2000)
      },
      cancelBuywithCash() {
        console.log('cancelBuywithCash')
        this.buyWithCash = false
      },
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
      },
      cancelBuywithCrypto() {
        this.buywithCrypto = false
      },
      openModal(modalId) {
        /* $('#' + modalId).modal('show')
        $('.modal-backdrop').hide() */
      },

      closeModal(modalId) {
        /* $('#' + modalId).modal('hide') */
      },

      callback(response) {
        console.log(response)
      },

      close() {
        console.log('Payment closed')
      },

      signOut() {},

      openMenu() {
        const sidebar = document.querySelector('.sidebar_bg')
        sidebar.style.display = 'block'
      },
      ...mapMutations({
        toggleChatBox: 'toggleTokenModal',
        closeFunctionModal: 'closeFunctionModal',
      }),

      reference() {
        let text = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

        for (let i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text
      },

      calculateParams() {
        if (!this.tokens || this.tokens === 0) {
          return
        }
        this.transactionRef = this.reference()
        this.amountToPay = this.tokens * this.pricePerToken * 100
        this.redirectUrl = `https://portal.payafrik.io/user-area/payment-done?ref=${this.transactionRef}&amount=${this.amountToPay}&prodId=${this.productId}`
        this.customerId = `CUST${this.userDetails.username}`
        this.customerName = `${this.userDetails.first_name} ${this.userDetails.last_name}`
        const macKey =
          'kP31VzqzzYKmvW7ShN3BNXOP4fQY1AOMeIv5XwiXT7GzBfFhuZ0Yga8iuNh85H7NdAUBNWCtkCopcuLWGOA1NK42DCAeclercLH8L8NgEWh8S9AVZzxD3oPjAjTQ9A5W'
        this.transactionHash = sha512(
          this.transactionRef +
            this.productId +
            this.paymentItemId +
            this.amountToPay +
            this.redirectUrl +
            macKey
        )
      },

      async generateTransaction() {
        this.processing = true
        const payload = {
          amount: this.amountToPay / 100,
          username: this.userDetails.username,
          receiptEmail: this.email,
          transactionType: 'CASH',
          transactionStatus: 'PENDING',
          pfkTransactionReference: this.transactionRef,
          interswitchTransactionRef: '',
          channel: 'INTERSWITCH',
          transactionFor: 'TOKEN_PURCHASE',
        }

        const headers = {
          'Content-Type': 'application/json',
          'pfk-user-token': this.$auth.getToken('local'),
        }
        try {
          console.log('token', this.$auth.getToken('local'))
          const response = await this.$axios.$post(
            this.interswitchBaseUrl + 'transactions/new',
            payload,
            { headers }
          )
          console.log('request response', response)
          this.processing = false
          this.buyWithCash = true
        } catch (e) {
          console.log(e.response)
          this.processing = false
        }
      },
      async handleBuywithCrypto() {
        if (!this.amountToPay || this.amountToPay === 0) {
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            description: 'Please select an amount greater than 0',
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          return
        }
        if (!this.fromCurrency || this.fromCurrency === '') {
          this.$toast.error({
            key: 'updatable',
            message: 'Error!',
            description: 'Please choose a currency to use',
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          return
        }

        this.buywithCryptoLoading = true

        const payload = {
          amount: this.amountToPay,
          from_currency: this.fromCurrency,
          to_currency: 'AFRITOKEN',
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
          this.$notification.success({
            key: 'updatable',
            message: 'Success!',
            description: 'Token purchase successful!',
            duration: 0,
            class: 'success',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          this.buywithCryptoLoading = false
        } catch (e) {
          console.log(e.response)
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            description: JSON.stringify(e.response.data.error),
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          this.buywithCryptoLoading = false
        }
      },
    },
  }
</script>

<style scoped>
  .token-details h1 {
    color: #ffffff;
  }
  /* .buy--token--modal.active {
  margin-top: 0px !important;
  background-color: #131c4b !important;
} */
  .modal-close {
    cursor: pointer;
  }

  button a {
    color: #fff !important;
  }

  input {
    padding: 20px;
    color: #ffffff99;
    background: #111a3f;
    border: solid 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    /* width: 100%; */
  }

  #confirmationModal .modal-content,
  #buyWithCryptoModal .modal-content {
    background-color: #131c4b;
    border: dashed 1px #4451ff;
    box-shadow: 25px 25px 100px #00000044;
    padding: 0;
    color: #fff;
  }

  #confirmationModal .modal-header,
  #buyWithCryptoModal .modal-header {
    margin-bottom: 15px;
    border: none !important;
  }

  #confirmationModal .modal-header button,
  #buyWithCryptoModal .modal-header button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }

  #confirmationModal .modal-header h5,
  #buyWithCryptoModal .modal-header h5 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.2em;
  }

  #confirmationModal .modal-footer,
  #buyWithCryptoModal .modal-footer {
    border: none !important;
  }

  #confirmationModal .modal-footer button,
  #buyWithCryptoModal .modal-footer button {
    background: #11154b;
    color: #f6f6f6;
    border: solid #2832c3;
    padding: 10px 40px;
    border-radius: 25px;
    cursor: pointer;
  }

  #confirmationModal .modal-footer button.cancel,
  #buyWithCryptoModal .modal-footer button.cancel {
    border: solid transparent;
  }

  p.warn,
  span.warn,
  a.warn {
    font-weight: 700;
    color: #f8ae30;
  }

  button img {
    width: 20px;
  }

  .coin-option {
    border-radius: 10px;
    padding-top: 10px;
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
    /* margin-top: 10px; */
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
    padding: 5px;
    background-color: transparent;
    display: block;
    position: relative;
  }

  .dropdown-item label {
    font-size: 13px;
  }

  .dropdown-item span.rate {
    font-size: 12px;
    /* margin-top: 20px; */
    display: block;
    margin-left: 40px;
  }
</style>
