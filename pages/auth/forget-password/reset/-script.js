export default {
  name: 'ResetPassword',
  data() {
    return {
      form: {
        password: '',
        password_confirmation: '',
      },
      password_s: 'password',
      con_password_s: 'password',
      disabled: false,
    }
  },
  methods: {
    async handleForm() {
      await this.$refs.form.validate().then((success) => {
        if (success) {
          this.handleReq()
        }
      })
    },
    showPassword(type) {
      if (type == 'original') {
        this.password_s = this.password_s == 'password' ? 'text' : 'password'
      } else if (type == 'confirm') {
        this.con_password_s =
          this.con_password_s == 'password' ? 'text' : 'password'
      }
    },
    async handleReq() {
      this.disabled = true
      const form_data = new FormData()
      form_data.append(
        'phone_number',
        this.$route.query.phone_number.replace(/\s/g, '')
      )
      form_data.append('password', this.form.password)
      form_data.append('password_confirmation', this.form.password_confirmation)
      form_data.append('phone_iso', this.$route.query.phone_iso)
      form_data.append('phone_dial', this.$route.query.phone_dial)
      form_data.append('code', this.$route.query.code)
      await this.$axios
        .post('/reset-password', form_data)
        .then((res) => {
          console.log(res)
          this.TriggerNotify('success', res.data.message)
          this.$router.replace(
            this.localePath({
              name: 'auth-login',
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
