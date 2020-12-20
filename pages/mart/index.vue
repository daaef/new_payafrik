<template>
  <section class="dash-body">
    <div>
      <div class="welcome-text">
        <div class="text-center">
          <p class="w-100 c-white">payafrik</p>
          <h1 class="w-100 c-white am-type mt-0 mb-0">Mart</h1>
        </div>
      </div>
      <ul class="card-links">
        <li class="link-card mt-20">
          <nuxt-link :to="{ name: 'mart-category-id', params: { id: 1 } }">
            <div class="imge">
              <img src="~/assets/img/bills.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Pay your bills for utilities &amp; services
            </p>
            <p class="higlight text-center">Utilities</p>
          </nuxt-link>
        </li>
        <li class="link-card mt-20">
          <nuxt-link :to="{ name: 'mart-category-id', params: { id: 2 } }">
            <div class="imge">
              <img src="~/assets/img/purse.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Pay your cable TV bills here
            </p>
            <p class="higlight text-center">Cable TV</p>
          </nuxt-link>
        </li>
        <li class="link-card mt-20">
          <nuxt-link :to="{ name: 'mart-category-id', params: { id: 3 } }">
            <div class="imge">
              <img src="~/assets/img/mobile-recharge.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Recharge your mobile devices
            </p>
            <p class="higlight text-center">Mobile Recharge</p>
          </nuxt-link>
        </li>
        <li class="link-card mt-20">
          <nuxt-link :to="{ name: 'mart-category-id', params: { id: 41 } }">
            <div class="imge">
              <img src="~/assets/img/betting.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Recharge your betting accounts
            </p>
            <p class="higlight text-center">Betting &amp; Lottery</p>
          </nuxt-link>
        </li>
        <li class="link-card mt-20">
          <nuxt-link :to="{ name: 'mart-category-id', params: { id: 11 } }">
            <div class="imge">
              <img src="~/assets/img/travels.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Airline tickets &amp; hotel reservations
            </p>
            <p class="higlight text-center">Travel &amp; Hotels</p>
          </nuxt-link>
        </li>
        <li class="link-card mt-20">
          <nuxt-link :to="{ name: 'mart-category-id', params: { id: 13 } }">
            <div class="imge">
              <img src="~/assets/img/online-shop.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Airline Tickets &amp; Hotel reservations
            </p>
            <p class="higlight text-center">Online Shopping</p>
          </nuxt-link>
        </li>
        <li class="link-card mt-20">
          <nuxt-link :to="{ name: 'mart-category-id', params: { id: 33 } }">
            <div class="imge">
              <img src="~/assets/img/school.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Pay your school &amp; Exam Fees
            </p>
            <p class="higlight text-center">School &amp; Exam Fees</p>
          </nuxt-link>
        </li>
        <li class="link-card mt-20">
          <nuxt-link :to="{ name: 'mart-category-id', params: { id: 61 } }">
            <div class="imge">
              <img src="~/assets/img/loan.png" alt="purse" />
            </div>
            <p class="desc c-white text-center mb-8">
              Gain access to credit &amp; Loan Agencies
            </p>
            <p class="higlight text-center">Credit & Loans</p>
          </nuxt-link>
        </li>
      </ul>
      <div class="mt-20 btn-meidum m-0-auto">
        <a
          v-if="!loadingCategories"
          class="btn dashed"
          @click="getBillerCategories"
        >
          + Show more
        </a>
        <a v-if="loadingCategories" class="btn dashed">
          <i class="fas fa-circle-notch fa-spin"></i>
        </a>
      </div>

      <div v-if="moreLoaded" class="w-100 mt-40">
        <ul class="card-links">
          <li
            v-for="category of billerCategories"
            :key="category.categoryId"
            class="link-card no-img"
          >
            <div class="mt-20 w-100">
              <i class="fas fa-angle-right c-white fa-2x"></i>
              <nuxt-link
                :to="{
                  name: 'mart-category-id',
                  params: { id: category.categoryid },
                }"
              >
                <p class="higlight">{{ category.categoryname }}</p>
                <p class="desc c-white mb-8">
                  {{ category.categorydescription }}
                </p>
              </nuxt-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    layout: 'main',
    middleware: 'query',
    components: {},
    data() {
      return {
        baseUrl: process.env.baseUrl,
        interswitchBaseUrl: process.env.interswitchBaseUrl,
        loadingCategories: false,
        loadingBillers: true,
        billerCategories: [],
        billers: [],
        moreLoaded: false,
      }
    },
    computed: {},
    methods: {
      async getBillerCategories() {
        this.loadingCategories = true
        try {
          const categoriesResponse = await this.$axios.$get(
            this.interswitchBaseUrl + 'categories'
          )
          console.log(categoriesResponse)
          if (categoriesResponse.status === true) {
            this.billerCategories = categoriesResponse.data
            this.moreLoaded = true
          }
          this.loadingCategories = false
        } catch (e) {
          // this.$toast.error(e.response.data.error)
          this.loadingCategories = false
          console.log(e)
        }
      },

      async getAllBillers() {
        this.loadingBillers = true
        try {
          const billersResponse = await this.$axios.$get(
            this.interswitchBaseUrl + 'billers'
          )
          console.log(billersResponse)
          if (billersResponse.status === true) {
            this.billers = billersResponse.data
          }
          this.loadingBillers = false
        } catch (e) {
          // this.$toast.error(e.response.data.error)
          this.loadingBillers = false
          console.log(e)
        }
      },

      closeSideBar() {
        this.$store.commit('global/closeSidebar')
      },
      ...mapMutations({
        toggleSidebar: 'global/toggleSidebar',
        closeSideBar: 'global/closeSidebar',
      }),
    },
    beforeMount() {
      // this.getBillerCategories();
      // this.getAllBillers()
    },
  }
</script>

<style scoped>
  .link-card.no-img {
    position: relative;
    width: 90%;
    margin: auto;
  }

  .link-card.no-img i {
    position: absolute;
    top: 40px;
    right: 20px;
    color: #f0c32fb8;
  }
  .card-links .link-card.no-img:hover:after {
    content: '';
    height: 20px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: unset !important;
    opacity: 0.3;
    background-size: 100% 100%;
    background-position: bottom left;
    background-repeat: no-repeat;
  }
</style>
