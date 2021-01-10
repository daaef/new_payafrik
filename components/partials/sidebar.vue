<template>
  <aside>
    <div class="links--and--logo">
      <div class="logo">
        <nuxt-link to="/">
          <img src="~/assets/img//logo.png" alt="logo" />
        </nuxt-link>
      </div>
      <ul class="top--links">
        <nuxt-link tag="li" to="/">
          <a href="#">
            <img class="mr-20" src="~/assets/img//home.png" alt="" /> Home
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/wallet">
          <a href="#">
            <img class="mr-20" src="~/assets/img//side-wallet.png" alt="" />
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
            <img class="mr-20" src="~/assets/img/side_swap_crypto.png" alt="" />
            Swap Crypto
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/transactions">
          <a href="#">
            <img class="mr-20" src="~/assets/img//transaction_new.png" alt="" />
            Transactions
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/power">
          <a href="#">
            <img class="mr-20" src="~/assets/img//power.png" alt="" />
            Power
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/buy-crypto">
          <a href="#">
            <img class="mr-20" src="~/assets/img//buy_crypto.png" alt="" /> Buy
            Crypto
          </a>
        </nuxt-link>
      </ul>
    </div>
    <ul class="main-links">
      <li>
        <nuxt-link to="/support">
          <img class="mr-20" src="~/assets/img//chat.png" alt="" />
          Support
        </nuxt-link>
      </li>
      <li>
        <a href="#" @click="$auth.logout()">
          <img class="mr-20" src="~/assets/img//exit.png" alt="" /> Exit
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'Sidebar',
  }
</script>

<style scoped lang="scss">
  aside {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      height: 90%;
      width: 0.5px;
      transform: translateY(-50%);
      background: rgba(128, 128, 128, 0.16);
    }
  }
  .links--and--logo {
    height: calc(100% - 150px);
    width: 200px;
    .top--links {
      max-height: calc(100% - 120px);
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  .main-links {
    width: 200px;
  }
</style>
