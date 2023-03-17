<template>
  <section class="website" :class="$i18n.locale == 'en' ? 'dir_left' : ''">
    <MainNavbar></MainNavbar>
    <Nuxt />
    <MainFooter></MainFooter>
  </section>
</template>

<script>
import MainNavbar from '@/components/client/layouts/navbar.vue'
import MainFooter from '@/components/client/layouts/footer.vue'
export default {
  name: 'layout',
  components: {
    MainNavbar,
    MainFooter,
  },
  // middleware: 'authed',
  data() {
    return {}
  },
  watch: {
    $route(from, to) {
      const hamburger = document.querySelector('.hamburger')
      const navMenu = document.querySelector('.nav-menu')

      hamburger.classList.remove('active')
      navMenu.classList.remove('active')
    },
  },
}
</script>

<style lang="scss">
.dir_left {
  direction: ltr !important;
}
</style>
