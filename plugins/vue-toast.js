import Vue from 'vue'
import VueToasted from 'vue-toasted'
Vue.use(VueToasted)

const notification = {
  methods: {
    TriggerNotify(type, message) {
      // this.$toasted.show(message, {
      //   type: type,
      //   duration: 3500,
      //   position: 'top-right',
      // })
      this.$swal({
        title: message,
        icon: type,
        confirmButtonText: this.$t('confirm'),
        confirmButtonColor: '#0F5296',
      })
    },
  },
}

Vue.mixin(notification)
