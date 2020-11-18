<template>
  <form class="w-100">
    <div class="w-100">
      <div class="exchange centerdiv">
        <div style="margin-bottom: 16px" class="phoneNum">
          <a-input
            id="pnum"
            v-model="username"
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
      <p class="authhint">Please choose country</p>
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
      <nuxt-link to="/auth/password-reset">
        <p class="authhint">
          Forgot Password?
          <span class="reset-color">Reset</span>
        </p>
      </nuxt-link>
      <p class="authhint text-center">
        Need to confirm your phone number?
        <nuxt-link to="confirmation">Click here</nuxt-link>
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
    </div>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Login',
    layout: 'auth',
    middleware: 'guest',
    data() {
      return {
        country4Code: 'Albania',
        username: '',
        password: '',
        processing: false,
        confirmationStatus: 'false',
        viewPassword: false,
        selectedCountry: {},
      }
    },
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
      async signIn(e) {
        e.preventDefault()
        await console.log('signing in...')
        const payload = {
          username: `${this.selectedCountry.number}${
            this.username[0] === '0' ? this.username.slice(1) : this.username
          }`,
          password: this.password,
        }
        await console.log(payload)
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
          this.$nuxt.$loading.finish()
          console.log('error is', e.response)
        }
      },
      onSelect({ name, iso2, dialCode }) {
        console.log(`${dialCode}`)
        this.prefixNum = dialCode
      },
    },
    computed: mapGetters({
      countryCodes: 'countryCodes',
    }),
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
