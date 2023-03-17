export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Rawi',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/logo.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;800;900&display=swap',
        rel: 'stylesheet',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss',
    '~/assets/css/_variables.scss',
    'animate.css/animate.min.css',
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css',
  ],

  loading: {
    color: '#005894',
    height: '4px',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/vue-toast', mode: 'client' },
    { src: '~/plugins/vee-validate.js', mode: 'client' },
    // { src: '~/plugins/vue2-google-maps.js' },
    {
      src: '~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources', '@nuxtjs/moment'],

  styleResources: {
    scss: ['~/assets/css/_variables.scss'],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'vue-sweetalert2/nuxt',
    'nuxt-vuex-localstorage',
    'cookie-universal-nuxt',
  ],
  i18n: {
    lazy: true,
    loadLanguageAsync: true,
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en/index.js',
        dir: 'ltr',
      },
      {
        name: 'Arabic',
        code: 'ar',
        iso: 'ar-AR',
        file: 'ar/index.js',
        dir: 'rtl',
      },
    ],
    langDir: 'locales/',
    defaultLocale: 'ar',
    fallbackLocale: 'ar',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    rootRedirect: 'ar',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  router: {
    middleware: 'routerMiddleware',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],
    babel: {
      compact: true,
    },
    postcss: false,
  },
}
