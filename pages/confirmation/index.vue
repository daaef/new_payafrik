<template>
  <div class="w-100">
    <div v-if="!resendMode" class="w-100">
      <form class="w-100">
        <div class="w-100">
          <div class="welcome-text">
            <div class="text-center">
              <p class="w-100 c-white">Verify your</p>
              <h1 class="w-100 c-white am-type mt-0 mb-50">Phone number</h1>
            </div>
          </div>

          <div class="exchange centerdiv">
            <div style="margin-bottom: 16px" class="phoneNum">
              <a-input
                id="pnum"
                v-model="phone"
                default-value="mysite"
                placeholder="Phone Number"
                type="text"
              >
                <a-select
                  slot="addonBefore"
                  v-model="country4Code"
                  placeholder="country"
                  :default-value="countryCodes[0].name"
                  style="width: 90px"
                  show-search
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                >
                  <a-select-option
                    v-for="country in countryCodes"
                    :key="country.name"
                  >
                    {{ country.name }}
                  </a-select-option>
                </a-select>
                <img
                  v-if="selectedCountry.flag"
                  slot="addonAfter"
                  :src="selectedCountry.flag"
                  alt="flag"
                />
              </a-input>
              <div class="prefixNum">{{ selectedCountry.number }}</div>
              <label for="pnum">Phone Number</label>
            </div>
          </div>
          <div class="exchange centerdiv">
            <div>
              <a-input-password
                id="pin"
                ref="userNameInput"
                v-model="password"
                placeholder="Basic usage"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input-password>
              <label for="pin">PIN</label>
            </div>
          </div>

          <div class="exchange centerdiv mt-16">
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

          <div class="text-center mt-20 sub--btn--holder">
            <div class="sub-button mt-20">
              <button
                v-if="!processing"
                class="w-100"
                @click="verifyPhone($event)"
              >
                Verify<span v-if="processing">ing</span> phone number
              </button>
            </div>
          </div>
          <div class="text-center mt-20">
            <nuxt-link to="/auth/signup"
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
            <div style="margin-bottom: 16px" class="phoneNum">
              <a-input
                id="pnum"
                v-model="phone"
                default-value="mysite"
                placeholder="Phone Number"
                type="text"
              >
                <a-select
                  slot="addonBefore"
                  v-model="country4Code"
                  placeholder="country"
                  :default-value="countryCodes[0].name"
                  style="width: 90px"
                  show-search
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                >
                  <a-select-option
                    v-for="country in countryCodes"
                    :key="country.name"
                  >
                    {{ country.name }}
                  </a-select-option>
                </a-select>
                <img
                  v-if="selectedCountry.flag"
                  slot="addonAfter"
                  :src="selectedCountry.flag"
                  alt="flag"
                />
              </a-input>
              <div class="prefixNum">{{ selectedCountry.number }}</div>
              <label for="pnum">Phone Number</label>
            </div>
          </div>
          <p class="authhint">Please add your phone code (eg: +234)</p>

          <a @click="resendMode = true">
            <p class="authhint">
              Didnt get the OTP?
              <span class="reset-color">Click to resend</span>
            </p>
          </a>
          <div class="text-center mt-20 sub--btn--holder">
            <div class="sub-button mt-20">
              <button
                class="w-100"
                :disabled="processing"
                @click="resendOTP($event)"
              >
                Resend<span v-if="processing">ing</span> OTP
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
</template>

