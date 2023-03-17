<template>
  <div class="checkout_main_wrapper">
    <div class="container-fluid">
      <div class="title_box">
        <a href="javascript:;" @click="backLink" class="back_link">
          {{ $t('detrmine_quntity') }}
        </a>
        <span> / </span>
        <nuxt-link :to="localePath('/')" class="back_link">{{
          $t('home')
        }}</nuxt-link>
        <h4 class="main_title">{{ $t('order_detials') }}</h4>
      </div>
      <!-- end::title_box -->

      <client-only>
        <div class="row">
          <div class="col-lg-9">
            <div class="white_box" v-if="Object.keys(products).length > 0">
              <div class="order_items">
                <div class="accordion" role="tablist">
                  <b-card
                    no-body
                    v-for="(order, index) in products.order_data"
                    :key="index + 100"
                  >
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle="'accordion-' + index">
                        <div class="locations_wrapper">
                          <img
                            src="~/assets/images/mosque-icon.svg"
                            alt="icon"
                          />
                          <div class="info">
                            <h6 class="title">{{ locations[index].name }}</h6>
                            <p>
                              <svg class="icon">
                                <use
                                  xlink:href="~/static/icons/solid.svg#location-dot"
                                ></use>
                              </svg>
                              <span>{{ locations[index].city }}</span>
                            </p>
                          </div>
                        </div>
                        <!-- end::locations_wrapper -->
                      </b-button>
                    </b-card-header>
                    <b-collapse
                      :id="`accordion-${index}`"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <div
                          class="wrapper"
                          v-for="(item, idx) in order"
                          :key="idx"
                        >
                          <div class="item image">
                            <img
                              :src="item.product_image"
                              alt="product_image"
                            />
                            <div>
                              <p class="name">{{ item.product_name }}</p>
                              <p class="price">
                                {{ item.price + ' ' + $t('ryal') }}
                              </p>
                            </div>
                          </div>
                          <!-- end::item -->
                          <div class="item info">
                            <span> {{ $t('order_quntity') }} </span>
                            <span> {{ item.qty }} </span>
                          </div>
                          <!-- end::item -->
                          <div class="item info">
                            <span> {{ $t('order_total') }} : </span>
                            <span> {{ item.total }} </span>
                          </div>
                          <!-- end::item -->
                          <div class="item reset">
                            <button
                              type="button"
                              class="btn btn-trash"
                              @click="deleteItem(index, idx)"
                            >
                              <svg class="icon">
                                <use
                                  xlink:href="~/static/icons/solid.svg#trash-can"
                                ></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <!-- end::wrapper -->
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>
              </div>
              <!-- end::order_items -->
            </div>
            <div class="empty_wrapper text-center" v-else>
              <p class="text-danger">{{ $t('cart_empty_check') }}</p>
            </div>
          </div>
          <!-- end::row -->
          <div class="col-lg-3">
            <div class="checkout_wrapper">
              <div
                class="white_box gray_bg"
                v-if="Object.keys(products).length > 0"
              >
                <div class="main_title">{{ $t('order_summery') }}</div>
                <div class="lines_wrapper">
                  <div class="line coupon">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="copon_code"
                      />
                      <button
                        type="button"
                        class="btn btn-default btn_coupon"
                        @click="updateInvoice('update')"
                      >
                        {{ $t('apply') }}
                      </button>
                    </div>
                  </div>
                  <!-- end::line -->
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
                      @click="updateInvoice('confirm')"
                    >
                      {{ $t('confirm_order') }}
                    </button>
                  </div>
                  <!-- end::line -->
                </div>
                <!-- end::lines_wrapper -->
              </div>
              <div class="white_box gray_bg" v-else>
                <div class="main_title">{{ $t('order_summery') }}</div>
                <div class="lines_wrapper">
                  <div class="line">
                    <span> {{ $t('order_price') }} </span>
                    <span> {{ `0.00` + ' ' + $t('ryal') }} </span>
                  </div>
                  <!-- end::line -->
                  <div class="line">
                    <span> {{ $t('over_price') }} </span>
                    <span> {{ `0.00` + ' ' + $t('ryal') }} </span>
                  </div>
                  <!-- end::line -->
                  <div class="line">
                    <span> {{ $t('discount_value') }} </span>
                    <span>
                      {{ `0.00` + ' ' + $t('ryal') }}
                    </span>
                  </div>
                  <!-- end::line -->
                  <div class="line">
                    <span> {{ $t('coupon_discount') }} </span>
                    <span>
                      {{ `0.00` + ' ' + $t('ryal') }}
                    </span>
                  </div>
                  <!-- end::line -->
                  <div class="line">
                    <span> {{ $t('ship_cost') }} </span>
                    <span>
                      {{ `0.00` + ' ' + $t('ryal') }}
                    </span>
                  </div>
                  <!-- end::line -->
                  <div class="line total">
                    <span> {{ $t('cum') }} </span>
                    <span>
                      {{ `0.00` + ' ' + $t('ryal') }}
                    </span>
                  </div>
                  <!-- end::line -->
                  <div class="line submit">
                    <button
                      type="button"
                      class="btn btn-default"
                      disabled
                      @click="updateInvoice('confirm')"
                    >
                      {{ $t('confirm_order') }}
                    </button>
                  </div>
                  <!-- end::line -->
                </div>
                <!-- end::lines_wrapper -->
              </div>
            </div>
            <!-- end::checkout_wrapper -->
          </div>
        </div>
        <!-- end::row -->
      </client-only>
    </div>
  </div>
