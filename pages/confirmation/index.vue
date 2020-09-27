<template>
  <!-- <div class="section">
        <div class="container animated fadeIn">
            <div class="row">
                <div class="col-md-5 ml-auto mr-auto">
                    <div class="text-center">
                        <img class="logo" src="../../assets/img/logo.png">
                        <div class="login-container shadowed-box">
                            <h6 class="font-weight-bold">PLEASE VERIFY YOUR PHONE NUMBER TO PROCEED</h6>

                            <input type="text" v-model="verificationCode" v-bind:class="formErrors.verificationCodeError === true ? 'has-error' : ''"         placeholder="Your verification code code (Sent via sms)">

                            <input type="text" v-model="phone" v-bind:class="formErrors.phoneError === true ? 'has-error' : ''" placeholder="Your phone number (with country code ege +234)">
                            <input type="password" v-model="password" v-bind:class="formErrors.passwordError === true ? 'has-error' : ''" placeholder="Your password">

                            <button class="login" v-if="!processing" @click="verifyPhone()">Verify Phone</button>
                            <button class="login" v-if="processing" disabled><i class="fa fa-circle-notch fa-spin"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
  <section class="main-content">
    <main class="full">
      <section class="auth__page dash-body">
        <!-- <a href="#" class="modal-close">
              <img src="img/close.png" alt="" />
            </a> -->
        <!-- <div class="auth--content"> -->
        <div class="col-lg-5 ml-auto mr-auto text-center">
          <div v-if="!resendMode" class="w-100">
            <form class="w-100">
              <div class="w-100">
                <div class="welcome-text">
                  <div class="text-center">
                    <p class="w-100 c-white">Verify your</p>
                    <h1 class="w-100 c-white am-type mt-0 mb-50">
                      Phone number
                    </h1>
                  </div>
                </div>

                <div class="exchange centerdiv">
                  <div>
                    <img
                      class="prefix-icon"
                      src="../../assets/img/iphone.png"
                      alt=""
                    />
                    <input
                      id="exchange-afk"
                      v-model="phone"
                      type="text"
                      placeholder="Enter Registered Phone Number"
                    />
                    <label for="exchange-afk">Phone Number</label>
                    <div class="exchange--dropdown"></div>
                  </div>
                </div>
                <p class="authhint">Please add your phone code (eg: +234)</p>
                <div class="exchange centerdiv">
                  <div>
                    <img
                      class="prefix-icon"
                      src="../../assets/img/right-arrow.png"
                      alt=""
                    />
                    <input
                      v-if="!viewPassword"
                      v-model="password"
                      type="password"
                      id="pin"
                      placeholder="Your 4 Digit PIN"
                    />
                    <input
                      v-if="viewPassword"
                      v-model="password"
                      type="text"
                      id="pin-text"
                      placeholder="Your 4 Digit PIN"
                    />
                    <label for="pin">PIN</label>
                    <!-- <div class="exchange--dropdown "> -->
                    <img
                      @click="toggleViewPassword()"
                      class="suffix-icon suffix password-toggle-switch"
                      src="../../assets/img/view.png"
                      alt=""
                    />
                    <!-- </div> -->
                  </div>
                </div>

                <div class="exchange centerdiv mt-3">
                  <div>
                    <img
                      class="prefix-icon"
                      src="../../assets/img/iphone.png"
                      alt=""
                    />
                    <input
                      id="exchange-afk"
                      v-model="verificationCode"
                      type="text"
                      placeholder="Verification code sent to your SMS"
                    />
                    <label for="exchange-afk">Verification code</label>
                    <div class="exchange--dropdown"></div>
                  </div>
                </div>
                <a @click="resendMode = true"
                  ><p class="authhint">
                    Didnt get the OTP?
                    <span class="reset-color">Click to resend</span>
                  </p>
                </a>

                <div class="text-center mt-20 sub--btn--holder">
                  <div class="sub-button mt-20">
                    <button
                      v-if="!processing"
                      @click="verifyPhone($event)"
                      class="w-100"
                    >
                      Verify phone number
                    </button>
                    <button v-if="processing" disabled class="w-100">
                      verifying...
                    </button>
                  </div>
                </div>
                <div class="text-center mt-20">
                  <nuxt-link to="/signup"
                    ><p class="authhint">
                      New to PayAfrik?
                      <span class="reset-color">Sign Up</span>
                    </p>
                  </nuxt-link>
                </div>
              </div>
            </form>
          </div>

          <div v-if="resendMode" class="w-100">
            <form class="w-100">
              <div class="w-100">
                <div class="welcome-text">
                  <div class="text-center">
                    <p class="w-100 c-white">Resend your</p>
                    <h1 class="w-100 c-white am-type mt-0 mb-50">OTP</h1>
                  </div>
                </div>

                <div class="exchange centerdiv">
                  <div>
                    <img
                      class="prefix-icon"
                      src="../../assets/img/iphone.png"
                      alt=""
                    />
                    <input
                      id="exchange-afk"
                      v-model="phone"
                      type="text"
                      placeholder="Enter Registered Phone Number"
                    />
                    <label for="exchange-afk">Phone Number</label>
                    <div class="exchange--dropdown"></div>
                  </div>
                </div>
                <p class="authhint">Please add your phone code (eg: +234)</p>

                <div class="text-center mt-20 sub--btn--holder">
                  <div class="sub-button mt-20">
                    <button
                      v-if="!processing"
                      @click="resendOTP($event)"
                      class="w-100"
                    >
                      Resend OTP
                    </button>
                    <button v-if="processing" disabled class="w-100">
                      resending...
                    </button>
                  </div>
                </div>
                <div class="text-center mt-20">
                  <nuxt-link to="/signup"
                    ><p class="authhint">
                      New to PayAfrik?
                      <span class="reset-color">Sign Up</span>
                    </p>
                  </nuxt-link>
                </div>
              </div>
            </form>
          </div>

          <!-- </div> -->
        </div>
      </section>
    </main>
  </section>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
  // import Logo from '~/components/Logo.vue'

  export default {
    components: {},
    data() {
      return {
        password: '',
        resendMode: false,
        baseUrl: process.env.baseUrl,
        phone: '',
        verificationCode: '',
        formErrors: {
          passwordError: false,
          phoneError: false,
          verificationCodeError: false,
        },
        processing: false,
        viewPassword: false,
      }
    },
  }
</script>
<style>
  .auth__page .exchange {
    position: relative;
  }

  .auth__page img.password-toggle-switch {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    color: #666;
    z-index: 999;
  }
</style>
