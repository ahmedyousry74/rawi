import _ from 'lodash'

export default {
  name: 'VerifyCode',
  data() {
    return {
      requiredCells: _.range(0, 4),
      activationCells: [],
      disabled: false,
    }
  },
  methods: {
    inputActivationCode(value, index) {
      if (value.length > 1) {
        this.$set(this.activationCells, index, 9)
      } else {
        this.$set(this.activationCells, index, value)
      }
    },
    checkForKeys(key, index) {
      var isArabic =
        /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc])*$/g
      if (key != 8) {
        if (this.$refs.codeRef[index + 1] != null) {
          if (isArabic.test(this.activationCells[index])) {
            this.TriggerNotify('error', this.$t('arabic_validation'))
            this.activationCells[index] = null
          } else {
            this.$refs.codeRef[index + 1].focus()
          }
        }
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
      form_data.append(
        'phone_number',
        this.$route.query.phone_number.replace(/\s/g, '')
      )
      form_data.append('check_type', this.$route.query.type)
      form_data.append('phone_iso', this.$route.query.phone_iso)
      form_data.append('phone_dial', this.$route.query.phone_dial)
      form_data.append('code', this.activationCells.join(''))
      await this.$axios
        .post('/verify-code', form_data)
        .then((res) => {
          this.TriggerNotify('success', res.data.message)
          if (this.$route.query.type == 'activation') {
            this.$router.replace(this.localePath('/auth/login'))
          } else if (this.$route.query.type == 'reset_password') {
            this.$router.replace(
              this.localePath({
                name: 'auth-forget-password-reset',
                query: {
                  phone_number: this.$route.query.phone_number,
                  phone_dial: this.$route.query.phone_dial,
                  phone_iso: this.$route.query.phone_iso,
                  code: this.activationCells.join(''),
                },
              })
            )
          }
        })
        .catch((err) => {
          console.log(err.response)
          this.TriggerNotify('success', err.response.data.message)
          this.disabled = false
        })
      this.disabled = false
    },
    async resendCode() {
      const form_data = new FormData()
      form_data.append('phone_number', this.$route.query.phone_number)
      form_data.append('check_type', this.$route.query.type)
      form_data.append('phone_iso', this.$route.query.phone_iso)
      form_data.append('phone_dial', this.$route.query.phone_dial)
      await this.$axios
        .post('/resend-verification', form_data)
        .then((res) => {
          this.TriggerNotify('success', res.data.message)
        })
        .catch((err) => {
          this.TriggerNotify('error', err.reponse.data.error[0])
        })
    },
  },
}
