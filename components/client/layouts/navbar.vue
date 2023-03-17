<template>
  <header class="header">
    <nav class="navbar">
      <ul class="nav-menu">
        <client-only>
          <li class="nav-item lang_choose notifications" v-if="userToken">
            <nuxt-link
              :to="localePath('/notifications')"
              class="nav-link notification_icon"
            >
              <img
                :src="require('@/assets/images/icons8-bell-24.png')"
                alt="notification"
                width="24"
                height="24px"
              />
              <span></span>
            </nuxt-link>
            <div class="notification_dd">
              <h6>{{ $t('notifications') }}</h6>
              <ul class="notification_ul">
                <li
                  class="d-flex justify-content-between align-items-center flex-row"
                  v-for="(notification, index) in notifications"
                  :key="index"
                >
                  <a
                    :href="'/profile/order-details/' + notification.order_id"
                    class="d-flex justify-content-between align-items-center flex-row w-100"
                  >
                    <span> {{ notification.message }} <small></small> </span>
                    <span> {{ notification.time }} </span>
                  </a>
                </li>
              </ul>
              <a href="/notifications" class="view_more"> عرض الكل </a>
            </div>
          </li>
        </client-only>
        <li class="nav-item lang_choose">
          <button @click="switchMyLang">
            {{ $t(`${currentLocale == 'en' ? 'ar' : 'en'}`) }}
            <!-- <img
              :src="require(`@/assets/images/${currentLocale}.png`)"
              alt="flag"
            /> -->
          </button>
          <!-- <b-dropdown class="lang">
            <template #button-content>
              العربية
              <img
                :src="require(`@/assets/images/ar.png`)"
                alt="flag"
                width="20"
                height="20px"
              />
              <img
                :src="require(`@/assets/images/${currentLocale}.png`)"
                alt="flag"
              />
            </template>
            <b-dropdown-item @click="switchMyLang('ar')">
              {{ $t('arabic') }}
            </b-dropdown-item>
            <b-dropdown-item @click="switchMyLang('en')">
              {{ $t('english') }}
            </b-dropdown-item>
          </b-dropdown> -->
        </li>
        <li class="nav-item">
          <nuxt-link :to="localePath('/')" class="nav-link">{{
            $t('home')
          }}</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link :to="localePath('/offers')" class="nav-link">{{
            $t('offer')
          }}</nuxt-link>
        </li>
        <client-only>
          <li class="nav-item" v-if="userToken">
            <nuxt-link
              :to="localePath('/profile#v-pills-orders')"
              class="nav-link"
              >{{ $t('orders') }}</nuxt-link
            >
          </li>
        </client-only>
        <li class="nav-item">
          <nuxt-link :to="localePath('/contact-us')" class="nav-link">
            {{ $t('contact') }}
          </nuxt-link>
        </li>
        <client-only>
          <li class="nav-item" v-if="!userToken">
            <nuxt-link
              :to="localePath('/auth/login')"
              class="nav-link"
              @click="closeMenu"
            >
              {{ $t('login') }}
            </nuxt-link>
          </li>
          <li class="nav-item profile_dropdown" v-if="userToken">
            <div>
              <b-dropdown>
                <template #button-content>
                  <img
                    :src="userData.profile_image"
                    alt="lang"
                    width="40"
                    height="40"
                  />
                </template>
                <b-dropdown-item
                  :href="`${localePath('/profile')}#v-pills-profile`"
                >
                  {{ $t('profile') }}
                </b-dropdown-item>
                <b-dropdown-item
                  :href="`${localePath('/profile')}#v-pills-orders`"
                >
                  {{ $t('orders') }}
                </b-dropdown-item>
                <b-dropdown-item
                  :href="`${localePath('/profile')}#v-pills-schedule`"
                >
                  {{ $t('schedule') }}
                </b-dropdown-item>
                <b-dropdown-item
                  :href="`${localePath('/profile')}#v-pills-addressCom`"
                >
                  {{ $t('address') }}
                </b-dropdown-item>
                <b-button id="show-btn" @click="$bvModal.show('logout_modal')">
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
              </b-dropdown>
            </div>
          </li>
        </client-only>
      </ul>
      <div
        class="d-flex justify-content-start align-items-center flex-row flex-wrap"
        style="gap: 15px"
      >
        <a
          class="donate_now swing animated hvr-bounce-to-right"
          :href="`${localePath('/')}#donation`"
        >
          {{ $t('donate') }}
        </a>
        <!-- <nuxt-link :to="localePath('/#donation')" class="donate_now swing animated hvr-bounce-to-right">
          {{ $t('donate') }}
        </nuxt-link> -->
        <nuxt-link :to="localePath('/')" class="nav-logo">
          <img src="@/assets/images/logo.png" alt="" />
        </nuxt-link>
      </div>
      <div class="hamburger">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
  </header>
