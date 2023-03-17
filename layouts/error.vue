<template>
  <section
    class="Not_found d-flex justify-content-center align-items-center flex-column p-5"
  >
      <img :src="require('@/assets/images/error.png')" alt="" />
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.Not_found {
  img {
    width: 350px;
  }
}
</style>
