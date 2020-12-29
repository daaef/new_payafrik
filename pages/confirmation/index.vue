<template>
  <div class="w-100">
    <transition name="appear" mode="in-out">
      <div v-if="!resendMode" class="w-100">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :wrapper-col="wrapperCol"
          class="w-100"
        >
          <div class="welcome-text">
            <div class="text-center">
              <p class="w-100 c-white">Verify your</p>
              <h1 class="w-100 c-white am-type mt-0 mb-50">Phone number</h1>
            </div>
          </div>

          <a-form-model-item ref="username" has-feedback prop="username">
            <div class="exchange centerdiv">
              <div style="margin-bottom: 16px" class="phoneNum">
                <a-input
                  id="pnum"
                  v-model="form.username"
                  default-value="mysite"
                  placeholder="Phone Number"
                  type="text"
                  @blur="
                    () => {
                      $refs.username.onFieldBlur()
                    }
                  "
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
          </a-form-model-item>
          <a-form-model-item ref="password" has-feedback prop="password">
            <div class="exchange centerdiv">
              <div>
                <a-input-password
                  id="pin"
                  ref="userNameInput"
                  v-model.number="form.password"
                  placeholder="Basic usage"
                  @blur="
                    () => {
                      $refs.password.onFieldBlur()
                    }
                  "
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input-password>
                <label for="pin">PIN</label>
              </div>
            </div>
          </a-form-model-item>
          <a-form-model-item ref="code" has-feedback prop="code">
            <div class="exchange centerdiv">
              <div>
                <img
                  class="prefix-icon"
                  src="../../assets/img/iphone.png"
                  alt=""
                />
                <input
                  id="exchange-afk"
                  v-model="form.code"
                  type="text"
                  placeholder="Verification code sent to your SMS"
                  @blur="
                    () => {
                      $refs.code.onFieldBlur()
                    }
                  "
                />
                <label for="exchange-afk">Verification code</label>
                <div class="exchange--dropdown"></div>
              </div>
            </div>
          </a-form-model-item>

          <div class="text-center mt-20 sub--btn--holder">
            <a @click="resendMode = true">
              <p class="authhint">
                Didnt get the OTP?
                <span class="reset-color">Click to resend</span>
              </p>
            </a>
            <div class="sub-button mt-20">
              <button class="w-100" @click="verifyPhone">
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
        </a-form-model>
      </div>

      <div v-if="resendMode" class="w-100">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :wrapper-col="wrapperCol"
          class="w-100"
        >
          <div class="welcome-text">
            <div class="text-center">
              <p class="w-100 c-white">Resend your</p>
              <h1 class="w-100 c-white am-type mt-0 mb-50">OTP</h1>
            </div>
          </div>

          <a-form-model-item ref="username" has-feedback="" prop="username">
            <div class="exchange centerdiv">
              <div style="margin-bottom: 16px" class="phoneNum">
                <a-input
                  id="pnum"
                  v-model="form.username"
                  default-value="mysite"
                  placeholder="Phone Number"
                  type="text"
                  @blur="
                    () => {
                      $refs.username.onFieldBlur()
                    }
                  "
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
          </a-form-model-item>

          <div class="text-center mt-20 sub--btn--holder">
            <div class="sub-button mt-20">
              <button class="w-100" :disabled="processing" @click="resendOTP">
                Resend<span v-if="processing">ing</span> OTP
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
        </a-form-model>
      </div>
    </transition>
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
        phone: null,
        wrapperCol: { span: 24 },
        other: '',
        form: {
          name: '',
          region: undefined,
          date1: undefined,
          delivery: false,
          type: [],
          desc: '',
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          code: null,
        },
        rules: {
          firstName: [
            {
              required: true,
              message: 'Please input your First Name',
              trigger: 'blur',
            },
          ],
          lastName: [
            {
              required: true,
              message: 'Please input your Last Name',
              trigger: 'blur',
            },
          ],
          username: [
            {
              required: true,
              message: 'Please input Your Phone Number',
              trigger: 'blur',
            },
          ],
          password: [
            {
              required: true,
              message: 'Please input Your Pin',
              trigger: 'blur',
            },
            {
              type: 'number',
              message: 'Must be a number',
              trigger: 'blur',
            },
          ],
          code: [
            {
              required: true,
              message: 'Please input Your Verification COde',
              trigger: 'blur',
            },
          ],
        },
        resendMode: false,
        baseUrl: process.env.baseUrl,
        verificationCode: '',
        processing: false,
      }
    },
    computed: mapGetters({
      countryCodes: 'countryCodes',
    }),
    methods: {
      onSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!')
          }
        })
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
      },
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

        await this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            this.phone = `${this.selectedCountry.number}${
              this.form.username[0] === '0'
                ? this.form.username.slice(1)
                : this.form.username
            }`

            const payload = {
              username: this.phone,
              password: this.form.password,
              nonce: this.form.code,
            }
            console.log(payload)

            const headers = {
              'Content-Type': 'application/json',
              'X-PFK-DT': 'B',
            }

            try {
              await this.$axios.$post(
                this.baseUrl + 'auth/accounts/verify-phone/',
                payload,
                { headers }
              )

              // this.authenticate(signInResponse)
              this.$toast.success(
                'Account activated successfully, you can now log in.'
              )
              await this.$router.push('/auth/login')
              // this.processing = false;
            } catch (e) {
              console.log(JSON.stringify(e))
              this.$toast.error(e.response.data.msg)
              this.processing = false
            }
          }
        })
      },
      async resendOTP(event) {
        event.preventDefault()
        this.processing = true

        await this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            this.phone = `${this.selectedCountry.number}${
              this.form.username[0] === '0'
                ? this.form.username.slice(1)
                : this.form.username
            }`

            const payload = {
              username: this.phone,
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
          }
        })
      },
    },
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 1500)
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
