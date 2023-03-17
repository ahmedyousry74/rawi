<template>
  <section class="order__details p-5">
    <b-container>
      <div class="order__item">
        <h3>{{ $t('order_detials') }}</h3>
        <div class="order_sec">
          <h6>{{ $t('order_detials') }}</h6>
          <ul
            class="d-flex justify-content-start align-items-start flex-column"
            style="gap: 7px"
          >
            <li>
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#hashtag"></use>
              </svg>
              <span> {{ $t('order_num') }} :</span>
              <span> {{ orderDetails.id }} </span>
            </li>
            <li>
              <svg class="icon">
                <use xlink:href="~/static/icons/regular.svg#font-awesome"></use>
              </svg>
              <span> {{ $t('order_type') }} : </span>
              <span>
                {{ orderDetails.establishment_type }}
              </span>
            </li>
            <li v-if="orderDetails.establishment_name !== ''">
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#street-view"></use>
              </svg>
              <span> {{ $t('esti_name') }} :</span>
              <span>{{ orderDetails.establishment_name }}</span>
            </li>
            <li v-if="orderDetails.establishment_name !== ''">
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#location-dot"></use>
              </svg>
              <span> {{ $t('esti_address') }} : </span>
              <span>
                {{ orderDetails.establishment_address }}
              </span>
            </li>
            <li>
              <svg class="icon">
                <use
                  xlink:href="~/static/icons/regular.svg#calendar-days"
                ></use>
              </svg>
              <span> {{ $t('order_date') }} :</span>
              <span>{{ orderDetails.order_date }}</span>
            </li>
            <li>
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#dollar-sign"></use>
              </svg>
              <span>{{ $t('order_quntity') }} </span>
              <span>{{ orderDetails.product_count }}</span>
            </li>
          </ul>
        </div>
        <div class="order_sec summary__order">
          <h6>{{ $t('order_summary') }}</h6>
          <ul
            class="d-flex justify-content-between align-items-start flex-column"
            style="gap: 7px"
          >
            <li>
              <span> {{ $t('order_price') }} </span>
              <span> {{ total_invoice.order_price }} </span>
            </li>
            <li>
              <span> {{ $t('over_price') }} </span>
              <span>{{ total_invoice.value_added }}</span>
            </li>
            <li>
              <span> {{ $t('ship_cost') }} </span>
              <span>{{ total_invoice.value_shipping }} </span>
            </li>
            <li class="total__">
              <span> {{ $t('cum') }} </span>
              <span> {{ orderDetails.total_order }} ريال</span>
            </li>
          </ul>
        </div>
        <div
          class="show__images"
          v-if="orderDetails.order_status == 'finished'"
        >
          <h6>{{ $t('attachement') }}</h6>
          <div
            class="d-flex justify-content-start align-items-start flex-row flex-wrap"
            style="gap: 10px"
          >
            <div v-for="(image, index) in orderImages" :key="index">
              <img :src="image.image_data" />
            </div>
            <p
              v-if="orderImages.length <= 0"
              class="w-100 d-flex justify-content-center"
              style="color: red !important"
            >
              لا يوجد مرفقات
            </p>
          </div>
        </div>
        <div
          class="btns__actions d-flex justify-content-center align-items-center flex-wrap flex-column mt-3"
        >
          <button
            id="show-btn"
            @click="cancel_order = true"
            v-if="orderDetails.order_status == 'new'"
          >
            {{ $t('cancel_order') }}
          </button>
          <button
            v-if="orderDetails.order_status !== 'new'"
            id="show-btn"
            @click="repeat_order = true"
          >
            {{ $t('repeat_order') }}
          </button>
        </div>
      </div>
    </b-container>
    <!-- modal cancel order-->
    <b-modal id="cancel-order" v-model="cancel_order" hide-footer>
      <div class="d-block text-center">
        <h3>{{ $t('ru_cancel_order') }}</h3>
      </div>
      <div class="actions_btns">
        <b-button class="mt-3" block @click="cancel_order = false">{{
          $t('close')
        }}</b-button>
        <b-button class="mt-3" block @click="CancelOrder">{{
          $t('cancel_order')
        }}</b-button>
      </div>
    </b-modal>
    <!-- modal cancel order-->
    <!-- modal repeat order-->
    <b-modal id="repeat-order" v-model="repeat_order" hide-footer>
      <div class="d-block text-center">
        <h3>{{ $t('ru_repeat_order') }}</h3>
      </div>
      <div class="actions_btns">
        <b-button class="mt-3" block @click="repeat_order = false">{{
          $t('close')
        }}</b-button>
        <b-button class="mt-3" block @click="RepeatOrder">{{
          $t('repeat_order')
        }}</b-button>
      </div>
    </b-modal>
    <!-- modal repeat order-->
  </section>
</template>

<script>
export default {
  data() {
    return {
      orderDetails: [],
      total_invoice: '',
      orderImages: [],
      catgId: '',
      catgName: '',
      cancel_order: false,
      repeat_order: false,
    }
  },
  mounted() {
    this.getOrderDetails()
  },
  methods: {
    async getOrderDetails() {
      await this.$axios
        .get(`/order-details?order_id=${this.$route.params.id}`)
        .then((response) => {
          this.orderDetails = response.data.data
          this.total_invoice = response.data.data.total_invoice
          this.orderImages = response.data.data.order_image
          this.catgId = response.data.data.category_id
          this.catgName = response.data.data.category_name
        })
        .catch((err) => {
          this.TriggerNotify('error', err.response.data.message)
        })
    },
    async CancelOrder() {
      await this.$axios
        .post(`/order-client-cancelled?order_id=${this.$route.params.id}`)
        .then((res) => {
          this.cancel_order = false
          this.TriggerNotify('success', res.data.message)
          this.$router.push(this.localePath('/profile#v-pills-orders'))
        })
        .catch((err) => {
          this.TriggerNotify('error', err.response.data.message)
        })
    },
    async RepeatOrder() {
      const catgId = this.catgId
      const catgName = this.catgName
      const form_data = new FormData()
      this.orderDetails.order_product.forEach((elem, idx) => {
        form_data.append(`product_id[0][${idx}][id]`, elem.product_id)
        form_data.append(`product_id[0][${idx}][qty]`, elem.qty)
      })
      await this.$axios
        .post(`/order-invoices`, form_data)
        .then((res) => {
          this.$store.commit('localStorage/SET_CART_SESSION', res.data.data)
          this.$router.replace(
            this.localePath({
              name: 'checkout',
              query: {
                cate_id: catgId,
                cate_name: catgName,
              },
            })
          )
        })
        .catch((err) => {
          this.TriggerNotify('error', err.response.data.message)
        })
    },
  },
}
</script>

<style lang="scss">
.order__details {
  h3 {
    font-weight: bold;
    font-size: 20px;
  }
  svg {
    width: 15px;
    height: 15px;
    fill: #00000029;
    margin-inline-end: 5px;
  }
  .order_sec,
  .show__images,
  .reason__ {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 30px 20px;
    border-radius: 5px;
    margin-top: 35px;
    h6 {
      color: #000;
      font-weight: bold;
      font-size: 15px;
      margin-bottom: 15px;
    }
    p {
      color: #000;
      margin-top: 15px;
      line-height: 2;
    }
    li {
      font-weight: normal;
      color: #042a44;
    }
    .total__ {
      padding: 10px 0;
      border-top: 1px solid #ccc;
      color: $primary-color;
      font-weight: 600;
    }
  }
  .summary__order {
    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: row;
      width: 100%;
    }
  }
  .show__images {
    img {
      width: 150px;
      border-radius: 4px;
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
