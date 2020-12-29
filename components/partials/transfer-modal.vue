<template>
  <section class="transfer--modal">
    <a href="#" class="modal-close" @click="$store.commit('setTransferToken')">
      <img src="~/assets/img//close.png" alt="" />
    </a>
    <div class="modal-content">
      <div class="main-modal">
        <div class="modal-title">
          <h3 class="light text-center">TRANSFER</h3>
          <h3 class="am-type">token</h3>
        </div>
        <div class="token-details">
          <p class="highlight">AVAILABLE TOKEN</p>
          <h1>{{ +userDetails.balance }}</h1>
          <p class="light">1 AFK TOKEN = 1.00 NGN</p>
        </div>
        <div class="transfer--info flex flex-center">
          <form class="text-center">
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
            <div class="mt-20">
              <div style="margin-bottom: 16px" class="phoneNum">
                <a-input
                  id="rec-phone"
                  v-model="username"
                  default-value="mysite"
                  placeholder="The phone number of the user you are transferring to"
                  type="text"
                >
                  <a-select
                    slot="addonBefore"
                    v-model="country4Code"
                    placeholder="country"
                    :default-value="countryCodes[0].name"
                    style="width: 90px"
                    show-search
                    option-filter-prop="children"
                    :filter-option="filterOption"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                  >
                    <a-select-option
                      v-for="country in countryCodes"
                      :key="country.name"
                    >
                      {{ country.name }}
                    </a-select-option>
                  </a-select>
                  <img
                    v-if="selectedCountry.flag"
                    slot="addonAfter"
                    :src="selectedCountry.flag"
                    alt="flag"
                  />
                </a-input>
                <div class="prefixNum">{{ selectedCountry.number }}</div>
                <label for="rec-phone" class="">
                  Recipients <span class="c-white">Phone number</span>
                </label>
              </div>
            </div>

            <div class="mt-20">
              <img :src="selImg" alt="" />
              <input
                id="token-am"
                v-model="afkAmountToTransfer"
                type="number"
                :class="crypClass"
                placeholder="How much you want to transfer"
              />
              <label for="token-am" :class="crypClass"
                >Token <span class="c-white">Amount</span></label
              >
            </div>
            <div class="text-right sub--btn--holder w-100">
              <div class="sub-button mt-20 w-100">
                <button
                  class="w-100"
                  :disabled="transferringAfk"
                  @click.prevent="transferAfk"
                >
                  <span v-if="transferringAfk">
                    <a-spin>
                      <a-icon
                        slot="indicator"
                        type="loading"
                        style="font-size: 24px; color: #1c27be"
                        spin
                      />
                    </a-spin>
                  </span>
                  TRANSFER<span v-if="transferringAfk">RING TOKENS...</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'TransferModal',
    data() {
      return {
        baseUrl: process.env.baseUrl,
        transferringAfk: false,
        afkAmountToTransfer: 0,
        prefixNum: '',
        country4Code: 'Nigeria',
        username: '',
        password: '',
        processing: false,
        confirmationStatus: 'false',
        viewPassword: false,
        selectedCountry: {
          name: 'Nigeria',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg',
          number: '234',
        },
        // currencies: ['AFK', 'BTC', 'ETH', 'LTC', 'DASH'],
        selImg:
          'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        cryptoCurrency: 'Bitcoin',
        fromCurrency: 'BTC',
        dataClass: 'btc_chart',
        crypClass: 'btc-color',
      }
    },
    methods: {
      handleChange(value) {
        this.selectedCountry = this.countryCodes.filter((country) => {
          return country.name === value
        })[0]
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
      async transferAfk() {
        this.transferringAfk = true
        const payload = {
          recipient: `${this.selectedCountry.number}${
            this.username[0] === '0' ? this.username.slice(1) : this.username
          }`,
          amount: this.afkAmountToTransfer,
          currency: this.fromCurrency,
          address_type: 'USERNAME',
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }

        try {
          const transferResponse = await this.$axios.$post(
            `${this.baseUrl}exchange/utilities/transfer/`,
            payload,
            { headers }
          )
          console.log(transferResponse)
          this.$notification.success({
            key: 'updatable',
            message: 'Success!',
            description: transferResponse.msg,
            duration: 0,
            class: 'success',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          console.log('AFK Transfer successfull...')
          this.transferringAfk = false
        } catch (e) {
          console.dir(e.response.data.error)
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            // description: JSON.stringify(e.response.data),
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          this.transferringAfk = false
        }
      },
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
        data: 'chart/chartData',
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
      }),
    },
  }
</script>
<style>
  .ant-select-no-arrow .ant-select-selection__rendered {
    position: absolute;
    top: 0;
  }
</style>
