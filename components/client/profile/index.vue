<template>
  <div class="profile pt-5" id="child">
    <b-container>
      <div class="row">
        <div class="col-md-5">
          <div
            class="nav flex-column nav-pills profile_tabs"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
          <a
              class="nav-link"
              id="v-pills-profile-tab"
              data-toggle="pill"
              href="#v-pills-profile"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="true"
            >
              <svg class="icon">
                <use xlink:href="~/static/icons/regular.svg#user"></use>
              </svg>
              {{ $t('profile') }}
            </a>
            <a
              class="nav-link"
              id="v-pills-orders-tab"
              data-toggle="pill"
              href="#v-pills-orders"
              role="tab"
              aria-controls="v-pills-orders"
              aria-selected="false"
            >
              <svg class="icon">
                <use xlink:href="~/static/icons/regular.svg#clipboard"></use>
              </svg>
              {{ $t('orders') }}</a
            >
            <a
              class="nav-link"
              id="v-pills-schedule-tab"
              data-toggle="pill"
              href="#v-pills-schedule"
              role="tab"
              aria-controls="v-pills-schedule"
              aria-selected="false"
            >
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#circle-info"></use>
              </svg>
              {{ $t('schedule') }}
            </a>
            <a
              class="nav-link"
              id="v-pills-addressCom-tab"
              data-toggle="pill"
              href="#v-pills-addressCom"
              role="tab"
              aria-controls="v-pills-addressCom"
              aria-selected="false"
            >
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#location-dot"></use>
              </svg>
              {{ $t('address') }}
            </a>
            <b-button id="show-btn" @click="$bvModal.show('logout_modal')">
              <svg class="icon">
                <use
                  xlink:href="~/static/icons/solid.svg#right-from-bracket"
                ></use>
              </svg>
              {{ $t('logout') }}
            </b-button>
            <b-modal id="logout_modal" hide-footer>
              <div
                class="d-flex justify-content-center align-items-center flex-column logout_content"
              >
                <img
                  :src="require('@/assets/images/logout.png')"
                  alt="logout"
                />
                <h3>{{ $t('sure_logout') }}</h3>
                <button @click="logout">{{ $t('logout') }}</button>
              </div>
            </b-modal>
          </div>
        </div>
        <div class="col-md-7">
          <div class="tab-content" id="v-pills-tabContent">
            <div
              class="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <profile></profile>
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-orders"
              role="tabpanel"
              aria-labelledby="v-pills-orders-tab"
            >
              <orders></orders>
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-addressCom"
              role="tabpanel"
              aria-labelledby="v-pills-addressCom-tab"
            >
              <addressCom></addressCom>
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-schedule"
              role="tabpanel"
              aria-labelledby="v-pills-schedule-tab"
            >
              <schedule></schedule>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import profile from './profile.vue'
import schedule from './schedule.vue'
import orders from './orders.vue'
import addressCom from './address.vue'
export default {
  components: {
    profile,
    schedule,
    orders,
    addressCom
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      userToken: ['localStorage/userToken'],
    }),
  },
  methods: {
    async logout() {
      await this.$axios
        .get('/logout')
        .then((res) => {
          this.$store.commit('localStorage/RESET_USER')
          if (this.$route.path != '/') {
            this.$router.replace('/')
          }
          this.TriggerNotify('success', res.data.message)
          this.$bvModal.hide('logout_modal')
        })
        .catch((err) => {
          this.TriggerNotify('error', err.response.data.message)
        })
    },
  },
  mounted() {
    const hash = window.location.hash;

    if (hash === "#v-pills-profile" || hash === "#v-pills-orders" || hash === "#v-pills-schedule" || hash === "#v-pills-addressCom") {
      const tabLink = document.querySelector(`a[href="${hash}"]`);

      if (tabLink) {
        const tabPane = document.querySelector(tabLink.getAttribute("href"));

        if (tabPane) {
          tabLink.classList.add("active");
          tabPane.classList.add("active", "show");
        }
      }
    }
  },
}
</script>

<style lang="scss">
.profile {
  svg {
    width: 20px;
    height: 20px;
    margin-inline-end: 5px;
    color: #000;
  }
  .card {
    border: 0 !important;
  }
  .nav {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #cccccc38;
    padding: 15px 0;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 5px;
    .nav-link {
      color: #000;
      font-weight: 600;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      width: 100%;
      padding-bottom: 15px;
      padding-top: 15px;
      &.active {
        background-color: transparent;
        color: #008f7a;
        svg {
          fill: #008f7a;
        }
      }
    }
  }
  #show-btn {
    font-weight: bold;
    background: transparent;
    border: 0;
    color: red;
    margin-inline-end: auto;
    &:focus {
      outline: none;
      box-shadow: 0;
    }
    svg {
      fill: red;
      margin-inline-end: 8px;
    }
  }
}
</style>