</template>

<script src="~/pages/checkout/map/-script.js"></script>

<style lang="scss" scoped>
.checkout_main_wrapper {
  padding-block: 70px;
  .title_box {
    margin-bottom: 30px;
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
  .checkout_wrapper {
    .main_title {
      font-size: 18px;
      font-weight: 700;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
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
  }
  .white_box {
    padding: 25px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    &.gray_bg {
      background-color: #fafafa;
    }
    .order_items {
      .wrapper {
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:last-child {
          border-bottom: none;
        }
        .item {
          &.image {
            display: flex;
            align-items: center;
            img {
              width: 110px;
              height: 110px;
              border-radius: 8px;
              margin-inline-end: 10px;
              border: 1px solid #eee;
            }
            .name {
              font-weight: 500;
              margin-bottom: 8px;
            }
            .price {
              font-weight: 600;
              color: $primary-color;
              margin-bottom: 0;
            }
          }
          &.info {
            span {
              font-weight: 600;
              &:first-child {
                color: $primary-color;
                margin-inline-end: 5px;
                font-weight: 500;
              }
            }
          }
          &.counter {
            display: flex;
            justify-content: center;
            align-items: center;
            .form-control {
              width: 50px;
              border: none !important;
              box-shadow: none !important;
              height: 30px;
              text-align: center;
              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              &[type='number'] {
                -moz-appearance: textfield;
              }
            }
            .btn {
              width: 30px;
              height: 30px;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0;
              .icon {
                width: 14px;
                height: 14px;
              }
              &.btn-increase {
                background-color: $primary-color;
                .icon {
                  fill: #fff;
                }
              }
              &.btn-decrease {
                background-color: #eeeeee;
                .icon {
                  fill: #000;
                }
              }
            }
          }
          &.reset {
            display: flex;
            justify-content: flex-end;
            .btn {
              padding: 0;
              box-shadow: none !important;
              border: none !important;
              .icon {
                width: 18px;
                height: 18px;
                fill: #c93737;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.accordion {
  .card {
    margin-bottom: 20px;
    border-radius: 8px !important;
    border-bottom: 1px solid $second-color !important;
    border-color: $second-color;
  }
  .card-header {
    background-color: #fff;
    .btn-secondary {
      background-color: transparent !important;
      text-align: start;
      padding: 0;
      color: #000 !important;
      border: none;
      box-shadow: none;
      .locations_wrapper {
        display: flex;
        align-items: center;
        padding: 12px 25px;
        img {
          width: 70px;
          height: 70px;
          margin-inline-end: 10px;
        }
        .info {
          .title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 5px;
          }
          p {
            margin-bottom: 0;
            .icon {
              width: 15px;
              height: 15px;
              fill: $second-color;
              margin-inline-end: 6px;
            }
          }
        }
      }
    }
  }
}
</style>
