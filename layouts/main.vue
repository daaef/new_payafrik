<template>
  <div
    :class="[
      { 'buy-token-active': buyTokenActive },
      { 'withdraw-active': withdrawActive },
      { 'transfer-token-active': transferTokenActive },
      { 'wallet-modal-active': walletModalActive },
      { 'profile--active': profileModalActive },
      { 'wallet-modal-active': walletSendActive },
      { 'wallet-modal-active': walletRecieveActive },
      'my-canvas',
    ]"
  >
    <BuyToken />
    <div class="profile--modal">
      <UserProfile />
    </div>
    <div class="withdraw--page--transfer--modals">
      <WithdrawModal />
      <section class="main-content">
        <Sidebar />
        <main>
          <Header />
          <Nuxt />
        </main>
      </section>
      <TransferModal />
    </div>
    <WalletModals />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import UserProfile from '~/components/partials/user-profile'
  import BuyToken from '~/components/partials/buy-token'
  import Sidebar from '~/components/partials/sidebar'
  import TransferModal from '~/components/partials/transfer-modal'
  import WithdrawModal from '~/components/partials/withdraw-modal'
  import WalletModals from '~/components/partials/wallet-modals'

  export default {
    components: {
      WalletModals,
      WithdrawModal,
      TransferModal,
      Sidebar,
      UserProfile,
      BuyToken,
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
      }),
    },
  }
</script>
<style lang="scss">
  nav .nav-links img {
    transition: 0.2s ease-in-out;
  }
  nav .nav-links li {
    &:hover img {
      transform: scale(1.5);
    }
  }
</style>
