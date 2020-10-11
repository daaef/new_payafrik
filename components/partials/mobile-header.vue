<template>
  <div>
    <input id="navi-toggle" type="checkbox" class="navigation__checkbox" />

    <label for="navi-toggle" class="navigation__button">
      <span class="navigation__icon">&nbsp;</span>
    </label>
    <div class="nav-dropdown">
      <div class="balance">
        <span>AfriToken:</span>
        <h3>{{ +userDetails.balance }}</h3>
      </div>
      <ul class="nav-links">
        <li>
          <a href="#" data-link-class="buy-token-active">
            <img class="mr-8" src="~/assets/img//plus.png" alt="plus" />
            BUY TOKEN
          </a>
        </li>
        <li>
          <a href="#" data-link-class="withdraw-active">
            <img class="mr-8" src="~/assets/img//wallet.png" alt="wallet" />
            WITHDRAW
          </a>
        </li>
        <li>
          <a href="#" data-link-class="transfer-token-active">
            <img class="mr-8" src="~/assets/img//transfer.png" alt="transfer" />
            TRANSFER AFRITOKEN
          </a>
        </li>
        <li class="active">
          <a href="#" class="mt-8">
            <img class="mr-8" src="~/assets/img//home.png" alt="" />
            HOME
          </a>
        </li>
        <li>
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//side-wallet.png" alt="" />
            WALLET
          </a>
        </li>
        <li>
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//mart.png" alt="" />
            MART
          </a>
        </li>
        <li>
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//side-exchange.png" alt="" />
            EXCHANGE
          </a>
        </li>
        <li>
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//chat.png" alt="" />
            CHAT
          </a>
        </li>
        <li>
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//setting.png" alt="" />
            SETTING
          </a>
        </li>
        <li>
          <a href="" class="mt-8">
            <img class="mr-8" src="~/assets/img//exit.png" alt="" />
            EXIT
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
      }),
    },
  }
</script>
