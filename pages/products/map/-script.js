import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
// importing vuex tools
import { mapGetters } from 'vuex'

export default {
  name: 'ProductsMap',
  async asyncData(context) {
    const products = await context.$axios.$get(
      `/products?category_id=${context.query.cate_id}`
    )
    const establishments = await context.$axios.$get(
      `/get-establishments?type=${context.query.type}`
    )
    const cities = await context.$axios.$get('/get-regions')

    return {
      products: products.data,
      establishments: establishments.data,
      cities: cities.data,
    }
  },
  head() {
    return {
      script: [
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5LCZLdS1cq7-buPkwyLDjcARlFjiljYk&libraries=places',
          defer: true,
          async: true,
          body: true,
        },
      ],
    }
  },
  components: { VueSlickCarousel },
  mounted() {
    this.map_type =
      this.$route.query.map_type == 'both'
        ? 'system'
        : this.$route.query.map_type
    const route = this.$route
    setTimeout(() => {
      const cartFunction = this.AddProductsCart
      const orders = this.orders
      const center = this.center
      this.createMarker = createMarker
      this.createSystemMarker = createSystemMarker
      const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
      }
      const input = document.getElementById('autocomplete')
      const options = {
        bounds: defaultBounds,
        componentRestrictions: { country: 'sa' },
        strictBounds: false,
        types: ['mosque'],
      }
      const autocomplete = new google.maps.places.Autocomplete(input, options)

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace()
        this.publicSearch = place.name
        this.createMarker(place, 'selected')
        this.map_wrapper.setCenter(
          new google.maps.LatLng(
            parseFloat(place.geometry.location.lat()),
            parseFloat(place.geometry.location.lng())
          )
        )
      })
      const map = new google.maps.Map(document.getElementById('map1'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: this.center,
        zoom: this.map_zoom,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false,
        disableDefaultUi: false,
        clickableIcons: false,
        styles: [
          {
            featureType: 'landscape.natural.landcover',
            stylers: [
              {
                visibility: 'on',
              },
            ],
          },
          // {
          //   featureType: 'poi.mosque',
          //   stylers: [
          //     {
          //       visibility: 'on',
          //     },
          //   ],
          // },
          {
            featureType: 'poi.attraction',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.business',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.government',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.medical',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.school',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.sports_complex',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'transit',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
        ],
      })
      this.map_wrapper = map
      var request = {
        location: this.center,
        radius: 50000,
        types: ['mosque'],
      }

      if (this.$route.query.cate_id == 3 || this.$route.query.cate_id == 6) {
        var service = new google.maps.places.PlacesService(map)

        service.search(request, callback)
      }

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i])
          }
        }
      }
      function createMarker(place, type) {
        var marker

        if (place.types.indexOf('mosque') != -1) {
          var icon_to_use =
            type == 'selected'
              ? require('~/assets/images/marker-active.png')
              : require('~/assets/images/marker.png')
        }

        if (route.query.cate_id == 4) {
          var icon_to_use =
            type == 'selected'
              ? require('~/assets/images/orph-active.png')
              : require('~/assets/images/orph.png')
        } else if (route.query.cate_id == 5) {
          var icon_to_use =
            type == 'selected'
              ? require('~/assets/images/char-active.png')
              : require('~/assets/images/char.png')
        }

        marker = new google.maps.Marker({
          map: map,
          name: place.name,
          label: {
            text: place.name,
            color: 'black',
            fontSize: '14px',
            className: 'marker-position',
          },
          position: place.geometry.location,
          icon: icon_to_use,
          type: 'from_map',
          city: 'Saudi Arabia',
        })

        google.maps.event.addListener(marker, 'click', function () {
          cartFunction(orders.length, marker)
        })
      }
      function createSystemMarker(place, index, type) {
        var marker
        if (route.query.cate_id == 3 || route.query.cate_id == 6) {
          var icon =
            type == 'selected'
              ? require('~/assets/images/marker-active.png')
              : require('~/assets/images/marker.png')
        } else if (route.query.cate_id == 4) {
          var icon =
            type == 'selected'
              ? require('~/assets/images/orph-active.png')
              : require('~/assets/images/orph.png')
        } else if (route.query.cate_id == 5) {
          var icon =
            type == 'selected'
              ? require('~/assets/images/char-active.png')
              : require('~/assets/images/char.png')
        }
        // var icon = require('~/assets/images/marker.png')
        marker = new google.maps.Marker({
          idx: index,
          name: place.name,
          label: {
            text: place.name,
            color: 'black',
            fontSize: '14px',
            className: 'marker-position',
          },
          map: map,
          position: { lat: parseFloat(place.lat), lng: parseFloat(place.lon) },
          icon: icon,
          type: 'from_system',
        })

        google.maps.event.addListener(marker, 'click', function () {
          console.log(marker)
          cartFunction(marker.idx, marker)
        })
      }

      this.establishments.forEach((elem, index) => {
        createSystemMarker(elem, index, 'regular')
        orders.push([])
        this.products.forEach((item) => {
          orders[index].push({
            id: item.id,
            value: 0,
          })
        })
      })
      this.selected_order = orders.length > 0 ? orders[0] : null
      this.selected_orders_info = this.establishments[0].name
    }, 1000)
  },
  data() {
    return {
      visiable: false,
      orders: [],
      createMarker: null,
      map_type: null,
      createSystemMarker: null,
      selected_orders_info: [],
      order_idx: 0,
      selected_order: null,
      selected_city: null,
      cart_counter: 0,
      prev_order_index: [],
      search_list: [],
      seach_field: null,
      map_zoom: 15,
      map_wrapper: null,
      includes_orders: [],
      slider_settings: [
        {
          dots: false,
          focusOnSelect: false,
          infinite: false,
          speed: 500,
          rtl: this.$i18n.locale == 'en' ? false : true,
          slidesToShow: 10,
          slidesToScroll: 1,
          touchThreshold: 5,
          initialSlide: 7,
          // variableWidth: true,
          // centerMode: true,
          // centerPadding: '20px',
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
                navs: false,
              },
            },
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: false,
                navs: false,
              },
            },
          ],
        },
      ],
      center: {
        lat: 21.4202467,
        lng: 39.8420958,
      },
      markers: [],
      options: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false,
        disableDefaultUi: false,
        clickableIcons: false,
        styles: [
          {
            featureType: 'landscape.natural.landcover',
            stylers: [
              {
                visibility: 'on',
              },
            ],
          },
          // {
          //   featureType: 'poi.mosque',
          //   stylers: [
          //     {
          //       visibility: 'on',
          //     },
          //   ],
          // },
          {
            featureType: 'poi.attraction',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.business',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.government',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.medical',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.school',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi.sports_complex',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'transit',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
        ],
      },
      map_switch: false,
      publicSearch: null,
    }
  },
  computed: {
    ...mapGetters({
      userToken: ['localStorage/userToken'],
    }),
  },
  watch: {
    selected_city(current) {
      this.center = {
        lat: parseFloat(current.lat),
        lng: parseFloat(current.lng),
      }
      const route = this.$route
      const map = this.map_wrapper
      const orders = this.orders
      const cartFunction = this.AddProductsCart
      if (this.$route.query.cate_id == 3 || this.$route.query.cate_id == 6) {
        var request = {
          location: this.center,
          radius: 50000,
          types: ['mosque'],
        }
      } else {
        var request = {
          location: this.center,
          radius: 50000,
        }
      }

      if (this.$route.query.cate_id == 3 || this.$route.query.cate_id == 6) {
        var service = new google.maps.places.PlacesService(map)

        service.search(request, callback)
      }

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i])
          }
        }
      }
      function createMarker(place, type) {
        var marker

        if (place.types.indexOf('mosque') != -1) {
          var icon_to_use =
            type == 'selected'
              ? require('~/assets/images/marker-active.png')
              : require('~/assets/images/marker.png')
        }

        if (route.query.cate_id == 4) {
          var icon_to_use =
            type == 'selected'
              ? require('~/assets/images/orph-active.png')
              : require('~/assets/images/orph.png')
        } else if (route.query.cate_id == 5) {
          var icon_to_use =
            type == 'selected'
              ? require('~/assets/images/char-active.png')
              : require('~/assets/images/char.png')
        }

        marker = new google.maps.Marker({
          map: map,
          name: place.name,
          label: {
            text: place.name,
            color: 'black',
            fontSize: '14px',
            className: 'marker-position',
          },
          position: place.geometry.location,
          icon: icon_to_use,
          type: 'from_map',
          city: 'Saudi Arabia',
        })

        google.maps.event.addListener(marker, 'click', function () {
          cartFunction(orders.length, marker)
        })
      }
      map.setCenter(
        new google.maps.LatLng(parseFloat(current.lat), parseFloat(current.lng))
      )
    },
    map_switch(current) {
      if (current == false) {
        this.map_type = 'system'
      } else {
        this.map_type = 'google'
      }
    },
  },
  methods: {
    async systemSrearch() {
      this.search_list = []
      if (this.seach_field == null || this.seach_field == '') {
        this.search_list = []
      } else {
        await this.$axios
          .$get(
            `/get-establishments?type=${this.$route.query.type}&keyword=${this.seach_field}`
          )
          .then((res) => {
            this.search_list = res.data
          })
          .catch((err) => {
            console.log('error')
            this.search_list = []
          })
      }
    },
    handleMap(item) {
      this.createSystemMarker(item, item.idx, 'selected')
      this.map_wrapper.setZoom(14)
      this.map_wrapper.setCenter(
        new google.maps.LatLng(parseFloat(item.lat), parseFloat(item.lon))
      )
      document.querySelector('.dropdown_wrapper').classList.remove('show')
    },
    checkCounter(order_idx, idx, item) {
      if (this.orders[order_idx][idx].value > item.amount) {
        this.orders[order_idx][idx].value = item.amount
      }
    },
    AddProductsCart(idx, item) {
      this.visiable = false
      if (item.type == 'from_map') {
        if (this.prev_order_index.includes(idx) == false) {
          this.orders.push([])
          this.products.forEach((item) => {
            this.orders[this.orders.length - 1].push({
              id: item.id,
              value: 0,
            })
          })
          this.establishments.push({
            id: 'map',
            name: item.name,
            lat: item.position.lat(),
            lon: item.position.lng(),
            city: item.city,
          })
          this.order_idx = idx
          this.selected_orders_info = item.name
          this.selected_order = this.orders[idx]
        } else {
          this.order_idx = idx
          this.selected_orders_info = item.name
          this.selected_order = this.orders[idx]
        }
      } else {
        this.order_idx = idx
        console.log(this.establishments[idx])
        console.log(this.establishments)
        // this.selected_orders_info = this.establishments[idx].name
        this.selected_order = this.orders[idx]
      }
      setTimeout(() => {
        this.visiable = true
      }, 300)
    },
    handleCounter(type, idx) {
      this.orders[this.order_idx][idx].value = parseInt(
        this.orders[this.order_idx][idx].value
      )
      if (type == 'increase') {
        if (this.orders[this.order_idx][idx].value < 99) {
          this.orders[this.order_idx][idx].value =
            this.orders[this.order_idx][idx].value + 1
        }
      } else if (type == 'decrease') {
        if (this.orders[this.order_idx][idx].value != 0) {
          this.orders[this.order_idx][idx].value =
            this.orders[this.order_idx][idx].value - 1
        }
      } else if (type == 'reset') {
        this.orders[this.order_idx][idx].value = 0
      }
    },
    handleCart() {
      let check_cart = 0
      if (this.prev_order_index.includes(this.order_idx) == false) {
        this.orders[this.order_idx].forEach((elem, idx) => {
          if (elem.value > 0) {
            check_cart++
          }
        })
        if (check_cart > 0) {
          this.prev_order_index.push(this.order_idx)
          this.cart_counter = this.cart_counter + 1
          this.visiable = false
        } else {
          this.TriggerNotify('error', this.$t('cart_empty_check'))
        }
      } else {
        this.visiable = false
      }
    },
    async handleCartSubmit() {
      if (this.userToken == null) {
        this.TriggerNotify('error', this.$t('login_first'))
        this.$router.push(this.localePath('/auth/login'))
      } else {
        this.disabled = true
        const form_data = new FormData()
        let check_cart = 0
        this.includes_orders = []
        this.orders.forEach((order, indx) => {
          order.forEach((elem, idx) => {
            if (elem.value > 0) {
              check_cart++
              if (this.includes_orders.length > 0) {
                if (
                  this.includes_orders[this.includes_orders.length - 1] !==
                  this.establishments[indx]
                ) {
                  this.includes_orders.push(this.establishments[indx])
                }
              } else {
                this.includes_orders.push(this.establishments[indx])
              }
              form_data.append(
                `product_id[${this.includes_orders.length - 1}][${idx}][id]`,
                elem.id
              )
              form_data.append(
                `product_id[${this.includes_orders.length - 1}][${idx}][qty]`,
                elem.value
              )
            }
          })
        })
        if (check_cart > 0) {
          await this.$axios
            .post('/order-invoices', form_data)
            .then((res) => {
              if (res.data.status == false) {
                this.TriggerNotify('error', res.data.message)
              } else {
                this.$store.commit(
                  'localStorage/SET_CART_ORDER_DETAILS',
                  this.includes_orders
                )
                this.$store.commit(
                  'localStorage/SET_CART_SESSION',
                  res.data.data
                )
                this.$router.push(
                  this.localePath({
                    name: 'checkout-map',
                    query: {
                      cate_id: this.$route.query.cate_id,
                      cate_name: this.$route.query.cate_name,
                      type: this.$route.query.type,
                    },
                  })
                )
              }
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
