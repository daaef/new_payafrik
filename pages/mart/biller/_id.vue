<template>
  <section>
    <section class="dash-body">
      <div v-if="!loadingPaymentItems && paymentItems.length > 0">
        <div class="welcome-text">
          <div>
            <p class="w-100 c-white">Payment Items for</p>
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
                <a @click="openModal(item)">
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
        <img class="empty-state" src="~/assets/img/no_data.svg" alt="" />
        <p class="c-white">Sorry! No payment items found for this biller</p>
      </div>
      <div v-if="loadingPaymentItems" class="text-center mt-5">
        <i class="fas fa-circle-notch fa-spin fa-lg c-white mb-3"></i>
        <p class="c-white">Loading payment items...</p>
      </div>
    </section>

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
          <a-form-model
            ref="ruleForm"
            :model="paymentDetails"
            :rules="rules"
            class="w-100 mt-20 request--card"
          >
            <a-form-model-item ref="phone" has-feedback prop="phone">
              <div>
                <a-input
                  id="fname"
                  v-model="paymentDetails.phone"
                  type="number"
                  placeholder="Your Phone Number"
                  @blur="
                    () => {
                      $refs.phone.onFieldBlur()
                    }
                  "
                />
                <label for="fname"
                  >Phone <span class="c-white">number</span></label
                >
              </div>
            </a-form-model-item>
            <a-form-model-item ref="email" has-feedback prop="email">
              <div>
                <a-input
                  id="lname"
                  v-model="paymentDetails.email"
                  type="email"
                  placeholder="Your email address"
                  @blur="
                    () => {
                      $refs.email.onFieldBlur()
                    }
                  "
                />
                <label for="lname"
                  >Email <span class="c-white">Address</span></label
                >
              </div>
            </a-form-model-item>
            <a-form-model-item ref="customerId" has-feedback prop="customerId">
              <div>
                <a-input
                  id="add1"
                  v-model="paymentDetails.customerId"
                  type="text"
                  placeholder="Address Line 1"
                  @blur="
                    () => {
                      $refs.customerId.onFieldBlur()
                    }
                  "
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
            </a-form-model-item>
            <a-form-model-item ref="amount" has-feedback prop="amount">
              <div>
                <a-input
                  id="add2"
                  v-model="paymentDetails.amount"
                  type="number"
                  :disabled="activeItem.fixed"
                  placeholder="Address Line 2"
                  @blur="
                    () => {
                      $refs.amount.onFieldBlur()
                    }
                  "
                />
                <label for="add2"> Amount </label>
              </div>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div v-if="paymentSuccess">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <img
                  src="https://img.icons8.com/color/80/000000/checked--v1.png"
                  alt=""
                />
                <h6 class="success mt-2">Transaction Successful</h6>
                <p class="mt-2">
                  Transaction Reference:
                  <strong>{{ pfkTransactionRef }}</strong>
                </p>
              </div>
              <div v-if="activeBiller.billerid === 'AED'">
                <p>
                  Token: <strong>{{ aedc.pincode }}</strong>
                </p>
                <p>
                  Units: <strong>{{ aedc.units }}</strong>
                </p>
                <p>
                  Operator: <strong>{{ aedc.operatorname }}</strong>
                </p>
                <p>
                  Amount: <strong>{{ aedc.topupamount }}</strong>
                </p>
                <p>
                  Charges: <strong>{{ aedc.ServiceCharge }}</strong>
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
    components: {},
    data() {
      return {
        interswitchBaseUrl: process.env.interswitchBaseUrl,
        superPayBaseUrl: process.env.superPayBaseUrl,
        baseUrl: process.env.baseUrl,
        billerId: this.$route.params.id,
        loadingPaymentItems: false,
        paymentItems: [],
        formErrors: {},
        activeItem: {},
        makingPayment: false,
        paymentDetails: {
          phone: null,
          email: null,
          customerId: null,
          customerfield1: null,
          amount: null,
        },
        rules: {
          phone: [
            {
              required: true,
              message: 'Please Fill in Your Phone Number',
              trigger: 'blur',
            },
          ],
          email: [
            {
              required: true,
              message: 'Please Fill in Your Email',
              trigger: 'blur',
            },
          ],
          customerId: [
            {
              required: true,
              message: 'Please Fill in This Field',
              trigger: 'blur',
            },
          ],
          customerfield1: [
            {
              required: true,
              message: 'Please Fill in This Field',
              trigger: 'blur',
            },
          ],
          amount: [
            {
              required: true,
              message: 'Please input The Amount',
              trigger: 'blur',
            },
          ],
        },
        paymentSuccess: false,
        paymentFailed: false,
        purchaseModal: false,
        pfkTransactionRef: '',
        validated: false,
        validation: {},
        aedc: {},
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
      this.closeModal()
      if (
        Object.entries(this.activeBiller).length === 0 &&
        this.activeBiller.constructor === Object
      ) {
        this.$router.push('../')
      }
    },
    mounted() {
      // set initial values for phone and email
      this.paymentDetails = {
        phone: this.userDetails.phone,
        email: this.userDetails.email,
      }
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 1500)
    },
    methods: {
      authenticate(user) {
        const userLoad = {
          key: 'user',
          value: user,
        }

        this.$store.commit('auth/SET', userLoad)
      },
      checkTokenBalance() {
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
      closeModal(modalId) {
        this.activeItem = {}
        this.paymentSuccess = false
        this.paymentFailed = false
        this.makingPayment = false
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
      handleBlur() {
        console.log('blur')
      },
      handleChange(value) {
        console.log(value)
      },
      handleFocus() {
        console.log('focus')
      },
      openModal(item) {
        if (item.amount !== '0') {
          this.paymentDetails.amount = +item.amount / 100
          item.fixed = true
        }
        this.activeItem = item
        this.purchaseModal = true
      },
      async payForAEDC() {
        console.log('In payForAEDC')
        this.makingPayment = true
        const headers = {
          'Content-Type': 'application/json',
          'pfk-user-token': this.$auth.getToken('local'),
        }
        const payload = {
          tid: this.validation.tid,
          amount: +this.validation.totalamount * 100,
        }

        console.log('Created Payload payForAEDC')
        try {
          const adviceResponse = await this.$axios.$post(
            this.superPayBaseUrl + 'aedc/payment',
            payload,
            { headers }
          )
          console.log('request made payForAEDC')
          console.log('Advice Response', adviceResponse)
          if (adviceResponse.status === true) {
            this.pfkTransactionRef = adviceResponse.data.payafrikTransactionRef
            this.aedc = adviceResponse.data.message
            this.$toast.success('Successful')
            this.paymentSuccess = true
            // this.getUserDetails()
            const headers2 = {
              'Content-Type': 'application/json',
              PFK_AUTH_TOKEN: this.$auth.getToken('local'),
            }
            const getUser = await this.$axios.$get(
              'https://api.payafrik.io/auth/user/profile/',
              { headers2 }
            )

            const userLoad = {
              key: 'user',
              value: getUser,
            }
            this.$store.commit('auth/SET', userLoad)
          }
        } catch (e) {
          console.log('Error In PayEDC')
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

      async validateAEDC() {
        this.makingPayment = true
        const headers = {
          'Content-Type': 'application/json',
          'pfk-user-token': this.$auth.getToken('local'),
        }
        let phoneNumber = this.paymentDetails.phone
        if (this.paymentDetails.phone.charAt[0] === '+') {
          phoneNumber = '0' + this.paymentDetails.phone.substring(3)
        }
        const payload = {
          metreNumber: this.paymentDetails.customerId,
          phone: phoneNumber,
          amount: +this.paymentDetails.amount * 100,
        }
        try {
          const validationResponse = await this.$axios.$post(
            this.superPayBaseUrl + 'aedc/validate-customer',
            payload,
            { headers }
          )
          console.log('validation Response', validationResponse)
          this.validation = validationResponse.data
          if (validationResponse.status === true) {
            console.log('running payForAEDC')
            await this.payForAEDC()
          }
          this.validated = true
          this.makingPayment = false
          this.closeModal()
        } catch (e) {
          this.$toast.error(e.response.data.message)
          this.makingPayment = false
        }
      },
      async validateCustomer() {
        console.log('ACTIVE BILLER=> ', this.activeBiller)
        if (this.activeBiller.billerid === 'AED') {
          await this.$refs.ruleForm.validate(async (valid) => {
            if (valid) {
              await this.validateAEDC()
            }
          })
        } else {
          this.makingPayment = true
          const headers = {
            'Content-Type': 'application/json',
            'pfk-user-token': this.$auth.getToken('local'),
          }

          await this.$refs.ruleForm.validate(async (valid) => {
            if (valid) {
              const payload = {
                customerId: this.paymentDetails.customerId,
                paymentCode: this.activeItem.paymentCode,
              }
              try {
                const validationResponse = await this.$axios.$post(
                  this.interswitchBaseUrl + 'validate-customer',
                  payload,
                  { headers }
                )
                this.closeModal()
                console.log('validation Response', validationResponse)
                if (validationResponse.status === true) {
                  await this.sendPaymentAdvice()
                }
              } catch (e) {
                this.$toast.error(e.response.data.detail)
                this.closeModal()
                this.makingPayment = false
              }
            }
          })
        }
      },
    },
    layout: 'main',
    middleware: 'query',
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
