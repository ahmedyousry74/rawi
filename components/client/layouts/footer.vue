<template>
  <div>
    <footer>
      <b-container>
        <b-row>
          <b-col cols="12" md="3">
            <div class="footer_logo mb-4">
              <img :src="require('@/assets/images/Group-24594.png')" alt="" />
            </div>
          </b-col>
          <b-col cols="12" md="3">
            <h4>{{ $t('important_page') }}</h4>
            <ul
              class="footer_links mb-4 d-flex justify-content-start flex-column"
              style="gap: 25px"
            >
              <li>
                <nuxt-link :to="localePath('/')">{{ $t('home') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('/offers')">{{
                  $t('offer')
                }}</nuxt-link>
              </li>
              <client-only>
                <li v-if="userToken">
                  <nuxt-link :to="localePath('/profile#v-pills-orders')">{{
                    $t('orders')
                  }}</nuxt-link>
                </li>
              </client-only>
              <li>
                <nuxt-link :to="localePath('/contact-us')">{{
                  $t('contact')
                }}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('/terms')">{{
                  $t('terms')
                }}</nuxt-link>
              </li>
            </ul>
          </b-col>
          <b-col cols="12" md="3">
            <h4>{{ $t('contact') }}</h4>
            <ul class="footer_links mb-4">
              <li>
                <img
                  :src="require('@/assets/images/icons8-ringer-volume-24.png')"
                  alt="phone"
                  width="20"
                  height="20"
                />
                <a :href="'tel:' + contacts.phone_number">{{
                  contacts.phone_number
                }}</a>
              </li>
            </ul>
          </b-col>
          <b-col cols="12" md="3">
            <h4>{{ $t('social_icon') }}</h4>
            <ul
              class="footer_social mb-4 d-flex justify-content-start align-items-start flex-row"
              style="gap: 8px"
            >
              <li>
                <a :href="contacts.facebook" target="_blank">
                  <img
                    :src="require('@/assets/images/icons8-facebook-f-24.png')"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a :href="contacts.instagram" target="_blank">
                  <img
                    :src="require('@/assets/images/icons8-instagram-48.png')"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a :href="contacts.youtube" target="_blank">
                  <img
                    :src="require('@/assets/images/icons8-twitter-30.png')"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a :href="contacts.snapshat" target="_blank">
                  <img
                    :src="require('@/assets/images/icons8-snapchat-24.png')"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a :href="'https://wa.me/' + contacts.whatsapp" target="_blank">
                  <img
                    :src="require('@/assets/images/icons8-whatsapp-30.png')"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      // footerPages: [
        // {
        //   id: 1,
        //   title: this.$nuxt.$t('home'),
        //   link: '/',
        // },
        // {
        //   id: 2,
        //   title: this.$nuxt.$t('offer'),
        //   link: '/offers',
        // },
        // {
        //   id: 3,
        //   title: this.$nuxt.$t('orders'),
        //   link: '/profile#v-pills-orders',
        // },
        // {
        //   id: 4,
        //   title: this.$nuxt.$t('contact'),
        //   link: '/contact-us',
        // },
        // {
        //   id: 0,
        //   title: this.$nuxt.$t('terms'),
        //   link: '/terms',
        // },
        // {
        //   id: 1,
        //   title: this.$nuxt.$t('blogs'),
        //   link: ""
        // },
        // {
        //   id: 2,
        //   title: this.$nuxt.$t('mosq'),
        //   link: ""
        // },
        // {
        //   id: 3,
        //   title: this.$nuxt.$t('yatem'),
        //   link: ""
        // },
        // {
        //   id: 4,
        //   title: this.$nuxt.$t('charity'),
        //   link: ""
        // },
      // ],
      contacts: '',
    }
  },
  methods: {
    async getContacts() {
      const response = await this.$axios.get('/contact-us')
      this.contacts = response.data.data
    },
  },
  mounted() {
    this.getContacts()
  },
  computed: {
    ...mapGetters({
      userToken: ['localStorage/userToken'],
    }),
  },
}
</script>

<style lang="scss">
footer {
  padding: 20px 0;
  background-image: url('@/assets/images/footer.png');
  .footer_logo {
    img {
      width: 100px;
    }
  }
  h4 {
    color: #fff;
    margin-bottom: 30px;
  }
  a {
    color: #ffffffbd;
    &:hover {
      color: #ffffffbd;
    }
  }
  .footer_social {
    li {
      border: 1px solid #ccc;
      border-radius: 50%;
      padding: 6px 9px 8px 9px;
    }
    img {
      width: 20px;
    }
  }
}
</style>
