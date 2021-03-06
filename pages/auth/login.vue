<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules" class="w-100">
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
    <nuxt-link to="/auth/password-reset">
      <p class="authhint">
        Forgot Password?
        <span class="reset-color">Reset</span>
      </p>
    </nuxt-link>
    <p class="authhint text-center">
      Need to confirm your phone number?
      <nuxt-link to="/confirmation">Click here</nuxt-link>
    </p>
    <div class="text-center mt-8 sub--btn--holder">
      <div class="sub-button mt-8">
        <button :disabled="processing" class="w-100" @click="signIn($event)">
          Log<span v-if="processing">ging</span> In
        </button>
      </div>
    </div>
    <div class="text-center mt-12">
      <nuxt-link to="/auth/signup"
        ><p class="authhint">
          New to PayAfrik?
          <span class="reset-color">Sign Up</span>
        </p>
      </nuxt-link>
    </div>
  </a-form-model>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        country4Code: 'Nigeria',
        processing: false,
        confirmationStatus: 'false',
        viewPassword: false,
        selectedCountry: {
          name: 'Nigeria',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg',
          number: '234',
        },
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
        },
      }
    },
    computed: mapGetters({
      countryCodes: 'countryCodes',
    }),
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 1500)
    },
    methods: {
      filterOption(input, option) {
        return option.componentOptions.children[0].text
          .toLowerCase()
          .includes(input.toLowerCase())
      },
      handleBlur() {
        console.log('blur')
      },
      handleChange(value) {
        this.selectedCountry = this.countryCodes.filter((country) => {
          return country.name === value
        })[0]
      },
      handleFocus() {
        console.log('focus')
      },
      onSelect({ name, iso2, dialCode }) {
        console.log(`${dialCode}`)
        this.prefixNum = dialCode
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
      },
      async signIn(e) {
        e.preventDefault()
        await console.log('signing in...')

        await this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            const payload = {
              username: `${this.selectedCountry.number}${
                this.form.username[0] === '0'
                  ? this.form.username.slice(1)
                  : this.form.username
              }`,
              password: this.form.password,
            }
            await console.log(payload)
            this.resetForm()
            this.processing = true
            this.$nuxt.$loading.start()
            try {
              const response = await this.$auth.loginWith('local', {
                data: payload,
              })
              console.log(response)
              await this.$nuxt.$loading.finish()

              // this.authenticate(signInResponse)
            } catch (e) {
              this.processing = false
              this.resetForm()
              this.$nuxt.$loading.finish()
              console.log('error is', e.response)
            }
          }
        })
      },
    },
    layout: 'auth',
    middleware: 'guest',
  }
</script>

<style lang="scss">
  @-webkit-keyframes autofill {
    0%,
    100% {
      color: #666;
      background: transparent;
    }
  }
</style>
