<template>
  <section class="main-content">
    <main class="full">
      <section class="auth__page dash-body">
        <!-- <a href="#" class="modal-close">
          <img src="~/assets/img/close.png" alt="" />
        </a> -->

        <div class="auth--content">
          <div class="col-lg-5 ml-auto mr-auto">
            <div class="w-100">
              <form class="w-100">
                <div class="w-100">
                  <div class="welcome-text">
                    <div class="text-center">
                      <p class="w-100 c-white">sign up</p>
                      <h1 class="w-100 c-white am-type mt-0 mb-50">
                        To PayAfrik
                      </h1>
                    </div>
                  </div>
                  <div class="exchange centerdiv mb-20">
                    <div>
                      <img
                        class="prefix-icon"
                        src="~/assets/img/user-icon.png"
                        alt=""
                      />
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
                      <img
                        class="prefix-icon"
                        src="~/assets/img/user-icon.png"
                        alt=""
                      />
                      <input
                        v-model="lastName"
                        type="text"
                        placeholder="Enter Last Name"
                      />
                      <label for="exchange-afk">Last Name</label>
                      <div class="exchange--dropdown"></div>
                    </div>
                  </div>
                  <div class="exchange centerdiv">
                    <div>
                      <img
                        class="prefix-icon"
                        src="~/assets/img/iphone.png"
                        alt=""
                      />
                      <input
                        v-model="phone"
                        type="text"
                        placeholder="Enter Phone Number (eg: +2348012345678)"
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
                        src="~/assets/img/right-arrow.png"
                        alt=""
                      />
                      <input
                        v-if="!viewPassword"
                        v-model="password1"
                        maxlength="4"
                        type="password"
                        placeholder="Your PIN"
                        @keydown="enforceNumbersOnly($event)"
                      />
                      <input
                        v-if="viewPassword"
                        v-model="password1"
                        maxlength="4"
                        type="text"
                        placeholder="Your PIN"
                        @keydown="enforceNumbersOnly($event)"
                      />
                      <label for="exchange-afk">Password</label>
                      <img
                        class="suffix-icon suffix password-toggle-switch"
                        src="~/assets/img/view.png"
                        alt=""
                        @click="toggleViewPassword()"
                      />
                    </div>
                    <div class="exchange--dropdown"></div>
                    <p class="authhint text-center">
                      Your PIN must be 4 digits and contain only numbers
                    </p>
                    <p class="authhint text-center">
                      Need to confirm your phone number?
                      <nuxt-link to="confirmation">Click here</nuxt-link>
                    </p>
                  </div>

                  <p class="authhint text-center">
                    By clicking button below, you agree to Payafrik's
                    <a>terms of acceptable use</a>
                  </p>
                  <div class="text-center sub--btn--holder">
                    <div class="sub-button">
                      <button
                        v-if="!processing"
                        class="w-100"
                        @click="signUp($event)"
                      >
                        Create Account
                      </button>
                      <button v-if="processing" class="w-100">
                        Creating Account...
                      </button>
                    </div>
                  </div>
                  <div class="text-center">
                    <nuxt-link to="/login"
                      ><p class="authhint">
                        Already have an account?
                        <span class="reset-color">Sign In</span>
                      </p></nuxt-link
                    >
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
  export default {
    components: {},
    data() {
      return {
        password1: '',
        password2: '',
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
    computed: {
      countryCodes() {
        return this.$store.state.global.countryCodes
      },
    },
    mounted() {
      console.log(this.countryCodes)
    },
    methods: {
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
          password: this.password1,
          // email: this.email
        }
        console.log('THE PAYLOAD =>', payload)

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
