const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: 'fukami421.github.io'
  }
} : {}

module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/fukami421.github.io/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt'
    // , '@nuxtjs/axios', '@nuxtjs/proxy'
  ],
  // axios: {
  //   proxy: true
  // },
  // proxy: {
  //   '/': { target: 'https://github.com' }
  // },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },
  router: {
    middleware: 'test',
    base: '/fukami421.github.io/'
  },
  generate: {
    routes: [
      '/work/Segalnet',
      '/work/Slash%20Jump',
      '/work/FlyFlyFly改',
      '/work/Peace%20For%20Train',
      '/work/Ryustagram',
      '/work/This%20Home%20Page',
    ]
  }
}