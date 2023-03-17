<template>
  <div class="offer_details">
    <b-container v-for="(offer, index) in offers" :key="index">
      <div v-if="offer.id == $route.params.id">
        <h3>  {{ $t('offer_deatils') }} </h3>
        <div>
          <div class="offer_details_desc d-flex justify-content-start align-items-center flex-row" style="gap:10px"  >
            <img :src="offer.offer_image" alt="offer">
            <div class="offer_info d-flex justify-content-start align-items-start flex-column">
              <span> {{ offer.name }} </span>
              <span> {{ offer.end_date }} </span>
            </div>
          </div>
          <div class="offer_details_info">
            <p> {{ offer.description }} </p>
          </div>
        </div>
      </div>
      <div v-else>
        <noData></noData>
      </div>
    </b-container>
  </div>
</template>


<script>
import noData from "@/pages/no-data/index.vue"
export default{
  components:{
    noData
  },
  validate({params}){
    return !isNaN(params.id);
  },
  data() {
    return {
      offers: [],
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
          this.TriggerNotify('error', err.response.data.message)
        })
    },
  },
  mounted(){
    this.getOffers()
  }
}
</script>




<style lang="scss">
.offer_details{
  padding: 30px 0;
  h3{
    color: #000;
    font-weight: bold;
  }
  .offer_details_desc{
    margin-top: 35px;
    img{
      border-radius: 8px;
      width: 90px;
      height: 90px;
      object-fit: contain;
    }
    .offer_info{
      span{
        font-weight: bold;
        color: #000
      }
      span:last-of-type{
        color: #000000A6;
        margin-top: 5px;
        font-weight: normal;
      }
    }
  }
  .offer_details_info{
    margin-top: 35px;
    p{
      color: #042A44;
      line-height: 2
    }
  }
}
</style>
