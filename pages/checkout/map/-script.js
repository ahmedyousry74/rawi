// importing vuex tools
import { mapState } from 'vuex'

export default {
  name: 'CheckoutMapPage',
  async asyncData(context) {
    const establishments = await context.$axios.$get(
      `/get-establishments?type=${context.query.type}`
    )

    return {
      establishments: establishments.data,
    }
  },
  data() {
    return {
      copon_code: null,
      items: [],
      includes_orders: [],
    }
  },
  created() {
    if (Object.keys(this.products).length == 0) {
      this.$router.replace({
        name: 'products',
        query: {
          cate_id: this.$route.query.cate_id,
          cate_name: this.$route.query.cate_name,
        },
      })
    } else {
      this.items = this.products.order_data
    }
  },
  watch: {
    copon_code(current) {
      if (current == '') {
        this.copon_code = null
      }
    },
  },
  computed: {
    ...mapState({
      products: (state) => state.localStorage.cart_session,
      locations: (state) => state.localStorage.cart_orders_details,
    }),
  },
  methods: {
    backLink() {
      this.$router.back()
    },
    deleteItem(order_idx, idx) {
      this.$store.commit('localStorage/REMOVE_PRODUCT', {
        order_indx: order_idx,
        product_indx: idx,
      })
      if (
        this.products.order_data.length > 0 &&
        this.products.order_data[0].length > 0
      ) {
        this.updateInvoice('update')
      }
      if (this.products.order_data.length == 1) {
        if (this.products.order_data[0].length == 0) {
          this.$store.commit('localStorage/SET_CART_SESSION', {})
          this.$store.commit('localStorage/SET_CART_ORDER_DETAILS', [])
        }
      }
    },
    async updateInvoice(type) {
      this.$nuxt.$loading.start()
      const form_data = new FormData()
      this.products.order_data.forEach((order, indx) => {
        order.forEach((elem, idx) => {
          form_data.append(`product_id[${indx}][${idx}][id]`, elem.product_id)
          form_data.append(`product_id[${indx}][${idx}][qty]`, elem.qty)
        })
      })
      if (this.copon_code != null) {
        form_data.append('coupon_code', this.copon_code)
      }
      await this.$axios
        .post('/order-invoices', form_data)
        .then((res) => {
          this.$store.commit('localStorage/SET_CART_SESSION', res.data.data)
          if (type == 'confirm') {
            this.$router.push(
              this.localePath({
                name: 'checkout-pay',
                query: {
                  cate_id: this.$route.query.cate_id,
                  cate_name: this.$route.query.cate_name,
                },
              })
            )
          }
        })
        .catch((err) => {
          this.TriggerNotify('error', err.response.data.message)
        })

      this.$nuxt.$loading.finish()
    },
  },
}
