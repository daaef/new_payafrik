<template>
  <div class="section">
    <div class="container animated fadeIn">
      <div class="row">
        <div class="col-md-5 ml-auto mr-auto">
          <div class="text-center">
            <img class="logo" src="../../assets/img/logo.png" />
            <div class="login-container shadowed-box">
              <!-- <p><i class="ti-check-box"></i> Account confirmed successfully</p> -->
              <h6 class="font-weight-bold">
                PLEASE VERIFY YOUR PHONE NUMBER TO PROCEED
              </h6>
              <input
                type="text"
                placeholder="Your activation code (Sent via sms)"
              />
              <input type="text" placeholder="Your username" />
              <input type="password" placeholder="Your password" />

              <button class="login">Proceed to your dashboard</button>
            </div>
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
  }
</script>
