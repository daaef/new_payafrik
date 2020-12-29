<template>
  <div class="section">
    <div class="container animated fadeIn">
      <div class="row">
        <div class="col-md-5 ml-auto mr-auto">
          <div class="text-center">
            <a href="https://payafrik.io"
              ><img class="logo" src="~/assets/img/logo.png"
            /></a>
            <div class="login-container shadowed-box">
              <i class="text-success ti-check-box"></i>
              <hr />
              <h6>You've been signed up!</h6>
              <p>
                Check your email and confirm your account before you can log in
              </p>
            </div>
            <hr />
            <p class="outside-box">
              Aready Confirmed? Maybe you got here by mistake<br />
              <nuxt-link to="/login">Click here</nuxt-link> to login
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Logo from '~/components/Logo.vue'

  export default {
    components: {},
    data() {
      return {}
    },
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 1500)
    },
    methods: {},
  }
</script>

<style scoped>
  .section {
    background-color: #1f3d74;
    background: url('/assets/img/blockchain-bg.jpg') no-repeat center center;
    background-size: cover;
    padding: 35px;
  }
  i.ti-check-box {
    font-size: 2em;
  }
  img.logo {
    width: 30%;
    filter: brightness(0) invert(1) opacity(0.8);
  }
  .login-container {
    background-color: #fff;
    border-radius: 5px;
    padding: 35px;
    /* padding-top:50px; */
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
    color: #3b3a3ad4;
  }
  p.outside-box,
  p.outside-box a {
    color: #ffffffd9;
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
</style>