<script>
  // import Logo from '~/components/Logo.vue'

  import { mapGetters } from 'vuex'

  export default {
    layout: 'auth',
    middleware: 'guest',
    auth: false,
    components: {},
    data() {
      return {
        country4Code: 'Nigeria',
        selectedCountry: {
          name: 'Nigeria',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg',
          number: '234',
        },
        username: '',
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
    computed: mapGetters({
      countryCodes: 'countryCodes',
    }),
    methods: {
      handleChange(value) {
        this.selectedCountry = this.countryCodes.filter((country) => {
          return country.name === value
        })[0]
      },
      handleBlur() {
        console.log('blur')
      },
      handleFocus() {
        console.log('focus')
      },
      filterOption(input, option) {
        return option.componentOptions.children[0].text
          .toLowerCase()
          .includes(input.toLowerCase())
      },
      toggleViewPassword() {
        this.viewPassword = !this.viewPassword
      },

      async verifyPhone(event) {
        event.preventDefault()
        this.processing = true

        if (this.password === '') {
          this.formErrors.passwordError = true
          this.$toast.error('Please provide your password')
          this.processing = false
          return
        } else if (this.phone === '') {
          this.formErrors.phoneError = true
          this.$toast.error('Please provide your phone number')
          this.processing = false
          return
        } else if (this.verificationCode === '') {
          this.formErrors.verificationCodeError = true
          this.$toast.error('Please provide your verificationCode')
          this.processing = false
          return
        }

        this.phone = `${this.selectedCountry.number}${
          this.phone[0] === '0' ? this.phone.slice(1) : this.phone
        }`

        const payload = {
          username: this.phone,
          password: this.password,
          nonce: this.verificationCode,
        }
        console.log(payload)

        const headers = {
          'Content-Type': 'application/json',
          'X-PFK-DT': 'B',
          Authorization: this.$cookies.get('signuptoken'),
        }

        try {
          const verificationResponse = await this.$axios.$post(
            this.baseUrl + 'auth/accounts/verify-phone/',
            payload,
            { headers }
          )
          console.log(verificationResponse)
          const userDetails = {
            username: verificationResponse.data.username,
            token: verificationResponse.data.token,
            email: verificationResponse.data.email,
            phone: verificationResponse.data.phone,
            balance: +verificationResponse.data.balance,
            id: verificationResponse.data.id,
            eos_wallet: verificationResponse.data.eos_wallet,
            btc_wallet: verificationResponse.data.btc_wallet,
            eth_wallet: verificationResponse.data.eth_wallet,
            kyc_doc_type: verificationResponse.data.kyc_doc_type,
            kyc_document_front: verificationResponse.data.kyc_document_front,
            kyc_selfie: verificationResponse.data.kyc_selfie,
            kyc_status: verificationResponse.data.kyc_status,
          }

          this.$cookies.set('userdetails', userDetails, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          })

          // this.authenticate(signInResponse)
          this.$toast.success(
            'Account activated successfully, you can now log in.'
          )
          this.$router.push('/auth/login')
          // this.processing = false;
        } catch (e) {
          console.log(JSON.stringify(e))
          this.$toast.error(e.response.data.msg)
          this.processing = false
        }
      },
      async resendOTP(event) {
        event.preventDefault()
        this.processing = true

        this.phone = `${this.selectedCountry.number}${
          this.phone[0] === '0' ? this.phone.slice(1) : this.phone
        }`

        if (this.phone === '') {
          this.formErrors.phoneError = true
          this.$toast.error('Please provide your username')
          this.processing = false
          return
        }
        let phone = ''

        if (this.phone.charAt(0) === '+') {
          phone = this.phone.substring(1)
        }
        const payload = {
          username: phone,
        }
        console.log(payload)

        const headers = {
          'Content-Type': 'application/json',
          'X-PFK-DT': 'B',
        }

        try {
          const resendResponse = await this.$axios.$post(
            this.baseUrl + 'auth/accounts/resend-otp/',
            payload,
            { headers }
          )
          console.log(resendResponse)
          this.$notification.success({
            key: 'updatable',
            message: 'Success!',
            description: 'Activation code resent, please try again',
            duration: 0,
            class: 'success',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          this.resendMode = false
          this.processing = false
        } catch (e) {
          console.log(JSON.stringify(e))
          this.$notification.error({
            key: 'updatable',
            message: 'Error!',
            description: e.response.data.msg,
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          this.processing = false
        }
      },
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
