<template>
  <div
    :class="[
      { 'buy-token-active': buyTokenActive },
      { 'withdraw-active': withdrawActive },
      { 'transfer-token-active': transferTokenActive },
      { 'wallet-modal-active': walletModalActive },
      { 'profile--active': profileModalActive },
      'my-canvas',
    ]"
  >
    <!--<div class="buy&#45;&#45;token&#45;&#45;modal">
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
              <h1>2,500.24</h1>
              <p class="light">1 AFK TOKEN = 1.00 NGN</p>
            </div>
            <div class="token&#45;&#45;description">
              <p class="c-white">
                You can use AFK tokens to carry out transactions on this
                platform from purchasing utilities to other items in our mart.
                you can also transfer them to your AFK mastercard and make
                payments on physical machines or withdraw from an ATM.
              </p>
            </div>
            <div class="cash&#45;&#45;crypto&#45;&#45;btns">
              <div>
                <div class="sub-button mr-50">
                  <button>BUY WITH CASH</button>
                </div>

                <div class="sub-button ml-56">
                  <button>BUY WITH CRYPTO</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <BuyToken />
    <div class="profile--modal">
      <UserProfile />
    </div>
    <div class="withdraw--page--transfer--modals">
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
              <h1>2,500.24</h1>
              <p class="light">1 AFK TOKEN = 1.00 NGN</p>
            </div>
            <div class="account--smart-card">
              <div class="bank--account">
                <h1 class="form-title text-right am-type c-white">
                  to Bank Account
                </h1>
                <form>
                  <div>
                    <img src="~/assets/img//bank.png" alt="" />
                    <input
                      id="bank"
                      type="text"
                      placeholder="The bank you are transferring to"
                    />
                    <label for="bank">Bank</label>
                  </div>
                  <div class="mt-20">
                    <img src="~/assets/img//recipient.png" alt="" />
                    <input
                      id="recipient"
                      type="text"
                      placeholder="The phone number of the user you are transferring to"
                    />
                    <label for="recipient"
                      >Recipients
                      <span class="c-white">Phone number</span></label
                    >
                  </div>
                  <div class="mt-20">
                    <img src="~/assets/img//tokenam.png" alt="" />
                    <input
                      id="token"
                      type="text"
                      placeholder="How much you want to transfer"
                    />
                    <label for="token"
                      >Token <span class="c-white">Amount</span></label
                    >
                  </div>
                  <div class="text-right sub--btn--holder">
                    <div class="sub-button mt-20">
                      <button>WITHDRAW TO BANK</button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="smart--card">
                <h1 class="form-title text-left am-type c-white">
                  to smart Card
                </h1>
                <form>
                  <div>
                    <img src="~/assets/img//user_name.png" alt="" />
                    <input
                      id="uname"
                      type="text"
                      placeholder="The user you are transferring to"
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
                    />
                    <label for="recsma"
                      >Recipients
                      <span class="c-white">Card number</span></label
                    >
                  </div>
                  <div class="mt-20">
                    <img src="~/assets/img//tokensmartam.png" alt="" />
                    <input
                      id="tokam"
                      type="text"
                      placeholder="How much you want to transfer"
                    />
                    <label for="tokam"
                      >Token <span class="c-white">Amount</span></label
                    >
                  </div>
                  <div class="sub-button mt-20">
                    <button>WITHDRAW TO CARD</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="main-content">
        <aside>
          <div class="links--and--logo">
            <div class="logo">
              <img src="~/assets/img//logo.png" alt="logo" />
            </div>
            <ul>
              <nuxt-link tag="li" to="/">
                <a href="#">
                  <img class="mr-20" src="~/assets/img//home.png" alt="" /> Home
                </a>
              </nuxt-link>
              <nuxt-link tag="li" to="/wallet">
                <a href="#">
                  <img
                    class="mr-20"
                    src="~/assets/img//side-wallet.png"
                    alt=""
                  />
                  Wallet
                </a>
              </nuxt-link>
              <nuxt-link tag="li" to="/mart">
                <a href="#">
                  <img class="mr-20" src="~/assets/img//mart.png" alt="" /> Mart
                </a>
              </nuxt-link>
              <nuxt-link tag="li" to="/exchange">
                <a href="#">
                  <img
                    class="mr-20"
                    src="~/assets/img//side-exchange.png"
                    alt=""
                  />
                  Exchange
                </a>
              </nuxt-link>
              <li>
                <a href="#">
                  <img class="mr-20" src="~/assets/img//chat.png" alt="" /> Chat
                </a>
              </li>
            </ul>
          </div>
          <ul class="main-links">
            <li>
              <a href="#">
                <img class="mr-20" src="~/assets/img//setting.png" alt="" />
                Setting
              </a>
            </li>
            <li>
              <a href="#">
                <img class="mr-20" src="~/assets/img//exit.png" alt="" /> Exit
              </a>
            </li>
          </ul>
        </aside>
        <main>
          <header>
            <nav>
              <div class="balance">
                <img
                  src="~/assets/img//logo.png"
                  class="mobile-logo"
                  alt="logo"
                />
                <span>AfriToken:</span>
                <h3>{{ +userDetails.balance }}</h3>
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
                    <img
                      class="mr-8"
                      src="~/assets/img//wallet.png"
                      alt="wallet"
                    />
                    WITHDRAW
                  </a>
                </li>
                <li class="mr-32">
                  <a href="#" @click="$store.commit('setTransferToken')">
                    <img
                      class="mr-8"
                      src="~/assets/img//transfer.png"
                      alt="transfer"
                    />
                    TRANSFER AFRITOKEN
                  </a>
                </li>
                <li>
                  <a href="#" @click="$store.commit('setTransferToken')">
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
                  <img
                    class="mr-12"
                    src="~/assets/img//user.png"
                    alt="user icon"
                  />
                  <span>+{{ userDetails.username }}</span>
                </a>
              </div>
              <input
                id="navi-toggle"
                type="checkbox"
                class="navigation__checkbox"
              />

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
                      <img
                        class="mr-8"
                        src="~/assets/img//plus.png"
                        alt="plus"
                      />
                      BUY TOKEN
                    </a>
                  </li>
                  <li>
                    <a href="#" data-link-class="withdraw-active">
                      <img
                        class="mr-8"
                        src="~/assets/img//wallet.png"
                        alt="wallet"
                      />
                      WITHDRAW
                    </a>
                  </li>
                  <li>
                    <a href="#" data-link-class="transfer-token-active">
                      <img
                        class="mr-8"
                        src="~/assets/img//transfer.png"
                        alt="transfer"
                      />
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
                      <img
                        class="mr-8"
                        src="~/assets/img//side-wallet.png"
                        alt=""
                      />
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
                      <img
                        class="mr-8"
                        src="~/assets/img//side-exchange.png"
                        alt=""
                      />
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
                      <img
                        class="mr-8"
                        src="~/assets/img//setting.png"
                        alt=""
                      />
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
                    <img
                      class="mr-12"
                      src="~/assets/img//user.png"
                      alt="user icon"
                    />
                    <span>+{{ userDetails.username }}</span>
                  </a>
                </div>
              </div>
            </nav>
          </header>
          <Nuxt />
        </main>
      </section>
      <section class="transfer--modal">
        <a
          href="#"
          class="modal-close"
          @click="$store.commit('setTransferToken')"
        >
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
              <h1>2,500.24</h1>
              <p class="light">1 AFK TOKEN = 1.00 NGN</p>
            </div>
            <div class="transfer--info flex flex-center">
              <form class="text-center">
                <div class="mt-20">
                  <img src="~/assets/img//recipient.png" alt="" />
                  <input
                    id="rec-phone"
                    type="text"
                    placeholder="The phone number of the user you are transferring to"
                  />
                  <label for="rec-phone"
                    >Recipients <span class="c-white">Phone number</span></label
                  >
                </div>
                <div class="mt-20">
                  <img src="~/assets/img//tokenam.png" alt="" />
                  <input
                    id="token-am"
                    type="text"
                    placeholder="How much you want to transfer"
                  />
                  <label for="token-am"
                    >Token <span class="c-white">Amount</span></label
                  >
                </div>
                <div class="text-right sub--btn--holder w-100">
                  <div class="sub-button mt-20 w-100">
                    <button class="w-100">TRANSFER</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import UserProfile from '~/components/partials/user-profile'
  import BuyToken from '~/components/partials/buy-token'

  export default {
    components: { UserProfile, BuyToken },
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
