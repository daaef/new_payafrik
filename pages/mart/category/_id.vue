<template>
  <section class="dash-body">
    <div v-if="!loadingBillers && billers.length > 0">
      <div class="welcome-text">
        <div class="text-center">
          <p class="w-100 c-white">Billers for</p>
          <h1 class="w-100 c-white am-type mt-0 mb-0">
            {{ billers[0].categoryname }}
          </h1>
        </div>
      </div>

      <div class="w-100">
        <ul class="card-links row">
          <li
            v-for="biller of billers"
            :key="biller.billerid"
            class="link-card no-img"
          >
            <div class="mt-20 w-100">
              <i class="fas fa-angle-right c-white fa-2x"></i>
              <a @click="setBillerAndNavigate(biller)">
                <p class="higlight">{{ biller.billername }}</p>
                <p class="desc c-white mb-8">
                  {{ biller.categoryname }}
                </p>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="!loadingBillers && billers.length === 0"
      class="text-center mt-5"
    >
      <img class="empty-state" src="~/assets/img/no_data.svg" />
      <p class="c-white">Sorry! No billers found for this category</p>
    </div>
    <div v-if="loadingBillers" class="text-center mt-5">
      <i class="fas fa-circle-notch fa-spin fa-lg c-white mb-3"></i>
      <p class="c-white">Loading billers...</p>
    </div>
  </section>
  <!-- <div>
        <div  v-if="!loadingBillers && billers.length > 0"  class="container paddingTop50 mainbody">
          <div class="headerTitle">
            <nuxt-link to="/user-area/mart"><img src="../../../../assets/img/back.png" alt="" /></nuxt-link>
            <p class="mainTitle">{{billers[0].categoryname}} Billers</p>
          </div>
          <div class="dividerdark"></div>
          <div class="paddingTop20"></div>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div v-for="biller of billers" v-bind:key="biller.billerid" class="col-md-4">
                    <div class="billercard">
                      <div class="cardrow">
                        <div class="imgHolder">
                        </div>
                        <div class="content">
                          <p>{{biller.billername}}</p>
                          <p class="cat">Category: {{biller.categoryname}}</p>
                          <div class="pay">
                            <a @click='setBillerAndNavigate(biller)'>See Payment Items</a>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div v-if="!loadingBillers && billers.length === 0" class="text-center mt-5">
            <img class="empty-state" src="../../../../assets/img/no_data.svg">
            <p class="c-white">Sorry! No billers found for this category</p>
        </div>
        <div v-if="loadingBillers" class="text-center mt-5">
            <i class="fas fa-circle-notch fa-spin fa-lg c-white mb-3"></i>
            <p class="c-white">Loading billers...</p>
        </div>
    </div> -->
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    layout: 'main',
    middleware: 'query',
    components: {},
    data() {
      return {
        interswitchBaseUrl: process.env.interswitchBaseUrl,
        categoryId: this.$route.params.id,
        loadingBillers: false,
        billers: [],
      }
    },
    beforeMount() {
      this.getCategoryBillers()
    },
    methods: {
      async getCategoryBillers() {
        this.loadingBillers = true
        try {
          const billersResponse = await this.$axios.$get(
            this.interswitchBaseUrl + 'billers/category/' + this.categoryId
          )
          console.log(billersResponse)
          if (billersResponse.status === true && billersResponse.data) {
            this.billers = billersResponse.data
          } else {
            this.billers = []
          }
          this.loadingBillers = false
        } catch (e) {
          // this.$toast.error(e.response.data.error)
          this.loadingBillers = false
          console.log(e)
        }
      },

      ...mapMutations({
        toggleChatBox: 'setActiveBiller',
      }),

      setBillerAndNavigate(biller) {
        this.$store.commit('setActiveBiller', biller)
        console.log('working here...')
        this.$router.push({
          name: 'mart-biller-id',
          params: {
            id: biller.billerid,
          },
        })
      },
    },
  }
</script>

<style scoped>
  /* p{
     color:#1a1919 !important;
 }
 .md-title h6{
     color:#332c2c;
     font-weight:500;
 } */
  .imgHolder {
    min-height: 100px;
  }
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
