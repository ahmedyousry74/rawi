<template>
  <div class="checkout_main_wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-5">
          <div class="title_box">
            <nuxt-link
              :to="
                localePath({
                  name: 'checkout',
                  query: {
                    cate_id: $route.query.cate_id,
                    cate_name: $route.query.cate_name,
                  },
                })
              "
              class="back_link"
            >
              {{ $t('back') }}
            </nuxt-link>
            <span> / </span>
            <nuxt-link :to="localePath('/')" class="back_link">{{
              $t('home')
            }}</nuxt-link>
            <h4 class="main_title">{{ $t('payment_details') }}</h4>
          </div>
          <!-- end::title_box -->

          <div class="white_box gray_bg">
            <h5 class="sub_title">{{ $t('payment_method') }}</h5>
            <div class="payment_methods">
              <div v-for="(item, idx) in payments" :key="idx">
                <input
                  type="radio"
                  name="payment_method"
                  :id="`${item.payment}`"
                  :value="item.id"
                  v-model="payment_method"
                />
                <label :for="`${item.payment}`">
                  <img
                    src="~/assets/images/visa.png"
                    alt="icon"
                    v-if="item.id == 1"
                  />
                  <img
                    src="~/assets/images/master.png"
                    alt="icon"
                    v-if="item.id == 2"
                  />
                  <img
                    src="~/assets/images/mada.png"
                    alt="icon"
                    v-if="item.id == 3"
                  />
                </label>
              </div>
            </div>
            <!-- end::payment_methods -->

            <div class="lines_wrapper">
              <div class="line">
                <span> {{ $t('order_price') }} </span>
                <span> {{ products.order_price + ' ' + $t('ryal') }} </span>
              </div>
              <!-- end::line -->
              <div class="line">
                <span> {{ $t('over_price') }} </span>
                <span> {{ products.value_added + ' ' + $t('ryal') }} </span>
              </div>
              <!-- end::line -->
              <div class="line">
                <span> {{ $t('discount_value') }} </span>
                <span>
                  {{ products.offer_discount + ' ' + $t('ryal') }}
                </span>
              </div>
              <!-- end::line -->
              <div class="line">
                <span> {{ $t('coupon_discount') }} </span>
                <span>
                  {{ products.coupon_discount + ' ' + $t('ryal') }}
                </span>
              </div>
              <!-- end::line -->
              <div class="line">
                <span> {{ $t('ship_cost') }} </span>
                <span>
                  {{ products.value_shipping + ' ' + $t('ryal') }}
                </span>
              </div>
              <!-- end::line -->
              <div class="line total">
                <span> {{ $t('cum') }} </span>
                <span>
                  {{ products.total_order + ' ' + $t('ryal') }}
                </span>
              </div>
              <!-- end::line -->
              <div class="line submit">
                <button
                  type="button"
                  class="btn btn-default"
                  :disabled="disabled"
                  @click="submitOrder"
                >
                  <b-spinner small variant="light" v-if="disabled"></b-spinner>
                  {{ $t('confirm') }}
                </button>
              </div>
              <!-- end::line -->
            </div>
            <!-- end::lines_wrapper -->
          </div>
          <!-- end::white_box -->
        </div>
        <!-- end::col -->
      </div>
      <!-- end::row -->

      <b-modal
        ref="success_payment"
        id="success_payment"
        hide-footer
        no-close-on-backdrop
        hide-header-close
      >
        <div
          class="d-flex justify-content-center align-items-center flex-column logout_content"
        >
          <svg class="icon payment_icon">
            <use xlink:href="~/static/icons/solid.svg#circle-check"></use>
          </svg>
          <h2 class="payment_title">{{ $t('payment_success') }}</h2>
          <h3>{{ $t('repeat_message') }}</h3>
          <div class="choices_wrapper">
            <div>
              <input
                type="radio"
                name="repeat_process"
                id="week"
                value="week"
                v-model="repeat_type"
              />
              <label for="week"> {{ $t('weekly_repeat') }} </label>
            </div>
            <div>
              <input
                type="radio"
                name="repeat_process"
                id="month"
                value="month"
                v-model="repeat_type"
              />
              <label for="month"> {{ $t('monthly_repeat') }} </label>
            </div>
            <div>
              <input
                type="radio"
                name="repeat_process"
                id="none"
                value="none"
                v-model="repeat_type"
              />
              <label for="none"> {{ $t('no_repeat') }} </label>
            </div>
          </div>
          <!-- end::choices_wrapper -->
          <div class="submit_wrapper">
            <button
              type="button"
              class="btn btn-default"
              @click="scheduleOrder"
            >
              {{ $t('confirm') }}
            </button>
          </div>
          <!-- end::submit_wrapper -->
        </div>
      </b-modal>

      <b-modal
        ref="failed_payment"
        id="failed_payment"
        hide-footer
        no-close-on-backdrop
        hide-header-close
      >
        <div
          class="d-flex justify-content-center align-items-center flex-column logout_content"
        >
          <svg class="icon payment_icon failed">
            <use xlink:href="~/static/icons/solid.svg#circle-xmark"></use>
          </svg>
          <h2 class="payment_title">{{ $t('payment_failed') }}</h2>

          <!-- end::choices_wrapper -->
          <div class="submit_wrapper">
            <button
              type="button"
              class="btn btn-default"
              @click="$refs['failed_payment'].hide()"
            >
              {{ $t('close') }}
            </button>
          </div>
          <!-- end::submit_wrapper -->
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script src="~/pages/checkout/pay/-script.js"></script>

