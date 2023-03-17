<template>
  <div class="category_map_wrapper">
    <div class="map_wrapper">
      <div class="button_wrapper">
        <button type="button" class="btn btn-cart" @click="handleCartSubmit">
          <svg class="icon">
            <use xlink:href="~/static/icons/solid.svg#cart-shopping"></use>
          </svg>
          <span>{{ cart_counter }}</span>
        </button>
      </div>
      <!-- end::button_wrapper -->
      <div class="filter_wrapper">
        <div class="container-fluid">
          <div class="form-group">
            <div class="custom-control" v-if="$route.query.map_type == 'both'">
              <input type="checkbox" id="map_toggle" v-model="map_switch" />
              <label for="map_toggle">
                {{ $t('search_with_google') }}
              </label>
            </div>
            <div class="input-group">
              <div class="normal_search" v-if="map_type == 'system'">
                <input
                  type="search"
                  class="form-control"
                  :placeholder="
                    $route.query.cate_id == 4 || $route.query.cate_id == 5
                      ? $t('search_for') + $t('establishment')
                      : $t('search_for') + $t('mosque_city')
                  "
                  v-model="seach_field"
                  @keyup="systemSrearch"
                />
                <div
                  class="dropdown_wrapper"
                  :class="{ show: search_list.length > 0 }"
                >
                  <a
                    href="javascript:;"
                    v-for="(item, idx) in search_list"
                    :key="idx + 110"
                    @click="handleMap(item)"
                  >
                    <img src="~/assets/images/mosque-icon.svg" alt="icon" />
                    <div class="info">
                      <h6 class="title">{{ item.name }}</h6>
                      <p>
                        <svg class="icon">
                          <use
                            xlink:href="~/static/icons/solid.svg#location-dot"
                          ></use>
                        </svg>
                        <span>{{ item.city }}</span>
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div class="google_search" v-show="map_type == 'google'">
                <input
                  type="text"
                  class="form-control"
                  id="autocomplete"
                  @input="publicSearch = $event.target.value"
                  :value="publicSearch"
                  :placeholder="$t('search_with_google')"
                />
                <!-- :types="['mosque']" -->
              </div>

              <button type="button" class="btn btn-default">
                <svg class="icon">
                  <use
                    xlink:href="~/static/icons/solid.svg#magnifying-glass"
                  ></use>
                </svg>
              </button>
            </div>
            <div class="cities_wrapper">
              <VueSlickCarousel v-bind="slider_settings">
                <div v-for="(city, idx) in cities" :key="idx + 10">
                  <input
                    type="radio"
                    name="cities"
                    :value="{ lat: city.lat, lng: city.lon }"
                    :id="`city-${idx + 1}`"
                    v-model="selected_city"
                  />
                  <label :for="`city-${idx + 1}`">{{ city.name }}</label>
                </div>
              </VueSlickCarousel>
            </div>
          </div>
          <!-- end::form-group -->
        </div>
      </div>
      <!-- end::filter_wrappers -->

      <!-- <GmapMap
        :center="center"
        :zoom="map_zoom"
        map-type-id="roadmap"
        style="width: 100%; height: calc(100vh - 103px)"
        :options="options"
        ref="mapRef"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          :title="m.title"
          :icon="m.icon"
          @click="AddProductsCart(index, m)"
        >
        </GmapMarker>
      </GmapMap> -->
      <div id="map1"></div>
    </div>
    <!-- end::map_wrapper -->

    <b-sidebar
      id="sidebar-backdrop"
      v-model="visiable"
      shadow
      no-header
      :right="$i18n.locale == 'en' ? false : true"
    >
      <template #default="{ hide }">
        <div class="sidebar_header">
          <b-button variant="default" block @click="hide">
            <svg class="icon">
              <use xlink:href="~/static/icons/solid.svg#angle-right"></use>
            </svg>
          </b-button>
          <h4 id="sidebar-no-header-title">{{ selected_orders_info }}</h4>
        </div>

        <div class="px-3 py-2">
          <div class="products_wrapper" v-if="selected_order != null">
            <div
              class="wrapper"
              v-for="(item, idx) in products"
              :key="idx + 100"
            >
              <img :src="item.categories_image" alt="product_image" />
              <div class="info">
                <h6 class="name">{{ item.name }}</h6>
                <p class="price">{{ item.price + ' ' + item.unit }}</p>
                <div class="counter">
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
                    v-model="orders[order_idx][idx].value"
                    @input="checkCounter(order_idx, idx, item)"
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
              </div>
            </div>
          </div>
          <!-- end::products_wrapper -->
          <button type="button" class="btn btn-cart-insert" @click="handleCart">
            {{ $t('insert_to_cart') }}
          </button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script src="~/pages/products/map/-script.js"></script>

