export default function ({ $axios, redirect, app, store }) {
  /* set axios baseurl for all requests */
  $axios.setBaseURL(`https://rawy.moltaqadev.com/api/v1`)

  function setHeader() {
    let accessToken = null
    accessToken =
      app.$cookies.get('userToken') ||
      app.store.getters['localStorage/userToken']

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      lang: app.i18n.locale,
      'app-type': 'client',
    }
    headers.Authorization = accessToken ?? ''

    return headers
  }
  // Add a request interceptor
  $axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers = setHeader(config)

      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
}
