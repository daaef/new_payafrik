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
              @keyup="calculateParams()"
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
                <button
                  v-if="!processing"
                  type="submit"
                  @click="generateTransaction()"
                >
                  BUY WITH CASH
                </button>
                <button v-if="processing" type="submit">
                  <i class="fas fa-circle-notch fa-spin" />
                </button>
              </div>

              <div class="sub-button">
                <button>
                  <a target="_blank" @click="openModal('buyWithCryptoModal')">
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

    <!-- Cofirmation Modal -->
    <div
      id="confirmationModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmationModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalCenterTitleTitle" class="modal-title">
              Buy AfriTokens
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container ml-3">
              <div class="row">
                <div class="col-md-12">
                  <p>
                    You are about to pay for
                    <span class="warn">{{ tokens }} AfriTokens</span>.
                  </p>

                  <label>Amount due today:</label>
                  <h2 class="warn">
                    NGN {{ (amountToPay / 100) | formatNumber }}
                  </h2>

                  <label>Transaction Reference:</label>
                  <p>{{ transactionRef }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-md-12 ml-auto mr-auto">
              <form
                name="form1"
                action="https://sandbox.interswitchng.com/collections/w/pay"
                method="post"
              >
                <input v-model="productId" name="product_id" type="hidden" />
                <input
                  v-model="paymentItemId"
                  name="pay_item_id"
                  type="hidden"
                />
                <input v-model="amountToPay" name="amount" type="hidden" />
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
                  <img
                    src="../../assets/img/interswitch_icon.png"
                    class="mr-2"
                  />PAY WITH INTERSWICH
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Buy with crypto Modal -->
    <div
      id="buyWithCryptoModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="buyWithCryptoModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalCenterTitleTitle" class="modal-title">
              Buy AfriTokens
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container ml-3">
              <div class="row">
                <div class="col-md-12">
                  <p>
                    You are about to pay for
                    <span class="warn">{{ tokens }} AfriTokens</span> using
                    cryptocurrency. Please select one of your cryptocurrency
                    wallets to complete this transacion.
                  </p>

                  <!-- <label>Amount due today:</label>
                  <h2 class="warn">
                    NGN {{ (amountToPay / 100) | formatNumber }}
                  </h2> -->

                  <!-- <label>Transaction Reference:</label>
                  <p>{{ transactionRef }}</p> -->

                  <div class="dropdown coin-options">
                    <a
                      v-if="fromCurrency === 'AFK'"
                      id="dropdownMenuButton"
                      class="coin-option afk dropdown-toggle w-100"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src="../../assets/img/Africoin.png" alt="" />
                      <label for="exchange-afk"
                        >AFK <span class="c-white">Africoin</span>
                      </label>
                      <span class="rate"
                        >Balance:
                        {{ userDetails.afk_balance | formatNumberLong }}</span
                      >
                    </a>
                    <a
                      v-if="fromCurrency === 'BTC'"
                      id="dropdownMenuButton"
                      class="coin-option btc dropdown-toggle w-100"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src="../../assets/img/bitcoin.png" alt="" />
                      <label for="exchange-btc"
                        >BTC <span class="c-white">Bitcoin</span>
                      </label>
                      <span class="rate"
                        >Balance:
                        {{ userDetails.btc_balance | formatNumberLong }}</span
                      >
                    </a>
                    <a
                      v-if="fromCurrency === 'ETH'"
                      id="dropdownMenuButton"
                      class="coin-option eth dropdown-toggle w-100"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src="../../assets/img/eth.png" alt="" />
                      <label for="exchange-afk"
                        >ETH <span class="c-white">Ethereum</span>
                      </label>
                      <span class="rate"
                        >Balance:
                        {{ userDetails.eth_balance | formatNumberLong }}</span
                      >
                    </a>
                    <a
                      v-if="fromCurrency === 'LTC'"
                      id="dropdownMenuButton"
                      class="coin-option eth dropdown-toggle w-100"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src="../../assets/img/litecoin.png"
                        style="width: 35px"
                        alt=""
                      />
                      <label for="exchange-afk"
                        >LTC <span class="c-white">Litecoin</span>
                      </label>
                      <span class="rate"
                        >Balance:
                        {{ userDetails.ltc_balance | formatNumberLong }}</span
                      >
                    </a>
                    <a
                      v-if="fromCurrency === 'DASH'"
                      id="dropdownMenuButton"
                      class="coin-option eth dropdown-toggle w-100"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src="../../assets/img/dash.png"
                        style="width: 35px"
                        alt=""
                      />
                      <label for="exchange-afk"
                        >Dash <span class="c-white">Dash</span>
                      </label>
                      <span class="rate"
                        >Balance:
                        {{ userDetails.dash_balance | formatNumberLong }}</span
                      >
                    </a>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        v-if="fromCurrency !== 'AFK'"
                        class="dropdown-item afk"
                        @click="fromCurrency = 'AFK'"
                      >
                        <img src="../../assets/img/Africoin.png" alt="" />
                        <label>AFK <span class="c-white">Africoin</span></label>
                        <span class="rate"
                          >Balance:
                          {{ userDetails.afk_balance | formatNumberLong }}</span
                        >
                      </a>
                      <a
                        v-if="fromCurrency !== 'BTC'"
                        class="dropdown-item btc"
                        @click="fromCurrency = 'BTC'"
                      >
                        <img src="../../assets/img/bitcoin.png" alt="" />
                        <label for="exchange-afk"
                          >BTC <span class="c-white">Bitcoin</span></label
                        >
                        <span class="rate"
                          >Balance:
                          {{ userDetails.btc_balance | formatNumberLong }}</span
                        >
                      </a>
                      <a
                        v-if="fromCurrency !== 'ETH'"
                        class="dropdown-item eth"
                        @click="fromCurrency = 'ETH'"
                      >
                        <img src="../../assets/img/eth.png" alt="" />
                        <label for="exchange-afk"
                          >ETH <span class="c-white">Ethereum</span></label
                        >
                        <span class="rate"
                          >Balance:
                          {{ userDetails.eth_balance | formatNumberLong }}</span
                        >
                      </a>
                      <a
                        v-if="fromCurrency !== 'LTC'"
                        class="dropdown-item eth"
                        @click="fromCurrency = 'LTC'"
                      >
                        <img
                          src="../../assets/img/litecoin.png"
                          style="width: 35px"
                          alt=""
                        />
                        <label for="exchange-afk"
                          >LTC <span class="c-white">Litecoin</span></label
                        >
                        <span class="rate"
                          >Balance:
                          {{
                            userDetails.litecoin_balance | formatNumberLong
                          }}</span
                        >
                      </a>
                      <a
                        v-if="fromCurrency !== 'DASH'"
                        class="dropdown-item eth"
                        @click="fromCurrency = 'DASH'"
                      >
                        <img
                          src="../../assets/img/dash.png"
                          style="width: 35px"
                          alt=""
                        />
                        <label for="exchange-afk"
                          >DASH <span class="c-white">Dash</span></label
                        >
                        <span class="rate"
                          >Balance:
                          {{
                            userDetails.dash_balance | formatNumberLong
                          }}</span
                        >
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="col-md-12 ml-auto mr-auto">
              <button
                v-if="!purchasingWithCrypto"
                class="w-100"
                type="submit"
                @click="purchaseWithCrypto()"
              >
                PAY NOW
              </button>
              <button v-if="purchasingWithCrypto" class="w-100" type="submit">
                <i class="fas fa-circle-notch fa-spin" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        pricePerToken: 1,
        amountToPay: 0,
        redirectUrl: '',
        transactionRef: '',
        customerId: '',
        customerName: '',
        transactionHash: '',
        productId: 1076,
        paymentItemId: 101,
        currency: 566,
        processing: false,
        fromCurrency: 'AFK',
        purchasingWithCrypto: false,
      }
    },
    /* computed: {
      tokenModalActive() {
        return this.$store.state.global.tokenModalActive
      },
      userDetails() {
        return this.$store.state.authenticatedUser
      },
    }, */
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
        data: 'chartData',
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

      closeFunctionModal() {
        this.$store.commit('closeFunctionModal')
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
        this.redirectUrl =
          // "http://localhost:3000/user-area/payment-done?ref=" +
          'https://portal.payafrik.io/user-area/payment-done?ref=' +
          this.transactionRef +
          '&amount=' +
          this.amountToPay +
          '&prodId=' +
          this.productId
        this.customerId = 'CUST' + this.userDetails.username
        this.customerName =
          this.userDetails.first_name + ' ' + this.userDetails.last_name
        const macKey =
          'D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F'
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
          'pfk-user-token': this.userDetails.token,
        }
        try {
          const response = await this.$axios.$post(
            this.interswitchBaseUrl + 'transactions/new',
            payload,
            { headers }
          )
          console.log('request response', response)
          this.processing = false
          this.openModal('confirmationModal')
        } catch (e) {
          console.log(e.response)
          this.$toast.error(e.response.data.error)
          this.processing = false
        }
      },

      async purchaseWithCrypto() {
        if (!this.amountToPay || this.amountToPay === 0) {
          this.$toast.error('Please select an amount greater than 0')
          return
        }
        if (!this.fromCurrency || this.fromCurrency === '') {
          this.$toast.error('Please choose a currency to use')
          return
        }

        this.purchasingWithCrypto = true

        const payload = {
          amount: this.amountToPay,
          from_currency: this.fromCurrency,
          to_currency: 'AFRITOKEN',
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.userDetails.token,
        }
        try {
          const requestResponse = await this.$axios.$post(
            this.baseUrl + 'exchange/barter/swap/',
            payload,
            { headers }
          )
          console.log('request response', requestResponse)
          this.$toast.success('Token purchase successful!')
          this.purchasingWithCrypto = false
          this.closeModal('#buyWithCryptoModal')
        } catch (e) {
          console.log(e.response)
          this.$toast.error(JSON.stringify(e.response.data.error))
          this.purchasingWithCrypto = false
        }
      },
    },
    mounted() {},
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
