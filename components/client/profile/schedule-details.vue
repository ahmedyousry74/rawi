<template>
  <section class="schedule_details pb-5">
    <b-container>
      <div class="" v-for="schedule in Schedule" :key="schedule.id">
        <div v-if="schedule.id == $route.params.id">
          <div
            class="order_sec"
            v-for="orderschedule in schedule.orders"
            :key="orderschedule"
          >
            <!-- <nuxt-link
              :to="
                localePath(
                  '/profile/schedule-details/product-schedule/' +
                    orderschedule.id
                )
              "
              class="w-100"
            > -->
            <p>
            </p>
            <ul
              class="d-flex justify-content-start align-items-start flex-column w-100"
              style="gap: 7px"
            >
              <li class="ty__pe" v-if="orderschedule.establishment_name">
                {{ $t('order_type') }} :
                {{ orderschedule.establishment_name }}
              </li>
              <li class="name__">
                {{ $t('esti_name') }} : {{ orderschedule.category_name }}
              </li>
              <li class="address__" v-if="orderschedule.establishment_address">
                {{ $t('esti_address') }} :
                {{ orderschedule.establishment_address }}
              </li>
              <li class="address__">
                {{ $t('total_donations') }} :
                {{ orderschedule.product_count }}
              </li>
            </ul>
            <div
              class="order_sec"
              v-for="orderProduct in orderschedule.order_product"
              :key="orderProduct"
            >
              <ul
                class="d-flex justify-content-start align-items-start flex-column w-100"
                style="gap: 7px"
              >
                <li class="ty__pe" v-if="orderProduct.product_name">
                  {{ $t('product_name') }} : {{ orderProduct.product_name }}
                </li>
                <li class="name__">
                  {{ $t('order_quntity') }} : {{ orderProduct.qty }}
                </li>
                <li class="address__" v-if="orderProduct.price">
                  {{ $t('price') }} : {{ orderProduct.price }}
                  {{ $t('ryal') }}
                </li>
              </ul>
            </div>
            <!-- </nuxt-link> -->
            <div
              class="btns__actions d-flex justify-content-center align-items-center flex-row mt-3"
              style="gap: 20px"
            >
              <button @click="cancelSchedule">{{ $t('cancel_schedule') }}</button>
              <button @click="orderInvoiceSchedule" v-if="ShowBtn">
                {{ $t('payment') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      Schedule: [],
      orders: [],
      order_product: [],
      nextDate: '',
      invoiceId: ''
    }
  },
  methods: {
    async getScheduleOrders() {
      try {
        const response = await this.$axios.get(`/get-order-scheduled`)
        const schedules = []
        for (let i = 0; i < response.data.data.length; i++) {
          schedules.push(response.data.data[i])
          if (schedules[i].id == this.$route.params.id) {
              this.nextDate = schedules[i].next_date
              this.actualDate = schedules[i].actual_date
              this.scheduleId = schedules[i].id
              this.invoiceId = schedules[i].invoice_id
            }
        }
        const orders = []
        for (let a = 0; a < schedules.length; a++) {
          for (let b = 0; b < schedules[a].orders.length; b++) {
            orders.push(schedules[a].orders[b])
          }
        }
        const orderProducts = []
        for (let c = 0; c < orders.length; c++) {
          for (let d = 0; d < orders[c].order_product.length; d++) {
            orderProducts.push(orders[c].order_product[d])
          }
        }
        this.Schedule = schedules
        this.orders = orders
        this.order_product = orderProducts
      } catch (error) {
        // handle error
      }
    },
    async orderInvoiceSchedule() {
      const form_data = new FormData()
      form_data.append('invoice_id', this.invoiceId)
      this.$axios.post('/pay-order-scheduled', form_data)
      .then((res) => {
        window.location.href = res.data.payment_link
      })
      .catch((err) => {
        this.TriggerNotify('error', err.response.data.message)
      })
    },
    // async orderInvoiceSchedule() {
    //   const formData = new FormData()
    //   const orderProduct = this.order_product
    //   const productArray = [orderProduct]
    //   productArray.forEach((product, i) => {
    //     formData.append(`product_id[${i}][0][id]`, product.product_id)
    //     formData.append(`product_id[${i}][0][qty]`, product.qty)
    //   })
    //   try {
    //     const res = await this.$axios.post('/order-invoices', formData)
    //     this.TriggerNotify('success', res.data.message)
    //     this.$router.push(
    //       this.localePath({
    //         name: 'checkout',
    //         query: { cate_id: 7 },
    //       })
    //     )
    //   } catch (err) {
    //     this.TriggerNotify('error', err.response.data.message)
    //   }
    // },
    async cancelSchedule(){
      const form_data = new FormData()
      form_data.append('invoice_id', this.invoiceId)
      this.$axios.post('/cancel-order-schedule', form_data)
      .then((response) => {
        this.TriggerNotify('succes', response.data.message)
        this.$router.push(this.localePath('/profile#v-pills-schedule'))
      })
      .catch((err) => {
        this.TriggerNotify('error', err.response.data.message)
      })
    }
  },
  mounted() {
    this.getScheduleOrders()
  },
  computed: {
    ShowBtn() {
      const today = new Date()
      const selectedDate = new Date(this.actualDate)
      return selectedDate <= today
    },
  },
}
</script>

<style lang="scss">
.schedule_details {
  h4 {
    font-weight: bold;
    margin-bottom: 25px;
  }
  svg {
    width: 15px;
    height: 15px;
    fill: #00000029;
  }
  .order_sec {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 30px 20px;
    border-radius: 5px;
    margin-top: 35px;
    .id__ {
      font-weight: bold;
      color: #000;
    }
    .name__,
    .address__,
    .address__,
    .total__,
    .ty__pe {
      font-weight: normal;
      color: #042a44;
    }
  }
  .btns__actions {
    button {
      background: linear-gradient(to bottom, #008f7a, #005894) !important;
      border-radius: 25px 25px 25px 0;
      padding: 10px 25px;
      color: #fff;
      width: 70%;
      margin-bottom: 20px;
    }
  }
}
</style>
