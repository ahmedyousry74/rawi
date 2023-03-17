import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

export default {
  name: 'RegisterPage',
  components: { VuePhoneNumberInput },
  data() {
    return {
      form: {
        user_name: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        phone_iso: '',
        phone_dial: '',
        check_type: 'activation',
      },
      password_s: 'password',
      con_password_s: 'password',
      terms: true,
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
    showPassword(type) {
      if (type == 'original') {
        this.password_s = this.password_s == 'password' ? 'text' : 'password'
      } else if (type == 'confirm') {
        this.con_password_s =
          this.con_password_s == 'password' ? 'text' : 'password'
      }
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
      form_data.append('user_name', this.form.user_name)
      form_data.append(
        'phone_number',
        this.form.phone_number.replace(/\s/g, '')
      )
      form_data.append('password', this.form.password)
      form_data.append('password_confirmation', this.form.password_confirmation)
      form_data.append('phone_iso', this.form.phone_iso)
      form_data.append('phone_dial', this.form.phone_dial)
      await this.$axios
        .post('/register', form_data)
        .then((res) => {
          console.log(res)
          this.TriggerNotify('success', res.data.message)
          this.$router.replace(
            this.localePath({
              name: 'auth-verify',
              query: {
                type: 'activation',
                phone_number: this.form.phone_number,
                phone_dial: this.form.phone_dial,
                phone_iso: this.form.phone_iso,
              },
            })
          )
        })
        .catch((err) => {
          this.TriggerNotify('error', err.response.data.message)
          this.disabled = false
        })

      this.disabled = false
    },
  },
}
