// importing vuex tools
import { mapState } from 'vuex'

export default {
  name: 'PayOrder',
  async asyncData(context) {
    const payments = await context.$axios.$get('/get-payments')

    return { payments: payments.data }
  },
  data() {
    return {
      disabled: false,
      loading: false,
      items: [],
      payment_method: 1,
      repeat_type: 'week',
      invoice_id: null,
    }
  },
  created() {
    if (Object.keys(this.products).length > 0) {
      this.products.order_data[0].forEach((elem) => {
        this.items.push({ id: elem.product_id, value: elem.qty })
      })
    } else {
      this.$router.replace({
        name: 'products',
        query: {
          cate_id: this.$route.query.cate_id,
          cate_name: this.$route.query.cate_name,
        },
      })
    }
  },
  mounted() {
    if (this.$route.query.payment_status == 'success') {
      this.invoice_id = this.$route.query.invoice_id
      // this.$refs['logout_modal'].show()
      this.$bvModal.show('success_payment')
    } else if (this.$route.query.payment_status == 'failed') {
      // this.$refs['failed_payment'].show()
      this.$bvModal.show('failed_payment')
    }
  },
  computed: {
    ...mapState({
      products: (state) => state.localStorage.cart_session,
      locations: (state) => state.localStorage.cart_orders_details,
    }),
  },
  methods: {
    async submitOrder() {
      this.disabled = true
      const form_data = new FormData()
      this.items.forEach((elem, idx) => {
        form_data.append(`product_id[0][${idx}][id]`, elem.id)
        form_data.append(`product_id[0][${idx}][qty]`, elem.value)
      })
      if (this.locations.length > 0) {
        this.locations.forEach((location, idx) => {
          if (location.id == 'map') {
            form_data.append(`address[${idx}]`, location.city)
            form_data.append(`establishment_name[${idx}]`, location.name)
            form_data.append(`lat[${idx}]`, location.lat)
            form_data.append(`lon[${idx}]`, location.lon)
          } else {
            form_data.append(`establishment_id[${idx}]`, location.id)
          }
        })
        form_data.append(`establishment_type`, this.locations[0].type)
      }
      form_data.append('payment_method_id', this.payment_method)
      form_data.append('category_id', this.$route.query.cate_id)

      await this.$axios
        .post('/new-order', form_data)
        .then((res) => {
          if (res.data.status == false) {
            this.TriggerNotify('error', res.data.message)
          } else {
            this.TriggerNotify('success', res.data.message)
            window.location.href = res.data.payment_link
          }
        })
        .catch((err) => {
          this.TriggerNotify('error', err.response.data.message)
        })
    },
    async scheduleOrder() {
      this.loading = true
      if (this.repeat_type != 'none') {
        const form_data = new FormData()
        form_data.append('invoice_id', this.invoice_id)
        form_data.append('type', this.repeat_type)

        await this.$axios
          .post('/order-schedule', form_data)
          .then((res) => {
            this.TriggerNotify('success', this.$t('order_completed'))
          })
          .catch((err) => {
            this.TriggerNotify('error', err.response.data.message)
            this.loading = false
          })
      }
      this.loading = false
      this.$bvModal.hide('success_payment')
      this.$bvModal.hide('failed_payment')
      this.$store.commit('localStorage/SET_CART_SESSION', {})
      this.$store.commit('localStorage/SET_CART_ORDER_DETAILS', [])
      this.$router.replace(this.localePath('/'))
    },
  },
}
