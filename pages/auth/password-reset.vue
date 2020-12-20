<template>
  <div class="w-100">
    <form class="w-100">
      <div class="w-100">
        <div class="welcome-text">
          <div class="text-center">
            <p class="w-100 c-white">Reset your PIN</p>
            <!-- <h1 class="w-100 c-white am-type mt-0 mb-50">
                  PayAfrik Dashboard
                </h1> -->
          </div>
        </div>

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
        <transition name="appear" mode="in-out">
          <div v-if="codeSent" class="exchange centerdiv mb-3">
            <div>
              <img
                class="prefix-icon"
                src="~/assets/img/right-arrow.png"
                alt=""
              />
              <input
                id="reset-code"
                v-model="resetCode"
                type="text"
                placeholder="Code sent to your phone"
              />

              <label for="pin">Reset Code</label>
            </div>
          </div>

          <!--  <div class="exchange centerdiv">
            <div>
              <img
                class="prefix-icon"
                src="~/assets/img/right-arrow.png"
                alt=""
              />
              <input
                v-if="!viewPassword"
                id="pin"
                v-model="password"
                maxlength="4"
                type="password"
                placeholder="Your New 4 Digit PIN"
                @keydown="enforceNumbersOnly"
              />
              <input
                v-if="viewPassword"
                id="pin-text"
                v-model="password"
                type="text"
                maxlength="4"
                placeholder="Your New 4 Digit PIN"
                @keydown="enforceNumbersOnly"
              />
              <label for="pin">PIN</label>
              <img
                class="suffix-icon suffix password-toggle-switch"
                src="~/assets/img/view.png"
                alt=""
                @click="toggleViewPassword"
              />
              <div class="exchange&#45;&#45;dropdown"></div>
            </div>
          </div>-->

          <div v-if="codeSent" class="exchange centerdiv">
            <div>
              <a-input-password
                id="pin"
                ref="userNameInput"
                v-model="password"
                placeholder="Your New 4 Digit PIN"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input-password>
              <label for="pin">PIN</label>
            </div>
          </div>
          <div v-if="!codeSent" class="text-center mt-20 sub--btn--holder">
            <div class="sub-button mt-20">
              <button
                v-if="!processing"
                :disabled="processing"
                class="w-100"
                @click="requestReset"
              >
                Request<span v-if="processing">ing</span> PIN Reset
              </button>
            </div>
          </div>

          <div v-if="codeSent" class="text-center mt-20 sub--btn--holder">
            <div class="sub-button mt-20">
              <button
                class="w-100"
                :disabled="processing"
                @click="resetPassword()"
              >
                Reset<span v-if="processing">ting</span> PIN
              </button>
            </div>
          </div>
        </transition>
        <div class="text-center mt-20">
          <nuxt-link to="/auth/signup"
            ><p class="authhint">
              New to PayAfrik?
              <span class="reset-color">Sign Up</span>
            </p></nuxt-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    components: {},
    layout: 'auth',
    middleware: 'guest',
    auth: false,
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
        processing: false,
        baseUrl: process.env.baseUrl,
        confirmationStatus: 'false',
        viewPassword: false,
        codeSent: false,
        resetCode: '',
      }
    },
    computed: mapGetters({
      countryCodes: 'countryCodes',
    }),
    mounted() {
      this.confirmationStatus = this.$route.query.confirmation
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
      toggleViewPassword() {
        this.viewPassword = !this.viewPassword
      },
      async requestReset() {
        const payload = {
          username: `${this.selectedCountry.number}${
            this.username[0] === '0' ? this.username.slice(1) : this.username
          }`,
        }
        this.processing = true
        try {
          const requestResponse = await this.$axios.$post(
            this.baseUrl + 'auth/user/request-password-reset/',
            payload
          )
          console.log(requestResponse)
          this.$toast.success('Password reset code sent successfully!')
          // this.authenticate(signInResponse)
          this.processing = false
          this.codeSent = true
        } catch (e) {
          this.$toast.error(JSON.stringify(e.response.data.detail))

          this.processing = false
          console.log(e.response)
        }
      },
      async resetPassword() {
        const payload = {
          username: `${this.selectedCountry.number}${
            this.username[0] === '0' ? this.username.slice(1) : this.username
          }`,
          nonce: this.resetCode,
          password: this.password,
        }
        console.log(payload)
        this.processing = true
        try {
          const resetResponse = await this.$axios.$post(
            this.baseUrl + 'auth/user/complete-password-reset/',
            payload
          )
          console.log(resetResponse)
          this.$toast.success('Password reset successfully!')
          // this.authenticate(signInResponse)
          await this.$router.push('/auth/login')
          this.processing = false
        } catch (e) {
          this.$toast.error(JSON.stringify(e.response.data.error))

          this.processing = false
          console.log(e.response)
        }
      },

      enforceNumbersOnly(e) {
        const key = e.keyCode ? e.keyCode : e.which
        if (
          !(
            [8, 9, 13, 27, 46, 110, 190].includes(key) ||
            (key === 65 && (e.ctrlKey || e.metaKey)) ||
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
            (key >= 96 && key <= 105)
          )
        )
          e.preventDefault()
      },

      authenticate(user) {
        this.$store.commit('global/authenticateUser', user)
      },
      ...mapMutations({
        toggleSidebar: 'global/authenticateUser',
      }),
    },
  }
</script>

<style scoped>
  /* .section{
  background-color:#1f3d74;
  background: url('../assets/img/blockchain-bg.jpg') no-repeat center center;
  background-size:cover;
  padding:35px;
}
img.logo{
  width:30%;
  filter: brightness(0) invert(1) opacity(0.8);;
}
.login-container{
  background-color:#fff;
  border-radius:5px;
  padding:35px;
  padding-top:50px;
  width:100%;
  margin-top:75px;
}
.login-container p{
  color:#181818;
}
button.login{
  color:#ffffffde;
  background-color: #1fa545;
}
button.login:hover{
  color:#ffffffde;
  background-color: #13642a;
}
i.ti-check-box{
  font-size:1.5em;
  padding:5px;
}
p.confirm-success{
  margin-bottom:15px;
  color:#1fa545;
  font-size: 0.8em;
}
p > a{
  font-size:1em;
}
p{
  margin:0;
}
p, a{
  font-size:0.8em;
  color:#ffffffd4;
}
a{
  font-weight:700;
}
a.hover{
  color:#fffffffd;
  text-decoration:none;
}
h6{
  font-size:0.8em;
}
.password-container{
  position: relative;
}

a.password-toggle-switch{
  position: absolute;
  top:22px;
  right:15px;
  z-index:999;
  color:#666;
} */
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
</style>
