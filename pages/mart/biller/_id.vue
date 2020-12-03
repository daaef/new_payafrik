<template>
  <section>
    <section class="dash-body">
      <div v-if="!loadingPaymentItems && paymentItems.length > 0">
        <div class="welcome-text">
          <div class="text-center">
            <p class="w-100 c-white">Paynent Items for</p>
            <h1 class="w-100 c-white am-type mt-0 mb-0">
              {{ activeBiller.billername }}
            </h1>
          </div>
        </div>

        <div class="container">
          <ul class="card-links row">
            <li
              v-for="item of paymentItems"
              :key="item.paymentitemid"
              class="col-md-6"
            >
              <div class="link-card no-img mt-20 w-100">
                <!-- <i class="fas fa-angle-right c-white fa-2x"></i> -->
                <a @click="openModal('purchaseModal', item)">
                  <p class="higlight">{{ item.paymentitemname }}</p>
                  <p class="desc c-white mb-8">Click to buy this item</p>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="!loadingPaymentItems && paymentItems.length === 0"
        class="text-center mt-5"
      >
        <img class="empty-state" src="~/assets/img/no_data.svg" />
        <p class="c-white">Sorry! No payment items found for this biller</p>
      </div>
      <div v-if="loadingPaymentItems" class="text-center mt-5">
        <i class="fas fa-circle-notch fa-spin fa-lg c-white mb-3"></i>
        <p class="c-white">Loading payment items...</p>
      </div>
    </section>
    <!-- <div class="container">
            <div class="row mb-3">
                <div v-if="!loadingPaymentItems && paymentItems.length > 0" class="col-md-6">
                    <h6 class="text-uppercase mt-4">Payment items for {{activeBiller.billername}}</h6>
                    <div class="underline"></div>
                </div>
                <div class="col-md-2"></div>
                <div v-if="!loadingPaymentItems && paymentItems.length > 0" class="col-md-4">
                    <input type="text" placeholder="Filter payment items" class="pull-right">
                </div>
            </div>

            <div v-if="loadingPaymentItems" class="text-center mt-5">
                <i class="fas fa-circle-notch fa-spin fa-lg text-grey mb-3"></i>
                <p class="text-grey">Loading payment items...</p>
            </div>

            <div v-if="!loadingPaymentItems && paymentItems.length === 0" class="text-center mt-5">
                <img class="empty-state" src="../../../../assets/img/no_data.svg">
                <p class="text-grey">Sorry! No payment items found for this biller</p>
            </div>

            <div class="row" v-if="!loadingPaymentItems && paymentItems.length > 0">
                <div v-for="item of paymentItems" v-bind:key="item.paymentitemid" class="col-md-4 mb-4">
                    <div class="shadowed-box wrapper border-light">
                        <div class="md-title">
                            <h6>{{item.paymentitemname}}</h6>
                        </div>
                        <a @click="openModal('purchaseModal', item)">Buy this item</a>
                    </div>
                </div>
            </div>
       </div> -->

    <!-- Purchase Modal -->

    <a-modal
      :visible="purchaseModal"
      :confirm-loading="makingPayment"
      centered
      @cancel="purchaseModal = false"
    >
      <template slot="title">
        <h3 class="c-white">
          Payment
          <span v-if="!paymentSuccess && !paymentFailed"
            >for {{ activeItem.paymentitemname }}</span
          >
          <span v-if="paymentSuccess">Successful!</span>
          <span v-if="paymentFailed">Failed!</span>
        </h3>
      </template>
      <transition name="appear" mode="in-out">
        <div v-if="!paymentSuccess && !paymentFailed">
          <form class="w-100 mt-20 request--card" action="">
            <div>
              <div class="mt-12">
                <input
                  id="fname"
                  v-model="paymentDetails.phone"
                  type="number"
                  placeholder="Your Phone Number"
                />
                <label for="fname"
                  >Phone <span class="c-white">number</span></label
                >
              </div>
              <div class="mt-12">
                <input
                  id="lname"
                  v-model="paymentDetails.email"
                  type="email"
                  placeholder="Your email address"
                />
                <label for="lname"
                  >Email <span class="c-white">Address</span></label
                >
              </div>
              <div class="mt-12">
                <input
                  id="add1"
                  v-model="paymentDetails.customerId"
                  type="text"
                  placeholder="Address Line 1"
                />
                <label for="add1">
                  Beneficiary:
                  <span class="c-white">
                    <strong class="text-uppercase">
                      {{ activeBiller.customerfield1 }}
                    </strong>
                  </span>
                </label>
              </div>
              <div class="mt-12">
                <input
                  id="add2"
                  v-model="paymentDetails.amount"
                  type="number"
                  :disabled="activeItem.fixed"
                  placeholder="Address Line 2"
                />
                <label for="add2"> Amount </label>
              </div>
            </div>
          </form>
        </div>
        <div v-if="paymentSuccess">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <img
                  src="https://img.icons8.com/color/80/000000/checked--v1.png"
                />
                <h6 class="success mt-2">Transaction Successful</h6>
                <p class="mt-2">
                  Transaction Reference:
                  <strong>{{ pfkTransactionRef }}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="paymentFailed">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <img src="https://img.icons8.com/office/80/000000/cancel.png" />
                <h6 class="failed mt-2">Transaction Failed</h6>
                <p class="mt-2">
                  Transaction Reference: <strong>12345678</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <template slot="footer">
        <button
          v-if="!paymentSuccess && !paymentFailed"
          key="submit"
          class="w-100 inter__btn"
          type="submit"
          @click="checkTokenBalance"
        >
          <span v-if="makingPayment" class="mr-8">
            <a-spin>
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 24px; color: #1c27be"
                spin
              />
            </a-spin>
          </span>
          MAKE PAYMENT
        </button>
        <button
          v-if="paymentSuccess || paymentFailed"
          key="submit"
          class="w-100 inter__btn"
          type="submit"
          @click="purchaseModal = false"
        >
          CLOSE
        </button>
      </template>
    </a-modal>
    <!-- Purchase Modal -->
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    middleware: 'query',
    components: {},
    data() {
      return {
        interswitchBaseUrl: process.env.interswitchBaseUrl,
        baseUrl: process.env.baseUrl,
        billerId: this.$route.params.id,
        loadingPaymentItems: false,
        paymentItems: [],
        formErrors: {},
        activeItem: {},
        makingPayment: false,
        paymentDetails: {},
        paymentSuccess: false,
        paymentFailed: false,
        purchaseModal: false,
        pfkTransactionRef: '',
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      ...mapGetters({
        activeBiller: 'activeBiller',
        activeCurrency: 'activeCurrency',
      }),
    },
    beforeMount() {
      this.getBillersItems()
      this.closeModal('purchaseModal')
      if (
        Object.entries(this.activeBiller).length === 0 &&
        this.activeBiller.constructor === Object
      ) {
        this.$router.push('/mart')
      }
    },
    mounted() {
      // set initial values for phone and email
      this.paymentDetails = {
        phone: this.userDetails.phone,
        email: this.userDetails.email,
      }
    },
    methods: {
      handleChange(value) {
        console.log(value)
      },
      handleBlur() {
        console.log('blur')
      },
      handleFocus() {
        console.log('focus')
      },
      openModal(modalId, item) {
        if (item.amount !== '0') {
          this.paymentDetails.amount = +item.amount / 100
          item.fixed = true
        }
        this.activeItem = item
        this.purchaseModal = true
        /*  $('#' + modalId).modal('show')
        $('.modal-backdrop').hide() */
      },
      closeModal(modalId) {
        this.activeItem = {}
        this.paymentSuccess = false
        this.paymentFailed = false
        this.makingPayment = false
        /* $('#' + modalId).modal('hide') */
      },

      async getBillersItems() {
        this.loadingPaymentItems = true
        try {
          const paymentItemsResponse = await this.$axios.$get(
            this.interswitchBaseUrl + 'biller/' + this.billerId
          )
          console.log(paymentItemsResponse)
          if (
            paymentItemsResponse.status === true &&
            paymentItemsResponse.data
          ) {
            this.paymentItems = paymentItemsResponse.data
          } else {
            this.paymentItems = []
          }
          this.loadingPaymentItems = false
        } catch (e) {
          // this.$toast.error(e.response.data.error)
          this.loadingPaymentItems = false
          console.log(e)
        }
      },
      checkTokenBalance() {
        if (
          !this.paymentDetails.customerId ||
          this.paymentDetails.customerId === '' ||
          !this.paymentDetails.phone ||
          this.paymentDetails.phone === '' ||
          !this.paymentDetails.email ||
          this.paymentDetails.email === '' ||
          !this.paymentDetails.amount ||
          this.paymentDetails.amount === ''
        ) {
          this.$toast.error('Please check missing fields')
          return
        }
        this.makingPayment = true
        // console.log('usertokenbalance: ', this.userDetails.balance);
        // console.log('paymentamount: ', this.paymentDetails.amount);

        if (+this.paymentDetails.amount > +this.userDetails.balance) {
          this.$toast.error(
            'Sorry, you do not have enough tokens to purchase this item'
          )
          this.makingPayment = false
        } else {
          this.validateCustomer()
        }
      },
      async validateCustomer() {
        this.makingPayment = true
        const payload = {
          customerId: this.paymentDetails.customerId,
          paymentCode: this.activeItem.paymentCode,
        }
        try {
          const validationResponse = await this.$axios.$post(
            this.interswitchBaseUrl + 'validate-customer',
            payload
          )
          console.log('Signup Response', validationResponse)
          if (validationResponse.status === true) {
            this.sendPaymentAdvice()
          }
        } catch (e) {
          this.$toast.error(e.response.data.detail)
          this.makingPayment = false
        }
      },
      async sendPaymentAdvice() {
        this.makingPayment = true
        const headers = {
          'Content-Type': 'application/json',
          'pfk-user-token': this.$auth.getToken('local'),
        }

        const payload = {
          paymentCode: this.activeItem.paymentCode,
          customerId: this.paymentDetails.customerId,
          customerMobile: this.paymentDetails.phone,
          customerEmail: this.paymentDetails.email,
          amount: (this.paymentDetails.amount * 100).toString(),
        }
        try {
          const adviceResponse = await this.$axios.$post(
            this.interswitchBaseUrl + 'payment-advice',
            payload,
            { headers }
          )
          console.log('Signup Response', adviceResponse)
          if (
            adviceResponse.status === true &&
            adviceResponse.data.responseCodeGrouping === 'SUCCESSFUL'
          ) {
            // const transactionRef = adviceResponse.data.payafrikTransactionRef
            this.pfkTransactionRef = adviceResponse.data.payafrikTransactionRef
            this.$toast.success('Successful')
            this.paymentSuccess = true
          }
        } catch (e) {
          console.log(e.response)
          this.paymentFailed = true
          if (e.response.data.name) {
            this.$toast.error(
              e.response.data.name + ': ' + e.response.data.message
            )
          } else {
            this.$toast.error(e.response.data.message)
          }
          this.makingPayment = false
        }
      },

      async getUserDetails() {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }

        try {
          const updatedUserDetails = await this.$axios.$get(
            this.baseUrl + 'auth/user/profile/',
            { headers }
          )
          updatedUserDetails.token = this.$auth.getToken('local')
          console.log('User ==>', updatedUserDetails)
          this.authenticate(updatedUserDetails)
        } catch (e) {
          this.$toast.error(e.response.data.detail)
          this.importingWallet = false
          console.log(e.response)
        }
      },

      async queryTransaction(transactionRef) {
        try {
          const paymentItemsResponse = await this.$axios.$get(
            this.interswitchBaseUrl + 'query-transaction/' + transactionRef
          )
          console.log(paymentItemsResponse)
          if (
            paymentItemsResponse.status === true &&
            paymentItemsResponse.data
          ) {
            this.paymentItems = paymentItemsResponse.data
          } else {
            this.paymentItems = []
          }
          this.loadingPaymentItems = false
        } catch (e) {
          // this.$toast.error(e.response.data.error)
          this.loadingPaymentItems = false
          console.log(e)
        }
      },
    },
  }
