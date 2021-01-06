<template>
  <section class="withdraw--modal">
    <a href="#" class="modal-close" @click="$store.commit('setWithdraw')">
      <img src="~/assets/img//close.png" alt="" />
    </a>
    <div class="modal-content">
      <div class="main-modal">
        <div class="modal-title">
          <h3 class="light text-center">WITHDRAW</h3>
          <h3 class="am-type">token</h3>
        </div>
        <div class="token-details">
          <p class="highlight">AVAILABLE TOKEN</p>
          <h1>{{ userDetails.balance | doubleForm }}</h1>
          <p class="light">1 TOKEN = 1.00 NGN</p>
        </div>
        <div class="account--smart-card">
          <div class="bank--account">
            <h1 class="form-title text-right am-type c-white">
              to Bank Account
            </h1>
            <form>
              <div style="margin-bottom: 16px" class="phoneNum bank--pnum">
                <a-select
                  slot="addonBefore"
                  v-model="currentBank"
                  placeholder="country"
                  show-search
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  @change="handleChange"
                >
                  <a-select-option v-for="bank in banks.data" :key="bank.id">
                    {{ bank.name }}
                  </a-select-option>
                </a-select>
                <img
                  slot="addonAfter"
                  src="~/assets/img//bank.png"
                  alt="flag"
                />
                <label for="pnum">Bank</label>
              </div>
              <div class="mt-20">
                <img src="~/assets/img//recipient.png" alt="" />
                <input
                  id="recipient"
                  v-model="account"
                  type="text"
                  placeholder="The phone number of the user you are transferring to"
                  @blur="checkAccount"
                />
                <label for="recipient"
                  >Recipients <span class="c-white">Account number</span></label
                >
              </div>
              <div class="mt-20">
                <img src="~/assets/img//tokenam.png" alt="" />
                <input
                  id="token"
                  v-model="amount"
                  type="text"
                  placeholder="How much you want to transfer"
                />
                <label for="token"
                  >Token <span class="c-white">Amount</span></label
                >
              </div>
              <div class="text-right sub--btn--holder">
                <div class="sub-button mt-20">
                  <button @click.prevent="charges">WITHDRAW TO BANK</button>
                </div>
              </div>
            </form>
          </div>
          <div class="smart--card">
            <h1 class="form-title text-left am-type c-white">to smart Card</h1>
            <form>
              <div>
                <img src="~/assets/img//user_name.png" alt="" />
                <input
                  id="uname"
                  type="text"
                  placeholder="The user you are transferring to"
                  disabled
                />
                <label for="uname"
                  >Users <span class="c-white">Name</span></label
                >
              </div>
              <div class="mt-20">
                <img src="~/assets/img//recipcard.png" alt="" />
                <input
                  id="recsma"
                  type="text"
                  placeholder="The card number of the user you are transferring to"
                  disabled
                />
                <label for="recsma"
                  >Recipients <span class="c-white">Card number</span></label
                >
              </div>
              <div class="mt-20">
                <img src="~/assets/img//tokensmartam.png" alt="" />
                <input
                  id="tokam"
                  type="text"
                  placeholder="How much you want to transfer"
                  disabled
                />
                <label for="tokam"
                  >Token <span class="c-white">Amount</span></label
                >
              </div>
              <div class="sub-button mt-20">
                <button disabled>WITHDRAW TO CARD</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <a-modal
      :title="`Withdrawal of ${amount} Tokens`"
      :visible="withdrawCash"
      centered
      @cancel="withdrawCash = false"
    >
      <span class="mr-8">Transaction Charge:</span>
      <span> ₦{{ charge | formatNumber }} </span>
      <span class="d-block">
        Withdrawing:
        <span class="c-alert">{{ amount | formatNumber }} </span>
      </span>
      <span class="d-block"> To </span>
      <h2 class="d-block c-btc">{{ accountName }}</h2>
      <p>{{ selectedBank.name }}</p>
      <template slot="footer">
        <div class="text-right sub--btn--holder">
          <div class="sub-button">
            <button v-if="!processClicked" @click.prevent="withdraw">
              WITHDRAW
            </button>
            <button v-if="processClicked" @click.prevent="withdrawCash = false">
              Close
            </button>
          </div>
        </div>
      </template>
    </a-modal>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'WithdrawModal',
    data() {
      return {
        withdrawCash: false,
        currentBank: 'Access Bank',
        myBank: '',
        processing: false,
        confirmationStatus: 'false',
        viewPassword: false,
        accountName: '',
        selectedBank: {
          id: 1,
          code: '044',
          name: 'Access Bank',
        },
        account: '',
        currency: 'NGN',
        charge: null,
        amount: 0,
        status: false,
        message: '',
        processClicked: false,
      }
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
        banks: 'chart/banks',
        loading: 'dataLoading',
        activeCurrency: 'activeCurrency',
      }),
    },
    async mounted() {
      const headers = {
        'Content-Type': 'application/json',
        'pfk-user-token': this.$auth.getToken('local'),
      }

      const myBanks = await this.$axios.$get(
        'https://payafrik.immanuel.com.ng/v1/api/flutterwave/banks/NG',
        { headers }
      )
      await this.$store.commit('chart/setBanks', myBanks)
      console.log(myBanks.data)
    },
    methods: {
      async checkAccount(e) {
        if (this.account.length >= 9) {
          const headers = {
            'Content-Type': 'application/json',
            'pfk-user-token': this.$auth.getToken('local'),
          }

          const payload = {
            accountNumber: this.account,
            bankCode: this.selectedBank.code,
          }

          try {
            const acc = await this.$axios.$post(
              'https://payafrik.immanuel.com.ng/v1/api/flutterwave/banks/validate-account',
              payload,
              { headers }
            )
            console.log(acc)
            this.accountName = acc.data.account_name
            this.status = acc.status
          } catch (e) {
            this.$toast.error(e.response)
            console.log(e.response)
          }
        }
      },
      async withdraw(e) {
        if (this.account.length >= 9) {
          const headers = {
            'Content-Type': 'application/json',
            'pfk-user-token': this.$auth.getToken('local'),
          }

          const headers2 = {
            'Content-Type': 'application/json',
            PFK_AUTH_TOKEN: this.$auth.getToken('local'),
          }

          this.processClicked = true
          const payload = {
            amount: this.amount,
            currency: this.currency,
            bankCode: this.selectedBank.code,
            accountNumber: this.account,
            charges: this.charge,
          }

          try {
            const transfer = await this.$axios.$post(
              'https://payafrik.immanuel.com.ng/v1/api/flutterwave/banks/transfer',
              payload,
              { headers }
            )

            const getUser = await this.$axios.$get(
              'https://api.payafrik.io/auth/user/profile/',
              { headers2 }
            )

            const userLoad = {
              key: 'user',
              value: getUser,
            }

            this.$store.commit('auth/SET', userLoad)

            this.message = transfer.data
            this.withdrawCash = false
            this.amount = null
            this.currency = null
            this.selectedBank.code = null
            this.account = null
            this.charge = null
            this.processClicked = false
          } catch (e) {
            this.$toast.error(e.response)
            console.log(e.response)
          }
        }
      },
      async charges() {
        if (!this.status) {
          return this.status
        }
        if (this.amount <= this.userDetails.balance && this.amount !== 0) {
          const headers = {
            'Content-Type': 'application/json',
            'pfk-user-token': this.$auth.getToken('local'),
          }

          const payload = {
            amount: this.amount,
            currency: this.currency,
          }

          try {
            const charge = await this.$axios.$post(
              'https://payafrik.immanuel.com.ng/v1/api/flutterwave/banks/transfer/charges',
              payload,
              { headers }
            )
            console.log(charge)
            if (charge.status) {
              this.charge = charge.data.totalCharge
              this.withdrawCash = true
            }
          } catch (e) {
            this.$toast.error(e.response)
            console.log(e.response)
          }
        }
      },
      handleChange(value) {
        console.log('value is', value)
        this.selectedBank = this.banks.data.find((bnk) => {
          return bnk.id === value
        })
      },
      handleBlur() {
        console.log('blur')
      },
      handleFocus() {
        console.log('focus')
      },
      filterOption(input, option) {
        return option.componentOptions.children[0].text
          .toLowerCase()
          .includes(input.toLowerCase())
      },
      async signIn(e) {
        e.preventDefault()
        await console.log('signing in...')
        const payload = {
          username: `${this.selectedCountry.number}${
            this.username[0] === '0' ? this.username.slice(1) : this.username
          }`,
          password: this.password,
        }
        await console.log(payload)
        this.processing = true
        this.$nuxt.$loading.start()
        try {
          const response = await this.$auth.loginWith('local', {
            data: payload,
          })
          console.log(response)
          await this.$nuxt.$loading.finish()

          // this.authenticate(signInResponse)
        } catch (e) {
          this.processing = false
          this.$nuxt.$loading.finish()
          console.log('error is', e.response)
        }
      },
      onSelect({ name, iso2, dialCode }) {
        console.log(`${dialCode}`)
        this.prefixNum = dialCode
      },
    },
  }
</script>
<style scoped lang="scss"></style>
