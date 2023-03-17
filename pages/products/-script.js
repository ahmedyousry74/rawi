import { mapGetters } from 'vuex'
export default {
  name: 'CategoryProduct',
  async asyncData(context) {
    const products = await context.$axios.$get(
      `/products?category_id=${context.query.cate_id}`
    )

    return { products: products.data }
  },
  created() {
    this.products.forEach((elem) => {
      this.counters.push({ id: elem.id, value: 0 })
    })
  },
  computed: {
    ...mapGetters({
      userToken: ['localStorage/userToken'],
    }),
  },
  data() {
    return {
      counters: [],
      disabled: false,
    }
  },
  methods: {
    handleCounter(type, idx) {
      if (type == 'increase') {
        if (this.counters[idx].value < 99) {
          this.counters[idx].value = this.counters[idx].value + 1
        }
      } else if (type == 'decrease') {
        if (this.counters[idx].value != 0) {
          this.counters[idx].value = this.counters[idx].value - 1
        }
      } else if (type == 'reset') {
        this.counters[idx].value = 0
      }
    },
    checkCounter(idx, item) {
      this.counters[idx].value = parseInt(this.counters[idx].value)
      if (this.counters[idx].value > item.amount) {
        this.counters[idx].value = item.amount
      }
    },
    async handleCart() {
      if (this.userToken == null) {
        this.TriggerNotify('error', this.$t('login_first'))
        this.$router.push(this.localePath('/auth/login'))
      } else {
        this.disabled = true
        const form_data = new FormData()
        let check_cart = 0
        this.counters.forEach((elem, idx) => {
          if (elem.value > 0) {
            check_cart++
            form_data.append(`product_id[0][${idx}][id]`, elem.id)
            form_data.append(`product_id[0][${idx}][qty]`, elem.value)
          }
        })
        if (check_cart > 0) {
          await this.$axios
            .post('/order-invoices', form_data)
            .then((res) => {
              this.$store.commit('localStorage/SET_CART_SESSION', res.data.data)
              this.$router.push(
                this.localePath({
                  name: 'checkout',
                  query: {
                    cate_id: this.$route.query.cate_id,
                    cate_name: this.$route.query.cate_name,
                  },
                })
              )
            })
            .catch((err) => {
              this.TriggerNotify('error', err.response.data.message)
            })
        } else {
          this.TriggerNotify('error', this.$t('cart_empty_check'))
          this.disabled = false
        }
        this.disabled = false
      }
    },
  },
}
