<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :wrapper-col="wrapperCol"
    class="w-100"
  >
    <div>
      <div class="text-center">
        <h3 class="w-100 mt-12 mb-24 c-white">Register Your Account</h3>
      </div>
    </div>

    <a-form-model-item ref="firstName" has-feedback prop="firstName">
      <div class="exchange centerdiv mb-20">
        <div>
          <img class="prefix-icon" src="~/assets/img/user-icon.png" alt="" />
          <input
            id="fname"
            v-model="form.firstName"
            type="text"
            placeholder="Enter First Name"
            @blur="
              () => {
                $refs.firstName.onFieldBlur()
              }
            "
          />
          <label for="fname">First Name</label>
          <div class="exchange--dropdown"></div>
        </div>
      </div>
    </a-form-model-item>
    <a-form-model-item ref="lastName" has-feedback prop="lastName">
      <div class="exchange centerdiv mb-20">
        <div>
          <img class="prefix-icon" src="~/assets/img/user-icon.png" alt="" />
          <input
            id="lname"
            v-model="form.lastName"
            type="text"
            placeholder="Enter Last Name"
            @blur="
              () => {
                $refs.lastName.onFieldBlur()
              }
            "
          />
          <label for="lname">Last Name</label>
          <div class="exchange--dropdown"></div>
        </div>
      </div>
    </a-form-model-item>
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

    <a-form-model-item>
      <div class="text-center sub--btn--holder">
        <div class="sub-button">
          <button class="w-100" :disabled="processing" @click="signUp">
            Creat<span v-if="!processing">e</span
            ><span v-if="processing">ing</span> Account
          </button>
        </div>
      </div>
    </a-form-model-item>
    <div class="text-center">
      <nuxt-link to="/auth/login">
        <p class="authhint">
          Already have an account?
          <span class="reset-color">Sign In</span>
        </p>
      </nuxt-link>
    </div>
  </a-form-model>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    layout: 'auth',
    middleware: 'guest',
    components: {},
    data() {
      return {
        strengthClass: 'weak',
        passwordScore: '0%',
        country4Code: 'Nigeria',
        charAdded: false,
        processing: false,
        baseUrl: process.env.baseUrl,
        countryCode: '+234',
        selectedCountry: {
          name: 'Nigeria',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg',
          number: '234',
        },
        email: '',
        firstName: '',
        lastName: '',
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
    auth: false,
    computed: mapGetters({
      countryCodes: 'countryCodes',
    }),
    methods: {
      onSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
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

      async signUp(event) {
        event.preventDefault()
        await this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            console.log('signing up...')
            this.processing = true

            this.phone = `${this.selectedCountry.number}${
              this.form.username[0] === '0'
                ? this.form.username.slice(1)
                : this.form.username
            }`

            const payload = {
              first_name: this.form.firstName,
              last_name: this.form.lastName,
              phone: this.phone,
              password: this.form.password,
            }

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
              console.log('Signup Response', signupResponse)
              // this.resetForm()
              await this.$router.push('/confirmation')
            } catch (e) {
              console.log(e.response)
              // this.resetForm()
              this.$toast.error(e.response.data.msg)
              this.processing = false
            }
          }
        })
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
