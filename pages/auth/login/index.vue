<template>
  <div class="auth_main_wrapper">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 col-12">
          <div class="img_wrapper">
            <img src="~/assets/images/SignIn.png" alt="login" />
          </div>
          <!-- end::img_wrapper -->
        </div>
        <!-- end::col -->
        <div class="col-lg-7 col-12">
          <div class="form_wrapper">
            <h2 class="main_title">{{ $t('welcome_back') }}</h2>
            <h4 class="sub_title">{{ $t('login') }}</h4>
            <p class="hint">
              {{ $t('no_account') }}
              <router-link :to="localePath({ name: 'auth-register' })">
                {{ $t('create_new_account') }}
              </router-link>
            </p>

            <client-only>
              <ValidationObserver ref="form">
                <b-form @submit.prevent="handleForm">
                  <ValidationProvider
                    rules="required|min:9"
                    :name="$t('phone_number')"
                    v-slot="{ errors }"
                  >
                    <b-form-group :label="$t('phone_number')">
                      <b-input-group>
                        <VuePhoneNumberInput
                          v-model="form.phone_number"
                          :default-country-code="'SA'"
                          :preferred-countries="['SA']"
                          :no-flags="true"
                          @update="catchCountry"
                          :translations="{
                            countrySelectorLabel: $t('country_code'),
                            phoneNumberLabel: $t('mobile_number'),
                            example: $t('example'),
                          }"
                        ></VuePhoneNumberInput>
                      </b-input-group>
                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </b-form-group>
                  </ValidationProvider>
                  <!-- end::form-group -->

                  <ValidationProvider
                    :name="$t('password')"
                    :rules="{
                      required: true,
                      min: 8,
                    }"
                    v-slot="{ errors }"
                  >
                    <b-form-group :label="$t('password')">
                      <b-input-group>
                        <b-form-input
                          :type="password_s"
                          v-model="form.password"
                          :class="{ invalid: errors[0] }"
                          :placeholder="$t('enter_your') + ' ' + $t('password')"
                        ></b-form-input>
                        <svg class="icon" @click="showPassword">
                          <use
                            xlink:href="~/static/icons/solid.svg#eye"
                            v-if="password_s == 'password'"
                          ></use>
                          <use
                            xlink:href="~/static/icons/solid.svg#eye-slash"
                            v-if="password_s == 'text'"
                          ></use>
                        </svg>
                      </b-input-group>
                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </b-form-group>
                  </ValidationProvider>
                  <!-- end::form-group -->

                  <b-form-group>
                    <nuxt-link
                      class="forget_pass"
                      :to="localePath('/auth/forget-password')"
                    >
                      {{ $t('forget_pass') }}
                    </nuxt-link>
                  </b-form-group>

                  <div class="form-group">
                    <button
                      type="submit"
                      class="btn btn-default"
                      :disabled="disabled"
                    >
                      <b-spinner
                        small
                        variant="light"
                        v-if="disabled"
                      ></b-spinner>
                      {{ $t('login') }}
                    </button>
                  </div>
                </b-form>
              </ValidationObserver>
            </client-only>
          </div>
          <!-- end::form_wrapper -->
        </div>
        <!-- end::col -->
      </div>
      <!-- end::row -->
    </div>
  </div>
</template>

<script src="~/pages/auth/login/-script.js"></script>

<style lang="scss">
.form-control {
  height: 55px;
  border-radius: 8px;
  border-color: #0000001a;
  box-shadow: none !important;
  &:focus {
    border-color: $second-color;
  }
}
.vue-phone-number-input {
  width: 100%;
  height: 55px !important;
  direction: ltr;
}
.country-selector__input,
.input-tel__input {
  height: 55px !important;
}
</style>

<style lang="scss" scoped>
.input-group {
  align-items: center;
  position: relative;
  .icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill: $primary-color;
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
  }
}
.dir_left {
  .icon {
    right: 15px;
    left: auto;
  }
}
</style>
