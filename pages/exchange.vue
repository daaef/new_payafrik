<template>
  <section class="dash-body">
    <div class="exchange--content">
      <div class="w-100">
        <form class="w-100">
          <div class="flex flex-between flex-middle w-100">
            <div class="exchange">
              <span class="muted mb-20 d-block">Exchange</span>
              <div>
                <img src="~/assets/img/Africoin.png" alt="" />
                <input
                  id="exchange-afk"
                  type="text"
                  placeholder="0.00 AFK | $0.00 USD"
                />
                <label for="exchange-afk"
                  >AFK <span class="c-white">Africoin</span></label
                >
                <div class="exchange--dropdown"></div>
              </div>
              <div class="line--input mt-64 mb-4">
                <input type="text" class="c-afk" placeholder="0.00" />
                <span class="wallet--name">AFK</span>
              </div>
              <div class="sending--amnt flex flex-between">
                <span class="amount c-white">0.00</span>
                <span class="currency c-white">USD</span>
              </div>
            </div>
            <div class="exchange--btn">
              <a href="#">
                <img src="~/assets/img/exchangebtn.png" alt="" />
              </a>
            </div>
            <div class="recieve">
              <span class="muted mb-20 d-block">Recieve</span>
              <div>
                <img src="~/assets/img/bitcoin.png" alt="" />
                <input
                  id="exchange-btc"
                  type="text"
                  placeholder="1 AFK = 0.0010457 BTC"
                />
                <label for="exchange-btc"
                  >BTC <span class="c-white">Bitcoin</span></label
                >
              </div>
              <div class="line--input mt-64 mb-4">
                <input type="text" class="c-btc" placeholder="0.00" />
                <span class="wallet--name">BTC</span>
              </div>
              <div class="sending--amnt flex flex-between">
                <span class="amount c-white">0.00</span>
                <span class="currency c-white">USD</span>
              </div>
            </div>
          </div>
        </form>
        <div class="exchange--breakdown flex-middle">
          <div class="exchange-breakdown text-right">
            <div class="mb-16">
              <img src="~/assets/img/Africoin.png" height="50" alt="" />
            </div>
            <div>
              <span class="c-white mb-4 d-block">You are exchanging</span>
              <h2 class="c-afk">0.00 AFK</h2>
              <span class="small-text c-white">$0.00</span>
            </div>
          </div>
          <div class="arrow--breakdown">
            <img src="~/assets/img/right.png" alt="" />
          </div>
          <div class="recieve-breakdown text-left">
            <div class="mb-16">
              <img src="~/assets/img/bitcoin.png" height="50" alt="" />
            </div>
            <div>
              <span class="c-white mb-4 d-block">You will receive</span>
              <h2 class="c-btc">0.00 BTC</h2>
              <span class="small-text c-white">$0.00</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-20 sub--btn--holder">
          <div class="sub-button mt-20">
            <button class="w-100">EXCHANGE</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
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
      }),
    },
    methods: {
      toggleChatBox() {
        this.$store.commit('global/toggleChatBox')
      },
      toggleTokenModal() {
        this.$store.commit('global/toggleTokenModal')
      },
      ...mapMutations({
        toggleChatBox: 'toggleChatBox',
      }),
    },
  }
</script>
