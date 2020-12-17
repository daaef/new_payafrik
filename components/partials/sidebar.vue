<template>
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
            <img class="mr-20" src="~/assets/img//side-exchange.png" alt="" />
            Exchange
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/transactions">
          <a href="#">
            <img class="mr-20" src="~/assets/img//trans.png" alt="" />
            Transactions
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/power">
          <a href="#">
            <img class="mr-20" src="~/assets/img//turn-on.png" alt="" />
            Power
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/buy-crypto">
          <a href="#">
            <img class="mr-20" src="~/assets/img//buy-crypto.png" alt="" /> Buy
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

<style scoped></style>
