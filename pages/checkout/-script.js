// importing vuex tools
import { mapState } from 'vuex'

export default {
  name: 'CheckoutPage',
  data() {
    return {
      copon_code: null,
      items: [],
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
      this.products.order_data[0].forEach((elem) => {
        this.items.push({ id: elem.product_id, value: elem.qty })
      })
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
    }),
  },
  methods: {
    backLink() {
      this.$router.back()
    },
    deleteItem(idx) {
      this.items.splice(idx, 1)
      if (this.items.length > 0) {
        this.updateInvoice('update')
      }
    },
    async updateInvoice(type) {
      this.$nuxt.$loading.start()
      const form_data = new FormData()
      let check_cart = 0
      this.items.forEach((elem, idx) => {
        if (elem.value > 0) {
          check_cart++
          form_data.append(`product_id[0][${idx}][id]`, elem.id)
          form_data.append(`product_id[0][${idx}][qty]`, elem.value)
        }
      })
      if (this.copon_code != null) {
        form_data.append('coupon_code', this.copon_code)
      }
      if (check_cart > 0) {
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
      } else {
        this.TriggerNotify('error', this.$t('cart_empty_check'))
        this.disabled = false
      }

      this.$nuxt.$loading.finish()
    },
  },
}
