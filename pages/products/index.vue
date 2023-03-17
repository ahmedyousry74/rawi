<template>
  <div class="category_products_wrapper">
    <div class="container-fluid">
      <nuxt-link :to="localePath('/')" class="back_link">{{
        $t('home')
      }}</nuxt-link>
      <h4 class="main_title">{{ $route.query.cate_name }}</h4>

      <div class="white_box">
        <div class="wrapper" v-for="(item, idx) in products" :key="idx">
          <div class="item image">
            <img :src="item.categories_image" alt="product_image" />
            <div>
              <p class="name">
                {{ item.name }}
              </p>
              <p class="price">{{ item.price + ' ' + item.unit }}</p>
            </div>
          </div>
          <!-- end::item -->
          <div class="item counter">
            <button
              type="button"
              class="btn btn-increase"
              @click="handleCounter('increase', idx)"
            >
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#plus"></use>
              </svg>
            </button>
            <input
              type="number"
              class="form-control"
              v-model="counters[idx].value"
              @input="checkCounter(idx, item)"
            />
            <button
              type="button"
              class="btn btn-decrease"
              @click="handleCounter('decrease', idx)"
            >
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#minus"></use>
              </svg>
            </button>
          </div>
          <!-- end::item -->
          <div class="item reset">
            <button
              type="button"
              class="btn btn-trash"
              @click="handleCounter('reset', idx)"
            >
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#trash-can"></use>
              </svg>
            </button>
          </div>
        </div>
        <!-- end::wrapper -->
      </div>
      <!-- end::white_box -->

      <div class="submit_wrapper">
        <button
          type="button"
          class="btn btn-submit"
          @click="handleCart"
          :disabled="disabled"
        >
          <b-spinner small variant="light" v-if="disabled"></b-spinner>
          {{ $t('add_card') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script src="~/pages/products/-script.js"></script>

<style lang="scss" scoped>
.category_products_wrapper {
  padding-block: 70px;
  position: relative;
  .back_link {
    font-weight: 600;
    color: $primary-color;
    text-decoration: underline !important;
  }
  .main_title {
    font-size: 22px;
    font-weight: 700;
    color: #000;
    margin-bottom: 25px;
    margin-top: 10px;
  }
  .white_box {
    padding: 30px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
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
        width: calc(50% / 2);
        @media (max-width: 991px) {
          width: 100% !important;
          justify-content: center !important;
        }
        &.image {
          display: flex;
          align-items: center;
          width: 50%;
          @media (max-width: 500px) {
            flex-direction: column;
            text-align: center;
            width: 100%;
          }
          img {
            width: 110px;
            height: 110px;
            border-radius: 8px;
            margin-inline-end: 10px;
            border: 1px solid #eee;
          }
          .name {
            font-weight: 600;
            margin-bottom: 5px;
            font-size: 18px;
          }
          .qyt {
            font-size: 14px;
            font-weight: 600;
            color: $primary-color;
          }
          .price {
            font-weight: 600;
            color: $primary-color;
            margin-bottom: 0;
            margin-top: 5px;
          }
        }
        &.counter {
          display: flex;
          justify-content: center;
          align-items: center;
          .form-control {
            width: 80px;
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
  .submit_wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 45px;
    .btn-submit {
      min-width: 180px;
      padding: 10px 25px;
      background: transparent linear-gradient(180deg, #008f7a 0%, #005894 100%)
        0% 0% no-repeat padding-box;
      box-shadow: none;
      border-radius: 32px 32px 32px 0px;
      color: #fff;
      font-weight: 600;
    }
  }
}
</style>
