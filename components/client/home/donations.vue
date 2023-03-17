<template>
  <div class="donates_page" id="donation">
    <b-container>
      <div class="title_section">
        <h3>{{ $t('donates') }}</h3>
      </div>
      <b-row>
        <b-col cols="6" md="4" v-for="(donate, index) in donates" :key="index">
          <div
            class="donates_item d-flex justify-content-center align-items-center flex-column mb-4"
            style="gap: 15px"
            @click="DonateItem(donate)"
          >
            <img
              :src="require(`~/assets/images/${donate.type}.png`)"
              alt="icon"
            />
            <span>{{ donate.name }}</span>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import vuex tool
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      donates: [],
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapGetters({
      userToken: ['localStorage/userToken'],
      settings: ['localStorage/get_settings'],
    }),
  },
  methods: {
    async fetchData() {
      const response = await this.$axios.get('/categories')
      this.donates = response.data.data
      await this.$axios.$get('/setting').then((res) => {
        this.$store.commit('localStorage/SET_SETTINGS', res.data)
      })
    },
    DonateItem(item) {
      if (item.id == 8 || item.id == 7) {
        this.$router.push(
          this.localePath({
            name: 'products',
            query: { cate_id: item.id, cate_name: item.name },
          })
        )
      } else {
        if (item.id == 3 || item.id == 6) {
          if (
            this.settings.map_mosque == 1 &&
            this.settings.dashboard_mosque == 0
          ) {
            this.$router.push(
              this.localePath({
                name: 'products-map',
                query: {
                  cate_id: item.id,
                  cate_name: item.name,
                  type: item.type,
                  map_type: 'google',
                },
              })
            )
          } else if (
            this.settings.map_mosque == 0 &&
            this.settings.dashboard_mosque == 1
          ) {
            this.$router.push(
              this.localePath({
                name: 'products-map',
                query: {
                  cate_id: item.id,
                  cate_name: item.name,
                  type: item.type,
                  map_type: 'system',
                },
              })
            )
          } else if (
            this.settings.map_mosque == 1 &&
            this.settings.dashboard_mosque == 1
          ) {
            this.$router.push(
              this.localePath({
                name: 'products-map',
                query: {
                  cate_id: item.id,
                  cate_name: item.name,
                  type: item.type,
                  map_type: 'both',
                },
              })
            )
          }
        } else if (item.id == 4) {
          if (
            this.settings.map_orphanage == 0 &&
            this.settings.dashboard_orphanage == 1
          ) {
            this.$router.push(
              this.localePath({
                name: 'products-map',
                query: {
                  cate_id: item.id,
                  cate_name: item.name,
                  type: item.type,
                  map_type: 'system',
                },
              })
            )
          } else if (
            this.settings.map_orphanage == 1 &&
            this.settings.dashboard_orphanage == 0
          ) {
            this.$router.push(
              this.localePath({
                name: 'products-map',
                query: {
                  cate_id: item.id,
                  cate_name: item.name,
                  type: item.type,
                  map_type: 'google',
                },
              })
            )
          } else if (
            this.settings.map_orphanage == 1 &&
            this.settings.dashboard_orphanage == 1
          ) {
            this.$router.push(
              this.localePath({
                name: 'products-map',
                query: {
                  cate_id: item.id,
                  cate_name: item.name,
                  type: item.type,
                  map_type: 'both',
                },
              })
            )
          }
        } else if (item.id == 5) {
          if (
            this.settings.map_charities == 0 &&
            this.settings.dashboard_charities == 1
          ) {
            this.$router.push(
              this.localePath({
                name: 'products-map',
                query: {
                  cate_id: item.id,
                  cate_name: item.name,
                  type: item.type,
                  map_type: 'system',
                },
              })
            )
          } else if (
            this.settings.map_charities == 1 &&
            this.settings.dashboard_charities == 0
          ) {
            this.$router.push(
              this.localePath({
                name: 'products-map',
                query: {
                  cate_id: item.id,
                  cate_name: item.name,
                  type: item.type,
                  map_type: 'google',
                },
              })
            )
          } else if (
            this.settings.map_charities == 1 &&
            this.settings.dashboard_charities == 1
          ) {
            this.$router.push(
              this.localePath({
                name: 'products-map',
                query: {
                  cate_id: item.id,
                  cate_name: item.name,
                  type: item.type,
                  map_type: 'both',
                },
              })
            )
          }
        }
      }
    },
  },
}
</script>

<style lang="scss">
.donates_page {
  padding-block: 125px 55px;
  background-image: url('@/assets/images/Path-4828.png');
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  .donates_item {
    background-color: #c7ebe761;
    padding: 35px 20px;
    border-radius: 3px;
    cursor: pointer;
    img {
      width: 60px;
      height: 65px;
      object-fit: contain;
    }
  }
  span {
    color: #000;
    font-weight: 550;
    font-size: 18px;
    font-weight: 600;
  }
}

@media (max-width: 400px) {
  .donates_page span {
    font-size: 13px;
  }
}
</style>