</script>

<style scoped>
  .md-title h6 {
    color: #332c2c;
    font-weight: 500;
  }

  .card-links li {
    padding: 10px;
  }
  .modal-title {
    font-size: 1.2em;
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

  p {
    color: #fff !important;
  }

  input {
    color: #ffffff99;
    border: solid 2px #3341ff;
    padding-left: 15px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    width: 100%;
    margin-bottom: 10px;
  }

  #purchaseModal .modal-content {
    background-color: #131c4b;
    border: dashed 1px #4451ff;
    box-shadow: 25px 25px 100px #00000044;
    padding: 0;
    color: #fff;
  }

  .input-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  /* button.greyed-btn{
        font-weight:500;
        background-color: #f1f1f1;
        width: inherit!important;
    } */

  .input-file + label {
    font-size: 0.8em;
    font-weight: 500;
    color: #8190ca;
    background-color: #111a3f !important;
    display: inline-block;
    transition: all ease 200ms;
    padding: 20px;
    border-radius: 3px;
    width: 100%;
  }

  .input-file:focus + label,
  .input-file + label:hover {
    background-color: #d4d1d1;
  }

  .input-file + label {
    cursor: pointer; /* "hand" cursor */
  }

  #purchaseModal .modal-header {
    margin-bottom: 15px;
    border: none !important;
  }

  #purchaseModal .modal-header button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }

  #purchaseModal .modal-header h5 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.2em;
  }

  #purchaseModal .modal-footer {
    border: none !important;
  }

  #purchaseModal .modal-footer button {
    background: #11154b;
    color: #f6f6f6;
    border: solid #2832c3;
    padding: 10px 40px;
    border-radius: 25px;
    cursor: pointer;
  }

  #purchaseModal .modal-footer button.greyed-btn {
    border: solid transparent;
  }
</style>
