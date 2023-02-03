export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  server: {
    port: 3001,
    host: 'localhost'
  },
  ssr: true,
  render: {
    ssr: true
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'orch.store',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: `
        Добрый день дорогой посетитель,
        ты зашел на первый Магаданский сайт посвященный секс-игрушкам,
        мы гарантируем отличное качество изделий и полную конфиденциальность
      ` },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: {
    color: '#409EFF',
    failedColor: '#F56C6C',
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    '@/assets/background.scss',
    '@/assets/loading.scss',
    '@/assets/styles.scss',
    '@/assets/styles-ui.scss',
    '@/assets/layout.scss',
    '@/assets/main.scss',
    '@/assets/auth.scss',
    '@/assets/cart.scss',
    '@/assets/checkout.scss',
    '@/assets/orders.scss',
    '@/assets/order-id.scss',
    '@/assets/stuff-id.scss',
    '@/assets/profile.scss',
    '@/assets/label.scss',
    '@/assets/variables.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/fontawesome',
    '@/plugins/infiniteLoading',
    '@/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    '@nuxtjs/device',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true
  },

  proxy: ['https://orch.store/api/v1'],

  router: {
    middleware: ['auth']
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        user: {
          property: 'data.me',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/v1/auth/login', method: 'post' },
          logout: { url: '/api/v1/auth/logout', method: 'post' },
          user: { url: '/api/v1/auth/me', method: 'get' }
        }
      },
      customStrategy: {
        scheme: '~/schemes/customStrategy',
        token: {
          property: '',
          required: false,
          maxAge: 86400
        },
        user: {
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/v1/auth/login', method: 'post' },
          logout: { url: '/api/v1/auth/logout', method: 'post' },
          user: { url: '/api/v1/auth/me', method: 'get' }
        }
      }
    },
    plugins: ['~/plugins/auth.js']
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      /^element-ui/,
      'defu'
    ]
  }
}
