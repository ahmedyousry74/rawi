<template>
  <div class="orders__ pb-5">
    <h4> {{$t('orders')}} </h4>
    <b-button-group class="d-flex btns_group_orders" style="gap: 15px" v-model="statusOrder">
      <b-button @click='setStatusOrder("new"); resetPage()' :class="{ active: statusOrder === 'new' }" value="new">{{$t('new')}}</b-button>
      <b-button @click='setStatusOrder("approved"); resetPage()' :class="{ active: statusOrder === 'approved' }"  value="approved">{{$t('approve')}}</b-button>
      <b-button @click='setStatusOrder("finished"); resetPage()' :class="{ active: statusOrder === 'finished' }" value="finished">{{$t('finish')}}</b-button>
      <b-button @click='setStatusOrder("cancelled"); resetPage()' :class="{ active: statusOrder === 'cancelled' }"  value="cancelled">{{$t('cancel')}}</b-button>
    </b-button-group>

    <div class="order_sec" v-for="order in orderClient" :key="order.id">
        <NuxtLink :to="localePath('/profile/order-details/' + order.id)">
          <ul class=" d-flex justify-content-start align-items-start flex-column" style="gap:7px;">
            <li class="id__"> #{{ order.order_id}} </li>
            <li class="ty__pe">
              <svg class="icon">
                <use xlink:href="~/static/icons/regular.svg#font-awesome"></use>
              </svg>
              {{ $t('order_type')  }}  :  {{ order.establishment_type}}
            </li>
            <li class="name__">
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#street-view"></use>
              </svg>
              {{$t('esti_name')}}: {{ order.establishment_name}}
            </li>
            <li class="address__">
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#location-dot"></use>
              </svg>
              {{$t('esti_address')}}:  {{ order.establishment_address }}
            </li>
            <li class="address__">
              <svg class="icon">
                <use xlink:href="~/static/icons/regular.svg#calendar-days"></use>
              </svg>
              {{$t('order_date')}}: {{ order.order_date }}
            </li>
            <li class="total__">
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#dollar-sign"></use>
              </svg>
              {{$t("total_order")}}: {{ order.total_order }} {{ $t('rial') }}
            </li>
          </ul>
        </NuxtLink>
    </div>
    <div class="d-flex justify-content-center align-items-center" v-if="orderClient.length > 0">
      <b-pagination class="mt-4" v-model="currentPage" :total-rows="totalOrders" :per-page="meta.per_page"></b-pagination>
    </div>
    <div v-if="orderClient == false" class="d-flex justify-content-center align-items-center flex-column p-5">
      <img src="@/assets/images/no-order.svg" alt="">
      <span class="mt-4"> {{ $t('no_orders') }} </span>
    </div>
  </div>
</template>


<script>
export default{
  data(){
    return{
      orderClient: [],
      statusOrder: 'new',
      meta: '',
      currentPage: 1,
      totalOrders: 0,
      status: ""
    }
  },
  watch: {
    currentPage(newPage) {
      this.sendStatusOrder()
    }
  },
  methods: {
    setStatusOrder(status) {
      this.statusOrder = status;
      this.sendStatusOrder();
    },
    resetPage() {
      this.currentPage = 1;
    },
    async sendStatusOrder() {
      await this.$axios.get('/orders-client?order_status=' + this.statusOrder + "&page=" + this.currentPage)
        .then((response) => {
          this.meta = response.data.meta
          this.currentPage = response.data.meta.current_page
          this.totalOrders = response.data.meta.total
          this.orderClient = response.data.data
          this.status = response.data.status
          this.orderClient = [...this.orderClient]
        })
        .catch((err) => {
          this.orderClient = []
        })
    },
    //pagination in scroll
    // handleScroll() {
    //   const scrollHeight = document.documentElement.scrollHeight
    //   const scrollTop = document.documentElement.scrollTop
    //   const clientHeight = document.documentElement.clientHeight
    //   if (scrollTop + clientHeight >= scrollHeight) {
    //     if ( this.currentPage == this.meta.current_page && this.currentPage < this.totalOrders) {
    //       this.currentPage++
    //       this.sendStatusOrder()
    //     }
    //     if ( this.currentPage > this.meta.current_page) {
    //       this.currentPage = 1
    //       this.sendStatusOrder()
    //     }
    //   }
    // },
  },
  computed: {
  },
  created(){
    this.sendStatusOrder()
  },

  // for old pagination for scroll
  // mounted(){
  //   // this.sendStatusOrder()
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // },
}
</script>


<style lang="scss">
.orders__{
  svg{
    width: 15px;
    height: 15px;
    fill: #00000029;
  }
  h4{
    font-weight: bold;
    margin-bottom: 25px;
  }
  .btns_group_orders{
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
    position: relative;
    button{
      background-color: transparent !important;
      position: relative;
      border: 0;
      color: #00000080;
      &:focus{
        outline: none !important;
        box-shadow: none !important;
      }
      &.active{
        color: #008f7a !important;
        font-weight: bold;
        &:after{
          position: absolute;
          content: "";
          background-color: #008f7a;
          height: 3px;
          width: 100%;
          top: 50px;
          right: 0;
        }
      }
    }
  }
  .order_sec{
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 30px 20px;
    border-radius: 5px;
    margin-top: 35px;
    .id__{
      font-weight: bold;
      color: #000;
    }
    .name__,.address__,.address__,.total__,.ty__pe{
      font-weight: normal;
      color: #042A44;
    }
  }
}
.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #0a937f;
    border-color: #0a937f;
}
</style>
