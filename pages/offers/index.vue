<template>
  <section class="offers_page">
    <b-container>
      <h3> {{ $t('offer') }} </h3>
      <div class="offers_items" v-if="offers.length > 0">
        <b-row>
          <b-col cols="12" md="4" class="mb-3" v-for="(offer, index) in offers" :key="index">
            <NuxtLink :to="localePath('/offers/' + offer.id)">
              <div class="offer_item">
                <img :src="offer.offer_image" alt="">
                <div class="offer_desc d-flex justify-content-between align-items-start flex-row">
                  <div class="d-flex justify-content-start align-items-start flex-column">
                    <span> {{ offer.name }}</span>
                    <span class="date__"> {{ offer.end_date }} </span>
                  </div>
                  <div class="d-flex justify-content-start align-items-start flex-column">
                    <span class="days__"> {{ daysBetween(offer.start_date, offer.end_date) }} {{$t('day')}} </span>
                    <span class="Baqy__"> {{ $t('rest') }} </span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </b-col>
        </b-row>
      </div>
      <div v-else>
          <noData></noData>
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
      offers: []
    }
  },
  computed:{},
  methods:{
    async getOffers() {
      await this.$axios
        .get('/offers')
        .then((response) => {
          this.offers = response.data.data
        })
        .catch((err) => {
          // this.TriggerNotify('error', err.response.data.message)
        })
    },
    daysBetween(startDate, endDate) {
      // Calculate the difference in days between the two dates
      const oneDay = 24 * 60 * 60 * 1000; // number of milliseconds in one day
      const diffDays = Math.round(Math.abs((new Date(startDate) - new Date(endDate)) / oneDay));
      return diffDays;
    }
  },
  mounted(){
    this.getOffers()
  }
}
</script>


<style lang="scss">
.offers_page{
  padding: 50px 0;
  h3{
    color: #000;
    font-weight: bold;
    margin-bottom: 25px
  }
  .offers_items{
    .offer_item{
      padding: 25px 15px 0px;
      background-color: #0058940A;
      height:100%;
      border-radius: 8px;
      margin-bottom: 25px;
      img{
        width: 100%;
        border-radius: 8px;
        height: 100px;
        object-fit: contain;
      }
      .offer_desc{
        margin-top: 15px;
        span{
          color: #000;
          font-weight: bold;
          margin-bottom:5px;
        }
        .date__{
          color: #000000A6;
          font-weight: normal;
        }
        .days__{
          color: #005894;
          font-weight: 550;
        }
        .Baqy__{
          color: #000000A6;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
