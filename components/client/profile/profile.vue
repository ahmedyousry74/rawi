<template>
  <div class="profile_data edit_profile">
    <div class="row">
      <div class="col-12">
        <client-only>
          <ValidationObserver ref="form">
            <b-form @submit.prevent="handleForm">
              <b-form-group>
                <div class="profile-avatar">
                  <ul>
                    <li><img :src="imageUrl" alt="" /></li>
                    <li class="edit">
                      <div class="svg__">
                        <svg class="icon">
                          <use
                            xlink:href="~/static/icons/regular.svg#pen-to-square"
                          ></use>
                        </svg>
                      </div>
                      <input
                        type="file"
                        name="image"
                        @change="onFileChange"
                        accept="image/png, image/jpeg, image/bmp"
                      />
                    </li>
                  </ul>
                </div>
              </b-form-group>
              <ValidationProvider
                :name="$t('name')"
                :rules="{
                  required: true,
                }"
                v-slot="{ errors }"
              >
                <b-form-group :label="$t('name')" class="mt-4">
                  <b-input-group>
                    <b-form-input type="text" v-model="name"></b-form-input>
                  </b-input-group>
                  <span v-if="errors[0]" class="validation-error">
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>
              <ValidationProvider
                rules="required|min:9"
                :name="$t('phone_number')"
                v-slot="{ errors }"
              >
                <b-form-group :label="$t('phone_number')">
                  <b-form-input type="tel" v-model="phone"></b-form-input>
                  <span v-if="errors[0]" class="validation-error">
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>
              <button type="submit" class="__submit">
                {{ $t('update_data') }}
              </button>
            </b-form>
          </ValidationObserver>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
export default {
  components: { VuePhoneNumberInput },
  data() {
    return {
      data: [],
      imageUrl: null,
      name: '',
      phone: '',
      form: {
        file: null,
      },
    }
  },
  methods: {
    onFileChange(e) {
      this.form.file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.form.file)
      reader.onload = () => {
        this.imageUrl = reader.result
      }
    },
    async profileData() {
      const response = await this.$axios.get('/profile-data')
      this.data = response.data.data
      this.imageUrl = response.data.data.profile_image
      this.name = response.data.data.user_name
      this.phone = response.data.data.phone_number
    },
    async handleForm() {
      await this.$refs.form.validate().then((success) => {
        if (success) {
          this.handleReq()
        }
      })
    },
    handleReq() {
      const form_data = new FormData()
      form_data.append('user_name', this.name)
      form_data.append('phone_number', this.phone)
      form_data.append('profile_image', this.form.file)
      this.$axios
        .post('/update-profile', form_data, {
          headers: { 'app-type': 'client' },
        })
        .then(({ res }) => {
          this.$router.push(this.localePath('/profile#v-pills-profile'))
          window.location.reload()
          this.TriggerNotify('success', this.$t('profile_updated'))
        })
        .catch((err) => {
          this.TriggerNotify('error', err.response.data.msg)
        })
    },
  },
  mounted() {
    this.profileData()
  },
}
</script>

<style lang="scss">
.profile_data {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 30px 20px;
  border-radius: 5px;
  &.edit_profile {
    .vue-phone-number-input {
      width: 100%;
    }
    .profile-avatar {
      position: relative;
      width: 100%;
      border: none;
      border-radius: 0;
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        position: absolute;
        opacity: 0;
        right: 75px;
        top: 75px;
      }
      .svg__ {
        background: #fff;
        color: #fff;
        padding: 7px 9px;
        position: absolute;
        top: 70px;
        right: 55%;
        font-size: 33px;
        text-align: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      }
      svg {
        fill: #008f7a;
        top: 6px;
        position: absolute;
        right: 6px;
        width: 17px !important;
        height: 17px !important;
      }
      img {
        border: 1px solid #ccc;
        padding: 2px;
        border-radius: 50%;
        width: 100px;
        height: 100px;
      }
    }
  }
  .__submit {
    background: linear-gradient(to bottom, #008f7a, #005894) !important;
    border-radius: 25px 25px 25px 0;
    padding: 10px 25px;
    color: #fff;
    margin: auto;
    display: block;
  }
}
</style>
