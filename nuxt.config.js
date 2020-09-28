import webpack from 'webpack'
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  env: {
    baseUrl: process.env.BASE_URL || 'https://api.payafrik.io/',
    interswitchBaseUrl: 'https://payafrik.immanuel.com.ng/v1/api/interswitch/',
    // interswitchBaseUrl: 'http://localhost:5000/v1/api/interswitch/'
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [
    'ant-design-vue/dist/antd.css',
    '~/assets/css/normalize.css',
    '~/assets/css/main.css',
    '~/assets/css/font-awesome/all.css',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/antd-ui',
    { src: '~/plugins/particles.js', mode: 'client' },
  ],
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
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    'nuxt-highcharts',
  ],
  highcharts: {},
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
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /\@highcharts\/map\-collection/,
      }),
    ],
  },
  router: {
    middleware: ['auth'],
  },
}
