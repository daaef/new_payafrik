<template>
  <section class="main-content auth dash--main">
    <client-only> </client-only>
    <main class="full">
      <section class="dash-body auth__page">
        <div class="col-lg-5 text-center">
          <div class="w-100">
            <div class="welcome-text">
              <div class="text-center">
                <img src="~/assets/img/logo.png" alt="" />
              </div>
            </div>
            <Nuxt />
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<style>
  .auth main {
    width: 100%;
    background-image: url('~assets/img/auth_bg.png') !important;
  }

  .auth main {
    overflow-y: hidden;
    overflow-x: hidden;
    width: 100% !important;
    background: linear-gradient(to right, transparent, transparent);
    height: 100vh;
    background-size: cover !important;
  }
  .auth__page .exchange {
    position: relative;
  }

  .full {
    background-size: cover;
  }

  .auth__page img.password-toggle-switch {
    position: absolute;
    top: 27px;
    left: 92% !important;
    color: #666;
    z-index: 999;
  }

  .auth main .auth__page.dash-body > div {
    height: unset;
  }

  .auth__page .suffix {
    cursor: pointer;
  }

  .auth__page .sub-button {
    width: 100%;
  }

  .auth__page .prefix-icon,
  .suffix-icon {
    width: 30px;
  }

  .auth__page .prefix-icon {
    opacity: 0.5;
  }

  .auth__page label {
    color: #00f;
  }

  .auth__page p {
    color: #ffffffe5;
    margin-top: 15px;
    text-align: center;
  }

  .auth__page.dash-body {
    width: 100% !important;
    min-height: 100vh;
    margin-left: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .auth__page.dash-body {
      margin-left: 0;
    }
  }
</style>

<script>
  export default {
    data() {
      return { loading: false }
    },
  }
</script>
