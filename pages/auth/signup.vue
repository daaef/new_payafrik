<template>
  <form class="w-100">
    <div class="w-100">
      <div class="welcome-text">
        <div class="text-center">
          <p class="w-100 c-white">sign up</p>
          <h1 class="w-100 c-white am-type mt-0 mb-50">To PayAfrik</h1>
        </div>
      </div>
      <div class="exchange centerdiv mb-20">
        <div>
          <img class="prefix-icon" src="~/assets/img/user-icon.png" alt="" />
          <input
            v-model="firstName"
            type="text"
            placeholder="Enter First Name"
          />
          <label for="exchange-afk">First Name</label>
          <div class="exchange--dropdown"></div>
        </div>
      </div>
      <div class="exchange centerdiv mb-20">
        <div>
          <img class="prefix-icon" src="~/assets/img/user-icon.png" alt="" />
          <input v-model="lastName" type="text" placeholder="Enter Last Name" />
          <label for="exchange-afk">Last Name</label>
          <div class="exchange--dropdown"></div>
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
      <p class="authhint text-center">
        Your PIN must be 4 digits and contain only numbers
      </p>
      <p class="authhint text-center">
        Need to confirm your phone number?
        <nuxt-link to="/confirmation">Click here</nuxt-link>
      </p>

      <p class="authhint text-center">
        By clicking button below, you agree to Payafrik's
        <a>terms of acceptable use</a>
      </p>
      <div class="text-center sub--btn--holder">
        <div class="sub-button">
          <button class="w-100" :disabled="processing" @click="signUp($event)">
            Creat<span v-if="!processing">e</span
            ><span v-if="processing">ing</span> Account
          </button>
        </div>
      </div>
      <div class="text-center">
        <nuxt-link to="/auth/login">
          <p class="authhint">
            Already have an account?
            <span class="reset-color">Sign In</span>
          </p>
        </nuxt-link>
      </div>
    </div>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    layout: 'auth',
    middleware: 'guest',
    components: {},
    data() {
      return {
        country4Code: 'Albania',
        password: '',
        selectedCountry: {},
        email: '',
        firstName: '',
        lastName: '',
        strengthClass: 'weak',
        passwordScore: '0%',
        charAdded: false,
        baseUrl: process.env.baseUrl,
        username: '',
        phone: '',
        formErrors: {
          firstNameError: false,
          lastNameError: false,
          passwordError: false,
          usernameError: false,
          emailError: false,
          phoneError: false,
        },
        processing: false,
        viewPassword: false,
        countryCode: '+234',
      }
    },
    auth: false,
    computed: mapGetters({
      countryCodes: 'countryCodes',
    }),
    mounted() {
      console.log(this.countryCodes)
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
      toggleViewPassword() {
        this.viewPassword = !this.viewPassword
      },
      calculatePasswordStrength() {
        let points = 0
        if (this.password1.length > 0) {
          this.charAdded = true
        } else {
          this.charAdded = false
          this.passwordScore = '0%'
          points = 0
        }
        const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
        if (format.test(this.password1)) {
          points += 20
        }

        // check for number and caps
        let i = 0
        let character = ''
        while (i <= this.password1.length) {
          character = this.password1.charAt(i)
          if (!isNaN(character * 1)) {
            points += 10
          } else if (character === character.toUpperCase()) {
            points += 10
          }
          i++
        }
        if (this.password1.length > 8) {
          points += 20
        }

        // assign class
        if (this.password1.length > 8 && points < 30) {
          this.strengthClass = 'weak'
        } else if (this.password1.length > 8 && points > 30 && points < 75) {
          this.strengthClass = 'medium'
        } else if (this.password1.length > 8 && points > 75) {
          this.strengthClass = 'strong'
        }
        this.passwordScore = points + '%'
      },

      async signUp(event) {
        event.preventDefault()
        console.log('signing up...')
        this.processing = true

        this.phone = `${this.selectedCountry.number}${
          this.username[0] === '0' ? this.username.slice(1) : this.username
        }`

        if (this.phone === '') {
          this.formErrors.phoneError = true
          this.processing = false
          return
        } else if (this.firstName === '') {
          this.formErrors.firstNameError = true
          this.processing = false
          return
        } else if (this.lastName === '') {
          this.formErrors.lastNameError = true
          this.processing = false
          return
        }

        const payload = {
          first_name: this.firstName,
          last_name: this.lastName,
          // username: this.username,
          // phone: this.countryCode + this.phone,
          phone: this.phone,
          password: this.password,
          // email: this.email
        }
        await console.log('THE PAYLOAD =>', payload)

        const headers = {
          'Content-Type': 'application/json',
          'X-PFK-DT': 'B',
        }

        try {
          const signupResponse = await this.$axios.$post(
            this.baseUrl + 'auth/accounts/signup/',
            payload,
            { headers }
          )
          this.$cookies.set('signuptoken', signupResponse.data.token)
          console.log('Signup Response', signupResponse)
          this.$router.push('/confirmation')
        } catch (e) {
          console.log(e.response)
          this.$toast.error(e.response.data.msg)
          this.processing = false
        }
      },
    },
  }
</script>

<style scoped>
  /* .section {
  background-color: #1f3d74;
  background: url("~/assets/img/blockchain-bg.jpg") no-repeat center center;
  background-size: cover;
  padding: 35px;
}
img.logo {
  width: 30%;
  filter: brightness(0) invert(1) opacity(0.8);
}
.login-container {
  background-color: #fff;
  border-radius: 5px;
  padding: 35px;
  width: 100%;
  margin-top: 25px;
}
button.login {
  color: #ffffffde;
  background-color: #1fa545;
}
button.login:hover {
  color: #ffffffde;
  background-color: #13642a;
}
p > a {
  font-size: 1em;
}
p {
  margin: 0;
}
p.terms {
  font-size: 0.8em;
  color: #999;
}
p,
a {
  font-size: 0.8em;
  color: #ffffffd4;
}
a {
  font-weight: 700;
}
a.hover {
  color: #fffffffd;
  text-decoration: none;
}
h6 {
  font-size: 0.8em;
}
.password-meter {
  height: 5px;
  width: 100%;
  background-color: #eeeeee;
  margin-bottom: 10px;
}
.password-strength {
  height: 3px;
  margin-top: 1px;
  width: 50%;
  max-width: 100%;
  background-color: #20a144;
  transition: all 200ms ease;
}
.strong {
  background-color: #20a144;
}
.weak {
  background-color: #a72920;
}
.medium {
  background-color: #ff8800;
}

.password-container {
  position: relative;
}

a.password-toggle-switch {
  position: absolute;
  top: 22px;
  right: 15px;
  z-index: 999;
  color: #666;
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
