<template>
  <div class="wallet--modals">
    <div
      v-if="walletSendActive"
      :class="[{ 'wallet-active': walletSendActive }, 'wallet--send', 'h-100']"
    >
      <a href="#" class="modal-close" @click="$store.commit('setWalletSend')">
        <img src="~/assets/img/close.png" alt="" />
      </a>
      <div class="modal-content h-100">
        <div class="main-modal h-100">
          <div>
            <div class="w-100 text-center mb-20">
              <img height="50" :src="data.asset_name.img" alt="" />
            </div>
            <div class="w-100 flex flex-between mb-20">
              <a
                :class="[wallet ? data.currClass : 'c-white']"
                href="#"
                @click="walletActive"
                >Send to Wallet</a
              >
              <a
                :class="[payafrikUser ? data.currClass : 'c-white']"
                href="#"
                @click="payafrikActive"
                >Send to PayAfrik User</a
              >
            </div>
            <XyzTransition appear xyz="fade ease-out-back">
              <div v-if="wallet" class="plain--input mt-12 mb-12">
                <input
                  type="text"
                  v-model="walletAddress"
                  placeholder="Wallet Address"
                />
              </div>
              <div v-if="payafrikUser" class="plain--input mt-12 mb-12">
                <input
                  type="text"
                  v-model="payafrikUsername"
                  placeholder="PayAfrik Username"
                />
              </div>
            </XyzTransition>
            <div class="plain--input mt-12 mb-12">
              <input type="text" v-model="note" placeholder="Personal note" />
              <span class="optional">[optional]</span>
            </div>
            <div class="line--input mt-64 mb-4">
              <input
                v-model="amount"
                type="text"
                :class="['c-afk', data.currClass]"
                placeholder="0.00"
              />
              <span class="wallet--name">{{ currency }}</span>
            </div>
            <div class="sending--amnt flex flex-between">
              <span class="amount c-white">
                {{ dollarValue | doubleForm }}</span
              >
              <span class="currency c-white">USD</span>
            </div>
            <div :class="['text-center', 'mt-20', data.className]">
              <button class="normal-btn afk-bordered">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="walletRecieveActive"
      :class="[
        { 'wallet-active': walletRecieveActive },
        'wallet--recieve',
        'h-100',
      ]"
    >
      <a
        href="#"
        class="modal-close"
        @click="$store.commit('setWalletRecieve')"
      >
        <img src="~/assets/img/close.png" alt="" />
      </a>
      <div class="modal-content h-100">
        <div class="main-modal h-100">
          <div>
            <div class="w-100 text-center mb-20">
              <img height="50" src="~/assets/img/Africoin.png" alt="" />
            </div>
            <div class="plain--input mt-50 mb-12">
              <input
                type="text"
                value="0x983426eCbA8e739C690B2B58C85fb45976bf58ef"
              />
              <a href="#" class="copy--btn">
                <img src="~/assets/img/copy.png" alt="" />
              </a>
            </div>
            <div class="qr-code text-center mt-20 mb-20 w-100">
              <img src="~/assets/img/qr.png" alt="" />
            </div>
            <div class="plain-btns mt-50">
              <div>
                <button class="plain-btn">
                  <img src="~/assets/img/email.png" alt="" />
                </button>
                <span class="c-white mt-8 d-block">Email this address</span>
              </div>
              <div>
                <button class="plain-btn">
                  <img src="~/assets/img/link.png" alt="" />
                </button>
                <span class="c-white mt-8 d-block">Veiw on Blockchain</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'WalletModals',
    data() {
      return {
        baseUrl: process.env.baseUrl,
        sending: false,
        userTransferAfk: '',
        amount: 0,
        note: '',
        walletAddress: '',
        payafrikUsername: '',
        payafrikUser: false,
        wallet: true,
        dollarValue: 0,
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
        chatBoxClosed: 'chatBoxClosed',
        tokenModalActive: 'tokenModalActive',
        canvasClass: 'canvasClass',
        buyTokenActive: 'buyTokenActive',
        withdrawActive: 'withdrawActive',
        transferTokenActive: 'transferTokenActive',
        walletModalActive: 'walletModalActive',
        profileModalActive: 'profileModalActive',
        walletSendActive: 'walletSendActive',
        walletRecieveActive: 'walletRecieveActive',
        currency: 'activeCurrency',
        data: 'data',
      }),
    },
    watch: {
      amount(val) {
        console.log('exchange amount', val)
        this.dollarValue = val * this.data.price
      },
    },
    methods: {
      copyText() {
        /* Get the text field */
        const copyText = document.getElementById('walletAddress')
        /* Select the text field */
        copyText.select()
        copyText.setSelectionRange(0, 99999) /* For mobile devices */
        /* Copy the text inside the text field */
        document.execCommand('copy')
        this.$toast.success('Address copied to clipboard')
      },
      async sendCurrency() {
        if (this.wallet && (this.walletAddress === '' || this.amount === 0)) {
          this.$toast.error('Fill in the all the fields')
          return
        }

        if (
          this.payafrikUser &&
          (this.payafrikUsername === '' || this.amount === 0)
        ) {
          this.$toast.error('Fill in the all the fields')
          return
        }

        this.sending = true
        const currency = this.currency

        const payload = {
          currency,
          amount: this.amount,
        }

        payload.wallet = currency

        if (this.wallet) {
          payload.recipient = this.walletAddress
          payload.address_type = 'WALLET'
        } else {
          payload.recipient = this.payafrikUsername
          payload.address_type = 'USERNAME'
        }

        if (this.note !== '') {
          payload.note = this.note
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }

        try {
          const transferResponse = await this.$axios.$post(
            this.baseUrl + 'exchange/utilities/transfer/',
            payload,
            { headers }
          )
          console.log(transferResponse)
          // const transferResponse = await this.$axios.$post(this.baseUrl+'transactions/transactions/send/', payload, {headers})
          this.$toast.success('Transfer successful!')
          console.log('Transfer successfull...')
          this.sending = false
        } catch (e) {
          console.log(e.response)
          this.$toast.error(e.response.data.error)
          this.sending = false
        }
      },
      walletActive() {
        this.wallet = true
        this.payafrikUser = false
      },
      payafrikActive() {
        this.wallet = false
        this.payafrikUser = true
      },
    },
  }
</script>

<style lang="scss">
  .request--card {
    input {
      border: solid 2px #3341ff;
      padding-left: 15px;
    }
    label {
      color: #3341ff;
      left: 15px;
    }
  }
</style>
