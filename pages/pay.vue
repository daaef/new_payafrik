<template>
  <section class="main-content">
    <main class="full">
      <section class="dash-body">
        <!-- <a href="#" class="modal-close">
          <img src="../assets/img/close.png" alt="" />
        </a> -->

        <div class="auth--content mt-5">
          <div v-if="processing" class="col-lg-6 ml-auto mr-auto text-center">
            <i class="fas fa-circle-notch fa-spin text-white mt-5 fa-spin fa-lg" />
            <p class="text-white mt-3">Preparing your payment</p>
          </div>
          <div v-if="!processing" class="col-lg-6 ml-auto mr-auto">
            <div class="w-100">
              <form class="w-100">
                <div class="w-100">
                  <div class="welcome-text">
                    <div class="text-center">
                      <p class="w-100 c-white">Your</p>
                      <h1 class="w-100 c-white am-type mt-0 mb-50">
                        Payment Details
                      </h1>
                    </div>
                  </div>
                  <div class="exchange centerdiv text-center mb-20">
                    <p>You are about to pay</p>
                    <h3 class="warn">N{{ amountToPay/100 | formatNumber}}</h3>
                    <hr />
                    <p>for</p>
                    <h5 class="text-white">{{tokens | formatNumber}}</h5>
                    <p>AfriTokens</p>
                  </div>

                  <div class="text-center  sub--btn--holder">
                    <div class="sub-button">
                      <!-- <button>
                        <img src="../assets/img/interswitch_icon.png" />
                        <span class="ml-2">Pay now with Interswitch</span>
                      </button> -->
                      <form
                        name="form1"
                        action="https://webpay.interswitchng.com/collections/w/pay"
                        method="post"
                    >
                        <input name="product_id" v-model="productId" type="hidden" />
                        <input
                        name="pay_item_id"
                        v-model="paymentItemId"
                        type="hidden"
                        />
                        <input name="amount" v-model="amountToPay" type="hidden" />
                        <input name="currency" v-model="currency" type="hidden" />
                        <input
                        name="site_redirect_url"
                        v-model="redirectUrl"
                        type="hidden"
                        />
                        <input name="txn_ref" v-model="transactionRef" type="hidden" />
                        <input name="cust_id" v-model="customerId" type="hidden" />
                        <input name="cust_name" v-model="customerName" type="hidden" />
                        <input name="hash" v-model="transactionHash" type="hidden" />
                        <button class="w-100" type="submit">
                        <img
                            src="../assets/img/interswitch_icon.png"
                            class="mr-2"
                        />PAY WITH INTERSWICH
                        </button>
                    </form>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
// import { mapState } from 'vuex'
import paystack from "vue-paystack";
var sha512 = require("js-sha512");
const jsSHA = require("jssha");

export default {
  components: {
    paystack
  },
  data() {
    return {
      baseUrl: process.env.baseUrl,
      interswitchBaseUrl: process.env.interswitchBaseUrl,
      initiatingPayment: false,
      tokens: this.$route.query.tokens,
      email: "",
      pricePerToken: 1,
      amountToPay: this.$route.query.aik,
      redirectUrl: "",
      transactionRef: "",
      customerId: this.$route.query.cid,
      customerName: this.$route.query.cname,
      userToken: this.$route.query.ca,
      customerEmail: this.$route.query.cmail,
      transactionFor: this.$route.query.for,
      transactionHash: "",
      productId: 22108792,
      paymentItemId: 101,
      currency: 566,
      processing: false,
      fromCurrency: "AFK",
      purchasingWithCrypto: false
    };
  },
  computed: {
    tokenModalActive() {
      return this.$store.state.global.tokenModalActive;
    },
    userDetails() {
      return this.$store.state.authenticatedUser;
    }
  },
  methods: {
    openModal(modalId) {
      $("#" + modalId).modal("show");
      $(".modal-backdrop").hide();
    },

    closeModal(modalId) {
      $("#" + modalId).modal("hide");
    },

    callback: function(response) {
      console.log(response);
    },

    close: function() {
      console.log("Payment closed");
    },

    signOut() {},

    openMenu() {
      let sidebar = document.querySelector(".sidebar_bg");
      sidebar.style.display = "block";
    },

    closeFunctionModal() {
      this.$store.commit("global/closeFunctionModal");
    },

    ...mapMutations({
      toggleChatBox: "global/toggleTokenModal",
      closeFunctionModal: "global/closeFunctionModal"
    }),

    reference() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },

    calculateParams() {
      if (!this.tokens || this.tokens === 0) {
        return;
      }
      this.transactionRef = this.reference();
      this.amountToPay = this.tokens * this.pricePerToken * 100;
      this.redirectUrl =
        // "http://localhost:3000/user-area/payment-done?ref=" +
        "https://portal.payafrik.io/payment-done-mobile?ref=" +
        this.transactionRef +
        "&amount=" +
        this.amountToPay +
        "&prodId=" +
        this.productId + '&ca=' + this.userToken;
      // this.customerId = "CUST" + this.userDetails.username;
      // this.customerName =
      //   this.userDetails.first_name + " " + this.userDetails.last_name;
      const macKey =
        "kP31VzqzzYKmvW7ShN3BNXOP4fQY1AOMeIv5XwiXT7GzBfFhuZ0Yga8iuNh85H7NdAUBNWCtkCopcuLWGOA1NK42DCAeclercLH8L8NgEWh8S9AVZzxD3oPjAjTQ9A5W";
      this.transactionHash = sha512(
        this.transactionRef +
          this.productId +
          this.paymentItemId +
          this.amountToPay +
          this.redirectUrl +
          macKey
      );
      this.generateTransaction()
    },

    async generateTransaction() {
      this.processing = true;
      const payload = {
        amount: +this.amountToPay/100,
        username: this.customerId,
        receiptEmail: this.customerEmail,
        transactionType: "CASH",
        transactionStatus: "PENDING",
        pfkTransactionReference: this.transactionRef,
        interswitchTransactionRef: "",
        channel: "INTERSWITCH",
        transactionFor: this.transactionFor
      };

      const headers = {
        "Content-Type": "application/json",
        "pfk-user-token": this.userToken
      };
      try {
        const response = await this.$axios.$post(
          this.interswitchBaseUrl + "transactions/new",
          payload,
          { headers }
        );
        console.log("request response", response);
        this.processing = false;
        
      } catch (e) {
        console.log(e.response);
        this.$toast.error(e.response.data.error);
        this.processing = false;
      }
    },
  },
  created() {
    this.calculateParams()
  }
};
</script>

