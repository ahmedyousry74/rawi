<template>
  <section class="about_us py-5">
  <b-container>
    <div class="title_section">
      <h3> {{ $t('about') }}  </h3>
    </div>
    <b-row class="align-items-start">
      <b-col cols="12" md="7" class="about_us_info">
        <img src="@/assets/images/logo.png" alt="">
        <p class="mt-4">{{ about.content }}</p>
      </b-col>
      <b-col cols="12" md="5" class="about_us_img">
        <img src="@/assets/images/WhoAreWe.png" alt="">
      </b-col>
    </b-row>
  </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      about: ''
    }
  },
  methods:{
    async fetchData() {
      const response = await this.$axios.get('/who-us')
      this.about = response.data.data
    }
  },
  mounted(){
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.about_us{
    img{
      max-width:100%
    }
    .about_us_info{
      img{
        width: 150px;
        height: 150px
      }
    }
}
</style>
