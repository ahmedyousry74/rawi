<template>
  <div class="profile_data address__">
    <h4> {{ $t('address') }}  </h4>
    <div class="row">
      <div class="col-12">
        <div class="address_item d-flex justify-content-start align-items-center flex-row" style="gap:10px" v-if="addresssData == true">
          <img src="@/assets/images/Group-28754.svg" alt="">
          <div class="address_info" v-for="(address , index) in addresssData" :key="index">
            <h6> {{ address.establishment_name }} </h6>
            <span>
              <svg class="icon">
                <use xlink:href="~/static/icons/solid.svg#location-dot"></use>
              </svg>
              {{  address.establishment_address  }}
            </span>
          </div>
        </div>
        <div v-if="addresssData == false">
          <noData></noData>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import noData from '@/pages/no-data/index.vue'
export default {
  components: {
    noData,
  },
  data(){
    return{
      addresssData: []
    }
  },
  methods:{
    async Address() {
      await await this.$axios.get('/my-donation-address')
        .then((response) => {
          this.addresssData = response.data.data
        })
        .catch((err) => {
          // this.TriggerNotify('error', err.response.data.message) 
          this.addresssData = []
        })
    },
  },
  mounted(){
    this.Address()
  }
}
</script>


<style lang="scss">
.address__{
  h4{
    font-weight: bold;
    margin-bottom: 25px;
  }
  .address_item{
    background-color: #F9F9F9;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 25px;
    h6{
      color: #000;
      font-weight: bold;
    }
    span{
      color: #000000A6;
      font-size: 14px;
      svg{
        fill: #000000A6;
        width: 14px !important;
        height: 14px !important
      }
    }
  }
}
</style>
