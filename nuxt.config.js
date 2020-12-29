import webpack from 'webpack'
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  env: {
    baseUrl: process.env.BASE_URL || 'https://api.payafrik.io/',
    interswitchBaseUrl: 'https://payafrik.immanuel.com.ng/v1/api/interswitch/',
    superPayBaseUrl: 'https://payafrik.immanuel.com.ng/v1/api/superpay/',
    // interswitchBaseUrl: 'http://localhost:5000/v1/api/interswitch/'
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  mode: 'universal',
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Welcome to PayAfrik' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://api.payafrik.io/',
      },
      {
        rel: 'preconnect',
        href: 'https://payafrik.immanuel.com.ng/v1/api/interswitch/',
      },
      {
        rel: 'preconnect',
        href: 'https://api.coingecko.com/api/v3/',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/variables.less',
    '~/assets/css/normalize.css',
    '~/assets/css/main.css',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/antd-ui',
    { src: '~/plugins/particles.js', mode: 'client' },
  ],

  loading: '~/components/Preloader.vue',
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */ components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/moment',
    'nuxt-compress',
    '@nuxtjs/pwa',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-highcharts',
    '@nuxtjs/device',
    '@nuxtjs/toast',
    'vue-currency-input/nuxt',
  ],
  highcharts: {},
  'nuxt-compress': {
    gzip: {
      cache: true,
    },
    brotli: {
      threshold: 10240,
    },
  },
  toast: {
    position: 'top-center',
    duration: 7000,
    closeOnSwipe: true,
    singleton: true,
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
        },
      },
    ],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://api.payafrik.io/',
    progress: true,
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
      },
    },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/accounts/signin/',
            method: 'post',
            propertyName: 'data.token',
          },
          user: {
            url: '/auth/user/profile/',
            method: 'get',
            propertyName: false,
          },
          logout: '/auth/user/logout/',
        },
        tokenType: '',
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/',
    },
    fullPathRedirect: true,
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    analyze: {
      analyzerMode: 'static',
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /\@highcharts\/map\-collection/,
      }),
    ],
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  router: {
    middleware: ['auth'],
    linkExactActiveClass: 'active',
  },
}
