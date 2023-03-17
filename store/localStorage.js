export const state = () => ({
  currentLocale: 'ar',
  userToken: null,
  userData: null,
  cart_session: {},
  cart_orders_details: [],
  settings: [],
  expire: 24,
  status: true,
})

export const mutations = {
  SET_CURRENT_LOCALE(state, payload) {
    state.currentLocale = payload
  },
  SET_USER_TOKEN(state, payload) {
    state.userToken = payload
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload
  },
  REMOVE_PRODUCT(state, payload) {
    state.cart_session.order_data[payload.order_indx].splice(
      payload.product_indx,
      1
    )
  },
  RESET_USER(st) {
    const states = (({ userToken, userData }) => ({
      userToken,
      userData,
    }))(state())

    Object.keys(states).forEach((key) => {
      st[key] = states[key]
    })
    this.$cookies.remove('userToken')
    this.$cookies.remove('userData')
  },
  SET_STORE_EXIRE(state, payload) {
    state.expire = payload
  },
  SET_CART_SESSION(state, payload) {
    state.cart_session = payload
  },
  SET_CART_ORDER_DETAILS(state, payload) {
    state.cart_orders_details = payload
  },
  SET_SETTINGS(state, payload) {
    state.settings = payload
  },
}

export const getters = {
  currentLocale(state) {
    return state.currentLocale
  },
  userToken(state) {
    return state.userToken
  },
  userData(state) {
    return state.userData
  },
  get_settings(state) {
    return state.settings
  },
}
