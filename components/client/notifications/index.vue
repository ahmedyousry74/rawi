<template>
  <section class="notifications">
    <b-container>
      <h3>{{ $t('notifications') }}</h3>
      <div class="notifications_items">
        <ul class="notification_list" v-if="notifications.length > 0">
          <li

            v-for="(notification, index) in notifications"
            :key="index"
          >
            <a
              :href="'/profile/order-details/'  + notification.order_id"
              class="d-flex justify-content-between align-items-center flex-row w-100"
            >
              <p>{{ notification.date_meladi }}</p>
              <span> {{ notification.message }} <small></small> </span>
              <span> {{ notification.time }} </span>
            </a>
          </li>
        </ul>
        <div v-else>
          <noData></noData>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
import noData from '@/pages/no-data/index.vue'
export default {
  components: {
    noData,
  },
  data() {
    return {
      notifications: [],
      meta: '',
      currentPage: 1,
      totalNoti: null,
    }
  },
  methods: {
    async getNotifications() {
      await this.$axios
        .get(`/get-notification?page=${this.currentPage}`)
        .then((response) => {
          this.meta = response.data.meta
          this.currentPage = response.data.meta.current_page
          this.totalNoti = response.data.meta.total
          this.notifications = [...this.notifications, ...response.data.data]
        })
        .catch((err) => {
          // this.TriggerNotify('error', err.response.data.message)
        })
    },
    handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop + clientHeight >= scrollHeight) {
        if (
          this.currentPage == this.meta.current_page &&
          this.currentPage < this.totalNoti
        ) {
          this.currentPage++
          this.getNotifications()
        }
      }
    },
  },
  mounted() {
    this.getNotifications()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="scss">
.notifications {
  padding: 50px 0;
  h3,
  p {
    color: #000;
    font-weight: bold;
  }
  .notification_list {
    margin-top: 30px;
    li {
      padding: 15px;
      position: relative;
      padding-inline-start: 15px;
      position: relative;
      &:after {
        position: absolute;
        content: '';
        background-color: #ccc;
        height: 2px;
        width: 100%;
        top: 70px;
        right: 0;
      }
      &:hover {
        background-color: #00589414;
        border-radius: 8px;
      }
      span {
        color: #042a44;
        text-align: center;
      }
    }
    small {
      position: absolute;
      right: 3px;
      top: 26px;
      background-color: #008f7a;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }
}

@media (max-width: 500px) {
  .notifications {
    .notification_list {
      li {
        flex-wrap: wrap;
        flex-direction: column !important;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        &:after {
          bottom: 0;
          top: auto;
        }
      }
    }
  }
}
</style>
