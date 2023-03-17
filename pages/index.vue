<template>
  <div>
    <Header></Header>
    <AboutUs></AboutUs>
    <Donations></Donations>
  </div>
</template>

<script>
import Header from "@/components/client/home/header.vue"
import AboutUs from "@/components/client/home/about-us.vue"
import Donations from "@/components/client/home/donations.vue"
export default {
  name: 'IndexPage',
  layout: 'default',
  components:{
    Header,
    AboutUs,
    Donations
  }
}
</script>