<style lang="scss">
.map_wrapper {
  position: relative;
  .button_wrapper {
    padding: 15px;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 100;
    .btn-cart {
      position: relative;
      width: 75px;
      height: 75px;
      border-radius: 100%;
      background-color: $primary-color;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 35px;
        height: 35px;
        fill: #fff;
      }
      span {
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 600;
        background-color: #f26161;
        position: absolute;
        top: -3px;
        right: -3px;
        z-index: 100;
        border-radius: 100%;
      }
    }
  }
  .filter_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-block: 10px;
    z-index: 100;
    .dropdown_wrapper {
      position: absolute;
      top: 100%;
      z-index: 100;
      right: 0;
      width: 100%;
      background-color: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 20px;
      border-top: 1px solid #eee;
      opacity: 0;
      visibility: hidden;
      transition: all 0.25s;
      &.show {
        opacity: 1;
        visibility: visible;
      }
      a {
        padding-block: 12px;
        display: flex;
        color: #000;
        border-bottom: 1px solid #eee;
        transition: all 0.25s;
        &:last-child {
          border-bottom: none;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        img {
          width: 40px;
          height: 40px;
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
    .input-group {
      background-color: #fff;

      .form-control {
        border: none;
        box-shadow: none !important;
        height: 47px;
        border-radius: 0 !important;
      }
      .btn {
        box-shadow: none !important;
        .icon {
          width: 18px;
          height: 18px;
          fill: $primary-color;
        }
      }
    }
    .cities_wrapper {
      padding-top: 8px;
      // display: flex;
      div {
        // margin-inline-end: 15px;
        input {
          display: none;
          &:checked + label {
            background-color: #dad9d9;
            color: #8b8b8b;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
          }
        }
        label {
          padding: 8px 15px;
          // min-width: 130px;
          white-space: nowrap;
          display: block;
          // width: max-content;
          margin-inline: auto;
          color: #fff;
          background-color: $second-color;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s;
          text-align: center;
        }
      }
    }
  }
}
.b-sidebar {
  width: 420px;
  background-color: #fff !important;
}
.sidebar_header {
  padding-block: 25px !important;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  h4 {
    margin-bottom: 0;
    margin-inline-start: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 350px;
    @media (max-width: 350px) {
      max-width: 200px;
    }
  }
  .btn {
    padding: 0;
    width: auto;
    box-shadow: none !important;
    .icon {
      width: 15px;
      height: 15px;
    }
  }
}
.products_wrapper {
  padding-top: 30px;
  .wrapper {
    display: flex;
    align-items: center;
    padding-block: 10px;
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
    margin-bottom: 15px;
    img {
      width: 100px;
      height: 100px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-inline-end: 25px;
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
      margin-bottom: 5px;
      margin-top: 5px;
    }
    .counter {
      display: flex;
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
  }
}
.btn-cart-insert {
  display: block;
  width: 100%;
  padding: 10px 25px;
  background: transparent linear-gradient(180deg, #008f7a 0%, #005894 100%) 0%
    0% no-repeat padding-box;
  box-shadow: none;
  border-radius: 32px 32px 32px 0px;
  color: #fff;
  font-weight: 600;
  box-shadow: none !important;
}
.custom-control {
  padding-block: 15px;
  padding-inline: 20px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  label {
    font-weight: 600;
    margin-bottom: 0;
  }
}

.google_search,
.normal_search {
  width: calc(100% - 45px);
}
// .slick-slide {
//   margin: 0 10px;
// }
.slick-prev:before,
.slick-next:before {
  color: #008f7a;
}
.slick-prev,
.slick-next {
  @media (max-width: 991px) {
    display: none !important;
  }
}
.slick-track {
  display: flex !important;
  gap: 10px;
}
</style>
