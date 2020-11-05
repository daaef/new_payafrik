<template>
  <section class="main-content">
    <main class="full">
      <section class="auth__page dash-body">
        <!-- <a href="#" class="modal-close">
              <img src="img/close.png" alt="" />
            </a> -->
        <div class="auth--content">
          <div class="col-lg-5 ml-auto mr-auto">
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
                    <div>
                      <img
                        class="prefix-icon"
                        src="~/assets/img/iphone.png"
                        alt=""
                      />
                      <input
                        id="exchange-afk"
                        v-model="username"
                        type="text"
                        placeholder="Enter Registered Phone Number"
                      />
                      <label for="exchange-afk">Phone Number</label>
                      <div class="exchange--dropdown"></div>
                    </div>
                  </div>
                  <p class="authhint">Please add your phone code (eg: +234)</p>

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

                  <div v-if="codeSent" class="exchange centerdiv">
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
                        @keydown="enforceNumbersOnly($event)"
                      />
                      <input
                        v-if="viewPassword"
                        id="pin-text"
                        v-model="password"
                        type="text"
                        maxlength="4"
                        placeholder="Your New 4 Digit PIN"
                        @keydown="enforceNumbersOnly($event)"
                      />
                      <label for="pin">PIN</label>
                      <img
                        class="suffix-icon suffix password-toggle-switch"
                        src="~/assets/img/view.png"
                        alt=""
                        @click="toggleViewPassword()"
                      />
                      <div class="exchange--dropdown"></div>
                    </div>
                  </div>

                  <div
                    v-if="!codeSent"
                    class="text-center mt-20 sub--btn--holder"
                  >
                    <div class="sub-button mt-20">
                      <button
                        v-if="!processing"
                        class="w-100"
                        @click="requestReset()"
                      >
                        Request PIN Reset
                      </button>
                      <button v-if="processing" disabled class="w-100">
                        Requesting reset...
                      </button>
                    </div>
                  </div>

                  <div
                    v-if="codeSent"
                    class="text-center mt-20 sub--btn--holder"
                  >
                    <div class="sub-button mt-20">
                      <button
                        v-if="!processing"
                        class="w-100"
                        @click="resetPassword()"
                      >
                        Reset PIN
                      </button>
                      <button v-if="processing" disabled class="w-100">
                        Resetting PIN...
                      </button>
                    </div>
                  </div>

                  <div class="text-center mt-20">
                    <nuxt-link to="/signup"
                      ><p class="authhint">
                        New to PayAfrik?
                        <span class="reset-color">Sign Up</span>
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
  import { mapMutations } from 'vuex'
  export default {
    components: {},
    data() {
      return {
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
    methods: {
      toggleViewPassword() {
        this.viewPassword = !this.viewPassword
      },
      async requestReset() {
        const payload = {
          username: this.username,
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
        let username = ''

        if (this.username.charAt(0) === '+') {
          username = this.username.substr(1)
        } else {
          username = this.username
        }

        const payload = {
          username,
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
          this.$router.push('/login')
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
    mounted() {
      this.confirmationStatus = this.$route.query.confirmation
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
