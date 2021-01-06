<template>
  <div v-if="$device.isMobileOrTablet">
    <input
      id="navi-toggle"
      v-model="mobSideOpen"
      type="checkbox"
      class="navigation__checkbox"
    />

    <label for="navi-toggle" class="navigation__button">
      <span class="navigation__icon">&nbsp;</span>
    </label>
    <div class="nav-dropdown">
      <div class="balance">
        <span>Token Balance:</span>
        <h3>{{ +userDetails.balance }}</h3>
      </div>
      <ul class="nav-links">
        <li>
          <a href="#" @click="$store.commit('setBuyToken')">
            <img class="mr-8" src="~/assets/img//plus.png" alt="plus" />
            Buy Token
          </a>
        </li>
        <li>
          <a href="#" @click="$store.commit('setWithdraw')">
            <img class="mr-8" src="~/assets/img//wallet.png" alt="wallet" />
            Withdraw
          </a>
        </li>
        <li>
          <a href="#" @click="$store.commit('setTransferToken')">
            <img class="mr-8" src="~/assets/img//transfer.png" alt="transfer" />
            Transfer Token
          </a>
        </li>
        <nuxt-link tag="li" to="/">
          <a href="#" class="mt-8">
            <img class="mr-8" src="~/assets/img//home.png" alt="" />
            Home
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/wallet">
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//side-wallet.png" alt="" />
            Wallet
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/mart">
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//mart.png" alt="" />
            Mart
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/exchange">
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img/side_swap_crypto.png" alt="" />
            Swap Crypto
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/transactions">
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//transaction_new.png" alt="" />
            Transactions
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/power">
          <a href="#" class="mt-8">
            <img class="mr-8" src="~/assets/img//power.png" alt="" />
            Power
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/buy-crypto">
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//buy_crypto.png" alt="" />
            Buy Crypto
          </a>
        </nuxt-link>
        <li>
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//chat.png" alt="" />
            Support
          </a>
        </li>
        <li>
          <a href="" class="mt-8" @click="$auth.logout()">
            <img class="mr-8" src="~/assets/img//exit.png" alt="" />
            Exit
          </a>
        </li>
      </ul>
      <div class="user-account">
        <a href="#">
          <img class="mr-12" src="~/assets/img//user.png" alt="user icon" />
          <span>+{{ userDetails.username }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'MobileHeader',
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
        mobileSidebar: 'mobSideOpen',
      }),
      mobSideOpen: {
        get() {
          return this.mobileSidebar
        },
        set() {
          this.$store.commit('toggleMobSideBar')
        },
      },
    },
  }
</script>