<style lang="scss" scoped>
.checkout_main_wrapper {
  padding-block: 70px;
  .row {
    justify-content: center;
  }
  .title_box {
    margin-bottom: 30px;
    text-align: center;
    .back_link {
      font-weight: 600;
      color: $primary-color;
      text-decoration: underline !important;
    }
    .main_title {
      font-size: 22px;
      font-weight: 700;
      color: #000;
      margin-top: 10px;
    }
  }
  .white_box {
    padding: 25px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    &.gray_bg {
      background-color: #00589405;
    }
    .sub_title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .lines_wrapper {
      .line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-block: 10px;
        .btn_coupon {
          width: 85px;
          height: 45px;
          padding: 0;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent
            linear-gradient(180deg, #008f7a 0%, #005894 100%) 0% 0% no-repeat
            padding-box;
          box-shadow: none;
          border-radius: 10px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          color: #fff;
          font-weight: 500;
        }
        .form-control {
          height: 45px;
          box-shadow: none !important;
          border-radius: 8px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          &:focus {
            border-color: $second-color;
          }
        }
        &.submit {
          .btn {
            display: block;
            width: 100%;
            padding: 10px 25px;
            background: transparent
              linear-gradient(180deg, #008f7a 0%, #005894 100%) 0% 0% no-repeat
              padding-box;
            box-shadow: none;
            border-radius: 32px 32px 32px 0px;
            color: #fff;
            font-weight: 600;
          }
        }
        span {
          &:first-child {
            font-weight: 500;
            color: $primary-color;
          }
          &:last-child {
            font-weight: 500;
            color: #000;
          }
        }
        &.total {
          border-top: 1px solid #eee;
          margin-top: 10px;
          span {
            font-size: 18px;
            font-weight: 600;
            color: $primary-color;
          }
        }
      }
    }
    .payment_methods {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
      div {
        display: flex;
        align-items: center;
        margin-inline-end: 25px;
        input {
          margin-inline-end: 8px;
        }
        label {
          width: 80px;
          height: 50px;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 8px;
          img {
            width: 80%;
            height: 70%;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.choices_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block: 20px 30px;
  div {
    margin-inline-end: 20px;
    input {
      display: none;
      &:checked + label {
        background-color: $primary-color;
        border-color: $primary-color;
        color: #fff;
      }
    }
    label {
      min-width: 130px;
      padding-block: 8px;
      padding-inline: 15px;
      font-weight: 500;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1px solid #eee;
      border-radius: 8px;
      transition: all 0.25s;
    }
  }
}
.payment_icon {
  width: 65px;
  height: 65px;
  fill: $primary-color;
  &.failed {
    fill: #dc3545;
  }
}
.payment_title {
  font-size: 25px;
  font-weight: 700;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  text-align: center;
}
</style>
