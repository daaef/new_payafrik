<template>
  <div class="wallet--modals">
    <div
      :class="[{ 'wallet-active': walletSendActive }, 'wallet--send', 'h-100']"
    >
      <a href="#" class="modal-close" @click="$store.commit('setWalletSend')">
        <img src="~/assets/img/close.png" alt="" />
      </a>
      <div class="modal-content h-100">
        <div class="main-modal h-100">
          <div>
            <div class="w-100 text-center mb-20">
              <img height="50" src="~/assets/img/Africoin.png" alt="" />
            </div>
            <div class="plain--input mt-12 mb-12">
              <input type="text" placeholder="Send to Africoin Address..." />
            </div>
            <div class="plain--input mt-12 mb-12">
              <input type="text" placeholder="Personal note" />
              <span class="optional">[optional]</span>
            </div>
            <div class="line--input mt-64 mb-4">
              <input type="text" class="c-afk" placeholder="0.00" />
              <span class="wallet--name">AFK</span>
            </div>
            <div class="sending--amnt flex flex-between">
              <span class="amount c-white">0.00</span>
              <span class="currency c-white">USD</span>
            </div>
            <div class="text-center mt-20">
              <button class="normal-btn afk-bordered">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
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
        username: '',
        sendMode: 'address',
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
        activeCurrency: 'activeCurrency',
      }),
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
        if (
          this.sendMode === 'address' &&
          (this.walletAddress === '' || this.amount === 0)
        ) {
          return
        }

        if (
          this.sendMode === 'username' &&
          (this.username === '' || this.amount === 0)
        ) {
          return
        }

        this.sending = true
        const currency = this.activeCurrency

        const payload = {
          currency,
          amount: this.amount,
        }

        payload.wallet = this.activeCurrency

        if (this.sendMode === 'address') {
          payload.recipient = this.walletAddress
          payload.address_type = 'WALLET'
        } else {
          payload.recipient = this.username
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
