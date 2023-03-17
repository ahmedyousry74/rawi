<template>
  <div class="slider_home">
    <b-container>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        img-width="1024"
        img-height="480"
        controls
        indicators
      >
        <b-carousel-slide v-for="(slider, index) in sliders" :key="index" :img-src="slider.image">
        </b-carousel-slide>
      </b-carousel>
    </b-container>
</div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default{
  data(){
    return{
      sliders: []
    }
  },
  methods:{
    async fetchData() {
      const response = await this.$axios.get('/sliders')
      this.sliders = response.data.data
    }
  },
  mounted(){
    this.fetchData()
  }
}
</script>


<style lang="scss">
.slider_home{
  padding: 15px;
  // background-image: url('@/assets/images/background-hero.png');
  // background-position: left bottom;
  // background-size: contain;
  // background-repeat: no-repeat;
  height: 400px;
  .carousel-inner{
    img{
      border-radius: 8px;
      height: 350px;
      width: 100%;
      border-radius: 8px;
      // object-fit: contain
    }
  }
  #carousel-fade___BV_indicators_{
    position: absolute;
    bottom: -40px;
      li{
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: transparent;
        border: 2px solid $fourth-color;
        &.active{
          background-color: $fourth-color
        }
      }
  }
}

@media(max-width: 500px){
  .slider_home{
    height: 200px;
  }
  .carousel-inner{
    img{
      height: 155px !important;
      object-fit: fill;
    }
  }
}
</style>