<style scoped>
/* .buy--token--modal.active {
  margin-top: 0px !important;
  background-color: #131c4b !important;
} */
.modal-close {
  cursor: pointer;
}

button a {
  color: #fff !important;
}

input {
  padding: 20px;
  color: #ffffff99;
  background: #111a3f;
  border: solid 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  /* width: 100%; */
}

#confirmationModal .modal-content,
#buyWithCryptoModal .modal-content {
  background-color: #131c4b;
  border: dashed 1px #4451ff;
  box-shadow: 25px 25px 100px #00000044;
  padding: 0;
  color: #fff;
}

#confirmationModal .modal-header,
#buyWithCryptoModal .modal-header {
  margin-bottom: 15px;
  border: none !important;
}

#confirmationModal .modal-header button,
#buyWithCryptoModal .modal-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
}

#confirmationModal .modal-header h5,
#buyWithCryptoModal .modal-header h5 {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.2em;
}

#confirmationModal .modal-footer,
#buyWithCryptoModal .modal-footer {
  border: none !important;
}

#confirmationModal .modal-footer button,
#buyWithCryptoModal .modal-footer button {
  background: #11154b;
  color: #f6f6f6;
  border: solid #2832c3;
  padding: 10px 40px;
  border-radius: 25px;
  cursor: pointer;
}

#confirmationModal .modal-footer button.cancel,
#buyWithCryptoModal .modal-footer button.cancel {
  border: solid transparent;
}

p.warn,
span.warn,
a.warn,
h3.warn {
  font-weight: 700 !important;
  color: #f8ae30 !important;
}

button img {
  width: 20px;
}

.exchange {
  position: relative;
}

img.password-toggle-switch {
  position: absolute;
  top: 27px;
  left: 92% !important;
  color: #666;
  z-index: 999;
}

.suffix {
  cursor: pointer;
}

.prefix-icon,
.suffix-icon {
  width: 30px;
  filter: invert();
}

.prefix-icon {
  opacity: 0.5;
}

label {
  color: #0000ff;
}

p {
  color: #ffffffe5;
  margin-top: 15px;
  text-align: center;
}

.dash-body {
  margin-left: 7%;
}

@media (max-width: 768px) {
  .dash-body {
    margin-left: 0;
  }
}

.coin-option {
  border-radius: 10px;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 5px;
  border: 2px solid;
  width: 100%;
  display: block;
}

.coin-option span.rate {
  color: #ffffffaf;
  display: inline-block;
  /* margin-top: 10px; */
  margin-left: 35px;
  font-size: 12px;
}

.coin-option .dropdown-toggle::after {
  /* display: inline-block; */
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
  float: right;
  margin-top: 10px;
}

.coin-option img {
  margin-top: -3px;
}

.coin-option.btc {
  border-color: #f8ae30;
}

.coin-option.btc label,
.dropdown-item.btc label {
  color: #f8ae30;
}

.coin-option.eth {
  border-color: #6d76bc;
}

.coin-option.eth label,
.dropdown-item.eth label {
  color: #6d76bc;
}

.coin-option.afk {
  border-color: #476efb;
}

.coin-option.afk label,
.dropdown-item.eth label {
  color: #476efb;
}

.dropdown.coin-options .dropdown-menu {
  width: 100%;
  padding: 15px;
  background-color: #0b1a4d;
  z-index: 999;
}

.dropdown-item {
  margin-bottom: 10px;
  padding: 5px;
  background-color: transparent;
  display: block;
  position: relative;
}

.dropdown-item label {
  font-size: 13px;
}

.dropdown-item span.rate {
  font-size: 12px;
  /* margin-top: 20px; */
  display: block;
  margin-left: 40px;
}
</style>
