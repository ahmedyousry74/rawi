<template>
  <div
    class="contact_us_page d-flex justify-content-center align-items-center flex-column"
    style="gap: 20px"
  >
    <img :src="require('~/assets/images/contact-us.svg')" alt="" />
    <h3>{{ $t('contact') }}</h3>
    <span> {{ $t('we_happy') }}</span>
    <div
      class="social_media d-flex justify-content-start align-items-start flex-row"
      style="gap: 10px"
    >
      <a :href="contacts.instagram" target="_blank">
        <img
          :src="require('@/assets/images/Mask-Group-1409.png')"
          alt="social media"
          width="30"
          height="30"
        />
      </a>
      <a :href="contacts.facebook" target="_blank">
        <img
          :src="require('@/assets/images/Group-24332.png')"
          alt="social media"
          width="30"
          height="30"
        />
      </a>
      <a :href="contacts.snapshat" target="_blank">
        <img
          :src="require('@/assets/images/snapchat.png')"
          alt="social media"
          width="30"
          height="30"
        />
      </a>
      <a :href="'https://wa.me/' + contacts.whatsapp" target="_blank">
        <img
          :src="require('@/assets/images/whatsapp.png')"
          alt="social media"
          width="30"
          height="30"
        />
      </a>
      <a :href="contacts.youtube" target="_blank">
        <img
          :src="require('@/assets/images/twitter-ic.png')"
          alt="social media"
          width="30"
          height="30"
        />
      </a>
    </div>
    <div class="phone_contact">
      <a :href="'tel:' + contacts.phone_number">
        <svg class="icon">
          <use xlink:href="~/static/icons/solid.svg#phone-volume"></use>
        </svg>
        {{ contacts.phone_number }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
}
</script>

<style lang="scss" scoped>
.contact_us_page {
  padding: 25px 0;
  padding: 30px 15px;
  background-color: #00589408;
  max-width: 600px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  img {
    width: 100%;
  }
  h3 {
    color: #000;
    font-weight: bold;
    margin-bottom: 8px !important;
  }
  span {
    color: #042a44;
  }
  .phone_contact {
    a {
      color: #042a44;
    }
    svg {
      width: 15px;
      height: 15px;
      fill: $primary-color;
      margin-inline-end: 5px;
    }
  }
  .social_media {
    img {
      width: 30px;
      height: 30px;
    }
  }
  @media (max-width: 480px) {
    .contact_us_page {
      max-width: 100%;
    }
  }
}
</style>
