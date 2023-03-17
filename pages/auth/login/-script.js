import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

export default {
  name: 'LoginPage',
  components: { VuePhoneNumberInput },
  data() {
    return {
      form: {
        phone_number: '',
        password: '',
        phone_iso: '',
        phone_dial: '',
      },
      password_s: 'password',
      country: null,
      disabled: false,
    }
  },
  watch: {
    'form.phone_number'(current) {
      if (this.form.phone_dial == '+966' && !current.startsWith('5')) {
        this.form.phone_number = '5' + current
      }
    },
  },
  methods: {
    catchCountry(value) {
      this.form.phone_iso = value.countryCode
      this.form.phone_dial = `+${value.countryCallingCode}`
      this.form.phone_number = value.formatNational
      this.country = value
      if (
        this.form.phone_dial == '+966' &&
        !this.form.phone_number.startsWith('5')
      ) {
        this.form.phone_number = '5' + this.form.phone_number
      }
    },
    showPassword() {
      this.password_s = this.password_s == 'password' ? 'text' : 'password'
    },
    async handleForm() {
      await this.$refs.form.validate().then((success) => {
        if (success) {
          this.handleReq()
        }
      })
    },
    async handleReq() {
      this.disabled = true
      const form_data = new FormData()
      form_data.append(
        'phone_number',
        this.form.phone_number.replace(/\s/g, '')
      )
      form_data.append('password', this.form.password)
      form_data.append('phone_iso', this.form.phone_iso)
      form_data.append('phone_dial', this.form.phone_dial)
      await this.$axios
        .post('/login', form_data)
        .then((res) => {
          const accessToken = `Bearer ${res.data.data.token}`
          this.$store.commit('localStorage/SET_USER_TOKEN', accessToken)
          this.$store.commit('localStorage/SET_USER_DATA', res.data.data.user)
          var options = {
            path: '/',
            maxAge: 60 * 60 * 24,
          }
          this.$store.commit('localStorage/SET_STORE_EXIRE', 60 * 60 * 24)
          this.$cookies.setAll([
            { name: 'userToken', value: accessToken, opts: options },
            { name: 'userData', value: res.data.data.user, opts: options },
          ])
          this.TriggerNotify('success', res.data.message)
          this.$router.replace(this.localePath('/'))
          this.disabled = false
        })
        .catch((err) => {
          this.TriggerNotify('error', err.response.data.message)
          this.disabled = false
        })

      this.disabled = false
    },
  },
}
