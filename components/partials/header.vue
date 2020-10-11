<template>
  <header>
    <nav>
      <div class="balance">
        <img src="~/assets/img//logo.png" class="mobile-logo" alt="logo" />
        <span>AfriToken:</span>
        <h3>{{ userDetails.balance }}</h3>
      </div>
      <ul class="nav-links">
        <li class="mr-32">
          <a href="#" @click="$store.commit('setBuyToken')">
            <img class="mr-8" src="~/assets/img//plus.png" alt="plus" />
            BUY TOKEN
          </a>
        </li>
        <li class="mr-32">
          <a href="#" @click="$store.commit('setWithdraw')">
            <img class="mr-8" src="~/assets/img//wallet.png" alt="wallet" />
            WITHDRAW
          </a>
        </li>
        <li class="mr-32">
          <a href="#" @click="$store.commit('setTransferToken')">
            <img class="mr-8" src="~/assets/img//transfer.png" alt="transfer" />
            TRANSFER AFRITOKEN
          </a>
        </li>
        <li>
          <a href="#" @click="requestCard = true">
            <img
              class="mr-8"
              src="~/assets/img//credit_card.png"
              alt="transfer"
            />
            REQUEST CARD
          </a>
        </li>
      </ul>
      <div class="user-account">
        <a href="#" @click="$store.commit('setProfileModal')">
          <img class="mr-12" src="~/assets/img//user.png" alt="user icon" />
          <span>+{{ userDetails.username }}</span>
        </a>
      </div>
      <MobileHeader />
    </nav>

    <a-modal
      title="Request for Payafrik Smart Card"
      :visible="requestCard"
      :confirm-loading="requestCardLoading"
      centered
      @cancel="cancelRequestCard"
    >
      <p>
        You are about to request for a
        <span class="btc-color">Payafrik Smart Card</span>.
      </p>
      <p>
        With a smart card, you will be able to withdraw your tokens at atm
        machines and make normal everyday cash transactions.<br />Click on
        <span class="dash-color bold">COMPLETE REQUEST</span> below to complete
        the request or <span class="c-btc bold">X</span> above to cancel
      </p>
      <p class="c-btc">
        Please note, 2000 Tokens will be debited from your account
      </p>
      <label>Select card type</label>
      <div :style="{ marginTop: '16px', width: '100%' }">
        <a-radio-group v-model="selectedCard" class="w-100" size="small">
          <a-row>
            <a-col :xs="24" :sm="12" :md="8">
              <a-radio-button class="w-100 text-center" value="VERVE">
                <img src="~/assets/img/verve.svg" alt="" />
              </a-radio-button>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-radio-button class="w-100 text-center" value="MASTERCARD">
                <img src="~/assets/img/mastercard.svg" alt="" />
              </a-radio-button>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-radio-button class="w-100 text-center" value="VISA">
                <img src="~/assets/img/visa.svg" alt="" />
              </a-radio-button>
            </a-col>
          </a-row>
        </a-radio-group>
      </div>
      <form class="w-100 mt-20 request--card" action="">
        <div>
          <h3 class="c-dim-white">Name on the Card</h3>
          <div class="mt-12">
            <input
              id="fname"
              v-model="firstName"
              type="text"
              placeholder="First Name"
            />
            <label for="fname">First <span class="c-white">Name</span></label>
          </div>
          <div class="mt-12">
            <input
              id="lname"
              v-model="lastName"
              type="text"
              placeholder="Last Name"
            />
            <label for="lname">Last <span class="c-white">Name</span></label>
          </div>
        </div>
        <div class="mt-12">
          <h3 class="c-dim-white">Delivery Address</h3>
          <div class="mt-12">
            <input
              id="add1"
              v-model="addressLine1"
              type="text"
              placeholder="Address Line 1"
            />
            <label for="add1">
              Address <span class="c-white">Line 1</span>
            </label>
          </div>
          <div class="mt-12">
            <input
              id="add2"
              v-model="addressLine2"
              type="text"
              placeholder="Address Line 2"
            />
            <label for="add2">
              Address <span class="c-white">Line 2</span>
            </label>
          </div>
          <div class="mt-12">
            <input id="city" v-model="city" type="text" placeholder="City" />
            <label for="city">City </label>
          </div>
          <div class="mt-12">
            <input
              id="country"
              v-model="country"
              type="text"
              placeholder="Country"
            />
            <label for="country">Country </label>
          </div>
        </div>
      </form>
      <template slot="footer">
        <button
          key="submit"
          class="w-100 inter__btn"
          type="submit"
          @click="requestSmartCard"
        >
          <span v-if="requestCardLoading" class="mr-8">
            <a-spin>
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 24px; color: #1c27be"
                spin
              />
            </a-spin>
          </span>
          COMPLETE REQUEST
        </button>
      </template>
    </a-modal>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MobileHeader from '~/components/partials/mobile-header'

  export default {
    name: 'Header',
    components: { MobileHeader },
    data() {
      return {
        baseUrl: process.env.baseUrl,
        requestCard: false,
        requestCardLoading: false,
        processing: false,
        selectedCard: 'MASTERCARD',
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
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
      }),
    },
    methods: {
      cancelRequestCard() {
        this.requestCard = false
      },
      async requestSmartCard() {
        if (this.firstName === '') {
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            description: 'Please input your first name',
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          return
        }
        if (this.lastName === '') {
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            description: 'Please input your last name',
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          return
        }
        if (this.addressLine1 === '') {
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            description: 'Please input your delivery address',
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          return
        }
        if (this.city === '') {
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            description: 'Please input your delivery city',
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          return
        }
        if (this.country === '') {
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            description: 'Please input your delivery country',
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          return
        }
        this.requestCardLoading = true
        const payload = {
          first_name: this.firstName,
          last_name: this.lastName,
          address_line: this.addressLine1,
          address_line2: this.addressLine2,
          address_line3: '',
          city: this.city,
          country: this.country,
          card_type: this.selectedCard,
        }
        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }
        try {
          const requestResponse = await this.$axios.$post(
            this.baseUrl + 'utilities/cards/request-card/',
            payload,
            { headers }
          )
          console.log('request response', requestResponse)
          this.$notification.success({
            key: 'updatable',
            message: 'Success!',
            description: 'Card request successful!',
            duration: 0,
            class: 'success',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          this.requestCardLoading = false
        } catch (e) {
          console.log(e.response)
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            description: e.response.data.error,
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          this.requestCardLoading = false
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