</template>

<script>
// importing vuex tools
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      notifications: [],
      imageUrl: null,
    }
  },
  mounted() {
    const hamburger = document.querySelector('.hamburger')
    const navMenu = document.querySelector('.nav-menu')
    const navLink = document.querySelectorAll('.nav-link')

    hamburger.addEventListener('click', this.mobileMenu)
    navLink.forEach((n) => n.addEventListener('click', this.closeMenu))

    // function mobileMenu() {
    //   hamburger.classList.toggle('active')
    //   navMenu.classList.toggle('active')
    // }

    // function closeMenu() {
    //   hamburger.classList.remove('active')
    //   navMenu.classList.remove('active')
    // }
    if (this.userToken) {
      this.profileData()
      this.getNotifications()
    }
  },
  computed: {
    ...mapGetters({
      userToken: ['localStorage/userToken'],
      userData: ['localStorage/userData'],
    }),
    currentLocale() {
      return this.$store.getters['localStorage/currentLocale']
    },
  },
  methods: {
    mobileMenu() {
      const hamburger = document.querySelector('.hamburger')
      const navMenu = document.querySelector('.nav-menu')

      hamburger.classList.toggle('active')
      navMenu.classList.toggle('active')
    },

    closeMenu() {
      const hamburger = document.querySelector('.hamburger')
      const navMenu = document.querySelector('.nav-menu')

      hamburger.classList.remove('active')
      navMenu.classList.remove('active')
    },
    async getNotifications() {
      // if(this.userToken){
      const response = await this.$axios.get('/get-notification')
      this.notifications = response.data.data
      // }
    },
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
    switchMyLang() {
      const locale = this.$i18n.locale == 'en' ? 'ar' : 'en'
      this.$store.commit('localStorage/SET_CURRENT_LOCALE', locale)
      const languageCode = `Bearer ${locale}_${module.default}`
      this.$axios.defaults.headers.common.Authorization = languageCode
      import(`~/locales/${locale}`).then((module) => {
        this.$i18n.setLocaleMessage(locale, module.default)
        window.history.replaceState('', '', this.switchLocalePath(locale))
        this.$nuxt.$router.go()
      })
    },
    async profileData() {
      // if(this.userToken){
      const response = await this.$axios.get('/profile-data')
      this.imageUrl = response.data.data.profile_image
      // }
    },
  },
}
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #ccc;
  .nav-logo {
    img {
      width: 70px;
      height: 90px;
      object-fit: contain;
    }
  }
  .nav-menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    padding: 0;
    margin-bottom: -17px;
    .profile_dropdown,
    .lang_choose {
      .btn-secondary {
        background-color: transparent !important;
        color: #005894;
        border-color: transparent !important;
      }
      .dropdown-toggle {
        img {
          margin-inline-start: 5px;
          border-radius: 50% !important;
          border: 1px solid #ccc;
        }
      }
      .dropdown-menu.show {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 20px;
        li {
          position: relative;
          width: 100%;
          background-color: transparent !important;
          &:hover {
            background-color: transparent !important;
          }
          &:after {
            position: absolute;
            content: '';
            background-color: #ccc;
            height: 1px;
            width: 100%;
            top: 34px;
            right: 0;
          }
          // &:last-of-type::after {
          //   position: relative;
          // }
        }
        .dropdown-item {
          color: #008f7a;
          font-size: 13px;
          text-align: start !important;
          padding: 8px 20px 10px !important;
          text-align: center !important;
          background-color: transparent !important;
          &:hover {
            background-color: transparent !important;
            color: #005894 !important;
          }
        }
        button {
          color: #008f7a;
          font-size: 13px;
          text-align: start !important;
          padding: 8px 20px 10px !important;
          text-align: center !important;
        }
      }
    }
    .nav-item {
      position: relative;
      &:after {
        position: absolute;
        content: '';
        background-color: #ccc;
        height: 104px;
        width: 1px;
        top: 50%;
        transform: translateY(-50%);
        left: -4px;
      }
      &:last-of-type::after {
        position: relative;
      }
      &.lang_choose {
        padding: 0 8px;
        button {
          color: #005894;
          font-weight: bold;
          img {
            margin-inline-start: 5px;
            width: 25px;
            height: 25px;
            border-radius: 100%;
          }
        }
      }
    }
    .nav-link {
      font-size: 1rem;
      font-weight: 600;
      color: #005894;
      &:hover {
        color: #008f7a;
      }
    }
    .notification_icon {
      position: relative;
      span {
        position: absolute;
        right: 15px;
        top: 7px;
        background-color: #c93737;
        width: 10px;
        height: 10px;
        color: #c93737;
        border-radius: 50%;
      }
    }
  }
  .donate_now {
    background-color: $primary-color;
    border: 1px solid #fff;
    color: #fff;
    padding: 5px 40px;
    border-radius: 5px;
    height: 50px;
    line-height: 2.5;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: $second-color;
      border: 1px solid $second-color;
      color: #fff;
    }
  }
  .swing {
    transform-origin: top center;
    visibility: visible;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-name: swing;
    animation-fill-mode: both;
  }
  .hvr-bounce-to-right {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px transparent;
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
    border-radius: 10px;
  }
  .notifications {
    position: relative;
  }
  .notification_dd {
    position: absolute;
    top: 48px;
    right: -15px;
    user-select: none;
    background: #fff;
    width: 550px;
    height: auto;
    display: none;
    border-radius: 3px;
    box-shadow: 10px 10px 35px rgba(0, 0, 0, 0.125),
      -10px -10px 35px rgba(0, 0, 0, 0.125);
    z-index: 999;
    border-radius: 9px;
    z-index: 999;
    padding: 15px;

    &:before {
      content: '';
      position: absolute;
      top: -20px;
      right: 30px;
      border: 10px solid;
      border-color: transparent transparent #fff transparent;
    }
    h6 {
      font-weight: bold;
      margin-bottom: 20px;
    }
    ul {
      height: 200px;
      overflow: hidden;
      overflow-y: scroll;
    }
    li {
      margin-bottom: 15px;
      padding: 15px 15px;
      border-radius: 7px;
      span {
        color: #042a44;
        font-size: 14px;
      }
      span:last-of-type {
        color: #0000008a;
      }
      &:hover {
        background-color: #00589414;
      }
    }
    .view_more {
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $second-color;
      text-decoration: underline !important;
    }
  }
  .notifications:hover .notification_dd {
    display: block;
  }
}

.hamburger {
  display: none;
}
.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #101010;
}
@media only screen and (max-width: 768px) {
  .notification_dd {
    display: none !important;
  }
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 5rem;
    flex-direction: column;
    align-items: flex-start !important;
    justify-content: flex-start !important;
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    z-index: 999;
    height: 100vh;
    .nav-item {
      &:after {
        position: relative !important;
      }
    }
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-item {
    margin: 0.8rem 0;
  }

  .hamburger {
    display: block;
    cursor: pointer;
    width: 15px;
  }

  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active .bar:nth-child(1) {
    -webkit-transform: translateY(8px) rotate(45deg);
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger.active .bar:nth-child(3) {
    -webkit-transform: translateY(-8px) rotate(-45deg);
    transform: translateY(-8px) rotate(-45deg);
  }
}
.dir_left {
  .nav-item {
    &:after {
      right: -4px;
      left: auto !important;
    }
  }
  .notification_dd {
    left: -15px;
    right: auto !important;
    &:before {
      left: 30px;
      right: auto !important;
    }
  }
}
</style>
