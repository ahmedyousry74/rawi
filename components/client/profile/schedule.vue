<template>
  <div class="schedule pt-5 pb-5">
    <b-container>
      <h4>{{ $t('schedule') }}</h4>
      <div class="order_sec" v-for="schedule in Schedule" :key="schedule.id">
        <NuxtLink
          :to="localePath('/profile/schedule-details/' + schedule.id)"
          class="w-100"
        >
          <ul
            class="d-flex justify-content-start align-items-start flex-column w-100"
            style="gap: 7px"
          >
            <li class="id__">#{{ schedule.id }}</li>
            <li class="ty__pe">
              {{ $t('order_place') }} : {{ schedule.status }}
            </li>
            <li class="name__">
              {{ $t('over_price') }} : {{ schedule.value_added }}
            </li>
            <li class="address__">
              {{ $t('ship_cost') }} :
              {{ schedule.value_shipping }}
            </li>
            <li class="address__">
              {{ $t('total_order') }} : {{ schedule.total_invoice }}
            </li>
          </ul>
        </NuxtLink>
      </div>
      <div
        v-if="Schedule == false"
        class="d-flex justify-content-center align-items-center flex-column p-5"
      >
        <img src="@/assets/images/no-order.svg" alt="" />
        <span class="mt-4"> {{ $t('no_orders') }} </span>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Schedule: [],
      orderSchedule: [],
      orderProducts: [],
      meta: '',
      currentPage: 1,
      totalNoti: null,
    }
  },
  methods: {
    async getScheduleOrders() {
      try {
        const response = await this.$axios.get(`/get-order-scheduled?page=${this.currentPage}`)
        const schedules = []
        for (let i = 0; i < response.data.data.length; i++) {
          schedules.push(response.data.data[i])
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
        this.orderProducts = orderProducts
      } catch (error) {
        // handle error
      }
    },
  },
  mounted() {
    this.getScheduleOrders()
  },
}
</script>

<style lang="scss">
.schedule {
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
}
</style>
