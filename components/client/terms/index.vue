<template>
  <section class="Terms p-5">
    <b-container>
      <h4>  {{ $t('condition') }}  </h4>
      <p> {{ termsData }} </p>
    </b-container>
  </section>
</template>


<script>
export default{
  data(){
    return{
      termsData: ''
    }
  },
  methods:{
    async Terms() {
      const response = await this.$axios.get('/terms-conditions')
      this.termsData = response.data.data.content
    },
  },
  mounted(){
    this.Terms()
  }
}
</script>

<style lang="scss">
.Terms{
  h4{
    font-weight: bold;
    margin-bottom: 20px
  }
  p{
    line-height: 2
  }
}
</style>
